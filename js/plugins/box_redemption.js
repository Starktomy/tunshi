/*:
 * @author box
 * @plugindesc 兑换码
 * @target MZ MV
 * @help
 * 使用box_redemption();脚本即可输入兑换码
 * 
 * 使用本插件请在game.css下增加这一段
 * #oinput {
    position: fixed;
    border: 2px solid #FFFFFF;
    border-radius: 10px;
    outline-style: none;
    margin: 280px 520px;
    height: 30px;
    width: 220px;
    font-size: 24px;
    z-index: 100;
   }
 * margin 可以当做x y坐标来看
 * height  输入框的高度
 * width  输入框的宽度
 * font-size  字体大小
 * z-index 可输入长度
 * 
 * 输入框在不同的分辨率会有不同实际坐标。
 * 
 * JS内搜索 changexy ，其中就是计算安卓端的坐标，这方面就靠使用者了。
 * 搜索  createcommandWIN ，你就可以看到窗口坐标，这样你就能自己改了。
 * 
 * @param input
 * @type boolean
 * @text 输入方式
 * @desc 有的平台不支持prompt并且prompt有些BUG，所以用浏览器的input代替。
 * @default false
 *
 * @param box redemption List
 * @parent Advanced Types
 * @text 兑换码设置
 * @type struct<TestStruct>[]
 * @default []
 * */
/*~struct~TestStruct:
 * @param redemptionText
 * @text 兑换码
 * @type string
 *
 * @param redemptionNote
 * @text 备注
 * @desc 没啥用，就是让你方便看这个是干嘛的
 * @type note
 *
 * @param goldNumber
 * @text 获取的金币数量
 * @type number
 *
 * @param ItemNumberid
 * @text 获取的物品id
 * @desc 这是获取物品id的列表
 * @type number[]
 * @default []
 *
 * @param ItemNumberquantity
 * @text 获取物品数量
 * @desc 这是获取物品id数量的列表，对应上部分的序号
 * @type number[]
 * @default []
 *
 * @param WeaponNumberid
 * @text 获取武器id
 * @desc 这是获取武器id的列表
 * @type number[]
 * @default []
 *
 * @param WeaponNumberquantity
 * @text 获取武器数量
 * @desc 这是获取武器id数量的列表，对应上部分的序号
 * @type number[]
 * @default []
 *
 * @param ArmorNumberid
 * @text 获取护甲id
 * @desc 这是获取护甲id的列表
 * @type number[]
 * @default []
 *
 * @param ArmorNumberquantity
 * @text 获取护甲数量
 * @desc 这是获取护甲id数量的列表，对应上部分的序号
 * @type number[]
 * @default []
 *
 * @param EventNumberid
 * @text 获取公共事件id
 * @desc 这是获取公共事件id的列表
 * @type number[]
 * @default []
 *
 * @param Switchredemption
 * @text 开关参数
 * @desc 兑换码完成打开的开关
 * @type switch
 * @default 1
 */
//============================================
//============================================
(() => {
    const Parameters = PluginManager.parameters("box_redemption");
    const redemptionList = JSON.parse(Parameters["box redemption List"]);
    if (redemptionList) {
        const max = redemptionList.length;
        for (let i = 0; i < max; i++) {
            redemptionList[i] = JSON.parse(redemptionList[i]);
            const value = redemptionList[i];
            redemptionList[i]['redemptionText'] = Number(value['redemptionText']);
            redemptionList[i]['EventNumberid'] = JSON.parse(value['EventNumberid']);
            redemptionList[i]['ArmorNumberquantity'] = JSON.parse(value['ArmorNumberquantity']);
            redemptionList[i]['ArmorNumberid'] = JSON.parse(value['ArmorNumberid']);
            redemptionList[i]['WeaponNumberquantity'] = JSON.parse(value['WeaponNumberquantity']);
            redemptionList[i]['WeaponNumberid'] = JSON.parse(value['WeaponNumberid']);
            redemptionList[i]['ItemNumberquantity'] = JSON.parse(value['ItemNumberquantity']);
            redemptionList[i]['ItemNumberid'] = JSON.parse(value['ItemNumberid']);
        }
    }

    function box_redemption() {
        const boo = eval(Parameters["input"]);
        if (boo) {
            SceneManager.push(Scene_Input);
        } else {
            box_redemption.box_prompt();
        }
    }

    box_redemption.box_prompt = function () {
        const value = prompt("输入兑换码");
        this.makeprompt(value);
    };

    box_redemption.makeprompt = function (value) {
        if (!value) { return false; }
        const array = redemptionList;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (value == element["redemptionText"] && !this.switche(element['Switchredemption'])) {
                this.gavemake(element);
                return $gameMessage.add("兑换码使用成功");
            } else {
                return $gameMessage.add("兑换码使用失败");
            }
        }
    };

    box_redemption.makeredemption = function (value, win) {
        if (!value) { return false; }
        const array = redemptionList;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (value == element["redemptionText"] && !this.switche(element['Switchredemption'])) {
                this.gavemake(element);
                return win.refresh("兑换码使用成功"); 
            } else {
                return win.refresh("兑换码使用失败"); 
            }
        }
    };

    box_redemption.switche = function (value) {
        return $gameSwitches.value(Number(value));
    };

    box_redemption.gavemake = function (array) {
        this.gavegold(array['goldNumber']);
        this.gaveItem(array['ItemNumberid'], array['ItemNumberquantity']);
        this.gaveWeapon(array['ItemNumberid'], array['ItemNumberquantity']);
        this.gaveArmor(array['ItemNumberid'], array['ItemNumberquantity']);
        this.makevent(array['EventNumberid']);
        $gameSwitches.setValue(Number(array['Switchredemption']), true);
    };

    box_redemption.gavegold = function (value) {
        if (!value) { return false; }
        $gameParty.gainGold(Number(value));
    };

    box_redemption.gaveItem = function (array, value) {
        if (array.length == 0) { return false; }
        for (let index = 0; index < array.length; index++) {
            const item = Number(array[index]);
            const number = Number(value[index])
            $gameParty.gainItem($dataItems[item], number);
        }
    };

    box_redemption.gaveWeapon = function (array, value) {
        if (array.length == 0) { return false; }
        for (let index = 0; index < array.length; index++) {
            const item = Number(array[index]);
            const number = Number(value[index])
            $gameParty.gainItem($dataWeapons[item], number);
        }
    };

    box_redemption.gaveArmor = function (array, value) {
        if (array.length == 0) { return false; }
        for (let index = 0; index < array.length; index++) {
            const item = Number(array[index]);
            const number = Number(value[index])
            $gameParty.gainItem($dataArmors[item], number);
        }
    };

    box_redemption.makevent = function (array) {
        if (array.length == 0) { return false; }
        for (let index = 0; index < array.length; index++) {
            const id = Number(array[index]);
            if ($dataCommonEvents[id]) {
                $gameTemp.reserveCommonEvent(id);
            }
        }
    };

    class box_input {
        constructor(...value) {
            this.addinput(...value);
        }

        addinput(id) {
            this._input = document.createElement("input");
            this._input.type = "text";
            this._input.id = id;
            this.changexy();
            this._input.addEventListener(
                "touchstart",
                this.stopPropagation.bind(this)
            );
            document.body.appendChild(this._input);
        }

        changexy() {
            if (Utils.isMobileDevice()) {
                const x = Math.round((520 / 1366) * window.screen.width);
                const y = Math.round((280 / 768) * window.screen.height);
                const width = Math.round((220 / 1366) * window.screen.width);
                this._input.style.margin = `${y}px ${x}px`;
                this._input.style.height = "20px";
                this._input.style.fontSize = "18px";
                this._input.style.width = `${width}px`;
            }
        }

        stopPropagation(event) {
            event.stopPropagation();
        }

        removeinput() {
            this._input.remove();
        }

        onclick() {
            const val = this._input.value;
            return val;
        }
    }

    function Scene_Input() {
        this.initialize(...arguments);
    }

    Scene_Input.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Input.prototype.constructor = Scene_Input;

    Scene_Input.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Input.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createtextWIN();
        this.createcommandWIN();
    };

    Scene_Input.prototype.createtextWIN = function () {
        const rect = new Rectangle(490, 200, 300, 150);
        this._textinput = new box_inputwin(rect);
        this._input = new box_input("oinput");
        this.addWindow(this._textinput);
    };

    Scene_Input.prototype.createcommandWIN = function () {
        const rect = new Rectangle(490, 350, 300, 80);
        this._inputCommand = new Window_Input_Command(rect);
        this._inputCommand.setHandler("inputok", this.inputok.bind(this));
        this._inputCommand.setHandler("cancel", this.inputCancel.bind(this));
        this.addWindow(this._inputCommand);
    };

    Scene_Input.prototype.inputok = function () {
        box_redemption.makeredemption(this._input.onclick(), this._textinput);
        this._inputCommand.activate();
    };

    Scene_Input.prototype.inputCancel = function () {
        this._input.removeinput();
        this.popScene();
        this._inputCommand.activate();
    }

    function box_inputwin() {
        this.initialize(...arguments);
    }

    box_inputwin.prototype = Object.create(Window_Base.prototype);
    box_inputwin.prototype.constructor = box_inputwin;

    box_inputwin.prototype.initialize = function (rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };

    box_inputwin.prototype.refresh = function (value) {
        this.contents.drawText('兑换码：', 10, 5, 200, this.lineHeight(), 'left');
        if (value) { this.contents.drawText(value, 100, 5, 300, this.lineHeight(), 'left'); }
    };

    function Window_Input_Command() {
        this.initialize(...arguments);
    }

    Window_Input_Command.prototype = Object.create(Window_HorzCommand.prototype);
    Window_Input_Command.prototype.constructor = Window_Input_Command;

    Window_Input_Command.prototype.initialize = function (rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_Input_Command.prototype.maxCols = function () {
        return 2;
    };

    Window_Input_Command.prototype.show = function () {
        this.visible = true;
    };

    Window_Input_Command.prototype.makeCommandList = function () {
        this.addCommand("决定", "inputok");
        this.addCommand("离开", "cancel");
    };

    window.box_redemption = box_redemption;
})();
