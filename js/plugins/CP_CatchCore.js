/*:
 * @plugindesc (v1.03)捕捉核心
 * @author 小c
 * @version 1.0.3
 * @date 10/17/2020
 *
 * @param Can Gain Exp For Catch
 * @text 捕捉敌人产生经验
 * @type boolean
 * @on 产生经验
 * @off 没有经验
 * @desc 收化的敌人是否产生经验
 * @default true
 *
 * @param Catch Result Text
 * @text 默认捕捉提示文字
 * @type struct<resultText>
 * @default {"success":"捕捉成功！","failure":"捕捉失败！","forbidden":"敌人无法捕捉！"}
 *
 * @help
 * 敌人捕捉基础部分
 *
 * 捕捉状态定义
 * 状态标签
 * <Catch State>
 * 定义该状态为用于捕捉敌人的状态。
 * 即捕捉敌人时给敌人附加的即死状态。
 *
 * <Catch State Eval>
 * $gameParty.gainGold(state.id *5);
 * </Catch State Eval>
 * 捕捉成功之后的响应脚本
 * state为当前捕捉状态对象，this为被捕捉的敌人对象
 * 有此标签时状态默认为捕捉状态，不需配置<Catch State>
 *
 * 捕捉经验
 * 状态标签
 * <Catch Gain Exp: ON/OFF>
 * 被捕捉的敌人是否提供经验
 * 例：<Catch Gain Exp: ON>
 * 没有配置时以插件参数为准。
 *
 * 捕捉提示信息
 * 状态标签
 * <Catch Result Texts>
 * success: 终于抓到啦！
 * failure: 没抓到，害！
 * forbidden: 你不让抓？哼！
 * </Catch Result Texts>
 * 指定该状态捕捉成功（success）、捕捉失败（failure）、禁止捕捉（forbidden）
 * 的提示信息
 * 此处冒号为英文冒号。
 * 未配置的项目以插件参数为准
 *
 * 捕捉技能相关
 * 技能/物品标签
 * <Catch State x Chance: y%>
 * 此技能/物品使用x号捕捉状态，成功率y%，y为整数。
 * 例：<Catch State 6 Chance: 75%>
 * <Catch State 8 Chance Eval>
 * chance = 1  - target.hpRate();
 * if($gameParty.leader().level > target.catchLevel())
 * chance *= 2;
 * </Catch State 8 Chance Eval>
 * 指定捕捉状态【此例中为8号状态】并以脚本动态计算成功率
 *
 * 技能物品不需配置【添加状态】效果
 *
 * 捕捉等级（影响捕捉概率）
 * 敌人标签
 * <Catch Level: x> 指定敌人的捕捉等级
 * 捕捉等级仅仅是一个参照参数，与人物等级没有必然联系。
 * 通过敌人对象的enemy.catchLevel()得到它
 *
 * 捕捉条件
 * 禁止捕捉
 * 敌人标签
 * <Cannot Be Caught> 敌人禁止被任何捕捉技能捕捉
 * 若只让敌人不被某些捕捉状态捕捉，请配置状态免疫
 *
 * 捕捉条件的复写
 * 自定义捕捉条件请复写函数Game_Enemy.prototype.canBeCaughtPlus(stateId)
 * stateId为你所配置的捕捉状态id
 * 
 * 复写举例
 * CP.CatchGainItemManager.ENEMY_CAN_BE_CAUGHT_PLUS = 
 *      Game_Enemy.prototype.canBeCaughtPlus;
 * Game_Enemy.prototype.canBeCaughtPlus = function(stateId){
 *   if(CP.CatchGainItemManager.isCatchGainItemState(stateId)){
 *       if(this.hasCatchGainItem(stateId))
 *          return true;
 *       else
 *          return false;
 *   }else
 *       return CP.CatchGainItemManager.ENEMY_CAN_BE_CAUGHT_PLUS
 *          .call(this, stateId);
 * };
 * 一般规律为：
 * 判定是否为指定状态-判定条件-条件成立返回true，不满足返回false-不是指
 * 定状态直接回调
 *
 * 插件指令（只在战斗中生效）
 * EnemyCanCatch [index] [true/false]
 * 使第index个敌人允许/禁止被捕捉，index最小值为1
 * 例：EnemyCanCatch 1 false
 *
 * v1.00
 * 插件完成
 *
 * v1.01
 * 添加是否可以被捕捉的插件指令
 * 定义捕捉等级
 *
 * v1.02
 * 修复捕捉条件的错误问题
 * 追加复写捕捉条件的说明
 *
 * v1.03
 * 修复与部分状态插件的冲突问题
 */
/*~struct~resultText:
 * @param success
 * @text 捕捉成功提示
 * @default 捕捉成功！
 * @parent Object Selectors
 *
 * @param failure
 * @text 捕捉失败提示
 * @default 捕捉失败！
 * @parent Object Selectors
 *
 * @param forbidden
 * @text 禁止捕捉提示
 * @default 敌人无法捕捉！
 * @parent Object Selectors
 */

var Imported = Imported || {};
Imported.CP_CatchCore = true;

var params = PluginManager.parameters("CP_CatchCore");

var CP = CP || {};
CP.CatchManager = CP.CatchManager || {};
CP.CatchManager.GAIN_EXP_FOR_CATCH = eval(params["Can Gain Exp For Catch"]) || false;
CP.CatchManager.CATCH_REULT_TEXTS = JSON.parse(params["Catch Result Text"]);

CP.CatchManager._loaded = false;
CP.CatchManager.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!CP.CatchManager.DATABASE_LOADED.call(this))
		return false;

	if(!CP.CatchManager._loaded){
		CP.CatchManager.loadCatchStateData();
		CP.CatchManager.loadEnemyCatchData();
		CP.CatchManager.loadCatchResult();

		CP.CatchManager.loadCatchItemData($dataItems);
		CP.CatchManager.loadCatchItemData($dataSkills);

		CP.CatchManager._loaded = true;
	}

	return true;
};

CP.CatchManager.loadCatchStateData = function(){
	var reg = /<Catch State Eval>([\S\s]*)<\/Catch State Eval>/;
	for(var i = 1; i < $dataStates.length; i++){
		var state = $dataStates[i];
		state.catchState = false;
		state.catchStateEval = null;
		state.catchGainExp = this.GAIN_EXP_FOR_CATCH;

		if(state.meta["Catch State"])
			state.catchState = true;
		if(reg.exec(state.note)){
			state.catchStateEval = RegExp.$1;
			state.catchState = true;
		}
		if(state.meta["Catch Gain Exp"]){
			var s = state.meta["Catch Gain Exp"].trim().toUpperCase();
			switch(s){
				case "ON":
					state.catchGainExp = true;
					break;
				case "OFF":
					state.catchGainExp = false;
					break;
			}
		}
	}
};

CP.CatchManager.loadCatchResult = function(){
	for(var i = 1; i < $dataStates.length; i++){
		var state = $dataStates[i];
		state.catchResultTexts = null;
		if(this.isCatchState(i)){
			state.catchResultTexts = this.getResultTexts(this.CATCH_REULT_TEXTS);
			this.loadStateResultText(state);
		}
	}
};

CP.CatchManager.getResultTexts = function(data){
	var success = this.CATCH_REULT_TEXTS.success;
	var failure = this.CATCH_REULT_TEXTS.failure;
	var forbidden = this.CATCH_REULT_TEXTS.forbidden;
	if(!!data.success)
		success = data.success;
	if(!!data.failure)
		failure = data.failure;
	if(!!data.forbidden)
		forbidden = data.forbidden;
	return {1: success, 2: failure, 3: forbidden};
};

CP.CatchManager.loadStateResultText = function(state){
	var reg1 = /<Catch Result Texts>([\s\S]+)<\/Catch Result Texts>/;
	var reg2 = /(success|failure|forbidden): ([\S\s]+)/;
	if(reg1.exec(state.note)){
		var obj = {};
		var lists = RegExp.$1.trim().split("\n");
		lists.forEach(function(line){
			if(reg2.exec(line)){
				var type = RegExp.$1;
				var text = RegExp.$2;
				obj[type] = text;
			}
		});

		state.catchResultTexts = this.getResultTexts(obj);
	}
};

CP.CatchManager.isCatchState = function(stateId){
	var state = $dataStates[stateId];
	if(!!state && state.catchState)
		return true;
	else
		return false;
};

CP.CatchManager.loadEnemyCatchData = function(){
	for(var i = 1; i < $dataEnemies.length; i++){
		var enemy = $dataEnemies[i];
		enemy.canBeCaught = true;//是否能被捕捉
		enemy.catchLevel = 0;
		if(enemy.meta["Cannot Be Caught"])
			enemy.canBeCaught = false;
		if(enemy.meta["Catch Level"])
			enemy.catchLevel = Number(enemy.meta["Catch Level"]) || 0;
	}
};

CP.CatchManager.loadCatchItemData = function(group){
	var reg1 = /<Catch State (\d+) Chance: (\d+)%>/;
	var reg2 = /<Catch State (\d+) Chance Eval>([\S\s]+)<\/Catch State (\d+) Chance Eval>/;
	for(var i = 1; i < group.length; i++){
		var item = group[i];
		item.catchState = 0;
		item.catchChance = 0;
		item.catchChanceEval =  null;
		if(reg1.exec(item.note)){
			var st = Number(RegExp.$1) || 0;
			var chance = Number(RegExp.$2) || 0;
			if(CP.CatchManager.isCatchState(st)){
				item.catchState = st;
				item.catchChance = chance / 100;
			}
		}else if(reg2.exec(item.note)){
			var st1 = Number(RegExp.$1) || 0;
			var st2 = Number(RegExp.$3) || 0;
			if(st1 === st2 && CP.CatchManager.isCatchState(st1)){
				item.catchState = st1;
				item.catchChanceEval = RegExp.$2;
			}
		}
	}
};

//-----------------------------
// Game_Battler
//-----------------------------
CP.CatchManager.BATTLER_STATE_ADDABLE = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId){
	if(!this.isEnemy())
		return CP.CatchManager.BATTLER_STATE_ADDABLE.call(this, stateId);
	if(!CP.CatchManager.BATTLER_STATE_ADDABLE.call(this, stateId))
		return false;
	if(!CP.CatchManager.isCatchState(stateId))
		return true;
	return this.canBeCaught(stateId);
};

CP.CatchManager.BATTLER_ADD_NEW_STATE = Game_Battler.prototype.addNewState;
Game_Battler.prototype.addNewState = function(stateId){
	if(this.isEnemy() && CP.CatchManager.isCatchState(stateId)){
		CP.CatchManager.BATTLER_ADD_NEW_STATE.call(this, stateId);
		this.die();
		this.setCatchState(stateId);
		this.onCatch(stateId);
	}else
		CP.CatchManager.BATTLER_ADD_NEW_STATE.call(this, stateId);
};

CP.CatchManager.BATTLER_REMOVE_STATE = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId){
	if(this.isEnemy()){
		if(stateId === this.deathStateId() && this.hasBeenCaught())
			return;
	}
	CP.CatchManager.BATTLER_REMOVE_STATE.call(this, stateId);
};

//-----------------------------
// Game_Enemy
//-----------------------------
CP.CatchManager.SETUP_ENEMY = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y){
	CP.CatchManager.SETUP_ENEMY.call(this, enemyId, x, y);

	this.setCatchState(0);
	this.setCanBeCaught(this.enemy().canBeCaught);
};

Game_Enemy.prototype.catchLevel = function(){
	var enemy = this.enemy();
	if(!enemy)
		return 0;
	var level = Math.round(enemy.catchLevel);
	return level > 0 ? level : 0;
};

//设置捕捉状态，有捕捉状态的人不可再次被捕捉
Game_Enemy.prototype.setCatchState = function(stateId){
	if(CP.CatchManager.isCatchState(stateId))
		this._catchStateId = stateId;
	else
		this._catchStateId = 0;
};

Game_Enemy.prototype.hasBeenCaught = function(){
	return this._catchStateId > 0;
};

Game_Enemy.prototype.setCanBeCaught = function(caught){
	this._canBeCaught = caught;
};

Game_Enemy.prototype.canBeCaughtBase = function(){
	return !!this._canBeCaught;
};

Game_Enemy.prototype.canBeCaughtPlus = function(stateId){
	return true;
};

Game_Enemy.prototype.canBeCaught = function(stateId){
	return this.canBeCaughtBase() && this.canBeCaughtPlus(stateId);
};

Game_Enemy.prototype.onCatch = function(stateId){
	var state = $dataStates[stateId];
	if(!!state.catchStateEval)
		this.execCatchEval(state);
};

Game_Enemy.prototype.execCatchEval = function(state){
	try{
		eval(state.catchStateEval);
	}catch(err){
		console.error(err);
	}
};

CP.CatchManager.ENEMY_EXP = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
    if(this.hasExp())
    	return CP.CatchManager.ENEMY_EXP.call(this);
    else
    	return 0;
};

Game_Enemy.prototype.hasExp = function(){
	var catchState = $dataStates[this._catchStateId];
	if(!catchState)
		return true;
	return catchState.catchGainExp;
};

//-----------------------------
// Game_Action
//-----------------------------
Game_Action.prototype.isCatchItem = function(){
	return this.catchState() > 0;
};

Game_Action.prototype.catchState = function(){
	var item = this.item();
	if(!item)
		return 0;
	return item.catchState;
};

Game_Action.prototype.baseCatchChance = function(target){
	var item = this.item();
	var chance = 0;
	if(item.catchChance > 0)
		chance = item.catchChance;
	else if(!!item.catchChanceEval){
		try{
			eval(item.catchChanceEval);
		}catch(err){
			console.error(err);
			chance = 0;
		}
	}

	return chance > 0 ? chance : 0;
};

Game_Action.prototype.catchChance = function(target){
	return this.baseCatchChance(target) * target.stateRate(this.catchState()) * this.lukEffectRate(target);
};

CP.CatchManager.APPLY_ACTION_ITEM_USER_EFFECT = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	CP.CatchManager.APPLY_ACTION_ITEM_USER_EFFECT.call(this, target);

	if(this.isCatchItem())
		this.processCatch(target);
};

Game_Action.prototype.processCatch = function(target){
	var addable = target.isStateAddable(this.catchState());
	var success = Math.random() < this.catchChance(target);
	if(addable && success)
		target.addState(this.catchState());

	var catchType = Game_ActionResult.CATCH_RESULT_NONE;
	if(!addable)
		catchType = Game_ActionResult.CATCH_RESULT_FORBIDDEN;
	else if(success)
		catchType = Game_ActionResult.CATCH_RESULT_SUCCESS;
	else
		catchType = Game_ActionResult.CATCH_RESULT_FAILURE;

	target.result().setCatchResult(this.catchState(), catchType);
	BattleManager._logWindow.displayCatch(target);
};

//-----------------------------
// Game_ActionResult
//-----------------------------
Game_ActionResult.CATCH_RESULT_NONE = 0; //初始化
Game_ActionResult.CATCH_RESULT_SUCCESS = 1; //捕捉成功
Game_ActionResult.CATCH_RESULT_FAILURE = 2; //捕捉失败
Game_ActionResult.CATCH_RESULT_FORBIDDEN = 3; //禁止捕捉

CP.CatchManager.CLEAR_ACTION_RESULT = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
	CP.CatchManager.CLEAR_ACTION_RESULT.call(this);

	this.setCatchResult(0, Game_ActionResult.CATCH_RESULT_NONE);
};

Game_ActionResult.prototype.setCatchResult = function(stateId, resultType){
	this.catchResult = {state: stateId, result: resultType};
};

Game_ActionResult.prototype.catchResultState = function(){
	return $dataStates[this.catchResult.state];
};

Game_ActionResult.prototype.catchResultType = function(){
	return this.catchResult.result;
};

Game_ActionResult.prototype.catchResultText = function(){
	if(this.catchResult.state <= 0)
		return null;
	return this.catchResultState().catchResultTexts[this.catchResultType()];
};

//-----------------------------
// Window_BattleLog
//-----------------------------
Window_BattleLog.prototype.displayCatch = function(target){
	var result = target.result();
	var text = result.catchResultText();

	if(!!text)
		this.push("addText", text);
};

//-----------------------------
// Game_Interpreter
//-----------------------------
CP.CatchManager.PLUGIN_COMMAND = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	CP.CatchManager.PLUGIN_COMMAND.call(this, command, args);

	if(command == 'EnemyCanCatch' && $gameParty.inBattle()){
		var index = Number(args[0]) || 0;
		var value = eval(args[1]) || false;
		value = !!value;

		var enemy = $gameTroop.members()[index - 1];
		if(enemy)
			enemy.setCanBeCaught(value);
		console.log(enemy);
	}
};