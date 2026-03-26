//=============================================================================
// Drill_ItemCategory.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        主菜单 - 物品类型
 * @author Drill_up
 *
 * @help  
 * =============================================================================
 * +++ Drill_ItemCategory +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置物品、武器、防具、关键道具之外的类型。
 * ★★必须放在 物品界面插件、商店界面插件 的后面★★
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，使得添加或者修改类型。
 * 作用于：
 *   - MOG_SceneItem 主菜单-全自定义物品界面
 *     可以修改目标插件中的 物品类型 和 物品类型按钮。
 *   - Drill_SenceShop 主菜单-全自定义商店界面
 *     可以修改目标插件中的物品类型。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 属于新类型的物品，需要在物品/装备/防具中添加下面注释：
 * 
 * <物品类型:蔬果>
 *
 * 指定物品会被划分到 蔬果 类。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有menus_item文件夹！      (img/menus_item)
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 资源-类型按钮
 * 
 * 如果你使用的不是全自定义物品界面，可以不配置按钮资源。
 *
 * -----------------------------------------------------------------------------
 * ----使用说明
 * 1.物品类型只控制在 物品界面和商店界面 的显示情况。
 * 2.商店出售去掉的类型，意味着对所有商店，该类型的物品不出售。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 *
 * @param 是否使用可视化代码
 * @parent ----按钮组----
 * @type boolean
 * @on 使用生成器代码
 * @off 关闭生成器代码
 * @desc true - 使用生成器代码，false - 禁用生成器代码
 * @default true
 *
 * @param 物品界面物品类型
 * @type text[]
 * @desc 物品类型顺序按照当前配置的来，你可以选择性去掉已有的类型。
 * @default ["物品","武器","防具","重要物品"]
 *
 * @param 商店出售物品类型
 * @type text[]
 * @desc 物品类型顺序按照当前配置的来，物品界面可以不显示武器和防具，但是出售可以显示。
 * @default ["物品","武器","防具","重要物品"]
 *
 * 
 * @param ---物品类型组---
 * @default 
 *
 * @param 物品类型-1
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-2
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-3
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-4
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-5
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-6
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-7
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-8
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-9
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 * @param 物品类型-10
 * @parent ---物品类型组---
 * @type struct<ItemSenceBtn>
 * @desc 添加新的物品类型，名字要对应上。
 * @default 
 *
 */
/*~struct~ItemSenceBtn:
 * 
 * @param 物品类型名
 * @desc 填入你新建的物品类型的对应的名字。不要和 物品,武器,防具,重要物品 重名。
 * @default 类型1
 *
 * @param 资源-类型按钮
 * @desc 新类型按钮的图片资源，对应MOG_SceneItem 全自定义物品界面 中的按钮。
 * @default 道具界面-道具选项
 * @require 1
 * @dir img/menus_item/
 * @type file
 *
 * @param 平移-类型按钮 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。对应MOG_SceneItem 全自定义物品界面 中的坐标。
 * @default 280
 *
 * @param 平移-类型按钮 Y
 * @desc y轴方向平移，单位像素。0为贴在最上面。对应MOG_SceneItem 全自定义物品界面 中的坐标。
 * @default 85
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	Window_ItemCategory.prototype.makeCommandList
//						(mog)Scene_Item.prototype.createButtons
//						(mog)Scene_Item.prototype.addCatIndex
//
//插件记录：
//		
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_ItemCategory = true;
　　var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_ItemCategory');
	if(DrillUp.parameters['物品界面物品类型'] != "" ){
		DrillUp.itemCat_type_iSence = JSON.parse(DrillUp.parameters['物品界面物品类型']);
	}else{
		DrillUp.itemCat_type_iSence = ["物品","武器","防具","重要物品"];
	}
	if(DrillUp.parameters['商店出售物品类型'] != "" ){
		DrillUp.itemCat_type_sSence = JSON.parse(DrillUp.parameters['商店出售物品类型']);
	}else{
		DrillUp.itemCat_type_sSence = ["物品","武器","防具","重要物品"];
	}
	
	DrillUp.itemCat_type_max = 10;
	DrillUp.itemCat_type = [];
	
	for (var i = 0; i < DrillUp.itemCat_type_max; i++) {
		if( DrillUp.parameters['物品类型-' + String(i+1) ] != "" ){
			DrillUp.itemCat_type[i] = JSON.parse(DrillUp.parameters['物品类型-' + String(i+1) ]);
			DrillUp.itemCat_type[i]['name'] = String(DrillUp.itemCat_type[i]["物品类型名"]);
			DrillUp.itemCat_type[i]['src_img'] = String(DrillUp.itemCat_type[i]["资源-类型按钮"]);
			DrillUp.itemCat_type[i]['x'] = Number(DrillUp.itemCat_type[i]["平移-类型按钮 X"]);
			DrillUp.itemCat_type[i]['y'] = Number(DrillUp.itemCat_type[i]["平移-类型按钮 Y"]);
		}else{
			DrillUp.itemCat_type[i] = [];
		}
	}
//=============================================================================
//  以下为MOG可视化编辑器生成部分
//=============================================================================
Moghunter.using_selfDesignCode_ItemCategory = String(Moghunter.parameters["是否使用可视化代码"] || "true") == "true";
	if(Moghunter.using_selfDesignCode_ItemCategory){
	
	    // ** 物品界面物品类型
	    DrillUp.itemCat_type_iSence = ["物品","武器","防具","重要物品"];
	    // ** 商店出售物品类型
	    DrillUp.itemCat_type_sSence = ["物品","武器","防具","重要物品"];

	    DrillUp.itemCat_type_max = 0;
	    DrillUp.itemCat_type = [];

	}
//=============================================================================
// ** 物品类型泛用设置
//=============================================================================
Window_ItemCategory.prototype.maxCols = function() {
	if(SceneManager._scene.constructor.name === "Scene_Shop"){ return DrillUp.itemCat_type_sSence.length;}	//商店界面的类型
	return DrillUp.itemCat_type_iSence.length;
};
Window_ItemCategory.prototype.makeCommandList = function() {
	for (var i = 0; i < this.maxCols(); i++) {
		var symbol = DrillUp.itemCat_type_iSence[i];
		if(SceneManager._scene.constructor.name === "Scene_Shop"){ symbol = DrillUp.itemCat_type_sSence[i];}	//商店界面的类型
		if (symbol === 'item' || symbol === '物品') {
			this.addCommand(TextManager.item, 'item');
		} else if (symbol === 'weapon' || symbol === '武器') {
			this.addCommand(TextManager.weapon, 'weapon');
		} else if (symbol === 'armor' || symbol === '防具') {
			this.addCommand(TextManager.armor, 'armor');
		} else if (symbol === 'keyItem' || symbol === '重要物品') {
			this.addCommand(TextManager.keyItem, 'keyItem');
		} else {
			this.addCommand(symbol, symbol);
		}
	}
};

var _drill_Window_ItemList_includes = Window_ItemList.prototype.includes;
Window_ItemList.prototype.includes = function(item) {
	if (item && item.meta["物品类型"]) return this._category === item.meta["物品类型"];
	return _drill_Window_ItemList_includes.call(this, item);
};

//=============================================================================
// ** 物品界面
//=============================================================================

if( Imported.MOG_SceneItem ){	//修改mog物品界面类型窗口
	Scene_Item.prototype.createButtons = function() {
		this._buttons = [];
		this._buttonsAni = [];
		for (var i = 0; i < DrillUp.itemCat_type_iSence.length; i++) {
			var symbol = DrillUp.itemCat_type_iSence[i];
			if (symbol === 'item' || symbol === '物品') {
				this._buttons[i] = new Sprite(this._comImg[0]);
				this._buttons[i].x = Moghunter.scItem_Com1_X;
				this._buttons[i].y = Moghunter.scItem_Com1_Y;
			} else if (symbol === 'weapon' || symbol === '武器') {
				this._buttons[i] = new Sprite(this._comImg[1]);
				this._buttons[i].x = Moghunter.scItem_Com2_X;
				this._buttons[i].y = Moghunter.scItem_Com2_Y;
			} else if (symbol === 'armor' || symbol === '防具') {
				this._buttons[i] = new Sprite(this._comImg[2]);
				this._buttons[i].x = Moghunter.scItem_Com3_X;
				this._buttons[i].y = Moghunter.scItem_Com3_Y;
			} else if (symbol === 'keyItem' || symbol === '重要物品') {
				this._buttons[i] = new Sprite(this._comImg[3]);
				this._buttons[i].x = Moghunter.scItem_Com4_X;
				this._buttons[i].y = Moghunter.scItem_Com4_Y;
			} else {
				this._buttons[i] = new Sprite();
				for(var j = 0; j < DrillUp.itemCat_type.length; j++){
					if( DrillUp.itemCat_type[j].length == 0 ){
						continue;
					}
					if( symbol === DrillUp.itemCat_type[j]['name'] ){
						this._buttons[i].bitmap = ImageManager.loadMenusitem(DrillUp.itemCat_type[j]['src_img']);
						this._buttons[i].x = DrillUp.itemCat_type[j]['x'];
						this._buttons[i].y = DrillUp.itemCat_type[j]['y'];
					}
				}
			}
			this._buttonsAni[i] = 0;
			this._buttons[i].anchor.x = 0.5;
			this._buttons[i].anchor.y = 0.5;
			this._buttons[i]._org_x = this._buttons[i].x;
			this._buttons[i]._org_y = this._buttons[i].y;
			this._field.addChild(this._buttons[i]);
		};
	};
	Scene_Item.prototype.addCatIndex = function(value) {
		this._categoryWindow._index += value;
		if (this._categoryWindow._index > DrillUp.itemCat_type_iSence.length-1) {this._categoryWindow._index = 0};
		if (this._categoryWindow._index < 0) {this._categoryWindow._index = DrillUp.itemCat_type_iSence.length-1 };
		if (this._wani[2] != null) {this._categoryWindow._index = this._wani[2]}
		this._categoryWindow.update();
		this._itemWindow.select(0);
		this._list_oldindex = 0;
		this._itemWindow.updateHelp();
	};
	Window_ItemListM.prototype.includes = function(item) {
		if (item && item.meta["物品类型"]) return this._category === item.meta["物品类型"];
		return _drill_Window_ItemList_includes.call(this, item);
	};
	
}
var _Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
	_Scene_Item_create.call(this);
	if (DrillUp.itemCat_type_iSence.length === 1) {
		this._categoryWindow.deactivate();
		this._categoryWindow.hide();
		var ww = this._itemWindow.width;
		var wh = this._itemWindow.height + this._categoryWindow.height;
		this._itemWindow.move(this._itemWindow.x, this._categoryWindow.y, ww, wh);
		this._itemWindow.setHandler('cancel', this.popScene.bind(this));
		this._itemWindow.setCategory(this._categoryWindow.currentSymbol());
		this.onCategoryOk();
	}
};

//=============================================================================
// ** 商店界面
//=============================================================================

var _Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
	_Scene_Shop_create.call(this);
	if (DrillUp.itemCat_type_iSence.length === 1) {
		var ww = this._sellWindow.width;
		var wh = this._sellWindow.height + this._categoryWindow.height;
		this._sellWindow.move(this._sellWindow.x, this._categoryWindow.y, ww, wh);
		this._sellWindow.setCategory(this._categoryWindow.currentSymbol());
	}
};

var _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
Scene_Shop.prototype.commandSell = function() {
	_Scene_Shop_commandSell.call(this);
	if (DrillUp.itemCat_type_iSence.length === 1) {
		this._sellWindow.activate();
		this._statusWindow.hide();
		this._sellWindow.select(0);
		this._categoryWindow.hide();
	}
};

var _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() {
	_Scene_Shop_onSellCancel.call(this);
	if (DrillUp.itemCat_type_iSence.length === 1) {
		this.onCategoryCancel();
	}
};
if( Imported.Drill_SenceShop ){	//修改全自定义商店界面的类型
	Window_ShopItemCategory.prototype.makeCommandList = function() {
		for (var i = 0; i < DrillUp.itemCat_type_sSence.length ; i++) {
			var symbol = DrillUp.itemCat_type_sSence[i];
			if (symbol === 'item' || symbol === '物品') {
				this.addCommand(TextManager.item, 'item');
			} else if (symbol === 'weapon' || symbol === '武器') {
				this.addCommand(TextManager.weapon, 'weapon');
			} else if (symbol === 'armor' || symbol === '防具') {
				this.addCommand(TextManager.armor, 'armor');
			} else if (symbol === 'keyItem' || symbol === '重要物品') {
				this.addCommand(TextManager.keyItem, 'keyItem');
			} else {
				this.addCommand(symbol, symbol);
			}
		}
	};
}