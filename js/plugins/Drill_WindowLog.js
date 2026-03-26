//=============================================================================
// Drill_WindowLog.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        战斗 - 窗口提示消息
 * @author Drill_up
 *
 * @param 战斗间隔
 * @type number
 * @min 0
 * @desc 释放技能或者攻击后间隔的时间，单位帧。（1秒60帧）
 * @default 12 
 *
 * @param 消息框颜色
 * @desc 填入配置颜色的编码。
 * @default #0022ff
 *
 * @param 消息框透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 消息框的透明度，0为完全透明,255为完全不透明。
 * @default 176
 *
 * @param 是否显示战斗开始对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示，xxxx出现的对话框。
 * @default true
 *
 * @param 是否显示先发制人对话
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param ----敌方----
 * @default
 *
 * @param 显示-敌人单体技
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人释放技能。
 * @default false
 *
 * @param 显示-敌人群体技
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人释放技能。
 * @default false
 *
 * @param 显示-敌人无伤
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人没造成伤害。
 * @default false
 *
 * @param 显示-对敌人暴击
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人造成暴击。
 * @default false
 *
 * @param 显示-未命中敌人
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方没有命中敌人。
 * @default false
 *
 * @param 显示-敌人物理闪避
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人闪避了我方的物理攻击。
 * @default true
 *
 * @param 显示-敌人魔法闪避
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人闪避了我方的魔法攻击。
 * @default true
 *
 * @param 显示-敌人物理反击
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方反击。
 * @default true
 *
 * @param 显示-敌人魔法反射
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方反射。
 * @default true
 *
 * @param 显示-敌人掩护
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人掩护敌人。
 * @default true
 *
 * @param 显示-敌人生命减少
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人生命恢复
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人魔法减少
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人魔法恢复
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-敌人怒气减少
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-敌人怒气恢复
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-敌人遭到状态
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。死亡也是一种状态。
 * @default true
 *
 * @param 显示-敌人解除状态
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 显示-敌人强化弱化
 * @parent ----敌方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param ----我方----
 * @default
 *
 * @param 显示-我方使用道具
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-我方单体技
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方释放技能。
 * @default false
 *
 * @param 显示-我方群体技
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方释放技能。
 * @default false
 *
 * @param 显示-我方无伤
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方没造成伤害。
 * @default false
 *
 * @param 显示-对我方暴击
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人对我方造成暴击。
 * @default false
 *
 * @param 显示-未命中我方
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。敌人没有命中我方。
 * @default false
 *
 * @param 显示-我方物理闪避
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方闪避了敌人的物理攻击。
 * @default true
 *
 * @param 显示-我方魔法闪避
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方闪避了敌人的魔法攻击。
 * @default true
 *
 * @param 显示-我方物理反击
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人反击。
 * @default true
 *
 * @param 显示-我方魔法反射
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方对敌人反射。
 * @default true
 *
 * @param 显示-我方掩护
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。我方掩护我方。
 * @default true
 *
 * @param 显示-我方生命减少
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方生命恢复
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次生命恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方魔法减少
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法减少都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方魔法恢复
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。如果显示，则每次魔法恢复都会显示消息，这将拖慢战斗速度。
 * @default false
 *
 * @param 显示-我方怒气减少
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-我方怒气恢复
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default false
 *
 * @param 显示-我方遭到状态
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。死亡也是一种状态。
 * @default true
 *
 * @param 显示-我方解除状态
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * @param 显示-我方强化弱化
 * @parent ----我方----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。
 * @default true
 *
 * 
 *
 * @help  
 * =============================================================================
 * +++ Drill_WindowLog +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 战斗时，任何动作信息都会在上方的蓝色横条中显示，这里你可以控制
 * 窗口的消息每个细节是否显示。
 * 要修改消息显示的内容，在 数据库>用语>信息 中设置。
 * 
 * -----------------------------------------------------------------------------
 * ----插件冲突
 * 该插件与 YEP_BattleEngineCore 战斗核心 插件直接冲突，需要做必要取舍。
 *
 * -----------------------------------------------------------------------------
 * ----关于示例的脚本
 * 这里1.32版本以前(包括1.32)的示例，都是直接在内核rpg_windows.js中进行
 * 了修改，现在已经做成插件形式，如果你是直接复制搬的示例，最好将这个脚
 * 本复原。
 *
 * -----------------------------------------------------------------------------
 * ----关于颜色
 * 有以下颜色供参考：
 *  #FF4444 赤    #FF784C 橙   
 *  #FFFF40 黄    #80FF80 绿   
 *  #98F5FF 青    #40C0F0 蓝   
 *  #8080FF 紫    #FF69B4 粉   
 *  #8B4C39 棕    #BEBEBE 亮灰 
 *  #797979 暗灰 
 *
 * 如果你想配置更完美的颜色，推荐去这个网址找到你想要的颜色代码：
 * http://tool.oschina.net/commons?type=3
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件 ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得与敌人文本颜色插件相互兼容。
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件全部依赖全局变量】
//		这里的所有函数都是覆盖重写。跟其它消息处理的插件肯定有冲突。
//
 
//=============================================================================
// ** 变量配置
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_WindowLog = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_WindowLog');
    DrillUp.wlog_speed = Number(DrillUp.parameters['战斗间隔'] || 12);
    DrillUp.wlog_color = String(DrillUp.parameters['消息框颜色'] || '#0022ff');
    DrillUp.wlog_opacity = Number(DrillUp.parameters['消息框透明度'] || 176);
	
    DrillUp.wlog_e_message1 = String(DrillUp.parameters['显示-敌人单体技'] || "false") === "true";
    DrillUp.wlog_e_message2 = String(DrillUp.parameters['显示-敌人群体技'] || "false") === "true";
	DrillUp.wlog_e_fail = String(DrillUp.parameters['显示-敌人无伤'] || "false") === "true";
	DrillUp.wlog_e_critical = String(DrillUp.parameters['显示-对敌人暴击'] || "false") === "true";
	DrillUp.wlog_e_miss = String(DrillUp.parameters['显示-未命中敌人'] || "false") === "true";
	DrillUp.wlog_e_evl_phy = String(DrillUp.parameters['显示-敌人物理闪避'] || "false") === "true";
	DrillUp.wlog_e_evl_mana = String(DrillUp.parameters['显示-敌人魔法闪避'] || "false") === "true";
	DrillUp.wlog_e_counter = String(DrillUp.parameters['显示-敌人物理反击'] || "false") === "true";
	DrillUp.wlog_e_reflection = String(DrillUp.parameters['显示-敌人魔法反射'] || "false") === "true";
	DrillUp.wlog_e_backup = String(DrillUp.parameters['显示-敌人掩护'] || "false") === "true";
	DrillUp.wlog_e_hp_damage = String(DrillUp.parameters['显示-敌人生命减少'] || "false") === "true";
	DrillUp.wlog_e_hp_recover = String(DrillUp.parameters['显示-敌人生命恢复'] || "false") === "true";
	DrillUp.wlog_e_mp_damage = String(DrillUp.parameters['显示-敌人魔法减少'] || "false") === "true";
	DrillUp.wlog_e_mp_recover = String(DrillUp.parameters['显示-敌人魔法恢复'] || "false") === "true";
	DrillUp.wlog_e_tp_damage = String(DrillUp.parameters['显示-敌人怒气减少'] || "false") === "true";
	DrillUp.wlog_e_tp_recover = String(DrillUp.parameters['显示-敌人怒气恢复'] || "false") === "true";
	DrillUp.wlog_e_states_add = String(DrillUp.parameters['显示-敌人遭到状态'] || "false") === "true";
	DrillUp.wlog_e_states_remove = String(DrillUp.parameters['显示-敌人解除状态'] || "false") === "true";
	DrillUp.wlog_e_buffs = String(DrillUp.parameters['显示-敌人强化弱化'] || "false") === "true";
	
    DrillUp.wlog_a_useItem = String(DrillUp.parameters['显示-我方使用道具'] || "false") === "true";
    DrillUp.wlog_a_message1 = String(DrillUp.parameters['显示-我方单体技'] || "false") === "true";
    DrillUp.wlog_a_message2 = String(DrillUp.parameters['显示-我方群体技'] || "false") === "true";
	DrillUp.wlog_a_fail = String(DrillUp.parameters['显示-我方无伤'] || "false") === "true";
	DrillUp.wlog_a_critical = String(DrillUp.parameters['显示-对我方暴击'] || "false") === "true";
	DrillUp.wlog_a_miss = String(DrillUp.parameters['显示-未命中我方'] || "false") === "true";
	DrillUp.wlog_a_evl_phy = String(DrillUp.parameters['显示-我方物理闪避'] || "false") === "true";
	DrillUp.wlog_a_evl_mana = String(DrillUp.parameters['显示-我方魔法闪避'] || "false") === "true";
	DrillUp.wlog_a_counter = String(DrillUp.parameters['显示-我方物理反击'] || "false") === "true";
	DrillUp.wlog_a_reflection = String(DrillUp.parameters['显示-我方魔法反射'] || "false") === "true";
	DrillUp.wlog_a_backup = String(DrillUp.parameters['显示-我方掩护'] || "false") === "true";
	DrillUp.wlog_a_hp_damage = String(DrillUp.parameters['显示-我方生命减少'] || "false") === "true";
	DrillUp.wlog_a_hp_recover = String(DrillUp.parameters['显示-我方生命恢复'] || "false") === "true";
	DrillUp.wlog_a_mp_damage = String(DrillUp.parameters['显示-我方魔法减少'] || "false") === "true";
	DrillUp.wlog_a_mp_recover = String(DrillUp.parameters['显示-我方魔法恢复'] || "false") === "true";
	DrillUp.wlog_a_tp_damage = String(DrillUp.parameters['显示-我方怒气减少'] || "false") === "true";
	DrillUp.wlog_a_tp_recover = String(DrillUp.parameters['显示-我方怒气恢复'] || "false") === "true";
	DrillUp.wlog_a_states_add = String(DrillUp.parameters['显示-我方遭到状态'] || "false") === "true";
	DrillUp.wlog_a_states_remove = String(DrillUp.parameters['显示-我方解除状态'] || "false") === "true";
	DrillUp.wlog_a_buffs = String(DrillUp.parameters['显示-我方强化弱化'] || "false") === "true";
	
	
	DrillUp.wlog_battleStartMessage = String(DrillUp.parameters['是否显示战斗开始对话'] || "false") === "true";
	DrillUp.wlog_battlePreemptiveMessage = String(DrillUp.parameters['是否显示先发制人对话'] || "true") === "true";
	
//=============================================================================
// ** rpg_windows.js - Window_BattleLog
//=============================================================================

//==============================
// * 战斗间隔
//==============================
Window_BattleLog.prototype.messageSpeed = function() {
	if (Imported.MOG_FlashDamage) {if ($gameTemp._flashDamage) {return 0}};
    return DrillUp.wlog_speed;
};

//==============================
// * 消息框颜色
//==============================
Window_BattleLog.prototype.backColor = function() {
    return DrillUp.wlog_color;
};
//==============================
// * 消息框透明度
//==============================
Window_BattleLog.prototype.backPaintOpacity = function() {
    return DrillUp.wlog_opacity;
};

//==============================
// * 消息-释放技能、物品
//==============================
Window_BattleLog.prototype.displayAction = function(subject, item) {
    var numMethods = this._methods.length;
    if (DataManager.isSkill(item)) {
        if (item.message1) {
			if(subject.isActor()){
				if(DrillUp.wlog_a_message1){
					this.push('addText', subject.name() + item.message1.format(item.name));
				}else{
					this.push('wait');
				}
			}else{
				if(DrillUp.wlog_e_message1){
					this.push('addText', subject.nameWithColor() + item.message1.format(item.name));
				}else{
					this.push('wait');
				}
			}
        }
        if (item.message2) {
			if(subject.isActor()){
				if(DrillUp.wlog_a_message2){
					this.push('addText', item.message2.format(item.name));
				}else{
					this.push('wait');
				}
			}else{
				if(DrillUp.wlog_e_message2){
					this.push('addText', item.message2.format(item.name));
				}else{
					this.push('wait');
				}
			}
        }
    } else {
		if(DrillUp.wlog_a_useItem){
			this.push('addText', TextManager.useItem.format(subject.name(), item.name));
        }else{
			this.push('wait');
		}
    }
    if (this._methods.length === numMethods) {
        this.push('wait');
    }
};


//==============================
// * 消息-无伤
//==============================
Window_BattleLog.prototype.displayFailure = function(target) {
    if (target.result().isHit() && !target.result().success) {
        if (target.isActor()) {
			if(DrillUp.wlog_a_fail){
				this.push('addText', TextManager.actionFailure.format(target.name()));
			}else{
				this.push('wait');
			}
		}else{
			if(DrillUp.wlog_e_fail){
				this.push('addText', TextManager.actionFailure.format(target.nameWithColor()));
			}else{
				this.push('wait');
			}
		}
    }
};

//==============================
// * 消息-暴击
//==============================
Window_BattleLog.prototype.displayCritical = function(target) {
    if (target.result().critical) {
        if (target.isActor()) {
			if(DrillUp.wlog_a_critical){
				this.push('addText', TextManager.criticalToActor);
			}else{
				this.push('wait');
			}
        } else {
			if(DrillUp.wlog_e_critical){
				this.push('addText', TextManager.criticalToEnemy);
			}else{
				this.push('wait');
			}
        }
    }
};

//==============================
// * 消息-未击中
//==============================
Window_BattleLog.prototype.displayMiss = function(target) {
    var fmt;
    if (target.result().physical) {
        fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
        this.push('performMiss', target);
    } else {
        fmt = TextManager.actionFailure;
    }
    if (target.isActor()) {
		if(DrillUp.wlog_a_miss){
			this.push('addText', fmt.format(target.name()));
		}else{
			this.push('wait');
		}
	}else{
		if(DrillUp.wlog_e_miss){
			this.push('addText', fmt.format(target.nameWithColor()));
		}else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息-闪避
//==============================
Window_BattleLog.prototype.displayEvasion = function(target) {
    var fmt;
    if (target.result().physical) {
        fmt = TextManager.evasion;
        this.push('performEvasion', target);
		if (target.isActor()) {
			if(DrillUp.wlog_a_evl_phy){
				this.push('addText', fmt.format(target.name()));
			}else{
				this.push('wait');
			}
		} else {
			if(DrillUp.wlog_e_evl_phy){
				this.push('addText', fmt.format(target.nameWithColor()));
			}else{
				this.push('wait');
			}
		}
    } else {
        fmt = TextManager.magicEvasion;
        this.push('performMagicEvasion', target);
		if (target.isActor()) {
			if(DrillUp.wlog_a_evl_mana){
				this.push('addText', fmt.format(target.name()));
			}else{
				this.push('wait');
			}
		} else {
			if(DrillUp.wlog_e_evl_mana){
				this.push('addText', fmt.format(target.nameWithColor()));
			}else{
				this.push('wait');
			}
		}
    }
};

//==============================
// * 消息-物理反击
//==============================
Window_BattleLog.prototype.displayCounter = function(target) {
    this.push('performCounter', target);
	if(target.isActor()){
		if(DrillUp.wlog_a_counter){
			this.push('addText', TextManager.counterAttack.format(target.name()));
        }else{
			this.push('wait');
		}
    } else {
		if(DrillUp.wlog_e_counter){
			this.push('addText', TextManager.counterAttack.format(target.nameWithColor()));
        }else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息-魔法反射
//==============================
Window_BattleLog.prototype.displayReflection = function(target) {
    this.push('performReflection', target);
	if(target.isActor()){
		if(DrillUp.wlog_a_reflection){
			this.push('addText', TextManager.magicReflection.format(target.name()));
        }else{
			this.push('wait');
		}
    } else {
		if(DrillUp.wlog_e_reflection){
			this.push('addText', TextManager.magicReflection.format(target.nameWithColor()));
        }else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息-掩护
//==============================
Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
    var substName = substitute.name();
    this.push('performSubstitute', substitute, target);
	if(target.isActor()){
		if(DrillUp.wlog_a_backup){
			this.push('addText', TextManager.substitute.format(substName, target.name()));
        }else{
			this.push('wait');
		}
    } else {
		if(DrillUp.wlog_e_backup){
			this.push('addText', TextManager.substitute.format(substName, target.nameWithColor()));
        }else{
			this.push('wait');
		}
	}
};

//==============================
// * 消息-hp消息
//==============================
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (target.result().hpAffected) {
        if (target.result().hpDamage > 0 && !target.result().drain) {
            this.push('performDamage', target);
			if(target.isActor()){
				if(DrillUp.wlog_a_hp_damage){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_hp_damage){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
        }
        if (target.result().hpDamage < 0) {
            this.push('performRecovery', target);
			if(target.isActor()){
				if(DrillUp.wlog_a_hp_recover){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_hp_recover){
					this.push('addText', this.makeHpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
        }
    }
};

//==============================
// * 消息-mp消息
//==============================
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (target.isAlive() && target.result().mpDamage !== 0) {
        if (target.result().mpDamage > 0 && !target.result().drain) {
			if(target.isActor()){
				if(DrillUp.wlog_a_mp_damage){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_mp_damage){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
		}
        if (target.result().mpDamage < 0) {
            this.push('performRecovery', target);
			if(target.isActor()){
				if(DrillUp.wlog_a_mp_recover){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_mp_recover){
					this.push('addText', this.makeMpDamageText(target));
				}else{
					//this.push('wait');
				}
			}
        }
    }
};

//==============================
// * 消息-tp消息
//==============================
Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (target.isAlive() && target.result().tpDamage !== 0) {
        if (target.result().tpDamage > 0 && !target.result().drain) {
			if(target.isActor()){
				if(DrillUp.wlog_a_tp_damage){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_tp_damage){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			}
		}
        if (target.result().tpDamage < 0) {
            this.push('performRecovery', target);
			if(target.isActor()){
				if(DrillUp.wlog_a_tp_recover){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_tp_recover){
					this.push('addText', this.makeTpDamageText(target));
				}else{
					this.push('wait');
				}
			}
        }
    }
};

//==============================
// * 消息-添加状态
//==============================
Window_BattleLog.prototype.displayAddedStates = function(target) {
    target.result().addedStateObjects().forEach(function(state) {
        var stateMsg = target.isActor() ? state.message1 : state.message2;
        if (state.id === target.deathStateId()) {
            this.push('performCollapse', target);
        }
        if (stateMsg) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
			if(target.isActor()){
				if(DrillUp.wlog_a_states_add){
					this.push('addText', target.name() + stateMsg);
				}else{
					this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_states_add){
					this.push('addText', target.nameWithColor() + stateMsg);
				}else{
					this.push('wait');
				}
			}
            this.push('waitForEffect');
        }
    }, this);
};

//==============================
// * 消息-消除状态
//==============================
Window_BattleLog.prototype.displayRemovedStates = function(target) {
    target.result().removedStateObjects().forEach(function(state) {
        if (state.message4) {
            this.push('popBaseLine');
            this.push('pushBaseLine');
			if(target.isActor()){
				if(DrillUp.wlog_a_states_remove){
					this.push('addText', target.name() + state.message4);
				}else{
					this.push('wait');
				}
			} else {
				if(DrillUp.wlog_e_states_remove){
					this.push('addText', target.nameWithColor() + state.message4);
				}else{
					this.push('wait');
				}
			}
        }
    }, this);
};

//==============================
// * 消息-弱化强化
//==============================
Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
    buffs.forEach(function(paramId) {
        this.push('popBaseLine');
        this.push('pushBaseLine');
		if(target.isActor()){
			if(DrillUp.wlog_a_buffs){
				this.push('addText', fmt.format(target.name(), TextManager.param(paramId)));
			}else{
				this.push('wait');
			}
		} else {
			if(DrillUp.wlog_e_buffs){
				this.push('addText', fmt.format(target.nameWithColor(), TextManager.param(paramId)));
			}else{
				this.push('wait');
			}
		}
    }, this);
};

//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// * Refresh 
//==============================
BattleManager.displayStartMessages = function() {
    if (DrillUp.wlog_battleStartMessage) {
		
		if( Imported.Drill_EnemyTextColor ){
			$gameTroop.enemyNamesWithColor().forEach(function(name) {
				$gameMessage.add(TextManager.emerge.format(name));
			});
		}else{
			$gameTroop.enemyNames().forEach(function(name) {
				$gameMessage.add(TextManager.emerge.format(name));
			});
		}
	};
	if (DrillUp.wlog_battlePreemptiveMessage) {
		if (this._preemptive) {
			$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
		} else if (this._surprise) {
			$gameMessage.add(TextManager.surprise.format($gameParty.name()));
		}
	};
};

//=============================================================================
// ** 敌人文本颜色控制
//=============================================================================

//==============================
// * 敌人颜色组
//==============================
Game_Troop.prototype.enemyNamesWithColor = function() {
    var names = [];
    this.members().forEach(function(enemy) {
        var name = enemy.nameWithColor();
		if ( !names.contains(name)) {
			names.push(name);
		}
    });
    return names;
};

//==============================
// * 单敌人颜色
//==============================
Game_Enemy.prototype.nameWithColor = function() {
	if( Imported.Drill_EnemyTextColor && DrillUp.enemy_color_massage ){
		var name = this.name();
		//if ( this.isAlive() ) {
			var color = String($dataEnemies[this.enemyId()].meta['颜色'] || "");
			if(color !== ""){
				if( color.slice(0,1) !== "#" ){	
					name = "\\c["+ String(Number(color)-1+100) + "]" + name + "\\c[0]";
				}
			}
		//}
		return name;
	}else{
		return this.name();
	}
};

//==============================
// * 文本颜色n
//==============================
var _drill_textColor = Window_Base.prototype.textColor;
Window_Base.prototype.textColor = function(n) {
	if( n >= 100 && Imported.Drill_EnemyTextColor ){
		return DrillUp.color_conf_e[n-100];
	}else{
		return _drill_textColor.call(this,n);
	}
};

