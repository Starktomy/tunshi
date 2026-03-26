//=============================================================================
// MOG_SceneSynthesis.js
//=============================================================================

/*:
 * @plugindesc (v1.0) 仿Mog的Yanfly合成插件的美化版。
 * @author Ryosonic
 *
 * @param Help X-Axis
 * @desc Definição X-Axis da janela de ajuda.
 * @default 0
 *
 * @param Help Y-Axis
 * @desc Definição Y-Axis da janela de ajuda.
 * @default 516
 *
 * @param Help Layout X-Axis
 * @desc Definição X-Axis do layout da janela de ajuda.
 * @default 0
 *
 * @param Help Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de ajuda.
 * @default -67
 * 
 * @param Command X-Axis
 * @desc Definição X-Axis da janela de comando.
 * @default 300
 *
 * @param Command Y-Axis
 * @desc Definição Y-Axis da janela de comando.
 * @default 6
 *
 * @param Command Layout X-Axis
 * @desc Definição X-Axis do layout da janela de comando.
 * @default 15
 *
 * @param Command Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de comando.
 * @default 15
 * 
 * @param List X-Axis
 * @desc Definição X-Axis da janela de list.
 * @default 19
 *
 * @param List Y-Axis
 * @desc Definição Y-Axis da janela de list.
 * @default 100
 *
 * @param List Layout X-Axis
 * @desc Definição X-Axis do layout da janela de list.
 * @default -19
 *
 * @param List Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de list.
 * @default -47
 * 
 * @param Ingredients X-Axis
 * @desc Definição X-Axis da janela de lista de Ingredients.
 * @default 392
 *
 * @param Ingredients Y-Axis
 * @desc Definição Y-Axis da janela de lista de Ingredients.
 * @default 100
 *
 * @param Ingredients Layout X-Axis
 * @desc Definição X-Axis do layout da janela de lista de Ingredients.
 * @default 0
 *
 * @param Ingredients Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de lista de Ingredients.
 * @default 0
 * 
 * @param Status X-Axis
 * @desc Definição X-Axis da janela de status.
 * @default 392
 *
 * @param Status Y-Axis
 * @desc Definição Y-Axis da janela de  status.
 * @default 340
 *
 * @param Status Layout X-Axis
 * @desc Definição X-Axis do layout da janela de status.
 * @default 0
 *
 * @param Status Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de status.
 * @default 0
 * 		
 * @param Gold X-Axis
 * @desc Definição X-Axis da janela de Gold.
 * @default 10
 *
 * @param Gold Y-Axis
 * @desc Definição Y-Axis da janela de Gold.
 * @default 120
 *
 * @param Gold Layout X-Axis
 * @desc Definição X-Axis do layout da janela de Gold.
 * @default 0
 *
 * @param Gold Layout Y-Axis
 * @desc Definição Y-Axis do layout da janela de Gold.
 * @default 0
 * @help  
 * =============================================================================
 * +++ MOG_SceneSynthesis.js (v1.0) +++
 * By Ryosonic 
 * 仿照Mog写的美化Yanfly合成版本。
 * Yanfly的插件已经修改过，所以两个请一起合用。
 * Yanfly的插件改动：Window_Command，windows_help；
 * 将文件放在以下目录：
 * /img/menus/Synthesis/
 *
 * =============================================================================
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SceneSynthesis = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SceneSynthesis');  
	Moghunter.scIngredients_HelpWindowX = Number(Moghunter.parameters['Help X-Axis'] || 0);
	Moghunter.scIngredients_HelpWindowY = Number(Moghunter.parameters['Help Y-Axis'] || 516);	
	Moghunter.scIngredients_HelpLayoutX = Number(Moghunter.parameters['Help Layout X-Axis'] || 0);
	Moghunter.scIngredients_HelpLayoutY = Number(Moghunter.parameters['Help Layout Y-Axis'] || -67);			
	Moghunter.scIngredients_ComWindowX = Number(Moghunter.parameters['Command X-Axis'] || 300);
	Moghunter.scIngredients_ComWindowY = Number(Moghunter.parameters['Command Y-Axis'] || 6);	
	Moghunter.scIngredients_ComLayoutX = Number(Moghunter.parameters['Command Layout X-Axis'] || 15);
	Moghunter.scIngredients_ComLayoutY = Number(Moghunter.parameters['Command Layout Y-Axis'] || 15);			
	Moghunter.scIngredients_ListWindowX = Number(Moghunter.parameters['List X-Axis'] || 19);
	Moghunter.scIngredients_ListWindowY = Number(Moghunter.parameters['List Y-Axis'] || 100);	
	Moghunter.scIngredients_ListLayoutX = Number(Moghunter.parameters['List Layout X-Axis'] || -19);
	Moghunter.scIngredients_ListLayoutY = Number(Moghunter.parameters['List Layout Y-Axis'] || -47);	
	Moghunter.scIngredients_IngredientsWindowX = Number(Moghunter.parameters['Ingredients X-Axis'] || 392);
	Moghunter.scIngredients_IngredientsWindowY = Number(Moghunter.parameters['Ingredients Y-Axis'] || 100);
	Moghunter.scIngredients_IngredientsLayoutX = Number(Moghunter.parameters['Ingredients Layout X-Axis'] || 0);
	Moghunter.scIngredients_IngredientsLayoutY = Number(Moghunter.parameters['Ingredients Layout Y-Axis'] || 0);	
	Moghunter.scIngredients_StatusWindowX= Number(Moghunter.parameters['Status X-Axis'] || 392);
	Moghunter.scIngredients_StatusWindowY = Number(Moghunter.parameters['Status Y-Axis'] || 340);
	Moghunter.scIngredients_StatusLayoutX = Number(Moghunter.parameters['Status Layout X-Axis'] || 0);
	Moghunter.scIngredients_StatusLayoutY = Number(Moghunter.parameters['Status Layout Y-Axis'] || 0);
	Moghunter.scIngredients_GoldWindowX= Number(Moghunter.parameters['Gold X-Axis'] || 305);
	Moghunter.scIngredients_GoldWindowY = Number(Moghunter.parameters['Gold Y-Axis'] || 280);
	Moghunter.scIngredients_GoldLayoutX = Number(Moghunter.parameters['Gold Layout X-Axis'] || 0);
	Moghunter.scIngredients_GoldLayoutY = Number(Moghunter.parameters['Gold Layout Y-Axis'] || 0);
		
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Equip
//==============================
ImageManager.loadMenussynthesis = function(filename) {
    return this.loadBitmap('img/menus/Synthesis/', filename, 0, true);
};
//=============================================================================
// ** Scene Equip
//=============================================================================

//==============================
// * create Background
//==============================
var _mog_scIngredients_createBackground = Scene_Synthesis.prototype.createBackground;
Scene_Synthesis.prototype.createBackground = function() {
	_mog_scIngredients_createBackground.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	
};

//==============================
// * Create
//==============================
var _mog_scIngredientsM_create = Scene_Synthesis.prototype.create;
Scene_Synthesis.prototype.create = function() {
	_mog_scIngredientsM_create.call(this);
	this._helpWindow.x = Moghunter.scIngredients_HelpWindowX;
	this._helpWindow.y = Moghunter.scIngredients_HelpWindowY;	
	this._helpWindowOrg = [this._helpWindow.x,this._helpWindow.y];
	this._commandWindow.x = Moghunter.scIngredients_ComWindowX;
	this._commandWindow.y = Moghunter.scIngredients_ComWindowY;
	this._commandWindow.contents.fontSize = Moghunter.scIngredients_FontSize;	
	this._commandWindowOrg = [this._commandWindow.x,this._commandWindow.y];
    this._listWindow.x = Moghunter.scIngredients_ListWindowX;
	this._listWindow.y = Moghunter.scIngredients_ListWindowY;
	this._listWindowOrg = [this._listWindow.x,this._listWindow.y];
	this._ingredientsWindow.x = Moghunter.scIngredients_IngredientsWindowX;
	this._ingredientsWindow.y = Moghunter.scIngredients_IngredientsWindowY;
	this._ingredientsWindow.width = this._listWindow.width
	this._ingredientsWindow.height = 230;
	this._ingredientsWindowOrg = [this._ingredientsWindow.x,this._ingredientsWindow.y];
	this._statusWindow.x = Moghunter.scIngredients_StatusWindowX;
	this._statusWindow.y = Moghunter.scIngredients_StatusWindowY;
	this._statusWindowOrg = [this._statusWindow.x,this._statusWindow.y];
	this._numberWindow.opacity = 0;
	this._numberWindow.x = Moghunter.scIngredients_IngredientsWindowX;
	this._numberWindow.y = Moghunter.scIngredients_IngredientsWindowY;
	this._goldWindow.x = Moghunter.scIngredients_GoldWindowX;
	this._goldWindow.y = Moghunter.scIngredients_GoldWindowY;
	this._goldWindowOrg = [this._goldWindow.x,this._goldWindow.y];
	this.createSprites();
	this.resetPosition();
};

//==============================
// * On Actor Change
//==============================
var _mog_scsIngredients_onActorChange = Scene_Synthesis.prototype.onActorChange;
Scene_Synthesis.prototype.onActorChange = function() {
	_mog_scsIngredients_onActorChange.call(this);
	this.resetPosition();
	this.update();
};

//==============================
// * Create Sprites
//==============================
Scene_Synthesis.prototype.createSprites = function() {
	this.createLayout();
	this.createLayoutHelp();
	this.createLayoutCommand();
	this.createLayoutList();
	this.createLayoutIngredients();
	this.createLayoutStatus();
	this.createLayoutGold();
};

//==============================
// * Create Layout
//==============================
Scene_Synthesis.prototype.createLayout = function() {
	this._layout = new Sprite(ImageManager.loadMenussynthesis("Layout"));
	this._field.addChild(this._layout);	
};

//==============================
// * Create LayoutHelp
//==============================
Scene_Synthesis.prototype.createLayoutHelp = function() {
	this._layoutHelp = new Sprite(ImageManager.loadMenussynthesis("LayoutHelp"));
	this._field.addChild(this._layoutHelp);	
};

//==============================
// * Create LayoutCommand
//==============================
Scene_Synthesis.prototype.createLayoutCommand = function() {
	this._layoutCommand = new Sprite(ImageManager.loadMenussynthesis("LayoutCommand"));
	this._field.addChild(this._layoutCommand);	
};

//==============================
// * Create LayoutSlot
//==============================
Scene_Synthesis.prototype.createLayoutList = function() {
	this._layoutList = new Sprite(ImageManager.loadMenussynthesis("LayoutList"));
	this._field.addChild(this._layoutList);	
};

//==============================
// * Create LayoutItem
//==============================
Scene_Synthesis.prototype.createLayoutIngredients = function() {
	this._layoutIngredients = new Sprite(ImageManager.loadMenussynthesis("LayoutIngredients"));
	this._field.addChild(this._layoutIngredients);	
};

//==============================
// * Create LayoutStatus
//==============================
Scene_Synthesis.prototype.createLayoutStatus = function() {
	this._layoutStatus = new Sprite(ImageManager.loadMenussynthesis("LayoutStatus"));
	this._field.addChild(this._layoutStatus);	
};

//==============================
// * Create Gold
//==============================
Scene_Synthesis.prototype.createLayoutGold = function() {
	this._layoutGold = new Sprite(ImageManager.loadMenussynthesis("LayoutGold"));
	this._field.addChild(this._layoutGold);	
};

//==============================
// * update Sprites
//==============================
Scene_Synthesis.prototype.updateSprites = function() {
	 this.updateSlide();
     this.updateLayout()	
};

//==============================
// * reset Position
//==============================
Scene_Synthesis.prototype.resetPosition = function() {
	var slide = 100
	this._helpWindow.y = this._helpWindowOrg[1] + slide;
	this._commandWindow.y = this._commandWindowOrg[1] - slide;
	this._listWindow.x = this._listWindowOrg[0] + slide;
	this._ingredientsWindow.x = this._ingredientsWindowOrg[0] - slide + 0;
	this._statusWindow.x = this._statusWindowOrg[0] - slide - 0;
	this._goldWindow.x = this._goldWindowOrg[0] + slide - 0;
	this._helpWindow.contentsOpacity = 0;
	this._helpWindow.contentsOpacity = 0;
	this._commandWindow.contentsOpacity = 0;
	this._listWindow.contentsOpacity = 0;
	this._ingredientsWindow.contentsOpacity = 0;
	this._statusWindow.contentsOpacity = 0;
	this._goldWindow.contentsOpacity = 0;
};

//==============================
// * update Slide
//==============================
Scene_Synthesis.prototype.updateSlide = function() {
	var slideSpeed = 5;
	var opcSpeed = 10;	
	this._helpWindow.contentsOpacity += opcSpeed;
	this._commandWindow.contentsOpacity += opcSpeed;
	this._listWindow.contentsOpacity += opcSpeed;
	this._ingredientsWindow.contentsOpacity += opcSpeed;
	this._statusWindow.contentsOpacity += opcSpeed;
    this._goldWindow.contentsOpacity += opcSpeed;	
	
    if (this._helpWindow.y > this._helpWindowOrg[1]) {
		this._helpWindow.y -= slideSpeed;
		if (this._helpWindow.y < this._helpWindowOrg[1]) {this._helpWindow.y = this._helpWindowOrg[1]};
	};
    if (this._commandWindow.y < this._commandWindowOrg[1]) {
		this._commandWindow.y += slideSpeed;
		if (this._commandWindow.y > this._commandWindowOrg[1]) {this._commandWindow.y = this._commandWindowOrg[1]};
	};	
    if (this._listWindow.x > this._listWindowOrg[0]) {
		this._listWindow.x -= slideSpeed;
		if (this._listWindow.x < this._listWindowOrg[0]) {this._listWindow.x = this._listWindowOrg[0]};
	};
    if (this._ingredientsWindow.x < this._ingredientsWindowOrg[0]) {
		this._ingredientsWindow.x += slideSpeed;
		if (this._ingredientsWindow.x > this._ingredientsWindowOrg[0]) {this._ingredientsWindow.x = this._ingredientsWindowOrg[0]};
	};
    if (this._statusWindow.x < this._statusWindowOrg[0]) {
		this._statusWindow.x += slideSpeed;
		if (this._statusWindow.x > this._statusWindowOrg[0]) {this._statusWindow.x = this._statusWindowOrg[0]};
	};	
    if (this._goldWindow.x > this._goldWindowOrg[0]) {
		this._goldWindow.x -= slideSpeed;
		if (this._goldWindow.x < this._goldWindowOrg[0]) {this._goldWindow.x = this._goldWindowOrg[0]};
	};	
};


//==============================
// * update Layout
//==============================
Scene_Synthesis.prototype.updateLayout = function() {
	this._layoutHelp.x = this._helpWindow.x + Moghunter.scIngredients_HelpLayoutX;
	this._layoutHelp.y = this._helpWindow.y + Moghunter.scIngredients_HelpLayoutY;
	this._layoutHelp.opacity = this._helpWindow.contentsOpacity
	this._helpWindow.opacity = 0;	
	this._layoutCommand.x = this._commandWindow.x + Moghunter.scIngredients_ComLayoutX;
	this._layoutCommand.y = this._commandWindow.y + Moghunter.scIngredients_ComLayoutY;
	this._layoutCommand.opacity = this._commandWindow.contentsOpacity;
    this._commandWindow.opacity = 0;	
	this._layoutList.x = this._listWindow.x + Moghunter.scIngredients_ListLayoutX;
	this._layoutList.y = this._listWindow.y + Moghunter.scIngredients_ListLayoutY;
	this._layoutList.opacity = this._listWindow.contentsOpacity;
    this._listWindow.opacity = 0;		
	this._layoutIngredients.x = this._ingredientsWindow.x + Moghunter.scIngredients_IngredientsLayoutX;
	this._layoutIngredients.y = this._ingredientsWindow.y + Moghunter.scIngredients_IngredientsLayoutY;
	this._layoutIngredients.opacity = this._ingredientsWindow.contentsOpacity;
    this._ingredientsWindow.opacity = 0;	
	this._layoutStatus.x = this._statusWindow.x + Moghunter.scIngredients_StatusLayoutX;
	this._layoutStatus.y = this._statusWindow.y + Moghunter.scIngredients_StatusLayoutY;
	this._layoutStatus.opacity = this._statusWindow.contentsOpacity;
    this._statusWindow.opacity = 0;	
	this._layoutGold.x = this._goldWindow.x + Moghunter.scIngredients_GoldLayoutX;
	this._layoutGold.y = this._goldWindow.y + Moghunter.scIngredients_GoldLayoutY;
	this._layoutGold.opacity = this._statusWindow.contentsOpacity;
	this._goldWindow.opacity = 0;	
};

//==============================
// * Update
//==============================
var _mog_scIngredients_update = Scene_Synthesis.prototype.update;
Scene_Synthesis.prototype.update = function() {
	_mog_scIngredients_update.call(this);
    if (this._layout) {this.updateSprites()};
};

Window_SynthesisCommand.prototype.windowWidth = function() {
    return 520;
};

Window_SynthesisCommand.prototype.numVisibleRows = function() {
    return 1;
};

Window_SynthesisList.prototype.initialize = function(commandWindow) {
    this._commandWindow = commandWindow
    var wy = commandWindow.y + commandWindow.height;
    var ww = 332;
    var wh = 330;
    Window_Selectable.prototype.initialize.call(this, 0, wy, ww, wh);
    this.refresh();
};

Window_SynthesisList.prototype.windowWidth = function() {
    return Graphics.boxWidth / 2;
};

Scene_Synthesis.prototype.createIngredientsWindow = function() {
    var wx = this._listWindow.width;
    var wy = this._listWindow.y;
    var ww = 400;
    var wh = 200;
    this._ingredientsWindow = new Window_SynthesisIngredients(wx, wy, ww, wh);
    this._listWindow._ingredients = this._ingredientsWindow;
    this.addWindow(this._ingredientsWindow);
};

Scene_Synthesis.prototype.createStatusWindow = function() {
    var wx = 415;
    var wy = this._commandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = 178;
    this._statusWindow = new Window_SynthesisStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Synthesis.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.width = 200;
    this._goldWindow.y = 0;
    this._goldWindow.createContents();
    this._goldWindow.refresh();
    this.addWindow(this._goldWindow);
};
