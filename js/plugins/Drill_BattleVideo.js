//=============================================================================
// Drill_BattleVideo.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        战斗 - 视频动画背景
 * @author Drill_up
 *
 * @param 资源-视频动画1
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 战斗背景动画
 *
 * @param 资源-视频动画2
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画3
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画4
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画5
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画6
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画7
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画8
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画9
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 资源-视频动画10
 * @parent 默认视频
 * @desc 标题的视频动画资源文件名，不要后缀。注意要把视频文件放在movies文件夹中。
 * @default 
 *
 * @param 是否播放视频声音
 * @type boolean
 * @on 播放
 * @off 关闭
 * @desc true - 播放，false - 关闭。
 * @default false
 *
 * @param 音量比
 * @desc 视频声音的音量比，小数，在0.00-1.00之间。
 * @default 1
 *
 * @param 是否指定视频宽高
 * @type boolean
 * @on 指定宽高
 * @off 原视频宽高
 * @desc true - 指定宽高，false - 原视频宽高。
 * @default false
 *
 * @param 视频宽度
 * @parent 是否指定视频宽高
 * @type number
 * @min 50
 * @desc 视频的宽度。
 * @default 1000
 *
 * @param 视频高度
 * @parent 是否指定视频宽高
 * @type number
 * @min 50
 * @desc 视频的高度。
 * @default 740
 *
 * @param 平移-视频 X
 * @desc x轴方向平移，单位像素。0为视频中心贴在正中心。（可为负数）
 * @default 0
 *
 * @param 平移-视频 Y
 * @desc y轴方向平移，单位像素。0为视频中心贴在正中心。（可为负数）
 * @default 0
 *
 * @param 是否循环播放视频
 * @type boolean
 * @on 循环
 * @off 不循环
 * @desc true - 循环，false - 不循环。
 * @default true
 *
 * @param 视频播放速度
 * @desc 视频播放的速度，1.0为原速度。
 * @default 1.0
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 视频透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 视频的透明度，0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 视频色调
 * @desc 屏幕的滤镜色调，默认: 0xffffff。
 * @default 0xffffff
 *
 * @param 视频起始帧
 * @desc 视频开始播放的初始帧数。默认从0帧开始播放。
 * @default 0
 *
 * @param 视频结束帧
 * @desc 视频开始播放的结束帧数。填入：end -视频总帧数，900 -指定结束帧。
 * @default end
 *
 * @param 是否开启Debug模式
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭。
 * @default true
 *
 * @help
 * =============================================================================
 * +++ Drill_BattleVideo +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 在战斗背景中添加一个视频层背景，用于播放视频动画。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * ★★可以与战斗的多层插件同时使用，但必须放在他们的前面★★
 *
 * -----------------------------------------------------------------------------
 * ----插件说明
 * 1.视频动画支持.webm 和.mp4 格式的视频。
 * 2.视频宽高可以自由缩放，但是要确保大于镜头架的高宽。
 * 如果设置了视频偏移，要注意不要让玩家的镜头看到外部边界线。
 * 3.循环播放时，视频的末尾会闪一下黑色背景。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 所有视频文件都存储在根目录的movies文件夹。需要配置视频名：
 * 
 * 资源-视频动画1
 * 资源-视频动画2
 * 资源-视频动画3
 * ……
 *
 * 只需要填入文件名即可，不需要后缀。
 * （视频文件不会被去除，但也不会被加密）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 你可以通过插件指令控制战斗视频的显示情况：
 * （1个基本参数，冒号两边有一个空格。）
 * 
 * 插件指令：>清空战斗视频
 * 插件指令：>创建战斗视频 : A
 *
 * 参数A：视频编号
 *        分配的视频编号。
 *
 * 示例：
 * 插件指令：>清空战斗视频
 * 插件指令：>创建战斗视频 : 1
 * （进入战斗前，最好先清空一下战斗背景，避免干扰）
 * （清空默认会包括清空背景、魔法圈、gif、视频，只要有一个清空指令就可以了。）
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		原理非常简单，在Spriteset_Battle上面建立 菜单前面层和菜单后面层。
//		然后通过插件指令添加Sprite就可以了。
//		变化效果，通过建立计时器，实时对 变化(json串)进行扫描，变化 结束生命周期后自动销毁。
//			

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_BattleVideo = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_BattleVideo');

    DrillUp.battle_video_muted = String(DrillUp.parameters['是否播放视频声音'] || "true") === "false";
    DrillUp.battle_video_volume = Number(DrillUp.parameters['音量比'] || 1.0);
    DrillUp.battle_video_wh_set = String(DrillUp.parameters['是否指定视频宽高'] || "true") === "true";
    DrillUp.battle_video_w = Number(DrillUp.parameters['视频宽度'] || 100);
    DrillUp.battle_video_h = Number(DrillUp.parameters['视频高度'] || 100);
    DrillUp.battle_video_x = Number(DrillUp.parameters['平移-视频 X'] || 100);
    DrillUp.battle_video_y = Number(DrillUp.parameters['平移-视频 Y'] || 100);
    DrillUp.battle_video_blendMode = Number(DrillUp.parameters['混合模式'] || 0);
    DrillUp.battle_video_opacity = Number(DrillUp.parameters['视频透明度'] || 255);
    DrillUp.battle_video_tint = String(DrillUp.parameters['视频色调'] || '0xffffff');
    DrillUp.battle_video_loop = String(DrillUp.parameters['是否循环播放视频'] || "true") === "true";
    DrillUp.battle_video_playbackRate = Number(DrillUp.parameters['视频播放速度'] || 1.0);
    DrillUp.battle_video_loopStart = String(DrillUp.parameters['视频起始帧'] || '0');
    DrillUp.battle_video_loopEnd = String(DrillUp.parameters['视频结束帧'] || 'end');
    DrillUp.battle_video_DEBUG = String(DrillUp.parameters['是否开启Debug模式'] || "true") === "true";
	
    DrillUp.battle_video_cur_filepath = "";
	DrillUp.battle_video_filepath_max = 10;
	DrillUp.battle_video_filepath_list = [];
	DrillUp.battle_video_filepath_list[0] = "";
	for (var i = 1; i <= DrillUp.battle_video_filepath_max; i++) {
		DrillUp.battle_video_filepath_list[i] = DrillUp.parameters['资源-视频动画' + String(i)] || "";
	}

    var _drill_battle_video_listeners = {};
	var _drill_battle_video ;
	var _drill_battle_video_sprite ;
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_battle_video_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_battle_video_pluginCommand.call(this, command, args);
	if (command === '>创建战斗视频') {
		if(args.length == 2){
			var temp = Number(args[1]);
			DrillUp.battle_video_cur_filepath = DrillUp.battle_video_filepath_list[ temp ];
		}
	}
	if (command === '>清空战斗视频') {
		$gameSystem._drill_battle_backgrounds_data = [];
		$gameSystem._drill_battle_backgrounds_changing = [];
		$gameSystem._drill_battle_circles_data = [];
		$gameSystem._drill_battle_circles_changing = [];
		$gameSystem._drill_battle_gifs_data = [];
		$gameSystem._drill_battle_gifs_changing = [];
		DrillUp.battle_video_cur_filepath = "";
	}
};
	
//=============================================================================
// ** 从 Spriteset_Battle 中进行魔法圈追加
//=============================================================================

//==============================
// ** 菜单后面层（在敌人、角色战斗图之前放置）
//==============================
var _drill_battle_video_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {    
	_drill_battle_video_createBattleback.call(this);
	
	if( !this._drill_battleDownArea ){		//菜单后面层
		this._drill_battleDownArea = new Sprite();
		this._battleField.addChild(this._drill_battleDownArea);	
	}
	this.drill_createBattleVideo();
}

Spriteset_Battle.prototype.drill_createBattleVideo = function() {    
	if( DrillUp.battle_video_cur_filepath == undefined || DrillUp.battle_video_cur_filepath == ""){return}
	
	var temp_suffix = Game_Interpreter.prototype.videoFileExt();	//组合路径
	var temp_path = 'movies/'+ DrillUp.battle_video_cur_filepath + temp_suffix;
	if(DrillUp.battle_video_DEBUG){ console.log('战斗视频-读取材质:', temp_path);}
	var temp_video_texture = PIXI.Texture.fromVideo(temp_path);
	
	_drill_battle_video = temp_video_texture.baseTexture.source;
	_drill_battle_video_sprite = new PIXI.Sprite(temp_video_texture);
	
	_drill_battle_video.addEventListener('loadedmetadata', function() {
		if(DrillUp.battle_video_DEBUG){ console.log('战斗视频-读取视频元数据:');}
		
		if( !DrillUp.battle_video_wh_set ) {
			_drill_battle_video_sprite.width = _drill_battle_video.videoWidth;
		}
		if( !DrillUp.battle_video_wh_set ) {
			_drill_battle_video_sprite.height = _drill_battle_video.videoHeight;
		}
		if(DrillUp.battle_video_loopEnd === 'end') {
			DrillUp.battle_video_loopEnd = _drill_battle_video.duration;
		}else{
			DrillUp.battle_video_loopEnd = parseFloat(DrillUp.battle_video_loopEnd);
		}
	});

	_drill_battle_video['volume'] = DrillUp.battle_video_volume * WebAudio._masterVolume;
	_drill_battle_video['loop'] = DrillUp.battle_video_loop ;
	_drill_battle_video['muted'] = DrillUp.battle_video_muted ;
	_drill_battle_video['playbackRate'] = parseFloat(DrillUp.battle_video_playbackRate) || 1.0;

	_drill_battle_video_sprite['blendMode'] = DrillUp.battle_video_blendMode;
	if( DrillUp.battle_video_wh_set ) {
		_drill_battle_video_sprite['width'] = DrillUp.battle_video_w ;
		_drill_battle_video_sprite['height'] = DrillUp.battle_video_h ;
	}
	_drill_battle_video_sprite.anchor.x = 0.5;
	_drill_battle_video_sprite.anchor.y = 0.5;
	_drill_battle_video_sprite['x'] = Graphics.width/2 + DrillUp.battle_video_x;
	_drill_battle_video_sprite['y'] = Graphics.height/2 + DrillUp.battle_video_y;
	_drill_battle_video_sprite['opacity'] = DrillUp.battle_video_opacity ;
	_drill_battle_video_sprite['tint'] = parseInt(DrillUp.battle_video_tint);

	//window.vid = vid;
	_drill_battle_video_sprite.update = function() {
		temp_video_texture.update();
	};

	if(DrillUp.battle_video_loop){
		DrillUp.battle_video_loopStart = parseFloat(DrillUp.battle_video_loopStart);
		/*if(DrillUp.battle_video_loopEnd !== 'end'){
			DrillUp.battle_video_loopEnd = parseFloat(DrillUp.battle_video_loopEnd);
		}*/
		if(DrillUp.battle_video_loopStart > 0 || DrillUp.battle_video_loopEnd !== _drill_battle_video.duration) {
			_drill_battle_video.loop = false;
			this.drill_battleVideo_addListener('timeupdate', this.drill_battleVideo_loop);

			if(DrillUp.battle_video_DEBUG) console.log('设置视频循环为 %s 至 %s:', DrillUp.battle_video_loopStart.toFixed(3), DrillUp.battle_video_loopEnd);
		}
	}
	else {
		_drill_battle_video.addEventListener('ended', function() {
			_drill_battle_video_sprite.visible = false;
		});
	}

	if(DrillUp.battle_video_DEBUG){
		_drill_battle_video.addEventListener('error', function() {
			console.error('视频发生了错误:', _drill_battle_video.error);
		});
	}

	this._drill_battleDownArea.addChild(_drill_battle_video_sprite);
};

//==============================
// ** 设置音量
//==============================
var _drill_battle_video_setMasterVolume = WebAudio.setMasterVolume;
WebAudio.setMasterVolume = function(value) {
	if( DrillUp.battle_video_cur_filepath == undefined || DrillUp.battle_video_cur_filepath == "" ){
		return _drill_battle_video_setMasterVolume(value);
	}
	if(DrillUp.battle_video_DEBUG){ console.log('战斗视频-设置音量: ', value); }
	if(_drill_battle_video) _drill_battle_video.volume = DrillUp.battle_video_volume*value;
	_drill_battle_video_setMasterVolume(value);
}

//==============================
// ** 销毁内容
//==============================
var _drill_battle_video_destroy = Spriteset_Battle.prototype.destroy;
Spriteset_Battle.prototype.destroy = function() {
	if( _drill_battle_video_sprite == null ){ return ;}
	_drill_battle_video_sprite.destroy(true);

	this.drill_battleVideo_removeListeners();
	_drill_battle_video.pause();
	_drill_battle_video.remove();
	_drill_battle_video = null;
	_drill_battle_video_sprite = null
	WebAudio.setMasterVolume = _drill_battle_video_setMasterVolume;
	_drill_battle_video_destroy.call(this);
};

//==============================
// ** 循环播放控制
//==============================
Spriteset_Battle.prototype.drill_battleVideo_loop = function() {
	if(DrillUp.battle_video_DEBUG) console.log('视频刷新帧:', _drill_battle_video.currentTime);
	if(_drill_battle_video.currentTime >= DrillUp.battle_video_loopEnd ){
		if(DrillUp.battle_video_DEBUG){ console.log('战斗视频-播放回到位置:', DrillUp.battle_video_loopStart);}
		_drill_battle_video.currentTime = DrillUp.battle_video_loopStart;
		_drill_battle_video.play();
	}
}

//==============================
// ** 添加监听器
//==============================
Spriteset_Battle.prototype.drill_battleVideo_addListener = function(evt, fn){
	_drill_battle_video.addEventListener(evt, fn);

	if(!_drill_battle_video_listeners[evt]){
		_drill_battle_video_listeners[evt] = [];
	}
	_drill_battle_video_listeners[evt].push(fn);
}

//==============================
// ** 移除监听器
//==============================
Spriteset_Battle.prototype.drill_battleVideo_removeListeners = function() {
	Object.keys(_drill_battle_video_listeners).forEach(function(evt){
		_drill_battle_video_listeners[evt].forEach(function(fn){
			_drill_battle_video.removeEventListener(evt, fn);
		});
	});
}
