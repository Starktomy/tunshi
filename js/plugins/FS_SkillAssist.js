/*:
 * @plugindesc （封神外传专用）技能辅助
 * @author 小c
 *
 * @param Barrier Critical Rate
 * @text 护盾暴击比例
 * @type number
 * @decimals 2
 * @default 1.50
 * 
 * @help 
 * 技能辅助代码，有以下功能
 * 1. 换血
 * 战斗序列中的新命令
 * Battler Change Hp: 目标1, 目标2
 * 使目标1和目标2交换血量
 * 目标1和目标2必须是单体指令，否则无效
 * 例子：Battler Change Hp: user, target
 *
 * 2. 护盾暴击率
 * 护盾效果追加暴击效果
 * 护盾暴击效果系数配置插件参数
 * 护盾暴击率配置以下标签
 * 角色/职业/武器/防具/敌人/状态标签
 * <Barrier Critical Rate: x%>
 * x必须是正数，可以是小数
 * 例子：<Barrier Critical Rate: 10%>
*/

var Imported = Imported || {};
Imported.FS_SkillAssist = true;

var FS = FS || {};
FS.SkillAssist = FS.SkillAssist || {};
FS.SkillAssist.Params = PluginManager.parameters("FS_SkillAssist");
FS.SkillAssist.BARRIER_CRITICAL_RATE = Number(FS.SkillAssist.Params["Barrier Critical Rate"]) || 1;

FS.SkillAssist._loaded = false;
FS.SkillAssist.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!FS.SkillAssist.DATABASE_LOADED.call(this))
		return false;
	if(!FS.SkillAssist._loaded){
		FS.SkillAssist.loadBarrierCriticalData($dataActors);
		FS.SkillAssist.loadBarrierCriticalData($dataClasses);
		FS.SkillAssist.loadBarrierCriticalData($dataWeapons);
		FS.SkillAssist.loadBarrierCriticalData($dataArmors);
		FS.SkillAssist.loadBarrierCriticalData($dataEnemies);
		FS.SkillAssist.loadBarrierCriticalData($dataStates);
		FS.SkillAssist._loaded = true;
	}

	return true;
};

FS.SkillAssist.loadBarrierCriticalData = function(group){
	var reg = /<Barrier Critical Rate: (\d+(\.\d+)*)%>/;
	for(var i = 1; i < group.length; i++){
		var item = group[i];
		item.barrierCriticalRate = 0;
		if(reg.exec(item.note)){
			var rate = Number(RegExp.$1) || 0;
			item.barrierCriticalRate = rate / 100;
		}
	}
};

//-----------------------------
// Game_Battler
//-----------------------------
//换血函数
Game_Battler.prototype.changeBattlerHp = function(target){
	if(!!target){
		if(target.hp !== this.hp){
			var temp = this.hp;
			this.setHp(target.hp);
			target.setHp(temp);
		}
	}
};

Game_Battler.prototype.barrierCriticalRate = function(){
	return this.statesBarrierCriticalRate();
};

Game_Battler.prototype.barrierCriticalRateByItem = function(item){
	if(!item)
		return 0;
	else
		return item.barrierCriticalRate;
};

Game_Battler.prototype.statesBarrierCriticalRate = function(){
	var value = 0;
	var states = this.states();
	for(var i = 0; i < states.length; i++)
		value += this.barrierCriticalRateByItem(states[i]);
	return value;
};

//-----------------------------
// Game_Actor
//-----------------------------
Game_Actor.prototype.barrierCriticalRate = function(){
	return Game_Battler.prototype.barrierCriticalRate.call(this) 
		+ this.barrierCriticalRateByItem(this.actor()) + this.barrierCriticalRateByItem(this.currentClass())
		+ this.equipBarrierCriticalRate();
};

Game_Actor.prototype.equipBarrierCriticalRate = function(){
	var value = 0;
	var equips = this.equips();
	for(var i = 0; i < equips.length; i++)
		value += this.barrierCriticalRateByItem(equips[i]);
	return value;
};

//-----------------------------
// Game_Enemy
//-----------------------------
Game_Enemy.prototype.barrierCriticalRate = function(){
	return Game_Battler.prototype.barrierCriticalRate.call(this) 
		+ this.barrierCriticalRateByItem(this.enemy());
};

//-----------------------------
// Game_Action
//-----------------------------
//行动效果：改变护盾值
Game_Action.prototype.executeBarrierChange = function(target, value){
	if(this.isBarrierCritical(target))
		value = Math.round(value * FS.SkillAssist.BARRIER_CRITICAL_RATE);
	target.gainBarrier(value, 0);
};

//护盾的暴击状态
Game_Action.prototype.isBarrierCritical = function(target){
	return Math.random() < target.barrierCriticalRate()	;
};

//-----------------------------
// BattleManager
//-----------------------------
FS.SkillAssist.PROCESS_BATTLE_ACTION_SEQUENCE = BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs){
	if(actionName.match(/BATTLER CHANGE HP/i))
		return this.actionBattlerChangeHp(actionArgs);

	return FS.SkillAssist.PROCESS_BATTLE_ACTION_SEQUENCE.call(this, actionName, actionArgs);
};

BattleManager.actionBattlerChangeHp = function(actionArgs){
	var t1 = this.makeActionTargets(actionArgs[0]);
	var t2 = this.makeActionTargets(actionArgs[1]);
	if(t1.length === 1 && t2.length === 1){
		t1[0].changeBattlerHp(t2[0]);
		return true;
	}else
		return false;
};