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

