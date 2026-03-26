//=============================================================================
// Drill_BattleCamera.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        战斗 - 活动战斗镜头
 * @author Drill_up
 *
 * @param 镜头架宽度
 * @type number
 * @min 50
 * @desc 镜头可以活动的宽度。战斗背景大小 >= 镜头架宽度 >= 窗口宽度 。
 * @default 1000
 *
 * @param 镜头架高度
 * @type number
 * @min 50
 * @desc 镜头可以活动的高度。战斗背景大小 >= 镜头架高度 >= 窗口高度 。
 * @default 740
 *
 * @param 镜头移动模式
 * @type select
 * @option 弹性移动
 * @value 弹性移动
 * @option 匀速移动
 * @value 匀速移动
 * @desc 镜头移动到新目标的模式。
 * @default 弹性移动
 *
 * @param 镜头移动速度
 * @parent 镜头移动模式
 * @type number
 * @min 1
 * @desc 匀速移动模式：简单平移，单位 像素/帧。
 * 弹性模式：速度为比例除数，值越小，速度越快。
 * @default 10 
 *
 * @param 镜头聚焦延迟
 * @type number
 * @min 0
 * @desc 镜头移动延迟的时间。20表示20帧后开始移动镜头。（1秒60帧）
 * @default 20  
 *
 * @param 偏移-镜头 X
 * @desc 默认镜头聚焦目标的中心，在中心的基础上x轴方向偏移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-镜头 Y
 * @desc 默认镜头聚焦目标的中心，在中心的基础上y轴方向偏移，单位像素。（可为负数）
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ Drill_BattleCamera +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 镜头会根据对象进行平移，当指针选中敌人时，镜头会进行动态移动。
 * 兼容yep修改窗口大小。
 *
 * -----------------------------------------------------------------------------
 * ----素材规则
 * 你只要满足： 战斗背景大小 >= 镜头架大小 >= 窗口大小
 * 就可以随意控制战斗背景了。
 * 
 * 镜头架，相当于窗口的可活动区域。
 * 如果 镜头架宽度 小于或等于 窗口宽度，则镜头无法左右移动。
 * 如果 镜头架高度 小于或等于 窗口高度，则镜头无法上下移动。
 *
 * 例如，你可以通过yep设置窗口为1280*720，设置镜头架为1366*768。
 * 那么你只需要配置1366*768的战斗背景素材就可以了。（素材小了会看到黑边）
 * 相比原来的mog，这里的镜头不对战斗背景做任何多余操作。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以手动改变镜头架的大小等参数。
 * 
 * 插件指令（开启）：>开启镜头
 * 插件指令（关闭）：>关闭镜头
 *
 * 插件指令（改高度）：>镜头架高度 1000
 * 插件指令（改宽度）：>镜头架宽度 740
 * 插件指令（改速度）：>镜头速度 10
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	$gameTemp._drill_cam_xxx
//		存储数据变量	$gameSystem._drill_cam_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		该插件原本原理只是对 _battleField 进行简单平移。
//		mog由于直接改变了大小，越弄越复杂，这里重建，简化方式。
//		中心点：	._drill_center_X
//		镜头目标点：._drill_target_X
//		当前点：	._battleField.x
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleCamera = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_BattleCamera');
	DrillUp.camera_x = Number(DrillUp.parameters['平移-镜头 X'] || 0);
	DrillUp.camera_y = Number(DrillUp.parameters['平移-镜头 Y'] || 0);
	DrillUp.camera_limit_width = Number(DrillUp.parameters['镜头架宽度'] || 1500);
	DrillUp.camera_limit_height = Number(DrillUp.parameters['镜头架高度'] || 900);
    DrillUp.camera_type = String(DrillUp.parameters['镜头移动模式'] || '弹性移动');
    DrillUp.camera_speed = Number(DrillUp.parameters['镜头移动速度'] || 10);
	DrillUp.camera_ftime = Number(DrillUp.parameters['镜头聚焦延迟'] || 20);
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * 镜头重置
//==============================
var _drill_cam_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_cam_temp_initialize.call(this);
    this.drill_clearBattleCamera();
};
Game_Temp.prototype.drill_clearBattleCamera = function() {
	this._drill_cam_pos = [0,0];						//镜头所在位置
	this._drill_cam_cur_actor = [null,[0,0]];			//当前选中角色（sv）
	this._drill_cam_being_attack = [null,[0,0],0];		//受伤害单位
	this._drill_cam_select_single = [null,[0,0]];		//选中一个单位
	this._drill_cam_select_single_turn = [null,[0,0]];	//
	this._drill_cam_select_all = false;					//选中所有单位
	this._drill_cam_select_all_turn = false;			//
	this._drill_battleEnd = false;						//战斗结束
	this._drill_cam_result_move_X = 0;					//镜头实际位移量X
	this._drill_cam_result_move_Y = 0;					//镜头实际位移量Y
};

//=============================================================================
// ** 插件指令
//=============================================================================	
var _drill_cam_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_cam_sys_initialize.call(this);
    this._drill_cam_enable = true ;
    this._drill_cam_speed = DrillUp.camera_speed;
    this._drill_cam_ftime = DrillUp.camera_ftime;
    this._drill_cam_limit_width = DrillUp.camera_limit_width;
    this._drill_cam_limit_height = DrillUp.camera_limit_height;
};
var _alias_mog_bcam_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_bcam_pluginCommand.call(this,command, args)
	if (command === ">镜头速度")  {
		if(args.length == 1){
			$gameSystem._drill_cam_speed = Number(args[0])
		};
	};
	if (command === ">镜头架高度")  {
		if(args.length == 1){
			$gameSystem._drill_cam_limit_height = Number(args[0])
		};
	};
	if (command === ">镜头架宽度")  {
		if(args.length == 1){
			$gameSystem._drill_cam_limit_width = Number(args[0]);
		};
	};
	if (command === ">开启镜头")  { $gameSystem._drill_cam_enable = true};
	if (command === ">关闭镜头")  { $gameSystem._drill_cam_enable = false};
	return true;
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * 镜头移动目标 - 选中全部敌人时
//==============================
var _drill_cam_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
	var action = BattleManager.inputtingAction();
	$gameTemp._drill_cam_select_all = action.isForAll();
	_drill_cam_onSelectAction.call(this);    
};

//=============================================================================
// ** Window BattleActor
//=============================================================================

//==============================
// * 镜头移动目标 - 角色窗口被隐藏时
//==============================
var _drill_cam_win_actor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _drill_cam_win_actor_hide.call(this);
    $gameTemp._drill_cam_select_all = false;
	$gameTemp._drill_cam_select_single = null;
};

//==============================
// * 镜头移动目标 - 选中一个敌人时
//==============================
var _drill_cam_win_actor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _drill_cam_win_actor_select.call(this,index);
	$gameTemp._drill_cam_select_single = [null,[0,0]];
	if (this.actor()) {$gameTemp._drill_cam_select_single[0] = this.actor();};
};

//=============================================================================
// ** Window BattleEnemy
//=============================================================================

//==============================
// * 镜头移动目标 - 敌人窗口被隐藏时
//==============================
var _drill_cam_win_enemy_hide = Window_BattleEnemy.prototype.hide; 
Window_BattleEnemy.prototype.hide = function() {
	_drill_cam_win_enemy_hide.call(this);
	$gameTemp._drill_cam_select_all = false;
	$gameTemp._drill_cam_select_single = null;
};

//==============================
// * 镜头移动目标 - 选中一个角色时（sv）
//==============================
var _drill_cam_win_enemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _drill_cam_win_enemy_select.call(this,index)
	$gameTemp._drill_cam_select_single = [null,[0,0]];
	if (this.enemy()) {$gameTemp._drill_cam_select_single[0] = this.enemy();};
};

//=============================================================================
// ** Battle Manager
//=============================================================================

//==============================
// * 镜头移动目标 - 清除目标
//==============================
BattleManager.drill_camTargetClear = function() {
	$gameTemp._drill_cam_being_attack = [null,[0,0],0];
	$gameTemp._drill_cam_select_single_turn = [null,[0,0]];
	$gameTemp._drill_cam_select_all_turn = false;
	$gameTemp._drill_cam_pos = [0,0];
};

//==============================
// * 镜头 - 结束回合
//==============================
var _drill_cam_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
	_drill_cam_endTurn.call(this);
	$gameTemp._drill_cam_being_attack = [null,[0,0],0];
    this.drill_camTargetClear();
};

//==============================
// * 镜头 - 开始释放技能
//==============================
var _drill_cam_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
	 _drill_cam_startAction.call(this);
     this.drill_camTargetClear();
	 $gameTemp._drill_cam_being_attack = [this._subject,[0,0],$gameSystem._drill_cam_ftime];	//确定/聚焦 被攻击对象
	 $gameTemp._drill_cam_select_single_turn[0] = this._targets[0];
	 if (this._targets.length > 1) {$gameTemp._drill_cam_select_all_turn = true};
};

//==============================
// * 镜头 - 战斗胜利
//==============================
var _drill_cam_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	 $gameTemp._drill_battleEnd = true;
	_drill_cam_processVictory.call(this);	 
};
//==============================
// * 镜头 - 战斗逃跑
//==============================
var _drill_cam_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	 $gameTemp._drill_battleEnd = true;
	_drill_cam_processAbort.call(this);	 
};
//==============================
// * 镜头 - 战斗失败
//==============================
var _drill_cam_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	 $gameTemp._drill_battleEnd = true;
	_drill_cam_processDefeat.call(this);	 
};

//=============================================================================
// ** Spriteset Battler
//=============================================================================

//==============================
// * 战斗场景帧刷新
//==============================
var _drill_cam_batter_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	_drill_cam_batter_updatePosition.call(this);
    this.drill_updateCamPos();
};

//==============================
// * 刷新镜头位置
//==============================
Sprite_Battler.prototype.drill_updateCamPos = function() {
	$gameTemp._drill_cam_cur_actor[0] = BattleManager.actor();
	if ($gameTemp._drill_cam_select_single && $gameTemp._drill_cam_select_single[0] === this._battler) {this.drill_focus_target()};
	if ($gameTemp._drill_cam_select_single_turn && $gameTemp._drill_cam_select_single_turn[0] === this._battler) {this.drill_focus_target_turn()};
	if ($gameTemp._drill_cam_being_attack && $gameTemp._drill_cam_being_attack[0] === this._battler) {this.drill_focus_being_attack()};
	if ($gameTemp._drill_cam_cur_actor && $gameTemp._drill_cam_cur_actor[0] === this._battler) {this.drill_focus_actor()};
};

//==============================
// * 镜头位置 - 高度修正
//==============================
Sprite_Battler.prototype.drill_camHeightFix = function() {
	if (this._mainSprite) {
		return this.y - (this._mainSprite.height / 2);
	} else {
		return this.y - (this.bitmap.height / 2);
	};
};
//==============================
// * 镜头位置 - 当前角色
//==============================
Sprite_Battler.prototype.drill_focus_actor = function() {
	  $gameTemp._drill_cam_cur_actor[1][0] = this.x;
      $gameTemp._drill_cam_cur_actor[1][1] = this.drill_camHeightFix();
};

//==============================
// * 镜头位置 - 选择目标
//==============================
Sprite_Battler.prototype.drill_focus_target = function() {
	   $gameTemp._drill_cam_select_single[1][0] = this.x;
       $gameTemp._drill_cam_select_single[1][1] = this.drill_camHeightFix();
};

//==============================
// * 镜头位置 - 选择目标
//==============================
Sprite_Battler.prototype.drill_focus_target_turn = function() {
	   $gameTemp._drill_cam_select_single_turn[1][0] = this.x;
       $gameTemp._drill_cam_select_single_turn[1][1] = this.drill_camHeightFix();
};
	
//==============================
// * 镜头位置 - 受伤单位
//==============================
Sprite_Battler.prototype.drill_focus_being_attack = function() {
	   $gameTemp._drill_cam_being_attack[1][0] = this.x;
       $gameTemp._drill_cam_being_attack[1][1] = this.drill_camHeightFix();
};	

//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * 镜头内容初始化
//==============================
var _drill_cam_Spriteset_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	this.drill_cameraSetup();
	_drill_cam_Spriteset_initialize.call(this);	
};

Spriteset_Battle.prototype.drill_cameraSetup = function() {
    $gameTemp.drill_clearBattleCamera(); 
	this._drill_center_X = Graphics.boxWidth / 2;	//设置中心
	this._drill_center_Y = Graphics.boxHeight / 2;	
	this._drill_target_XF = DrillUp.camera_x;		//设置偏移
	this._drill_target_YF = DrillUp.camera_y; 
	this.drill_setToCenter();
};

	
//==============================
// * 默认的两个背景控制
//==============================
var _drill_cam_createBattleback = Spriteset_Battle.prototype.createBattleback
Spriteset_Battle.prototype.createBattleback = function() {
	_drill_cam_createBattleback.call(this);
	if ($gameSystem._drill_cam_enable) {
		this._back1Sprite.anchor.x = 0.5;
		this._back1Sprite.anchor.y = 0.5;
		this._back1Sprite.x = this._drill_center_X;
		this._back1Sprite.y = this._drill_center_Y;
		this._back2Sprite.anchor.x = 0.5;
		this._back2Sprite.anchor.y = 0.5;
		this._back2Sprite.x = this._drill_center_X;
		this._back2Sprite.y = this._drill_center_Y;
	};
};

//==============================
// * 镜头 - 帧刷新
//==============================
var _drill_cam_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_cam_update.call(this); 
    if ( $gameSystem._drill_cam_enable ) {
		this.drill_updateCameraPos();
		this.drill_updateCameraMove();
	};
};

//==============================
// * 镜头 - 刷新目标
//==============================
Spriteset_Battle.prototype.drill_updateCameraPos = function() {
	if (this.drill_needToCenter()) {	//中心移动判断
		this.drill_setToCenter();
		return ;
	};
	if ($gameTemp._drill_cam_being_attack[2] > 0) {	//镜头移动延迟
		$gameTemp._drill_cam_being_attack[2] -= 1
	};
	if ($gameTemp._drill_cam_select_single && $gameTemp._drill_cam_select_single[0]) {
		if (!$gameSystem.isSideView() && $gameTemp._drill_cam_select_single[0].isActor()) {
		  this._drill_target_X = this._drill_center_X;
     	  this._drill_target_Y = this._drill_center_Y;		
	    } else { 
		  this._drill_target_X = $gameTemp._drill_cam_select_single[1][0];
     	  this._drill_target_Y = $gameTemp._drill_cam_select_single[1][1];
	    };
    } else if (this.drill_isCamBeingAttack()) {
		  if (!$gameSystem.isSideView() && $gameTemp._drill_cam_being_attack[0].isActor()) {
			this.drill_setToCenter();
		  } else {
		    this._drill_target_X = $gameTemp._drill_cam_being_attack[1][0];
     	    this._drill_target_Y = $gameTemp._drill_cam_being_attack[1][1];
		  };
		  //if (TouchInput.isCancelled()) {alert("TEST")}

	} else if (this.drill_isCamTarget()) {
		  this._drill_target_X = $gameTemp._drill_cam_select_single_turn[1][0];
     	  this._drill_target_Y = $gameTemp._drill_cam_select_single_turn[1][1];
	} else if (this.drill_isCamActor()) {
		  this._drill_target_X = $gameTemp._drill_cam_cur_actor[1][0];
     	  this._drill_target_Y = $gameTemp._drill_cam_cur_actor[1][1];		 
	} else {
		this.drill_setToCenter();
	};
};


//==============================
// * 镜头 - 设置移动到中心
//==============================
Spriteset_Battle.prototype.drill_setToCenter = function() {
	this._drill_target_X = this._drill_center_X;
	this._drill_target_Y = this._drill_center_Y;
};

//==============================
// * 镜头 - 判断移动到中心
//==============================
Spriteset_Battle.prototype.drill_needToCenter = function() {
	if ($gameTemp._drill_cam_select_all) {return true};
	if ($gameTemp._drill_cam_select_all_turn) {return true};
	if ($gameTemp._drill_battleEnd) {return true};
	return false
};

//==============================
// * 镜头 - 判断受伤害目标
//==============================
Spriteset_Battle.prototype.drill_isCamBeingAttack = function() {
	if (!$gameTemp._drill_cam_being_attack) {return false};
	if (!$gameTemp._drill_cam_being_attack[0]) {return false};
	if ($gameTemp._drill_cam_being_attack[2] === 0) {return false};
	if (Imported.MOG_ATB) {
	    if (this._phase != 'start') {return false};
	};
	return true;
};

//==============================
// * 镜头 - 判断选择目标
//==============================
Spriteset_Battle.prototype.drill_isCamTarget = function() {
	if (!$gameTemp._drill_cam_select_single_turn) {return false};
	if (!$gameTemp._drill_cam_select_single_turn[0]) {return false};
	if (!$gameSystem.isSideView() && $gameTemp._drill_cam_select_single_turn[0].isActor()) {return false};
	return true;
};

//==============================
// * 镜头 - 判断角色
//==============================
Spriteset_Battle.prototype.drill_isCamActor = function() {
    if (!$gameSystem.isSideView()) {return false};
	if (!$gameTemp._drill_cam_cur_actor) {return false};
	if (!$gameTemp._drill_cam_cur_actor[0]) {return false};
	return true;
};

//==============================
// * 镜头 - 移动镜头
//==============================
Spriteset_Battle.prototype.drill_updateCameraMove = function() {
	var tar_x = this._drill_center_X - this._drill_target_X + this._drill_target_XF;
	var tar_y = this._drill_center_Y - this._drill_target_Y + this._drill_target_YF;
	var lim_x = Math.max($gameSystem._drill_cam_limit_width /2 - Graphics.boxWidth / 2,0);
	var lim_y = Math.max($gameSystem._drill_cam_limit_height /2 - Graphics.boxHeight / 2,0);
	var cur_x = this._battleField.x;
	var cur_y = this._battleField.y;
	var speed_x = $gameSystem._drill_cam_speed;
	var speed_y = $gameSystem._drill_cam_speed;
	
	if( tar_x > lim_x ){ tar_x = lim_x; }		//镜头架限制
	if( tar_x < -lim_x ){ tar_x = -lim_x; }
	if( tar_y > lim_y ){ tar_y = lim_y; }
	if( tar_y < -lim_y ){ tar_y = -lim_y; }
	
	if( cur_x < tar_x ){
		if( DrillUp.camera_type == '弹性移动' ){ speed_x = Math.max( (tar_x - cur_x)/speed_x , 1 ); }
		cur_x += speed_x;
		if( cur_x > tar_x ){
			cur_x = tar_x;
		}
	}
	if( cur_x > tar_x ){
		if( DrillUp.camera_type == '弹性移动' ){ speed_x = Math.max( (cur_x - tar_x)/speed_x , 1 ); }
		cur_x -= speed_x;
		if( cur_x < tar_x ){
			cur_x = tar_x;
		}
	}
	if( cur_y < tar_y ){
		if( DrillUp.camera_type == '弹性移动' ){ speed_y = Math.max( (tar_y - cur_y)/speed_y , 1 ); }
		cur_y += speed_y;
		if( cur_y > tar_y ){
			cur_y = tar_y;
		}
	}
	if( cur_y > tar_y ){
		if( DrillUp.camera_type == '弹性移动' ){ speed_y = Math.max( (cur_y - tar_y)/speed_y , 1 ); }
		cur_y -= speed_y;
		if( cur_y < tar_y ){
			cur_y = tar_y;
		}
	}
	$gameTemp._drill_cam_result_move_X = cur_x - this._battleField.x;
	$gameTemp._drill_cam_result_move_Y = cur_y - this._battleField.y;
	this._battleField.x = cur_x ;
	this._battleField.y = cur_y ;
	//this._battleField.x = cur_x * 1.2;
	//this._battleField.y = cur_y * 1.2;
	//this._battleField.scale.x = 1.20 ;
	//this._battleField.scale.y = 1.20 ;
	
	$gameTemp._drill_cam_pos = [this._battleField.x,this._battleField.y];
    //if (Imported.MOG_BattlebackEX) {this.update_bbex_cam()};
};

//=============================================================================
// ** 其它mog插件兼容
//=============================================================================

var _drill_mog_ballon_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
	_drill_mog_ballon_update.call(this);
	if (Imported.MOG_BalloonActionName && this._balloonField) {	// 技能 - 招式名气泡框
		this._balloonField.x = this._battleField.x
		this._balloonField.y = this._battleField.y
	};
	if (Imported.MOG_ChainCommands && this._bchain) {		// 技能 - 按键连锁攻击
	   this._bchain.x = this._battleField.x;
	   this._bchain.y = this._battleField.y;
	};
	if (Imported.MOG_HPGauge && this._hpField) {		// 敌人 - 生命浮动框
		this._hpField.x = this._battleField.x
		this._hpField.y = this._battleField.y
	};
};


if (Imported.MOG_ChainCommands) {
	var _drill_mog_updateFocus = Spriteset_Battle.prototype.updateFocus;
	Spriteset_Battle.prototype.updateFocus = function() {
		if ($gameTemp._bchainTemp) {$gameTemp._drill_cam_being_attack[2] = 0};//技能 - 按键连锁攻击（下一段招不等待）
		_drill_mog_updateFocus.call(this);
	};
};

// 天气效果 暂时没有加关联

/*
//==============================
// * Update BBex Cam
//==============================
Spriteset_Battle.prototype.update_bbex_cam = function() {
	 if (this._back1Sprite) {
	    this.updateBbCamMode(this._back1Sprite,0);
	    this.updateBbCamMode(this._back2Sprite,1);
	 };
	 for (var i = 2; i < this._bbData.length; i++) {	   
	   this.updateBbCamMode(this._backSpriteEx[i],i);
	 };	 
};

//==============================
// * updateBCamMode
//==============================
Spriteset_Battle.prototype.updateBbCamMode = function(sprite,index) {
	if (this._bbData[index] && this._bbData[index][5]) {
		var rate = this._bbData[index][5]; 
	} else {
		var rate = 0;
	};
	sprite.x = -(this._battleField.x * (rate / 100)) + this._drill_center_X;
	sprite.y = -(this._battleField.y * (rate / 100)) + this._drill_center_Y;	
};
*/


/*
//==============================
// * locateBattleback
//==============================
var _alias_mog_bcam_locateBattleback = Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
	  if ($gameSystem._drill_cam_enable) {
         if (this.scale_back) {return};
	     if (!this._back1Sprite.bitmap.isReady()||!this._back2Sprite.bitmap.isReady()) {return};
	     this.scale_back = true;
	     this.setBackScaleCam(this._back1Sprite);
		 this.setBackScaleCam(this._back2Sprite);
		 if (Imported.MOG_BattlebackEX) {
		 	for (var i = 2; i < this._bbData.length; i++) {	   
			   this.setBackScaleCam(this._backSpriteEx[i]);
	        };
	     };
		 return
      };
	  _alias_mog_bcam_locateBattleback.call(this);
};

//==============================
// * SetBackScaleCam
//==============================
Spriteset_Battle.prototype.setBackScaleCam = function(sprite) {
	  if (!sprite.bitmap) {return};
	  var margin = 32;
	  var width = DrillUp.camera_limit_width + margin * 2;
	  var height = DrillUp.camera_limit_height + margin * 2;
	  if (sprite.bitmap.width < width) {sprite.scale.x = width / sprite.bitmap.width};
	  if (sprite.bitmap.height < height) {sprite.scale.y = height / sprite.bitmap.height};
      this.sizeBattleback(sprite);
	  if (Utils.RPGMAKER_VERSION >= "1.3.3") this.setCamBBOrgInit(sprite);
	  this.centerBattleback(sprite,width,height);
};	
//==============================
// * set Cam BB Org Int
//==============================
Spriteset_Battle.prototype.setCamBBOrgInit = function(sprite) {
    sprite.origin.x = Graphics.boxWidth / 2;;
	sprite.origin.y = Graphics.boxHeight / 2;
};		
	
//==============================
// * SiszeBattleback
//==============================
Spriteset_Battle.prototype.sizeBattleback = function(sprite,nw,nh) {
	  var margin = 32;
      var width = Graphics.width + margin * 2;
      var height = Graphics.height + margin * 2;	
	  if (sprite.bitmap.width > width) {width = sprite.bitmap.width };
	  if (sprite.bitmap.height > height) {height = sprite.bitmap.height};
	  sprite.move(-margin,-margin,width, height);
};	
	*/