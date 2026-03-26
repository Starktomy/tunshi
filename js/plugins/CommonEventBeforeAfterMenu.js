//=============================================================================
// CommonEventBeforeAfterMenu.js
//=============================================================================

/*:
 * @plugindesc 打开或关闭菜单时执行指定的公共事件。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @param Common Event ID (before Menu)
 * @text 公共事件ID(打开菜单之前)
 * @desc 设置打开菜单前执行的公共事件的ID。
 * @default 0
 *
 * @param Common Event ID (after Menu)
 * @text 公共事件ID(关闭菜单之后)
 * @desc 设置关闭菜单后执行的公共事件的ID。
 * @default 0
 *
 * @help
 *  此插件没有插件命令。 
 *
 * [ 使用条款 ] ................................................................
 *  ・本插件仅限于RPG工具MV/RPGMakerMV的正版用户。
 *  ・无论是商用、非商用、有偿、无偿、面向公众还是成人，均可使用。
 *  ・使用时不需要联系或报告。 另外，也不需要记载制作者姓名等。
 *  ・请勿以与导入插件的作品随附的形式以外的形式重新分发、转载。
 *  ・基本上不接受故障应对以外的支持和请求。
 *  ・对于本插件产生的任何问题，概不负责。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.03  2017/04/24  ウェイトを含んだコモンイベントを実行すると、
 *                             イベント後にメニューが開かない問題を修正
 *   Version 1.02  2017/02/13  メニュー後コモンイベントが、マップ以外への
 *                             シーン遷移時にも実行予約されていた問題を修正
 *   Version 1.01  2017/01/05  メニュー後コモンイベントIDを0に設定しても
 *                             コモンイベントの予約が実行されていた問題を修正
 *   Version 1.00  2016/07/21  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

(function(){
    'use strict';

    const _PNAME = 'CommonEventBeforeAfterMenu';
    const _PARAMETERS = PluginManager.parameters(_PNAME);

    const _COMMON_EVENT_ID_BM = +_PARAMETERS['Common Event ID (before Menu)'] || 0;
    const _COMMON_EVENT_ID_AM = +_PARAMETERS['Common Event ID (after Menu)']  || 0;

    function _(f){ return f[_PNAME] = f[_PNAME] || {} }

    var _Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
    Scene_Map.prototype.isMenuCalled = function() {
        return _Scene_Map_isMenuCalled.call(this) || _(this).reserveCallMenu;
    };

    var _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (_COMMON_EVENT_ID_BM && !_(this).reserveCallMenu) {
            _(this).reserveCallMenu = true;
            $gameTemp.reserveCommonEvent(_COMMON_EVENT_ID_BM);
        } else {
            _(this).reserveCallMenu = false;
            _Scene_Map_callMenu.call(this);
        }
    };

    var _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
    Scene_Menu.prototype.terminate = function() {
        if (_COMMON_EVENT_ID_AM && SceneManager.isNextScene(Scene_Map)) {
            $gameTemp.reserveCommonEvent(_COMMON_EVENT_ID_AM);
        }
        _Scene_Menu_terminate.call(this);
    };
}());
