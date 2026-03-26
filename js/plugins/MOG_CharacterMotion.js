//=============================================================================
// MOG_CharacterMotion.js
//=============================================================================

/*:
 * @plugindesc (v1.3)[v1.0]  地图 - 事件呼吸效果 + 事件动作效果
 * @author Moghunter （Drill_up翻译）
 + 
 * @help  
 * =============================================================================
 * +++ MOG - Character Motion (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 使得地图NPC能使用呼吸效果或者动作效果。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件呼吸效果
 * 要使用呼吸效果，需要在事件中添加注释，并含以下关键字：
 *
 * Breath Mode : 1 （呼吸-普通呼吸）
 * Breath Mode : 2 （呼吸-较急促呼吸）
 * Breath Mode : 3 （呼吸-膨胀呼吸）
 *  
 * Float Mode （浮动）
 *
 * Swing Mode （摇晃）
 *
 * Ghost Mode : 1 （鬼魂-线性透明，变完全透明，然后变完全不透明） 
 * Ghost Mode : 2 （鬼魂-曲线透明，变透明前先 时隐时现一下）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件动作效果
 * 你可以通过插件指令设置呼吸效果。（注意格式，冒号左右都有空格）
 *
 * 插件指令（呼吸）：breath_mode_event_id : A : B
 * 插件指令（浮动）：float_mode_event_id : A
 * 插件指令（摇晃）：swing_mode_event_id : A
 * 插件指令（鬼魂）：ghost_mode_event_id : A : B
 *
 * 参数A：表示事件的id号。
 * 参数B：与模式的编号有关系。比如：
 *        breath_mode_event_id : 1 : 2（事件1使用较急促的呼吸）
 *
 * 与此同时，插件提供额外短暂的动作效果。
 *
 * 插件指令（震动）：shake_effects_event_id : A : C
 * 插件指令（摧毁）：collpase_effect_event_id : A : D
 * 插件指令（旋转）：rotation_event_id : A : E
 * 插件指令（缩放）：zoom_event_id : A : F
 * 
 * 参数C：持续时间
 *        填入持续时间数字，单位为帧。（1秒60帧）
 * 参数D：摧毁模式
 *        播放摧毁动画效果，填入数字。（事件并不是真的被摧毁了）
 *        1-纵向收缩，2-横向压扁，3-弹性收缩
 * 参数E：旋转角度
 *        3.14表示逆时针旋转到半圈位置，6.28表示逆时针旋转到一周位置。
 *        旋转之后，不会恢复成原来的样子。
 * 参数F：缩放
 *        0.5表示缩放到50%的大小，1.2表示缩放到120%的大小。
 *        缩放之后，不会恢复成原来的样子。
 *
 * 如果你要使指定的事件瞬间恢复到原来的样子，使用下面的指令：
 *
 * 插件指令（清除）：clear_effects_event_id : A
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 事件动作效果（玩家队伍的人物）
 * 注意，玩家人物和事件人物的插件指令有些不同，
 * 注意区分 breath_mode_event_id 和 breath_mode_follower_id 。
 *
 * 插件指令（呼吸）：breath_mode_follower_id : A : B
 * 插件指令（浮动）：float_mode_follower_id : A
 * 插件指令（摇晃）：swing_mode_follower_id : A
 * 插件指令（鬼魂）：ghost_mode_follower_id : A : B
 *
 * 参数A：表示玩家的id号。
 *        0表示玩家本人，1表示玩家后面第1个跟随者。以此类推。
 * 参数B：与模式的编号有关系。比如：
 *        breath_mode_follower_id : 1 : 2（第1个跟随者使用较急促的呼吸）
 *        
 * 与此同时，插件提供额外短暂的动作效果。
 *
 * 插件指令（震动）：shake_effects_follower_id : A : C
 * 插件指令（摧毁）：collpase_follower_event_id : A : D
 * 插件指令（旋转）：rotation_follower_id : A : E
 * 插件指令（缩放）：zoom_follower_id : A : F
 * 插件指令（清除）：clear_effects_follower_id : A
 *
 * 玩家的参数和事件的一致，但是要注意event和follower的区别。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_CharacterMotion = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_CharacterMotion');
	
//=============================================================================
// ** Game Character Base
//=============================================================================

//==============================
// * InitMembers
//==============================
var _mog_spChar_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	_mog_spChar_initMembers.call(this) 
	this.charEffectsClear();
};

//==============================
// * spCharSetup
//==============================
Game_CharacterBase.prototype.charEffectsClear = function() {
	this._charEffectChecked = false;
	this._actionZoomData = {};
	this._actionZoomData.enabled = false;
	this._actionZoomData.loop = true;
	this._actionZoomData.returnBack = false;
	this._actionZoomData.mode = 0;
	this._actionZoomData.zoom = 0;
	this._zoomData = [1.00,1.00,1.00,1.00];
	this._rotationData = [0,0];
	this._swingData = [0,0,0,0,0,0,false];
	this._floatData = [0,0,0,0,0,0,false];
	this._breathData = [0,0,0,0,0,0,false];
	this._ghostData = [0,0,0,0,0,0,false];
	this._shakeData = [0,0,0,0,0,0,false];
	this._collapseData = [0,0,0,0,0,0,false];
};

//==============================
// * char Zoom Act
//==============================
Game_CharacterBase.prototype.charZoomAct = function(enable,loop) {
	if (!this._actionZoomData.enabled) {
		this._actionZoomData.enabled = true
	};
	var loop = loop != null ? loop : enable;
	this._actionZoomData.loop = loop;
};

//==============================
// * Base New Parameters
//==============================
Game_CharacterBase.prototype.baseParametersClear = function() {
    this._zoomData[2] = 1.00;
	this._zoomData[3] = 1.00;
	this._rotationData[1] = 0;
};

//==============================
// * Set New Parameters
//==============================
Game_CharacterBase.prototype.setNewParameters = function() {
    this._zoomData[0] = this.setCharNewPar(this._zoomData[0],this._zoomData[2],30);
	this._zoomData[1] = this.setCharNewPar(this._zoomData[1],this._zoomData[3],30);
	this._rotationData[0] = this.setCharNewPar(this._rotationData[0],this._rotationData[1],30);
};

//==============================
// * set New Par
//==============================
Game_CharacterBase.prototype.setCharNewPar = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 0.001 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};

//==============================
// * char Collapse Clear
//==============================
Game_CharacterBase.prototype.charCollapseClear = function(mode) {
	this._collapseData = [0,0,0,0,0,255,false];
	if (mode === 1) {this._collapseData[5] = 0};
	this._shakeData = [0,0,0,0,0,0,false];
};

//==============================
// * is Swing
//==============================
Game_CharacterBase.prototype.isSwing = function() {
	return this._swingData[0] > 0;
};

//==============================
// * is Float Data
//==============================
Game_CharacterBase.prototype.isFlying = function() {
	return this._floatData[0] > 0;
};

//==============================
// * is Breathing
//==============================
Game_CharacterBase.prototype.isBreathing = function() {
	if (this._actionZoomData.enabled) {return false};
	return this._breathData[0] > 0;
};

//==============================
// * is Breath Act
//==============================
Game_CharacterBase.prototype.isBreathAct = function() {
	return this._actionZoomData.enabled;
}; 

//==============================
// * is Ghost Mode
//==============================
Game_CharacterBase.prototype.isGhostMode = function() {
	return this._ghostData[0] > 0;
};

//==============================
// * is Shaking
//==============================
Game_CharacterBase.prototype.isShaking = function() {
	return this._shakeData[0] > 0;
};

//==============================
// * is Collapsing
//==============================
Game_CharacterBase.prototype.isCollapsing = function() {
	return this._collapseData[0] > 0;
};

//==============================
// * motionX
//==============================
Game_CharacterBase.prototype.motionX = function() {
	return this._shakeData[1];
};

//==============================
// * motionY
//==============================
Game_CharacterBase.prototype.motionY = function() {
	return this._floatData[1];
};

//==============================
// * motionR
//==============================
Game_CharacterBase.prototype.motionR = function() {
	var n = this._rotationData[0] + this._swingData[1]
	if (Imported.MOG_ChronoEngine) {
	    n += this._user.rotation[0];
	};
	return n;
};

//==============================
// * motion ZX
//==============================
Game_CharacterBase.prototype.motionZX = function() {
	return this._zoomData[0] + this._breathData[1] + this._collapseData[1] + this._actionZoomData.zoom;
};

//==============================
// * motion ZY
//==============================
Game_CharacterBase.prototype.motionZY = function() {
	return this._zoomData[1] + this._breathData[2] + this._collapseData[2] + this._actionZoomData.zoom;
};

//==============================
// * motion OP
//==============================
Game_CharacterBase.prototype.motionOP = function() {
	return -(this._ghostData[1] + this._collapseData[5]);
};

//=============================================================================
// ** Game Event
//=============================================================================

//==============================
// * Setup Page
//==============================
var _alias_mog_charmotion_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_alias_mog_charmotion_gevent_setupPage.call(this);
	this._actionZoomData.loop = false;
    if (!this._charEffectChecked) {this.checkCharMotion()};
};

//==============================
// * Check Char Motion
//==============================
Game_Event.prototype.checkCharMotion = function() {
	this.charEffectsClear()
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
	       if (l.code === 108) {
			   if (l.parameters[0].toLowerCase() == "float mode"){
                  this._floatData[0] = 1;
				  this._charEffectChecked = true;
			   };
			   if (l.parameters[0].toLowerCase() == "swing mode"){
                  this._swingData[0] = 1;
				  this._charEffectChecked = true;
			   };			   
			   var comment = l.parameters[0].split(' : ')
			   if (comment[0].toLowerCase() == "breath mode"){
                  this._breathData[0] = Number(comment[1]);
				  this._charEffectChecked = true;
			   };
			   if (comment[0].toLowerCase() == "ghost mode"){				   
                  this._ghostData[0] = Number(comment[1]);
				  this._charEffectChecked = true;
			   };				   		   	  
			};
	}, this);};
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_charmotion_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_charmotion_pluginCommand.call(this,command, args)
    this.checkFollowerCharEffects(command, args);
	this.checkEventsCharEffects(command, args);
	return;  
};
 
//==============================
// * checkFollowerCharEffects
//==============================
Game_Interpreter.prototype.checkFollowerCharEffects = function(command, args) {
	var npk = -1;
	var bparty_id = -2000;var gparty_id = -2000;var fparty_id = -2000;
	var sparty_id = -2000;var rparty_id = -2000;var zparty_id = -2000;
	var cparty_id = -2000;var colparty_id = -2000;var shparty_id = -2000
	if (command === "breath_mode_follower_id")  {var bparty_id = Number(args[1]); 
		npk = bparty_id === 0 ? 0 : 1};
	if (command === "ghost_mode_follower_id")  {var gparty_id = Number(args[1]); 
		npk = gparty_id === 0 ? 0 : 1};	
	if (command === "float_mode_follower_id")  {var fparty_id = Number(args[1]); 
		npk = fparty_id === 0 ? 0 : 1};		
	if (command === "swing_mode_follower_id")  {var sparty_id = Number(args[1]); 
		npk = sparty_id === 0 ? 0 : 1};	
	if (command === "rotation_follower_id")  {var rparty_id = Number(args[1]); 
		npk = rparty_id === 0 ? 0 : 1};		
	if (command === "zoom_follower_id")  {var zparty_id = Number(args[1]); 
		npk = zparty_id === 0 ? 0 : 1};
	if (command === "collapse_effect_follower_id")  {var colparty_id = Number(args[1]); 
		npk = colparty_id === 0 ? 0 : 1};		
	if (command === "clear_effects_follower_id")  {var cparty_id = Number(args[1]); 
		npk = cparty_id === 0 ? 0 : 1};	
	if (command === "shake_effects_follower_id")  {var shparty_id = Number(args[1]); 
		npk = shparty_id === 0 ? 0 : 1};						
	if (npk === 0) {
		if (bparty_id === 0) {$gamePlayer._breathData[0] = Number(args[3])};
		if (gparty_id === 0) {$gamePlayer._ghostData[0] = Number(args[3])};
		if (fparty_id === 0) {$gamePlayer._floatData[0] = 1};
		if (sparty_id === 0) {$gamePlayer._swingData[0] = 1};
		if (rparty_id === 0) {$gamePlayer._rotationData[1] = Number(args[3])};
		if (colparty_id === 0) {$gamePlayer._collapseData[0] = Number(args[3])};
		if (shparty_id === 0) {$gamePlayer._shakeData[0] = Number(args[3])};
		if (zparty_id === 0) {		
		    $gamePlayer._zoomData[2] = Number(args[3]);
			$gamePlayer._zoomData[3] = Number(args[3]);
		};
		if (cparty_id === 0) {$gamePlayer.charEffectsClear()};
	};		
	if (npk === 1) {
	var index = 0;
	$gamePlayer.followers().forEach(function(follower) {
        if (index === bparty_id - 1) {follower._breathData[0] = Number(args[3])};
		if (index === gparty_id - 1) {follower._ghostData[0] = Number(args[3])};
		if (index === fparty_id - 1) {follower._floatData[0] = 1};
		if (index === sparty_id - 1) {follower._swingData[0] = 1};
		if (index === rparty_id - 1) {follower._rotationData[1] = Number(args[3])};
		if (index === shparty_id - 1) {follower._shakeData[0] = Number(args[3])};	
		if (index === colparty_id - 1) {follower._collapseData[0] = Number(args[3])};	
		if (index === zparty_id - 1) {
			follower._zoomData[2] = Number(args[3]);
		    follower._zoomData[3] = Number(args[3]);		
		};
		if (index === cparty_id - 1) {follower.charEffectsClear()};
	    index ++;
    }, this);
    };
};

//==============================
// * checkEventsCharEffects
//==============================
Game_Interpreter.prototype.checkEventsCharEffects = function(command, args) {
	var nck = false;	
	if (command === "breath_mode_event_id")  {var bevent_id = Number(args[1]); nck = true};
	if (command === "ghost_mode_event_id")  {var gevent_id = Number(args[1]); nck = true};
	if (command === "float_mode_event_id")  {var fevent_id = Number(args[1]); nck = true};
	if (command === "swing_mode_event_id")  {var sevent_id = Number(args[1]); nck = true};
	if (command === "collpase_effect_event_id")  {var colevent_id = Number(args[1]); nck = true};	
	if (command === "zoom_event_id")  {var zevent_id = Number(args[1]); nck = true};
	if (command === "rotation_event_id")  {var revent_id = Number(args[1]); nck = true};
	if (command === "shake_effects_event_id")  {var shevent_id = Number(args[1]); nck = true};
	if (command === "clear_effects_event_id")  {var cevent_id = Number(args[1]); nck = true};
	if (nck) {
		$gameMap.events().forEach(function(event) {
		if (event.eventId() === bevent_id) {event._breathData[0] = Number(args[3])};
		if (event.eventId() === gevent_id) {event._ghostData[0] = Number(args[3])};
		if (event.eventId() === fevent_id) {event._floatData[0] = 1};
		if (event.eventId() === sevent_id) {event._swingData[0] = 1};
		if (event.eventId() === revent_id) {event._rotationData[1] = Number(args[3])};
		if (event.eventId() === shevent_id) {event._shakeData[0] = Number(args[3])};
		if (event.eventId() === colevent_id) {event._collapseData[0] = Number(args[3])};
		if (event.eventId() === zevent_id) {
			event._zoomData[2] = Number(args[3]);event._zoomData[3] = Number(args[3]);
		};
		if (event.eventId() === cevent_id) {event.charEffectsClear()};
		}, this);	
	};
};

//=============================================================================
// ** Sprite Character
//=============================================================================

//==============================
// * Update
//==============================
var mog_prChar_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	mog_prChar_update.call(this);
	if (this._character) {this.updateSprEffect()};
};

//==============================
// * Update Spr Effect
//==============================
Sprite_Character.prototype.updateSprEffect = function() {   
    if (Imported.MOG_ChronoEngine && this._character._user.treasure[0]) {
        return
	};
	if (this._character.isCollapsing()) {this.updateCollapseEffect()
	} else {
	   if (this._character.isSwing()) {this.updateSwingEffect()};
	   if (this._character.isFlying()) {this.updateFloatEffect()};
	   if (this._character.isBreathAct()) {
		   this.updateBreathActEffect();
	   } else if (this._character.isBreathing()) {
		   this.updateBreathEffect()};
	   if (this._character.isShaking()) {this.updateShakeEffect()};
	   if (this._character.isGhostMode()) {this.updateGhostEffect()};
	};
	this.updateSprParameters();
};

//==============================
// * Update Spr Parameters
//==============================
Sprite_Character.prototype.updateSprParameters = function() {
	this._character.setNewParameters();
	this.x += this._character.motionX();
	this.y += this._character.motionY();
	this.opacity += this._character.motionOP();
	this.rotation = this._character.motionR();
	this.scale.x = this._character.motionZX();
	this.scale.y = this._character.motionZY();
};

//==============================
// * set Ghost Data
//==============================
Sprite_Character.prototype.setGhostData = function() {
        this._character._ghostData[6] = true;
		var rz = Math.randomInt(255);
		this._character._ghostData[1] = rz;
		this._character._ghostData[3] = 0;
		this._character._ghostData[5] = this._character._ghostData[0] === 1 ? 0 : 120;
		if (this._character._ghostData[1] < this._character._ghostData[5]) {
			this._character._ghostData[1] = this._character._ghostData[5]; 
		};
};

//==============================
// * Update Ghost Effect
//==============================
Sprite_Character.prototype.updateGhostEffect = function() {
	if (!this._character._ghostData[6]) {this.setGhostData()};
	this.updateGhostEffect1();
};

//==============================
// * Update Ghost Effect 1
//==============================
Sprite_Character.prototype.updateGhostEffect1 = function() {	
	if (this._character._ghostData[3] > 0) {
	    this._character._ghostData[3] --;
		return;
    };
	if (this._character._ghostData[4] === 0) {
	    this._character._ghostData[1] -= 3;
		if (this._character._ghostData[1] <= this._character._ghostData[5]) {
			this._character._ghostData[4] = 1;
		    this._character._ghostData[3] = 60;		
		};
	} else {
		this._character._ghostData[1] += 3;
		if (this._character._ghostData[1] >= 255) {
			this._character._ghostData[4] = 0;
			this._character._ghostData[3] = 60;	
		};
	};
};

//==============================
// * set Swing Data
//==============================
Sprite_Character.prototype.setSwingData = function() {
        this._character._swingData[6] = true;
		var rz = Math.min(Math.max((Math.random() * 0.2).toFixed(3),0.1),0.2);
		this.rotation = -Number(rz);
		this._character._swingData[2] = Math.min(Math.max((Math.random() * 0.02).toFixed(3),0.015),0.02);
		this._character._swingData[3] = rz;
		this._character._swingData[4] = 0;
		this._character._swingData[5] = 0.005; 		
};

//==============================
// * Update Swing Effect
//==============================
Sprite_Character.prototype.updateSwingEffect = function() {
	if (!this._character._swingData[6]) {this.setSwingData()};
	if (this._character._swingData[0] === 1) {this.updateSwingEffect1();
	} else {this.updateSwingEffect2();};	
};

//==============================
// * Update Swing Effect 1
//==============================
Sprite_Character.prototype.updateSwingEffect1 = function() {
	if (this._character._swingData[4] === 0) {
	    this._character._swingData[1] += this._character._swingData[5];
		if (this._character._swingData[1] >= this._character._swingData[3]) {this._character._swingData[4] = 1};
	} else {
		this._character._swingData[1] -= this._character._swingData[5];
		if (this._character._swingData[1] <= -this._character._swingData[3]) {this._character._swingData[4] = 0};
	};
};

//==============================
// * Update Swing Effect 2
//==============================
Sprite_Character.prototype.updateSwingEffect2 = function() {
	this._character._swingData[1] += this._character._swingData[2];
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
};

//==============================
// * set Float Data
//==============================
Sprite_Character.prototype.setFloatData = function() {
        this._character._floatData[6] = true;
		var rz = Math.min(Math.max((Math.random() * 30).toFixed(3),5),20);
		this._character._floatData[1] = -Number(rz);
		this._character._floatData[3] = Number(rz);
    	var rz = Math.min(Math.max((Math.random() * 0.5).toFixed(2),0.1),0.3);
		this._character._floatData[5] = rz;
		this._character._floatData[4] = 1;
};

//==============================
// * Update Float Effect
//==============================
Sprite_Character.prototype.updateFloatEffect = function() {
	 if (!this._character._floatData[6]) {this.setFloatData()};
	 if (this._character._floatData[4] === 0) {
	     this._character._floatData[1] += this._character._floatData[5];
	  	if (this._character._floatData[1] >= 0) {this._character._floatData[4] = 1};
	 } else {
		this._character._floatData[1] -= this._character._floatData[5];
		if (this._character._floatData[1] <= -this._character._floatData[3]) {this._character._floatData[4] = 0};
	 };	 
};

//==============================
// * Update Breath Effect
//==============================
Sprite_Character.prototype.updateBreathEffect = function() {
	 if (!this._character._breathData[6]) {this.setBreathData()};
	 if (this._character._breathData[0] === 1) {this.updateBreathEffect1();
	 } else if (this._character._breathData[0] === 2) {this.updateBreathEffect2();
	 } else {this.updateBreathEffect3();
	 };	
};

//==============================
// * set Breath Data
//==============================
Sprite_Character.prototype.setBreathData = function() {
        this._character._breathData[6] = true;
		var rz = Math.min(Math.max((Math.random() * 0.1).toFixed(3),0.030),0.080);
		this.scale.y = 1.00 + Number(rz);
		this._character._breathData[3] = rz;
		this._character._breathData[4] = 0;
		this._character._breathData[5] = 0.0015;  
};

//==============================
// * Update Breath Effect 1
//==============================
Sprite_Character.prototype.updateBreathEffect1 = function() {    
	if (this._character._breathData[4] === 0) {
	    this._character._breathData[2] += this._character._breathData[5];
		if (this._character._breathData[2] >= this._character._breathData[3]) {this._character._breathData[4] = 1};
	} else {
		this._character._breathData[2] -= this._character._breathData[5];
		if (this._character._breathData[2] <= 0) {this._character._breathData[4] = 0};
	};
};

//==============================
// * Update Breath Effect 2
//==============================
Sprite_Character.prototype.updateBreathEffect2 = function() {    
	if (this._character._breathData[4] === 0) {
	    this._character._breathData[2] += this._character._breathData[5];
		this._character._breathData[1] -= this._character._breathData[5];
		if (this._character._breathData[2] >= this._character._breathData[3]) {this._character._breathData[4] = 1};
	} else {
		this._character._breathData[2] -= this._character._breathData[5];
		this._character._breathData[1] += this._character._breathData[5];
		if (this._character._breathData[2] <= 0) {this._character._breathData[4] = 0};
	};
};

//==============================
// * Update Breath Effect 3
//==============================
Sprite_Character.prototype.updateBreathEffect3 = function() {    
	if (this._character._breathData[4] === 0) {
	    this._character._breathData[2] += this._character._breathData[5];
		this._character._breathData[1] += this._character._breathData[5];
		if (this._character._breathData[2] >= this._character._breathData[3]) {this._character._breathData[4] = 1};
	} else {
		this._character._breathData[2] -= this._character._breathData[5];
		this._character._breathData[1] -= this._character._breathData[5];
		if (this._character._breathData[2] <= 0) {this._character._breathData[4] = 0};
	};
};

//==============================
// * Update Breath Act Effect
//==============================
Sprite_Character.prototype.updateBreathActEffect = function() {
	if (Imported.MOG_ChronoEngine && this._character.isKnockbacking()) {return};
	if (this._character._actionZoomData.mode === 0) {
		this._character._actionZoomData.zoom += 0.01;
		if (this._character._actionZoomData.zoom > 0.20) {
			this._character._actionZoomData.zoom = 0.20;
			this._character._actionZoomData.mode = 1;
		};
	} else {
		this._character._actionZoomData.zoom -= 0.01;
		if (this._character._actionZoomData.zoom < 0) {
			this._character._actionZoomData.zoom = 0;
			this._character._actionZoomData.mode = 0;
			if (!this._character._actionZoomData.loop) {
				this._character._actionZoomData.enabled = false;
				this._character._actionZoomData.returnBack = false;
			};
		};
	};
	if (this._character._actionZoomData.returnBack) {
		this._character._actionZoomData.loop = false; 
	};	
};

//==============================
// * Update Shake Effect
//==============================
Sprite_Character.prototype.updateShakeEffect = function() {
	if (this._character._shakeData[0] > 0) {this._character._shakeData[0] -= 1};
    this._character._shakeData[1] = Math.randomInt(5)
	if (this._character._shakeData[0] === 0) {this._character._shakeData[1] = 0};
	this.x -= 2;
};

//==============================
// * Update Collapse
//==============================
Sprite_Character.prototype.updateCollapseEffect = function() {
	if (this._character._collapseData[0] === 1) {this.updateCollapse1();
	} else if (this._character._collapseData[0] === 2) {this.updateCollapse2();
	} else {this.updateCollapse3();
    };
	if (this._character._collapseData[5] < 255) {this._character._collapseData[5] += 5;
    	if (this._character._collapseData[5] >= 255) {
			this._character.charCollapseClear(0);
		};
	};
};

//==============================
// * Update Collapse1
//==============================
Sprite_Character.prototype.updateCollapse1 = function() {
	this._character._collapseData[2] += 0.3;
	if (this._character._collapseData[1] > -1) {this._character._collapseData[1] -= 0.1};	
};

//==============================
// * Update Collapse2
//==============================
Sprite_Character.prototype.updateCollapse2 = function() {
    this._character._collapseData[1] += 0.1;
	if (this._character._collapseData[2] > -1) {this._character._collapseData[2] -= 0.1};	
};

//==============================
// * Update Collapse3
//==============================
Sprite_Character.prototype.updateCollapse3 = function() {
	this._character._collapseData[3] ++
	if (this._character._collapseData[3] < 20) {
		this._character._collapseData[1] += 0.05;
  	    if (this._character._collapseData[2] > -0.8) {this._character._collapseData[2] -= 0.05};		
	} else if (this._character._collapseData[3] < 60) {
		if (this._character._collapseData[1] > -0.9) {this._character._collapseData[1] -= 0.2};
  	    this._character._collapseData[2] += 0.8;		
	};
};