/*:
* @plugindesc (v1.02)装备作为物品使用
* @author 小c
* @version 1.0.2
* @date 5/27/2020
*
* @help
* 该插件实现装备作为物品使用
*
* 武器/防具标签
* <Equip Use Item: x>
* 使用此装备的效果为物品x，x为物品编号
* 装备的使用条件由物品x决定
* 装备的效果【包括使用完毕后是否消耗】由物品x决定
* 注意：
* 1. 物品x仅作为装备的使用效果的标记，仅有标记作用，不要让它成为实际的
* 道具参与游戏进程
* 2. 战斗中使用装备是会显示物品x的名称与图标。
*
* 更新日志
* v1.00
* 插件完成
*
* v1.01
* 追加读取行动装备的函数
*
* v1.02
* 解决装备在战斗中使用不消耗的问题
*/

var Imported = Imported || {};
Imported.CP_UseEquip = true;

var CP = CP || {};
CP.UseEquipManager = CP.UseEquipManager || {};

//-------------------------
//  DataManager
//-------------------------
CP.UseEquipManager.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!CP.UseEquipManager.DATABASE_LOADED.call(this))
		return false;

	CP.UseEquipManager.loadEquipUseData($dataWeapons);
	CP.UseEquipManager.loadEquipUseData($dataArmors);

	return true;
};

CP.UseEquipManager.loadEquipUseData = function(array){
	this.loadEquipUseBaseData(array);
	this.loadEquipUseItemData(array);
};

CP.UseEquipManager.loadEquipUseBaseData = function(array){
	for(var i = 1; i < array.length; i++){
		var equip = array[i];
		equip.useItemId = 0;

		if(equip.meta["Equip Use Item"])
			equip.useItemId = Number(equip.meta["Equip Use Item"]) || 0;
	}
};

CP.UseEquipManager.loadEquipUseItemData = function(array){
	for(var i = 1; i < array.length; i++){
		var equip = array[i];
		equip.consumable = false;

		if(equip.useItemId > 0){
			var item = this.getRealUseItem(equip);
			equip.consumable = item.consumable;
			item.isUseableEquip = true;
		}
	}
};

//针对装备，是否是【可使用的装备】，非装备返回false
CP.UseEquipManager.isEquipUsable = function(item){
	if(!item)
		return false;
	if(DataManager.isSkill(item) || DataManager.isItem(item))
		return false;
	if((DataManager.isWeapon(item) || DataManager.isArmor(item)) && item.useItemId > 0)
		return true;
	return false;
};

CP.UseEquipManager.getRealUseItem = function(item){
	if(!item)
		return null;

	if(DataManager.isItem(item) || DataManager.isSkill(item))
		return item;

	if(item.useItemId > 0)
		return $dataItems[item.useItemId];

	return null;
};

//是否是装备指向的标记物品
CP.UseEquipManager.isUseableEquip = function(item){
	if(item.isUseableEquip)
		return true;
	else
		return false;
};

//-------------------------
//  Game_BattlerBase
//-------------------------
CP.UseEquipManager.CAN_USE_ITEM = Game_BattlerBase.prototype.canUse;
Game_BattlerBase.prototype.canUse = function(item){
	return CP.UseEquipManager.CAN_USE_ITEM.call(this, CP.UseEquipManager.getRealUseItem(item));
};

//-------------------------
//  Game_Battler
//-------------------------
CP.UseEquipManager.BATTLER_USE_ITEM = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item){
    if(CP.UseEquipManager.isEquipUsable(item))
        this.consumeItem(item);
    else
    	CP.UseEquipManager.BATTLER_USE_ITEM.call(this, item);
};

//-------------------------
//  Game_Party
//------------------------
CP.UseEquipManager.PARTY_CONSUME_ITEM = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function(item){
    if (CP.UseEquipManager.isEquipUsable(item) && item.consumable)
        this.loseItem(item, 1);
    else
    	CP.UseEquipManager.PARTY_CONSUME_ITEM.call(this, item);
};

//因物品不存在时判定为不可用，故所有虚拟物品均判定为玩家持有
CP.UseEquipManager.PARTY_HAS_ITEM = Game_Party.prototype.hasItem;
Game_Party.prototype.hasItem = function(item, includeEquip){
	return CP.UseEquipManager.PARTY_HAS_ITEM.call(this, item, includeEquip) || CP.UseEquipManager.isUseableEquip(item);
};

//-------------------------
//  Game_Action
//------------------------
CP.UseEquipManager.CLEAR_ACTION = Game_Action.prototype.clear;
Game_Action.prototype.clear = function(){
	CP.UseEquipManager.CLEAR_ACTION.call(this);
	this.setEquipItem(null);
};

Game_Action.prototype.setEquipItem = function(item){
	this._equipItem = item;
};

Game_Action.prototype.equipItem = function(){
	return this._equipItem;
};

CP.UseEquipManager.SET_ACTION_SKILL = Game_Action.prototype.setSkill;
Game_Action.prototype.setSkill = function(skillId) {
    CP.UseEquipManager.SET_ACTION_SKILL.call(this, skillId);
    this.setEquipItem(null);
};

CP.UseEquipManager.SET_ACTION_ITEM = Game_Action.prototype.setItem;
Game_Action.prototype.setItem = function(itemId) {
    CP.UseEquipManager.SET_ACTION_ITEM.call(this, itemId);
    this.setEquipItem(null);
};

CP.UseEquipManager.SET_ACTION_ITEM_OBJECT = Game_Action.prototype.setItemObject;
Game_Action.prototype.setItemObject = function(object){
	if(CP.UseEquipManager.isEquipUsable(object))
		this.setEquipItem(object);
	else
		this.setEquipItem(null);
    CP.UseEquipManager.SET_ACTION_ITEM_OBJECT.call(this, CP.UseEquipManager.getRealUseItem(object));
};

//-------------------------
//  Scene_Battle
//-------------------------
CP.UseEquipManager.BATTLE_ON_ITEM_OK = Scene_Battle.prototype.onItemOk;
Scene_Battle.prototype.onItemOk = function(){
	var item = this._itemWindow.item();
    if(DataManager.isWeapon(item) || DataManager.isArmor(item))
    	this.onItemOkForEquip();
    else
    	CP.UseEquipManager.BATTLE_ON_ITEM_OK.call(this);
};

Scene_Battle.prototype.onItemOkForEquip = function() {
    var item = this._itemWindow.item();
    var action = BattleManager.inputtingAction();
    action.setItemObject(item);
    $gameParty.setLastItem(item);
    this.onSelectAction();
};

//-------------------------
//  BattleManager
//-------------------------
//战斗中指向正确的物品来消耗
CP.UseEquipManager.BATTLE_START_ACTION = BattleManager.startAction;
BattleManager.startAction = function(){
	CP.UseEquipManager.BATTLE_START_ACTION.call(this);

	var action = this._subject.currentAction();
	if(action.equipItem())
		this._subject.useItem(action.equipItem());
};