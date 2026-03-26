//=============================================================================
// MPP_ChoiceEX.js
//=============================================================================
// Copyright (c) 2015 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @target MV MZ
 * @plugindesc Extend the functionality of your choices.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 4.3.3]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v[N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v[N] to refer to the variable N.
 *  - It is basically preferable to execute the plugin command before
 *    [Show Choices].
 *  - If you want to use the plug-in command while the message window is
 *    displayed, execute it before [Display text].
 *  
 *  〇 MV / MZ
 *  
 *  〇 ChoicePos x y row  / choicePos
 *       x   : X coordinate of choice window
 *       y   : Y coordinate of choice window
 *       row : The number of lines in the choice window. Show all if not set
 *   - Specify the position (x, y) and the number of rows of the next choice
 *     to display.
 * 
 *  〇 ChoiceVariableId varId  / choiceVariableId
 *       varId : Variable number
 *   - Set the default position of the next choice to display to the value of
 *     the variable.
 *   - In addition, put the current cursor position in a variable.
 *   - The cursor position is 0 to 5 for the first option from the top,
 *     10 to 15 for the next option, and +10 for each option.
 * 
 *  〇 ChoiceRect x y width height  / choiceRect
 *       x      : X coordinate
 *       y      : Y coordinate
 *       width  : width
 *       height : height
 *   - Specify the coordinates and size of the next choice to display.
 *   - For items that have not been set or for which -1 is specified,
 *     normal values will be applied.
 *   
 *  〇 ChoiceInMessage  / ChoiceInMessage
 *   - The next choice to display is displayed in the message window.
 *   - This function will not work unless it is used in combination with
 *     [Display Text].
 *   - Please execute before [Display text].
 *   
 * ▼ More choices
 *  - If you place the event command [Display Choices] in succession,
 *    they will be combined into one choice.
 *  - If you don't want to put them together, you can separate them as usual by
 *    inserting annotations in between.
 *  - For the "default" process, the one set other than none is applied.
 *  - For the "Cancel" process, the ones other than prohibited are applied.
 *  - In both cases, the setting of the option that follows takes precedence.
 *  - For "Background" and "Window position", the settings of the options that
 *    follow are applied.
 * 
 * ▼ Setting conditions for displaying items
 *  - If you enter
 *      if(condition)
 *    in the text of the choice and the condition becomes false,
 *    the item will not be displayed.
 *  - The operation when the "Default" item is not displayed can be set in the
 *    [Disabled Index] of the plug-in parameter.
 *  - If the "Cancel" item is not displayed, the same processing as prohibition
 *    is performed.
 *  - Within the condition, you can refer to the switch with "s" and
 *    the variable with "v".
 *     Example: When set to if(s[1])
 *                => Switch No. 1 is ON for display and OFF for non-display.
 *              When set to if(!s[2])
 *                => Switch 2 is displayed when it is OFF,
 *                   and is hidden when it is ON.
 *              When set to if(v[5]>0)
 *                => Display if variable 5 is greater than 0,
 *                   hide if variable 5 is less than 0.
 *     
 *     Inequalities that can be used in variables
 *       === : equal
 *       !== : Not equal
 *       <   : Smaller
 *       <=  : Less than or equal to
 *       >   : Greater
 *       >=  : Greater than or equal to
 * 
 * ▼ Setting conditions for displaying items semi-transparently
 *  - Enter
 *      en(condition)
 *    in the text of the choice, and if the condition is false,
 *    the item will be displayed semi-transparently.
 *  - Items that are semi-transparent cannot be selected.
 *  - The conditions are the same as "Setting the conditions for displaying
 *    items" above.
 *  - If the "Cancel" item is semi-transparent, you cannot cancel it.
 * 
 * ▼ Display help message
 *  - You can put
 *      ChoiceHelp
 *    in the [Comment] below each choice item to indicate the following text
 *    as a help message when you hover over it.
 *  - Help messages use the same functionality as View Text, so you can use
 *    control characters. (\! And \^ cannot be used)
 *  - The above command name can be changed with the plugin parameter.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command choicePos
 *      @desc Specify the position and number of lines for the next choice to display.
 *      @arg x
 *          @desc -1: Default
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc -1: Default
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 0
 *      @arg row
 *          @desc 0: Show all
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *
 *
 *  @command choiceVariableId
 *      @desc Set the default position of the next choice to display to the value of the variable. In addition, put the current cursor position in a variable.
 *      @arg varId
 *          @desc 
 *          @type variable
 *          @default 0
 *
 *  @command choiceRect
 *      @desc Specify the coordinates and size of the next choice to display.
 * Normal values are applied to unset items.
 *      @arg x
 *          @desc -1: Default
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *      @arg y
 *          @desc -1: Default
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *      @arg width
 *          @desc -1: Default
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *      @arg height
 *          @desc -1: Default
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *
 *  @command choiceInMessage
 *      @desc The next choice to display is displayed in the message window.
 * It will not work unless it is used in combination with [Display text].
 * 
 * 
 *  @param Max Page Row
 *      @desc Maximum number of lines displayed on one page
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 *
 *  @param Disabled Position
 *      @desc Cursor position when the default choice is not displayed
 *      @type select
 *          @option none
 *          @option top
 *      @default none
 *
 *  @param Choice Help Commands
 *      @desc 
 *      @type string[]
 *      @default ["ChoiceHelp","<ChoiceHelp>"]
 * 
 */

/*:
 * @target MV MZ
 * @plugindesc 选项的扩展功能。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 4.3.3]
 * 此插件用于RPG MV和MZ。
 * 
 * ▼ 插件命令
 *  - 在MV中，通过在输入数值的项目中记述为v[N]，参照变量n号。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  - 插件命令基本上最好在[显示选项]之前执行。
 *  - 如果希望在显示信息窗口的状态下使用插件命令，
 *    [显示文字]之前执行。
 * 
 *  〇 MV / MZ
 *  
 *  〇 ChoicePos x y row  / 选项位置设置
 *       x   : 选择窗口的x坐标
 *       y   : 选择窗口的y坐标
 *       row : 选项窗口中的行数。未设置时全部显示
 *   - 指定下一个显示选项的位置(x,y)和行数(row)。
 * 
 *  〇 ChoiceVariableId varId  / 光标位置设置
 *       varId : 变量编号
 *   - 将下一个显示选项的默认位置设为变量的值。
 *   - 然后将当前光标位置放入变量中。
 *   - 光标位置的第一个选项从上到下为0~5，
 *     下一个选项为10~15，每个选项为+10。
 * 
 *  〇 ChoiceRect x y width height  / 选项大小设置
 *       x      : X坐标
 *       y      : Y坐标
 *       width  : 宽度
 *       height : 高度
 *   - 指定下一个显示选项的坐标和大小。
 *   - 未设置或设置-1的项目使用正常的值。
 *   
 *  〇 ChoiceInMessage  / 在信息中显示
 *   - 在信息窗口中显示下一个要显示的选项。
 *   - 此功能必须与[显示文字]一起使用。
 *   - 请在[显示文字]之前执行。
 * 
 * ▼ 增加选项
 *  - 连续使用事件命令『显示选项』将合并为一个选项。
 *  - 如果不想合并的话，
 *    可以通过在中间加入注释等来像往常一样进行区分。
 *  - 『默认』的处理适用于设置为“无”以外的处理。
 *  - 『取消』的处理适用于设置为禁止以外的处理。
 *  - 两者都优先后面的选项的设置。
 *  - 『背景』和『窗口位置』应用后面的选项设置。
 * 
 * ▼ 设置选项显示的条件
 *  - 在选项的文字中
 *      if(条件)
 *    然后，如果该条件为OFF，则选项将不再显示。
 *  - 不显示『默认』选项时的操作，
 *    可以通过插件参数的[Disabled Index]进行设置。
 *  - 如果未显示『取消』选项，则进行与禁止相同的处理。
 *  - 条件下可以在s中参照开关，在v中参照变量。
 *     例：if(s[1])
 *          => 开关1 ON时显示，OFF时隐藏。
 *        if(!s[2])
 *          => 开关2 OFF时显示，ON时隐藏。
 *        if(v[5]>0)
 *          => 变量5号大于0时显示，0以下时隐藏。
 *     
 *     变量中可用的不等号
 *       === : 等于
 *       !== : 不等于
 *       <   : 小于
 *       <=  : 小于或等于
 *       >   : 大于
 *       >=  : 大于或等于
 * 
 * ▼ 设置半透明显示选项的条件
 *  - 在选项的文字中
 *      en(条件)
 *    输入，如果该条件为OFF，则选项显示为半透明。
 *  - 无法选择半透明的选项。
 *  - 条件与上面的『设置选项显示的条件』相同。
 *  - 如果“『取消』选项为半透明，则不能取消。
 * 
 * ▼ 查看帮助信息
 *  - 在每个选项下的[注释]中输入:
 *      選択肢ヘルプ
 *    可以在将光标悬停在选项上
 *    显示设置的帮助信息。
 *   ◆这个标签可以自定义，其次帮助文本要另起一行输入。
 *  - 由于帮助消息使用的功能与[显示文字]相同，
 *    因此可以使用控制字符。(\!和\^不能使用)
 *  - 可以通过插件参数更改上述命令名称。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command choicePos
 *      @text 選択肢位置設定
 *      @desc 次に表示する選択肢の位置と行数を指定します。
 *      @arg x
 *          @desc -1: デフォルト
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 0
 *      @arg y
 *          @desc -1: デフォルト
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 0
 *       @arg row
 *          @text 行数
 *          @desc 0: 全て表示
 *          @type number
 *              @min 0
 *              @max 99
 *          @default 0
 *
 *  @command choiceVariableId
 *      @text カーソル位置設定
 *      @desc 次に表示する選択肢のデフォルト位置を変数の値にします。
 * さらに現在のカーソル位置を変数に入れます。
 *      @arg varId
 *          @text 変数
 *          @desc 
 *          @type variable
 *          @default 0
 *
 *  @command choiceRect
 *      @text 選択肢サイズ設定
 *      @desc 次に表示する選択肢の座標とサイズを指定します。
 * 未設定の項目は通常の値が適用されます。
 *      @arg x
 *          @desc -1: デフォルト
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *      @arg y
 *          @desc -1: デフォルト
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *      @arg width
 *          @text 幅
 *          @desc -1: デフォルト
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *      @arg height
 *          @text 高さ
 *          @desc -1: デフォルト
 *          @type number
 *              @min -1
 *              @max 9999
 *          @default 
 *
 *  @command choiceInMessage
 *      @text メッセージ内表示
 *      @desc 次に表示する選択肢をメッセージウィンドウ内に表示させます。
 * [文章の表示]と併用しなければ機能しません。
 * 
 * 
 *  @param Max Page Row
 *      @text 最大显示行数
 *      @desc 一页上显示的最大行数
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 *
 *  @param Disabled Position
 *      @text 无效时光标位置
 *      @desc 未显示[默认]选项时的光标位置
 *      @type select
 *          @option 无
 *              @value none
 *          @option 最前面
 *              @value top
 *      @default none
 * 
 *  @param Choice Help Commands
 *      @text [选项帮助]调用名称
 *      @desc 
 *      @type string[]
 *      @default ["ChoiceHelp","<ChoiceHelp>","選択肢ヘルプ","<選択肢ヘルプ>"]
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_ChoiceEX';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_MaxPageRow = Number(parameters['Max Page Row'] || 6);
    const param_DisabledPosition = parameters['Disabled Position'] || 'none';
    const param_ChoiceHelpCommands = JSON.parse(parameters['Choice Help Commands'] || '[]');
    
    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };
    
    // JsExtensions 代替
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        return { clamp, mod };
    })();

    //-------------------------------------------------------------------------
    // PluginManager
    
    if (!PluginManager.registerCommand) {
        PluginManager._commandsMV = PluginManager._commandsMV || {};

        PluginManager.registerCommandMV = function(pluginName, commandName, func) {
            const key = pluginName + ':' + commandName;
            this._commandsMV[key] = func;
        };
        
        PluginManager.callCommandMV = function(self, pluginName, commandName, args) {
            const key = pluginName + ':' + commandName;
            const func = this._commandsMV[key];
            if (typeof func === 'function') {
                func.bind(self)(args);
            }
        };
    }

    {
        const _registerCommand = PluginManager.registerCommand || PluginManager.registerCommandMV;

        _registerCommand.call(PluginManager, pluginName, 'choicePos', args => {
            const x = PluginManager.mppValue(args.x);
            const y = PluginManager.mppValue(args.y);
            const row = PluginManager.mppValue(args.row) || 99;
            $gameMessage.setChoicePos(x, y, row);
        });

        _registerCommand.call(PluginManager, pluginName, 'choiceVariableId', args => {
            const variableId = PluginManager.mppValue(args.varId);
            $gameMessage.setChoiceVariableId(variableId);
        });

        _registerCommand.call(PluginManager, pluginName, 'choiceRect', args => {
            const x = args.x ? PluginManager.mppValue(args.x) : -1;
            const y = args.y ? PluginManager.mppValue(args.y) : -1;
            const width = args.width ? PluginManager.mppValue(args.width) : -1;
            const height = args.height ? PluginManager.mppValue(args.height) : -1;
            $gameMessage.setChoiceRect(x, y, width, height);
        });

        _registerCommand.call(PluginManager, pluginName, 'choiceInMessage', () => {
            $gameMessage.requestChoiceInMessage();
        });
    }

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-------------------------------------------------------------------------
    // Game_Message

    Object.defineProperties(Game_Message.prototype, {
        choiceX: {
            get() {
                return this._choiceX;
            },
            configurable: true
        },
        choiceY: {
            get() {
                return this._choiceY;
            },
            configurable: true
        },
        choiceWidth: {
            get() {
                return this._choiceWidth;
            },
            configurable: true
        },
        choiceHeight: {
            get() {
                return this._choiceHeight;
            },
            configurable: true
        }
    });

    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.apply(this, arguments);
        this._choiceEnables = [];
        this._choiceResults = [];
        this._helpTexts = [];
        this._choiceX = -1;
        this._choiceY = -1;
        this._choiceWidth = -1;
        this._choiceHeight = -1;
        this._choiceMaxRow = param_MaxPageRow;
        this._choiceVariableId = 0;
        this._choiceInMessage = false;
    };

    Game_Message.prototype.choiceMaxRow = function() {
        return this._choiceMaxRow;
    };

    Game_Message.prototype.setTexts = function(texts) {
        this._texts = texts;
    };

    Game_Message.prototype.setChoiceEnables = function(enables) {
        this._choiceEnables = enables;
    };

    Game_Message.prototype.choiceEnables = function() {
        return this._choiceEnables;
    };

    Game_Message.prototype.setChoiceResults = function(results) {
        this._choiceResults = results;
    };

    Game_Message.prototype.choiceResults = function() {
        return this._choiceResults;
    };

    Game_Message.prototype.setChoiceHelpTexts = function(texts) {
        this._helpTexts = texts;
    };

    Game_Message.prototype.isChoiceHelp = function() {
        return !this._choiceInMessage && this._helpTexts.length > 0;
    };

    Game_Message.prototype.helpTexts = function() {
        return this._helpTexts;
    };

    Game_Message.prototype.setChoicePos = function(x, y, row) {
        this._choiceX = x;
        this._choiceY = y;
        this._choiceWidth = -1;
        this._choiceHeight = -1;
        this._choiceMaxRow = row;
    };

    Game_Message.prototype.setChoiceRect = function(x, y, width, height) {
        this._choiceX = x;
        this._choiceY = y;
        this._choiceWidth = width;
        this._choiceHeight = height;
    };

    Game_Message.prototype.setChoiceVariableId = function(id) {
        this._choiceVariableId = id;
    };

    Game_Message.prototype.lowerChoiceHeight = function(height) {
        this._choiceY += height;
        this._choiceHeight -= height;
    };

    Game_Message.prototype.requestChoiceInMessage = function() {
        this._choiceInMessage = true;
    };

    Game_Message.prototype.choiceVariableId = function() {
        return this._choiceVariableId;
    };

    Game_Message.prototype.isChoiceInMessage = function() {
        return this._choiceInMessage;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter

    Game_Interpreter.prototype.setupChoices = function(params) {
        const data = {
            choices: [],
            enables: [],
            results: [],
            helpTexts: [],
            cancelType: -1,
            defaultType: -1,
            positionType: 0,
            background: 0
        };
        this.addChoices(params, this._index, data, 0);
        if (data.choices.length > 0) {
            const helpTexts = this.choiceHelpTexts(data);
            const cancelType = this.choiceCancelType(data);
            const defaultType = this.choiceDefaultType(data);
            $gameMessage.setChoices(data.choices, defaultType, cancelType);
            $gameMessage.setChoiceEnables(data.enables);
            $gameMessage.setChoiceResults(data.results);
            $gameMessage.setChoiceHelpTexts(helpTexts);
            $gameMessage.setChoiceBackground(data.background);
            $gameMessage.setChoicePositionType(data.positionType);
            $gameMessage.setChoiceCallback(n => {
                this._branch[this._indent] = n < 0
                    ? data.cancelType
                    : data.results[n];
            });
        } else {
            this._branch[this._indent] = -1;
        }
    };

    Game_Interpreter.prototype.addChoices = function(params, index, data, d) {
        const choices = [...params[0]];
        const cancelType = params[1] < choices.length ? params[1] : -2;
        const defaultType = params[2] || 0;
        const nextCommand = this.nextCommandOfChoice(index + 1);
        this.checkChoiceConditions(choices, data, d);
        if (cancelType !== -1) data.cancelType = cancelType + d;
        if (defaultType >= 0) data.defaultType = defaultType + d;
        data.positionType = params.length > 3 ? params[3] : 2;
        data.background = params[4] || 0;
        this.setupHelpText(index + 1, data, d);
        if (nextCommand && nextCommand.code === 102) {
            const nextIndex = this._list.indexOf(nextCommand);
            this.addChoices(nextCommand.parameters, nextIndex, data, d + 10);
        }
    };

    Game_Interpreter.prototype.checkChoiceConditions = function(choices, data, d) {
        const regIf = /\s?if\((.+?)\)/;
        const regEn = /\s?en\((.+?)\)/;
        for (const [i, text] of choices.entries()) {
            if (this.meetsChoiceConditions(text, regIf)) {
                const realText = text.replace(regIf, '').replace(regEn, '');
                data.choices.push(realText);
                data.enables.push(this.meetsChoiceConditions(text, regEn));
                data.results.push(i + d);
            }
        };
    };

    Game_Interpreter.prototype.meetsChoiceConditions = function(text, reg) {
        const match = reg.exec(text);
        return !match || this.evalChoice(match[1]);
    };

    Game_Interpreter.prototype.evalChoice = function(condition) {
        try {
            const s = $gameSwitches._data;
            const realCondition = condition.replace(
                /V\[(\d+)\]/gi,
                (_, n) => $gameVariables.value(+n)
            );
            return !!eval(realCondition);
        } catch (e) {
            console.log('条件エラー \n ' + condition);
            return true;
        }
    };

    Game_Interpreter.prototype.setupHelpText = function(index, data, d) {
        for (const [i, command] of this._list.slice(index).entries()) {
            if (command.indent === this._indent) {
                if (command.code === 402) {
                    const type = command.parameters[0] + d;
                    const helpTexts = this.extractHelpTexts(i + index + 1);
                    if (helpTexts) data.helpTexts[type] = helpTexts;
                } else if (command.code === 404) {
                    return;
                }
            }
        }
    };

    Game_Interpreter.prototype.extractHelpTexts = function(index) {
        const command = this._list[index];
        if (
            command.code === 108 &&
            param_ChoiceHelpCommands.includes(command.parameters[0])
        ) {
            return this.getCommentHelpTexts(index + 1);
        }
        return null;
    };

    Game_Interpreter.prototype.getCommentHelpTexts = function(index) {
        const result = [];
        for (const command of this._list.slice(index)) {
            if (command.code === 408) {
                result.push(command.parameters[0]);
            } else {
                break;
            }
        }
        return result;
    };

    Game_Interpreter.prototype.choiceHelpTexts = function(data) {
        const helpTexts = data.helpTexts;
        return helpTexts.length > 0 ? data.results.map(i => helpTexts[i]) : [];
    };

    Game_Interpreter.prototype.choiceCancelType = function(data) {
        if (data.cancelType === -1) {
            return -1;
        } else if (MathExt.mod(data.cancelType, 10) === 8) {
            return -2;
        }
        return data.results.indexOf(data.cancelType);
    };

    Game_Interpreter.prototype.choiceDefaultType = function(data) {
        const vId = $gameMessage.choiceVariableId();
        const index = vId > 0 ? $gameVariables.value(vId) : data.defaultType;
        const defaultType = data.results.indexOf(index);
        if (index >= 0 && defaultType < 0 && param_DisabledPosition === 'top') {
            return 0;
        }
        return defaultType;
    };

    Game_Interpreter.prototype.nextCommandOfChoice = function(index) {
        const i = this._list.slice(index).findIndex(
            command => command.indent === this._indent && command.code === 404
        );
        return i >= 0 ? this._list[index + i + 1] : null;
    };

    // overwrite
    Game_Interpreter.prototype.command403 = function() {
        if (this._branch[this._indent] !== -2) {
            this.skipBranch();
        }
        return true;
    };

    Game_Interpreter.prototype.command404 = function() {
        if (this.nextEventCode() === 102) {
            this._branch[this._indent] -= 10;
            this._index++;
        }
        return true;
    };

    const _mzCommands = {
        ChoicePos: { name: 'choicePos', keys: ['x', 'y', 'row'] },
        ChoiceVariableId: { name: 'choiceVariableId', keys: ['varId'] },
        ChoiceRect: { name: 'choiceRect', keys: ['x', 'y', 'width', 'height'] },
        ChoiceInMessage: { name: 'choiceInMessage', keys: [] }
    };
    Object.assign(_mzCommands, {
        '選択肢位置設定': _mzCommands.ChoicePos,
        'カーソル位置設定': _mzCommands.ChoiceVariableId,
        '選択肢サイズ設定': _mzCommands.ChoiceRect,
        'メッセージ内表示': _mzCommands.ChoiceInMessage
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(
                {},
                ...mzCommand.keys.map((key, i) => ({ [key]: args[i] }))
            );
            PluginManager.callCommandMV(this, pluginName, mzCommand.name, args2);
        }
    };
    
    //-----------------------------------------------------------------------------
    // Window_ChoiceList

    const _Window_ChoiceList_select = __base(Window_ChoiceList.prototype, 'select');
    Window_ChoiceList.prototype.select = function(index) {
        const variableId = $gameMessage.choiceVariableId();
        if (index !== this.index() && variableId > 0) {
            const results = $gameMessage.choiceResults();
            $gameVariables.setValue(variableId, results[index]);
        }
        _Window_ChoiceList_select.apply(this, arguments);
    };

    const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function() {
        _Window_ChoiceList_updatePlacement.apply(this, arguments);
        const {
            choiceX: x, choiceY: y, choiceWidth: width, choiceHeight: height
        } = $gameMessage;
        if (width >= 0) {
            this.width = MathExt.clamp(width, 1, Graphics.boxWidth);
        }
        if (height >= 0) {
            this.height = MathExt.clamp(height, 1, Graphics.boxHeight);
        }
        if (x >= 0) this.x = Math.min(x, Graphics.boxWidth - this.width);
        if (y >= 0) this.y = Math.min(y, Graphics.boxHeight - this.height);
        this._isWindow = !$gameMessage.isChoiceInMessage();
    };

    // overwrite
    Window_ChoiceList.prototype.numVisibleRows = function() {
        const choices = $gameMessage.choices();
        const maxLines = $gameMessage.choiceMaxRow();
        return Math.min(choices.length, maxLines);
    };

    // overwrite
    Window_ChoiceList.prototype.makeCommandList = function() {
        const enables = $gameMessage.choiceEnables();
        for (const [i, choice] of $gameMessage.choices().entries()) {
            this.addCommand(choice, 'choice', enables[i]);
        }
    };

    const _Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
    Window_ChoiceList.prototype.drawItem = function(index) {
        this.changePaintOpacity(this.isCommandEnabled(index));
        _Window_ChoiceList_drawItem.apply(this, arguments);
    };

    const _Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
    Window_ChoiceList.prototype.callOkHandler = function() {
        _Window_ChoiceList_callOkHandler.apply(this, arguments);
        this._messageWindow.forceClear();
        this._helpIndex = null;
    };

    const _Window_ChoiceList_callCancelHandler = Window_ChoiceList.prototype.callCancelHandler;
    Window_ChoiceList.prototype.callCancelHandler = function() {
        _Window_ChoiceList_callCancelHandler.apply(this, arguments);
        this._messageWindow.forceClear();
        this._helpIndex = null;
    };

    const _Window_ChoiceList_processCancel = __base(Window_ChoiceList.prototype, 'processCancel');
    Window_ChoiceList.prototype.processCancel = function() {
        const cancelType = $gameMessage.choiceCancelType();
        if (
            cancelType >= 0 &&
            this.isCancelEnabled() &&
            !this.isCommandEnabled(cancelType)
        ) {
            this.playBuzzerSound();
            return;
        }
        _Window_ChoiceList_processCancel.apply(this, arguments);
    };

    Window_ChoiceList.prototype.callUpdateHelp = function() {
        if (
            this.active &&
            this._messageWindow &&
            $gameMessage.isChoiceHelp() &&
            this._helpIndex !== this.index()
        ) {
            this._helpIndex = this.index();
            this.updateHelp();
        }
    };

    Window_ChoiceList.prototype.updateHelp = function() {
        this._messageWindow.forceClear();
        const texts = $gameMessage.helpTexts()[this.index()];
        $gameMessage.setTexts(texts ? [...texts] : ['']);
        this._messageWindow.startMessage();
    };

    //-----------------------------------------------------------------------------
    // Window_Message

    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        _Window_Message_initialize.apply(this, arguments);
        this.updatePlacement();
    };
    
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.apply(this, arguments);
        this.clearInChoice();
    };

    Window_Message.prototype.clearInChoice = function() {
        if ($gameMessage.isChoiceInMessage()) {
            const x = this.x + this.choiceStartX();
            const y = this.y + 4;
            const height = this.height;
            $gameMessage.setChoiceRect(x, y, -1, height);
        }
    };

    Window_Message.prototype.choiceStartX = function() {
        if ('left' in this._textState) {
            return this.standardPadding() + this._textState.left;
        } else {
            return $gameSystem.windowPadding() + this._textState.startX;
        }
    };

    const _Window_Message_processNewLine = __base(Window_Message.prototype, 'processNewLine');
    Window_Message.prototype.processNewLine = function(textState) {
        if ($gameMessage.isChoiceInMessage()) {
            $gameMessage.lowerChoiceHeight(textState.height);
        }
        _Window_Message_processNewLine.apply(this, arguments);
    };

    const _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function() {
        if ($gameMessage.isChoiceHelp() && this._textState) {
            return false;
        }
        return _Window_Message_updateInput.apply(this, arguments);
    };

    const _Window_Message_onEndOfText = Window_Message.prototype.onEndOfText;
    Window_Message.prototype.onEndOfText = function() {
        const choiceWindow = this._choiceWindow || this._choiceListWindow;
        if (!choiceWindow.active && $gameMessage.isChoiceHelp()) {
            this.startInput();
        } else {
            _Window_Message_onEndOfText.apply(this, arguments);
        }
    };

    const _Window_Message_startInput = Window_Message.prototype.startInput;
    Window_Message.prototype.startInput = function() {
        const choiceWindow = this._choiceWindow || this._choiceListWindow;
        if (choiceWindow.active) return true;
        if (this._textState && this.isLowerChoice()) {
            $gameMessage.lowerChoiceHeight(this._textState.height);
        }
        return _Window_Message_startInput.apply(this, arguments);
    };

    Window_Message.prototype.isLowerChoice = function() {
        const textState = this._textState;
        const startX = 'left' in textState ? textState.left : textState.startX;
        return (
            $gameMessage.isChoice() &&
            $gameMessage.isChoiceInMessage() &&
            textState.x !== startX
        );
    };

    Window_Message.prototype.forceClear = function() {
        this._textState = null;
        this.close();
        this._goldWindow.close();
    };

    const _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        _Window_Message_newPage.apply(this, arguments);
        this.clearInChoice();
    };

})();
