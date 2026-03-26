//=============================================================================
// UCHU_MobileOperation_Modified.js
// Version: 1.2
//----------------------------------------------------------------------------
// Copyright (c) 2015-2017 uchuzine, NAK
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
@plugindesc
(Modified)智能手机操作插件。对应横向/纵向的虚拟按钮
增加触摸操作的方法，使智能手机更加舒适。
@author
uchuzine (modified by NAK)
@help
UCHU_MobileOperation_Modified (Version: 1.2)
------------------------------------------------------------------------------
■更新履歴
------------------------------------------------------------------------------

↓------这个更新历史记录是UCHUMobileOperation_Modified.js的东西------↓

1.2 2018/1/26

・HideButon Switch选项有效时隐藏，透明度为0，完全看不见。

1.1 2018/1/5

・修正即使HideButon On Message有效，也不会对公共事件的“文章显示”产生反应的问题。

1.0 2018/1/4

因为改变的程度很大，所以修改了版本。
UCHU_MobileOperation_改名为Modified.js。

・MVコアスクリプト1.5.0のプラグインパラメータを設定して
　多少使いやすくしました。
　启用了小数点后三位。
　请把虚拟垫的图像文件放到img/system文件夹里。
　如果扩展名都不是小写字母，则会出错。

・根据Chrome的版本不同，在轻拂操作中控制台会出现错误，
 因此参考以下Qita报道进行了抑制。
　https://qiita.com/ru_shalm/items/4d79e94b5d9c7c88607d

・对应了HideButon On Message的内存泄露问题。
　参考）
　https://qiita.com/EudyptesCapital/items/d4a76d665b038e027638
　https://tm.lucky-duet.com/viewtopic.php?t=371

・增加了HideButon Switch选项。
　地图画面（SceneMac）/战斗画面（Scene在Battle）中，
  通过指定编号的开关切换虚拟垫的显示。
　该显示状态在其他画面（Scene）中也会被保存。
（在地图画面上不显示的状态下战斗画面（Scene转移到Battle）后，
  在战斗中也不会显示）
　如果启用此功能，则HideButon On Message将不起作用。
（即使HideButon On Message为真，开关为OFF时也不会隐藏）

・追加HideButon Switch Value选项。
　这里设置的值将显示虚拟垫。
　当ideButonSwitch为10时
　设定此选项为真：
　10号开关打开时显示，关闭时隐藏
　将此选项设置为假：
　10号开关关闭时显示，开启时隐藏

↓------这个更新历史记录是UCHU是MobileOperation.js的东西------↓

1.1.4 2015/12/04  修正画面下部消息显示后下述问题再次发生的问题
1.1.3 2015/11/29  修正了在画面左上角设置按钮时无法按下按钮的问题
1.1.2 2015/11/24  修正了参数无法变更的问题
1.1.1 2015/11/23  修正在PC上操作虚拟按钮时的问题
1.1.0 2015/11/17  对应使用“AnalogMove.js”时的模拟移动。参照以下说明
1.0.0 2015/11/15  公开插件

↓------以下说明为UCHU是MobileOperation.js的东西------↓

------------------------------------------------------------------------------
■特征
------------------------------------------------------------------------------
在创建插件时，por Masked的MBS参考MobileDirPard.js。

○本插件的特征
・因为在游戏画面外（黑带部分）设置按钮，所以不容易干涉游戏画面
・可以单独显示/隐藏焊盘和按钮
・按钮的基准点可以指定为画面四个角落中的任意一个，可以对应纵向操作
・重视方向垫的操作性，可调整触摸判断区域、倾斜方向的灵敏度等
　（详情请参照以下说明）
・可同时使用方向垫移动和默认目的地触摸移动
・利用特定的触摸操作、手势的按钮操作的扩展
・不使用虚拟十字键，只使用MENU按钮和决定按钮
・按钮全部不使用，也可以按画面长度自动连击，通过画面外的触摸调用菜单等使用方法。

------------------------------------------------------------------------------
■部分参数的说明
------------------------------------------------------------------------------
▼ DPad OpelationRange（方向垫作动区域）‥‥
指定相对于方向垫图像显示大小的触摸判断区域的大小，以放大倍数表示。
即使提高数值外观也不会改变，但是从图像的中心向外扩展判定。
示例）
“1”的时候……图像的尺寸成为触摸判定的大小（仅图像的内接圆中）
“2”的时候……触摸判定的大小是纵横两倍（在图像的外侧各扩大50%）

提高数值可以防止操作错误，提高操作性
请注意不要抬起过多，重叠在其他按钮上。

▼ DPad DiagonalRange（方向垫的斜方向范围）‥‥
方向的判定是将背景图像的对角线作为边界线分为上下左右两部分，
如果提高该数值，在对角线上触摸时两侧的方向变为ON（“右”+“上”等），
可以进行8个方向判定。
使用8向移动插件时，请设置此数值。

数值的大小变为倾斜判断角度的宽度，在“0～1”的范围内指定
示例）
“0”的时候……只能输入上下左右的4个方向。
“0.5”时…可在8个方向上均匀输入。
“1”的时候……“右上”“右下”“左上”“左下”4个方向输入。

数值越高，就越容易出现“本来打算按上面的，结果是右上角”等错误
4方向没有问题时，指定“0”将使操作错误最小化。

（从var1.1.0开始追加）
▼ AnalogMove（模拟移动）‥‥
使用圣西罗的插件“AnalogMove.js”时，可以进行模拟移动。
可以以点为单位从方向垫的中心移动触摸位置的距离和角度。
使用时由插件管理器先读取“AnalogMove.js”
请把这边的参数「AnalogMove」换成真的。
※模拟移动使用中，“DPad Diagonalrange”的数值被忽略。

▼ AnalogSensitivity（输入灵敏度）‥‥
“AnalogSensitivity”的输入灵敏度越高，输入最大值（最大速度）所需的手指动作越小。
示例）
“1”的时候……在输入判定的外端达到最大值。需要大手指的移动。
与“DPad OpelationRange”相同的时候…在方向垫图像的外端达到最大值。

指定比DPad OpelationRange大一点的数值的话，输入会变得轻松。
（相对于DPad OpelationRange的初始值1.3，AnalogSensitivity的初始值为1.8）

------------------------------------------------------------------------------
■关于背景、按钮图像
------------------------------------------------------------------------------
・（追加）（追加）请将焊盘按钮图像放入系统文件夹，
  扩展名（.png）全部变成小写字母。

・图像文件可按任意大小制作，但请按纵横比1:1制作。
　显示时，将尺寸调整为“DPad Size”中指定的pixel数。
　按钮图像也一样。
・请使方向垫的图形中心成为图像的中心。

@param ---PC Option---
@default

@param PC BtnDisplay
@desc 即使在PC上运行，也显示虚拟按钮:true 不:false
初期値:false
@default false
@type boolean

@param PC TouchExtend
@desc 即使在PC上运行，也启用触摸的操作扩展:true 不:false
初期値:true;
@default true
@type boolean

@param ---File Path---
@default

@param DPad Image
@desc 方向背景图像的文件路径
@default DirPad
@require 1
@dir img/system/
@type file

@param ActionBtn Image
@desc 决定按钮图像的文件路径
@default ActionButton
@require 1
@dir img/system/
@type file

@param CancelBtn Image
@desc 取消（菜单）按钮图像的文件路径
@default CancelButton
@require 1
@dir img/system/
@type file

@param ---Button Customize---
@default

@param Button Opacity
@desc 按钮的不透明度（0～1）初始值：0.7
@default 0.700
@type number
@max 1.000
@min 0.000
@decimals 3

@param Vertical BtnZoom
@desc 手机纵向显示时所有按钮的放大率
初期値:1.700
@default 1.700
@type number
@decimals 3

@param Tablet BtnZoom
@desc 平板横向显示时所有按钮的放大率
初期値:0.800
@default 0.800
@type number
@decimals 3

@param TabVertical BtnZoom
@desc 平板纵向显示时所有按钮的放大率
初期値:1.100
@default 1.100
@type number
@decimals 3

@param HideButton OnMessage
@desc 在画面下方显示消息时，将虚拟按钮的显示顺序降低到游戏画面下方:true 保持原样:false
初期値:true
@default true
@type boolean

@param HideButton Switch
@desc 利用这个号码的开关控制虚拟按钮的显示。0无效。
@default 0
@type number

@param HideButton Switch Value
@desc 在通过开关控制虚拟按钮时，设定是以ON（true）显示还是以OFF（false）显示。
@default false
@type boolean

@param DPad Visible
@desc 显示方向垫：true 不:false  初期値:true
@default true
@type boolean

@param DPad Size
@desc 方向垫的大小（px）。 初期値:200
@default 200
@type number

@param DPad Margin
@desc 方向背景图像的位置。根据画面边缘的间隙大小指定。
 （从左边开始的宽度；底部宽度）初始值：10；10
@default 10; 10

@param DPad Orientation
@desc 想将方向垫的基准位置变更为左下以外的情况。
left或right；用top或bottom指定。 初期値:left; bottom
@default left; bottom
@type select
@option left; top
@option left; bottom
@option right; top
@option right; bottom

@param DPad OpelationRange
@desc 方向垫图像的触摸的工作范围（倍率、1～）
在图像外侧展开触摸判定，防止操作错误。初始值：1.3
@default 1.300
@type number
@decimals 3

@param DPad DiagonalRange
@desc 方向垫斜方向的判定宽度（0～1）。越容易倾斜进入，操作越容易抖动。4个方向可以的情况下为0。初始值：0.3；
@default 0.300
@type number
@max 1.000
@min 0.000
@decimals 3

@param ActionBtn Visible
@desc 显示决定按钮:true しない:false  初期値:true
@default true
@type boolean

@param ActionBtn Size
@desc 决定按钮的大小（px）。 初期値:100
@default 100
@type number

@param ActionBtn Margin
@desc 决定按钮的位置。根据画面边缘的间隙大小指定。
 （从右边开始的宽度；底部宽度）初期値:10; 90
@default 10; 90

@param ActionBtn Orientation
@desc 想将决定按钮的基准位置变更为右下以外的情况。
用left或right；top或bottom指定。 初期値:right; bottom
@default right; bottom
@type select
@option left; top
@option left; bottom
@option right; top
@option right; bottom

@param CancelBtn Visible
@desc 显示取消（菜单）按钮:true しない:false
初期値:true
@default true
@type boolean

@param CancelBtn Size
@desc 取消按钮的大小（px）。 初期値:100
@default 100
@type number

@param CancelBtn Margin
@desc 取消按钮的位置。根据画面边缘的间隙大小指定。
 （从右边开始的宽度；来自底部的宽度）初期値:110; 10
@default 110; 10

@param CancelBtn Orientation
@desc 想将取消按钮的基准位置变更为右下以外的情况。
用left或right；top或bottom指定。 初期値:right; bottom
@default right; bottom
@type select
@option left; top
@option left; bottom
@option right; top
@option right; bottom

@param ---TouchInput Extend---
@default 

@param Flick PageUp-PageDown
@desc 如果在画面上左右轻拂，则变成PageUp/PageDown操作。
想在状态画面中切换角色时等。初期値:true
@default true
@type boolean

@param HoldCanvas ActionBtn
@desc 长按画面时，变成按下决定按钮的状态。
初期値:true
@default true
@type boolean

@param OutCanvas CancelBtn
@desc 游戏画面外的黑带部分全部被当作取消按钮。
初期値:false
@default false
@type boolean

@param OutCanvas ActionBtn
@desc 游戏画面以外的整个黑带部分成为决定按钮。
初期値:false
@default false
@type boolean

@param --!need AnalogMove.js!--
@default

@param Analog Move
@desc [※请先读入AnalogMove.js]可通过方向垫进行模拟移动。
方向パッドでアナログ移動ができるようにする。初期値:false
@default false
@type boolean

@param Analog Sensitivity
@desc 模拟移动的输入灵敏度。提高数值的话，用细小的手指的动作角色会大幅移动。
初期値:1.800
@default 1.800
@type number
@decimals 3

*/

var Imported = Imported || {};
Imported.UCHU_MobileOperation_Modified = "1.2";

var UCHU_MobileOperation_Modified = {};

(function() {
    "use strict";
	
	//-----------------------------------------------------------------------------
	// Setup
	
	var Parameters = PluginManager.parameters('UCHU_MobileOperation_Modified');
	var PRM = PRM || {};
	
	PRM.url=[];
	PRM.visible=[];
	PRM.size=[];
	PRM.pos=[];
	PRM.spot=[];
	
	PRM.pcBtn = Boolean(Parameters["PC BtnDisplay"] === 'true' || false);
	PRM.pcExt = Boolean(Parameters["PC TouchExtend"] === 'true' || false);
	PRM.url[0] = "./img/system/" + String(Parameters["DPad Image"]) + ".png";
	PRM.url[1] = "./img/system/" + String(Parameters["ActionBtn Image"])+ ".png";
	PRM.url[2] = "./img/system/" + String(Parameters["CancelBtn Image"])+ ".png";
	PRM.opacity = Number(Parameters["Button Opacity"]);
	PRM.vZoom = Number(Parameters["Vertical BtnZoom"]);
	PRM.tabZoom = Number(Parameters["Tablet BtnZoom"]);
	PRM.tabvZoom = Number(Parameters["TabVertical BtnZoom"]);
	PRM.hideBtn = Boolean(Parameters["HideButton OnMessage"] === 'true' || false);
	PRM.visible[0] = Boolean(Parameters["DPad Visible"] === 'true' || false);
	PRM.size[0] = Number(Parameters["DPad Size"]);
	PRM.pos[0] =Parameters["DPad Margin"].split(";");
	PRM.spot[0] = Parameters["DPad Orientation"].split(";");
	PRM.pad_scale = Number(Parameters["DPad OpelationRange"]);
	PRM.pad_dia = Math.max(0,Math.min(1,(1-Number(Parameters["DPad DiagonalRange"]))));
	PRM.visible[1] = Boolean(Parameters["ActionBtn Visible"] === 'true' || false);
	PRM.size[1] = Number(Parameters["ActionBtn Size"]);
	PRM.pos[1] = Parameters["ActionBtn Margin"].split(";");
	PRM.spot[1] = Parameters["ActionBtn Orientation"].split(";");
	PRM.visible[2] = Boolean(Parameters["CancelBtn Visible"] === 'true' || false);
	PRM.size[2] = Number(Parameters["CancelBtn Size"]);
	PRM.pos[2] = Parameters["CancelBtn Margin"].split(";");
	PRM.spot[2] = Parameters["CancelBtn Orientation"].split(";");
	PRM.flickpage = Boolean(Parameters["Flick PageUp-PageDown"] === 'true' || false);
	PRM.holdaction = Boolean(Parameters["HoldCanvas ActionBtn"] === 'true' || false);
	PRM.outcansel = Boolean(Parameters["OutCanvas CancelBtn"] === 'true' || false);
	PRM.outaction = Boolean(Parameters["OutCanvas ActionBtn"] === 'true' || false);
	PRM.analogmove = Boolean(Parameters["Analog Move"] === 'true' || false);
	PRM.sensitivity = Number(Parameters["Analog Sensitivity"]);
	//改変者による機能追加
	PRM.hideBtnSwitch = Number(Parameters["HideButton Switch"]);
	PRM.hideBtnSwitchValue = Boolean(Parameters["HideButton Switch Value"] === 'true' || false);
	
	var btn_id=["DirPad","ok","escape"];
	var current_zoom=1;	
	var st_x = 0;
	var st_y = 0;
	var pad_range=PRM.size[0]*PRM.pad_scale;
	var pad_size=pad_range*current_zoom/2;
	var Btn_ready=false;
	var Btn_hide=false;
	var PressBtn=false;
	var dirx=0;
	var diry=0;
	var touchx=0;
	var touchy=0;
	var autofire=false;
	var hvzoom=[1, PRM.vZoom];
	var ua = (function(u){
	  return {
	    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1
	  };
	})(window.navigator.userAgent.toLowerCase());

	if(ua.Tablet){
		hvzoom=[PRM.tabZoom, PRM.tabvZoom];
	}
	if (!Utils.isMobileDevice() && !PRM.pcBtn) {PRM.visible[0]=PRM.visible[1]=PRM.visible[2]=false;}

	//-----------------------------------------------------------------------------
	// Locate_DirPad

	function Locate_DirPad() {
		this.initialize.apply(this, arguments);
	}


	Locate_DirPad.prototype.initialize = function() {
		var img = new Image();
		var url = PRM.url[0];
		img.onerror = function() {Graphics.printError('DirPad Image was Not Found:',url);};
		img.src = url;
		img = null;
		this.Div = document.createElement("div");
		this.Div.id = 'Dirpad';
		this.Div.style.position = 'fixed';
		this.Div.style[PRM.spot[0][0].replace(/\s+/g, "")] = String(PRM.pos[0][0]-(pad_range-PRM.size[0])/2)+'px';
		this.Div.style[PRM.spot[0][1].replace(/\s+/g, "")] = String(PRM.pos[0][1]-(pad_range-PRM.size[0])/2)+'px';
		this.Div.style.width = pad_range+'px';
		this.Div.style.height = pad_range+'px';
		this.Div.style.opacity = PRM.opacity;
		this.Div.style.zIndex = '11';
		this.Div.style.userSelect="none";
		this.Div.style["-webkit-tap-highlight-color"]="rgba(0,0,0,0)";
		this.Div.style.background = 'url('+PRM.url[0]+') 50% 50% / '+String(Math.round(PRM.size[0]/pad_range*100))+'% no-repeat';
		
		if(!Utils.isMobileDevice() && PRM.pcBtn){
			this.Div.addEventListener('mousedown', function(e) {
			  if (!SceneManager.isSceneChanging()){dirope(e.layerX,e.layerY,true);PressBtn=true;}
			}, false);
			this.Div.addEventListener('mousemove', function(e) {
			  if(PressBtn && !SceneManager.isSceneChanging()){dirope(e.layerX,e.layerY,false);}
			}, false);
			this.Div.addEventListener('mouseup', function() {
				disope();PressBtn=false;
			}, false);
			this.Div.addEventListener('mouseout', function() {
			    disope();PressBtn=false;
			}, false);
		}
		this.Div.addEventListener('touchstart', function(e) {
			PressBtn=true;
			if (!SceneManager.isSceneChanging()){dirope(e.touches[0].clientX-dirx, e.touches[0].clientY-diry,true)};
		}, false);
		this.Div.addEventListener('touchmove', function(e) {
			if (!SceneManager.isSceneChanging()){dirope(e.touches[0].clientX-dirx, e.touches[0].clientY-diry,false)};
			PressBtn=true;
		}, false);
		this.Div.addEventListener('touchend', function() {
			disope();PressBtn=false;
		}, false);
			document.body.appendChild(this.Div);
	};
	
	function dirope(xx,yy,st) {
		touchx=(xx-pad_size)/pad_size;
		touchy=(yy-pad_size)/pad_size;
		if(st && Math.sqrt(touchx*touchx+touchy*touchy)>1){
			disope();
		}else{
			if(touchx>Math.abs(touchy)*PRM.pad_dia){Input._currentState['right']=true;Input._currentState['left']=false;}
			else if(touchx<-Math.abs(touchy)*PRM.pad_dia){Input._currentState['left']=true;Input._currentState['right']=false;}
			else{Input._currentState['left']=false;Input._currentState['right']=false;}
			if(touchy>Math.abs(touchx)*PRM.pad_dia){Input._currentState['down']=true;Input._currentState['up']=false;}
			else if(touchy<-Math.abs(touchx)*PRM.pad_dia){Input._currentState['up']=true;Input._currentState['down']=false;}
			else{Input._currentState['up']=false;Input._currentState['down']=false;}
		}
	}
	function disope() {
		touchx=0; touchy=0;
		Input._currentState['up']=false;
		Input._currentState['down']=false;
		Input._currentState['left']=false;
		Input._currentState['right']=false;
	}
	
	//-----------------------------------------------------------------------------
	// Locate_Button

	function Locate_Button() {
		this.initialize.apply(this, arguments);
	}
	Locate_Button.prototype.initialize = function(type) {
		var img = new Image();
		var url = PRM.url[type];
		img.onerror = function() {Graphics.printError('Button Image was Not Found:',url);};
		img.src = url;
		img = null;
		this.Div = document.createElement("div");
		this.Div.id = btn_id[type]+'Btn';
		this.Div.style.position = 'fixed';
		this.Div.style[PRM.spot[type][0].replace(/\s+/g, "")] = PRM.pos[type][0]+'px';
		this.Div.style[PRM.spot[type][1].replace(/\s+/g, "")] = PRM.pos[type][1]+'px';
		this.Div.style.width = PRM.size[type]+'px';
		this.Div.style.height = PRM.size[type]+'px';
		this.Div.style.opacity = PRM.opacity;
		this.Div.style.zIndex = '11';
		this.Div.style.userSelect="none";
		this.Div.style.background = 'url('+PRM.url[type]+') 0 0 / cover no-repeat';
		
		if(!Utils.isMobileDevice() && PRM.pcBtn){
			this.Div.addEventListener('mousedown', function() {
				Input._currentState[btn_id[type]] = true;PressBtn=true;
			}, false);
			this.Div.addEventListener('mouseover', function() {
			  if(TouchInput.isPressed()){Input._currentState[btn_id[type]] = true;PressBtn=true;return false;}
			}, false);
			this.Div.addEventListener('mouseup', function() {
			  Input._currentState[btn_id[type]] = false;PressBtn=false;
			}, false);
			this.Div.addEventListener('mouseout', function() {
			  Input._currentState[btn_id[type]] = false;PressBtn=false;
			}, false);
		}
		
		this.Div.addEventListener('touchstart', function() {
			if (!SceneManager.isSceneChanging()){Input._currentState[btn_id[type]] = true;PressBtn=true;}
		}, false);
		this.Div.addEventListener('touchend', function() {
			Input._currentState[btn_id[type]] = false;PressBtn=false;
		}, false);
		
		document.body.appendChild(this.Div);
	};

	//-----------------------------------------------------------------------------
	// Replace function
			
	var Scene_Base_start = Scene_Base.prototype.start;
	Scene_Base.prototype.start = function() {
            Scene_Base_start.call(this);
	    if (Utils.isMobileDevice() || PRM.pcBtn) {
			if(!Btn_ready){
				Btn_ready=true;
				if(PRM.visible[0]){this.DirPad = new Locate_DirPad();}
				if(PRM.visible[1]){this.okButton = new Locate_Button(1);}
				if(PRM.visible[2]){this.canselButton = new Locate_Button(2);}
				Graphics._updateRealScale();
				document.documentElement.style["-webkit-user-select"]="none";
				document.addEventListener("touchmove", function(evt) {evt.preventDefault();}, {passive: false});
			}
		}
	};

        if(PRM.visible[0] || PRM.visible[1] || PRM.visible[2]){
            var Game_Temp_setDestination = Game_Temp.prototype.setDestination;
            Game_Temp.prototype.setDestination = function(x, y) {
                Game_Temp_setDestination.apply(this, arguments);
                if(PressBtn){
                    this._destinationX = null;
                    this._destinationY = null;
                }
            };
		
            var Graphics_updateRealScale = Graphics._updateRealScale;
            Graphics._updateRealScale = function() {
                Graphics_updateRealScale.call(this);
                if (this._stretchEnabled) {
                    if(document.getElementById("Dirpad")){
                    if(window.innerWidth<window.innerHeight){current_zoom=hvzoom[1];}else{current_zoom=hvzoom[0];}
                    pad_size=pad_range*current_zoom/2;
                    if(PRM.visible[0]){
                            document.getElementById("Dirpad").style.zoom=current_zoom;
                            dirx=document.getElementById("Dirpad").offsetLeft*current_zoom;
                            diry=document.getElementById("Dirpad").offsetTop*current_zoom;
                    }
                    if(PRM.visible[1]){document.getElementById("okBtn").style.zoom=current_zoom;}
                    if(PRM.visible[2]){document.getElementById("escapeBtn").style.zoom=current_zoom;}
                    }
                }
            };
	}
	
	//-----------------------------------------------------------------------------
	// Option
        // UCHU_MobileOperationからの改変が多い箇所
        
        //UCHU_MobileOperationの同名メソッドとほぼ同じ
        Scene_Base.prototype.hideUserInterface = function() {
            if (Utils.isMobileDevice() || PRM.pcBtn) {
                Btn_hide = true;
                //元々のUCHU_MobileOperationの処理
                if(PRM.visible[0]){document.getElementById("Dirpad").style.zIndex = '0';}
                if (!$gameSwitches.value(1600)) {
					if(PRM.visible[1]){document.getElementById("okBtn").style.zIndex = '0';}                	
				}
                if(PRM.visible[2]){document.getElementById("escapeBtn").style.zIndex = '0';}
                if(PRM.hideBtnSwitch != 0){
                    //透明度をゼロにする処理
                    if(PRM.visible[0]){document.getElementById("Dirpad").style.opacity = '0';}
                    if (!$gameSwitches.value(1600)) {
						if(PRM.visible[1]){document.getElementById("okBtn").style.opacity = '0';}
					}
                    if(PRM.visible[2]){document.getElementById("escapeBtn").style.opacity = '0';}
                }
            }
        };
        
        //UCHU_MobileOperationの同名メソッドとほぼ同じ
        Scene_Base.prototype.showUserInterface = function() {
            if (Utils.isMobileDevice() || PRM.pcBtn) {
                Btn_hide = false;
                //元々のUCHU_MobileOperationの処理
                if(PRM.visible[0]){document.getElementById("Dirpad").style.zIndex = '11';}
                if(PRM.visible[1]){document.getElementById("okBtn").style.zIndex = '11';}
                if(PRM.visible[2]){document.getElementById("escapeBtn").style.zIndex = '11';}
                if(PRM.hideBtnSwitch != 0){
                    //透明度を設定値にする処理
                    if(PRM.visible[0]){document.getElementById("Dirpad").style.opacity = PRM.opacity;}
                    if(PRM.visible[1]){document.getElementById("okBtn").style.opacity = PRM.opacity;}
                    if(PRM.visible[2]){document.getElementById("escapeBtn").style.opacity = PRM.opacity;}                      
                }
            }
        };

        //updateMainで表示状態をチェックする
        var dice2000_Scene_Map_updatemain = Scene_Map.prototype.updateMain;
        Scene_Map.prototype.updateMain = function() {
            dice2000_Scene_Map_updatemain.apply(this, arguments);
            //スイッチ番号が設定されている時
            if(PRM.hideBtnSwitch != 0){
                //どの値で表示するかはPRM.hideBtnSwitchValue（真理値）による
                //非表示状態にする
                if($gameSwitches.value(PRM.hideBtnSwitch) != PRM.hideBtnSwitchValue){
                    //表示状態(Btn_hideがfalse)にメソッドを呼び、行き先でBtn_hideをtrueにする
                    if(!Btn_hide) this.hideUserInterface();
                //表示状態にする
                }else{
                    //非表示状態(Btn_hideがtrue)にメソッドを呼び、行き先でBtn_hideをfalseにする
                    if(Btn_hide) this.showUserInterface();
                }
            //スイッチ番号が設定されておらず、HideButton OnMessageがtrueに設定されている時
            }else if(PRM.hideBtn){
                //消去条件：メッセージウィンドウにテキストが存在する時＆スクロールモードでない時＆ウィンドウ位置が下の時
                //ここの条件式を変えれば消すタイミングは変えられます
                if($gameMessage.hasText() && !$gameMessage.scrollMode() && $gameMessage.positionType() == 2){
                    if(!Btn_hide) this.hideUserInterface();
                }else{
                    if(Btn_hide) this.showUserInterface();
                }
            }
        };

        var dice2000_Scene_Battle_update = Scene_Battle.prototype.update;
        Scene_Battle.prototype.update = function() {
            dice2000_Scene_Battle_update.apply(this, arguments);
            if(PRM.hideBtnSwitch != 0){
                if($gameSwitches.value(PRM.hideBtnSwitch) != PRM.hideBtnSwitchValue){
                    if(!Btn_hide) this.hideUserInterface();
                }else{
                    if(Btn_hide) this.showUserInterface();
                }
            }else if(PRM.hideBtn){
                if($gameMessage.hasText() && !$gameMessage.scrollMode() && $gameMessage.positionType() == 2){
                    if(!Btn_hide) this.hideUserInterface();
                }else{
                    if(Btn_hide) this.showUserInterface();
                }
            }
        };

	if(Utils.isMobileDevice() || PRM.pcExt){
		if(PRM.holdaction){
			var TouchInput_update = TouchInput.update;
			TouchInput.update = function() {
				TouchInput_update.call(this);
				if (!PressBtn && TouchInput.isLongPressed()) {
					Input._currentState['ok']=true;autofire=true;
				}
				if(!TouchInput.isPressed() && autofire){
					Input._currentState['ok']=false;autofire=false;
				}
			};
		}
		
		if(PRM.flickpage || PRM.outcansel || PRM.outaction){
			TouchInput._endRequest= function(type) {
				Input._currentState[type]=false;
			}
			if(Utils.isMobileDevice()){
				var TouchInput_onTouchStart = TouchInput._onTouchStart;
				TouchInput._onTouchStart = function(event) {
				    TouchInput_onTouchStart.apply(this, arguments);
					var touch = event.changedTouches[0];
					if(!PressBtn){
						st_x = Graphics.pageToCanvasX(touch.pageX);
						st_y = Graphics.pageToCanvasY(touch.pageY);
						if(st_x<0 || st_y<0 || st_x>Graphics.boxWidth || st_y>Graphics.boxHeight){
							if(PRM.outcansel){Input._currentState['escape']=true;setTimeout("TouchInput._endRequest('escape');", 100);}
							if(PRM.outaction){Input._currentState['ok']=true;setTimeout("TouchInput._endRequest('ok');", 100);}
						}
					}
				};
			}else{
				var TouchInput_onLeftButtonDown = TouchInput._onLeftButtonDown;
				TouchInput._onLeftButtonDown = function(event) {
					TouchInput_onLeftButtonDown.apply(this, arguments);
					if(!PressBtn){
						st_x = Graphics.pageToCanvasX(event.pageX);
						st_y = Graphics.pageToCanvasY(event.pageY);
						if(st_x<0 || st_y<0 || st_x>Graphics.boxWidth || st_y>Graphics.boxHeight){
							if(PRM.outcansel){Input._currentState['escape']=true;setTimeout("TouchInput._endRequest('escape');", 100);}
							if(PRM.outaction){Input._currentState['ok']=true;setTimeout("TouchInput._endRequest('ok');", 100);}
						}
					}
				};
			}
		}
			
		if(PRM.flickpage){
			var TouchInput_onMove = TouchInput._onMove;
			TouchInput._onMove = function(x, y) {
				TouchInput_onMove.apply(this, arguments);
				if(!PressBtn){
					if((st_x-x)<-50 && Math.abs(st_y-y)<100){st_y=9999;Input._currentState['pageup']=true;setTimeout("TouchInput._endRequest('pageup');", 100);}
					if((st_x-x)>50 && Math.abs(st_y-y)<100){st_y=9999;Input._currentState['pagedown']=true;setTimeout("TouchInput._endRequest('pagedown');", 100);}
				}
			}
		}
	}
	
	//AnalogMove.js
	if(PRM.analogmove && Utils.isMobileDevice() || PRM.analogmove && PRM.pcBtn){
		Input.leftStick = function() {
			var threshold = 0.1;
			var x = touchx;
			var y = touchy;
			var tilt = Math.min(1,Math.sqrt(touchx*touchx+touchy*touchy)*PRM.sensitivity);
			var direction = 0.0;
			if (x === 0.0) {
				direction = (-y > 0 ? Math.PI * 0.0 : Math.PI * 1.0);
			} else if (y === 0.0) {
				direction = (-x > 0 ? Math.PI * 0.5 : Math.PI * 1.5);
			} else {
				direction = Math.atan2(-x, -y);
			}
			return {tilt: tilt, direction: direction};
		};
	}
})(UCHU_MobileOperation_Modified);

