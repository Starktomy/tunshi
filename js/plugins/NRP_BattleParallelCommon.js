//=============================================================================
// NRP_BattleParallelCommon.js
//=============================================================================
/*:ja
 * @target MV MZ
 * @plugindesc v1.022 Enables parallel common events, even during battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477740800.html
 *
 * @help Enables parallel common events, even during battle
 * Register the target common events in the plugin parameter.
 * If the configured switch is on at that time, it will be executed in parallel.
 * 
 * Conversely, you can also disable registered common events on the map.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param commonEventsWhiteList
 * @type common_event[]
 * @default []
 * @desc Register a parallel common event to be enabled in battle.
 * 
 * @param invalidOnMap
 * @type boolean
 * @default false
 * @desc Disables registered parallel common events on the map.
 * 
 * @param validAllCommon
 * @type boolean
 * @default false
 * @desc Enables parallel common events in battle.
 * The above registration common events will be meaningless.
 * 
 * @param alwaysMonitorChange
 * @type boolean
 * @default false
 * @desc It always monitors changes in variables and switches.
 * It can handle variable operations by external plugins.
 */

/*:
 * @target MV MZ
 * @plugindesc v1.022 在战斗中也启用公共事件的并行处理。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/477740800.html
 *
 * @help 在战斗中也启用公共事件的并行处理。
 * 在插件参数中注册要并行的公共事件。
 * 如果在该状态下设置的开关打开，则执行并行。
 * 
 * 相反，也可以在地图上禁用注册的公共事件。
 * 这样可以创建仅在战斗中有效的公共事件。
 * 
 * ■使用条款
 * 没有特别限制。
 * 改变、重新分发自由、可以商用、权利表示也是任意的。
 * 作者不负责，但关于问题将在可能的范围内处理。
 * 
 * @param commonEventsWhiteList
 * @text 注册公共事件
 * @type common_event[]
 * @default []
 * @desc 注册在战斗中有效的并行公共事件。
 * 
 * @param invalidOnMap
 * @text 在地图上禁用
 * @type boolean
 * @default false
 * @desc 在地图上禁用已注册的并行公共事件。
 * 
 * @param validAllCommon
 * @text 所有公共事件生效
 * @type boolean
 * @default false
 * @desc 在战斗中启用所有并行的公共事件。
 * 这样，上面注册公共事件就没有意义。
 * 
 * @param alwaysMonitorChange
 * @text 始终监视变化
 * @type boolean
 * @default false
 * @desc 战斗中，始终监视变量和开关的变化。
 * 可支持外部插件的变量操作等。
 */
(function() {
"use strict";

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}

/**
 * ●JSON用数値リストをJS用に変換
 */
function parseNumberList(param) {
    if (!param) {
        return [];
    }
    return JSON.parse(param).map(val => Number(val));
}

const PLUGIN_NAME = "NRP_BattleParallelCommon";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pWhiteList = parseNumberList(parameters["commonEventsWhiteList"]);
const pInvalidOnMap = toBoolean(parameters["invalidOnMap"], false);
const pValidAllCommon = toBoolean(parameters["validAllCommon"], false);
const pAlwaysMonitorChange = toBoolean(parameters["alwaysMonitorChange"], false);

/**
 * ●戦闘開始
 */
const _BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    _BattleManager_startBattle.apply(this, arguments);

    // 戦闘用コモンイベントの作成
    $gameMap.setupBattleCommonEvents();
};

/**
 * 【独自】戦闘用コモンイベントの作成
 */
Game_Map.prototype.setupBattleCommonEvents = function() {
    // 戦闘テスト時は並列コモンイベントを作成
    // ※通常はマップを経由しないと生成できないため
    if (DataManager.isBattleTest()) {
        this._commonEvents = [];
        for (const commonEvent of this.parallelCommonEvents()) {
            this._commonEvents.push(new Game_CommonEvent(commonEvent.id));
        }
    }

    // 全コモンイベントを有効化する場合
    if (pValidAllCommon) {
        this._battleCommonEvents = this._commonEvents;
        return;
    }

    // ホワイトリストに含まれるコモンイベントだけを抽出する。
    this._battleCommonEvents = this._commonEvents.filter(function(commonEvent) {
        return pWhiteList.includes(commonEvent._commonEventId);
    });

    // リフレッシュ
    this.refreshBattleCommonEvent();
};

/**
 * ●更新処理
 */
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.apply(this, arguments);

    $gameMap.updateBattleCommonEvents();
};

/**
 * ●リフレッシュ処理のリクエスト
 */
const _Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
Game_Map.prototype.requestRefresh = function(mapId) {
    _Game_Map_requestRefresh.apply(this, arguments);

    // 戦闘用のリフレッシュ処理を設定
    if (pAlwaysMonitorChange) {
        this._needsRefreshOnBattle = true;
    }
};

/**
 * 【独自】戦闘中の並列処理実行
 */
Game_Map.prototype.updateBattleCommonEvents = function() {
    // 戦闘用のリフレッシュ処理を実行
    if (this._needsRefreshOnBattle) {
        if ($gameParty.inBattle()) {
            this._needsRefreshOnBattle = false;
            $gameMap.refreshBattleCommonEvent();
        }
    }

    // 並列処理実行
    for (const commonEvent of this._battleCommonEvents) {
        commonEvent.update();
    }
};

/**
 * 【独自】コモンイベントの更新
 */
Game_Map.prototype.refreshBattleCommonEvent = function() {
    // 空の場合は処理しない。
    if (!this._battleCommonEvents) {
        return;
    }

    for (const commonEvent of this._battleCommonEvents) {
        commonEvent.refresh();
    }
};

/**
 * 【独自】並列コモンイベントが有効かどうかの判定
 */
const _Game_CommonEvent_isActive = Game_CommonEvent.prototype.isActive;
Game_CommonEvent.prototype.isActive = function() {
    // 全コモンイベントが有効なら元のまま
    if (pValidAllCommon) {
        return _Game_CommonEvent_isActive.apply(this, arguments);
    }

    // 非戦闘中はホワイトリスト登録分を無効化する。
    if (pInvalidOnMap && !$gameParty.inBattle()) {
        if (pWhiteList.includes(this._commonEventId)) {
            return false;
        }
    }

    return _Game_CommonEvent_isActive.apply(this, arguments);
};

/**
 * ●スイッチが変更された場合
 */
const _Game_Switches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    _Game_Switches_onChange.apply(this, arguments);

    if ($gameParty.inBattle()) {
        $gameMap.refreshBattleCommonEvent();
    }
};

/**
 * ●マップ切替時
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.apply(this, arguments);

    // 全コモンイベントが有効なら元のまま
    if (pValidAllCommon) {
        return;
    }

    // 非戦闘中はホワイトリスト登録分を無効化する。
    if (pInvalidOnMap) {
        for (const event of $gameMap._commonEvents) {
            if (pWhiteList.includes(event._commonEventId)) {
                event.refresh();
            }
        }
    }
};

})();
