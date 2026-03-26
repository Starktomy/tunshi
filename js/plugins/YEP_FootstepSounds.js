//=============================================================================
// Yanfly Engine Plugins - Footstep Sounds
// YEP_FootstepSounds.js
// Translate to Japanese : munokura.tk
//=============================================================================

var Imported = Imported || {};
Imported.YEP_FootstepSounds = true;

var Yanfly = Yanfly || {};
Yanfly.Footsteps = Yanfly.Footsteps || {};
Yanfly.Footsteps.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 Set footstep sounds to play when the player and/or
 * events walk over specific tiles.
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @param ---Default---
 * @default
 *
 * @param Default Sound
 * @parent ---Default---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The default SE sound used for all tiles.
 * @default Move1
 *
 * @param Default Volume
 * @parent ---Default---
 * @desc Volume of the footsteps made by default.
 * Insert a number value.
 * @default 10
 *
 * @param Default Pitch
 * @parent ---Default---
 * @desc Pitch of the footsteps made by default.
 * Insert a number value.
 * @default 150
 *
 * @param ---Player Settings---
 * @default
 *
 * @param Player Enable
 * @parent ---Player Settings---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Play footstep sounds for the player character?
 * Disable - false     Enable - true
 * @default true
 *
 * @param Player Volume
 * @parent ---Player Settings---
 * @desc What volume rate to play the footsteps at for player?
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Player Pitch
 * @parent ---Player Settings---
 * @desc What pitch rate to play the footsteps at for player?
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param ---Event Settings---
 * @default
 *
 * @param Event Enable
 * @parent ---Event Settings---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Play footstep sounds for the events?
 * Disable - false     Enable - true
 * @default true
 *
 * @param Event Volume
 * @parent ---Event Settings---
 * @desc What volume rate to play the footsteps at for events?
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Volume
 * @parent ---Event Settings---
 * @desc Change the volume by this much per tile difference
 * from event to player. Use a float value.
 * @default -0.10
 *
 * @param Event Pitch
 * @parent ---Event Settings---
 * @desc What pitch rate to play the footsteps at for events?
 * Use a float value. 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Pitch
 * @parent ---Event Settings---
 * @desc Change the pitch by this much per tile difference
 * from event to player. Use a float value.
 * @default -0.00
 *
 * @param Distance Pan
 * @parent ---Event Settings---
 * @desc Change the pan by this much per tile difference
 * from event to player. Use an int value.
 * @default 10
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin gives your player and/or events footsteps when they walk onto
 * tiles. These footsteps made by players and/or events can have different
 * sounds based on regions, tilesets, and/or terrain tags. If footsteps are
 * enabled for events, they can have distance based volumes and pitches to
 * immerse the player further.
 *
 * This is a collaboration plugin by Chickie and Yanfly to ensure compatibility
 * with the Yanfly Engine Plugins library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * This plugin requires a bit of setup. Adjust the plugin parameters to set up
 * a default set of footsteps that are to be played when nothing else has been
 * set. These sound effects will be played when there are no region-specific
 * sound effects or terrain tag-specific sound effects.
 *
 * That said, if you go into your project's database and go to the Tilesets tab
 * you can set footsteps for each tileset. The tiles can play specific footstep
 * sounds based on their terrain tag ID. Look in the notetags section below for
 * the notetag setup on how to make a set of tiles play certain footsteps. The
 * footsteps made here have higher priority than the default sound effects and
 * if the player or event steps on a tile that has a footstep sound tied to a
 * terrain tag, that footstep sound will be played instead.
 *
 * Even higher on the priority level are the region-based footstep sounds. If
 * the player or an event steps on a tile that has a region-based footstep
 * sound, then that sound will be played regardless of the terrain tag setting
 * made for that specific tile. Look in the notetags section below for the
 * notetag setup on how to make a specific region ID play a footstep sound.
 *
 * To sum it up, from lowest to highest priority:
 *
 *   LOWEST  - Default Footstep Sound
 *             Terrain Tag Footstep Sound
 *   HIGHEST - Region-Based Footstep Sound
 *
 * If you wish to give a whole map a certain footsteps sound, use the notetag
 * to set a region-based footstep sound for region ID 0.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags to add footsteps to your maps.
 *
 * Event Notetag:
 *
 *   <No Footsteps>
 *   - Insert this into the notebox of any event you wish to not make any
 *   footsteps when moving.
 *
 * Tileset Notetags:
 *
 *   <Terrain Tag x Footstep Sound: filename>
 *   <Terrain Tag x Footstep Sound: filename, volume>
 *   <Terrain Tag x Footstep Sound: filename, volume, pitch>
 *   - Replace 'x' with the terrain tag ID (from 1 to 7). If 0 is used, it will
 *   be ignored.  When inserting the filename, the filename must be case
 *   sensitive and must not include the extension. The 'volume' and 'pitch'
 *   variables must be integar values between 0 and 100 if they are used.
 *
 *   Examples:
 *
 *   <Terrain Tag 1 Footstep Sound: Move1>
 *   <Terrain Tag 2 Footstep Sound: Move2, 80>
 *   <Terrain Tag 3 Footstep Sound: Move3, 75, 150>
 *
 *   In the above examples, the tiles marked by terrain tags 1, 2, or 3 will
 *   play their respective sound effect when stepped on by the player or an
 *   event that can trigger footsteps.
 *
 * Map Notetags:
 *
 *   <Region x Footstep Sound: filename>
 *   <Region x Footstep Sound: filename, volume>
 *   <Region x Footstep Sound: filename, volume, pitch>
 *   - Replace 'x' with the region tag ID (from 1 to 255). If 0 is used, it
 *   will become the default footstep sound.  When inserting the filename, the
 *   filename must be case sensitive and must not include the extension. The
 *   'volume' and 'pitch' variables must be integar values between 0 and 100 if
 *   they are used.
 *
 *   Examples:
 *
 *   <Region 10 Footstep Sound: Move1>
 *   <Region 20 Footstep Sound: Move2, 80>
 *   <Region 30 Footstep Sound: Move3, 75, 150>
 *
 *   In the above examples, the tiles marked by regions 10, 20, or 30 will play
 *   their respective sound effect when stepped on by the player or an event
 *   that can trigger footsteps.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * If at any time you wish to enable/disable footstep sounds in your game, you
 * can use some plugin commands to do so.
 *
 * Plugin Commands:
 *
 *   EnableFootsteps
 *   - Turns on footstep sounds.
 *
 *   DisableFootsteps
 *   - Turns off footstep sounds.
 */
 /*:ja
 * @plugindesc v1.01 プレーヤーやイベントが特定のタイルの上を歩いたときに再生される足音を設定します。
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @param ---デフォルト---
 * @default
 *
 * @param Default Sound
 * @parent ---デフォルト---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc すべてのタイルに使用されるデフォルトのSE
 * @default Move1
 *
 * @param Default Volume
 * @parent ---デフォルト---
 * @desc デフォルト足音の音量
 * 数値を入力してください。
 * @default 10
 *
 * @param Default Pitch
 * @parent ---デフォルト---
 * @desc デフォルト足音のピッチ
 * 数値を入力してください。
 * @default 150
 *
 * @param---プレイヤー設定---
 * @default
 *
 * @param Player Enable
 * @parent---プレイヤー設定---
 * @type boolean
 * @on 再生する
 * @off 再生しない
 * @desc プレーヤー足音を再生設定
 * 再生しない - false     再生する - true
 * @default true
 *
 * @param Player Volume
 * @parent---プレイヤー設定---
 * @desc プレーヤー足音の音量
 * float値を使用。 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Player Pitch
 * @parent---プレイヤー設定---
 * @desc プレーヤー足音のピッチ
 * float値を使用。 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param ---イベント設定---
 * @default
 *
 * @param Event Enable
 * @parent ---イベント設定---
 * @type boolean
 * @on 再生する
 * @off 再生しない
 * @desc イベント足音を再生設定
 * 再生しない - false     再生する - true
 * @default true
 *
 * @param Event Volume
 * @parent ---イベント設定---
 * @desc イベント足音の音量
 * float値を使用。 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Volume
 * @parent ---イベント設定---
 * @desc イベント毎、タイル毎によって音量を変えることができます。 float値を使用。
 * @default -0.10
 *
 * @param Event Pitch
 * @parent ---イベント設定---
 * @desc イベント足音のピッチ
 * float値を使用。 1.00 = 100%    0.50 = 50%
 * @default 1.00
 *
 * @param Distance Pitch
 * @parent ---イベント設定---
 * @desc イベント毎、タイル毎によってピッチを変えることができます。 float値を使用。
 * @default -0.00
 *
 * @param Distance Pan
 * @parent ---イベント設定---
 * @desc イベント毎、タイル毎によってパンを変えることができます。
 * int値を使用。
 * @default 10
 *
 * @help
 * 翻訳:ムノクラ
 * https://munokura.tk/
 * https://twitter.com/munokura/
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * このプラグインは、プレイヤーやイベントがタイルの上を歩く時、
 * 足音を提供します。
 * プレイヤーやイベントによって行われるこれらの足音は、
 * リージョン、タイルセット、地形タグに基づいて
 * さまざまな効果音を持つことができます。
 * 足音がイベントのために有効にされるならば、
 * 彼らは距離ベースの音量とピッチを持つことができます。
 *
 * これは、 YanflyEnginePlugins ライブラリとの互換性を確保するための、
 * Chickie と Yanfly によるコラボレーションプラグインです。
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * このプラグインは少し設定が必要です。
 * プラグインパラメータを調整して、他に何も設定されていない時、
 * 再生されるデフォルトの一連の足音を設定します。
 * これらの効果音は、
 * リージョン固有の効果音や地形タグ固有の効果音がない場合、再生されます。
 *
 * プロジェクトのデータベースにアクセスして[タイルセット]タブに移動すると、
 * 各タイルセットに足音を設定できます。
 * タイルは地形タグIDに基づいて特定の足音を再生できます。
 * 一連のタイルに特定の足音を再生させる方法については、
 * 以下のメモタグの章で設定を確認してください。
 * ここで作成した足音はデフォルトの効果音よりも優先度が高く、
 * プレイヤー・イベントが足音が地形タグに関連付けられているタイルを踏んだ場合、
 * その足音が代わりに再生されます。
 *
 * 優先レベルでさらに高いのは、
 * リージョンベースの足音です。
 * プレーヤー・イベントがリージョンベースの足音を持つタイルを踏むと、
 * その特定のタイルに対して行われた地形タグ設定に関係なく、
 * その効果音が再生されます。
 * 特定のリージョンIDに足音を再生させる方法については、
 * 以下のメモタグセクションを参照してください。
 *
 * 最低から最高までの優先順位があります。
 *
 *   最低  - デフォルトの足音
 *             地形タグの足音
 *   最高 - リージョンベースの足音
 *
 * マップ全体に一定の足音を与える場合、メモタグを使用して、
 * リージョンID0にリージョンベースの足音を設定します。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * あなたの地図に足音を加えるために、以下のメモを挿入してください。
 *
 * イベントのメモタグ
 *
 *   <No Footsteps>
 *   - 移動するときに足音を出したくないイベントのメモ欄にこれを挿入します。
 *
 * タイルセットのメモタグ
 *
 *   <Terrain Tag x Footstep Sound: filename>
 *   <Terrain Tag x Footstep Sound: filename, volume>
 *   <Terrain Tag x Footstep Sound: filename, volume, pitch>
 *   - 'x'を地形タグID(1から7)に置き換えます。
 *   0を指定した場合は無視されます。
 *   ファイル名を挿入するときは、ファイル名で大文字と小文字が区別され、
 *   拡張子を含めないでください。
 *   'volume'および'pitch'変数は、0から100までの整数値でなければなりません。
 *
 *   例:
 *
 *   <Terrain Tag 1 Footstep Sound: Move1>
 *   <Terrain Tag 2 Footstep Sound: Move2, 80>
 *   <Terrain Tag 3 Footstep Sound: Move3, 75, 150>
 *
 *   上記の例では、地形タグ1、2、3でマークされたタイルは、
 *   プレイヤーによって踏まれた時、
 *   また足音を引き起こすイベントによってそれぞれの効果音を再生します。
 *
 * マップのメモタグ
 *
 *   <Region x Footstep Sound: filename>
 *   <Region x Footstep Sound: filename, volume>
 *   <Region x Footstep Sound: filename, volume, pitch>
 *   - 'x'をリージョンタグID(1から255)で置き換えます。
 *   0を使用すると、デフォルトの足音になります。
 *   ファイル名を挿入するときは、ファイル名で大文字と小文字が区別され、
 *   拡張子を含めないでください。
 *   'volume'および'pitch'変数は、0から100までの整数値でなければなりません。
 *
 *   例:
 *
 *   <Region 10 Footstep Sound: Move1>
 *   <Region 20 Footstep Sound: Move2, 80>
 *   <Region 30 Footstep Sound: Move3, 75, 150>
 *
 *   上記の例では、リージョン10、20、30でマークされたタイルは、
 *   プレーヤーが踏んだとき、または足音を引き起こすイベントによって、
 *   それぞれの効果音を再生します。
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 足音を有効/無効にしたい場合、
 * そうするためにいくつかのプラグインコマンドを使用することができます。
 *
 * プラグインコマンド
 *
 *   EnableFootsteps
 *   - 足音をオンにします。
 *
 *   DisableFootsteps
 *   - 足音をオフにします。
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FootstepSounds');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Footsteps = {
  defaultSound:   String(Yanfly.Parameters['Default Sound']),
  defaultVolume:  Number(Yanfly.Parameters['Default Volume']),
  defaultPitch:   Number(Yanfly.Parameters['Default Pitch']),

  PlayerEnable:   eval(String(Yanfly.Parameters['Player Enable'])),
  PlayerVolume:   parseFloat(Yanfly.Parameters['Player Volume']),
  PlayerPitch:    parseFloat(Yanfly.Parameters['Player Pitch']),

  EventEnable:    eval(String(Yanfly.Parameters['Event Enable'])),
  EventVolume:    parseFloat(Yanfly.Parameters['Event Volume']),
  DistanceVolume: parseFloat(Yanfly.Parameters['Distance Volume']),
  EventPitch:     parseFloat(Yanfly.Parameters['Event Pitch']),
  DistancePitch:  parseFloat(Yanfly.Parameters['Distance Pitch']),
  DistancePan:    parseInt(Yanfly.Parameters['Distance Pan'])
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Footsteps.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Footsteps.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_FootstepSounds) {
    this.processFootstepNotetags($dataTilesets);
    Yanfly._loaded_YEP_FootstepSounds = true;
  }
  return true;
};

DataManager.processFootstepNotetags = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.terrainTagFootstepSounds = {
      0: [
        Yanfly.Param.Footsteps.defaultSound, 
        Yanfly.Param.Footsteps.defaultVolume, 
        Yanfly.Param.Footsteps.defaultPitch
      ]
    };

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<TERRAIN[ ]TAG[ ](\d+)[ ]FOOTSTEP SOUND:[ ](.*)>/i)) {
        var tagId = parseInt(RegExp.$1).clamp(1, 7);
        var footstepData = String(RegExp.$2).split(',');
        footstepData[0] = footstepData[0].trim();
        footstepData[1] = footstepData[1] ||
          Yanfly.Param.Footsteps.defaultVolume;
        footstepData[1] = parseInt(footstepData[1]);
        footstepData[2] = footstepData[2] ||
          Yanfly.Param.Footsteps.defaultPitch;
        footstepData[2] = parseInt(footstepData[2]);
        obj.terrainTagFootstepSounds[tagId] = footstepData;
      }
    }
  }
};

DataManager.processMapFootstepNotetags = function() {
  if (!$dataMap) return;

  $dataMap.regionFootstepSounds = {
    0: [
      Yanfly.Param.Footsteps.defaultSound, 
      Yanfly.Param.Footsteps.defaultVolume, 
      Yanfly.Param.Footsteps.defaultPitch
    ]
  };

  if (!$dataMap.note) return;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<REGION[ ](\d+)[ ]FOOTSTEP SOUND:[ ](.*)>/i)) {
      var regionId = parseInt(RegExp.$1).clamp(0, 255);
      var footstepData = String(RegExp.$2).split(',');
      footstepData[0] = footstepData[0].trim();
      footstepData[1] = footstepData[1] || Yanfly.Param.Footsteps.defaultVolume;
      footstepData[1] = parseInt(footstepData[1]);
      footstepData[2] = footstepData[2] || Yanfly.Param.Footsteps.defaultPitch;
      footstepData[2] = parseInt(footstepData[2]);
      $dataMap.regionFootstepSounds[regionId] = footstepData;
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Footsteps.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Footsteps.Game_System_initialize.call(this);
  this.initFootstepSettings();
};

Game_System.prototype.initFootstepSettings = function() {
  this._footstepsEnabled = true;
};

Game_System.prototype.canHearFootsteps = function() {
  if (this._footstepsEnabled === undefined) this.initFootstepSettings();
  return this._footstepsEnabled;
};

Game_System.prototype.setHearFootsteps = function(value) {
  if (this._footstepsEnabled === undefined) this.initFootstepSettings();
  this._footstepsEnabled = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Footsteps.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Footsteps.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'EnableFootsteps') {
    $gameSystem.setHearFootsteps(true);
  } else if (command === 'DisableFootsteps') {
    $gameSystem.setHearFootsteps(false);
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.FootstepsGame_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  if ($dataMap) DataManager.processMapFootstepNotetags();
  Yanfly.FootstepsGame_Map_setup.call(this, mapId);
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.Footsteps.Game_CharacterBase_increaseSteps =
  Game_CharacterBase.prototype.increaseSteps;
Game_CharacterBase.prototype.increaseSteps = function() {
  Yanfly.Footsteps.Game_CharacterBase_increaseSteps.call(this);
  if (this !== $gamePlayer) {
    this.processFootstepSound();
  }
};

Game_CharacterBase.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (this._canPlayFootsteps !== undefined) return this._canPlayFootsteps;
  this._canPlayFootsteps = Yanfly.Param.Footsteps.EventEnable;
  return this._canPlayFootsteps;
};

Game_CharacterBase.prototype.processFootstepSound = function() {
  if (this.canPlayFootsteps() && $gameSystem.canHearFootsteps()) {
    var player = $gamePlayer;
    var distance = $gameMap.distance(this.x, this.y, player.x, player.y);
    var volume = Yanfly.Param.Footsteps.EventVolume || 0;
    volume += distance * Yanfly.Param.Footsteps.DistanceVolume;
    var pitch = Yanfly.Param.Footsteps.EventPitch || 0;
    pitch += distance * Yanfly.Param.Footsteps.DistancePitch;
    var pan = 0;
    pan -= $gameMap.deltaX(this.x, player.x);
    this.playFootstepSound(volume, pitch, pan);
  };
};

Game_CharacterBase.prototype.playFootstepSound = function(volume, pitch, pan) {
  if (volume <= 0) return;
  if (pitch <= 0) return;
  if (!$dataMap) return;
  if (!$dataMap.regionFootstepSounds) DataManager.processMapFootstepNotetags();
  var x = this.x;
  if (this.x === 6) {
    x += 1;
  } else if (this.x === 4) {
    x -= 1;
  }
  var y = this.y;
  if (this.y === 2) {
    y += 1;
  } else if (this.y === 8) {
    y -= 1;
  }
  var regionId = $gameMap.regionId(x, y)
  var terrainTag = $gameMap.terrainTag(x, y);
  if (regionId > 0) {
    var footstepData = $dataMap.regionFootstepSounds[regionId];
  }
  if (!footstepData && terrainTag > 0) {
    var footstepData = $gameMap.tileset().terrainTagFootstepSounds[terrainTag];
  }
  if (!footstepData) footstepData = $dataMap.regionFootstepSounds[0];
  var se = {
    name:   footstepData[0],
    volume: footstepData[1] * volume,
    pitch:  footstepData[2] * pitch,
    pan:    pan.clamp(-100, 100)
  };
  AudioManager.playSe(se);
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.Footsteps.Game_Player_increaseSteps =
  Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
  Yanfly.Footsteps.Game_Player_increaseSteps.call(this);
  this.processFootstepSound();
};

Game_Player.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (!this.isNormal()) return false;
  return Yanfly.Param.Footsteps.PlayerEnable;
};

Game_Player.prototype.processFootstepSound = function() {
  if (this.canPlayFootsteps()) {
    var volume = Yanfly.Param.Footsteps.PlayerVolume || 0;
    var pitch = Yanfly.Param.Footsteps.PlayerPitch || 0;
    var pan = 0;
    this.playFootstepSound(volume, pitch, pan);
  };
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.canPlayFootsteps = function() {
  if (!$gameSystem.canHearFootsteps()) return false;
  if (this._canPlayFootsteps !== undefined) return this._canPlayFootsteps;
  this._canPlayFootsteps = Yanfly.Param.Footsteps.EventEnable;
  var note = this.event().note;
  if (note.match(/<NO FOOTSTEPS>/i)) this._canPlayFootsteps = false;
  return this._canPlayFootsteps;
};

//=============================================================================
// Game_Follower
//=============================================================================

Game_Follower.prototype.canPlayFootsteps = function() {
  if (!this.isVisible()) return false;
  return Game_Character.prototype.canPlayFootsteps.call(this);
};

//=============================================================================
// End of File
//=============================================================================