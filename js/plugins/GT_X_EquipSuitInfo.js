//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitInfo
// GT_X_EquipSuitInfo.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitInfo = true;

var GT = GT || {};
GT.ESInfo = GT.ESInfo || {};
GT.ESInfo.version = 1.3;

//=============================================================================
/*:
 * @plugindesc [v1.3]        控件 - 模块信息窗口 - 套装信息扩展
 * @author ganfly
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 
 * 本插件为装备套装系统和模块信息窗口的套装信息扩展，可以将套装
 * 信息显示出来。
 * 必须安装GT_EquipSuitCore和GT_ObjectInfoWindow才能运行。
 * 请将本插件置于GT_EquipSuitCore和GT_ObjectInfoWindow的下面
 *
 * ============================================================================
 * 参数对照表及公式
 * ============================================================================
 *
 *  Base代表基础值，Plus代表参数加成，Rate代表参数倍率
 * 
 *  基础参数      公式：(Base + Plus) * Rate
 *  MHP 最大生命
 *  MMP 最大魔法
 *  ATK 攻击力
 *  DEF 防御力
 *  MAT 魔法攻击力
 *  MDF 魔法防御力
 *  AGI 敏捷
 *  LUK 幸运
 *
 *  额外参数      公式：(Base + Plus) * Rate
 *  HIT 命中率
 *  EVA 闪避率
 *  CRI 暴击率
 *  CEV 暴击闪避率
 *  MEV 魔法闪避率
 *  MRF 魔法反射率
 *  CNT 反击率
 *  HRG 生命自动回复率
 *  MRG 魔法自动回复率
 *  TRG 怒气自动回复率
 * 
 *  特殊参数      公式：(Base + Plus) * Rate
 *  TGR 受到攻击几率
 *  GRD 防御效果
 *  REC 回复效果
 *  PHA 药理知识
 *  MCR 魔法消耗率
 *  TCR 怒气补充率
 *  PDR 物理伤害率
 *  MDR 魔法伤害率
 *  FDR 地形伤害率
 *  EXR 经验率
 *  
 *  战斗结算      公式：(Base + Base * Plus) * Rate
 *  EXP 经验获得量
 *  GOLD 金币获得量
 *  ITEM 物品爆率
 * 
 *
 * ============================================================================
 * 用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 * 更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *
 * [v1.1] 增加显示套装所含装备数和当前已装备数的功能。
 *        增加yana窗口中显示套装所含装备名的功能。
 * 
 * [v1.2] 修复了一系列小bug。
 *
 * [v1.3] 移除自带窗口，改为模块信息窗口的一部分，
 *        移除YEP物品信息窗口和yana的详细信息窗口。
 *        此版本插件大改翻新，请重新配置插件参数。
 *        
 * ============================================================================
 * 帮助结束
 * ============================================================================
 *
 * @param ShowESInfo
 * @text 显示套装信息?
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在模块信息窗口中显示套装信息？
 * @default true
 *
 * @param ShowInsideEquip
 * @text 显示套装内包含的装备?
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示套装内包含的装备？
 * @default true
 *
 * @param IsEquipedFmt
 * @text 已装备物品名显示格式
 * @parent ShowInsideEquip
 * @desc 已装备的物品名显示格式, 用%1替换物品名，可以使用文字代码。
 * @default \c[3]★%1\c[0]
 *
 * @param NotEquipedFmt
 * @text 未装备物品名显示格式
 * @parent ShowInsideEquip
 * @desc 未装备的物品名显示格式, 用%1替换物品名，可以使用文字代码。
 * @default ★%1
 *
 * @param SuitNameFmt
 * @text 套装名称显示格式
 * @parent Text
 * @desc 套装名称显示格式，用%1替换套装名称，可以使用文字代码。
 * @default \c[27]%1\c[0]
 *
 * @param SuitNumFmt
 * @text 套装已装备数量显示格式
 * @parent Text
 * @desc 套装已装备数量显示格式，用%1替换已装备数量，用%2替换总数量，可以使用文字代码。
 * @default \c[26][%1/%2]\c[0]
 *
 * @param PiecesFmt
 * @text 分层名称显示格式
 * @parent Text
 * @desc 套装分层效果名称显示格式, 用%1替换套装层数，可以使用文字代码。
 * @default \c[27][%1]套装效果:\c[0]
 *
 * @param PassiveStateText
 * @text 被动状态行首文字
 * @parent Text
 * @desc 显示在被动状态前的文字，可以使用文字代码。
 * @default 被动状态
 *
 * @param ShowPassiveState
 * @text 是否显示被动状态
 * @parent Text
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示被动状态。
 * @default true
 *
 */
//=============================================================================

if (Imported.GT_EquipSuitCore && Imported.GT_ObjectInfoWindow) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitInfo');
GT.Param = GT.Param || {};

//Tooltips
GT.Param.ESInfoShow = eval(GT.Parameters['ShowESInfo']);
GT.Param.ESShowInsideEquip = eval(GT.Parameters['ShowInsideEquip']);
GT.Param.ESIsEquipedText = String(GT.Parameters['IsEquipedFmt']);
GT.Param.ESNotEquipedText = String(GT.Parameters['NotEquipedFmt']);

//Text
GT.Param.ESSuitNameText = String(GT.Parameters['SuitNameFmt']);
GT.Param.ESSuitNumText = String(GT.Parameters['SuitNumFmt']);
GT.Param.ESPiecesText = String(GT.Parameters['PiecesFmt']);
GT.Param.ESPassiveStateText = String(GT.Parameters['PassiveStateText']);
GT.Param.ESShowPassiveState = eval(GT.Parameters['ShowPassiveState']);

//=============================================================================
// Window_ObjectInfo
//=============================================================================

Window_ObjectInfo.prototype.getEquipSuitData = function () {
	var item = this._item;
	if(!eval(GT.Param.ESInfoShow)) return;
	if (!item.equipSuit || !item.equipSuit.length) return;
	if (item.baseItemId)
		item = DataManager.getBaseItem(item);
	for (var i = 0; i < item.equipSuit.length; i++) {
		var suitId = item.equipSuit[i];
		if (!suitId) continue;
		var data = $dataEquipSuits[suitId];
		this.getSuitTitle(data);
		this.getESIsideEquip(data);
		this.getESBonuseData(data);
		this.getSuitDescription(data);
	}
};

Window_ObjectInfo.prototype.getSuitTitle = function(data) {
	var suitName = GT.Param.ESSuitNameText.format(data.name);
	if (this._actor) {
		var pieces = this._actor.getEquipSuitsCount(data.id, this._actor._equipSuitsTotal);
		var suitNum = data.indexEquip.length;
		suitName += GT.Param.ESSuitNumText.format(pieces, suitNum);
	}
	this._suitTitle.push(suitName);
};

Window_ObjectInfo.prototype.getESIsideEquip = function(data) {
	this._suitInside.push([]);
	if (!GT.Param.ESShowInsideEquip) return;
	var indexEquip = data.indexEquip;
	if (!indexEquip) return;
	var equips = [];
	if (this._actor) {
		for (var i = 0; i < this._actor.equips().length; i++) {
			var equip = this._actor.equips()[i];
			if (!equip) continue;
			if (equip.baseItemId)
				equip = DataManager.getBaseItem(equip);
			equips.push(equip);
		}
	}
	for (var i = 0; i < indexEquip.length; i++) {
		var text = '';
		var type = indexEquip[i][0];
		var itemId = indexEquip[i][1];
		var item = type ? $dataArmors[itemId] : $dataWeapons[itemId];
		if (!item) continue;
		var isEquiped = equips.contains(item);
		if (isEquiped)
			text += GT.Param.ESIsEquipedText.format(item.name);
		else 
			text += GT.Param.ESNotEquipedText.format(item.name);
		this._suitInside[this._suitInside.length - 1].push(text);
    }
};

Window_ObjectInfo.prototype.getSuitDescription = function(data) {
	this._suitAfter.push([]);
	if (data.description && data.description !== '""') {
		var description = JSON.parse(data.description).split(/[\r\n]+/);
		this._suitAfter[this._suitAfter.length - 1] = this._suitAfter[this._suitAfter.length - 1].concat(description);
	}
};

Window_ObjectInfo.prototype.getESBonuseData = function (data) {
	this._pieceTitle.push([]);
	this._suitData.push([]);
	this._opacityCheck.push([]);
	for (var p = 0; p < data.bonuses.length; p++) {
		var pieceBonuses = data.bonuses[p];
		if (!pieceBonuses.showText) continue;
		var requirePieces = pieceBonuses.requirePieces;
		var text = GT.Param.ESPiecesText.format(requirePieces);
		this._pieceTitle[this._pieceTitle.length - 1].push(text);
		this._suitData[this._suitData.length - 1].push([]);
		this.getBonusAutoText(pieceBonuses);
		if (pieceBonuses.text && pieceBonuses.text !== '""') {
			var bonusExText = JSON.parse(pieceBonuses.text).split(/[\r\n]+/);
			var suitData = this._suitData[this._suitData.length - 1];
			this._suitData[this._suitData.length - 1][suitData.length - 1] = this._suitData[this._suitData.length - 1][suitData.length - 1].concat(bonusExText);
		}
		
		if (this._actor) {
			var pieces = this._actor.getEquipSuitsCount(data.id, this._actor._equipSuitsTotal);
			this._opacityCheck[this._opacityCheck.length - 1].push((pieces || 0) >= requirePieces);
		} 
		else {
			this._opacityCheck[this._opacityCheck.length - 1].push(true);
		}
	}
};

Window_ObjectInfo.prototype.getBonusAutoText = function (bonusData) {
	this.getBaseParamText(bonusData);// Base Parameters
	this.getXParamText(bonusData);// X Parameters
	this.getSParamText(bonusData);// S Parameters
	this.getBResultText(bonusData);//Battle Result
	this.getPassiveStateText(bonusData);// States
	this.getStateResistText(bonusData);// StateResist
	this.getSkillText(bonusData);// Skill
};

Window_ObjectInfo.prototype.getBaseParamText = function (bonusData) {
	var text = '';
	var codeList = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
	for (var i = 0; i < 8; i++) {
		var code = codeList[i];
		if (!eval(GT.Param.OIWNParamTextShow[code])) continue;
		var rateValue = bonusData.paramRate[i];
		var plusValue = bonusData.paramPlus[i];
		if (rateValue !== 1) {
			text = this.addSystemColor(TextManager.param(i));
			var valueText = '\u00d7' + Math.round(this.sortValueDD(rateValue * 100)) + '%';
			if (rateValue > 1.0) text += this.addIncreaseColor(valueText);
			else text += this.addDecreaseColor(valueText);
			this.pushSuitData(text);
		}
		if (plusValue !== 0) {
			text = this.addSystemColor(TextManager.param(i));
			if (plusValue > 0) text += this.addIncreaseColor('+' + plusValue);
			else text += this.addDecreaseColor(plusValue);
			this.pushSuitData(text);
		}
	}
};

Window_ObjectInfo.prototype.getXParamText = function (bonusData) {
	var text = '';
	var category = 'OIWXParamText';
	var codeList = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
	for (var i = 0; i < 10; i++) {
		var code = codeList[i];
		if (!this.getObjTextShow(category, code)) continue;
		var rateValue = bonusData.xparamRate[i];
		var plusValue = bonusData.xparamPlus[i];
		if (rateValue !== 1) {
			text = this.getObjText(category, code);
			var valueText = '\u00d7' + Math.round(this.sortValueDD(rateValue * 100)) + '%';
			if (rateValue > 1.0) text += this.addIncreaseColor(valueText);
			else text += this.addDecreaseColor(valueText);
			this.pushSuitData(text);
		}
		if (plusValue !== 0) {
			text = this.getObjText(category, code);
			if (plusValue > 0) text += this.addIncreaseColor('+' + Math.round(plusValue) + '%');
			else text += this.addDecreaseColor(Math.round(plusValue) + '%');
			this.pushSuitData(text);
		}
	}
};

Window_ObjectInfo.prototype.getSParamText = function (bonusData) {
	var text = '';
	var category = 'OIWSParamText';
	var codeList = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
	for (var i = 0; i < 10; i++) {
		var code = codeList[i];
		if (!this.getObjTextShow(category, code)) continue;
		var rateValue = bonusData.sparamRate[i];
		var plusValue = bonusData.sparamPlus[i];
		if (rateValue !== 1) {
			text = this.getObjText(category, code);
			var valueText = '\u00d7' + Math.round(this.sortValueDD(rateValue * 100)) + '%';
			text += this.addBasicColor(valueText);
			this.pushSuitData(text);
		}
		if (plusValue !== 0) {
			text = this.getObjText(category, code);
			if (plusValue > 0) text += this.addBasicColor('+' + Math.round(plusValue) + '%');
			else text += this.addBasicColor(Math.round(plusValue) + '%');
			this.pushSuitData(text);
		}
	}
};

Window_ObjectInfo.prototype.getBResultText = function (bonusData) {
	var text = '';
	var category = 'OIWBResultText';
	var codeList = ['EXP', 'GOLD', 'ITEM'];
	for (var i = 0; i < 3; i++) {
		var code = codeList[i];
		if (!this.getObjTextShow(category, code)) continue;
		var rateValue = bonusData.bResultRate[i];
		var plusValue = bonusData.bResultPlus[i];
		if (rateValue !== 1) {
			text = this.getObjText(category, code);
			var valueText = '\u00d7' + Math.round(this.sortValueDD(rateValue * 100)) + '%';
			if (rateValue > 1.0) text += this.addIncreaseColor(valueText);
			else text += this.addDecreaseColor(valueText);
			this.pushSuitData(text);
		}
		if (plusValue !== 0) {
			text = this.getObjText(category, code);
			if (plusValue > 0) text += this.addIncreaseColor('+' + Math.round(plusValue) + '%');
			else text += this.addDecreaseColor(Math.round(plusValue) + '%');
			this.pushSuitData(text);
		}
	}
};

Window_ObjectInfo.prototype.getPassiveStateText = function (bonusData) {
	if (!GT.Param.ESShowPassiveState) return;
	var text = '';
	var states = bonusData.states;
	for (var i = 0; i < states.length; i++) {
		var stateId = states[i];
		var state = $dataStates[stateId];
		var stateName = state.name.replace(/<<(.*?)>>/i, '');
		if (state && stateName !== '') {
			text = this.addSystemColor(GT.Param.ESPassiveStateText) + this.textColon();
			if (GT.Param.OIWShowIcon && state.iconIndex > 0) {
				text += '\\i[' + state.iconIndex + ']';
			}
			text += this.addBasicColor(stateName);
			this.pushSuitData(text);
		}
	}
};

Window_ObjectInfo.prototype.getStateResistText = function (bonusData) {
	var category = 'OIWResistText'; 
	var code = 'StateImmunity';
	if (!this.getObjTextShow(category, code)) return;
	var text = '';
	var states = bonusData.statesResist;
	for (var i = 0; i < states.length; i++) {
		var stateId = states[i];
		var state = $dataStates[stateId];
		var stateName = state.name.replace(/<<(.*?)>>/i, '');
		if (state && stateName !== '') {
			text = this.getObjText(category, code) + this.textColon();
			if (GT.Param.OIWShowIcon && state.iconIndex > 0) {
				text += '\\i[' + state.iconIndex + ']';
			}
			text += this.addBasicColor(stateName);
			this.pushSuitData(text);
		}
	}
};

Window_ObjectInfo.prototype.getSkillText = function (bonusData) {
	var category = 'OIWSkillText';
	var code = 'AddSkill';
	var text = '';
	var skills = bonusData.skills;
	for (var i = 0; i < skills.length; i++) {
		var skillId = skills[i];
		var skill = $dataSkills[skillId];
		var skillName = skill.name.replace(/<<(.*?)>>/i, '');
		if (skill && skillName !== '') {
			text = this.getObjText(category, code) + this.textColon();
			if (GT.Param.OIWShowIcon && skill.iconIndex > 0) {
				text += '\\i[' + skill.iconIndex + ']';
			}
			text += this.addBasicColor(skillName);
			this.pushSuitData(text);
		}
	}
};

GT.ESInfo.Window_ObjectInfo_initialize = Window_ObjectInfo.prototype.initialize;
Window_ObjectInfo.prototype.initialize = function(windowSet) {
	this._suitTitle = [];
	this._suitInside = [];
	this._pieceTitle = [];
	this._suitData = [];
	this._suitAfter = [];
	this._opacityCheck = [];
	GT.ESInfo.Window_ObjectInfo_initialize.call(this, windowSet);
};

GT.ESInfo.Window_ObjectInfo_dataLength = Window_ObjectInfo.prototype.dataLength;
Window_ObjectInfo.prototype.dataLength = function() {
	var length = GT.ESInfo.Window_ObjectInfo_dataLength.call(this);
	length += this._suitTitle.length;
	for (var i = 0; i < this._suitData.length; i++) {
		length += this._suitInside[i].length;
		length += this._pieceTitle[i].length;
		for (var j = 0; j < this._suitData[i].length; j++) {
			length += this._suitData[i][j].length;
		}
		length += this._suitAfter[i].length;
	}
	return length;
};

GT.ESInfo.Window_ObjectInfo_makeObjInfo = Window_ObjectInfo.prototype.makeObjInfo;
Window_ObjectInfo.prototype.makeObjInfo = function () {
	this._suitTitle = [];
	this._suitInside = [];
	this._pieceTitle = [];
	this._suitData = [];
	this._suitAfter = [];
	this._opacityCheck = [];
	GT.ESInfo.Window_ObjectInfo_makeObjInfo.call(this);
};

GT.ESInfo.Window_ObjectInfo_calAllDataWidth = Window_ObjectInfo.prototype.calAllDataWidth;
Window_ObjectInfo.prototype.calAllDataWidth = function (width) {
	width = GT.ESInfo.Window_ObjectInfo_calAllDataWidth.call(this, width);
	for (var i = 0; i < this._suitData.length; i++) {
		width = this.calculateDataWidth(this._suitInside[i], width);
		width = this.calculateDataWidth(this._pieceTitle[i], width, 1);
		for (var j = 0; j < this._suitData[i].length; j++) {
			width = this.calculateDataWidth(this._suitData[i][j], width);
		}
		width = this.calculateDataWidth(this._suitAfter[i], width, 1);
	}
	width = this.calculateDataWidth(this._suitTitle, width, 1);
	return width;
};

Window_ObjectInfo.prototype.suitHeight = function () {
	var height = 0;
	var lineHeight = 0;
	for (var i = 0; i < this._suitData.length; i++) {
		lineHeight = 0;
		for (var j = 0; j < this._suitData[i].length; j++) {
			lineHeight += this.MoreColsCalHeight(this._suitData[i][j]);
		}
		lineHeight += this.MoreColsCalHeight(this._suitInside[i]);
		lineHeight += this._pieceTitle[i].length * this.lineHeight();
		lineHeight += this._suitAfter[i].length * this.lineHeight();
		if (lineHeight) lineHeight += this.textPadding() * 2 + this.lineHeight();
		height += lineHeight;
	}
	return height;
};

GT.ESInfo.Window_ObjectInfo_calAllDataHeight = Window_ObjectInfo.prototype.calAllDataHeight;
Window_ObjectInfo.prototype.calAllDataHeight = function () {
	var height = GT.ESInfo.Window_ObjectInfo_calAllDataHeight.call(this);
	height += this.suitHeight();
	return height;
};

GT.ESInfo.Window_ObjectInfo_getEquipInfo = Window_ObjectInfo.prototype.getEquipInfo;
Window_ObjectInfo.prototype.getEquipInfo = function () {
	GT.ESInfo.Window_ObjectInfo_getEquipInfo.call(this);
	this.getEquipSuitData();
};

GT.ESInfo.Window_ObjectInfo_drawOtherInfo = Window_ObjectInfo.prototype.drawOtherInfo;
Window_ObjectInfo.prototype.drawOtherInfo = function () {
	GT.ESInfo.Window_ObjectInfo_drawOtherInfo.call(this);
	this.drawEquipSuitInfo();
};

Window_ObjectInfo.prototype.drawEquipSuitInfo = function () {
	if (!this.suitHeight()) return;
	var x = 0;
	var y = 0;
	var y_0 = this.titleHeight() + this.exDataHeight(this._textTop) + this.dataHeight() + this.exDataHeight(this._damageData) + this.exDataHeight(this._textBottom) + this.exDataHeight(this._costData) + this.exDataHeight(this._requireData) + this.stateHeight() + this.levelHeight();
	var width = this.contents.width / this.maxCols();
	for (var j = 0; j < this._suitData.length; j++) {
		this.drawHorzLine(y_0);
		y_0 += this.textPadding();
		var text = this._suitTitle[j];
		this.drawTextEx(text, this.textPadding(), y_0);
		y_0 += this.lineHeight();
		
		var data = this._suitInside[j];
		var rows = data.length % this.maxCols() ? Math.ceil(data.length / this.maxCols()) : data.length / this.maxCols();
		for (var i = 0; i < data.length; i++) {
			x = this.textPadding() + Math.floor(i / rows) * width;
			y = (i % rows) * this.lineHeight() + y_0;
			var line = data[i];
			this.drawTextEx(line, x, y);
		}
		y_0 += this.MoreColsCalHeight(data);
		
		var data = this._suitData[j];
		var pieceTitle = this._pieceTitle[j];
		for (var i = 0; i < data.length; i++) {
			this.changePaintOpacity(this._opacityCheck[j][i]);
			this.drawTextEx(pieceTitle[i], this.textPadding(), y_0);
			y_0 += this.lineHeight();
			var pieceData = data[i];
			var rows = pieceData.length % this.maxCols() ? Math.ceil(pieceData.length / this.maxCols()) : pieceData.length / this.maxCols();
			for (var k = 0; k < pieceData.length; k++) {
				x = this.textPadding() + Math.floor(k / rows) * width;
				y = (k % rows) * this.lineHeight() + y_0;
				var line = pieceData[k];
				this.drawTextEx(line, x, y);
			}
			y_0 += this.MoreColsCalHeight(pieceData);
		}
		this.changePaintOpacity(true);
		
		data = this._suitAfter[j];
		for (var i = 0; i < data.length; i++) {
			x = this.textPadding();
			y = i * this.lineHeight() + y_0;
			var line = data[i];
			this.drawTextEx(line, x, y);
		}
		y_0 += this._suitAfter[j].length * this.lineHeight() + this.textPadding();
	}
};

Window_ObjectInfo.prototype.pushSuitData = function(text) {
	var data = this._suitData[this._suitData.length - 1];
	this._suitData[this._suitData.length - 1][data.length - 1].push(text);
};

//=============================================================================
// Scene_Boot
//=============================================================================
/*
GT.ESInfo.Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
	GT.ESInfo.Scene_Boot_create.call(this);
	if (GT.Param.ESTtpWindowSkin !== 'Window')
	    ImageManager.loadSystem(GT.Param.ESTtpWindowSkin);
};
*/
//=============================================================================
// End of File
//=============================================================================

} else {

Imported.GT_X_EquipSuitInfo = false;	
var text = '警告，你试图在没有安装GT_EquipSuitCore或者GT_ObjectInfoWindow的情况下运行GT_X_EquipSuitInfo，\n请安装GT_EquipSuitCore和GT_ObjectInfoWindow';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore && Imported.GT_ObjectInfoWindow

	