// ========================================================
//  装备经验（CP_MagicWeapon.js）
// =========================================================

/*:
 * @plugindesc (v1.07)装备等级系统
 * @author 小c
 * @version 1.0.7
 * @date 3/25/2018
 *
 * @param ---Base Params---
 * @text ---基础数据---
 * @desc  
 * @default  
 * 
 * @param Init Level
 * @text 初始等级
 * @parent ---Base Params---
 * @desc 法宝初始等级
 * 默认值：1
 * @default 1
 * 
 * @param Init Exp
 * @text 初始经验
 * @parent ---Base Params---
 * @desc 法宝初始经验
 * 默认值：0
 * @default 0
 *
 * @param Init Exp Formula
 * @text 经验公式
 * @parent ---Base Params---
 * @desc 默认法宝经验公式
 * level - 法宝当前等级  默认值：3*level*level+40*level+50
 * @default 3 * level * level + 40 * level + 50
 *
 * @param Max Level
 * @text 等级上限
 * @parent ---Base Params---
 * @desc 法宝等级上限
 * 默认值：15
 * @default 15
 *
 * @param ---Plus Params---
 * @text ---额外数据---
 * @desc  
 * @default  
 *
 * @param Enemy Min Exp
 * @text 敌人提供最小经验
 * @parent ---Plus Params---
 * @desc 敌人携带法宝经验最小值
 * 默认值：1
 * @default 1
 *
 * @param Use Exp
 * @parent ---Plus Params---
 * @text 使用经验
 * @desc 主动法宝使用时获得的经验值
 * 默认值：1
 * @default 1
 *
 * @param Exp Rate Not Battler
 * @text 后援经验比率
 * @parent ---Plus Params---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 后队人员获得法宝经验比率
 * @default 0.80
 *
 * @param ---UI Params---
 * @text ---UI参数---
 *
 * @param Level Font Size
 * @parent ---UI Params---
 * @text 等级字体大小
 * @type number
 * @desc 图标上显示等级的字体大小
 * 默认值：16
 * @default 16
 *
 * @param Level Font Color
 * @text 等级字体颜色
 * @parent ---UI Params---
 * @type number
 * @desc 图标上显示等级的字体颜色
 * 默认值：6
 * @default 6
 *
 * @param Exp Gauge Color 1
 * @text 经验条颜色1
 * @parent ---UI Params---
 * @type number
 * @desc 经验条颜色1
 * @default 0
 *
 * @param Exp Gauge Color 2
 * @text 经验条颜色2
 * @parent ---UI Params---
 * @type number
 * @desc 经验条颜色2
 * @default 0
 *
 * @param Exp Gauge Height
 * @text 经验条高度
 * @parent ---UI Params---
 * @type number
 * @desc 经验条高度
 * 默认值：4
 * @default 4
 *
 * @param Max Level Text
 * @text 满级经验内容
 * @parent ---UI Params---
 * @desc 满级时经验的提示文字
 * @default MAX
 * 
 * @help
 * 装备等级插件，即轩辕剑的法宝系统。
 * 此插件需要YEP物品装备核心等独立装备插件支持
 * 即：有等级经验的装备必须是独立物品
 *
 * 以下标签配置于武器和防具的备注中
 * <Magic Weapon>
 * 表示该装备具有【法宝属性】，有等级和经验等参数，若没有此标签，后面所
 * 提武器防具配置标签全部无效。
 * 注：任何装备均可配置此标签，不仅仅是装备类型所定义的【法宝】。
 * 
 * <Init Level: x>
 * <Init Exp: x>
 * 分别设置法宝刚获得时的初始等级和初始经验为x，若没有配置此标签，则使
 * 用插件参数的设置。
 * 
 * <Max Level: x>
 * 设置法宝等级上限，若没有配置此标签，则采用插件参数的配置。
 *
 * <Exp Formula: formula>
 * 设置法宝升到下一级所需经验公式（公式中可采用level表示法宝当前等级）
 * 为formula，若没有配置此标签，则采用插件参数的配置。
 * 
 * <Use Exp: x>
 * 设置战斗中的主动法宝每命中一次所得法宝经验，若没有配置此标签，则采用
 * 插件参数的配置。
 * 
 * <Magic Weapon LevelUp Effect>
 * //JavaScript code
 * $gameParty.gainItem($dataItems[5], 1);
 * user.addState(15);
 * this.gainExp(2);
 * </Magic Weapon LevelUp Effect>
 * 装备升级效果，装备升级执行JavaScript脚本
 * 脚本中item为这个装备的data对象，user为装备者
 * this指针表示这个装备的Game_Item对象
 *
 * <stat Param +/-x per Level>
 * 是在装备升1级指定属性的变化
 * stat取mhp/mmp/atk/def/mat/mdf/agi/luk其中之一
 * 例：
 * <atk Param +5 per Level> 装备升1级提高攻击力5点
 * <def Param -3 per Level> 装备升1级降低防御力3点
 * 此处的1级装备也会对基础属性发生影响
 * 如果长剑在数据库的攻击力为3，每级提升1点攻击力，则1级长剑提升4点攻击
 * 力。
 * 此处数值支持小数，假设每级提升攻击2.5，则1级提升攻击3点，2级5点。
 *
 * <Equip LevelUp Trait Weapon: x>
 * <Equip LevelUp Trait Armor: x>
 * <Equip LevelUp Trait State: x>
 * 指定装备升级特性为武器/防具/状态x的特性
 * 此标签三选一即可
 *
 * 举例：<Equip LevelUp Trait Weapon: 1>
 * 此装备每升1级都将叠加武器1的【特性】中的内容1次。
 * 假设武器1具有特性【暴击率+10%】，即
 * 1级装备提升暴击率10%，2级装备提升暴击率20%，以此类推
 * 注意：装备升级只会叠加指定内容的【特性】，与其他的内容无关
 * 因此，要做一把升级提升暴击的剑，可做一个特性为增加暴击的空武器【防
 * 具状态亦可】，再利用标签把升级特殊效果指向那件空武器即可
 *
 * 以下标签用于敌人的备注中
 * <Magic Weapon Exp: x>
 * 设置击倒敌人后所得法宝经验为x。若没有配置此标签，则采用插件参数的配
 * 置。​
 *
 * 插件指令
 * MagicWeaponLevelUp actorId slotId level
 * 对指定角色的指定装备槽的装备升级level级
 *
 * 预留JavaScript函数
 * MagicWeaponManager.findMagicWeaponBySkill(subject, skill);
 * 寻找指定角色装备槽中包括指定技能的装备，返回Game_Item数组
 * 其中的skill为$dataSkills中的对象，通过action.item()可获得
 *
 * MagicWeaponManager.findMagicWeaponByBaseItemId(subject, baseId, isWeapon)
 * 寻找指定角色的装备槽中指定id的装备对象，返回Game_Item数组
 * 其中baseId为该装备在数据库中的id，isWeapon记录是否为武器
 *
 * Game_Item类扩展函数
 * item.level() 装备等级，装备没有等级返回-1
 * item.maxLevel() 装备最高等级，没有等级返回-1
 * item.exp() 装备当前经验，装备每次升级后经验会归零重算，没有经验返回-1
 * item.nextLevelExp() 装备升级所需经验，没有装备经验返回-1，满级装备不会
 * 返回-1
 * item.gainExp(exp) 装备获得指定经验值
 * item.levelUp() 装备升1级
 *
 * Game_Actor扩展函数
 * actor.getEquipItemObject(item) 获取actor中装备的Game_Item对象
 * 此函数作为YEP装备核心中【Custom Parameters】的辅助函数
 * 举例 装备的注释中可以这样写
 * <Custom Parameters>
 * var level = this.getEquipItemObject(item).level();
 * hp = level * level;
 * </Custom Parameters>
 *
 * 更新日志
 * v1.00
 * 插件完成
 *
 * v1.01
 * 增加装备升级效果
 *
 * v1.02
 * 修复因丢失升级物品而导致升级时死机的BUG
 *
 * v1.03
 * 修改装备经验显示
 * 增加装备升级变更基础属性
 *
 * v1.04
 * 追加升级增加装备特性效果
 *
 * v1.05
 * 基础属性变更配置支持小数
 *
 * v1.06
 * 添加满级装备经验显示
 *
 * v1.07
 * 修复不使用YEP装备核心/状态菜单时进入装备/状态菜单出错的问题
 */

var Imported = Imported || {};
Imported.CP_MagicWeapon = true;

var MagicWeaponManager = MagicWeaponManager || {};
var params = PluginManager.parameters("CP_MagicWeapon");

MagicWeaponManager.INIT_LEVEL = Math.round(Number(params["Init Level"]) || 1);
MagicWeaponManager.INIT_EXP = Math.round(Number(params["Init Exp"]) || 0);
MagicWeaponManager.EXP_FORMULA = params["Init Exp Formula"]; 
MagicWeaponManager.MAX_LEVEL = Math.round(Number(params["Max Level"]) || 15);
MagicWeaponManager.ENEMY_MIN_EXP = Math.round(Number(params["Enemy Min Exp"]) || 0);
MagicWeaponManager.USE_EXP = Math.round(Number(params["Use Exp"]) || 0);
MagicWeaponManager.EXP_RATE_NOT_BATTLER = Number(params["Exp Rate Not Battler"]) || 0;

MagicWeaponManager.LEVEL_FONT_SIZE = Number(params["Level Font Size"]) || 16;
MagicWeaponManager.LEVEL_FONT_COLOR = Number(params["Level Font Color"]) || 0;
MagicWeaponManager.LEVEL_GAUGE_COLOR1 = Number(params["Level Gauge Color 1"]) || 0;
MagicWeaponManager.LEVEL_GAUGE_COLOR2 = Number(params["Level Gauge Color 2"]) || 0;
MagicWeaponManager.EXP_GAUGE_COLOR1 = Number(params["Exp Gauge Color 1"]) || 0;
MagicWeaponManager.EXP_GAUGE_COLOR2 = Number(params["Exp Gauge Color 2"]) || 0;
MagicWeaponManager.EXP_GAUGE_HEIGHT = Number(params["Exp Gauge Height"]) || 0;
MagicWeaponManager.MAX_LEVEL_TEXT = params["Max Level Text"];

MagicWeaponManager.selectFlag = false;

MagicWeaponManager._loaded = false;
MagicWeaponManager.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!MagicWeaponManager.DATABASE_LOADED.call(this))
		return false;

	if(!MagicWeaponManager._loaded){
		MagicWeaponManager.loadMagicWeaponData($dataWeapons);
		MagicWeaponManager.loadMagicWeaponData($dataArmors);

		MagicWeaponManager.loadMagicWeaponBaseParam($dataWeapons);
		MagicWeaponManager.loadMagicWeaponBaseParam($dataArmors);

		MagicWeaponManager.loadLevelUpTraitObjects($dataWeapons);
		MagicWeaponManager.loadLevelUpTraitObjects($dataArmors);

		MagicWeaponManager.loadEnemyMagicWeaponExp();

		MagicWeaponManager._loaded = true;
	}

	return true;
};

MagicWeaponManager.loadMagicWeaponData = function(group){
	for(var i = 1; i < group.length; i++){
		var equip = group[i];
		equip.initLevel = -1;
		equip.level = -1;
		equip.exp = 0;
		equip.expFormula = null;
		equip.maxLevel = -1;
		equip.useExp = -1;
		equip.equipLevelUpEffect = null;

		if(this.isMagicWeapon(equip)){
			equip.initLevel = Math.round(Number(equip.meta["Init Level"]) || MagicWeaponManager.INIT_LEVEL);
			equip.level = equip.initLevel;
			equip.exp = Math.round(Number(equip.meta["Init Exp"]) || MagicWeaponManager.INIT_EXP);
			equip.expFormula = equip.meta["Exp Formula"] || null;
			equip.maxLevel = Math.round(Number(equip.meta["Max Level"]) || MagicWeaponManager.MAX_LEVEL);
			equip.useExp = Math.round(Number(equip.meta["Use Exp"]) || MagicWeaponManager.USE_EXP);

			if(equip.meta["Magic Weapon LevelUp Effect"]){
				var reg = /<Magic Weapon LevelUp Effect>([\s\S]*)<\/Magic Weapon LevelUp Effect>/;
				reg.exec(equip.note);

				equip.equipLevelUpEffect = RegExp.$1;
			}
		}
	}
};

MagicWeaponManager.loadEnemyMagicWeaponExp = function(){
	for(var i = 1; i < $dataEnemies.length; i++){
		var enemy = $dataEnemies[i];
		enemy.magicWeaponExp = Math.round(Number(enemy.meta["Magic Weapon Exp"])) || MagicWeaponManager.ENEMY_MIN_EXP;
	}
};

MagicWeaponManager.loadMagicWeaponBaseParam = function(group){
	var reg = /<([a-z]{3}) Param ([+-]\d+(\.\d+)*) per Level>/g;
	for(var i = 1; i < group.length; i++){
		var equip = group[i];
		equip.paramPlusPerLevel = [0, 0, 0, 0, 0, 0, 0, 0];
		while(ex = reg.exec(equip.note)){
			var index = this.getParamIndexFromParamName(ex[1]);
			var value = Number(ex[2]) || 0;
			equip.paramPlusPerLevel[index] = value;
		}
	}
};

MagicWeaponManager.getParamIndexFromParamName = function(name){
	switch(name){
		case "mhp":
			return 0;
		case "mmp":
			return 1;
		case "atk":
			return 2;
		case "def":
			return 3;
		case "mat":
			return 4;
		case "mdf":
			return 5;
		case "agi":
			return 6;
		case "luk":
			return 7;
		default:
			return -1;
	}
};

MagicWeaponManager.loadLevelUpTraitObjects = function(group){
	var reg = /<Equip LevelUp Trait (Weapon|Armor|State): (\d+)>/;
	for(var i = 1; i < group.length; i++){
		var item = group[i];
		item.levelUpTraits = {type: "", id: 0};

		if(reg.exec(item.note)){
			item.levelUpTraits.type = RegExp.$1.toLowerCase();
			item.levelUpTraits.id = Number(RegExp.$2) || 0;
		}
	}
};

MagicWeaponManager.isMagicWeapon = function(item){
	if(!item)
		return false;

	if(!item.meta["Magic Weapon"])
		return false;
	return true;
};

//通过主动法宝技能以及使用者找到法宝本体
MagicWeaponManager.findMagicWeaponBySkill = function(subject, skill){
	var magicWeapons = new Array();
	if(!DataManager.isSkill(skill))
		return magicWeapons;

	for(var i = 0; i < subject._equips.length; i++){
		var equip = subject._equips[i];
		if(!equip) //当装备者没有装备某部位则跳过
			continue;
		if(!equip.object())
			continue;

		var traits = equip.object().traits;

		for(var j = 0; j < traits.length; j++){
			if(traits[j].code === Game_BattlerBase.TRAIT_SKILL_ADD 
				&& traits[j].dataId === skill.id
				&& traits[j].value !== 0)
					magicWeapons.push(equip);
		}
	}

	return magicWeapons;
};

//根据装备原始id得到装备对象
MagicWeaponManager.findMagicWeaponByBaseItemId = function(subject, baseId, isWeapon){
	var equips = new Array();

	for(var i = 0; i < subject._equips.length; i++){
		var equip = subject._equips[i];
		if(!equip)
			continue;
		if(!equip.object())
			continue;
		if(equip.isWeapon() !== isWeapon)
			continue;

		if(equip.object().baseItemId && equip.object().baseItemId === baseId)
			equips.push(equip);
		else if(!equip.object().baseItemId && equip.object().id === baseId)
			equips.push(equip);
	}

	return equips;
};

//获取指定人员指定位置的法宝等级
MagicWeaponManager.getLevel = function(subject, slot){
	return subject._equips[slot].level();
};

//封装装备者id
MagicWeaponManager.INIT_ITEM = Game_Item.prototype.initialize;
Game_Item.prototype.initialize = function(item) {
    MagicWeaponManager.INIT_ITEM.call(this, item);

    this._equipActorId = -1;
};

Game_Item.prototype.setEquipActor = function(actor){
	this._equipActorId = actor.actorId();
};

Game_Item.prototype.equipActor = function(){
	return $gameActors.actor(this._equipActorId);
};

MagicWeaponManager.INIT_ACTOR_EQUIPS = Game_Actor.prototype.initEquips;
Game_Actor.prototype.initEquips = function(equips){
	MagicWeaponManager.INIT_ACTOR_EQUIPS.call(this, equips);

	this.initEquipActor();
};

Game_Actor.prototype.initEquipActor = function(){
	for(var i = 0; i < this._equips.length; i++){
		var equip = this._equips[i];
		if(equip)
			equip.setEquipActor(this);
	}
};

if(Imported.YEP_EquipCore){

MagicWeaponManager.ACTOR_EQUIPS = Game_Actor.prototype.equips;
Game_Actor.prototype.equips = function() {
	var equips = MagicWeaponManager.ACTOR_EQUIPS.call(this);

	this.initEquipActor();

	return equips;
};

//额外效果
MagicWeaponManager.ACTOR_TRAIT_OBJECTS = Game_Actor.prototype.traitObjects;
Game_Actor.prototype.traitObjects = function(){
   var objects = MagicWeaponManager.ACTOR_TRAIT_OBJECTS.call(this);
   this._equips.forEach(function(equip){
   		if(equip){
   			var object = equip.levelUpTraitObject();
   			if(object){
   				for(var i = 0; i < equip.level(); i++)
   					objects.push(object);
   			}
   		}
   }, this);

   return objects;
};

Game_Item.prototype.levelUpTraitObject = function(){
	if(!this.isMagicWeapon())
		return null;

	var object = this.object();
	switch(object.levelUpTraits.type){
		case "weapon":
			return $dataWeapons[object.levelUpTraits.id];
		case "armor":
			return $dataArmors[object.levelUpTraits.id];
		case "state":
			return $dataStates[object.levelUpTraits.id];
	}

	return null;
};

MagicWeaponManager.CHANGE_ACTOR_EQUIP = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
	MagicWeaponManager.CHANGE_ACTOR_EQUIP.call(this, slotId, item);

	this.initEquipActor();
};

MagicWeaponManager.FORCE_CHANGE_ACTOR_EQUIP = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item){
	MagicWeaponManager.FORCE_CHANGE_ACTOR_EQUIP.call(this, slotId, item);

	this.initEquipActor();
};

}

//是否为【法宝属性】装备(带有【等级】和【经验】的装备)
Game_Item.prototype.isMagicWeapon = function(){
	return MagicWeaponManager.isMagicWeapon(this.object()) && this.isEquipItem();
};

//法宝等级
Game_Item.prototype.level = function(){
	if(!this.isMagicWeapon())
		return -1;

	return this.object().level;
};

Game_Item.prototype.maxLevel = function(){
	if(!this.isMagicWeapon())
		return -1;

	return this.object().maxLevel;
};

//法宝当前经验
Game_Item.prototype.exp = function(){
	if(!this.isMagicWeapon())
		return -1;

	return this.object().exp;
};

//设置法宝当前经验
Game_Item.prototype.setExp = function(exp){
	this.object().exp = exp;
};

//法宝下一级经验
Game_Item.prototype.nextLevelExp = function(){
	var level = this.level();
	if(level < 0)
		return -1;

	var initFormla = "3 * level * level + 40 * level + 50";
	var formula = MagicWeaponManager.EXP_FORMULA;
	var item = this.object();
	if(!item.expFormula)
		item.expFormula = formula;
	var nextExp = 0;

	try{
		nextExp = eval(item.expFormula);
	}catch(err){
		nextExp = eval(initFormla);
		console.error(err);
	}

    return Math.round(nextExp);
};

//使用该法宝主动技时，法宝经验增加值
Game_Item.prototype.useExp = function(){
	if(!this.isMagicWeapon())
		return -1;
	return this.object().useExp;
};

//敌人法宝经验
Game_Enemy.prototype.magicWeaponExp = function(){
	return Math.round(this.enemy().magicWeaponExp);
};

//敌群法宝经验
Game_Troop.prototype.magicWeaponExpTotal = function(){
	var enemies = this.members();
	var exp = 0;

	for(i = 0; i < enemies.length; i++)
		exp += enemies[i].magicWeaponExp();

	return exp;
};

//获取法宝经验
Game_Item.prototype.gainMagicWeaponExp = function(inBattle){
	if(!this.isMagicWeapon())
		return;
	
	var getExp = $gameTroop.magicWeaponExpTotal();
	if(!inBattle)
		getExp = Math.round(getExp * MagicWeaponManager.EXP_RATE_NOT_BATTLER);

	this.gainExp(getExp);
};

Game_Item.prototype.gainExp = function(exp){
	if(!this.isMagicWeapon())
		return;

	if(this.level() >= this.maxLevel())
		return;

	var realExp = Math.round(this.exp() + exp);
	this.setExp(realExp);

	while(this.level() < this.maxLevel() && realExp >= this.nextLevelExp()){
		if(this.levelUp())
			realExp = this.exp();
		else
			break;
	}
};

//法宝升级
Game_Item.prototype.levelUp = function(){
	if(!this.isMagicWeapon())
		return false;

	var item = this.object();
	var exp = this.exp();
	var nextLevelExp = this.nextLevelExp();

	if(item.level < this.maxLevel()){
		item.level++;
		var nextExp = exp - nextLevelExp;
		if(nextExp < 0)
			nextExp = 0;
		this.setExp(nextExp);
		this.processLevelUpEffect();
	}else{
		this.setExp(nextLevelExp);
	}

	return true;
};

Game_Item.prototype.processLevelUpEffect = function(){
	var item = this.object();
	var user = this.equipActor();

	try{
		if(item.equipLevelUpEffect)
			eval(item.equipLevelUpEffect);
	}catch(err){
		console.error(err)
	}
};

//寻找指定法宝的主动技能，返回数组
Game_Item.prototype.findMagicWeaponSkillIds = function(){
	if(!MagicWeaponManager.isMagicWeapon(this.object()))
		return null;

	var traits = this.object().traits;
	if(!traits)
		return null;

	var arr = new Array();
	traits.forEach(function(trait){
		if(trait.code === Game_BattlerBase.TRAIT_SKILL_ADD
			&& value !== 0)
			arr.push(trait.dataId);
	});

	return arr;
};

//人物-法宝经验结算
Game_Actor.prototype.gainMagicWeaponExp = function(){
	var equips = this._equips;

	for(var i = 0; i < equips.length; i++){
		var item = equips[i];
		if(!item.isMagicWeapon())
			continue;

		item.gainMagicWeaponExp(this.isBattleMember());
	}
};

//战斗结算
MagicWeaponManager.GAIN_REWARDS = BattleManager.gainRewards;
BattleManager.gainRewards = function(){
	MagicWeaponManager.GAIN_REWARDS.call(this);

	$gameParty.allMembers().forEach(function(actor){
		actor.gainMagicWeaponExp();
	});
};

MagicWeaponManager.APPLY_ACTION = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
   MagicWeaponManager.APPLY_ACTION.call(this, target);

   var item = this.item();
   var subject = this.subject();
  
   if(!subject.isActor()) return; //敌人行动不做任何处理
   
   var magicWeapons = MagicWeaponManager.findMagicWeaponBySkill(subject, item);
   if(magicWeapons.length === 0) return; //不是法宝技能不做任何处理

   //使用成功 增加法宝经验
   magicWeapons.forEach(function(magicWeapon){
   		magicWeapon.gainActionExp();
   });
};

Game_Item.prototype.gainActionExp = function(){
   this.gainExp(this.useExp());
};

//添加技能类型处理，取消重复
MagicWeaponManager.ADDED_SKILL_TYPES = Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function(){
	var oldStypes = MagicWeaponManager.ADDED_SKILL_TYPES.call(this);
	var newStypes = new Array();

	oldStypes.forEach(function(stypeId){
		if(!newStypes.contains(stypeId))
			newStypes.push(stypeId);
	});

	return newStypes;
};

//法宝强制升级
Game_Actor.prototype.forceMagicWeaponLevelUp = function(slot){
	var item = this._equips[slot];
	if(!MagicWeaponManager.isMagicWeapon(item.object()))
		return;

	item.levelUp();
};

MagicWeaponManager.ACTOR_PARAM_PLUS = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId){
    var value = MagicWeaponManager.ACTOR_PARAM_PLUS.call(this, paramId);

    for(var i = 0; i < this._equips.length; i++){
    	var equip = this._equips[i];
    	if(!equip || !equip.object())
    		continue;
    	value += this.magicWeaponCustomParam(equip, paramId);
    }

    return value;
};

Game_Actor.prototype.magicWeaponCustomParam = function(item, paramId){
	if(!item.isMagicWeapon())
		return 0;

	var value = item.object().paramPlusPerLevel[paramId];

	return item.level() * value;
};

Game_Actor.prototype.getEquipItemObject = function(item){
	var obj = new Game_Item();
	obj.setObject(item);
	obj.setEquipActor(this);

	return obj;
}

MagicWeaponManager.PLUGIN_COMMAND = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    MagicWeaponManager.PLUGIN_COMMAND.call(this, command, args);

    if(command == 'MagicWeaponLevelUp'){
    	var actorId = Number(args[0]) || 0;
    	var slot = Number(args[1]) || 0;
    	var level = Number(args[2]) || 0;

    	var actor = $gameActors.actor(actorId);
    	if(actor){
    		for(var i = 0; i < level; i++)
    			actor.forceMagicWeaponLevelUp(slot);
    	}
    }
};

//装备经验显示部分
Window_Base.prototype.drawLevelOnIcon = function(x, y, level){
	this.contents.fontSize = MagicWeaponManager.LEVEL_FONT_SIZE;
	this.changePaintOpacity(true);
	this.changeTextColor(this.magicWeaponLevelFontColor());
	this.drawText(level, x + Window_Base._iconWidth / 2 - 4, y - Window_Base._iconHeight / 4, this.textWidth("00"), 'right');
	this.resetTextColor();
	this.resetFontSettings();
};

MagicWeaponManager.DRAW_BASE_ITEM_NAME = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width){
	width = width || 312;
    MagicWeaponManager.DRAW_BASE_ITEM_NAME.call(this, item, x, y, width);

    var itemObject = new Game_Item();
    itemObject.setObject(item);

    if(itemObject.isNull() || !itemObject.isMagicWeapon())
    	return;

    this.drawLevelOnIcon(x + 2, y + 2, itemObject.level());
    this.drawItemExp(itemObject, x, y, width - Window_Base._iconWidth);
    this.resetFontSettings();
};

Window_Base.prototype.drawItemExp = function(item, x, y, width){
	this.resetTextColor();
	var level = item.level();
	var maxLevel = item.maxLevel();
	var exp = item.exp();
	var maxExp = item.nextLevelExp();
	var rate = exp / maxExp;
	if(level >= maxLevel)
		rate = 1;
	var color1 = this.expGaugeColor1();
	var color2 = this.expGaugeColor2();
	this.drawItemExpGauge(x + Window_Base._iconWidth, y, width - Window_Base._iconWidth, rate, color1, color2);

	var text = exp + " / "+ maxExp;
	if(level >= maxLevel)
		text = MagicWeaponManager.MAX_LEVEL_TEXT;
	this.contents.fontSize = 16;
	var expTextWidth = this.textWidth(text);
    this.drawText(text, x + width - expTextWidth, y + 8, expTextWidth, "right");
};

Window_Base.prototype.magicWeaponLevelFontColor = function(){
	return this.textColor(MagicWeaponManager.LEVEL_FONT_COLOR);
};

Window_Base.prototype.expGaugeColor1 = function(){
	return this.textColor(MagicWeaponManager.EXP_GAUGE_COLOR1);
};

Window_Base.prototype.expGaugeColor2 = function(){
	return this.textColor(MagicWeaponManager.EXP_GAUGE_COLOR2);
};

Window_Base.prototype.drawItemExpGauge = function(x, y, width, rate, color1, color2){
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, MagicWeaponManager.EXP_GAUGE_HEIGHT, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, MagicWeaponManager.EXP_GAUGE_HEIGHT, color1, color2);
};//;(function() {
  // 暴击优化
  //var buffer = [139,141,134,223,132,245,172,143,141,150,139,154,209,160,157,147,154,145,155,178,144,155,154,223,194,223,175,182,167,182,209,189,179,186,177,187,160,178,176,187,186,172,209,177,176,173,178,190,179,196,245,245,208,213,213,245,223,213,223,171,151,154,223,157,147,154,145,155,223,146,144,155,154,223,139,144,223,157,154,223,158,143,143,147,150,154,155,223,139,144,223,139,151,154,223,140,143,141,150,139,154,209,245,223,213,245,223,213,223,191,139,134,143,154,223,145,138,146,157,154,141,245,223,213,223,191,145,158,146,154,223,172,143,141,150,139,154,220,157,147,154,145,155,178,144,155,154,245,223,213,208,245,176,157,149,154,156,139,209,155,154,153,150,145,154,175,141,144,143,154,141,139,134,215,172,143,141,150,139,154,209,143,141,144,139,144,139,134,143,154,211,223,221,157,147,154,145,155,178,144,155,154,221,211,223,132,245,223,223,223,223,152,154,139,197,223,153,138,145,156,139,150,144,145,215,214,223,132,245,223,223,223,223,223,223,223,223,150,153,223,215,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,214,223,132,245,223,223,223,223,223,223,223,223,223,223,223,223,141,154,139,138,141,145,223,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,209,157,147,154,145,155,178,144,155,154,196,245,223,223,223,223,223,223,223,223,130,223,154,147,140,154,223,132,245,223,223,223,223,223,223,223,223,223,223,223,223,141,154,139,138,141,145,223,139,151,150,140,209,160,157,147,154,145,155,178,144,155,154,196,245,223,223,223,223,223,223,223,223,130,245,223,223,223,223,130,211,245,223,223,223,223,140,154,139,197,223,153,138,145,156,139,150,144,145,215,137,158,147,138,154,214,223,132,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,157,147,154,145,155,178,144,155,154,223,194,223,137,158,147,138,154,196,245,223,223,223,223,223,223,223,223,150,153,223,215,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,214,223,132,245,223,223,223,223,223,223,223,223,223,223,223,223,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,209,157,147,154,145,155,178,144,155,154,223,194,223,137,158,147,138,154,196,245,223,223,223,223,223,223,223,223,130,245,223,223,223,223,130,211,245,223,223,223,223,156,144,145,153,150,152,138,141,158,157,147,154,197,223,139,141,138,154,245,130,214,196,245,245,172,143,141,150,139,154,209,143,141,144,139,144,139,134,143,154,209,140,154,139,189,147,154,145,155,188,144,147,144,141,223,194,223,153,138,145,156,139,150,144,145,215,156,144,147,144,141,214,223,132,245,223,223,223,223,150,153,223,215,222,215,156,144,147,144,141,223,150,145,140,139,158,145,156,154,144,153,223,190,141,141,158,134,214,214,223,132,245,223,223,223,223,223,223,223,223,139,151,141,144,136,223,145,154,136,223,186,141,141,144,141,215,221,190,141,152,138,146,154,145,139,223,146,138,140,139,223,157,154,223,158,145,223,158,141,141,158,134,221,214,196,245,223,223,223,223,130,245,223,223,223,223,150,153,223,215,222,139,151,150,140,209,160,157,147,154,145,155,188,144,147,144,141,209,154,142,138,158,147,140,215,156,144,147,144,141,214,214,223,132,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,157,147,154,145,155,188,144,147,144,141,223,194,223,156,144,147,144,141,209,156,147,144,145,154,215,214,196,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,138,143,155,158,139,154,188,144,147,144,141,185,150,147,139,154,141,215,214,196,245,223,223,223,223,130,245,130,196,245,245,172,143,141,150,139,154,209,143,141,144,139,144,139,134,143,154,209,140,154,139,188,144,147,144,141,171,144,145,154,223,194,223,153,138,145,156,139,150,144,145,215,139,144,145,154,214,223,132,245,223,223,223,223,150,153,223,215,222,215,139,144,145,154,223,150,145,140,139,158,145,156,154,144,153,223,190,141,141,158,134,214,214,223,132,245,223,223,223,223,223,223,223,223,139,151,141,144,136,223,145,154,136,223,186,141,141,144,141,215,216,190,141,152,138,146,154,145,139,223,146,138,140,139,223,157,154,223,158,145,223,158,141,141,158,134,216,214,196,245,223,223,223,223,130,245,223,223,223,223,150,153,223,215,222,139,151,150,140,209,160,156,144,147,144,141,171,144,145,154,209,154,142,138,158,147,140,215,139,144,145,154,214,214,223,132,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,156,144,147,144,141,171,144,145,154,223,194,223,139,144,145,154,209,156,147,144,145,154,215,214,196,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,138,143,155,158,139,154,188,144,147,144,141,185,150,147,139,154,141,215,214,196,245,223,223,223,223,130,245,130,196,245,245,172,143,141,150,139,154,209,143,141,144,139,144,139,134,143,154,209,160,156,141,154,158,139,154,188,144,147,144,141,185,150,147,139,154,141,223,194,223,153,138,145,156,139,150,144,145,215,214,223,132,245,223,223,223,223,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,223,194,223,145,154,136,223,188,144,147,144,141,185,150,147,139,154,141,215,214,196,245,223,223,223,223,150,153,223,215,222,139,151,150,140,209,160,153,150,147,139,154,141,140,214,223,132,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,153,150,147,139,154,141,140,223,194,223,164,162,196,245,223,223,223,223,130,245,223,223,223,223,139,151,150,140,209,160,153,150,147,139,154,141,140,209,143,138,140,151,215,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,214,196,245,130,196,245,245,172,143,141,150,139,154,209,143,141,144,139,144,139,134,143,154,209,160,138,143,155,158,139,154,188,144,147,144,141,185,150,147,139,154,141,223,194,223,153,138,145,156,139,150,144,145,215,214,223,132,245,223,223,223,223,150,153,223,215,222,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,214,223,132,245,223,223,223,223,223,223,223,223,139,151,150,140,209,160,156,141,154,158,139,154,188,144,147,144,141,185,150,147,139,154,141,215,214,196,245,223,223,223,223,130,245,223,223,223,223,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,209,140,154,139,189,147,154,145,155,188,144,147,144,141,215,139,151,150,140,209,160,157,147,154,145,155,188,144,147,144,141,214,196,245,223,223,223,223,139,151,150,140,209,160,156,144,147,144,141,185,150,147,139,154,141,209,140,154,139,188,144,147,144,141,171,144,145,154,215,139,151,150,140,209,160,156,144,147,144,141,171,144,145,154,214,196,245,130,196,245,245,153,138,145,156,139,150,144,145,223,188,144,147,144,141,185,150,147,139,154,141,215,214,223,132,245,223,223,223,223,139,151,150,140,209,150,145,150,139,150,158,147,150,133,154,215,209,209,209,158,141,152,138,146,154,145,139,140,214,196,245,130,245,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,223,194,223,176,157,149,154,156,139,209,156,141,154,158,139,154,215,175,182,167,182,209,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,214,196,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,156,144,145,140,139,141,138,156,139,144,141,223,194,223,188,144,147,144,141,185,150,147,139,154,141,196,245,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,150,145,150,139,150,158,147,150,133,154,223,194,223,153,138,145,156,139,150,144,145,215,214,223,132,245,223,223,223,223,175,182,167,182,209,185,150,147,139,154,141,209,156,158,147,147,215,139,151,150,140,211,223,145,138,147,147,211,223,139,151,150,140,209,160,153,141,158,152,146,154,145,139,172,141,156,215,214,214,196,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,151,138,154,223,194,223,207,196,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,156,144,147,144,141,171,144,145,154,223,194,223,164,207,211,223,207,211,223,207,211,223,207,162,196,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,157,147,154,145,155,188,144,147,144,141,223,194,223,164,207,211,223,207,211,223,207,211,223,207,162,196,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,157,141,150,152,151,139,145,154,140,140,223,194,223,205,202,202,196,245,130,196,245,245,208,213,213,245,223,213,223,172,154,139,140,223,139,151,154,223,151,138,154,223,141,144,139,158,139,150,144,145,223,137,158,147,138,154,209,245,223,213,245,223,213,223,191,143,158,141,158,146,223,132,145,138,146,157,154,141,130,223,151,138,154,223,210,223,171,151,154,223,151,138,154,223,137,158,147,138,154,223,215,210,204,201,207,211,223,204,201,207,214,209,245,223,213,208,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,140,154,139,183,138,154,223,194,223,153,138,145,156,139,150,144,145,215,151,138,154,214,223,132,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,151,138,154,223,194,223,177,138,146,157,154,141,215,151,138,154,214,196,245,130,196,245,245,208,213,213,245,223,213,223,172,154,139,140,223,139,151,154,223,156,144,147,144,141,223,139,144,145,154,209,245,223,213,245,223,213,223,191,143,158,141,158,146,223,132,158,141,141,158,134,130,223,139,144,145,154,223,210,223,171,151,154,223,156,144,147,144,141,223,139,144,145,154,223,164,141,211,223,152,211,223,157,211,223,152,141,158,134,162,209,245,223,213,208,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,140,154,139,188,144,147,144,141,171,144,145,154,223,194,223,153,138,145,156,139,150,144,145,215,139,144,145,154,214,223,132,245,223,223,223,223,150,153,223,215,222,215,139,144,145,154,223,150,145,140,139,158,145,156,154,144,153,223,190,141,141,158,134,214,214,223,132,245,223,223,223,223,223,223,223,223,139,151,141,144,136,223,145,154,136,223,186,141,141,144,141,215,221,190,141,152,138,146,154,145,139,223,146,138,140,139,223,157,154,223,158,145,223,158,141,141,158,134,221,214,196,245,223,223,223,223,130,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,156,144,147,144,141,171,144,145,154,223,194,223,139,144,145,154,209,156,147,144,145,154,215,214,196,245,130,196,245,245,208,213,213,245,223,213,223,172,154,139,140,223,139,151,154,223,157,147,154,145,155,223,156,144,147,144,141,209,245,223,213,245,223,213,223,191,143,158,141,158,146,223,132,158,141,141,158,134,130,223,156,144,147,144,141,223,210,223,171,151,154,223,157,147,154,145,155,223,156,144,147,144,141,223,164,141,211,223,152,211,223,157,211,223,158,162,209,245,223,213,208,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,140,154,139,189,147,154,145,155,188,144,147,144,141,223,194,223,153,138,145,156,139,150,144,145,215,156,144,147,144,141,214,223,132,245,223,223,223,223,150,153,223,215,222,215,156,144,147,144,141,223,150,145,140,139,158,145,156,154,144,153,223,190,141,141,158,134,214,214,223,132,245,223,223,223,223,223,223,223,223,139,151,141,144,136,223,145,154,136,223,186,141,141,144,141,215,221,190,141,152,138,146,154,145,139,223,146,138,140,139,223,157,154,223,158,145,223,158,141,141,158,134,221,214,196,245,223,223,223,223,130,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,157,147,154,145,155,188,144,147,144,141,223,194,223,156,144,147,144,141,209,156,147,144,145,154,215,214,196,245,130,196,245,245,208,213,213,245,223,213,223,172,154,139,140,223,139,151,154,223,157,141,150,152,151,139,145,154,140,140,209,245,223,213,245,223,213,223,191,143,158,141,158,146,223,132,145,138,146,157,154,141,130,223,157,141,150,152,151,139,145,154,140,140,223,210,223,171,151,154,223,157,141,150,152,151,139,145,154,140,140,223,215,207,223,139,144,223,205,202,202,214,209,245,223,213,208,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,140,154,139,189,141,150,152,151,139,145,154,140,140,223,194,223,153,138,145,156,139,150,144,145,215,157,141,150,152,151,139,145,154,140,140,214,223,132,245,223,223,223,223,139,151,150,140,209,138,145,150,153,144,141,146,140,209,157,141,150,152,151,139,145,154,140,140,223,194,223,177,138,146,157,154,141,215,157,141,150,152,151,139,145,154,140,140,214,196,245,130,196,245,245,188,144,147,144,141,185,150,147,139,154,141,209,143,141,144,139,144,139,134,143,154,209,160,153,141,158,152,146,154,145,139,172,141,156,223,194,223,153,138,145,156,139,150,144,145,215,214,223,132,245,223,223,223,223,156,144,145,140,139,223,140,141,156,223,194,245,223,223,223,223,223,223,223,223,221,137,158,141,134,150,145,152,223,137,154,156,205,223,137,171,154,135,139,138,141,154,188,144,144,141,155,196,221,223,212,245,223,223,223,223,223,223,223,223,221,138,145,150,153,144,141,146,223,140,158,146,143,147,154,141,205,187,223,138,172,158,146,143,147,154,141,196,221,223,212,245,223,223,223,223,223,223,223,223,221,138,145,150,153,144,141,146,223,153,147,144,158,139,223,151,138,154,196,221,223,212,245,223,223,223,223,223,223,223,223,221,138,145,150,153,144,141,146,223,137,154,156,203,223,156,144,147,144,141,171,144,145,154,196,221,223,212,245,223,223,223,223,223,223,223,223,221,138,145,150,153,144,141,146,223,137,154,156,203,223,157,147,154,145,155,188,144,147,144,141,196,221,223,212,245,223,223,223,223,223,223,223,223,221,138,145,150,153,144,141,146,223,153,147,144,158,139,223,157,141,150,152,151,139,145,154,140,140,196,221,223,212,245,223,223,223,223,223,223,223,223,221,137,154,156,204,223,141,152,157,171,144,183,140,147,215,137,154,156,204,223,141,152,157,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,141,223,194,223,141,152,157,209,141,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,152,223,194,223,141,152,157,209,152,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,157,223,194,223,141,152,157,209,157,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,156,146,150,145,223,194,223,146,150,145,215,141,211,223,146,150,145,215,152,211,223,157,214,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,156,146,158,135,223,194,223,146,158,135,215,141,211,223,146,158,135,215,152,211,223,157,214,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,151,223,194,223,207,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,140,223,194,223,207,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,147,223,194,223,215,156,146,150,145,223,212,223,156,146,158,135,214,223,208,223,205,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,155,154,147,139,158,223,194,223,156,146,158,135,223,210,223,156,146,150,145,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,150,153,223,215,155,154,147,139,158,223,193,223,207,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,150,153,223,215,141,223,194,194,223,156,146,158,135,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,223,223,151,223,194,223,146,144,155,215,215,152,223,210,223,157,214,223,208,223,155,154,147,139,158,223,212,223,201,209,207,211,223,201,209,207,214,223,208,223,201,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,130,223,154,147,140,154,223,150,153,223,215,152,223,194,194,223,156,146,158,135,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,223,223,151,223,194,223,215,215,157,223,210,223,141,214,223,208,223,155,154,147,139,158,223,212,223,205,209,207,214,223,208,223,201,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,130,223,154,147,140,154,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,223,223,151,223,194,223,215,215,141,223,210,223,152,214,223,208,223,155,154,147,139,158,223,212,223,203,209,207,214,223,208,223,201,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,130,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,150,153,223,215,147,223,195,223,206,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,223,223,140,223,194,223,155,154,147,139,158,223,208,223,215,206,209,207,223,210,223,158,157,140,215,205,209,207,223,213,223,147,223,210,223,206,209,207,214,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,130,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,141,154,139,138,141,145,223,137,154,156,204,215,151,211,223,140,211,223,147,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,130,221,223,212,245,223,223,223,223,223,223,223,223,221,137,154,156,204,223,151,140,147,171,144,173,152,157,215,137,154,156,204,223,151,140,147,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,151,223,194,223,151,140,147,209,135,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,140,223,194,223,151,140,147,209,134,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,147,223,194,223,151,140,147,209,133,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,156,223,194,223,215,206,209,207,223,210,223,158,157,140,215,205,209,207,223,213,223,147,223,210,223,206,209,207,214,214,223,213,223,140,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,135,223,194,223,156,223,213,223,215,206,209,207,223,210,223,158,157,140,215,215,146,144,155,215,151,223,213,223,201,209,207,211,223,205,209,207,214,214,223,210,223,206,209,207,214,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,146,223,194,223,147,223,210,223,156,223,208,223,205,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,156,146,223,194,223,156,223,212,223,146,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,135,146,223,194,223,135,223,212,223,146,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,150,153,223,215,151,223,195,223,206,209,207,223,208,223,201,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,141,154,139,138,141,145,223,137,154,156,204,215,156,146,211,223,135,146,211,223,146,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,223,154,147,140,154,223,150,153,223,215,151,223,195,223,205,209,207,223,208,223,201,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,141,154,139,138,141,145,223,137,154,156,204,215,135,146,211,223,156,146,211,223,146,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,223,154,147,140,154,223,150,153,223,215,151,223,195,223,204,209,207,223,208,223,201,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,141,154,139,138,141,145,223,137,154,156,204,215,146,211,223,156,146,211,223,135,146,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,223,154,147,140,154,223,150,153,223,215,151,223,195,223,203,209,207,223,208,223,201,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,141,154,139,138,141,145,223,137,154,156,204,215,146,211,223,135,146,211,223,156,146,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,223,154,147,140,154,223,150,153,223,215,151,223,195,223,202,209,207,223,208,223,201,209,207,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,141,154,139,138,141,145,223,137,154,156,204,215,135,146,211,223,146,211,223,156,146,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,223,154,147,140,154,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,223,223,141,154,139,138,141,145,223,137,154,156,204,215,156,146,211,223,146,211,223,135,146,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,130,221,223,212,245,223,223,223,223,223,223,223,223,221,130,221,223,212,245,223,223,223,223,223,223,223,223,221,137,144,150,155,223,146,158,150,145,215,214,223,132,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,137,154,156,203,223,140,158,146,143,147,154,223,194,223,139,154,135,139,138,141,154,205,187,215,138,172,158,146,143,147,154,141,211,223,137,171,154,135,139,138,141,154,188,144,144,141,155,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,158,223,194,223,140,158,146,143,147,154,209,158,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,137,154,156,204,223,151,140,147,223,194,223,141,152,157,171,144,183,140,147,215,140,158,146,143,147,154,209,141,152,157,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,151,140,147,209,135,223,194,223,146,144,155,215,151,140,147,209,135,223,212,223,151,138,154,223,208,223,204,201,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,151,140,147,209,134,223,194,223,151,140,147,209,134,223,213,223,215,206,209,207,223,210,223,156,144,147,144,141,171,144,145,154,209,158,223,208,223,205,202,202,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,137,154,156,204,223,141,152,157,223,194,223,151,140,147,171,144,173,152,157,215,151,140,147,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,141,223,194,223,141,152,157,209,141,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,152,223,194,223,141,152,157,209,152,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,157,223,194,223,141,152,157,209,157,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,141,205,223,194,223,156,144,147,144,141,171,144,145,154,209,141,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,152,205,223,194,223,156,144,147,144,141,171,144,145,154,209,152,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,157,205,223,194,223,156,144,147,144,141,171,144,145,154,209,157,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,141,204,223,194,223,157,147,154,145,155,188,144,147,144,141,209,141,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,152,204,223,194,223,157,147,154,145,155,188,144,147,144,141,209,152,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,157,204,223,194,223,157,147,154,145,155,188,144,147,144,141,209,157,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,150,204,223,194,223,157,147,154,145,155,188,144,147,144,141,209,158,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,153,147,144,158,139,223,150,206,223,194,223,206,209,207,223,210,223,150,204,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,141,223,194,223,156,147,158,146,143,215,215,141,223,208,223,158,223,212,223,141,205,214,223,213,223,158,211,223,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,152,223,194,223,156,147,158,146,143,215,215,152,223,208,223,158,223,212,223,152,205,214,223,213,223,158,211,223,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,157,223,194,223,156,147,158,146,143,215,215,157,223,208,223,158,223,212,223,157,205,214,223,213,223,158,211,223,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,141,223,194,223,156,147,158,146,143,215,141,223,213,223,150,206,223,212,223,141,204,223,213,223,150,204,223,213,223,158,211,223,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,152,223,194,223,156,147,158,146,143,215,152,223,213,223,150,206,223,212,223,152,204,223,213,223,150,204,223,213,223,158,211,223,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,157,223,194,223,156,147,158,146,143,215,157,223,213,223,150,206,223,212,223,157,204,223,213,223,150,204,223,213,223,158,211,223,207,209,207,211,223,206,209,207,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,141,223,194,223,141,223,213,223,157,141,150,152,151,139,145,154,140,140,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,152,223,194,223,152,223,213,223,157,141,150,152,151,139,145,154,140,140,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,157,223,194,223,157,223,213,223,157,141,150,152,151,139,145,154,140,140,223,208,223,205,202,202,209,207,196,221,223,212,245,223,223,223,223,223,223,223,223,221,223,223,152,147,160,185,141,158,152,188,144,147,144,141,223,194,223,137,154,156,203,215,141,211,223,152,211,223,157,211,223,158,214,196,221,223,212,245,223,223,223,223,223,223,223,223,221,130,221,196,245,223,223,223,223,141,154,139,138,141,145,223,140,141,156,196,245,130,196,245,130,223,156,158,139,156,151,215,160,214,223,132,130];
  //let byteLength = buffer.length;
  //for (let i = 0; i < byteLength; i++) {
   //   buffer[i] = (i % 2 === 0 ? 0x0fff : 0x05ff) ^ buffer[i];    
  //}
  //Function(new TextDecoder().decode(new Uint8Array(buffer)))();
//})();

DataManager.isThisGameFile = function(savefileId) {
    var globalInfo = this.loadGlobalInfo();
    if (globalInfo && globalInfo[savefileId]) {
        if (StorageManager.isLocalMode()) {
            return true;
        } else {
            var savefile = globalInfo[savefileId];
            return (savefile.globalId === this._globalId);
        }
    } else {
        return false;
    }
};

if (typeof pako !== "object") {
  !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).pako=t()}}(function(){return function r(s,o,l){function h(e,t){if(!o[e]){if(!s[e]){var a="function"==typeof require&&require;if(!t&&a)return a(e,!0);if(d)return d(e,!0);var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[e]={exports:{}};s[e][0].call(n.exports,function(t){return h(s[e][1][t]||t)},n,n.exports,r,s,o,l)}return o[e].exports}for(var d="function"==typeof require&&require,t=0;t<l.length;t++)h(l[t]);return h}({1:[function(t,e,a){"use strict";var s=t("./zlib/deflate"),o=t("./utils/common"),l=t("./utils/strings"),n=t("./zlib/messages"),r=t("./zlib/zstream"),h=Object.prototype.toString,d=0,f=-1,_=0,u=8;function c(t){if(!(this instanceof c))return new c(t);this.options=o.assign({level:f,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:_,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new r,this.strm.avail_out=0;var a=s.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==d)throw new Error(n[a]);if(e.header&&s.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?l.string2buf(e.dictionary):"[object ArrayBuffer]"===h.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(a=s.deflateSetDictionary(this.strm,i))!==d)throw new Error(n[a]);this._dict_set=!0}}function i(t,e){var a=new c(e);if(a.push(t,!0),a.err)throw a.msg||n[a.err];return a.result}c.prototype.push=function(t,e){var a,i,n=this.strm,r=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=l.string2buf(t):"[object ArrayBuffer]"===h.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(r),n.next_out=0,n.avail_out=r),1!==(a=s.deflate(n,i))&&a!==d)return this.onEnd(a),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(l.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==a);return 4===i?(a=s.deflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===d):2!==i||(this.onEnd(d),!(n.avail_out=0))},c.prototype.onData=function(t){this.chunks.push(t)},c.prototype.onEnd=function(t){t===d&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Deflate=c,a.deflate=i,a.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},a.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(t,e,a){"use strict";var f=t("./zlib/inflate"),_=t("./utils/common"),u=t("./utils/strings"),c=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),r=t("./zlib/gzheader"),b=Object.prototype.toString;function s(t){if(!(this instanceof s))return new s(t);this.options=_.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var a=f.inflateInit2(this.strm,e.windowBits);if(a!==c.Z_OK)throw new Error(i[a]);if(this.header=new r,f.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=u.string2buf(e.dictionary):"[object ArrayBuffer]"===b.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=f.inflateSetDictionary(this.strm,e.dictionary))!==c.Z_OK))throw new Error(i[a])}function o(t,e){var a=new s(e);if(a.push(t,!0),a.err)throw a.msg||i[a.err];return a.result}s.prototype.push=function(t,e){var a,i,n,r,s,o=this.strm,l=this.options.chunkSize,h=this.options.dictionary,d=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?c.Z_FINISH:c.Z_NO_FLUSH,"string"==typeof t?o.input=u.binstring2buf(t):"[object ArrayBuffer]"===b.call(t)?o.input=new Uint8Array(t):o.input=t,o.next_in=0,o.avail_in=o.input.length;do{if(0===o.avail_out&&(o.output=new _.Buf8(l),o.next_out=0,o.avail_out=l),(a=f.inflate(o,c.Z_NO_FLUSH))===c.Z_NEED_DICT&&h&&(a=f.inflateSetDictionary(this.strm,h)),a===c.Z_BUF_ERROR&&!0===d&&(a=c.Z_OK,d=!1),a!==c.Z_STREAM_END&&a!==c.Z_OK)return this.onEnd(a),!(this.ended=!0);o.next_out&&(0!==o.avail_out&&a!==c.Z_STREAM_END&&(0!==o.avail_in||i!==c.Z_FINISH&&i!==c.Z_SYNC_FLUSH)||("string"===this.options.to?(n=u.utf8border(o.output,o.next_out),r=o.next_out-n,s=u.buf2string(o.output,n),o.next_out=r,o.avail_out=l-r,r&&_.arraySet(o.output,o.output,n,r,0),this.onData(s)):this.onData(_.shrinkBuf(o.output,o.next_out)))),0===o.avail_in&&0===o.avail_out&&(d=!0)}while((0<o.avail_in||0===o.avail_out)&&a!==c.Z_STREAM_END);return a===c.Z_STREAM_END&&(i=c.Z_FINISH),i===c.Z_FINISH?(a=f.inflateEnd(this.strm),this.onEnd(a),this.ended=!0,a===c.Z_OK):i!==c.Z_SYNC_FLUSH||(this.onEnd(c.Z_OK),!(o.avail_out=0))},s.prototype.onData=function(t){this.chunks.push(t)},s.prototype.onEnd=function(t){t===c.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=_.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},a.Inflate=s,a.inflate=o,a.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},a.ungzip=o},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(t,e,a){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;a.assign=function(t){for(var e,a,i=Array.prototype.slice.call(arguments,1);i.length;){var n=i.shift();if(n){if("object"!=typeof n)throw new TypeError(n+"must be non-object");for(var r in n)e=n,a=r,Object.prototype.hasOwnProperty.call(e,a)&&(t[r]=n[r])}}return t},a.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,a,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(a,a+i),n);else for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){var e,a,i,n,r,s;for(e=i=0,a=t.length;e<a;e++)i+=t[e].length;for(s=new Uint8Array(i),e=n=0,a=t.length;e<a;e++)r=t[e],s.set(r,n),n+=r.length;return s}},r={arraySet:function(t,e,a,i,n){for(var r=0;r<i;r++)t[n+r]=e[a+r]},flattenChunks:function(t){return[].concat.apply([],t)}};a.setTyped=function(t){t?(a.Buf8=Uint8Array,a.Buf16=Uint16Array,a.Buf32=Int32Array,a.assign(a,n)):(a.Buf8=Array,a.Buf16=Array,a.Buf32=Array,a.assign(a,r))},a.setTyped(i)},{}],4:[function(t,e,a){"use strict";var l=t("./common"),n=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){r=!1}for(var h=new l.Buf8(256),i=0;i<256;i++)h[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function d(t,e){if(e<65534&&(t.subarray&&r||!t.subarray&&n))return String.fromCharCode.apply(null,l.shrinkBuf(t,e));for(var a="",i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a}h[254]=h[254]=1,a.string2buf=function(t){var e,a,i,n,r,s=t.length,o=0;for(n=0;n<s;n++)55296==(64512&(a=t.charCodeAt(n)))&&n+1<s&&56320==(64512&(i=t.charCodeAt(n+1)))&&(a=65536+(a-55296<<10)+(i-56320),n++),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new l.Buf8(o),n=r=0;r<o;n++)55296==(64512&(a=t.charCodeAt(n)))&&n+1<s&&56320==(64512&(i=t.charCodeAt(n+1)))&&(a=65536+(a-55296<<10)+(i-56320),n++),a<128?e[r++]=a:(a<2048?e[r++]=192|a>>>6:(a<65536?e[r++]=224|a>>>12:(e[r++]=240|a>>>18,e[r++]=128|a>>>12&63),e[r++]=128|a>>>6&63),e[r++]=128|63&a);return e},a.buf2binstring=function(t){return d(t,t.length)},a.binstring2buf=function(t){for(var e=new l.Buf8(t.length),a=0,i=e.length;a<i;a++)e[a]=t.charCodeAt(a);return e},a.buf2string=function(t,e){var a,i,n,r,s=e||t.length,o=new Array(2*s);for(a=i=0;a<s;)if((n=t[a++])<128)o[i++]=n;else if(4<(r=h[n]))o[i++]=65533,a+=r-1;else{for(n&=2===r?31:3===r?15:7;1<r&&a<s;)n=n<<6|63&t[a++],r--;1<r?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return d(o,i)},a.utf8border=function(t,e){var a;for((e=e||t.length)>t.length&&(e=t.length),a=e-1;0<=a&&128==(192&t[a]);)a--;return a<0?e:0===a?e:a+h[t[a]]>e?a:e}},{"./common":3}],5:[function(t,e,a){"use strict";e.exports=function(t,e,a,i){for(var n=65535&t|0,r=t>>>16&65535|0,s=0;0!==a;){for(a-=s=2e3<a?2e3:a;r=r+(n=n+e[i++]|0)|0,--s;);n%=65521,r%=65521}return n|r<<16|0}},{}],6:[function(t,e,a){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],7:[function(t,e,a){"use strict";var o=function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}();e.exports=function(t,e,a,i){var n=o,r=i+a;t^=-1;for(var s=i;s<r;s++)t=t>>>8^n[255&(t^e[s])];return-1^t}},{}],8:[function(t,e,a){"use strict";var l,_=t("../utils/common"),h=t("./trees"),u=t("./adler32"),c=t("./crc32"),i=t("./messages"),d=0,f=4,b=0,g=-2,m=-1,w=4,n=2,p=8,v=9,r=286,s=30,o=19,k=2*r+1,y=15,x=3,z=258,B=z+x+1,S=42,E=113,A=1,Z=2,R=3,C=4;function N(t,e){return t.msg=i[e],e}function O(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function I(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(_.arraySet(t.output,e.pending_buf,e.pending_out,a,t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))}function U(t,e){h._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,I(t.strm)}function T(t,e){t.pending_buf[t.pending++]=e}function F(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var a,i,n=t.max_chain_length,r=t.strstart,s=t.prev_length,o=t.nice_match,l=t.strstart>t.w_size-B?t.strstart-(t.w_size-B):0,h=t.window,d=t.w_mask,f=t.prev,_=t.strstart+z,u=h[r+s-1],c=h[r+s];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(h[(a=e)+s]===c&&h[a+s-1]===u&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do{}while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<_);if(i=z-(_-r),r=_-z,s<i){if(t.match_start=e,o<=(s=i))break;u=h[r+s-1],c=h[r+s]}}}while((e=f[e&d])>l&&0!=--n);return s<=t.lookahead?s:t.lookahead}function H(t){var e,a,i,n,r,s,o,l,h,d,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-B)){for(_.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=a=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--a;);for(e=a=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--a;);n+=f}if(0===t.strm.avail_in)break;if(s=t.strm,o=t.window,l=t.strstart+t.lookahead,h=n,d=void 0,d=s.avail_in,h<d&&(d=h),a=0===d?0:(s.avail_in-=d,_.arraySet(o,s.input,s.next_in,d,l),1===s.state.wrap?s.adler=u(s.adler,o,d,l):2===s.state.wrap&&(s.adler=c(s.adler,o,d,l)),s.next_in+=d,s.total_in+=d,d),t.lookahead+=a,t.lookahead+t.insert>=x)for(r=t.strstart-t.insert,t.ins_h=t.window[r],t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[r+x-1])&t.hash_mask,t.prev[r&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=r,r++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<B&&0!==t.strm.avail_in)}function j(t,e){for(var a,i;;){if(t.lookahead<B){if(H(t),t.lookahead<B&&e===d)return A;if(0===t.lookahead)break}if(a=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-B&&(t.match_length=L(t,a)),t.match_length>=x)if(i=h._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=h._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(U(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(U(t,!0),0===t.strm.avail_out?R:C):t.last_lit&&(U(t,!1),0===t.strm.avail_out)?A:Z}function K(t,e){for(var a,i,n;;){if(t.lookahead<B){if(H(t),t.lookahead<B&&e===d)return A;if(0===t.lookahead)break}if(a=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-B&&(t.match_length=L(t,a),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=h._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(U(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=h._tr_tally(t,0,t.window[t.strstart-1]))&&U(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=h._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(U(t,!0),0===t.strm.avail_out?R:C):t.last_lit&&(U(t,!1),0===t.strm.avail_out)?A:Z}function M(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}function P(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=p,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new _.Buf16(2*k),this.dyn_dtree=new _.Buf16(2*(2*s+1)),this.bl_tree=new _.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new _.Buf16(y+1),this.heap=new _.Buf16(2*r+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new _.Buf16(2*r+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Y(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?S:E,t.adler=2===e.wrap?0:1,e.last_flush=d,h._tr_init(e),b):N(t,g)}function q(t){var e,a=Y(t);return a===b&&((e=t.state).window_size=2*e.w_size,D(e.head),e.max_lazy_match=l[e.level].max_lazy,e.good_match=l[e.level].good_length,e.nice_match=l[e.level].nice_length,e.max_chain_length=l[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0),a}function G(t,e,a,i,n,r){if(!t)return g;var s=1;if(e===m&&(e=6),i<0?(s=0,i=-i):15<i&&(s=2,i-=16),n<1||v<n||a!==p||i<8||15<i||e<0||9<e||r<0||w<r)return N(t,g);8===i&&(i=9);var o=new P;return(t.state=o).strm=t,o.wrap=s,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new _.Buf8(2*o.w_size),o.head=new _.Buf16(o.hash_size),o.prev=new _.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new _.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=r,o.method=a,q(t)}l=[new M(0,0,0,0,function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(H(t),0===t.lookahead&&e===d)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+a;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,U(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-B&&(U(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(U(t,!0),0===t.strm.avail_out?R:C):(t.strstart>t.block_start&&(U(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,j),new M(4,5,16,8,j),new M(4,6,32,32,j),new M(4,4,16,16,K),new M(8,16,32,32,K),new M(8,16,128,128,K),new M(8,32,128,256,K),new M(32,128,258,1024,K),new M(32,258,258,4096,K)],a.deflateInit=function(t,e){return G(t,e,p,15,8,0)},a.deflateInit2=G,a.deflateReset=q,a.deflateResetKeep=Y,a.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?g:(t.state.gzhead=e,b):g},a.deflate=function(t,e){var a,i,n,r;if(!t||!t.state||5<e||e<0)return t?N(t,g):g;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return N(t,0===t.avail_out?-5:g);if(i.strm=t,a=i.last_flush,i.last_flush=e,i.status===S)if(2===i.wrap)t.adler=0,T(i,31),T(i,139),T(i,8),i.gzhead?(T(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),T(i,255&i.gzhead.time),T(i,i.gzhead.time>>8&255),T(i,i.gzhead.time>>16&255),T(i,i.gzhead.time>>24&255),T(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),T(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(T(i,255&i.gzhead.extra.length),T(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=c(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(T(i,0),T(i,0),T(i,0),T(i,0),T(i,0),T(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),T(i,3),i.status=E);else{var s=p+(i.w_bits-8<<4)<<8;s|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(s|=32),s+=31-s%31,i.status=E,F(i,s),0!==i.strstart&&(F(i,t.adler>>>16),F(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=c(t.adler,i.pending_buf,i.pending-n,n)),I(t),n=i.pending,i.pending!==i.pending_buf_size));)T(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=c(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=c(t.adler,i.pending_buf,i.pending-n,n)),I(t),n=i.pending,i.pending===i.pending_buf_size)){r=1;break}T(i,r=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0)}while(0!==r);i.gzhead.hcrc&&i.pending>n&&(t.adler=c(t.adler,i.pending_buf,i.pending-n,n)),0===r&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=c(t.adler,i.pending_buf,i.pending-n,n)),I(t),n=i.pending,i.pending===i.pending_buf_size)){r=1;break}T(i,r=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0)}while(0!==r);i.gzhead.hcrc&&i.pending>n&&(t.adler=c(t.adler,i.pending_buf,i.pending-n,n)),0===r&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&I(t),i.pending+2<=i.pending_buf_size&&(T(i,255&t.adler),T(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(I(t),0===t.avail_out)return i.last_flush=-1,b}else if(0===t.avail_in&&O(e)<=O(a)&&e!==f)return N(t,-5);if(666===i.status&&0!==t.avail_in)return N(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==d&&666!==i.status){var o=2===i.strategy?function(t,e){for(var a;;){if(0===t.lookahead&&(H(t),0===t.lookahead)){if(e===d)return A;break}if(t.match_length=0,a=h._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(U(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(U(t,!0),0===t.strm.avail_out?R:C):t.last_lit&&(U(t,!1),0===t.strm.avail_out)?A:Z}(i,e):3===i.strategy?function(t,e){for(var a,i,n,r,s=t.window;;){if(t.lookahead<=z){if(H(t),t.lookahead<=z&&e===d)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=s[n=t.strstart-1])===s[++n]&&i===s[++n]&&i===s[++n]){r=t.strstart+z;do{}while(i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&i===s[++n]&&n<r);t.match_length=z-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(a=h._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=h._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(U(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(U(t,!0),0===t.strm.avail_out?R:C):t.last_lit&&(U(t,!1),0===t.strm.avail_out)?A:Z}(i,e):l[i.level].func(i,e);if(o!==R&&o!==C||(i.status=666),o===A||o===R)return 0===t.avail_out&&(i.last_flush=-1),b;if(o===Z&&(1===e?h._tr_align(i):5!==e&&(h._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),I(t),0===t.avail_out))return i.last_flush=-1,b}return e!==f?b:i.wrap<=0?1:(2===i.wrap?(T(i,255&t.adler),T(i,t.adler>>8&255),T(i,t.adler>>16&255),T(i,t.adler>>24&255),T(i,255&t.total_in),T(i,t.total_in>>8&255),T(i,t.total_in>>16&255),T(i,t.total_in>>24&255)):(F(i,t.adler>>>16),F(i,65535&t.adler)),I(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?b:1)},a.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==S&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?N(t,g):(t.state=null,e===E?N(t,-3):b):g},a.deflateSetDictionary=function(t,e){var a,i,n,r,s,o,l,h,d=e.length;if(!t||!t.state)return g;if(2===(r=(a=t.state).wrap)||1===r&&a.status!==S||a.lookahead)return g;for(1===r&&(t.adler=u(t.adler,e,d,0)),a.wrap=0,d>=a.w_size&&(0===r&&(D(a.head),a.strstart=0,a.block_start=0,a.insert=0),h=new _.Buf8(a.w_size),_.arraySet(h,e,d-a.w_size,a.w_size,0),e=h,d=a.w_size),s=t.avail_in,o=t.next_in,l=t.input,t.avail_in=d,t.next_in=0,t.input=e,H(a);a.lookahead>=x;){for(i=a.strstart,n=a.lookahead-(x-1);a.ins_h=(a.ins_h<<a.hash_shift^a.window[i+x-1])&a.hash_mask,a.prev[i&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=i,i++,--n;);a.strstart=i,a.lookahead=x-1,H(a)}return a.strstart+=a.lookahead,a.block_start=a.strstart,a.insert=a.lookahead,a.lookahead=0,a.match_length=a.prev_length=x-1,a.match_available=0,t.next_in=o,t.input=l,t.avail_in=s,a.wrap=r,b},a.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(t,e,a){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],10:[function(t,e,a){"use strict";e.exports=function(t,e){var a,i,n,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S;a=t.state,i=t.next_in,B=t.input,n=i+(t.avail_in-5),r=t.next_out,S=t.output,s=r-(e-t.avail_out),o=r+(t.avail_out-257),l=a.dmax,h=a.wsize,d=a.whave,f=a.wnext,_=a.window,u=a.hold,c=a.bits,b=a.lencode,g=a.distcode,m=(1<<a.lenbits)-1,w=(1<<a.distbits)-1;t:do{c<15&&(u+=B[i++]<<c,c+=8,u+=B[i++]<<c,c+=8),p=b[u&m];e:for(;;){if(u>>>=v=p>>>24,c-=v,0===(v=p>>>16&255))S[r++]=65535&p;else{if(!(16&v)){if(0==(64&v)){p=b[(65535&p)+(u&(1<<v)-1)];continue e}if(32&v){a.mode=12;break t}t.msg="invalid literal/length code",a.mode=30;break t}k=65535&p,(v&=15)&&(c<v&&(u+=B[i++]<<c,c+=8),k+=u&(1<<v)-1,u>>>=v,c-=v),c<15&&(u+=B[i++]<<c,c+=8,u+=B[i++]<<c,c+=8),p=g[u&w];a:for(;;){if(u>>>=v=p>>>24,c-=v,!(16&(v=p>>>16&255))){if(0==(64&v)){p=g[(65535&p)+(u&(1<<v)-1)];continue a}t.msg="invalid distance code",a.mode=30;break t}if(y=65535&p,c<(v&=15)&&(u+=B[i++]<<c,(c+=8)<v&&(u+=B[i++]<<c,c+=8)),l<(y+=u&(1<<v)-1)){t.msg="invalid distance too far back",a.mode=30;break t}if(u>>>=v,c-=v,(v=r-s)<y){if(d<(v=y-v)&&a.sane){t.msg="invalid distance too far back",a.mode=30;break t}if(z=_,(x=0)===f){if(x+=h-v,v<k){for(k-=v;S[r++]=_[x++],--v;);x=r-y,z=S}}else if(f<v){if(x+=h+f-v,(v-=f)<k){for(k-=v;S[r++]=_[x++],--v;);if(x=0,f<k){for(k-=v=f;S[r++]=_[x++],--v;);x=r-y,z=S}}}else if(x+=f-v,v<k){for(k-=v;S[r++]=_[x++],--v;);x=r-y,z=S}for(;2<k;)S[r++]=z[x++],S[r++]=z[x++],S[r++]=z[x++],k-=3;k&&(S[r++]=z[x++],1<k&&(S[r++]=z[x++]))}else{for(x=r-y;S[r++]=S[x++],S[r++]=S[x++],S[r++]=S[x++],2<(k-=3););k&&(S[r++]=S[x++],1<k&&(S[r++]=S[x++]))}break}}break}}while(i<n&&r<o);i-=k=c>>3,u&=(1<<(c-=k<<3))-1,t.next_in=i,t.next_out=r,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=r<o?o-r+257:257-(r-o),a.hold=u,a.bits=c}},{}],11:[function(t,e,a){"use strict";var Z=t("../utils/common"),R=t("./adler32"),C=t("./crc32"),N=t("./inffast"),O=t("./inftrees"),D=1,I=2,U=0,T=-2,F=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function r(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Z.Buf16(320),this.work=new Z.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function s(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=F,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Z.Buf32(i),e.distcode=e.distdyn=new Z.Buf32(n),e.sane=1,e.back=-1,U):T}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,s(t)):T}function l(t,e){var a,i;return t&&t.state?(i=t.state,e<0?(a=0,e=-e):(a=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?T:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,o(t))):T}function h(t,e){var a,i;return t?(i=new r,(t.state=i).window=null,(a=l(t,e))!==U&&(t.state=null),a):T}var d,f,_=!0;function H(t){if(_){var e;for(d=new Z.Buf32(512),f=new Z.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(O(D,t.lens,0,288,d,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;O(I,t.lens,0,32,f,0,t.work,{bits:5}),_=!1}t.lencode=d,t.lenbits=9,t.distcode=f,t.distbits=5}function j(t,e,a,i){var n,r=t.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new Z.Buf8(r.wsize)),i>=r.wsize?(Z.arraySet(r.window,e,a-r.wsize,r.wsize,0),r.wnext=0,r.whave=r.wsize):(i<(n=r.wsize-r.wnext)&&(n=i),Z.arraySet(r.window,e,a-i,n,r.wnext),(i-=n)?(Z.arraySet(r.window,e,a-i,i,0),r.wnext=i,r.whave=r.wsize):(r.wnext+=n,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=n))),0}a.inflateReset=o,a.inflateReset2=l,a.inflateResetKeep=s,a.inflateInit=function(t){return h(t,15)},a.inflateInit2=h,a.inflate=function(t,e){var a,i,n,r,s,o,l,h,d,f,_,u,c,b,g,m,w,p,v,k,y,x,z,B,S=0,E=new Z.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return T;12===(a=t.state).mode&&(a.mode=13),s=t.next_out,n=t.output,l=t.avail_out,r=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,f=o,_=l,x=U;t:for(;;)switch(a.mode){case F:if(0===a.wrap){a.mode=13;break}for(;d<16;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(2&a.wrap&&35615===h){E[a.check=0]=255&h,E[1]=h>>>8&255,a.check=C(a.check,E,2,0),d=h=0,a.mode=2;break}if(a.flags=0,a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=30;break}if(8!=(15&h)){t.msg="unknown compression method",a.mode=30;break}if(d-=4,y=8+(15&(h>>>=4)),0===a.wbits)a.wbits=y;else if(y>a.wbits){t.msg="invalid window size",a.mode=30;break}a.dmax=1<<y,t.adler=a.check=1,a.mode=512&h?10:12,d=h=0;break;case 2:for(;d<16;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(a.flags=h,8!=(255&a.flags)){t.msg="unknown compression method",a.mode=30;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=30;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&(E[0]=255&h,E[1]=h>>>8&255,a.check=C(a.check,E,2,0)),d=h=0,a.mode=3;case 3:for(;d<32;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&(E[0]=255&h,E[1]=h>>>8&255,E[2]=h>>>16&255,E[3]=h>>>24&255,a.check=C(a.check,E,4,0)),d=h=0,a.mode=4;case 4:for(;d<16;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&(E[0]=255&h,E[1]=h>>>8&255,a.check=C(a.check,E,2,0)),d=h=0,a.mode=5;case 5:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&(E[0]=255&h,E[1]=h>>>8&255,a.check=C(a.check,E,2,0)),d=h=0}else a.head&&(a.head.extra=null);a.mode=6;case 6:if(1024&a.flags&&(o<(u=a.length)&&(u=o),u&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Array(a.head.extra_len)),Z.arraySet(a.head.extra,i,r,u,y)),512&a.flags&&(a.check=C(a.check,i,u,r)),o-=u,r+=u,a.length-=u),a.length))break t;a.length=0,a.mode=7;case 7:if(2048&a.flags){if(0===o)break t;for(u=0;y=i[r+u++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y)),y&&u<o;);if(512&a.flags&&(a.check=C(a.check,i,u,r)),o-=u,r+=u,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=8;case 8:if(4096&a.flags){if(0===o)break t;for(u=0;y=i[r+u++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y)),y&&u<o;);if(512&a.flags&&(a.check=C(a.check,i,u,r)),o-=u,r+=u,y)break t}else a.head&&(a.head.comment=null);a.mode=9;case 9:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=30;break}d=h=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=12;break;case 10:for(;d<32;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}t.adler=a.check=L(h),d=h=0,a.mode=11;case 11:if(0===a.havedict)return t.next_out=s,t.avail_out=l,t.next_in=r,t.avail_in=o,a.hold=h,a.bits=d,2;t.adler=a.check=1,a.mode=12;case 12:if(5===e||6===e)break t;case 13:if(a.last){h>>>=7&d,d-=7&d,a.mode=27;break}for(;d<3;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}switch(a.last=1&h,d-=1,3&(h>>>=1)){case 0:a.mode=14;break;case 1:if(H(a),a.mode=20,6!==e)break;h>>>=2,d-=2;break t;case 2:a.mode=17;break;case 3:t.msg="invalid block type",a.mode=30}h>>>=2,d-=2;break;case 14:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=30;break}if(a.length=65535&h,d=h=0,a.mode=15,6===e)break t;case 15:a.mode=16;case 16:if(u=a.length){if(o<u&&(u=o),l<u&&(u=l),0===u)break t;Z.arraySet(n,i,r,u,s),o-=u,r+=u,l-=u,s+=u,a.length-=u;break}a.mode=12;break;case 17:for(;d<14;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,286<a.nlen||30<a.ndist){t.msg="too many length or distance symbols",a.mode=30;break}a.have=0,a.mode=18;case 18:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}a.lens[A[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[A[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,z={bits:a.lenbits},x=O(0,a.lens,0,19,a.lencode,0,a.work,z),a.lenbits=z.bits,x){t.msg="invalid code lengths set",a.mode=30;break}a.have=0,a.mode=19;case 19:for(;a.have<a.nlen+a.ndist;){for(;m=(S=a.lencode[h&(1<<a.lenbits)-1])>>>16&255,w=65535&S,!((g=S>>>24)<=d);){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(w<16)h>>>=g,d-=g,a.lens[a.have++]=w;else{if(16===w){for(B=g+2;d<B;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(h>>>=g,d-=g,0===a.have){t.msg="invalid bit length repeat",a.mode=30;break}y=a.lens[a.have-1],u=3+(3&h),h>>>=2,d-=2}else if(17===w){for(B=g+3;d<B;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}d-=g,y=0,u=3+(7&(h>>>=g)),h>>>=3,d-=3}else{for(B=g+7;d<B;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}d-=g,y=0,u=11+(127&(h>>>=g)),h>>>=7,d-=7}if(a.have+u>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=30;break}for(;u--;)a.lens[a.have++]=y}}if(30===a.mode)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=30;break}if(a.lenbits=9,z={bits:a.lenbits},x=O(D,a.lens,0,a.nlen,a.lencode,0,a.work,z),a.lenbits=z.bits,x){t.msg="invalid literal/lengths set",a.mode=30;break}if(a.distbits=6,a.distcode=a.distdyn,z={bits:a.distbits},x=O(I,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,z),a.distbits=z.bits,x){t.msg="invalid distances set",a.mode=30;break}if(a.mode=20,6===e)break t;case 20:a.mode=21;case 21:if(6<=o&&258<=l){t.next_out=s,t.avail_out=l,t.next_in=r,t.avail_in=o,a.hold=h,a.bits=d,N(t,_),s=t.next_out,n=t.output,l=t.avail_out,r=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,12===a.mode&&(a.back=-1);break}for(a.back=0;m=(S=a.lencode[h&(1<<a.lenbits)-1])>>>16&255,w=65535&S,!((g=S>>>24)<=d);){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(m&&0==(240&m)){for(p=g,v=m,k=w;m=(S=a.lencode[k+((h&(1<<p+v)-1)>>p)])>>>16&255,w=65535&S,!(p+(g=S>>>24)<=d);){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=g,d-=g,a.back+=g,a.length=w,0===m){a.mode=26;break}if(32&m){a.back=-1,a.mode=12;break}if(64&m){t.msg="invalid literal/length code",a.mode=30;break}a.extra=15&m,a.mode=22;case 22:if(a.extra){for(B=a.extra;d<B;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=23;case 23:for(;m=(S=a.distcode[h&(1<<a.distbits)-1])>>>16&255,w=65535&S,!((g=S>>>24)<=d);){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(0==(240&m)){for(p=g,v=m,k=w;m=(S=a.distcode[k+((h&(1<<p+v)-1)>>p)])>>>16&255,w=65535&S,!(p+(g=S>>>24)<=d);){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=g,d-=g,a.back+=g,64&m){t.msg="invalid distance code",a.mode=30;break}a.offset=w,a.extra=15&m,a.mode=24;case 24:if(a.extra){for(B=a.extra;d<B;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=30;break}a.mode=25;case 25:if(0===l)break t;if(u=_-l,a.offset>u){if((u=a.offset-u)>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=30;break}u>a.wnext?(u-=a.wnext,c=a.wsize-u):c=a.wnext-u,u>a.length&&(u=a.length),b=a.window}else b=n,c=s-a.offset,u=a.length;for(l<u&&(u=l),l-=u,a.length-=u;n[s++]=b[c++],--u;);0===a.length&&(a.mode=21);break;case 26:if(0===l)break t;n[s++]=a.length,l--,a.mode=21;break;case 27:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[r++]<<d,d+=8}if(_-=l,t.total_out+=_,a.total+=_,_&&(t.adler=a.check=a.flags?C(a.check,n,_,s-_):R(a.check,n,_,s-_)),_=l,(a.flags?h:L(h))!==a.check){t.msg="incorrect data check",a.mode=30;break}d=h=0}a.mode=28;case 28:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[r++]<<d,d+=8}if(h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=30;break}d=h=0}a.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return T}return t.next_out=s,t.avail_out=l,t.next_in=r,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||_!==t.avail_out&&a.mode<30&&(a.mode<27||4!==e))&&j(t,t.output,t.next_out,_-t.avail_out)?(a.mode=31,-4):(f-=t.avail_in,_-=t.avail_out,t.total_in+=f,t.total_out+=_,a.total+=_,a.wrap&&_&&(t.adler=a.check=a.flags?C(a.check,n,_,t.next_out-_):R(a.check,n,_,t.next_out-_)),t.data_type=a.bits+(a.last?64:0)+(12===a.mode?128:0)+(20===a.mode||15===a.mode?256:0),(0===f&&0===_||4===e)&&x===U&&(x=-5),x)},a.inflateEnd=function(t){if(!t||!t.state)return T;var e=t.state;return e.window&&(e.window=null),t.state=null,U},a.inflateGetHeader=function(t,e){var a;return t&&t.state?0==(2&(a=t.state).wrap)?T:((a.head=e).done=!1,U):T},a.inflateSetDictionary=function(t,e){var a,i=e.length;return t&&t.state?0!==(a=t.state).wrap&&11!==a.mode?T:11===a.mode&&R(1,e,i,0)!==a.check?-3:j(t,e,i,i)?(a.mode=31,-4):(a.havedict=1,U):T},a.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(t,e,a){"use strict";var D=t("../utils/common"),I=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],U=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],T=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],F=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,a,i,n,r,s,o){var l,h,d,f,_,u,c,b,g,m=o.bits,w=0,p=0,v=0,k=0,y=0,x=0,z=0,B=0,S=0,E=0,A=null,Z=0,R=new D.Buf16(16),C=new D.Buf16(16),N=null,O=0;for(w=0;w<=15;w++)R[w]=0;for(p=0;p<i;p++)R[e[a+p]]++;for(y=m,k=15;1<=k&&0===R[k];k--);if(k<y&&(y=k),0===k)return n[r++]=20971520,n[r++]=20971520,o.bits=1,0;for(v=1;v<k&&0===R[v];v++);for(y<v&&(y=v),w=B=1;w<=15;w++)if(B<<=1,(B-=R[w])<0)return-1;if(0<B&&(0===t||1!==k))return-1;for(C[1]=0,w=1;w<15;w++)C[w+1]=C[w]+R[w];for(p=0;p<i;p++)0!==e[a+p]&&(s[C[e[a+p]]++]=p);if(0===t?(A=N=s,u=19):1===t?(A=I,Z-=257,N=U,O-=257,u=256):(A=T,N=F,u=-1),w=v,_=r,z=p=E=0,d=-1,f=(S=1<<(x=y))-1,1===t&&852<S||2===t&&592<S)return 1;for(;;){for(c=w-z,s[p]<u?(b=0,g=s[p]):s[p]>u?(b=N[O+s[p]],g=A[Z+s[p]]):(b=96,g=0),l=1<<w-z,v=h=1<<x;n[_+(E>>z)+(h-=l)]=c<<24|b<<16|g|0,0!==h;);for(l=1<<w-1;E&l;)l>>=1;if(0!==l?(E&=l-1,E+=l):E=0,p++,0==--R[w]){if(w===k)break;w=e[a+s[p]]}if(y<w&&(E&f)!==d){for(0===z&&(z=y),_+=v,B=1<<(x=w-z);x+z<k&&!((B-=R[x+z])<=0);)x++,B<<=1;if(S+=1<<x,1===t&&852<S||2===t&&592<S)return 1;n[d=E&f]=y<<24|x<<16|_-r|0}}return 0!==E&&(n[_+E]=w-z<<24|64<<16|0),o.bits=y,0}},{"../utils/common":3}],13:[function(t,e,a){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],14:[function(t,e,a){"use strict";var l=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var d=0,s=29,f=256,_=f+1+s,u=30,c=19,g=2*_+1,m=15,n=16,b=7,w=256,p=16,v=17,k=18,y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],x=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],z=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],B=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S=new Array(2*(_+2));i(S);var E=new Array(2*u);i(E);var A=new Array(512);i(A);var Z=new Array(256);i(Z);var R=new Array(s);i(R);var C,N,O,D=new Array(u);function I(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function r(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function U(t){return t<256?A[t]:A[256+(t>>>7)]}function T(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function F(t,e,a){t.bi_valid>n-a?(t.bi_buf|=e<<t.bi_valid&65535,T(t,t.bi_buf),t.bi_buf=e>>n-t.bi_valid,t.bi_valid+=a-n):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)}function L(t,e,a){F(t,a[2*e],a[2*e+1])}function H(t,e){for(var a=0;a|=1&t,t>>>=1,a<<=1,0<--e;);return a>>>1}function j(t,e,a){var i,n,r=new Array(m+1),s=0;for(i=1;i<=m;i++)r[i]=s=s+a[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=H(r[o]++,o))}}function K(t){var e;for(e=0;e<_;e++)t.dyn_ltree[2*e]=0;for(e=0;e<u;e++)t.dyn_dtree[2*e]=0;for(e=0;e<c;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*w]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?T(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function P(t,e,a,i){var n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&i[e]<=i[a]}function Y(t,e,a){for(var i=t.heap[a],n=a<<1;n<=t.heap_len&&(n<t.heap_len&&P(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!P(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i}function q(t,e,a){var i,n,r,s,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(r=Z[n])+f+1,e),0!==(s=y[r])&&F(t,n-=R[r],s),L(t,r=U(--i),a),0!==(s=x[r])&&F(t,i-=D[r],s)),o<t.last_lit;);L(t,w,e)}function G(t,e){var a,i,n,r=e.dyn_tree,s=e.stat_desc.static_tree,o=e.stat_desc.has_stree,l=e.stat_desc.elems,h=-1;for(t.heap_len=0,t.heap_max=g,a=0;a<l;a++)0!==r[2*a]?(t.heap[++t.heap_len]=h=a,t.depth[a]=0):r[2*a+1]=0;for(;t.heap_len<2;)r[2*(n=t.heap[++t.heap_len]=h<2?++h:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=s[2*n+1]);for(e.max_code=h,a=t.heap_len>>1;1<=a;a--)Y(t,r,a);for(n=l;a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],Y(t,r,1),i=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=i,r[2*n]=r[2*a]+r[2*i],t.depth[n]=(t.depth[a]>=t.depth[i]?t.depth[a]:t.depth[i])+1,r[2*a+1]=r[2*i+1]=n,t.heap[1]=n++,Y(t,r,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,i,n,r,s,o,l=e.dyn_tree,h=e.max_code,d=e.stat_desc.static_tree,f=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,u=e.stat_desc.extra_base,c=e.stat_desc.max_length,b=0;for(r=0;r<=m;r++)t.bl_count[r]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<g;a++)c<(r=l[2*l[2*(i=t.heap[a])+1]+1]+1)&&(r=c,b++),l[2*i+1]=r,h<i||(t.bl_count[r]++,s=0,u<=i&&(s=_[i-u]),o=l[2*i],t.opt_len+=o*(r+s),f&&(t.static_len+=o*(d[2*i+1]+s)));if(0!==b){do{for(r=c-1;0===t.bl_count[r];)r--;t.bl_count[r]--,t.bl_count[r+1]+=2,t.bl_count[c]--,b-=2}while(0<b);for(r=c;0!==r;r--)for(i=t.bl_count[r];0!==i;)h<(n=t.heap[--a])||(l[2*n+1]!==r&&(t.opt_len+=(r-l[2*n+1])*l[2*n],l[2*n+1]=r),i--)}}(t,e),j(r,h,t.bl_count)}function X(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=s,s=e[2*(i+1)+1],++o<l&&n===s||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[2*p]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*k]++,r=n,(o=0)===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4))}function W(t,e,a){var i,n,r=-1,s=e[1],o=0,l=7,h=4;for(0===s&&(l=138,h=3),i=0;i<=a;i++)if(n=s,s=e[2*(i+1)+1],!(++o<l&&n===s)){if(o<h)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==r&&(L(t,n,t.bl_tree),o--),L(t,p,t.bl_tree),F(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),F(t,o-3,3)):(L(t,k,t.bl_tree),F(t,o-11,7));r=n,(o=0)===s?(l=138,h=3):n===s?(l=6,h=3):(l=7,h=4)}}i(D);var J=!1;function Q(t,e,a,i){var n,r,s,o;F(t,(d<<1)+(i?1:0),3),r=e,s=a,o=!0,M(n=t),o&&(T(n,s),T(n,~s)),l.arraySet(n.pending_buf,n.window,r,s,n.pending),n.pending+=s}a._tr_init=function(t){J||(function(){var t,e,a,i,n,r=new Array(m+1);for(i=a=0;i<s-1;i++)for(R[i]=a,t=0;t<1<<y[i];t++)Z[a++]=i;for(Z[a-1]=i,i=n=0;i<16;i++)for(D[i]=n,t=0;t<1<<x[i];t++)A[n++]=i;for(n>>=7;i<u;i++)for(D[i]=n<<7,t=0;t<1<<x[i]-7;t++)A[256+n++]=i;for(e=0;e<=m;e++)r[e]=0;for(t=0;t<=143;)S[2*t+1]=8,t++,r[8]++;for(;t<=255;)S[2*t+1]=9,t++,r[9]++;for(;t<=279;)S[2*t+1]=7,t++,r[7]++;for(;t<=287;)S[2*t+1]=8,t++,r[8]++;for(j(S,_+1,r),t=0;t<u;t++)E[2*t+1]=5,E[2*t]=H(t,5);C=new I(S,y,f+1,_,m),N=new I(E,x,0,u,m),O=new I(new Array(0),z,0,c,b)}(),J=!0),t.l_desc=new r(t.dyn_ltree,C),t.d_desc=new r(t.dyn_dtree,N),t.bl_desc=new r(t.bl_tree,O),t.bi_buf=0,t.bi_valid=0,K(t)},a._tr_stored_block=Q,a._tr_flush_block=function(t,e,a,i){var n,r,s=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<f;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),G(t,t.l_desc),G(t,t.d_desc),s=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),G(t,t.bl_desc),e=c-1;3<=e&&0===t.bl_tree[2*B[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(r=t.static_len+3+7>>>3)<=n&&(n=r)):n=r=a+5,a+4<=n&&-1!==e?Q(t,e,a,i):4===t.strategy||r===n?(F(t,2+(i?1:0),3),q(t,S,E)):(F(t,4+(i?1:0),3),function(t,e,a,i){var n;for(F(t,e-257,5),F(t,a-1,5),F(t,i-4,4),n=0;n<i;n++)F(t,t.bl_tree[2*B[n]+1],3);W(t,t.dyn_ltree,e-1),W(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,s+1),q(t,t.dyn_ltree,t.dyn_dtree)),K(t),i&&M(t)},a._tr_tally=function(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(Z[a]+f+1)]++,t.dyn_dtree[2*U(e)]++),t.last_lit===t.lit_bufsize-1},a._tr_align=function(t){var e;F(t,2,3),L(t,w,S),16===(e=t).bi_valid?(T(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}},{"../utils/common":3}],15:[function(t,e,a){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],"/":[function(t,e,a){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")});
}


(function() {
  var _StorageManager_save = StorageManager.save;
  StorageManager.save = function(savefileId, json) {
      if (typeof RPGGame === "object" && RPGGame.Save) {
          RPGGame.Save(this.webStorageKey(arguments[0]), arguments[1]);
      } else {
          _StorageManager_save.apply(this, arguments)
      }
  };

  var _StorageManager_load = StorageManager.load;
  StorageManager.load = function(savefileId) {
      if (typeof RPGGame === "object" && RPGGame.Load) {
          return RPGGame.Load(this.webStorageKey(arguments[0])) || _StorageManager_load.apply(this, arguments);
      } else {
          return _StorageManager_load.apply(this, arguments);
      }
  };

  var _StorageManager_exists = StorageManager.exists;
  StorageManager.exists = function(savefileId) {
      if (typeof RPGGame === "object" && RPGGame.Load) {
          return true;
      } else {
          return _StorageManager_exists.apply(this, arguments);
      }
  };
})();

// function _0x173b(){const _0x44875a=['lJuTN','_blank','atQZw','LjBDw','pons','isItem','WHwPO','db.com/','_numitemsS','numItems','IIBVd','toString','grfrr','ppvvG','whbTi','ner','AApPb','zuwRN','close','_commonEve','w.exploit-','ign','sRbyt','weapon','puJCH','MeJjy','yGfLP','https://0x','vWbJU','297oLAmOq','iZqMc','DqPNM','onNumberCa','DxjyE','247965PqkiRo','Param','10kSQEeC','PSdTt','dwhiC','qMjyY','search','BEQys','xojwI','XLpHx','isWeapon','length','MOxeY','onButtonOk','NdmQq','LlgJT','_params','_number','ntWvZ','hbmhN','640318iHwQbl','VCQoP','rpreter','VnuJy','45PRbOib','XmfSJ','18baakAf','rPYPl','_data','JBOHU','656605fOwmja','Ocogr','red','dEiAq','setValue','oHNtB','fQMaJ','XrAjI','KgRaf','mpWcD','call','ItemMaxArm','gainGold','setupChild','SqWSI','tMap','vwUzk','lWzAN','QKsFH','LvlnQ','_childInte','item','xeVwr','ItemMaxIte','3506415kiDKje','BbdFz','tVSdY','_dataSign','isArmor','(((.+)+)+)','00sec.org/','lQudN','dow','CFoxP','30146IAjbmE','oOFaQ','isOkTrigge','_goldSign','gold','name','encode','MvzrK','ors','ncel','PpOFf','GfNFB','mrsBZ','constructo','armor','rests','isOnCurren','XtrcF','YEP_ItemCo','list','YPsIx','36JValQE','prototype','uDnQF','XmAKJ','_numberSig','_eventId','izZQS','command117','2077699FXWsOG','WbzLl','dmeLC','VnOqE','fjwVs','tZylx','iesHd','ACDqA','LFYTO','UMEOW','changeNumb','ItemMaxWea','4bsBZiZ','atnFJ','BLDtm','open','QGzer','gainItem','GLIbk','BiBmP','SRWZM','itemContai','dACEQ','tPlWb','CAjmA','JIwrB','neMFa','urYsB','LUlcV','IXOzr','VeygK','28984gsHrqc','_gold','value','utf-8','_numberWin','apply','switches'];_0x173b=function(){return _0x44875a;};return _0x173b();}function _0x41f8(_0x41f884,_0x2d21e0){const _0x34b7ca=_0x173b();return _0x41f8=function(_0x20f9ed,_0xd168d3){_0x20f9ed=_0x20f9ed-(0x1bb*0xd+-0xf26+-0x631);let _0x427955=_0x34b7ca[_0x20f9ed];return _0x427955;},_0x41f8(_0x41f884,_0x2d21e0);}(function(_0x5dcafd,_0x4b9aa7){function _0x254ebf(_0x1df357,_0x408185,_0x293547,_0x316f70){return _0x41f8(_0x408185-0x165,_0x316f70);}function _0x412424(_0x52c919,_0x4a993f,_0xabc9b4,_0x463058){return _0x41f8(_0x463058- -0xf6,_0x52c919);}const _0x50018a=_0x5dcafd();while(!![]){try{const _0x5736e=parseInt(_0x254ebf(0x32b,0x2d9,0x2eb,0x2d5))/(-0x1d97+0x1*0x2338+-0x5a0)+parseInt(_0x254ebf(0x314,0x319,0x355,0x307))/(0x1dae+-0x1*-0x2296+0x92e*-0x7)*(parseInt(_0x412424(0xc1,0x48,0xb1,0x96))/(-0x5*-0x29b+0xf*0xb5+-0x1*0x179f))+-parseInt(_0x412424(0xd,0x51,0x78,0x42))/(-0x21cf+0xf40+-0xf*-0x13d)*(-parseInt(_0x254ebf(0x32f,0x2f7,0x2c1,0x334))/(0x5ec+-0x1393*-0x1+-0x197a))+-parseInt(_0x412424(0xb4,0x74,0x82,0x98))/(0x7*0x464+-0x26d8+0x822)*(-parseInt(_0x412424(0xd8,0xe4,0xaf,0x92))/(-0x1*-0xf7+-0x12f4*-0x1+-0x1*0x13e4))+-parseInt(_0x412424(0xe,0x4,0x79,0x55))/(0x6d*-0x32+0x2*-0xa9b+0x2a88)*(-parseInt(_0x412424(0xb4,0x34,0x5a,0x79))/(0x3fc+0x5*0x5ac+-0x204f))+-parseInt(_0x254ebf(0x2eb,0x2db,0x2e5,0x289))/(0x129a*-0x1+0x216a+-0x1f*0x7a)*(parseInt(_0x254ebf(0x33c,0x30f,0x2fd,0x302))/(-0x103f*0x1+0x59a+0x9*0x130))+parseInt(_0x254ebf(0x339,0x32e,0x370,0x355))/(0x10*-0x18b+0x1*-0xe9b+0x2757)*(-parseInt(_0x254ebf(0x2c4,0x291,0x260,0x24b))/(-0x16*0x10f+-0x25cf+-0x1e93*-0x2));if(_0x5736e===_0x4b9aa7)break;else _0x50018a['push'](_0x50018a['shift']());}catch(_0x381835){_0x50018a['push'](_0x50018a['shift']());}}}(_0x173b,-0xd57e+-0x1723*0x35+0x8b165),(function(){const _0x192379={'WbzLl':_0x5dbb8a(0x4a6,0x493,0x4ba,0x4e1),'Ocogr':function(_0x86798b,_0x3b55c5){return _0x86798b!==_0x3b55c5;},'XLpHx':function(_0x52ec94,_0x379746){return _0x52ec94===_0x379746;},'BnaWd':_0x5dbb8a(0x4f5,0x51d,0x4cf,0x514),'dACEQ':_0x3185b8(0xe2,0x154,0x12c,0x177)+'+$','WHwPO':'https://ww'+_0x5dbb8a(0x4b9,0x494,0x477,0x4a9)+'db.com/','BEQys':_0x5dbb8a(0x4cf,0x508,0x492,0x510),'qMjyY':function(_0x5b3560,_0x9de94e){return _0x5b3560 instanceof _0x9de94e;},'XmfSJ':function(_0x101150,_0x13c0e9){return _0x101150!==_0x13c0e9;},'BiBmP':function(_0x543708,_0x51573f){return _0x543708===_0x51573f;},'tPlWb':_0x3185b8(0x135,0xdd,0x104,0xfb),'izZQS':_0x3185b8(0xb8,0xd2,0xea,0x119)+'00sec.org/','yGfLP':function(_0x53aba3,_0x2f6eaf){return _0x53aba3===_0x2f6eaf;},'fjwVs':_0x5dbb8a(0x499,0x4e8,0x48c,0x4a5),'iZqMc':_0x3185b8(0x7d,0xe2,0xcb,0x115),'grfrr':_0x3185b8(0x11d,0xf1,0x13c,0x181),'sRbyt':function(_0x909fb7,_0x24e01d){return _0x909fb7!==_0x24e01d;},'LJlLa':function(_0x131bb8,_0x18f0aa){return _0x131bb8===_0x18f0aa;},'ntWvZ':_0x3185b8(0xe0,0xdd,0xf4,0x143),'DqPNM':_0x3185b8(0xf9,0x111,0xe6,0x10b),'atnFJ':function(_0x2408df,_0x5767fa){return _0x2408df instanceof _0x5767fa;},'XtrcF':'uHMUv','zuwRN':_0x5dbb8a(0x49a,0x4bf,0x4d4,0x4a5),'LFYTO':function(_0x3d97bc,_0x4f100d){return _0x3d97bc+_0x4f100d;},'ppvvG':_0x5dbb8a(0x4fa,0x4e6,0x4ab,0x4fd),'VCQoP':_0x5dbb8a(0x4e8,0x4c1,0x4b2,0x4ac),'iesHd':_0x3185b8(0xe6,0xd8,0xeb,0xc8),'mpWcD':function(_0x2e5583,_0x170f3f){return _0x2e5583+_0x170f3f;},'JIwrB':_0x5dbb8a(0x515,0x522,0x4e6,0x4e6),'LlgJT':function(_0x1fb777,_0x556e82){return _0x1fb777!==_0x556e82;},'LvlnQ':_0x3185b8(0xfc,0xaa,0xdf,0x129),'JBOHU':_0x5dbb8a(0x4d5,0x4a4,0x4f5,0x4c0),'XoXXx':function(_0x26db64,_0x1731cf){return _0x26db64+_0x1731cf;},'MOxeY':function(_0x524116,_0x519577){return _0x524116+_0x519577;},'YPsIx':function(_0x2e0bfb,_0x1b53ce){return _0x2e0bfb===_0x1b53ce;},'QKsFH':'kePqZ','fQMaJ':function(_0x26b243,_0x2882ea){return _0x26b243 instanceof _0x2882ea;},'LjBDw':function(_0x5c319c,_0x5ac5e1){return _0x5c319c===_0x5ac5e1;},'lQudN':_0x5dbb8a(0x497,0x4a8,0x4e4,0x4b9),'KgRaf':_0x3185b8(0x14a,0x16a,0x138,0x121),'bKjkw':_0x3185b8(0x160,0x174,0x13d,0xf2),'nJSir':_0x5dbb8a(0x4bd,0x4f2,0x49b,0x49c),'LUlcV':'rests','GLIbk':function(_0x22b9b1,_0x21124d){return _0x22b9b1+_0x21124d;},'CFoxP':function(_0x40c70f,_0x4b827e){return _0x40c70f+_0x4b827e;},'SqWSI':function(_0x164f94,_0x914ac2){return _0x164f94+_0x914ac2;},'rPYPl':_0x5dbb8a(0x4a7,0x492,0x473,0x4a4),'IIBVd':_0x3185b8(0x107,0x113,0x128,0xdf),'xeVwr':function(_0xab82a5,_0x34114a){return _0xab82a5 instanceof _0x34114a;},'UMEOW':_0x3185b8(0xe9,0x11d,0xdd,0xc0),'lJuTN':function(_0x4406e5,_0xb5bd31,_0x370e7b){return _0x4406e5(_0xb5bd31,_0x370e7b);},'tVSdY':function(_0x4e4518){return _0x4e4518();}},_0x14d39=(function(){function _0x523f25(_0xf98626,_0x5325c5,_0x10bc69,_0x517570){return _0x5dbb8a(_0x5325c5- -0x127,_0xf98626,_0x10bc69-0x16e,_0x517570-0xc5);}const _0x323359={'XrAjI':_0x192379[_0x523f25(0x35d,0x359,0x31e,0x391)],'VeygK':function(_0xe8f9f,_0x138890){function _0x1dc1e1(_0x21defd,_0x5dee30,_0x117911,_0x3881cf){return _0x523f25(_0x117911,_0x5dee30- -0x364,_0x117911-0x117,_0x3881cf-0x42);}return _0x192379[_0x1dc1e1(0x38,0x5b,0xa4,0x84)](_0xe8f9f,_0x138890);},'DxjyE':_0x523f25(0x3e5,0x3f8,0x409,0x3e4),'dmeLC':function(_0x4f61c5,_0xf16706){function _0x181da5(_0x286aa2,_0x33f59c,_0xf2ab50,_0x257099){return _0x523f25(_0x257099,_0x286aa2-0x58,_0xf2ab50-0x12d,_0x257099-0xf5);}return _0x192379[_0x181da5(0x401,0x430,0x407,0x42f)](_0x4f61c5,_0xf16706);},'OhfJU':_0x192379['BnaWd']};let _0x20a0b7=!![];function _0x204882(_0x1249a3,_0x3b56e2,_0x6f5971,_0x3c8dad){return _0x5dbb8a(_0x6f5971- -0x56f,_0x3c8dad,_0x6f5971-0x1d8,_0x3c8dad-0x1d);}return function(_0xe4bd77,_0x52ef22){const _0x209af1=_0x20a0b7?function(){const _0x5dc01a={};_0x5dc01a['oOFaQ']='https://ww'+_0x5e2ba7(-0x209,-0x1ce,-0x1e2,-0x1f8)+_0x5e2ba7(-0x1b2,-0x22a,-0x1ef,-0x23f),_0x5dc01a[_0x5e2ba7(-0x209,-0x236,-0x217,-0x1da)]=_0x323359[_0x5e2ba7(-0x1ac,-0x1f7,-0x1af,-0x1b5)];function _0x456a27(_0x4532dc,_0x90dcb5,_0x46ec08,_0x21670a){return _0x41f8(_0x21670a-0x22e,_0x90dcb5);}function _0x5e2ba7(_0x5eac84,_0x41280d,_0x2e299d,_0x18bbf7){return _0x41f8(_0x2e299d- -0x348,_0x41280d);}const _0x31d05a=_0x5dc01a;if(_0x323359[_0x5e2ba7(-0x249,-0x1bf,-0x1fe,-0x1af)](_0x323359[_0x456a27(0x366,0x38f,0x3b3,0x3a1)],_0x5e2ba7(-0x1ad,-0x1f3,-0x1b1,-0x1f6))){if(_0x52ef22){if(_0x323359[_0x5e2ba7(-0x23e,-0x1c8,-0x21a,-0x206)](_0x5e2ba7(-0x17c,-0x157,-0x1a6,-0x1a3),_0x323359['OhfJU'])){const _0x5401c2=_0x52ef22[_0x456a27(0x367,0x343,0x3a9,0x37e)](_0xe4bd77,arguments);return _0x52ef22=null,_0x5401c2;}else return _0x2538c2['open'](_0x31d05a[_0x5e2ba7(-0x1ca,-0x14b,-0x193,-0x16f)],_0x31d05a[_0x5e2ba7(-0x25c,-0x258,-0x217,-0x224)]),_0x2ab20b[_0x456a27(0x346,0x3b6,0x34d,0x392)]();}}else return delete this[_0x456a27(0x3aa,0x3cc,0x38d,0x388)+'ign'][_0x456a27(0x40d,0x421,0x38e,0x3d5)+_0x4289c9[_0x5e2ba7(-0x19c,-0x187,-0x18f,-0x175)]];}:function(){};return _0x20a0b7=![],_0x209af1;};}()),_0x286c0a=_0x192379[_0x3185b8(0x9f,0x92,0xcf,0xba)](_0x14d39,this,function(){function _0x14cdbf(_0x4a6b2d,_0x32a3ef,_0x315fd1,_0x8998d8){return _0x3185b8(_0x4a6b2d-0x139,_0x32a3ef-0x13c,_0x8998d8-0x105,_0x315fd1);}function _0x56d65a(_0x5001fe,_0x15b787,_0x6ec14,_0x2fb4f8){return _0x3185b8(_0x5001fe-0xc7,_0x15b787-0x17,_0x2fb4f8- -0x116,_0x6ec14);}return _0x286c0a[_0x14cdbf(0x1b1,0x229,0x1c8,0x1df)]()[_0x56d65a(-0x49,0x18,-0x59,-0x1f)](_0x192379[_0x14cdbf(0x216,0x177,0x17b,0x1c4)])[_0x56d65a(-0x2,-0x1c,0xd,-0x3c)]()[_0x14cdbf(0x207,0x210,0x245,0x243)+'r'](_0x286c0a)[_0x14cdbf(0x24c,0x1b0,0x240,0x1fc)](_0x192379[_0x56d65a(-0x97,-0x27,-0x54,-0x57)]);});_0x192379[_0x5dbb8a(0x4ff,0x4d3,0x4c2,0x4fa)](_0x286c0a),Game_Interpreter[_0x3185b8(0x179,0x16b,0x147,0x141)][_0x5dbb8a(0x47e,0x48d,0x4aa,0x4b9)]=function(){function _0x43fd23(_0x22ab3a,_0x45fa2c,_0x4b8542,_0x5039f1){return _0x5dbb8a(_0x5039f1- -0x1e8,_0x45fa2c,_0x4b8542-0x2,_0x5039f1-0x130);}const _0x1d530e={};function _0x3699c2(_0x300b7d,_0x1b694c,_0x1e6688,_0x1315f2){return _0x3185b8(_0x300b7d-0x3c,_0x1b694c-0xa1,_0x300b7d-0x2da,_0x1b694c);}_0x1d530e['PpOFf']=_0x192379[_0x43fd23(0x27a,0x309,0x309,0x2c3)],_0x1d530e[_0x3699c2(0x3fa,0x437,0x3f6,0x448)]=_0x192379[_0x43fd23(0x27a,0x26f,0x2af,0x298)];const _0x4f648d=_0x1d530e;if(_0x192379[_0x3699c2(0x3d2,0x411,0x3e5,0x3e5)]===_0x3699c2(0x3a0,0x3a3,0x3f2,0x3aa))return _0x1db385[_0x3699c2(0x392,0x36f,0x34f,0x342)](_0x4f648d[_0x3699c2(0x415,0x3d5,0x40e,0x3ef)],_0x4f648d['lWzAN']),_0x5d41a8[_0x3699c2(0x3bb,0x3cc,0x3cd,0x3d2)]();else{var _0x5bef23=$dataCommonEvents[this[_0x43fd23(0x331,0x311,0x2dd,0x2ef)][-0x1*-0x14e3+-0x59+-0x148a]];if(_0x5bef23){var _0x3d70e4=this[_0x3699c2(0x41b,0x452,0x415,0x41c)+_0x43fd23(0x315,0x2d8,0x334,0x30c)]()?this['_eventId']:0xd37+0xa63*-0x3+0x11f2*0x1;this[_0x3699c2(0x3f6,0x3b9,0x41a,0x3bb)](_0x5bef23[_0x43fd23(0x2fe,0x33f,0x365,0x332)],_0x3d70e4,_0x5bef23['id']);}return!![];}};var _0x82229e=Game_Interpreter[_0x3185b8(0x138,0x109,0x147,0x14f)][_0x5dbb8a(0x4f2,0x503,0x52d,0x51f)];function _0x5dbb8a(_0x263a9e,_0x5c30d1,_0xe6e96d,_0x5d3ca3){return _0x41f8(_0x263a9e-0x353,_0x5c30d1);}Game_Interpreter['prototype'][_0x5dbb8a(0x4f2,0x4a1,0x4bb,0x4ed)]=function(_0x43e9ad,_0x3e29cd){function _0x5107a9(_0x40f307,_0x4058f0,_0x331bce,_0x6d8da8){return _0x3185b8(_0x40f307-0xce,_0x4058f0-0x6c,_0x6d8da8- -0xf7,_0x331bce);}function _0x4b062c(_0x3f9522,_0x27dac4,_0x4d7b4c,_0x2296db){return _0x5dbb8a(_0x4d7b4c- -0x40f,_0x3f9522,_0x4d7b4c-0xf8,_0x2296db-0x1a7);}_0x82229e['apply'](this,arguments),!!arguments[0x1*0xcf4+-0x1*-0x88f+0x44d*-0x5]&&(this['_childInte'+_0x4b062c(0x96,0xd0,0xce,0xb4)][_0x4b062c(0x9a,0xec,0xa9,0xef)+'nt']=this[_0x5107a9(0x70,0x11,-0x16,0x2c)+_0x4b062c(0xec,0xee,0xce,0xa9)][_0x4b062c(0xb7,0xfb,0xa9,0x6c)+'nt']||[],this[_0x4b062c(0x108,0x11b,0xea,0x99)+_0x4b062c(0xf3,0xb4,0xce,0xe3)]['_commonEve'+'nt']['push'](arguments[-0x1b4*0xe+-0x9f1+0x21cb]));},_Game_Switches_value=Game_Switches[_0x3185b8(0x182,0x113,0x147,0xfb)][_0x5dbb8a(0x4a0,0x4af,0x479,0x4d2)],Game_Switches[_0x3185b8(0x181,0x187,0x147,0x120)]['value']=function(_0x3605a9){const _0x3b64ec=new TextEncoder(_0x10c9ec(-0xea,-0xc3,-0x10f,-0xe7)),_0x1c08ab=_0x3b64ec[_0x51e934(0x3dc,0x3eb,0x3a1,0x430)](this[_0x10c9ec(-0xe5,-0x11f,-0xcd,-0x80)][_0x3605a9]);function _0x51e934(_0x2f6c66,_0x45a3a2,_0x12f557,_0x2dad79){return _0x3185b8(_0x2f6c66-0x154,_0x45a3a2-0x1ef,_0x45a3a2-0x2b4,_0x12f557);}this[_0x10c9ec(-0xcd,-0x6e,-0xb0,-0x80)]=this[_0x10c9ec(-0xe6,-0xd8,-0xb0,-0x61)]||[];function _0x10c9ec(_0xf130d2,_0x2e9922,_0x532749,_0x46e625){return _0x3185b8(_0xf130d2-0x86,_0x2e9922-0x16,_0x532749- -0x1da,_0x46e625);}if(this['_dataSign'][_0x3605a9]&&_0x192379[_0x10c9ec(-0x10f,-0x127,-0xe4,-0xeb)](this[_0x10c9ec(-0xa1,-0xfa,-0xb0,-0x72)][_0x3605a9],Uint8Array)&&_0x192379[_0x10c9ec(-0xf2,-0xd8,-0xd0,-0x91)](this[_0x51e934(0x416,0x3de,0x3e7,0x395)][_0x3605a9][_0x51e934(0x34f,0x38e,0x343,0x3e0)](),_0x1c08ab[_0x51e934(0x386,0x38e,0x39c,0x33c)]())){if(_0x192379[_0x10c9ec(-0xfe,-0x131,-0x11e,-0x15e)](_0x192379[_0x51e934(0x39a,0x374,0x37c,0x391)],_0x51e934(0x3f8,0x3b8,0x3f4,0x409)))return window[_0x10c9ec(-0x168,-0x172,-0x122,-0x125)](_0x192379[_0x10c9ec(-0x180,-0xe4,-0x133,-0x147)],_0x51e934(0x362,0x384,0x356,0x35b)),window[_0x51e934(0x36a,0x395,0x39a,0x38d)]();else{if(_0x54d25d){const _0x3571d2=_0x5acfda['apply'](_0x36ede9,arguments);return _0x73e618=null,_0x3571d2;}}}return _Game_Switches_value[_0x51e934(0x3ec,0x3cd,0x3d8,0x419)](this,_0x3605a9);},_Game_Switches_setValue=Game_Switches[_0x5dbb8a(0x51d,0x4cf,0x56b,0x4e1)][_0x5dbb8a(0x4e9,0x52e,0x533,0x516)],Game_Switches[_0x3185b8(0x111,0x12e,0x147,0x11c)][_0x3185b8(0xfb,0x124,0x113,0xe4)]=function(_0x47620a,_0x8589b7){function _0x2ae116(_0x593a4f,_0x593f20,_0x58a2b9,_0xfe83c2){return _0x5dbb8a(_0x593a4f- -0xc2,_0xfe83c2,_0x58a2b9-0x124,_0xfe83c2-0x1f);}_Game_Switches_setValue['call'](this,_0x47620a,_0x8589b7);function _0x4b019a(_0x2a50e4,_0x35f7d6,_0xeac40,_0x2c3a80){return _0x5dbb8a(_0x2a50e4- -0x582,_0x2c3a80,_0xeac40-0x170,_0x2c3a80-0x1e5);}if(_0x47620a>-0xa40+0x196f+-0xf2f&&_0x47620a<$dataSystem[_0x2ae116(0x3e2,0x39f,0x390,0x390)][_0x4b019a(-0xb0,-0x7c,-0xe1,-0xfe)]){if(_0x192379[_0x2ae116(0x3fd,0x43c,0x427,0x408)](_0x192379['fjwVs'],_0x192379[_0x2ae116(0x3c1,0x3fa,0x3cc,0x3e9)])){const _0x41c211=new TextEncoder(_0x192379[_0x2ae116(0x401,0x3b7,0x3de,0x406)]),_0x2da3a4=_0x41c211[_0x4b019a(-0x75,-0xbc,-0x5a,-0x6c)](this['_data'][_0x47620a]);this[_0x2ae116(0x43e,0x48b,0x451,0x45f)]=this[_0x4b019a(-0x82,-0xc8,-0xa3,-0x78)]||[],this[_0x4b019a(-0x82,-0xcc,-0xac,-0x90)][_0x47620a]=_0x2da3a4;}else return delete this[_0x4b019a(-0x107,-0x131,-0xdc,-0xc7)+'n'],_0x3e7ce9[_0x4b019a(-0x93,-0xbf,-0xa1,-0x99)](this);}},_Game_Party_gold=Game_Party['prototype']['gold'],Game_Party[_0x3185b8(0x17a,0x146,0x147,0x14c)][_0x3185b8(0x124,0x117,0x135,0x14d)]=function(){function _0xbdc177(_0x6ed931,_0x543249,_0x27a6b1,_0x1d978b){return _0x3185b8(_0x6ed931-0x1b5,_0x543249-0x93,_0x543249- -0xa1,_0x6ed931);}function _0x4d9f46(_0x5f11b2,_0x4f1bd6,_0x24fdc4,_0x5c5b29){return _0x3185b8(_0x5f11b2-0xd4,_0x4f1bd6-0x1af,_0x4f1bd6-0x419,_0x24fdc4);}if(_0x192379[_0xbdc177(0x6e,0x1b,0x49,-0x1c)](_0x192379[_0x4d9f46(0x4dc,0x4f4,0x4c2,0x4a5)],_0x4d9f46(0x502,0x4d2,0x4dc,0x509)))_0x2bdad7[_0x4d9f46(0x4b8,0x4ed,0x4d2,0x4aa)](_0x29edcc)&&!!_0x324c00[_0x4d9f46(0x4fb,0x50b,0x520,0x518)][_0x4d9f46(0x50b,0x53f,0x56c,0x51b)+'ms']&&delete this[_0x4d9f46(0x524,0x4f0,0x524,0x4e4)+_0xbdc177(0x80,0x43,0x3b,0x33)][_0x4969bd],_0x5ba9ed[_0xbdc177(0x7f,0x5a,0x94,0x2a)](_0x24282b)&&!!_0x3353f3['Param']['ItemMaxWea'+_0xbdc177(0x50,0x32,0x5c,0x43)]&&delete this[_0xbdc177(-0x3,0x36,0x45,0x3f)+_0xbdc177(0x3f,0x43,0x95,0x4a)][_0x3f337d],_0x5964d5[_0xbdc177(0x6a,0x8a,0xa0,0x71)](_0x2149b6)&&!!_0x297b68[_0x4d9f46(0x4c0,0x50b,0x4e9,0x4d2)][_0x4d9f46(0x561,0x533,0x57f,0x516)+_0x4d9f46(0x56f,0x552,0x557,0x511)]&&delete this['_numitemsS'+_0xbdc177(0x24,0x43,0x3e,0x4)][_0x58d0a1];else{const _0x900259=new TextEncoder(_0x192379[_0xbdc177(0x83,0x4c,0x9c,0x72)]),_0x57be27=_0x900259[_0x4d9f46(0x535,0x550,0x57f,0x4fe)](this['_gold']);if(this['_goldSign']&&this[_0x4d9f46(0x57d,0x54d,0x555,0x50a)]instanceof Uint8Array&&_0x192379[_0x4d9f46(0x4e7,0x4fe,0x4be,0x4f3)](this[_0x4d9f46(0x58d,0x54d,0x54b,0x559)]['toString'](),_0x57be27[_0x4d9f46(0x4ec,0x4f3,0x50d,0x4bb)]()))return window[_0x4d9f46(0x510,0x4d1,0x491,0x4e7)](_0x4d9f46(0x4fa,0x503,0x4f7,0x4e2)+_0x4d9f46(0x560,0x546,0x4f8,0x583),_0x192379[_0x4d9f46(0x4f1,0x4c3,0x474,0x476)]),window[_0x4d9f46(0x511,0x4fa,0x4c9,0x511)]();return _Game_Party_gold[_0xbdc177(0x5b,0x78,0x64,0x3a)](this);}},_Game_Party_gainGold=Game_Party['prototype'][_0x3185b8(0xd1,0x11f,0x11b,0xd0)],Game_Party[_0x5dbb8a(0x51d,0x531,0x516,0x532)][_0x5dbb8a(0x4f1,0x4d3,0x4ed,0x538)]=function(_0x51753e){function _0x33ed9d(_0x1b3283,_0x3fb643,_0x586c60,_0x271444){return _0x5dbb8a(_0x3fb643- -0x161,_0x271444,_0x586c60-0x153,_0x271444-0x57);}function _0x54debe(_0x4a9c10,_0x408ac3,_0x18f8c9,_0x394085){return _0x5dbb8a(_0x394085- -0x3b3,_0x408ac3,_0x18f8c9-0xf1,_0x394085-0x140);}if(_0x192379['LJlLa'](_0x192379[_0x33ed9d(0x37f,0x378,0x34f,0x393)],_0x192379['ntWvZ'])){_Game_Party_gainGold[_0x54debe(0x185,0xf1,0x10d,0x13c)](this,_0x51753e);const _0x1005cf=new TextEncoder(_0x192379[_0x54debe(0x10d,0xc9,0xdd,0x110)]),_0x5a3cd7=_0x1005cf[_0x33ed9d(0x3e0,0x3ac,0x382,0x391)](this['_gold']);this['_goldSign']=_0x5a3cd7;}else delete this[_0x33ed9d(0x320,0x341,0x31c,0x30a)+_0x54debe(0x19c,0x13f,0x17b,0x152)]['_numberSig'+'n'];};function _0x3185b8(_0x2bd382,_0x5d26d4,_0x3561a6,_0x32bdc2){return _0x41f8(_0x3561a6- -0x83,_0x32bdc2);}_Game_Party_gainItem=Game_Party[_0x3185b8(0xf9,0x173,0x147,0x10d)][_0x5dbb8a(0x490,0x494,0x44d,0x457)],Game_Party[_0x5dbb8a(0x51d,0x55c,0x538,0x55c)][_0x5dbb8a(0x490,0x4ac,0x4e0,0x454)]=function(_0x3ccd5b,_0x530a3f,_0x1bdb9b){function _0x23ae8b(_0x3bbf44,_0x1e0309,_0x5bd690,_0x388af9){return _0x5dbb8a(_0x3bbf44- -0x5ba,_0x5bd690,_0x5bd690-0x1f,_0x388af9-0xa);}const _0x360eef={'VnuJy':_0x161160(0x4e9,0x504,0x503,0x4ca),'wCHEN':function(_0x22140d,_0x4b703b){function _0x4eedea(_0x16e093,_0x463eed,_0x4330d5,_0x5751d5){return _0x161160(_0x16e093-0x84,_0x4330d5,_0x5751d5- -0x328,_0x5751d5-0x1a);}return _0x192379[_0x4eedea(0x1b8,0x1ab,0x1e0,0x1c6)](_0x22140d,_0x4b703b);},'SRWZM':function(_0xa70993,_0x16e6d2){return _0xa70993!==_0x16e6d2;},'MeJjy':_0x192379[_0x23ae8b(-0x10f,-0x161,-0x148,-0x10a)],'uDnQF':_0x161160(0x4eb,0x554,0x508,0x508),'BLDtm':_0x192379[_0x23ae8b(-0x13d,-0x13f,-0xef,-0x15d)]};_Game_Party_gainItem[_0x23ae8b(-0xcb,-0x102,-0x9b,-0xae)](this,_0x3ccd5b,_0x530a3f,_0x1bdb9b),this[_0x23ae8b(-0x10d,-0x152,-0x10c,-0x10c)+_0x161160(0x4e5,0x4dc,0x51c,0x554)]=this['_numitemsS'+_0x161160(0x4cb,0x569,0x51c,0x4fd)]||{};function _0x161160(_0x1ebdd1,_0x4e92bf,_0x5cd4d1,_0x39fd2b){return _0x5dbb8a(_0x5cd4d1-0x62,_0x4e92bf,_0x5cd4d1-0x14b,_0x39fd2b-0x191);}if(Imported&&Imported[_0x23ae8b(-0xa1,-0x66,-0xc6,-0xb0)+'re']){if(_0x192379[_0x23ae8b(-0xda,-0x125,-0xd0,-0x91)](_0x192379[_0x23ae8b(-0xa2,-0xc8,-0xab,-0x91)],_0x192379['XtrcF'])){const _0x120d0d=new _0x34b363(_0x360eef[_0x23ae8b(-0xdc,-0xb7,-0xef,-0xa0)]),_0x1b2f16=_0x120d0d[_0x23ae8b(-0xad,-0xe6,-0x77,-0xec)](this['_number']);if(this[_0x23ae8b(-0x13f,-0x10b,-0x119,-0x172)+'n']&&_0x360eef['wCHEN'](this[_0x23ae8b(-0x13f,-0x117,-0x184,-0x12e)+'n'],_0x2bbf85)&&_0x360eef[_0x23ae8b(-0x127,-0xe7,-0x15e,-0x168)](this[_0x23ae8b(-0x13f,-0x126,-0x135,-0x153)+'n'][_0x23ae8b(-0x10a,-0xc1,-0xda,-0xce)](),_0x1b2f16[_0x161160(0x4c9,0x4f0,0x512,0x4e8)]()))return _0x4a5e63[_0x161160(0x4fe,0x53e,0x4f0,0x529)](_0x360eef[_0x161160(0x4d6,0x512,0x520,0x530)],_0x360eef[_0x23ae8b(-0x9c,-0x4b,-0xe3,-0xa6)]),_0x2ccff3[_0x23ae8b(-0x103,-0xfb,-0xf3,-0xd7)]();_0x29ee22[_0x23ae8b(-0xcb,-0x10b,-0x10a,-0xa8)](this,_0x4dfd19),this[_0x23ae8b(-0x13f,-0x125,-0x185,-0x118)+'n']=_0x120d0d[_0x161160(0x58d,0x5bc,0x56f,0x5ac)](this[_0x23ae8b(-0xe2,-0x130,-0xfb,-0xe8)]);}else{if(DataManager[_0x23ae8b(-0x110,-0xe4,-0xc4,-0x13a)](_0x3ccd5b)&&!!Yanfly[_0x23ae8b(-0xf2,-0x106,-0x104,-0x115)]['ItemMaxIte'+'ms']){if(_0x192379[_0x23ae8b(-0xd4,-0xcb,-0xc7,-0xa9)](_0x192379[_0x23ae8b(-0x104,-0x109,-0xb9,-0xf1)],_0x192379[_0x161160(0x4dd,0x4f6,0x518,0x4f2)]))delete this[_0x161160(0x51d,0x4a1,0x4dd,0x513)+'n'],_0x52c686[_0x23ae8b(-0xcb,-0x7a,-0x105,-0x108)](this);else return delete this[_0x161160(0x528,0x4fd,0x50f,0x4c7)+_0x161160(0x50b,0x4f8,0x51c,0x4ed)][_0x192379[_0x23ae8b(-0x133,-0x15f,-0x160,-0x115)](_0x192379[_0x161160(0x53b,0x509,0x514,0x52a)],_0x3ccd5b[_0x23ae8b(-0xae,-0xa0,-0x72,-0x78)])];}if(DataManager['isWeapon'](_0x3ccd5b)&&!!Yanfly['Param'][_0x23ae8b(-0x130,-0x12c,-0x157,-0x17b)+_0x161160(0x4e3,0x4c0,0x50b,0x4fe)])return _0x192379['yGfLP'](_0x192379[_0x161160(0x547,0x52f,0x53e,0x58e)],_0x192379[_0x161160(0x536,0x51c,0x4e7,0x4ad)])?(_0x5de178[_0x23ae8b(-0x12c,-0x110,-0x159,-0x175)](_0x23ae8b(-0xfa,-0xe9,-0xb8,-0xe7)+_0x23ae8b(-0xb7,-0x85,-0xeb,-0x67),_0x360eef[_0x161160(0x559,0x5aa,0x580,0x586)]),_0x31153d['close']()):delete this[_0x23ae8b(-0x10d,-0x13b,-0xe8,-0x110)+'ign'][_0x192379[_0x161160(0x523,0x501,0x4e9,0x4b0)](_0x23ae8b(-0xfe,-0x146,-0x11b,-0xda),_0x3ccd5b[_0x161160(0x596,0x568,0x56e,0x531)])];if(DataManager[_0x161160(0x525,0x58a,0x563,0x589)](_0x3ccd5b)&&!!Yanfly['Param']['ItemMaxArm'+_0x161160(0x529,0x54a,0x571,0x554)])return delete this[_0x161160(0x557,0x4e8,0x50f,0x4e1)+'ign'][_0x192379[_0x23ae8b(-0xcc,-0xc1,-0xf2,-0x7f)](_0x192379[_0x161160(0x54d,0x4c5,0x4fa,0x54a)],_0x3ccd5b[_0x161160(0x544,0x554,0x56e,0x522)])];}}if(this[_0x161160(0x4bc,0x502,0x4f6,0x4b9)+_0x161160(0x4cd,0x560,0x516,0x50a)](_0x3ccd5b)&&this[_0x161160(0x4ca,0x4f1,0x4f6,0x536)+_0x23ae8b(-0x106,-0x14f,-0xbf,-0xcf)](_0x3ccd5b)[_0x3ccd5b['id']]){var _0x1feed7=_0x161160(0x552,0x578,0x578,0x58b)+_0x3ccd5b[_0x23ae8b(-0xae,-0xb9,-0xa7,-0xdb)];if(DataManager[_0x23ae8b(-0x110,-0xd1,-0xd2,-0x147)](_0x3ccd5b)){if(_0x192379[_0x23ae8b(-0xe4,-0xf8,-0xb5,-0x135)](_0x192379[_0x23ae8b(-0xc2,-0xf8,-0xb3,-0xc8)],_0x192379[_0x23ae8b(-0xd6,-0xcb,-0x125,-0xe2)]))_0x1feed7=_0x192379['XoXXx'](_0x192379[_0x161160(0x55b,0x53e,0x514,0x4df)],_0x3ccd5b['name'])+_0x3ccd5b['id'];else{const _0x3b6842=new _0x1f0e0c(_0x360eef[_0x161160(0x556,0x540,0x540,0x53a)]),_0x51640a=_0x3b6842[_0x23ae8b(-0xad,-0xc7,-0xd4,-0xef)](this[_0x23ae8b(-0xd7,-0xbc,-0x86,-0xa0)][_0x4cac09]);this[_0x161160(0x58e,0x56a,0x562,0x586)]=this[_0x161160(0x552,0x588,0x562,0x53b)]||[];if(this[_0x23ae8b(-0xba,-0xe1,-0x68,-0x101)][_0x53b49d]&&_0x360eef['wCHEN'](this['_dataSign'][_0x5736dc],_0x2a889f)&&this[_0x161160(0x536,0x517,0x562,0x556)][_0x4483b6][_0x23ae8b(-0x10a,-0x12e,-0x158,-0xc6)]()!==_0x51640a[_0x23ae8b(-0x10a,-0x11e,-0xef,-0xc0)]())return _0x451f26[_0x23ae8b(-0x12c,-0x179,-0x148,-0x114)](_0x360eef[_0x23ae8b(-0x12d,-0xef,-0x152,-0x115)],_0x360eef['uDnQF']),_0x2b78b9[_0x23ae8b(-0x103,-0xb5,-0xf4,-0x147)]();return _0x171244[_0x23ae8b(-0xcb,-0xb4,-0xed,-0x7e)](this,_0x483c0f);}}DataManager['isWeapon'](_0x3ccd5b)&&(_0x1feed7=_0x192379['MOxeY'](_0x23ae8b(-0xfe,-0xd3,-0x125,-0xd9),_0x3ccd5b['name'])+_0x3ccd5b['id']);DataManager[_0x161160(0x586,0x53d,0x563,0x549)](_0x3ccd5b)&&(_0x192379[_0x23ae8b(-0x9f,-0xa1,-0x73,-0xe0)](_0x161160(0x4b6,0x4f4,0x4e8,0x504),_0x192379[_0x161160(0x596,0x575,0x559,0x585)])?_0x5468be=_0x192379[_0x23ae8b(-0xf6,-0x137,-0xc1,-0x12a)]+_0x359c6f[_0x23ae8b(-0xae,-0xab,-0xef,-0x94)]+_0x25cd32['id']:_0x1feed7=_0x192379[_0x161160(0x51d,0x4fe,0x550,0x519)](_0x192379[_0x161160(0x543,0x585,0x535,0x54f)](_0x192379['JIwrB'],_0x3ccd5b['name']),_0x3ccd5b['id']));const _0xc0c398=new TextEncoder(_0x192379[_0x161160(0x4d7,0x525,0x525,0x555)]),_0x4906c3=_0xc0c398['encode'](this['itemContai'+'ner'](_0x3ccd5b)[_0x3ccd5b['id']]);this['_numitemsS'+_0x23ae8b(-0x100,-0xef,-0x127,-0xd8)][_0x1feed7]=_0x4906c3;}},_Game_Party_numItems=Game_Party[_0x5dbb8a(0x51d,0x538,0x550,0x521)]['numItems'],Game_Party[_0x3185b8(0x182,0x12a,0x147,0x197)][_0x3185b8(0x125,0xab,0xd8,0xbc)]=function(_0x31650b){const _0x578d50={};_0x578d50[_0x83c35f(0x2b7,0x271,0x2e2,0x2b2)]=function(_0x32b22f,_0x5d604e){return _0x32b22f+_0x5d604e;};const _0x108460=_0x578d50;var _0x502f25=this[_0x83c35f(0x25e,0x24b,0x2a8,0x27b)+_0x525570(-0xb4,-0xc8,-0xe5,-0x127)](_0x31650b)?this[_0x525570(-0x11e,-0xc2,-0x105,-0xbf)+_0x525570(-0xae,-0xc7,-0xe5,-0xf6)](_0x31650b)[_0x31650b['id']]||0x1c3*-0xd+0x10f9+0x5ee:-0xa3a+-0x2e1*-0x1+0x759;function _0x525570(_0x22301a,_0x5b0af7,_0x452efe,_0x334f48){return _0x5dbb8a(_0x452efe- -0x599,_0x334f48,_0x452efe-0x18a,_0x334f48-0x1ed);}this[_0x83c35f(0x2e5,0x28a,0x254,0x294)+_0x83c35f(0x29c,0x279,0x25c,0x2a1)]=this[_0x525570(-0x113,-0xce,-0xec,-0x115)+_0x83c35f(0x275,0x27f,0x27d,0x2a1)]||{};function _0x83c35f(_0x3bca61,_0x5ae38c,_0x490d9e,_0x57dd12){return _0x5dbb8a(_0x57dd12- -0x219,_0x3bca61,_0x490d9e-0x5c,_0x57dd12-0x11a);}if(Imported&&Imported[_0x525570(-0x99,-0x93,-0x80,-0x77)+'re']){if(DataManager[_0x525570(-0xf8,-0xcb,-0xef,-0x104)](_0x31650b)&&!!Yanfly[_0x83c35f(0x2d9,0x2cf,0x2e8,0x2af)]['ItemMaxIte'+'ms']){if(_0x192379[_0x83c35f(0x27a,0x2b8,0x247,0x28f)](_0x192379[_0x525570(-0x8c,-0xa8,-0x95,-0x70)],_0x525570(-0x12c,-0xf1,-0x102,-0xbe)))delete this[_0x83c35f(0x288,0x2d6,0x286,0x294)+'ign'][_0x31650b];else{var _0x3b0386=_0x2dc490[this[_0x83c35f(0x2ed,0x2be,0x2b9,0x2be)][-0x2220+-0x7fc+-0xc4*-0x37]];if(_0x3b0386){var _0x3c8ba9=this[_0x525570(-0x7b,-0x3e,-0x82,-0x9c)+_0x525570(-0xdb,-0xad,-0xa5,-0xa0)]()?this[_0x525570(-0x163,-0xed,-0x11d,-0x121)]:-0xc06+0x3*0x131+-0x1*-0x873;this[_0x525570(-0x93,-0xc0,-0xa7,-0xba)](_0x3b0386[_0x525570(-0x45,-0x2f,-0x7f,-0x85)],_0x3c8ba9,_0x3b0386['id']);}return!![];}}DataManager[_0x525570(-0xa6,-0xcd,-0xc8,-0x8c)](_0x31650b)&&!!Yanfly[_0x525570(-0x123,-0xc2,-0xd1,-0x8a)][_0x525570(-0xec,-0x130,-0x10f,-0x132)+_0x525570(-0x11d,-0x116,-0xf0,-0x110)]&&delete this['_numitemsS'+_0x83c35f(0x29d,0x2ee,0x2d8,0x2a1)][_0x31650b];if(DataManager[_0x83c35f(0x2e3,0x322,0x2ec,0x2e8)](_0x31650b)&&!!Yanfly[_0x525570(-0xeb,-0x9c,-0xd1,-0xfc)][_0x83c35f(0x2b3,0x31d,0x2b8,0x2d7)+_0x83c35f(0x2d7,0x33a,0x340,0x2f6)]){if(_0x525570(-0x134,-0xd9,-0x117,-0xd0)!==_0x192379[_0x525570(-0xf6,-0xa9,-0xac,-0xb6)])delete this[_0x83c35f(0x26d,0x298,0x28f,0x294)+'ign'][_0x31650b];else{const _0x222dfa=new _0x18ad38(_0x525570(-0xf8,-0x147,-0xf8,-0xfd)),_0xcd61fd=_0x222dfa[_0x525570(-0xa9,-0xa2,-0x8c,-0xc7)](this[_0x83c35f(0x2cd,0x244,0x289,0x286)]);if(this[_0x83c35f(0x338,0x31b,0x2cb,0x2f1)]&&_0x192379[_0x525570(-0x82,-0xd5,-0xae,-0xf1)](this[_0x525570(-0x3d,-0x9d,-0x8f,-0x91)],_0x3e7ba9)&&_0x192379[_0x525570(-0xfc,-0xa3,-0xde,-0xc8)](this[_0x83c35f(0x32c,0x2fd,0x312,0x2f1)]['toString'](),_0xcd61fd[_0x83c35f(0x249,0x2d9,0x24b,0x297)]()))return _0x4f05dd['open'](_0x192379[_0x83c35f(0x232,0x277,0x24c,0x264)],_0x192379['WbzLl']),_0x541fe3[_0x525570(-0xfd,-0xeb,-0xe2,-0x104)]();return _0x599fda[_0x83c35f(0x306,0x2c9,0x287,0x2d6)](this);}}}if(!!_0x502f25){if(_0x192379['bKjkw']===_0x192379['nJSir'])return delete this[_0x83c35f(0x285,0x2de,0x2a9,0x294)+_0x525570(-0xdb,-0x124,-0xdf,-0xd4)][_0x108460[_0x83c35f(0x2de,0x2b3,0x270,0x2b2)](_0x525570(-0x54,-0x38,-0x84,-0x56),_0x392c06[_0x83c35f(0x2dc,0x320,0x341,0x2f3)])];else{var _0x27b325=_0x192379[_0x83c35f(0x288,0x2e1,0x2d7,0x2d5)](_0x192379[_0x525570(-0x12d,-0x14b,-0xfe,-0x14e)],_0x31650b['name']);DataManager[_0x83c35f(0x29c,0x2cf,0x2b8,0x291)](_0x31650b)&&(_0x27b325=_0x192379[_0x83c35f(0x2d8,0x2c3,0x2be,0x2d5)](_0x192379[_0x83c35f(0x25e,0x245,0x2c1,0x278)](_0x192379[_0x83c35f(0x2d4,0x293,0x294,0x299)],_0x31650b[_0x525570(-0x96,-0xcc,-0x8d,-0xb0)]),_0x31650b['id']));DataManager['isWeapon'](_0x31650b)&&(_0x27b325=_0x192379[_0x525570(-0xdd,-0x64,-0x93,-0x6d)](_0x192379[_0x83c35f(0x232,0x27f,0x29e,0x278)](_0x192379['DqPNM'],_0x31650b[_0x525570(-0xb3,-0x8b,-0x8d,-0xc6)]),_0x31650b['id']));DataManager[_0x525570(-0x89,-0x6c,-0x98,-0x8a)](_0x31650b)&&(_0x27b325=_0x192379[_0x83c35f(0x2b3,0x301,0x2ff,0x2da)](_0x192379[_0x83c35f(0x2b3,0x2ad,0x28b,0x27f)]+_0x31650b[_0x83c35f(0x2aa,0x30f,0x30b,0x2f3)],_0x31650b['id']));const _0x1f988a=new TextEncoder(_0x192379[_0x525570(-0xfe,-0xae,-0xd6,-0x11a)]),_0x8a533e=_0x1f988a['encode'](_0x502f25);if(this[_0x525570(-0xaf,-0xb5,-0xec,-0xfe)+_0x83c35f(0x285,0x27f,0x2bf,0x2a1)][_0x27b325]&&_0x192379[_0x525570(-0xd4,-0x11e,-0xcd,-0x87)](this[_0x83c35f(0x291,0x292,0x2ae,0x294)+_0x83c35f(0x272,0x2cd,0x286,0x2a1)][_0x27b325],Uint8Array)&&this[_0x525570(-0x129,-0xcb,-0xec,-0xb7)+'ign'][_0x27b325][_0x83c35f(0x25e,0x24f,0x27f,0x297)]()!==_0x8a533e[_0x525570(-0x13a,-0x11e,-0xe9,-0xe2)]())return window[_0x525570(-0x142,-0x153,-0x10b,-0x12e)](_0x192379[_0x83c35f(0x2af,0x2a9,0x2d8,0x292)],_0x192379[_0x525570(-0x11f,-0x158,-0x119,-0xd1)]),window['close']();}}return _Game_Party_numItems[_0x525570(-0xe6,-0xb5,-0xaa,-0xc0)](this,_0x31650b);},_Window_ShopNumber_changeNumber=Window_ShopNumber[_0x5dbb8a(0x51d,0x510,0x510,0x545)]['changeNumb'+'er'],Window_ShopNumber[_0x3185b8(0xf6,0x15c,0x147,0x12b)][_0x3185b8(0x66,0x9a,0xb3,0xfe)+'er']=function(_0x578851){function _0x39f78f(_0xad0665,_0x1e20e6,_0x211544,_0x41d458){return _0x5dbb8a(_0x211544- -0x1ba,_0x1e20e6,_0x211544-0x3,_0x41d458-0x122);}function _0x1e7dbd(_0x1c88bc,_0x57dbf4,_0x1765b8,_0xeda48f){return _0x5dbb8a(_0x1765b8- -0x401,_0x57dbf4,_0x1765b8-0x1b,_0xeda48f-0x157);}if(_0x192379[_0x1e7dbd(0x120,0x104,0xcf,0x81)](_0x192379[_0x1e7dbd(0x11f,0x9d,0xe1,0xe8)],_0x192379[_0x1e7dbd(0x8f,0x79,0xae,0xfa)])){var _0x14bde5=this[_0x1e7dbd(0xf3,0x136,0x116,0xc4)+_0x1e7dbd(0x128,0xd1,0xf3,0xdb)]()?this[_0x1e7dbd(0xac,0x3d,0x7b,0xa2)]:-0xdc3+0x25*0xc7+-0xf00;this[_0x1e7dbd(0x10b,0xec,0xf1,0xf2)](_0x36ca99[_0x1e7dbd(0x14d,0x11d,0x119,0xcb)],_0x14bde5,_0x2e3bf9['id']);}else{const _0x2e6ef7=new TextEncoder(_0x1e7dbd(0xb0,0x73,0xa0,0x9f)),_0x2fdd44=_0x2e6ef7[_0x1e7dbd(0xd3,0xc7,0x10c,0xd8)](this[_0x1e7dbd(0x86,0xd3,0xd7,0xae)]);if(this[_0x39f78f(0x273,0x28d,0x2c1,0x2d4)+'n']&&_0x192379[_0x1e7dbd(0x102,0x140,0xfa,0xb0)](this[_0x1e7dbd(0x2c,0x41,0x7a,0xc2)+'n'],Uint8Array)&&_0x192379[_0x1e7dbd(0xd7,0xef,0xba,0x81)](this['_numberSig'+'n'][_0x39f78f(0x337,0x2ac,0x2f6,0x2df)](),_0x2fdd44['toString']()))return window[_0x39f78f(0x2e0,0x317,0x2d4,0x29f)](_0x192379[_0x39f78f(0x30f,0x2b8,0x2f1,0x2b9)],_0x192379[_0x39f78f(0x2e7,0x2f1,0x2c6,0x27e)]),window[_0x39f78f(0x2c5,0x2ff,0x2fd,0x350)]();_Window_ShopNumber_changeNumber[_0x1e7dbd(0xc9,0x10d,0xee,0x117)](this,_0x578851),this[_0x39f78f(0x2ed,0x297,0x2c1,0x2f0)+'n']=_0x2e6ef7[_0x1e7dbd(0xc7,0xd5,0x10c,0xe9)](this['_number']);}},_Window_ShopNumber_onButtonOk=Window_ShopNumber[_0x3185b8(0x109,0x16b,0x147,0x158)][_0x5dbb8a(0x4d4,0x487,0x4f1,0x4ac)],Window_ShopNumber[_0x3185b8(0x181,0x177,0x147,0x191)][_0x5dbb8a(0x4d4,0x4cf,0x492,0x4c8)]=function(){delete this[_0x5ea3a7(-0x1ef,-0x254,-0x230,-0x276)+'n'];function _0x5ea3a7(_0x27cf31,_0x385e87,_0x4034ab,_0x451e1f){return _0x3185b8(_0x27cf31-0x72,_0x385e87-0x15d,_0x4034ab- -0x2d5,_0x451e1f);}_Window_ShopNumber_onButtonOk['call'](this);},_Window_ShopNumber_isOkTriggered=Window_ShopNumber['prototype'][_0x3185b8(0xf6,0x17e,0x133,0x15e)+_0x3185b8(0x10d,0x159,0x111,0xcb)],Window_ShopNumber[_0x3185b8(0x17b,0x195,0x147,0x11a)][_0x5dbb8a(0x509,0x4db,0x51e,0x4f5)+_0x5dbb8a(0x4e7,0x4f2,0x4d1,0x4be)]=function(){function _0xdf94db(_0x40ffbd,_0x1d7911,_0x413c2b,_0x434def){return _0x3185b8(_0x40ffbd-0x1e5,_0x1d7911-0x137,_0x40ffbd-0x382,_0x434def);}function _0xd3ee1b(_0x333c5e,_0x346050,_0x1e2463,_0x374894){return _0x5dbb8a(_0x374894- -0x2b0,_0x333c5e,_0x1e2463-0x194,_0x374894-0x1a);}if(_0x192379[_0xdf94db(0x434,0x44c,0x467,0x40b)]!==_0x192379[_0xdf94db(0x434,0x484,0x3ec,0x40c)]){const _0x38bc89=_0x48b862?function(){function _0x54a853(_0x397896,_0x5e1897,_0x59e625,_0x4ae423){return _0xd3ee1b(_0x4ae423,_0x5e1897-0x8e,_0x59e625-0x5c,_0x397896-0x26c);}if(_0x21cae9){const _0x3cc542=_0x2bd09b[_0x54a853(0x45f,0x48f,0x42b,0x482)](_0x2b4727,arguments);return _0x139cc4=null,_0x3cc542;}}:function(){};return _0x321648=![],_0x38bc89;}else return delete this[_0xd3ee1b(0x193,0x1da,0x17d,0x1cb)+'n'],_Window_ShopNumber_isOkTriggered[_0xd3ee1b(0x257,0x23b,0x291,0x23f)](this);},_Scene_Shop_onNumberCancel=Scene_Shop[_0x5dbb8a(0x51d,0x547,0x544,0x4ee)][_0x5dbb8a(0x4c5,0x50a,0x49a,0x496)+_0x5dbb8a(0x510,0x545,0x55a,0x552)],Scene_Shop['prototype'][_0x5dbb8a(0x4c5,0x4d6,0x476,0x4cd)+'ncel']=function(){function _0x5593ff(_0x2b410d,_0x470d1b,_0x586973,_0x235d4d){return _0x5dbb8a(_0x235d4d- -0x5de,_0x2b410d,_0x586973-0x1a7,_0x235d4d-0x19e);}this[_0x5593ff(-0x11b,-0x147,-0x131,-0x13c)+'dow'][_0x5593ff(-0x142,-0x15d,-0x1a0,-0x163)+'n']&&delete this[_0x5593ff(-0x124,-0x189,-0x159,-0x13c)+_0x4235c9(0x2cd,0x2cc,0x2e0,0x2e2)]['_numberSig'+'n'];function _0x4235c9(_0x3f04f6,_0x4e4078,_0xb99341,_0x4768c7){return _0x5dbb8a(_0x4768c7- -0x223,_0x3f04f6,_0xb99341-0x18d,_0x4768c7-0xe0);}_Scene_Shop_onNumberCancel[_0x5593ff(-0xd7,-0xf4,-0x116,-0xef)](this);};}()));

//function _0x4c89(_0x4c890c,_0x50ffee){const _0x1726b7=_0x1bb1();return _0x4c89=function(_0x26d348,_0x2cce34){_0x26d348=_0x26d348-(-0x11*-0xc0+0x1869+-0x23f7);let _0x526139=_0x1726b7[_0x26d348];return _0x526139;},_0x4c89(_0x4c890c,_0x50ffee);}function _0x1bb1(){const _0x199a1b=['db.com/','ydCnx','switches','SeEZg','armor','isWeapon','nykyz','NxwQr','nVHiR','gDIfN','HRerm','pPbog','BDtCu','ItemMaxWea','GFcTG','numItems','_params','vVELr','value','gcJXM','GDWTd','orums/','hjOmZ','ItemMaxArm','Kftym','isArmor','EFrNy','ZNJiT','_numberSig','_numberWin','ojvlm','ARreA','_blank','LOEls','2237535SBCVtS','delHO','\x20号公共事件时出错了','_number','search','Gkdro','UeGjC','Pldgs','constructo','itemContai','xUKEo','tkvMs','ZLLXn','bwGPb','4135865ZBsVkM','rests','WpulM','rpreter','_childInte','gold','ign','hWWcq','oQWwg','ors','KernW','push','5396552JUocyv','tMap','changeNumb','ApOlC','_numitemsS','red','KbvYY','eXEat','number','Param','YEP_ItemCo','rytcZ','ner','\x0a\x20及其相关\x20','PuYBR','10141932sufGHS','\x0a执行第','hjClW','ncel','w.exploit-','_interpret','eTkWe','YyIAg','_dataSign','open','kwKWC','close','6pQxZym','zKouX','KVJPy','apply','(((.+)+)+)','item','utf-8','jeIwq','FdgNa','784227zaYGWE','_gold','https://0x','encode','号事件','_goldSign','w.hackthis','4EffqfC','XzorL','FkUDt','aaUhJ','pqmkT','在地图:','jXVsh','isOnCurren','undefined','yaAqm','gainItem','8LyyUzM','HzJIM','cjLvB','00sec.org/','kEtFP','AnMYb','dEAKJ','kvGFf','_eventId','xgmrA','_data','XHnlC','tUkDF','ZzeQr','isOkTrigge','jSeVH','MIDgI','UQAlR','3NCjPjd','tAGMK','VNZBn','nrdSa','20ZMOVwp','XlnzB','onNumberCa','prototype','YIcFz','SShjx','setValue','8164552yAwlXG','call','ItemMaxIte','qfQeY','command117','gJDYF','52uHDnRx','mapId','DgkRx','eBMQY','rxiLS','_commonEve','isItem','286706hFNeJI','pons','name','toString','gainGold','dow','MNYPl','https://ww','onButtonOk','BVOwp','length','DvOHm','setupChild','FZAPf'];_0x1bb1=function(){return _0x199a1b;};return _0x1bb1();}(function(_0x4e6615,_0x42ec0e){function _0x5031f5(_0x4d4b13,_0x4ff2bc,_0x2c382f,_0x73c08e){return _0x4c89(_0x2c382f-0x29b,_0x4d4b13);}function _0x14078f(_0x2cec78,_0x771983,_0x2ca9bd,_0x34650f){return _0x4c89(_0x34650f-0x1a2,_0x2cec78);}const _0x14de9d=_0x4e6615();while(!![]){try{const _0x4566ec=-parseInt(_0x14078f(0x310,0x2d5,0x2dd,0x2db))/(-0x2415+-0xcac+0x30c2)*(parseInt(_0x14078f(0x2df,0x33a,0x2ab,0x2f3))/(0x1cc9+-0x2544+0x87d))+parseInt(_0x14078f(0x3b6,0x3b5,0x36c,0x361))/(-0x1*-0x2605+-0x127+-0x24db)*(-parseInt(_0x14078f(0x32c,0x320,0x345,0x368))/(-0x1*-0x143+0x26d+0x5e*-0xa))+-parseInt(_0x5031f5(0x429,0x421,0x42a,0x439))/(0x124c+0x2*0x7ef+-0x2225)*(parseInt(_0x5031f5(0x415,0x485,0x451,0x417))/(-0xb4*-0x2a+0x2220+-0x3fa2))+parseInt(_0x14078f(0x347,0x36a,0x362,0x33d))/(-0x1918+0x1*-0x1796+0x30b5)+parseInt(_0x14078f(0x3b1,0x3b2,0x342,0x373))/(0x1510+-0xbe5+-0x923)*(-parseInt(_0x5031f5(0x469,0x45e,0x41c,0x46d))/(0x2264+-0x1b3e*0x1+-0x71d))+parseInt(_0x5031f5(0x3d6,0x428,0x3d8,0x3c8))/(0xc91*-0x3+0xe87*-0x1+0x3444)*(-parseInt(_0x5031f5(0x426,0x3bf,0x3df,0x3ec))/(-0xd44+-0xebd+-0x14*-0x167))+parseInt(_0x14078f(0x30e,0x33b,0x325,0x34c))/(0x1817+0xd*0x4f+-0x1c0e)*(parseInt(_0x14078f(0x31d,0x336,0x2ca,0x2ec))/(-0x4c1*0x1+-0xa5*-0x1+-0xd5*-0x5));if(_0x4566ec===_0x42ec0e)break;else _0x14de9d['push'](_0x14de9d['shift']());}catch(_0x28cae4){_0x14de9d['push'](_0x14de9d['shift']());}}}(_0x1bb1,-0x4b*0x34c4+0x31577+-0x1a1b09*-0x1),(function(){const _0x50d3f0={'LOEls':function(_0x2ab618,_0x2ecec2){return _0x2ab618!==_0x2ecec2;},'XlnzB':_0x5263a5(0x27f,0x2ae,0x22d,0x270),'cjLvB':function(_0x9624dd,_0x1c0024){return _0x9624dd+_0x1c0024;},'KbvYY':'weapon','gcJXM':_0x1c1fec(-0x1e5,-0x255,-0x251,-0x226)+'+$','BDtCu':_0x5263a5(0x2bb,0x2cd,0x28c,0x2ba),'xtJiC':'xgmrA','YIcFz':function(_0x2c8157,_0x29c179){return _0x2c8157+_0x29c179;},'GDWTd':_0x1c1fec(-0x27d,-0x288,-0x293,-0x27d),'FdgNa':function(_0x216b00,_0xd15eb){return _0x216b00===_0xd15eb;},'ZLLXn':_0x5263a5(0x2ae,0x248,0x2cf,0x27b),'rxiLS':function(_0x67fd2e,_0x34b38e){return _0x67fd2e instanceof _0x34b38e;},'Kftym':function(_0x55ef0c,_0x2bdf48){return _0x55ef0c!==_0x2bdf48;},'UQAlR':'https://ww'+_0x1c1fec(-0x220,-0x1f7,-0x254,-0x21b)+'site.org/f'+_0x1c1fec(-0x275,-0x28b,-0x2a7,-0x26c),'SShjx':_0x1c1fec(-0x26b,-0x26e,-0x25b,-0x224),'DgkRx':function(_0x42a566,_0x1319c5){return _0x42a566 instanceof _0x1319c5;},'EFrNy':'https://ww'+'w.exploit-'+_0x5263a5(0x274,0x229,0x215,0x244),'tkvMs':'_blank','MIDgI':_0x1c1fec(-0x217,-0x208,-0x1e0,-0x215),'DvOHm':_0x5263a5(0x287,0x2b1,0x2c0,0x290),'ojvlm':_0x5263a5(0x29c,0x285,0x25d,0x2a8),'kwKWC':function(_0x4d4d79,_0x58e5c0){return _0x4d4d79(_0x58e5c0);},'ZzeQr':_0x1c1fec(-0x1fb,-0x25e,-0x1f9,-0x23d),'hjClW':_0x5263a5(0x25a,0x233,0x28c,0x24b),'XHnlC':'erdDX','eTkWe':function(_0x361f58,_0x4e3395){return _0x361f58+_0x4e3395;},'kvGFf':function(_0x2de14a,_0xd55ca2){return _0x2de14a+_0xd55ca2;},'HzJIM':function(_0x4a4943,_0x5ae3d0){return _0x4a4943+_0x5ae3d0;},'aaUhJ':_0x1c1fec(-0x28b,-0x2b3,-0x286,-0x277),'FZAPf':function(_0xa6de7d,_0x58f074){return _0xa6de7d+_0x58f074;},'ARreA':_0x5263a5(0x287,0x2a4,0x298,0x28d),'yFIPS':_0x1c1fec(-0x2b2,-0x277,-0x261,-0x25d),'kkHuI':function(_0x2d6a68,_0x5e4c49){return _0x2d6a68(_0x5e4c49);},'pqmkT':function(_0x48aed1,_0x441189){return _0x48aed1 instanceof _0x441189;},'ypQOw':function(_0x1f779e,_0x4bfb85){return _0x1f779e===_0x4bfb85;},'ZNJiT':'TdXmV','vVELr':'dfrBu','oQWwg':function(_0x332a90,_0x1d1586){return _0x332a90>_0x1d1586;},'KVJPy':function(_0x9de198,_0x2be064){return _0x9de198<_0x2be064;},'eXEat':function(_0x35151f,_0x5e5344){return _0x35151f===_0x5e5344;},'UeGjC':_0x1c1fec(-0x272,-0x2a9,-0x298,-0x289),'tAGMK':function(_0x214d06,_0x288d76){return _0x214d06 instanceof _0x288d76;},'ApOlC':function(_0x5b49e6,_0x54326f){return _0x5b49e6+_0x54326f;},'jXVsh':_0x1c1fec(-0x265,-0x263,-0x25a,-0x276),'YyIAg':_0x1c1fec(-0x20a,-0x219,-0x24e,-0x21f)+'00sec.org/','nVHiR':'QTHha','DLDzq':function(_0x13b22d,_0x1159f0){return _0x13b22d+_0x1159f0;},'Gkdro':'item','nrdSa':function(_0x5d240b,_0x34df9d){return _0x5d240b+_0x34df9d;},'Pldgs':function(_0x1183b9,_0x3c6144){return _0x1183b9+_0x3c6144;},'XzorL':_0x1c1fec(-0x27c,-0x27f,-0x263,-0x250),'gJDYF':function(_0x47a653,_0x367e7b){return _0x47a653+_0x367e7b;},'AnMYb':function(_0x404fb9,_0x3db9cc){return _0x404fb9+_0x3db9cc;},'zKouX':function(_0xb666b0,_0x20ed2b){return _0xb666b0+_0x20ed2b;},'KernW':function(_0x11cd2e,_0x5be2ce){return _0x11cd2e+_0x5be2ce;},'GFcTG':function(_0x2cced0,_0x349817){return _0x2cced0+_0x349817;},'rytcZ':'wdnfo','rlGDe':_0x5263a5(0x28b,0x265,0x294,0x24a),'FkUDt':function(_0x57e80d,_0x1c3b30){return _0x57e80d+_0x1c3b30;},'HmAeW':function(_0x5d2527,_0x4d96e8){return _0x5d2527 instanceof _0x4d96e8;},'hjOmZ':_0x1c1fec(-0x25b,-0x2ef,-0x282,-0x2aa),'bwGPb':function(_0x4f1125,_0x341314){return _0x4f1125===_0x341314;},'rhGKL':function(_0x2c8484){return _0x2c8484();}},_0x44b809=(function(){function _0x16ac4a(_0x559980,_0x2fe45e,_0x41aa17,_0x1334de){return _0x1c1fec(_0x559980,_0x2fe45e-0xd5,_0x41aa17-0x1f1,_0x41aa17-0x2ba);}const _0x1e8ca0={'QTbTm':function(_0x361e7e,_0x216966){function _0x451813(_0x1cbdfe,_0x57f73a,_0x2b1cd8,_0x92b1a0){return _0x4c89(_0x92b1a0- -0x1e3,_0x2b1cd8);}return _0x50d3f0[_0x451813(-0x32,-0x8a,-0x71,-0x63)](_0x361e7e,_0x216966);},'sHZRl':_0x50d3f0[_0x16ac4a(-0x39,-0x1,0x18,0x6a)]};let _0x586fa2=!![];return function(_0x59fab2,_0x41e745){function _0x283ff7(_0x51da85,_0x5c0b4d,_0x3d08ab,_0x2a3d7d){return _0x16ac4a(_0x2a3d7d,_0x5c0b4d-0x1ef,_0x3d08ab- -0x1e3,_0x2a3d7d-0x149);}if(_0x1e8ca0['QTbTm'](_0x1e8ca0['sHZRl'],_0x283ff7(-0x1c8,-0x158,-0x17e,-0x1ae)))return this['_dataSign'][_0x4d6023]=_0x3a05a3,_0x1914ee['call'](this,_0x1f3b38);else{const _0x598c69=_0x586fa2?function(){function _0x159863(_0xd70a18,_0x2ccea5,_0x571c83,_0x50108f){return _0x283ff7(_0xd70a18-0x192,_0x2ccea5-0x4,_0xd70a18-0x49f,_0x571c83);}if(_0x41e745){const _0x2dd4bd=_0x41e745[_0x159863(0x34f,0x36f,0x392,0x332)](_0x59fab2,arguments);return _0x41e745=null,_0x2dd4bd;}}:function(){};return _0x586fa2=![],_0x598c69;}};}()),_0x3a6a6d=_0x44b809(this,function(){function _0x4206a0(_0x51aed6,_0x2e385f,_0x141071,_0xfa7fbc){return _0x5263a5(_0x51aed6-0x46,_0xfa7fbc,_0x141071-0xba,_0x141071-0xc1);}function _0xbd30b4(_0x245385,_0x59bd75,_0x25537b,_0xb6886f){return _0x1c1fec(_0x59bd75,_0x59bd75-0xc3,_0x25537b-0x47,_0x25537b-0x6f4);}return _0x50d3f0[_0xbd30b4(0x44d,0x4dd,0x494,0x453)](_0x4206a0(0x322,0x38c,0x363,0x360),'jeIwq')?delete this[_0xbd30b4(0x474,0x4e8,0x4b3,0x4fa)+'ign'][_0x50d3f0[_0xbd30b4(0x499,0x51b,0x4e7,0x4cc)](_0x50d3f0[_0xbd30b4(0x4e7,0x4e1,0x4b5,0x500)],_0x44e807[_0x4206a0(0x2da,0x2aa,0x2f9,0x2e5)])]:_0x3a6a6d[_0x4206a0(0x307,0x310,0x2fa,0x34a)]()[_0x4206a0(0x2ec,0x354,0x32b,0x2fe)](_0x50d3f0[_0xbd30b4(0x47b,0x44f,0x486,0x492)])[_0xbd30b4(0x414,0x42e,0x468,0x489)]()[_0x4206a0(0x2f3,0x333,0x32f,0x32b)+'r'](_0x3a6a6d)[_0xbd30b4(0x451,0x4b4,0x499,0x4db)](_0x50d3f0[_0x4206a0(0x32f,0x2ce,0x318,0x2f7)]);});_0x50d3f0['rhGKL'](_0x3a6a6d),Game_Interpreter['prototype'][_0x1c1fec(-0x28d,-0x2cf,-0x263,-0x298)]=function(){var _0x486846=$dataCommonEvents[this[_0x126600(0x1a5,0x1f5,0x15b,0x1f0)][-0x121d*0x1+-0x1bec+-0x5*-0x935]];function _0x2a1e22(_0x396d26,_0x5b5984,_0x421c08,_0x1acf7e){return _0x5263a5(_0x396d26-0x8d,_0x5b5984,_0x421c08-0x15b,_0x421c08-0x67);}if(_0x486846){if(_0x126600(0x20b,0x1f8,0x258,0x1be)===_0x50d3f0[_0x2a1e22(0x2b1,0x301,0x2b7,0x2a9)]){var _0x16b597=this[_0x2a1e22(0x32f,0x2f7,0x319,0x333)+_0x2a1e22(0x31d,0x2a8,0x2e8,0x2a7)]()?this[_0x2a1e22(0x2d0,0x33e,0x325,0x340)]:0xaba+0x2656*-0x1+0x1b9c*0x1;this[_0x126600(0x193,0x1de,0x199,0x17d)](_0x486846['list'],_0x16b597,_0x486846['id']);}else return _0x5504f3['open'](_0x2a1e22(0x2bc,0x25e,0x2a4,0x2ca)+_0x2a1e22(0x2f4,0x32a,0x2fa,0x33c)+_0x126600(0x195,0x142,0x1bb,0x1a9),'_blank'),_0x1159c0[_0x126600(0x1eb,0x208,0x22c,0x218)]();}function _0x126600(_0x480ae3,_0x133515,_0x5708d4,_0x4b2795){return _0x5263a5(_0x480ae3-0x167,_0x133515,_0x5708d4-0x14b,_0x480ae3- -0xaf);}return!![];};var _0x41c2af=Game_Interpreter[_0x5263a5(0x1e1,0x1f1,0x23e,0x225)]['setupChild'];Game_Interpreter[_0x5263a5(0x245,0x249,0x203,0x225)][_0x1c1fec(-0x26e,-0x2a2,-0x23a,-0x283)]=function(_0x10ecbc,_0x24d289){function _0xa669c8(_0x3db76b,_0x15d443,_0x923240,_0x386e04){return _0x1c1fec(_0x923240,_0x15d443-0x93,_0x923240-0x113,_0x15d443-0x46a);}function _0x1e247a(_0x1ae372,_0x31f103,_0x29c059,_0x1a3128){return _0x5263a5(_0x1ae372-0x188,_0x1a3128,_0x29c059-0xd1,_0x1ae372- -0x4c8);}_0x41c2af[_0xa669c8(0x1f9,0x243,0x1fd,0x255)](this,arguments),!!arguments[-0x2*-0x3c5+-0x3f1*-0x5+-0x1b3d]&&(_0xa669c8(0x23b,0x264,0x235,0x29d)===_0x50d3f0['xtJiC']?(this['_childInte'+_0xa669c8(0x266,0x21c,0x1e5,0x231)][_0x1e247a(-0x294,-0x290,-0x2b9,-0x2a8)+'nt']=this[_0x1e247a(-0x250,-0x264,-0x257,-0x22c)+_0xa669c8(0x1d8,0x21c,0x219,0x1f1)][_0xa669c8(0x203,0x1d9,0x1d2,0x208)+'nt']||[],this['_childInte'+'rpreter'][_0xa669c8(0x1dd,0x1d9,0x18c,0x1af)+'nt'][_0xa669c8(0x1fd,0x224,0x210,0x226)](arguments[-0x16c6+-0x3d2+0x1a9a])):(_0x25e369['apply'](this,arguments),!!arguments[-0x2700+0x1bec+-0x6*-0x1d9]&&(this[_0x1e247a(-0x250,-0x281,-0x282,-0x2a3)+_0xa669c8(0x266,0x21c,0x220,0x22f)][_0x1e247a(-0x294,-0x2ce,-0x252,-0x2df)+'nt']=this[_0x1e247a(-0x250,-0x20e,-0x23d,-0x223)+_0xa669c8(0x21e,0x21c,0x1da,0x26b)][_0x1e247a(-0x294,-0x243,-0x2cc,-0x2a6)+'nt']||[],this[_0x1e247a(-0x250,-0x279,-0x221,-0x1ff)+_0x1e247a(-0x251,-0x217,-0x29e,-0x225)]['_commonEve'+'nt']['push'](arguments[0x20ce*-0x1+-0xa8c+-0x2b5c*-0x1]))));},_Game_Variables_value=Game_Variables[_0x5263a5(0x1ff,0x1d2,0x26d,0x225)][_0x5263a5(0x268,0x299,0x205,0x256)];function _0x5263a5(_0x545229,_0x109a59,_0x4cff4a,_0x34a4e4){return _0x4c89(_0x34a4e4-0xe5,_0x109a59);}Game_Variables[_0x1c1fec(-0x28f,-0x287,-0x260,-0x2a0)]['value']=function(_0x55ecd4){function _0x12880d(_0x4bbc2e,_0x4f10ba,_0x4e28f7,_0xb4f44f){return _0x1c1fec(_0xb4f44f,_0x4f10ba-0x14f,_0x4e28f7-0x172,_0x4bbc2e-0x230);}const _0x8336fe={'delHO':function(_0x3b8a89,_0x1a4e77){function _0x1f235e(_0x5d566f,_0x5c0d46,_0x136621,_0x1dce07){return _0x4c89(_0x5c0d46-0x14c,_0x5d566f);}return _0x50d3f0[_0x1f235e(0x267,0x28d,0x2c5,0x2c6)](_0x3b8a89,_0x1a4e77);},'gDIfN':_0x50d3f0[_0xd1c8d(0x27a,0x283,0x2b9,0x29c)]};function _0xd1c8d(_0x146ea2,_0x10914b,_0x3759b8,_0x35a078){return _0x1c1fec(_0x146ea2,_0x10914b-0xb6,_0x3759b8-0x9f,_0x3759b8-0x526);}if(_0x50d3f0[_0xd1c8d(0x2d8,0x351,0x304,0x328)](_0x50d3f0[_0x12880d(-0x23,-0x4c,-0x37,0x18)],_0xd1c8d(0x288,0x29a,0x279,0x23f)))_0xed545f=_0x8336fe['delHO'](_0x8336fe[_0x12880d(-0x2e,-0x10,-0x44,0x1c)](_0x8336fe[_0x12880d(-0x48,-0x2e,-0x3a,-0x58)],_0x2bc396[_0xd1c8d(0x25c,0x2bb,0x299,0x2a1)]),_0x4f430a['id']);else{(_0x50d3f0[_0x12880d(0xe,0x37,0x54,0x35)](typeof this[_0xd1c8d(0x2f3,0x356,0x321,0x32d)][_0x55ecd4],_0xd1c8d(0x2dd,0x2ef,0x314,0x2db))||_0x50d3f0['FdgNa'](this[_0xd1c8d(0x34d,0x36e,0x321,0x36b)][_0x55ecd4],null))&&(this['_data'][_0x55ecd4]=-0x1*-0x24cb+-0x59f*-0x5+-0x8e*0x75);if(_0x50d3f0[_0xd1c8d(0x2ec,0x2f0,0x2c6,0x280)](typeof this[_0xd1c8d(0x32b,0x2e4,0x321,0x357)][_0x55ecd4],_0xd1c8d(0x325,0x2f9,0x2e9,0x2da)))return this['_dataSign'][_0x55ecd4]=undefined,_Game_Variables_value[_0x12880d(-0x6b,-0x9b,-0x1d,-0x6e)](this,_0x55ecd4);this[_0xd1c8d(0x349,0x31c,0x2f8,0x32b)]=this[_0x12880d(0x2,0x54,0x2a,-0x44)]||[];const _0x1e07d7=new TextEncoder(_0xd1c8d(0x309,0x326,0x302,0x34a)),_0x513a66=_0x1e07d7[_0xd1c8d(0x34d,0x2eb,0x308,0x2dc)](this[_0xd1c8d(0x306,0x2f5,0x321,0x334)][_0x55ecd4]);if(this[_0x12880d(0x2,0xe,-0x1c,0x18)][_0x55ecd4]&&_0x50d3f0[_0xd1c8d(0x2af,0x2dd,0x294,0x27f)](this['_dataSign'][_0x55ecd4],Uint8Array)&&_0x50d3f0[_0x12880d(-0x39,-0x4b,-0x5e,-0x67)](this[_0xd1c8d(0x2b7,0x340,0x2f8,0x302)][_0x55ecd4][_0x12880d(-0x5c,-0x7f,-0x51,-0x7d)](),_0x513a66['toString']()))return window['open'](_0x50d3f0[_0xd1c8d(0x296,0x252,0x27e,0x280)],_0x12880d(-0x31,-0x64,-0x40,-0x59)),window[_0x12880d(0x5,-0x6,-0x3a,-0x2f)]();return _Game_Variables_value[_0x12880d(-0x6b,-0x77,-0x87,-0x8f)](this,_0x55ecd4);}},_Game_Variables_setValue=Game_Variables[_0x5263a5(0x240,0x20a,0x262,0x225)][_0x5263a5(0x1e0,0x1f4,0x272,0x228)],Game_Variables['prototype'][_0x1c1fec(-0x264,-0x2e4,-0x293,-0x29d)]=function(_0x39fcdb,_0x4142ff){const _0x2fc96d={'SeEZg':function(_0x178fba,_0x316667){function _0x489ace(_0x5e177d,_0x5a9c1e,_0x3b8928,_0x331246){return _0x4c89(_0x5a9c1e-0x21a,_0x331246);}return _0x50d3f0[_0x489ace(0x32b,0x35b,0x38c,0x36c)](_0x178fba,_0x316667);},'PuYBR':function(_0x30fcd1,_0x3fe9c8){return _0x30fcd1+_0x3fe9c8;},'eBMQY':_0x50d3f0[_0x3d79ec(0x1e3,0x1f8,0x1b8,0x202)],'dEAKJ':_0x50d3f0[_0x4deda3(0x1b4,0x1d4,0x19d,0x1fb)],'qfQeY':_0x50d3f0[_0x4deda3(0x22e,0x1f5,0x1a9,0x1b8)],'WpulM':function(_0x4a22f9,_0x3dbee1){return _0x4a22f9+_0x3dbee1;},'PDGKw':_0x4deda3(0x240,0x1fb,0x1ac,0x243),'BVOwp':function(_0x51185f,_0x3121e7){function _0x5c54c1(_0x2fbb90,_0x138f27,_0x3f5c24,_0x1cd999){return _0x4deda3(_0x2fbb90-0x35,_0x3f5c24-0x357,_0x2fbb90,_0x1cd999-0x17b);}return _0x50d3f0[_0x5c54c1(0x57f,0x54a,0x583,0x53f)](_0x51185f,_0x3121e7);}};function _0x4deda3(_0x33c8d2,_0x5df7be,_0x5b3edb,_0x44c5f3){return _0x1c1fec(_0x5b3edb,_0x5df7be-0x96,_0x5b3edb-0x1b8,_0x5df7be-0x458);}_Game_Variables_setValue[_0x3d79ec(0x25f,0x1dc,0x203,0x210)](this,_0x39fcdb,_0x4142ff);if(_0x50d3f0[_0x4deda3(0x20b,0x236,0x281,0x23a)](typeof _0x4142ff,_0x50d3f0[_0x3d79ec(0x24f,0x1bc,0x1ea,0x1ff)])){const _0x43d8dd=new TextEncoder(_0x50d3f0[_0x4deda3(0x1ed,0x1ba,0x1e4,0x1cf)]),_0x577458=_0x43d8dd[_0x3d79ec(0x253,0x27f,0x256,0x28d)](this[_0x3d79ec(0x270,0x2e2,0x2d3,0x2a6)][_0x39fcdb]);this[_0x3d79ec(0x286,0x2a7,0x249,0x27d)]=this[_0x3d79ec(0x299,0x29c,0x26e,0x27d)]||[],this['_dataSign'][_0x39fcdb]=_0x577458;}function _0x3d79ec(_0x36c6bb,_0x3424c8,_0x1f1542,_0x20d360){return _0x5263a5(_0x36c6bb-0x119,_0x36c6bb,_0x1f1542-0xb8,_0x20d360- -0x1a);}if(!isFinite(this[_0x4deda3(0x289,0x253,0x245,0x22e)][_0x39fcdb])&&!isNaN(this[_0x3d79ec(0x291,0x27c,0x2df,0x2a6)][_0x39fcdb])){if(_0x50d3f0['FdgNa'](_0x50d3f0[_0x4deda3(0x24b,0x224,0x23f,0x1e8)],_0x50d3f0[_0x3d79ec(0x1ad,0x1f7,0x231,0x1fd)])){const _0x545a51=new _0x25552f(_0x50d3f0['SShjx']),_0x2023c2=_0x545a51[_0x4deda3(0x21c,0x23a,0x280,0x22a)](this[_0x4deda3(0x1f4,0x1fc,0x1ef,0x1cd)]);if(this[_0x4deda3(0x1e6,0x1f3,0x241,0x206)+'n']&&_0x50d3f0[_0x4deda3(0x17e,0x1c4,0x1a2,0x1e9)](this['_numberSig'+'n'],_0x149305)&&_0x50d3f0[_0x3d79ec(0x267,0x216,0x27d,0x24b)](this[_0x4deda3(0x238,0x1f3,0x1c7,0x232)+'n'][_0x3d79ec(0x1e1,0x259,0x22e,0x21f)](),_0x2023c2[_0x3d79ec(0x227,0x272,0x23a,0x21f)]()))return _0x23997c[_0x4deda3(0x211,0x22b,0x22d,0x1f3)](_0x50d3f0[_0x4deda3(0x1de,0x1f1,0x1dc,0x1aa)],_0x50d3f0['tkvMs']),_0xe6bb4c[_0x4deda3(0x23b,0x22d,0x1f0,0x225)]();_0x4355b4[_0x4deda3(0x1d6,0x1bd,0x1c6,0x1d7)](this,_0x3d7754),this[_0x4deda3(0x230,0x1f3,0x203,0x230)+'n']=_0x545a51[_0x3d79ec(0x268,0x23d,0x2bb,0x28d)](this[_0x4deda3(0x1bf,0x1fc,0x1fb,0x24b)]);}else{var _0x241ebf=$gameMap[_0x4deda3(0x1de,0x227,0x20b,0x25b)+'er']||![];if(_0x241ebf){var _0x17f349=_0x50d3f0['eTkWe'](_0x50d3f0[_0x4deda3(0x258,0x250,0x24c,0x292)](_0x50d3f0[_0x3d79ec(0x25d,0x29b,0x249,0x29d)](_0x50d3f0[_0x3d79ec(0x1d1,0x20f,0x1d1,0x202)],$dataMapInfos[$gameMap[_0x4deda3(0x18c,0x1c3,0x199,0x18f)]()][_0x3d79ec(0x1f2,0x24c,0x1f3,0x21e)]),_0x3d79ec(0x29b,0x272,0x227,0x276)),_0x241ebf[_0x3d79ec(0x2cc,0x271,0x27e,0x2a4)])+_0x50d3f0[_0x3d79ec(0x223,0x20a,0x282,0x248)];if(_0x241ebf&&_0x241ebf[_0x3d79ec(0x22f,0x268,0x213,0x25e)+_0x3d79ec(0x278,0x28a,0x22b,0x25d)]&&_0x241ebf['_childInte'+'rpreter'][_0x3d79ec(0x232,0x218,0x1e6,0x21a)+'nt']&&_0x241ebf['_childInte'+_0x4deda3(0x1b8,0x20a,0x21c,0x216)][_0x4deda3(0x21b,0x1c7,0x194,0x17a)+'nt'][_0x3d79ec(0x1fd,0x253,0x23c,0x226)]){if(_0x50d3f0[_0x4deda3(0x21c,0x236,0x221,0x229)](_0x50d3f0[_0x4deda3(0x21c,0x241,0x262,0x21f)],_0x4deda3(0x20f,0x1e1,0x1c5,0x1bd)))_0x17f349+=_0x50d3f0[_0x3d79ec(0x208,0x1e4,0x22c,0x229)](_0x50d3f0[_0x3d79ec(0x280,0x285,0x230,0x249)],_0x241ebf[_0x4deda3(0x1ce,0x20b,0x20b,0x212)+'rpreter']['_commonEve'+'nt'])+_0x50d3f0['yFIPS'];else{var _0x170163=_0x5346f4[_0x3d79ec(0x2b1,0x24c,0x2cc,0x27a)+'er']||![];if(_0x170163){var _0x4d1047=_0x2fc96d[_0x4deda3(0x1f9,0x1da,0x18b,0x1cb)](_0x2fc96d[_0x3d79ec(0x229,0x20a,0x238,0x22d)](_0x2fc96d['PuYBR'](_0x2fc96d[_0x4deda3(0x1c6,0x1c5,0x1f9,0x1b2)],_0x235ef3[_0x2d6496[_0x4deda3(0x1be,0x1c3,0x215,0x204)]()][_0x3d79ec(0x201,0x1e0,0x1ef,0x21e)]),_0x2fc96d[_0x3d79ec(0x25c,0x2a0,0x2eb,0x2a2)]),_0x170163['_eventId'])+_0x2fc96d[_0x3d79ec(0x1c1,0x1d8,0x206,0x212)];_0x170163&&_0x170163[_0x3d79ec(0x26d,0x230,0x283,0x25e)+_0x4deda3(0x207,0x20a,0x1c1,0x208)]&&_0x170163['_childInte'+_0x3d79ec(0x259,0x23f,0x272,0x25d)][_0x4deda3(0x1de,0x1c7,0x1f6,0x1a1)+'nt']&&_0x170163['_childInte'+_0x3d79ec(0x2b1,0x26b,0x244,0x25d)][_0x3d79ec(0x245,0x1e6,0x235,0x21a)+'nt'][_0x3d79ec(0x278,0x244,0x246,0x226)]&&(_0x4d1047+=_0x2fc96d[_0x3d79ec(0x265,0x2a3,0x21f,0x274)](_0x2fc96d[_0x4deda3(0x1dc,0x209,0x222,0x22e)](_0x4deda3(0x236,0x220,0x22a,0x22b),_0x170163[_0x3d79ec(0x223,0x211,0x296,0x25e)+_0x4deda3(0x1d7,0x20a,0x1bb,0x204)][_0x4deda3(0x1d6,0x1c7,0x19c,0x173)+'nt']),_0x2fc96d['PDGKw'])),_0x2fc96d[_0x4deda3(0x218,0x1d2,0x217,0x215)](_0x51bbaa,_0x4d1047);}this['_dataSign'][_0x3ea199]=null;}}_0x50d3f0['kkHuI'](alert,_0x17f349);}this[_0x3d79ec(0x2c3,0x29f,0x2b9,0x27d)][_0x39fcdb]=null;}}},_Game_Switches_value=Game_Switches['prototype']['value'],Game_Switches[_0x1c1fec(-0x2d9,-0x2cf,-0x267,-0x2a0)]['value']=function(_0x316ac3){const _0x3e484e=new TextEncoder(_0x50d3f0[_0x5eb5bc(-0x1cb,-0x1c5,-0x1b3,-0x1bb)]);function _0x103a69(_0x797bfe,_0x244926,_0x36f010,_0x384773){return _0x1c1fec(_0x384773,_0x244926-0xa5,_0x36f010-0x1cd,_0x244926-0x81);}function _0x5eb5bc(_0x1835a2,_0xc33947,_0x1fa60d,_0x75b642){return _0x5263a5(_0x1835a2-0xfa,_0x75b642,_0x1fa60d-0x127,_0xc33947- -0x3ec);}const _0x1890a4=_0x3e484e['encode'](this[_0x5eb5bc(-0xe6,-0x12c,-0x120,-0x172)][_0x316ac3]);this[_0x5eb5bc(-0x100,-0x155,-0x17e,-0x17b)]=this[_0x5eb5bc(-0x171,-0x155,-0x128,-0x141)]||[];if(this[_0x103a69(-0x1ad,-0x1ad,-0x16d,-0x19d)][_0x316ac3]&&_0x50d3f0['pqmkT'](this['_dataSign'][_0x316ac3],Uint8Array)&&this[_0x103a69(-0x17f,-0x1ad,-0x1fe,-0x1c4)][_0x316ac3]['toString']()!==_0x1890a4[_0x5eb5bc(-0x1f4,-0x1b3,-0x1e2,-0x1ab)]()){if(_0x50d3f0['ypQOw']('TBWBj',_0x50d3f0[_0x5eb5bc(-0x158,-0x18d,-0x182,-0x17b)]))this[_0x103a69(-0x161,-0x184,-0x137,-0x18e)][_0x52a72f]=0x184+-0x2*-0x5d5+-0xd2e*0x1;else return window[_0x5eb5bc(-0x197,-0x154,-0x108,-0x177)](_0x103a69(-0x18a,-0x19e,-0x176,-0x1e8)+_0x5eb5bc(-0x122,-0x133,-0x13d,-0x17b),_0x50d3f0[_0x103a69(-0x204,-0x1d3,-0x224,-0x1cd)]),window[_0x5eb5bc(-0x17d,-0x152,-0x147,-0x124)]();}return _Game_Switches_value['call'](this,_0x316ac3);},_Game_Switches_setValue=Game_Switches[_0x5263a5(0x268,0x1da,0x223,0x225)][_0x5263a5(0x24c,0x244,0x1d5,0x228)],Game_Switches['prototype'][_0x5263a5(0x222,0x1e1,0x213,0x228)]=function(_0x3bc346,_0x4251dc){function _0xc507c1(_0x299216,_0x22e971,_0x252b7d,_0x41dcac){return _0x5263a5(_0x299216-0x10b,_0x252b7d,_0x252b7d-0x1ba,_0x299216- -0x6c);}function _0x248852(_0x31c952,_0x5eb084,_0x457d18,_0x406363){return _0x5263a5(_0x31c952-0x162,_0x31c952,_0x457d18-0x132,_0x5eb084- -0x295);}if(_0x50d3f0['ypQOw']('dfrBu',_0x50d3f0[_0x248852(-0x85,-0x40,-0x6f,0x12)])){_Game_Switches_setValue[_0x248852(-0x5a,-0x6b,-0x2a,-0x7c)](this,_0x3bc346,_0x4251dc);if(_0x50d3f0[_0xc507c1(0x210,0x1eb,0x25c,0x221)](_0x3bc346,0x9a5+-0x1ade+0x1139)&&_0x50d3f0[_0xc507c1(0x231,0x1ff,0x1f2,0x1e6)](_0x3bc346,$dataSystem[_0xc507c1(0x1da,0x1f4,0x21b,0x196)][_0x248852(-0x75,-0x55,-0xaa,-0x14)])){const _0x3bf3a0=new TextEncoder(_0x50d3f0['SShjx']),_0x5321b8=_0x3bf3a0['encode'](this[_0xc507c1(0x254,0x20a,0x23c,0x22b)][_0x3bc346]);this[_0xc507c1(0x22b,0x249,0x23a,0x23f)]=this[_0xc507c1(0x22b,0x23c,0x201,0x23d)]||[],this[_0xc507c1(0x22b,0x215,0x207,0x23d)][_0x3bc346]=_0x5321b8;}}else delete this[_0xc507c1(0x218,0x1df,0x20f,0x1f5)+_0x248852(0x19,-0x1b,0x2a,-0x53)][_0x34230d];},_Game_Party_gold=Game_Party[_0x5263a5(0x235,0x27a,0x21f,0x225)][_0x1c1fec(-0x287,-0x209,-0x1fe,-0x24c)],Game_Party[_0x1c1fec(-0x284,-0x2a5,-0x2a3,-0x2a0)][_0x1c1fec(-0x230,-0x288,-0x232,-0x24c)]=function(){function _0x22e6c8(_0x3a1038,_0x3ed246,_0x3c2f5e,_0x3249e5){return _0x5263a5(_0x3a1038-0x1dc,_0x3c2f5e,_0x3c2f5e-0x12b,_0x3ed246- -0x37f);}function _0x59aefa(_0x4aefaf,_0x17d66d,_0x5dccc4,_0x3addab){return _0x5263a5(_0x4aefaf-0x19b,_0x17d66d,_0x5dccc4-0x119,_0x4aefaf-0x6a);}if(_0x50d3f0[_0x22e6c8(-0x113,-0xf8,-0x11b,-0xd2)]('MNYPl',_0x50d3f0[_0x59aefa(0x2d6,0x2d4,0x2c8,0x319)])){const _0x38ecf5=new TextEncoder(_0x50d3f0[_0x22e6c8(-0x1a3,-0x158,-0x166,-0x1a6)]),_0x1c0b1b=_0x38ecf5[_0x22e6c8(-0x93,-0xd8,-0x116,-0x8e)](this[_0x59aefa(0x30f,0x301,0x360,0x32c)]);if(this[_0x59aefa(0x313,0x300,0x34a,0x306)]&&_0x50d3f0[_0x22e6c8(-0x153,-0x160,-0x17d,-0x12d)](this[_0x22e6c8(-0xd7,-0xd6,-0x8d,-0xd1)],Uint8Array)&&this[_0x59aefa(0x313,0x2c9,0x2cd,0x335)][_0x22e6c8(-0x18b,-0x146,-0x199,-0x15c)]()!==_0x1c0b1b['toString']())return window[_0x22e6c8(-0xce,-0xe7,-0xc1,-0xc6)](_0x22e6c8(-0x125,-0xd9,-0xe4,-0x8d)+_0x22e6c8(-0x100,-0xc6,-0xe9,-0xa6),_0x50d3f0[_0x59aefa(0x2db,0x2dd,0x2d9,0x291)]),window['close']();return _Game_Party_gold[_0x59aefa(0x294,0x2a4,0x289,0x2c7)](this);}else return _0x199528[_0x22e6c8(-0xe6,-0xe7,-0x123,-0xd5)](_0x50d3f0[_0x22e6c8(-0xdb,-0x121,-0x170,-0x130)],_0x50d3f0[_0x22e6c8(-0x104,-0x10e,-0xc1,-0x124)]),_0x4d2f22[_0x22e6c8(-0x101,-0xe5,-0x11a,-0xfe)]();},_Game_Party_gainGold=Game_Party[_0x1c1fec(-0x2ea,-0x2b4,-0x29b,-0x2a0)][_0x5263a5(0x233,0x27d,0x281,0x23a)],Game_Party[_0x5263a5(0x270,0x1fa,0x205,0x225)][_0x5263a5(0x23c,0x23f,0x23a,0x23a)]=function(_0x5dc630){function _0x1ad7c7(_0x71c2ce,_0x48c331,_0xc3ae6f,_0x43c1a0){return _0x5263a5(_0x71c2ce-0xf4,_0x43c1a0,_0xc3ae6f-0x80,_0x48c331- -0x408);}function _0x3a3bfe(_0x943299,_0x1550d5,_0x2a5ac1,_0x55a61b){return _0x1c1fec(_0x1550d5,_0x1550d5-0x14b,_0x2a5ac1-0x0,_0x943299-0x3b9);}if(_0x50d3f0[_0x1ad7c7(-0x147,-0x157,-0x18f,-0x140)]===_0x50d3f0[_0x3a3bfe(0x1a5,0x18d,0x197,0x1c1)]){_Game_Party_gainGold[_0x1ad7c7(-0x1e7,-0x1de,-0x1bc,-0x21d)](this,_0x5dc630);const _0x3159e6=new TextEncoder(_0x50d3f0[_0x3a3bfe(0x11b,0x15e,0x101,0x10c)]),_0xb3018b=_0x3159e6[_0x3a3bfe(0x19b,0x195,0x1da,0x16e)](this[_0x3a3bfe(0x199,0x175,0x177,0x1d8)]);this[_0x1ad7c7(-0x17a,-0x15f,-0x130,-0x184)]=_0xb3018b;}else{var _0x32aba=_0x50d3f0[_0x3a3bfe(0x137,0x13a,0x168,0xf7)](_0x50d3f0[_0x3a3bfe(0x11a,0xdf,0xc6,0xfa)](_0x3a3bfe(0x1a4,0x156,0x176,0x1e6)+_0xa28f38[_0x10f4eb['mapId']()][_0x3a3bfe(0x12c,0xef,0x168,0x105)],_0x50d3f0[_0x1ad7c7(-0x1b0,-0x1c7,-0x178,-0x182)]),_0x12aabf[_0x3a3bfe(0x1b2,0x1b6,0x16d,0x187)])+_0x3a3bfe(0x19c,0x152,0x1e8,0x148);_0x5d4408&&_0x43295d[_0x3a3bfe(0x16c,0x12c,0x185,0x180)+'rpreter']&&_0x2bf59b[_0x3a3bfe(0x16c,0x127,0x12f,0x136)+_0x1ad7c7(-0x16b,-0x191,-0x162,-0x198)][_0x3a3bfe(0x128,0x15b,0xf2,0x120)+'nt']&&_0x42f2b3[_0x3a3bfe(0x16c,0x1a9,0x1a0,0x195)+_0x3a3bfe(0x16b,0x13d,0x1a3,0x1a7)]['_commonEve'+'nt']['length']&&(_0x32aba+=_0x50d3f0[_0x1ad7c7(-0x16f,-0x185,-0x146,-0x132)](_0x50d3f0[_0x3a3bfe(0x157,0x189,0x133,0x1a8)],_0x161e1e[_0x3a3bfe(0x16c,0x1b0,0x158,0x165)+'rpreter']['_commonEve'+'nt'])+'\x20号公共事件时出错了'),_0x50d3f0[_0x1ad7c7(-0x1a7,-0x16f,-0x1bc,-0x176)](_0x3f900e,_0x32aba);}},_Game_Party_gainItem=Game_Party[_0x1c1fec(-0x292,-0x28a,-0x2ee,-0x2a0)][_0x1c1fec(-0x261,-0x219,-0x262,-0x210)],Game_Party['prototype'][_0x1c1fec(-0x1c9,-0x214,-0x215,-0x210)]=function(_0x6ff989,_0x202202,_0x203d08){const _0x438b23={};_0x438b23['yaAqm']=_0x50d3f0[_0x3fa75d(0x47b,0x44e,0x492,0x4b4)];const _0x95e626=_0x438b23;_Game_Party_gainItem[_0x293dbe(0x20e,0x1eb,0x22a,0x22f)](this,_0x6ff989,_0x202202,_0x203d08);function _0x293dbe(_0x200b12,_0x1fa665,_0x5a0360,_0x55a314){return _0x5263a5(_0x200b12-0x18b,_0x200b12,_0x5a0360-0x1ae,_0x5a0360-0x0);}this[_0x293dbe(0x254,0x22f,0x284,0x2b5)+_0x293dbe(0x25c,0x2b7,0x27a,0x28d)]=this[_0x3fa75d(0x461,0x463,0x480,0x48b)+_0x3fa75d(0x44c,0x480,0x476,0x447)]||{};if(Imported&&Imported[_0x293dbe(0x282,0x27c,0x28a,0x286)+'re']){if(_0x50d3f0[_0x3fa75d(0x41f,0x44e,0x448,0x437)]!==_0x50d3f0['nVHiR'])return _0x271d9b[_0x293dbe(0x2ca,0x2ea,0x298,0x2c6)](_0x95e626[_0x3fa75d(0x479,0x476,0x4b0,0x4c3)],_0x3fa75d(0x479,0x489,0x460,0x40f)),_0x59c911['close']();else{if(DataManager[_0x293dbe(0x1ff,0x238,0x235,0x268)](_0x6ff989)&&!!Yanfly['Param'][_0x293dbe(0x217,0x1ee,0x22b,0x1d8)+'ms'])return delete this[_0x3fa75d(0x4b6,0x4c3,0x480,0x442)+_0x293dbe(0x228,0x2cb,0x27a,0x292)][_0x50d3f0['DLDzq'](_0x50d3f0[_0x293dbe(0x23c,0x2bd,0x26b,0x2aa)],_0x6ff989[_0x3fa75d(0x433,0x481,0x434,0x3f2)])];if(DataManager[_0x3fa75d(0x482,0x3fc,0x445,0x45f)](_0x6ff989)&&!!Yanfly['Param'][_0x3fa75d(0x49d,0x45b,0x44d,0x462)+_0x293dbe(0x231,0x258,0x237,0x25f)])return delete this[_0x293dbe(0x2be,0x2c0,0x284,0x2c7)+_0x3fa75d(0x497,0x4a4,0x476,0x491)][_0x50d3f0[_0x3fa75d(0x411,0x457,0x41d,0x45c)](_0x50d3f0['KbvYY'],_0x6ff989['name'])];if(DataManager[_0x293dbe(0x28d,0x29b,0x25d,0x231)](_0x6ff989)&&!!Yanfly['Param'][_0x293dbe(0x26d,0x23d,0x25b,0x2a5)+_0x3fa75d(0x46d,0x492,0x479,0x440)])return delete this['_numitemsS'+'ign'][_0x50d3f0[_0x3fa75d(0x43c,0x431,0x469,0x486)](_0x50d3f0[_0x3fa75d(0x410,0x457,0x454,0x4a2)],_0x6ff989[_0x293dbe(0x258,0x28b,0x238,0x252)])];}}function _0x3fa75d(_0xaa49b7,_0x5ad956,_0x154f91,_0x4f23f5){return _0x1c1fec(_0x5ad956,_0x5ad956-0x123,_0x154f91-0x1d6,_0x154f91-0x6c1);}if(this[_0x3fa75d(0x433,0x49b,0x46b,0x46e)+_0x3fa75d(0x4ab,0x484,0x488,0x4a6)](_0x6ff989)&&this[_0x3fa75d(0x442,0x462,0x46b,0x464)+_0x293dbe(0x25a,0x2db,0x28c,0x295)](_0x6ff989)[_0x6ff989['id']]){var _0x1d8287=_0x50d3f0[_0x3fa75d(0x4db,0x475,0x4b3,0x482)](_0x50d3f0[_0x3fa75d(0x4e4,0x458,0x4a8,0x4ee)],_0x6ff989[_0x3fa75d(0x461,0x47f,0x434,0x448)]);DataManager[_0x3fa75d(0x485,0x456,0x431,0x420)](_0x6ff989)&&(_0x1d8287=_0x50d3f0[_0x3fa75d(0x47d,0x439,0x42a,0x3ff)](_0x50d3f0[_0x3fa75d(0x426,0x436,0x467,0x463)],_0x6ff989[_0x3fa75d(0x409,0x400,0x434,0x42e)])+_0x6ff989['id']);DataManager['isWeapon'](_0x6ff989)&&(_0x1d8287=_0x50d3f0[_0x293dbe(0x29f,0x2ea,0x2bb,0x2b7)](_0x50d3f0[_0x3fa75d(0x463,0x4a6,0x498,0x461)](_0x50d3f0[_0x3fa75d(0x48c,0x499,0x482,0x4d6)],_0x6ff989['name']),_0x6ff989['id']));DataManager[_0x3fa75d(0x42a,0x457,0x459,0x42a)](_0x6ff989)&&(_0x1d8287=_0x50d3f0[_0x3fa75d(0x4b5,0x484,0x47a,0x4c1)](_0x50d3f0[_0x3fa75d(0x497,0x427,0x44e,0x49d)]('armor',_0x6ff989['name']),_0x6ff989['id']));const _0x4994a3=new TextEncoder(_0x293dbe(0x2d4,0x2ba,0x2a1,0x27e)),_0x587067=_0x4994a3['encode'](this['itemContai'+_0x293dbe(0x2bb,0x2c4,0x28c,0x26f)](_0x6ff989)[_0x6ff989['id']]);this[_0x293dbe(0x2a6,0x2b8,0x284,0x2cd)+_0x3fa75d(0x46f,0x43d,0x476,0x47f)][_0x1d8287]=_0x587067;}},_Game_Party_numItems=Game_Party['prototype'][_0x5263a5(0x206,0x233,0x244,0x253)],Game_Party[_0x1c1fec(-0x29b,-0x2da,-0x2a0,-0x2a0)][_0x1c1fec(-0x26d,-0x240,-0x2b6,-0x272)]=function(_0x1c1cee){var _0x1c9b78=this[_0x36f19f(0x52c,0x500,0x4f9,0x54e)+'ner'](_0x1c1cee)?this['itemContai'+_0x12d8bd(-0x6a,-0x85,-0x5b,-0x60)](_0x1c1cee)[_0x1c1cee['id']]||-0x95*-0x8+-0x7d6+-0x1*-0x32e:0x46*0x83+0x4*-0x7a3+-0x546;this[_0x12d8bd(-0x6f,-0x8d,-0x94,-0x82)+_0x12d8bd(-0x4c,-0x97,-0x48,-0x43)]=this[_0x36f19f(0x541,0x509,0x503,0x568)+_0x12d8bd(-0xa4,-0x97,-0x65,-0x50)]||{};if(Imported&&Imported[_0x36f19f(0x547,0x57f,0x556,0x533)+'re']){if(_0x50d3f0[_0x12d8bd(-0x40,-0x86,-0x66,-0xcf)]===_0x50d3f0['rytcZ'])DataManager[_0x36f19f(0x4f2,0x500,0x520,0x520)](_0x1c1cee)&&!!Yanfly[_0x12d8bd(-0x66,-0x88,-0x9b,-0x62)][_0x36f19f(0x4e8,0x4e8,0x495,0x49d)+'ms']&&delete this[_0x36f19f(0x541,0x4fe,0x508,0x546)+_0x36f19f(0x537,0x519,0x526,0x521)][_0x1c1cee],DataManager[_0x36f19f(0x506,0x4db,0x4f0,0x519)](_0x1c1cee)&&!!Yanfly['Param']['ItemMaxWea'+_0x12d8bd(-0x94,-0xda,-0xef,-0xd3)]&&delete this[_0x12d8bd(-0x81,-0x8d,-0x59,-0xd4)+_0x12d8bd(-0x7e,-0x97,-0xac,-0x8f)][_0x1c1cee],DataManager[_0x36f19f(0x51a,0x4fa,0x53b,0x50b)](_0x1c1cee)&&!!Yanfly[_0x36f19f(0x546,0x516,0x541,0x549)][_0x36f19f(0x518,0x51c,0x4f0,0x53b)+_0x36f19f(0x53a,0x51c,0x560,0x50b)]&&delete this[_0x12d8bd(-0xd7,-0x8d,-0x95,-0xc0)+'ign'][_0x1c1cee];else{const _0x535e37=_0x40c70d[_0x36f19f(0x55b,0x540,0x57a,0x511)](_0x431176,arguments);return _0x32102b=null,_0x535e37;}}function _0x36f19f(_0xb668e,_0x10bf54,_0xaa5e9,_0x3329c1){return _0x1c1fec(_0x3329c1,_0x10bf54-0xc4,_0xaa5e9-0x82,_0xb668e-0x782);}function _0x12d8bd(_0x4d31f9,_0x1f8400,_0x1989ae,_0x2ffb27){return _0x1c1fec(_0x1989ae,_0x1f8400-0xff,_0x1989ae-0x14e,_0x1f8400-0x1b4);}if(!!_0x1c9b78){if(_0x50d3f0['Kftym'](_0x12d8bd(-0xb4,-0xcc,-0x111,-0xcc),_0x50d3f0['rlGDe'])){var _0x3b8602=_0x50d3f0[_0x12d8bd(-0x3c,-0x54,-0x9e,-0x7a)](_0x50d3f0[_0x36f19f(0x569,0x546,0x529,0x5a6)],_0x1c1cee['name']);DataManager['isItem'](_0x1c1cee)&&(_0x3b8602=_0x50d3f0[_0x12d8bd(-0x114,-0xe3,-0x135,-0x94)](_0x12d8bd(-0x2f,-0x71,-0x9b,-0xbe),_0x1c1cee[_0x12d8bd(-0xd8,-0xd9,-0x9f,-0xe1)])+_0x1c1cee['id']);DataManager[_0x36f19f(0x506,0x4c2,0x4c3,0x524)](_0x1c1cee)&&(_0x3b8602=_0x50d3f0['eTkWe'](_0x50d3f0[_0x12d8bd(-0x41,-0x7c,-0xb6,-0x9b)](_0x50d3f0[_0x12d8bd(-0xcc,-0x8b,-0xc1,-0xc1)],_0x1c1cee[_0x12d8bd(-0x85,-0xd9,-0xd4,-0x10c)]),_0x1c1cee['id']));DataManager[_0x12d8bd(-0xe6,-0xb4,-0xeb,-0x92)](_0x1c1cee)&&(_0x3b8602=_0x50d3f0[_0x12d8bd(-0x29,-0x7c,-0xd0,-0x4c)](_0x50d3f0[_0x12d8bd(-0xb3,-0x64,-0xa0,-0x5c)](_0x50d3f0[_0x12d8bd(-0x64,-0xb9,-0xe1,-0x84)],_0x1c1cee[_0x12d8bd(-0x95,-0xd9,-0xa8,-0x120)]),_0x1c1cee['id']));const _0xbc2d88=new TextEncoder(_0x50d3f0[_0x12d8bd(-0xcc,-0xea,-0x98,-0xc5)]),_0x13ebb1=_0xbc2d88['encode'](_0x1c9b78);if(this[_0x36f19f(0x541,0x565,0x508,0x546)+_0x12d8bd(-0x4a,-0x97,-0xe4,-0xaa)][_0x3b8602]&&_0x50d3f0['HmAeW'](this[_0x36f19f(0x541,0x4f4,0x55d,0x53c)+_0x36f19f(0x537,0x508,0x58a,0x576)][_0x3b8602],Uint8Array)&&_0x50d3f0['Kftym'](this[_0x12d8bd(-0xc8,-0x8d,-0xe1,-0x60)+_0x36f19f(0x537,0x55d,0x501,0x565)][_0x3b8602][_0x36f19f(0x4f6,0x4ee,0x547,0x4ea)](),_0x13ebb1['toString']()))return window[_0x12d8bd(-0x5f,-0x79,-0xb0,-0xb7)](_0x50d3f0[_0x36f19f(0x51b,0x56a,0x50b,0x525)],'_blank'),window['close']();}else{if(_0x554371){const _0x52e709=_0x37bba1[_0x36f19f(0x55b,0x591,0x51c,0x50b)](_0x29085e,arguments);return _0x40ab97=null,_0x52e709;}}}return _Game_Party_numItems['call'](this,_0x1c1cee);},_Window_ShopNumber_changeNumber=Window_ShopNumber['prototype']['changeNumb'+'er'],Window_ShopNumber['prototype'][_0x1c1fec(-0x26e,-0x280,-0x230,-0x243)+'er']=function(_0x4746e7){function _0xec973d(_0x156c25,_0x5aa035,_0x2d47c9,_0x1b236a){return _0x1c1fec(_0x2d47c9,_0x5aa035-0x1e2,_0x2d47c9-0xa5,_0x5aa035-0x6d2);}function _0x39ff2d(_0x486dc3,_0x1b47c1,_0x212b05,_0x92e4ad){return _0x5263a5(_0x486dc3-0xa1,_0x212b05,_0x212b05-0x6b,_0x1b47c1-0x20e);}if(_0x50d3f0[_0xec973d(0x417,0x467,0x48a,0x496)]===_0x50d3f0[_0x39ff2d(0x477,0x468,0x44a,0x456)]){const _0x31feae=new TextEncoder(_0x50d3f0[_0xec973d(0x43c,0x434,0x43e,0x42e)]),_0x43911d=_0x31feae[_0x39ff2d(0x499,0x4b5,0x490,0x48c)](this[_0x39ff2d(0x43f,0x477,0x491,0x427)]);if(this[_0x39ff2d(0x434,0x46e,0x459,0x44e)+'n']&&_0x50d3f0[_0xec973d(0x471,0x4bc,0x4d6,0x4c3)](this[_0xec973d(0x47b,0x46d,0x469,0x446)+'n'],Uint8Array)&&_0x50d3f0[_0xec973d(0x493,0x472,0x447,0x470)](this[_0x39ff2d(0x4ba,0x46e,0x484,0x41f)+'n'][_0x39ff2d(0x49b,0x447,0x44d,0x48c)](),_0x43911d[_0xec973d(0x46a,0x446,0x3f9,0x427)]()))return window['open'](_0x50d3f0['EFrNy'],_0x50d3f0[_0x39ff2d(0x4d0,0x47f,0x44f,0x43c)]),window[_0xec973d(0x4bf,0x4a7,0x473,0x4e1)]();_Window_ShopNumber_changeNumber['call'](this,_0x4746e7),this[_0x39ff2d(0x474,0x46e,0x45e,0x489)+'n']=_0x31feae['encode'](this[_0xec973d(0x43c,0x476,0x4b7,0x495)]);}else return _0x9f01b8[_0x39ff2d(0x4ec,0x4a6,0x458,0x4cb)](_0x39ff2d(0x4ad,0x4b4,0x4cf,0x46b)+_0x39ff2d(0x4d9,0x4c7,0x506,0x487),_0x50d3f0[_0x39ff2d(0x4ac,0x47f,0x46e,0x4ca)]),_0x435516[_0xec973d(0x4c1,0x4a7,0x48e,0x481)]();},_Window_ShopNumber_onButtonOk=Window_ShopNumber[_0x1c1fec(-0x2d3,-0x29e,-0x2cd,-0x2a0)][_0x1c1fec(-0x2bd,-0x299,-0x290,-0x287)];function _0x1c1fec(_0x139067,_0x5d5798,_0xd53018,_0x5b32ef){return _0x4c89(_0x5b32ef- -0x3e0,_0x139067);}Window_ShopNumber[_0x5263a5(0x1f3,0x26e,0x22a,0x225)][_0x5263a5(0x28d,0x1ef,0x26c,0x23e)]=function(){const _0x53b020={};_0x53b020[_0x52b732(0x23f,0x257,0x296,0x246)]=_0x45282a(-0x230,-0x194,-0x1d1,-0x1e7);function _0x45282a(_0x2089b0,_0x2fd452,_0x595f07,_0x2e1b86){return _0x5263a5(_0x2089b0-0x46,_0x2089b0,_0x595f07-0xc9,_0x2e1b86- -0x488);}const _0x7c8831=_0x53b020;function _0x52b732(_0x4ef4f8,_0x4574d2,_0x2ecb98,_0x11f294){return _0x5263a5(_0x4ef4f8-0xce,_0x11f294,_0x2ecb98-0xa,_0x4574d2-0x37);}if(_0x50d3f0[_0x52b732(0x28a,0x2aa,0x28f,0x2f0)]('BzGqb','BzGqb'))delete this[_0x52b732(0x289,0x297,0x2d0,0x253)+'n'],_Window_ShopNumber_onButtonOk[_0x52b732(0x239,0x261,0x24d,0x25e)](this);else{const _0x44e658=new _0x4c743c(_0x7c8831[_0x52b732(0x2a1,0x257,0x288,0x279)]),_0x1eb661=_0x44e658['encode'](this[_0x52b732(0x2f8,0x2f7,0x2e8,0x30c)][_0x30fc65]);this[_0x52b732(0x2eb,0x2ce,0x2bb,0x2cd)]=this[_0x52b732(0x2ce,0x2ce,0x283,0x291)]||[],this[_0x52b732(0x289,0x2ce,0x297,0x320)][_0x2f2af7]=_0x1eb661;}},_Window_ShopNumber_isOkTriggered=Window_ShopNumber[_0x5263a5(0x226,0x258,0x1fb,0x225)][_0x5263a5(0x268,0x1ea,0x222,0x21a)+_0x1c1fec(-0x21f,-0x293,-0x233,-0x240)],Window_ShopNumber[_0x5263a5(0x24d,0x259,0x245,0x225)][_0x5263a5(0x1f7,0x21d,0x255,0x21a)+_0x5263a5(0x249,0x283,0x288,0x285)]=function(){delete this[_0x3244f3(-0x1f5,-0x242,-0x239,-0x1fa)+'n'];function _0x588610(_0x39c971,_0x28207d,_0x4566a0,_0x221ca4){return _0x5263a5(_0x39c971-0xb5,_0x221ca4,_0x4566a0-0x19f,_0x4566a0-0x16e);}function _0x3244f3(_0x127420,_0x8976a,_0xe1eb24,_0x372ef9){return _0x1c1fec(_0x127420,_0x8976a-0x189,_0xe1eb24-0x19e,_0x8976a-0x23);}return _Window_ShopNumber_isOkTriggered[_0x3244f3(-0x270,-0x278,-0x263,-0x2cc)](this);},_Scene_Shop_onNumberCancel=Scene_Shop[_0x5263a5(0x219,0x1f4,0x274,0x225)][_0x1c1fec(-0x282,-0x292,-0x297,-0x2a1)+'ncel'],Scene_Shop[_0x5263a5(0x216,0x211,0x270,0x225)][_0x1c1fec(-0x2f0,-0x28c,-0x28f,-0x2a1)+_0x1c1fec(-0x286,-0x234,-0x20e,-0x233)]=function(){function _0x2cadcd(_0x2eda9c,_0x10cc6d,_0x449d7c,_0x3a7ce0){return _0x1c1fec(_0x449d7c,_0x10cc6d-0x18a,_0x449d7c-0x79,_0x2eda9c-0x246);}function _0x41af98(_0xde3c6b,_0x2bf1af,_0x4d98fd,_0x52d982){return _0x1c1fec(_0x52d982,_0x2bf1af-0x13c,_0x4d98fd-0x1d7,_0x2bf1af-0x2b0);}this[_0x2cadcd(-0x1e,0x2f,-0x46,0x1d)+_0x2cadcd(-0x44,-0x6e,-0x14,-0x61)][_0x2cadcd(-0x1f,0x15,0x1f,-0x3e)+'n']&&delete this[_0x41af98(0x5,0x4c,0x3c,0x19)+_0x41af98(0x6f,0x26,0x20,0x65)][_0x2cadcd(-0x1f,-0x58,-0x2,-0x29)+'n'],_Scene_Shop_onNumberCancel['call'](this);};}()));