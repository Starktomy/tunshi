//
//  オートバトル ver1.03
//
// author yana
//

var Imported = Imported || {};
Imported['yAutoBattle'] = 1.03;

/*:
 * @plugindesc ver1.03/在战斗中通过按键输入可以开始自动战斗。另外，自动战斗中高速化。
 * @author Yana
 *
 * @param Invalidate Auto Battle Switch
 * @desc 是为了使自动战斗无效化的开关的id。
 * @default 11
 * 
 * @param Show X
 * @desc 是自动窗口的显示位置x坐标。
 * AutoBattleWindowの横幅は320です。
 * @default 496
 * 
 * @param Show Y
 * @desc 是自动地窗口的显示位置y坐标。
 * AutoBattleWindowの縦幅は49です。
 * @default 395
 * 
 * @param Auto Battle Speed
 * @desc 是自动的战斗速度。
请用* 1~ 4设定。1是默认，4是最快的。
 * @default 4
 * 
 * @param Show Window
 * @desc 是显示自动窗的窗的设定。
*非显示的情况下，在文本后面显示黑色带。
 * @default true
 * 
 * @param Auto Battle Use Skill
 * @desc 自动战斗时，是使用技能的设定。
*在正常情况下，会采取和一般自动战斗一样的行动。
 * @default false
 * 
 * @param Window Hide Switch
 * @desc 是隐藏自动窗的开关的id。
*请用对话活动等想要删除的时候使用。
 * @default 12
 * 
 * @param Auto Battle Key
 * @desc 是用于启动自动战斗的键。
 * @default shift
 * 
 * @param Auto Battle Usable Message
 * @desc 在自动战斗窗中显示的文本。
*键转换为设定的键。
 * @default 現在オートバトル中 _keyで解除
 * 
 * @param Auto Battle Message
 * @desc オートバトル中以外に、AutoBattleWindowに表示するのテキストです。
 * _keyを設定されているキーに変換します。
 * @default _keyでオートバトル開始
 * 
 * @help------------------------------------------------------
 *  このプラグインにはプラグインコマンドはありません。
 * ------------------------------------------------------
 * 仕様と解説
 * ------------------------------------------------------
 * ・AutoBattleWindowをクリックすることでもオートバトルの開始/停止が可能です。
 * ・Auto Battle Keyで使用可能なキーの一覧は以下の通りです。
 * pageup : Qキー、pageupキー、LBボタン
 * pagedown : Wキー、pagedownキー、RBボタン
 * shift : shiftキー、Xボタン
 * control : ctrlキー、altキー
 * tab : tabキー
 * menu : Yボタン
 * ・Auto Battle Use Skillがfalseの場合、通常攻撃のみを行います。
 * ・イベントが開始しても自動でウィンドウは消えません。これはコモンイベントなどで開いたり閉じたりするのを防ぐ目的があります。
 * ------------------------------------------------------
 * 利用規約：特になし。素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * ver1.03:
 * スキルウィンドウとアイテムウィンドウが開いたとき、オートバトルウィンドウが閉じるように修正。
 * ver1.02:
 * startMoveでcallが抜けていたバグを修正
 * ver1.01:
 * startTurnが2回実行される可能性のあるバグを修正
 * ver1.00:
 * 公開
 */

(function(){
	
	var parameters = PluginManager.parameters('AutoBattle');
	var invalidateAutoBattleSwitch = Number(parameters['Invalidate Auto Battle Switch'] || 11);
	var showX = Number(parameters['Show X'] || 496);
	var showY = Number(parameters['Show Y'] || 395);
	var autoBattleSpeed = Number(parameters['Auto Battle Speed'] || 4);
	var showWindow = String(parameters['Show Window'] || 'true') === 'true';
	var autoBattleUseSkill = String(parameters['Auto Battle Use Skill'] || 'false') === 'true';
	var windowHideSwitch = Number(parameters['Window Hide Switch'] || 12);
	var autoBattleKey = String(parameters['Auto Battle Key'] || 'shift');
	var autoBattleUsableMessage = String(parameters['Auto Battle Usable Message'] || '現在オートバトル中　Shiftで解除');
	var autoBattleMessage = String(parameters['Auto Battle Message'] || 'Shiftでオートバトル開始');
	
	BattleManager.isAutoBattle = function(){
		return this._autoBattle && !this.isAutoBattleInvalid();
	};
	
	BattleManager.autoBattleActivate = function(){
		this._autoBattle = true;
	};
	
	BattleManager.autoBattleDeactivate = function(){
		this._autoBattle = false;
	};
	
	BattleManager.isAutoBattleInvalid = function(){
		return $gameSwitches.value(invalidateAutoBattleSwitch);
	};
	
	BattleManager.startAutoBattle = function(){
		this.clearActor();
		
		for(var i=0;i<$gameParty.members().length;i++){
			this.selectNextCommand();
			var actor = $gameParty.members()[i];
			
			if (actor && actor.canInput()){
				actor.makeActions();
				if (autoBattleUseSkill){
					actor.makeAutoBattleActions();
				}else{
					
					actor._actions.forEach(function(action){
						var symbol = actor._lastBattleSkill._itemId;
						if (symbol != 0) {
							var skill = $dataSkills[symbol];
							if (skill && actor.skills().contains(skill) && actor.canUse(skill)) {
								action.setSkill(symbol);
							} else {
								action.setAttack();
								actor.selectNextCommand();
							}
						} else {
							action.setAttack();
							actor.selectNextCommand();
						}
						
					});
				}
			}
		}
		
		
		if (BattleManager.isInputting()){ this.startTurn() }
	};
	
	var _aB_BManager_startInput = BattleManager.startInput;
	BattleManager.startInput = function(){
		_aB_BManager_startInput.call(this);
		if (this.isAutoBattle()){ this.startAutoBattle() }
	};
	
	var _aB_BManager_startTurn = BattleManager.startTurn;
	BattleManager.startTurn = function() {
		if (!this.isAutoBattle()){ SceneManager._scene._autoBattleWindow.close() }
		_aB_BManager_startTurn.call(this);
    };
	
	function Window_AutoBattle() {
		this.initialize.apply(this, arguments);
	};

	Window_AutoBattle.prototype = Object.create(Window_Base.prototype);
	Window_AutoBattle.prototype.constructor = Window_AutoBattle;

	Window_AutoBattle.prototype.initialize = function() {
		Window_Base.prototype.initialize.call(this,showX,showY,120,49);
		if (!showWindow){ this.opacity = 0 }
		this.refresh();
	};
	
	Window_AutoBattle.prototype.standardPadding = function(){
		return 6;
	};
	
	Window_AutoBattle.prototype.refresh = function(){
		this.contents.clear();
		this.contents.fontSize = 30;
		var b1 = 'rgba(0,0,0,0)';
		var b2 = 'rgba(0,0,0,0.5)';
		if (!showWindow){
			var w = this.contentsWidth()/4;
			this.contents.gradientFillRect(0,0,w,32,b1,b2);
			this.contents.fillRect(w,0,w*2,32,b2);
			this.contents.gradientFillRect(w*3,0,w,32,b2,b1);
		}
		var text = BattleManager.isAutoBattle() ? autoBattleUsableMessage : autoBattleMessage;
		text = text.replace(/_key/,autoBattleKey);
		this.drawText(text,0,0,this.contentsWidth(),'center');
	};
	
	///////////////////////////////////////////////////////////////////////////////////
	
	var _aB_SBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function(){
		_aB_SBattle_createAllWindows.call(this);
		this.createAutoBattleWindow();
	};
	
	Scene_Battle.prototype.createAutoBattleWindow = function(){
		this._autoBattleWindow = new Window_AutoBattle();
		this._autoBattleWindow.hide();
		this._autoBattleWindow.close();
		this.addWindow(this._autoBattleWindow);
	};
	
	var _aB_SBattle_updateTurn = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		_aB_SBattle_updateTurn.call(this);

		var autoLocal = localStorage.getItem("autobattle");
        if (autoLocal == "1") {
            localStorage.removeItem("autobattle");
            this.deactivateAutoBattle();
        }

		if (this._autoBattleWindow.isOpen() && 
			(Input.isTriggered(autoBattleKey) || this.onTouchCallAutoBattle())){
			if (BattleManager.isAutoBattle()){
				this.deactivateAutoBattle();
				SoundManager.playCancel();
			} else if (!BattleManager.isInTurn() && !BattleManager.isAutoBattleInvalid() &&
					  (this._partyCommandWindow.active || this._actorCommandWindow.active)){
				this.activateAutoBattle();
				SoundManager.playOk();
				this._partyCommandWindow.deactivate();
				this._actorCommandWindow.deactivate();
				BattleManager.startAutoBattle();
			}
		} else if (this._autoBattleWindow.isOpen() && 
				  (this.isHideAutoBattleWindow() || BattleManager.isAutoBattleInvalid())){
			this.deactivateAutoBattle();
		}
		this.endHideAutoBattleWindow();
	};
	
	Scene_Battle.prototype.onTouchCallAutoBattle = function(){
		if (TouchInput.isTriggered()){ 
			var x = TouchInput.x;
			var y = TouchInput.y;
			var ax = this._autoBattleWindow.x;
			var xw = ax + this._autoBattleWindow.width;
			var ay = this._autoBattleWindow.y;
			var yh = ay + this._autoBattleWindow.height;
			return x >= ax && x <= xw && y >= ay && y <= yh;
		}
		return false;
	};
	
	Scene_Battle.prototype.canAuto = function(){
		return !(BattleManager.isAutoBattleInvalid() || this.isHideAutoBattleWindow());
	};
	
	var _aB_SBattle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
	Scene_Battle.prototype.startPartyCommandSelection = function() {
		if (this.canAuto()){
			this._autoBattleWindow.show();
			this._autoBattleWindow.open();
		}
		_aB_SBattle_startPartyCommandSelection.call(this);
	};
	
	var _aB_SBattle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
	Scene_Battle.prototype.startActorCommandSelection = function(){
		_aB_SBattle_startActorCommandSelection.call(this);
		if (this.canAuto()){ this._autoBattleWindow.open() }
	};
	
	
	var _aB_SBattle_commandSkill = Scene_Battle.prototype.commandSkill;
	Scene_Battle.prototype.commandSkill = function(){
		_aB_SBattle_commandSkill.call(this);
		this._autoBattleWindow.close();
	};
	
	var _aB_SBattle_commandItem = Scene_Battle.prototype.commandItem;
	Scene_Battle.prototype.commandItem = function(){
		_aB_SBattle_commandItem.call(this);
		this._autoBattleWindow.close();
	};
	
	var _aB_SBattle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
	Scene_Battle.prototype.onSkillCancel = function(){
		_aB_SBattle_onSkillCancel.call(this);
		if (this.canAuto()){ this._autoBattleWindow.open() }
	};
	
	var _aB_SBattle_onItemCancel = Scene_Battle.prototype.onItemCancel;
	Scene_Battle.prototype.onItemCancel = function(){
		_aB_SBattle_onItemCancel.call(this);
		if (this.canAuto()){ this._autoBattleWindow.open() }
	};
	
	var _aB_SBattle_commandEscape = Scene_Battle.prototype.commandEscape;
	Scene_Battle.prototype.commandEscape = function(){
		if (!BattleManager.isAutoBattle()){ this._autoBattleWindow.close() }
		this.deactivateAutoBattle();
		_aB_SBattle_commandEscape.call(this);
	};
	
	Scene_Battle.prototype.isHideAutoBattleWindow = function(){
		return $gameSwitches.value(windowHideSwitch);
	};
	
	Scene_Battle.prototype.endHideAutoBattleWindow = function(){
		if (BattleManager.isAborting() || $gameParty.members().length === 0 ||
			$gameParty.isAllDead() || $gameTroop.isAllDead()){
			this.deactivateAutoBattle();
		}
	};
	
	Scene_Battle.prototype.deactivateAutoBattle = function(){
		BattleManager.autoBattleDeactivate();
		this._autoBattleWindow.refresh();
		if (this._autoBattleWindow.isOpen()){ this._autoBattleWindow.close() }
	};
	
	Scene_Battle.prototype.activateAutoBattle = function(){
		BattleManager.autoBattleActivate();
		this._autoBattleWindow.refresh();
		if (!this._autoBattleWindow.isOpen()){ this._autoBattleWindow.open() }
		Input.update();
   		TouchInput.update();
	};
	
	// オートバトル中、メッセージ速度を変更
	var _aB_WBLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;
	Window_BattleLog.prototype.messageSpeed = function() {
		if (BattleManager.isAutoBattle()){
			return _aB_WBLog_messageSpeed.call(this) / autoBattleSpeed;
		}else{
			return _aB_WBLog_messageSpeed.call(this);
		}
	};
	
	// オートバトル中、rateを高速化
	var _aB_SAnimation_setupRate = Sprite_Animation.prototype.setupRate;
	Sprite_Animation.prototype.setupRate = function() {
		if (BattleManager.isAutoBattle()){
			this._rate = 4 / autoBattleSpeed;
		}else{
			_aB_SAnimation_setupRate.call(this);
		}
	};
	
	// オートバトル中、アクターのアクション待ちを短縮
	var _aB_SBattler_startMove = Sprite_Battler.prototype.startMove;
	Sprite_Battler.prototype.startMove = function(x, y, duration) {
    	if (BattleManager.isAutoBattle()){
    		duration /= autoBattleSpeed;
    	}
    	_aB_SBattler_startMove.call(this,x,y,duration);
	};
}());
