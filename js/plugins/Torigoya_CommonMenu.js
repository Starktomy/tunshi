/*---------------------------------------------------------------------------*
 * Torigoya_CommonMenu.js v.1.2.0
 *---------------------------------------------------------------------------*
 * 2022/04/17 02:48 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 来自菜单的公共事件调用插件 (v.1.2.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.2.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/Torigoya_CommonMenu.js
 * @help
 * メニューからコモンイベント呼び出しプラグイン (v.1.2.0)
 * https://torigoya-plugin.rutan.dev
 *
 * 在菜单中添加一个项目来调用公共事件 
 *
 * ------------------------------------------------------------
 * ■ 设置方法
 * ------------------------------------------------------------
 *
 * 请在此插件的设置中注册菜单项。
 * 它们按排列顺序显示在屏幕上。
 *
 * @param base
 * @text ■ 基本设置
 *
 * @param baseItems
 * @text 要添加到菜单的项目
 * @type struct<MenuItem>[]
 * @parent base
 * @default ["{\"name\": \"公共事件\",\"commonEvent\": \"1\",\"switchId\": \"0\",\"visibility\": \"true\",\"note\": \"\"}"]
 */

/*~struct~MenuItem:
 * @param name
 * @text 项目名
 * @desc 菜单中显示的项目名称 
 * @type string
 * @default
 *
 * @param commonEvent
 * @text 调用的公共事件
 * @desc 选择菜单时调用的公共事件
 * @type common_event
 * @default 0
 *
 * @param switchId
 * @text 启用开关 
 * @desc 仅当此开关打开时才允许选择 如果没有可用，
 * 则始终可以选择 
 * @type switch
 * @default 0
 *
 * @param visibility
 * @text 禁用时是否显示 
 * @desc 可以设置该开关未打开时是否显示菜单中的项目。 
 * @type boolean
 * @on 显示
 * @off 不显示
 * @default true
 *
 * @param note
 * @text 备注
 * @desc 备注。
 * 可以像RPGmake的备注栏一样使用。
 * @type note
 * @default
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_CommonMenu';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return `${parameter[key] || ''}`;
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function pickBooleanValueFromParameter(parameter, key, defaultValue = 'false') {
        return `${parameter[key] || defaultValue}` === 'true';
    }

    function pickNoteStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return (parameter[key].startsWith('"') ? JSON.parse(parameter[key]) : parameter[key]) || '';
    }

    function pickStructMenuItem(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            name: pickStringValueFromParameter(parameter, 'name', ''),
            commonEvent: pickIntegerValueFromParameter(parameter, 'commonEvent', 0),
            switchId: pickIntegerValueFromParameter(parameter, 'switchId', 0),
            visibility: pickBooleanValueFromParameter(parameter, 'visibility', 'true'),
            note: pickNoteStringValueFromParameter(parameter, 'note', ''),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.2.0',
            baseItems: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructMenuItem(parameter);
                });
            })(parameter.baseItems),
        };
    }

    Torigoya.CommonMenu = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        /**
         * メニュー項目の追加
         * @param item
         * @param index
         */
        Window_MenuCommand.prototype.torigoyaCommonMenu_addCommand = function (item, index) {
            const enabled = this.torigoyaCommonMenu_isEnable(item);
            if (!enabled && !this.torigoyaCommonMenu_isVisibility(item)) return;

            this.addCommand(this.torigoyaCommonMenu_itemName(item), `TorigoyaCommonMenu_${index}`, enabled);
        };

        /**
         * メニュー項目が有効であるか？
         * @param item
         * @returns {boolean}
         */
        Window_MenuCommand.prototype.torigoyaCommonMenu_isEnable = function (item) {
            return item.switchId ? $gameSwitches.value(parseInt(item.switchId, 10)) : true;
        };

        /**
         * メニュー項目が可視状態であるか？
         * @param item
         * @returns {boolean}
         */
        Window_MenuCommand.prototype.torigoyaCommonMenu_isVisibility = function (item) {
            return item.visibility;
        };

        /**
         * メニュー項目の名前を取得
         * @param item
         * @returns {string}
         */
        Window_MenuCommand.prototype.torigoyaCommonMenu_itemName = function (item) {
            return item ? item.name : '';
        };

        const upstream_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function () {
            upstream_Window_MenuCommand_addOriginalCommands.apply(this);

            Torigoya.CommonMenu.parameter.baseItems.forEach(this.torigoyaCommonMenu_addCommand.bind(this));
        };

        const upstream_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function () {
            upstream_Scene_Menu_createCommandWindow.apply(this);

            Torigoya.CommonMenu.parameter.baseItems.forEach((item, i) => {
                const id = parseInt(item.commonEvent, 10);
                if (!id) return;

                this._commandWindow.setHandler(`TorigoyaCommonMenu_${i}`, () => {
                    $gameTemp.reserveCommonEvent(id);
                    SceneManager.goto(Scene_Map);
                });
            });
        };
    })();
})();
