/*:
* @plugindesc (v1.01)更改角色最高等级
* @author 小c
* @version 1.0.0
* @date 8/30/2020
*
* @param Max Level
* @text 最高等级上限
* @type number
* @min 0
* @default 99
* @desc 最高等级上限，更改等级上限不会超过此值
* 0 表示不存在上限 
* 
* @help
* 动态更改角色等级上限。
* 若等级上限会超越100级，请搭配YEP核心引擎使用。
*
* 注意：当角色等级大于等于最高等级时，其经验会被锁定在对应等级的初始
* 经验而不再增长。
* 举例：张三当前最高等级为8级，自身等级为10级，那么张三的经验值在执行
* 增长时将被锁定在10级的初始经验值。
* 
* 物品/技能标签
* <Change Max Level: x>
* 提高最高等级x级，若x<0表示降低。
*
* <Change Max Level Eval>
* //JavaScript code
* changeLevel = $gameParty.gold() / 1000 + item.id;
* </Change Max Level Eval>
* 脚本运算改变等级，changeLevel返回结果，item表示当前技能物品data对象。
* changeLevel>0表示提高最高等级，changeLevel<0表示降低。
*
* 插件指令
* ChangeMaxLevel actorId value
* 改变指定人物的等级上限value
* ChangeMaxLevel 1 +4 提高1号角色等级上限4级 其中的+可省略。
* ChangeMaxLevel 2 -1 降低2号角色等级上限1级。
*
* 更新日志
* v1.00
* 插件完成
*
* v1.01
* 限制角色达到最高等级后的经验增长
*/

var Imported = Imported || {};
Imported.CP_ChangeActorMaxLevel = true;

var params = PluginManager.parameters("CP_ChangeActorMaxLevel");
var CP = CP || {};
CP.MaxLevelManager = CP.MaxLevelManager || {};
CP.MaxLevelManager.MAX_LEVEL = Number(params["Max Level"]) || 0;

CP.MaxLevelManager.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!CP.MaxLevelManager.DATABASE_LOADED.call(this))
		return false;

	CP.MaxLevelManager.loadChangeMaxLevelData($dataSkills);
	CP.MaxLevelManager.loadChangeMaxLevelData($dataItems);

	return true;
};

CP.MaxLevelManager.loadChangeMaxLevelData = function(group){
	var reg = /<Change Max Level Eval>([\S\s]*)<\/Change Max Level Eval>/;
	for(var i = 1; i < group.length; i++){
		var item = group[i];
		item.changeMaxLevel = 0;
		item.changeMaxLevelEval = null;

		if(item.meta["Change Max Level"])
			item.changeMaxLevel = Number(item.meta["Change Max Level"]) || 0;

		if(reg.exec(item.note)){
			item.changeMaxLevelEval = RegExp.$1;
		}
	}
};

CP.MaxLevelManager.isItemForMaxLevelChanged = function(item){
	if(item.changeMaxLevel !== 0)
		return true;
	if(!!item.changeMaxLevelEval)
		return true;
	return false;
};

//----------------------------------
// Game_Actor
//----------------------------------
CP.MaxLevelManager.INIT_ACTOR = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function(actorId) {
	CP.MaxLevelManager.INIT_ACTOR.call(this, actorId);
	this.initMaxLevel();
};

CP.MaxLevelManager.ACTOR_MAX_LEVEL = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.initMaxLevel = function(){
	this.setMaxLevel(CP.MaxLevelManager.ACTOR_MAX_LEVEL.call(this));
};

Game_Actor.prototype.setMaxLevel = function(level){
	if(level < 1)
		level = 1;

	if(CP.MaxLevelManager.MAX_LEVEL > 0){
		if(level > CP.MaxLevelManager.MAX_LEVEL)
			level = CP.MaxLevelManager.MAX_LEVEL;
	}

	this._maxLevel = level;
};

Game_Actor.prototype.maxLevel = function() {
    if(this._maxLevel === undefined)
    	this.initMaxLevel();

    return this._maxLevel > 1 ? this._maxLevel : 1;
};

Game_Actor.prototype.changeMaxLevel = function(x){
	if(this._maxLevel === undefined)
    	this.initMaxLevel();
	this.setMaxLevel(this._maxLevel + x);
};

CP.MaxLevelManager.CHANGE_ACTOR_EXP = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show){
	CP.MaxLevelManager.CHANGE_ACTOR_EXP.call(this, exp, show);
	if(this.level >= this.maxLevel())
		CP.MaxLevelManager.CHANGE_ACTOR_EXP.call(this, this.currentLevelExp(), false);
};

//----------------------------------
// Game_Action
//----------------------------------
CP.MaxLevelManager.ACTION_HAS_ITEM_ANY_VALID_EFFECTS = Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
	if(CP.MaxLevelManager.ACTION_HAS_ITEM_ANY_VALID_EFFECTS.call(this, target))
		return true;

	return this.isItemForMaxLevelChanged();
};

CP.MaxLevelManager.APPLY_ACTION_USER_EFFECT = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target){
	CP.MaxLevelManager.APPLY_ACTION_USER_EFFECT.call(this, target);

	if(target.isActor() && this.isItemForMaxLevelChanged())
		this.applyChangeMaxLevel(target);
};

Game_Action.prototype.isItemForMaxLevelChanged = function(){
	if(!this.item())
		return false;

	return CP.MaxLevelManager.isItemForMaxLevelChanged(this.item());
};

Game_Action.prototype.applyChangeMaxLevel = function(target){
	var item = this.item();

	if(item.changeMaxLevel !== 0)
		this.executeChangeMaxLevelValue(target);
	else if(!!item.changeMaxLevelEval)
		this.executeChangeMaxLevelEval(target);
};

Game_Action.prototype.executeChangeMaxLevelEval = function(target){
	var item = this.item();
	var changeLevel = 0;

	try{
		eval(item.changeMaxLevelEval);
	}catch(err){
		console.error(err);
		changeLevel = 0;
	}

	target.changeMaxLevel(Math.round(changeLevel));
};

Game_Action.prototype.executeChangeMaxLevelValue = function(target){
	var item = this.item();
	var value = Math.round(item.changeMaxLevel);

	target.changeMaxLevel(value);
};

//----------------------------------
// Game_Interpreter
//----------------------------------
CP.MaxLevelManager.PLUGIN_COMMAND = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	CP.MaxLevelManager.PLUGIN_COMMAND.call(this, command, args);

	if(command =='ChangeMaxLevel'){
		var actorId = Number(args[0]) || 0;
		var actor = $gameActors.actor(actorId);
		var level = Number(args[1]) || 0;

		if(!!actor && level !== 0)
			actor.changeMaxLevel(level);
	}
};