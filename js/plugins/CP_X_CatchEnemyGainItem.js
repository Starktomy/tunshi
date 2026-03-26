/*:
 * @plugindesc (v1.01)捕捉敌人得到物品（需要捕捉核心）
 * @author 小c
 * @version 1.0.0
 * @date 10/18/2020
 *
 * @help
 * 捕捉敌人时得到物品，
 * 需要CP_CatchCore支持，请放在它的下面。
 *
 * 捕捉状态指定为得到物品
 * 状态标签
 * <Catch State Gain Item>
 * 指定状态为得到物品的收化状态，需与<Catch State>同时配置
 *
 * 捕捉敌人得到物品的指定
 * <Catch State x Gain Item: y>用x号捕捉状态得到y号物品
 * <Catch State x Gain Weapon: y>用x号捕捉状态得到y号武器
 * <Catch State x Gain Armor: y>用x号捕捉状态得到y号防具
 *
 * 例：
 * <Catch State 5 Gain Item: 7>
 * <Catch State 9 Gain Armor: 2>
 * 表示这个敌人用状态5捕捉得到物品9，用状态9捕捉得到防具7
 *
 * 更新日志
 * v1.00
 * 插件完成
 *
 * v1.01
 * 修复捕捉条件的错误
 */

var Imported = Imported || {};
Imported.CP_X_CatchEnemyGainItem = true;

var CP = CP || {};
CP.CatchGainItemManager = CP.CatchGainItemManager || {};

CP.CatchGainItemManager._loaded = false;
CP.CatchGainItemManager.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!CP.CatchGainItemManager.DATABASE_LOADED.call(this))
		return false;

	if(!CP.CatchGainItemManager._loaded){
		CP.CatchGainItemManager.loadCatchGainItemState();
		CP.CatchGainItemManager.loadCatchGainItem();

		CP.CatchGainItemManager._loaded = true;
	}

	return true;
};

CP.CatchGainItemManager.loadCatchGainItemState = function(){
	for(var i = 1; i < $dataStates.length; i++){
		var state = $dataStates[i];
		state.catchStateGainItem = false;

		if(state.meta["Catch State Gain Item"])
			state.catchStateGainItem = true;
	}
};

CP.CatchGainItemManager.loadCatchGainItem = function(){
	var reg = /<Catch State (\d+) Gain (Item|Weapon|Armor): (\d+)>/g;
	for(var i = 1; i < $dataEnemies.length; i++){
		var enemy = $dataEnemies[i];
		enemy.catchGainItem = null;

		while(reg.exec(enemy.note)){
			if(!enemy.catchGainItem)
				enemy.catchGainItem = {};
			var stateId = Number(RegExp.$1) || 0;
			var type = RegExp.$2;
			var itemId = Number(RegExp.$3) || 0;
			
			enemy.catchGainItem[stateId] = {type: type, itemId: itemId};
		}
	}
};

CP.CatchGainItemManager.isCatchGainItemState = function(stateId){
	if(!CP.CatchManager.isCatchState(stateId))
		return false;

	var state = $dataStates[stateId];
	if(!!state && state.catchStateGainItem)
		return true;
	else
		return false;
};

//-----------------------------
// Game_Enemy
//-----------------------------
Game_Enemy.prototype.hasCatchGainItem = function(stateId){
	var list = this.enemy().catchGainItem;
	if(!list)
		return false;

	var data = list[stateId]
	if(!data)
		return false;
	if(!data.type)
		return false;

	return data.itemId > 0;
};

Game_Enemy.prototype.catchGainItem = function(stateId){
	var list = this.enemy().catchGainItem;
	if(!list)
		return null;

	var data = list[stateId]
	if(!data)
		return null;
	switch(data.type){
		case "Item":
			return $dataItems[data.itemId];
		case "Weapon":
			return $dataWeapons[data.itemId];
		case "Armor":
			return $dataArmors[data.itemId];
		default:
			return null;
	}
};

CP.CatchGainItemManager.ENEMY_CAN_BE_CAUGHT_PLUS = Game_Enemy.prototype.canBeCaughtPlus;
Game_Enemy.prototype.canBeCaughtPlus = function(stateId){
	if(CP.CatchGainItemManager.isCatchGainItemState(stateId)){
		if(this.hasCatchGainItem(stateId))
			return true;
		else
			return false;
	}else
		return CP.CatchGainItemManager.ENEMY_CAN_BE_CAUGHT_PLUS.call(this, stateId);
};

CP.CatchGainItemManager.ON_ENEMY_CATCH = Game_Enemy.prototype.onCatch;
Game_Enemy.prototype.onCatch = function(stateId){
	CP.CatchGainItemManager.ON_ENEMY_CATCH.call(this, stateId);

	this.processCatchGainItem(stateId);
};

Game_Enemy.prototype.processCatchGainItem = function(stateId){
	var item = this.catchGainItem(stateId);
	if(!!item)
		$gameParty.gainItem(item, 1);
};