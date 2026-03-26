//=============================================================================
// TMPlugin - エネミー行動予測
// バージョン: 1.1.0
// 最終更新日: 2018/08/21
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 用文本显示敌人角色下一步行动的提示等。
 * 也许可以实现更具战略意义的回合战。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param width
 * @text 宽度
 * @type number
 * @desc 行动预测显示的宽度
 * 初始值: 240
 * @default 240
 *
 * @param maxLines
 * @text 最大行数
 * @type number
 * @desc 行动预测显示的最大行数
 * 初始值: 3
 * @default 3
 *
 * @param lineHeight
 * @text 行高
 * @type number
 * @desc 行动预测显示的行高
 * 初始值: 36
 * @default 36
 *
 * @param fontSize
 * @text 字体大小
 * @type number
 * @desc 行动预测显示的字体大小
 * 初始值: 28
 * @default 28
 *
 * @param color
 * @text 文字颜色
 * @desc 行动预测显示的文字颜色
 * 初始值: white
 * @default white
 *
 * @param backColor
 * @text 背景颜色
 * @desc 行动预测显示的背景颜色
 * 初始值: black
 * @default black
 *
 * @param backOpacity
 * @text 背景不透明度
 * @type number
 * @max 255
 * @desc 行动预测显示背景的不透明度
 * 初始值: 128 ( 0 ～ 255 )
 * @default 128
 *
 * @param textAlign
 * @text 文本对齐
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 行动预测显示的对齐方式
 * @default center
 * 
 * @param showIcon
 * @text 显示图标
 * @type boolean
 * @desc 技能名称的开头也会显示一个图标
 * 初始值: ON（ON = 显示/OFF = 不显示)
 * @default true
 * 
 * @param headerText
 * @text 标题文本
 * @desc 行动预测显示的标题文本
 * 初始值: Next
 * @default Next
 *
 * @param headerHeight
 * @text 标题高度
 * @type number
 * @desc 行动预测显示的标题高度
 * 初始值: 20
 * @default 20
 *
 * @param headerFontSize
 * @text 标题字体大小
 * @type number
 * @desc 行动预测显示标题的字体大小
 * 初始值: 16
 * @default 16
 *
 * @param headerColor
 * @text 标题文字颜色
 * @desc 行动预测显示标题的文字颜色
 * 初始值: red
 * @default red
 *
 * @param cornerRadius
 * @text 圆角矩形扩展
 * @type number
 * @desc 导入TMBitmapEx.js时，圆角矩形圆形部分的半径
 * 初始值: 6
 * @default 6
 *
 * @help
 * TMPlugin - エネミー行動予測 ver1.1.0
 * 
 * 使用方法:
 *
 *   在技能备注栏中用<fsText:预测文本>这样的标签设置行动预测。
 *   在战斗场景中使用队伍命令时，
 *   预测文本将显示为与敌人图形重叠。
 *
 *   此插件已使用RPG Maker MV 版本 1.6.1进行测试。
 *
 *   该插件在 MIT 许可下分发，可自由用于商业用途、修改、再分发等。
 *
 * 
 * 备注栏标签(技能):
 *
 *   <fsText:预测文本>
 *     在敌人使用此技能的回合输入命令时，
 *     预测文本将出现与敌人图形重叠。
 *     如果没有此标签，则显示技能名称。
 *
 *     通过将预测文本中途换行，行动预测的显示也变为多行。
 *     但不能超过插件参数【最大行数】中设置的行数。
 * 
 *   <fsIcon:5>
 *     在预测文本的开头显示ID5图标。
 *     如果没有此标签，则显示技能图标。
 * 
 *     插件参数【显示图标】为OFF(false)时不显示。
 *
 *
 * 备注栏标签(敌人):
 *
 *   <fsOffsetX:50>
 *     将此敌人行动预测的显示位置向右偏移50点。
 *     向左偏移时设置负值。
 *
 *   <fsOffsetY:80>
 *     将这个敌人行动预测的显示位置向下偏移80点。
 *      向上偏移时设置为负值。
 *
 *
 * 插件命令:
 *
 *   fsStop
 *     禁用行动预测功能。游戏开始时行动预测功能已启用。
 *     行动预测功能的状态保存在保存数据中。
 *
 *   fsStart
 *     开启行动预测功能
 *
 *
 * 插件参数补充:
 *
 *   maxLines
 *     行動予測表示の最大行数を設定します。行数が多いほど大きなビットマップが
 *     生成されるため、必要以上に大きな値は設定しないでください。
 * 
 *     1ターンに複数回の行動がある場合、行動回数分の行数が必要になります。
 *     行動予測表示に改行を利用する場合はさらに必要な行数が増えます。
 *
 *   color / backColor / headerColor
 *     このパラメータには、black や blue といったカラーネームと、
 *     #000000 や #0000ff のようなカラーコードを設定することができます。
 *
 *   headerText
 *     行動予測の左上に表示するヘッダーテキストです。何も入力しなければ
 *     ヘッダーテキストは非表示になります。
 *
 *   cornerRadius
 *     TMBitmapEx.js をこのプラグインよりも上の位置に導入しつつ、
 *     このパラメータの値を 1 以上にすることで、行動予測の背景を
 *     角丸の矩形にすることができます。
 */

var Imported = Imported || {};
Imported.TMFutureSight = true;

(function() {

	var parameters = PluginManager.parameters('TMFutureSight');
	var SightWidth = +(parameters['width'] || 240);
	var SightMaxLines = +(parameters['maxLines'] || 3);
	var SightLineHeight = +(parameters['lineHeight'] || 36);
	var SightFontSize = +(parameters['fontSize'] || 28);
	var SightColor = parameters['color'] || 'white';
	var SightBackColor = parameters['backColor'] || 'black';
	var SightBackOpacity = +(parameters['backOpacity'] || 128);
	var SightCornerRadius = +(parameters['cornerRadius'] || 6);
	var SightTextAlign = parameters['textAlign'] || 'center';
	var SightShowIcon = JSON.parse(parameters['showIcon'] || 'true');
	var SightHeaderText = parameters['headerText'];
	var SightHeaderHeight = +(parameters['headerHeight'] || 20);
	var SightHeaderFontSize = +(parameters['headerFontSize'] || 16);
	var SightHeaderColor = parameters['headerColor'] || 'red';
  
	//-----------------------------------------------------------------------------
	// Game_System
	//

	Game_System.prototype.isFutureSightEnabled = function() {
		if (this._futureSightEnabled == null) {
			this._futureSightEnabled = true;
		}
		return this._futureSightEnabled;
	};

	Game_System.prototype.disableFutureSight = function() {
		this._futureSightEnabled = false;
	};

	Game_System.prototype.enableFutureSight = function() {
		this._futureSightEnabled = true;
	};

	//-----------------------------------------------------------------------------
	// Game_Enemy
	//

	Game_Enemy.prototype.setFutureSightTexts = function() {
		this._futureSightTexts = [];
		this._futureSightIcons = [];
		for (var i = 0; i < this._actions.length; i++) {
			if (this._actions[i]) {
				var skill = this._actions[i].item();
				if (skill) {
					if (skill.meta.fsText) {
						this._futureSightTexts.push(skill.meta.fsText);
					} else {
						this._futureSightTexts.push(skill.name);
					}
					this._futureSightIcons.push(this.fsIconIndex(skill));
				}
			}
		}
	};

	Game_Enemy.prototype.fsIconIndex = function(skill) {
		if (!SightShowIcon) {
			return 0;
		}
		if (skill.meta.fsIcon) {
			return +skill.meta.fsIcon;
		}
		return skill.iconIndex;
	};

	Game_Enemy.prototype.resetFutureSightTexts = function() {
		this._futureSightTexts = [];
	};

	Game_Enemy.prototype.futureSightTexts = function() {
		return this._futureSightTexts || [];
	};

	Game_Enemy.prototype.futureSightIcons = function() {
		return this._futureSightIcons || [];
	};
  
	//-----------------------------------------------------------------------------
	// Game_Troop
	//

	var _Game_Troop_makeActions = Game_Troop.prototype.makeActions;
	Game_Troop.prototype.makeActions = function() {
		_Game_Troop_makeActions.call(this);
		if ($gameSystem.isFutureSightEnabled() && !BattleManager._preemptive) {
			this.members().forEach(function(member) {
				member.setFutureSightTexts();
			});
		}
	};

	var _Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
	Game_Troop.prototype.increaseTurn = function() {
		_Game_Troop_increaseTurn.call(this);
		this.members().forEach(function(member) {
			member.resetFutureSightTexts();
		});
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'fsStart') {
			$gameSystem.enableFutureSight();
		} else if (command === 'fsStop') {
			$gameSystem.disableFutureSight();
		}
	};
  
	//-----------------------------------------------------------------------------
	// Sprite_Enemy
	//

	var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
	Sprite_Enemy.prototype.update = function() {
		_Sprite_Enemy_update.call(this);
		if (this._enemy) {
			this.updateFutureSight();
		}
	};

	Sprite_Enemy.prototype.updateFutureSight = function() {
		if (!this._futureSightSprite && this.parent) {
			this._futureSightSprite = new Sprite_FutureSight(this);
			this.parent.addChild(this._futureSightSprite);
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_FutureSight
	//

	function Sprite_FutureSight() {
		this.initialize.apply(this, arguments);
	}

	Sprite_FutureSight.prototype = Object.create(Sprite.prototype);
	Sprite_FutureSight.prototype.constructor = Sprite_FutureSight;

	Sprite_FutureSight.prototype.initialize = function(enemySprite) {
		Sprite.prototype.initialize.call(this);
		this._enemySprite = enemySprite;
		var width = SightWidth;
		var height = SightLineHeight * SightMaxLines + SightHeaderHeight;
		this.bitmap = new Bitmap(width, height);
		this.anchor.x = 0.5;
		this.anchor.y = 1;
		this.z = 10;
		this._texts = [];
		this._icons = [];
	};

	Sprite_FutureSight.prototype.refresh = function() {
		this.bitmap.clear();
		if (this._texts.length > 0) {
			var lines = this._texts.reduce(function(r, text) {
				return r + text.split('\n').length;
			}, 0);
			var y = SightHeaderHeight;
			var width = this.bitmap.width;
			var height = SightLineHeight * lines;
			this.drawSightBack(0, y, width, height);
			this.drawSightHeader(0, 0, width, SightHeaderHeight);
			this.drawSightText(4, y, width - 8, SightLineHeight);
		}
	};

	Sprite_FutureSight.prototype.drawSightBack = function(x, y, width, height) {
		this.bitmap.paintOpacity = SightBackOpacity;
		if (Imported.TMBitmapEx && SightCornerRadius) {
			this.bitmap.fillRoundRect(x, y, width, height, SightCornerRadius, SightBackColor);
		} else {
			this.bitmap.fillRect(x, y, width, height, SightBackColor);
		}
		this.bitmap.paintOpacity = 255;
	};

	Sprite_FutureSight.prototype.drawSightHeader = function(x, y, width, height) {
		if (SightHeaderText) {
			this.bitmap.fontSize = SightHeaderFontSize;
			this.bitmap.textColor = SightHeaderColor;
			this.bitmap.drawText(SightHeaderText, x, y, width, height);
		}
	};

	Sprite_FutureSight.prototype.drawSightText = function(x, y, width, height) {
		this.bitmap.fontSize = SightFontSize;
		this.bitmap.textColor = SightColor;
		for (var i = 0; i < this._texts.length; i++) {
			var text = this._texts[i];
			var iconIndex = this._icons[i];
			var dx = x;
			var dw = width;
			if (iconIndex > 0) {
				var iconX = this.sightIconX(text, width);
				if (iconX <= 0) {
					iconX = 0;
					dx += SightLineHeight;
					dw -= SightLineHeight;
				}
				this.drawSightIcon(iconIndex, x + iconX, y);
			}
			var arr = text.split('\n');
			for (var j = 0; j < arr.length; j++) {
				this.bitmap.drawText(arr[j], dx, y, dw, height, SightTextAlign);
				y += SightLineHeight;
			}
		}
	};

	Sprite_FutureSight.prototype.sightIconX = function(text, width) {
		var textWidth = this.bitmap.measureTextWidth(text);
		if (SightTextAlign === 'left') {
			return 0;
		} else if (SightTextAlign === 'center') {
			return (width - textWidth) / 2 - SightLineHeight;
		} else {
			return width - textWidth - SightLineHeight;
		}
	};

	Sprite_FutureSight.prototype.drawSightIcon = function(iconIndex, x, y) {
		var bitmap = ImageManager.loadSystem('IconSet');
		var pw = Window_Base._iconWidth;
		var ph = Window_Base._iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		var dw = SightLineHeight - 4;
		var dh = SightLineHeight - 4;
		this.bitmap.blt(bitmap, sx, sy, pw, ph, x + 2, y + 2, dw, dh);
	};

	Sprite_FutureSight.prototype.update = function() {
		Sprite.prototype.update.call(this);
		var futureSightTexts = this._enemySprite._enemy.futureSightTexts().concat();
		var futureSightIcons = this._enemySprite._enemy.futureSightIcons().concat();
		if (this._texts.toString() !== futureSightTexts.toString() ||
				this._icons.toString() !== futureSightIcons.toString()) {
			this._texts = futureSightTexts;
			this._icons = futureSightIcons;
			this.refresh();
		}
		var enemy = this._enemySprite._enemy.enemy();
		this.x = this._enemySprite.x + (+enemy.meta.fsOffsetX || 0);
		this.y = this._enemySprite.y + (+enemy.meta.fsOffsetY || 0);
	};

})();
