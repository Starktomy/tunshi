//=============================================================================
// Drill_Jump.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        物体 - 跳跃能力
 * @author Drill_up
 * 
 * @param 跳跃音效
 * @desc 跳跃时，播放的音效。
 * @require 1
 * @dir audio/se/
 * @type file
 * @default Jump1
 *
 * @param 跳跃延迟
 * @type number
 * @min 0
 * @desc 跳跃后，下次跳跃需要等待的时间，单位帧。（1秒60帧）
 * @default 60
 *
 * @param 载具是否能跳
 * @type boolean
 * @on 能跳
 * @off 不能跳
 * @desc true - 能跳，false - 不能跳。
 * @default false
 * 
 * @param 悬崖高度1
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度1，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["1"]
 * 
 * @param 悬崖高度2
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度2，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["2"]
 * 
 * @param 悬崖高度3
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度3，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default ["3"]
 * 
 * @param 悬崖高度4
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度4，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default 
 * 
 * @param 悬崖高度5
 * @type number[]
 * @min 0
 * @max 255
 * @desc 填入区域id，会被视作高度5，即绘图的R选项中的区域，未填的区域默认高度0。
 * @default 
 * 
 * @param 跳跃高度差
 * @type variable
 * @desc 跳跃时产生的高度差将会被赋值到指定的变量。（你需要用计时器实时判断这个变量的变化情况）
 * @default 0
 * 
 * @param 跳跃前的位置 X
 * @type variable
 * @desc 跳跃前的x位置，单位图块。（设置返回原地用）
 * @default 0
 * 
 * @param 跳跃前的位置 Y
 * @type variable
 * @desc 跳跃前的y位置，单位图块。（设置返回原地用）
 * @default 0
 * 
 * @help  
 * =============================================================================
 * +++ Drill_Jump +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得地图的角色具有跳跃能力。
 *
 * -----------------------------------------------------------------------------
 * ----关于跳跃操作
 * 鼠标 - 鼠标双击跳跃，或者长按，在不能移动的地方自动跳跃。
 * 键盘 - "Q"键跳跃
 * 手柄 - "LB"键跳跃
 *
 * -----------------------------------------------------------------------------
 * ----关于悬崖高度
 * 1.如果你设置了山丘的高度。从高的地方可以跳到低的高度，反之不能跳。
 * 2.跳跃高度设置了变量后，你可以根据高度设计玩家是否摔死或者返回原地。
 * 3.如果你在悬崖12345都设置了同一个区域，那么按最低的悬崖算。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令设置载具或者角色能不能跳。
 *
 * 插件指令（角色能跳）：  actor_jump_enable
 * 插件指令（角色不能跳）：actor_jump_disable
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件只对跳跃能力jump_enable作局部，其它变量混用】
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_Jump = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_Jump');
	DrillUp.jump_se = String(DrillUp.parameters['跳跃音效']);
	DrillUp.jump_delay = Number(DrillUp.parameters['跳跃延迟'] || 60);
	DrillUp.jump_diff_var = Number(DrillUp.parameters['跳跃高度差'] || 0);
	DrillUp.jump_org_x = Number(DrillUp.parameters['跳跃前的位置 X'] || 0);
	DrillUp.jump_org_y = Number(DrillUp.parameters['跳跃前的位置 Y'] || 0);
	DrillUp.jump_mouse = false;
	DrillUp.jump_cliff_1 = [];
	DrillUp.jump_cliff_2 = [];
	DrillUp.jump_cliff_3 = [];
	DrillUp.jump_cliff_4 = [];
	DrillUp.jump_cliff_5 = [];
	if( DrillUp.parameters['悬崖高度1'] != "" ){
		DrillUp.jump_cliff_1 = JSON.parse(DrillUp.parameters['悬崖高度1']);
	}else{
		DrillUp.jump_cliff_1 = [] ;
	}
	if( DrillUp.parameters['悬崖高度2'] != "" ){
		DrillUp.jump_cliff_2 = JSON.parse(DrillUp.parameters['悬崖高度2']);
	}else{
		DrillUp.jump_cliff_2 = [] ;
	}
	if( DrillUp.parameters['悬崖高度3'] != "" ){
		DrillUp.jump_cliff_3 = JSON.parse(DrillUp.parameters['悬崖高度3']);
	}else{
		DrillUp.jump_cliff_3 = [] ;
	}
	if( DrillUp.parameters['悬崖高度4'] != "" ){
		DrillUp.jump_cliff_4 = JSON.parse(DrillUp.parameters['悬崖高度4']);
	}else{
		DrillUp.jump_cliff_4 = [] ;
	}
	if( DrillUp.parameters['悬崖高度5'] != "" ){
		DrillUp.jump_cliff_5 = JSON.parse(DrillUp.parameters['悬崖高度5']);
	}else{
		DrillUp.jump_cliff_5 = [] ;
	}

//==============================
// * PluginCommand 插件指令
//==============================
var _drill_jump_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_jump_pluginCommand.call(this,command, args);
	if (command === "actor_jump_enable")  { $gameSystem.jump_enable = true;};
	if (command === "actor_jump_disable")  { $gameSystem.jump_enable = false;};
	return true;
};

//==============================
// * Play JumpSE
//==============================
SoundManager.playJumpSE = function(fileName){
   var se = {};
   se.name = fileName;
   se.pitch = 100;
   se.volume = 100;
   AudioManager.playSe(se);
};  

//=============================================================================
// ** Game_CharacterBase角色设置
//=============================================================================

//==============================
// * 跳跃延迟初始化
//==============================
var _drill_jump_initialize = Game_Player.prototype.initialize;
Game_Player.prototype.initialize = function() {
	_drill_jump_initialize.call(this);
	this._jump_time_delay = 0;
	if( $gameSystem.jump_enable === undefined ){ $gameSystem.jump_enable = true;}
};

//==============================
// * 鼠标点击初始化
//==============================
var _drill_jump_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _drill_jump_temp_initialize.call(this);
	this._destination_push = true;
	this._destination_count = 0;
	this._destination_timer = 0;
};

//==============================
// * 鼠标点击 位置锁
//==============================
var _drill_jump_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
	_drill_jump_setDestination.call(this,x,y);
	if(this._destination_push){				//移动到位置-锁 （被取消移动，或者没有移动，只会被捕获一次）
		this._destination_push = false;
	}
};

//==============================
// * 鼠标点击 位置锁
//==============================
var _drill_jump_clearDestination = Game_Temp.prototype.clearDestination;
Game_Temp.prototype.clearDestination = function() {
	_drill_jump_clearDestination.call(this);
	if(!this._destination_push){
		this._destination_push = true;
		this._destination_count += 1;
		this._destination_timer = 0;
		if( this._destination_count >= 2 ){		//长按鼠标计数器
			this._destination_count = 0;
			DrillUp.jump_mouse = true;
		}
	}
};

//==============================
// * 鼠标点击计时器
//==============================
var _drill_jump_player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
	_drill_jump_player_update.call(this,sceneActive);
	$gameTemp._destination_timer += 1;
	if( $gameTemp._destination_timer >= 18 ){	//时间衰退计时器（间隔过长的两次鼠标点击，不会跳）
		$gameTemp._destination_timer = 0;
		$gameTemp._destination_count = 0;
	}
}
//==============================
// * 起跳
//==============================
var _drill_jump_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	this._jump_time_delay += 1;
	if (!this.isJumping() 										//正在跳时，禁止再跳
		&& (Input.isPressed('pageup') || DrillUp.jump_mouse)	//按键、鼠标未按，禁止跳跃
		&& this._jump_time_delay > DrillUp.jump_delay			//未达到跳跃延迟，禁止再跳
		&& !$gameMessage.isBusy()								//和人物对话时，禁止跳跃（npc话没说完就跳跑了……）
		&& !this.isInVehicle()									//在载具里面，禁止跳跃
		&& $gameSystem.jump_enable								//插件指令开关（开关状态随存档一起存储）
		) {
		DrillUp.jump_mouse = false;
		SoundManager.playJumpSE(String(DrillUp.jump_se));
		this._jump_time_delay = 0;
		var r = 2;
		var xr = 0;	
		var yr = 0;	
		var cur_cliff = this.getPosCliff(this._x, this._y);
        $gameVariables.setValue(DrillUp.jump_org_x, this._x );
        $gameVariables.setValue(DrillUp.jump_org_y, this._y );
		if (this._direction === 2) {
			x = this._x; y = this._y + r - 1; x2 = 0; y2 = +r;
			for (var i = 0; i < r; i++) {
				if (this.canPassJump(x,y,this._direction,cur_cliff)) {xr = x2; yr = y2;break};
				y--;y2--;
			};	
		} else if (this._direction === 4) {
			x = this._x - r + 1; y = this._y; x2 = -r; y2 = 0;
			for (var i = 0; i < r; i++) {
				if (this.canPassJump(x,y,this._direction,cur_cliff)) {xr = x2; yr = y2;break};
				x++;x2++;
			};	    
		} else if (this._direction === 6) {
			x = this._x + r - 1; y = this._y; x2 = +r; y2 = 0;
			for (var i = 0; i < r; i++) {
				if (this.canPassJump(x,y,this._direction,cur_cliff)) {xr = x2; yr = y2;break};
				x--;x2--;
			};			
		} else if (this._direction === 8) {
			x = this._x; y = this._y - r + 1; x2 = 0; y2 = -r;
			for (var i = 0; i < r; i++) {
				if (this.canPassJump(x,y,this._direction,cur_cliff)) {xr = x2; yr = y2;break};
				y++;y2++;
			};
		};
		this.jump(xr,yr);
		return;
	};
	_drill_jump_moveByInput.call(this);	
};

//==============================
// * 判断悬崖
//==============================
Game_CharacterBase.prototype.getPosCliff = function(x, y) {
	var r_id = $gameMap.regionId(x,y);
	for(var i = 0;i< DrillUp.jump_cliff_1.length ;i++){
		if( r_id == DrillUp.jump_cliff_1[i] ){
			return 1;
		}
	}
	for(var i = 0;i< DrillUp.jump_cliff_2.length ;i++){
		if( r_id == DrillUp.jump_cliff_2[i] ){
			return 2;
		}
	}
	for(var i = 0;i< DrillUp.jump_cliff_3.length ;i++){
		if( r_id == DrillUp.jump_cliff_3[i] ){
			return 3;
		}
	}
	for(var i = 0;i< DrillUp.jump_cliff_4.length ;i++){
		if( r_id == DrillUp.jump_cliff_4[i] ){
			return 4;
		}
	}
	for(var i = 0;i< DrillUp.jump_cliff_5.length ;i++){
		if( r_id == DrillUp.jump_cliff_5[i] ){
			return 5;
		}
	}
	return 0;
}

//==============================
// * 跳跃目的地寻找
//==============================
Game_CharacterBase.prototype.canPassJump = function(x, y, d,cur_cliff) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
	if (d === 2) {x3 = x; y3 = y + 1;	
	} else if (d === 4) {x3 = x - 1;y3 = y;		
	} else if (d === 6) {x3 = x + 1;y3 = y;	
	} else {x3 = x;y3 = y - 1;
	};
    if ( this.getPosCliff(x2, y2) > cur_cliff ) {
        return false;
    };
    if (!$gameMap.isValid(x2, y2)) {
        return false;
    };
    if (this.isThrough() || this.isDebugThrough()) {
        $gameVariables.setValue(DrillUp.jump_diff_var, Math.abs(this.getPosCliff(x2, y2) - cur_cliff) );
        return true;
    };
    if (!$gameMap.isPassable(x3, y3)) {
        return false;
    };
    if (this.isCollidedWithCharacters(x2, y2)) {
        return false;
    };
    $gameVariables.setValue(DrillUp.jump_diff_var, Math.abs(this.getPosCliff(x2, y2) - cur_cliff) );
    return true;
};

