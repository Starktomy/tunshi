/*:
@target MV MZ
@plugindesc 虚拟摇杆扩展 v1.1.3
@author うなぎおおとろ
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AnalogStickEx.js

@help
它是一个支持虚拟摇杆的插件。
将能够通过插件命令获得左右模拟摇杆的角度和倾斜强度。
此外，与点动系统一起使用，可以进行360度移动。 

【使用方法】
■ 虚拟摇杆状态的获取
通过执行插件命令「スティック状態取得」可以获取摇杆的角度和倾斜强度。
角度为 0 到 359 度，强度为 0 到 1000。 

对于 Maker MV，执行以下插件命令。
AnalogStickEx GetStickState left or right 存储摇杆角度的变量 ID 存储倾斜强度的变量 ID
(例)获取右摇杆的状态并将角度存储在变量 ID1 中，将倾斜强度存储在变量 ID2 中
AnalogStickEx GetStickState right 1 2

■ 从脚本获取模拟摇杆的状态
可以使用以下脚本获取摇杆的状态。 
const [rad, power] = Input.leftStick; //获取左摇杆的状态，
或
const [rad, power] = Input.rightStick; // 获取右摇杆的状态

此时、rad是模拟摇杆的方向，
power是模拟摇杆的强度( 0.0~1.0 )。

■ 与点移动系统并用
基本上只需部署即可使用。
与点移动系统、虚拟摇杆并用时，请按照以下顺序部署。
・点移动系统
・虚拟摇杆
・虚拟摇杆扩张

【许可】
此插件在MIT许可证的条件下可用。


@param EnabledMove360SwitchId
@text 360 度移动启用开关 ID
@type switch
@default 0
@desc
设置360度移动功能是启用还是禁用的开关 ID。 

@param EnabledStickDashSwitchId
@text 摇杆启用开关 ID
@type switch
@default 0
@desc
指定根据摇杆强度决定是否启用/禁用冲刺功能的开关 ID。 


@command GetStickState
@text 获取摇杆状态
@desc
获取摇杆的状态。

@arg LeftOrRight
@text 左or右
@type select
@option 左
@value left
@option 右
@value right
@default left
@desc
设置获取左右哪根摇杆的信息。

@arg StickDegVariableId
@text 摇杆角度
@type variable
@default 0
@desc
设置一个存储摇杆角度的变量。 角度范围为 0 到 359。 

@arg StickPowerVariableId
@text 摇杆强度
@type variable
@default 0
@desc
设置一个变量来存储摇杆的强度。强度范围为 0 到 1000。 
*/

const AnalogStickExPluginName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

(() => {

const params = PluginManager.parameters(AnalogStickExPluginName);
const PP = {
    EnabledMove360SwitchId: parseInt(params["EnabledMove360SwitchId"]),
    EnabledStickDashSwitchId: parseInt(params["EnabledStickDashSwitchId"]),
};

const getStickStatePC = (leftOrRight, stickDegVariableId, stickPowerVariableId) => {
    let rad, power;
    if (leftOrRight === "left") {
        [rad, power] = Input.leftStick;
    } else if (leftOrRight === "right") {
        [rad, power] = Input.rightStick;
    } else {
        throw new Error(`LeftOrRight(${leftOrRight}) is invalid.`);
    }
    let deg = AnalogStickUtils.rad2deg(rad);
    deg = AnalogStickUtils.degNormalization(Math.round(deg));
    const intPower = Math.round(power * 1000);
    if (stickDegVariableId > 0) $gameVariables.setValue(stickDegVariableId, deg);
    if (stickPowerVariableId > 0) $gameVariables.setValue(stickPowerVariableId, intPower);
};

if (Utils.RPGMAKER_NAME === "MZ") {
    PluginManager.registerCommand(AnalogStickExPluginName, "GetStickState", (args) => {
        const leftOrRight = args.LeftOrRight;
        const stickDegVariableId = parseInt(args.StickDegVariableId);
        const stickPowerVariableId = parseInt(args.StickPowerVariableId);
        getStickStatePC(leftOrRight, stickDegVariableId, stickPowerVariableId);
    });
}

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command !== AnalogStickExPluginName) return;
    switch (args[0]) {
    case "GetStickState":
        const leftOrRight = args[1];
        const stickDegVariableId = parseInt(args[2]);
        const stickPowerVariableId = parseInt(args[3]);
        getStickStatePC(leftOrRight, stickDegVariableId, stickPowerVariableId);
        break;
    }
};


const _Input_clear = Input.clear;
Input.clear = function() {
    _Input_clear.call(this);
    this._analogStickState = {};
};

const _Input__updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function(gamepad) {
    _Input__updateGamepadState.call(this, gamepad);
    const axes = gamepad.axes;
    if (axes.length >= 4) {
        this._analogStickState["stick_left_x"] = axes[0];
        this._analogStickState["stick_left_y"] = axes[1];
        this._analogStickState["stick_right_x"] = axes[2];
        this._analogStickState["stick_right_y"] = axes[3];
    }
};

Input._getStickState = function(stickType) {
    let x, y;
    if (stickType === "leftStick") {
        x = this._analogStickState["stick_left_x"];
        y = this._analogStickState["stick_left_y"];
    } else if (stickType === "rightStick") {
        x = this._analogStickState["stick_right_x"];
        y = this._analogStickState["stick_right_y"];
    } else {
        return [0, 0];
    }
    let rad = Math.atan2(y, x);
    if (Number.isNaN(rad)) rad = 0;
    let power = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    power = power > 1 ? 1 : power;
    return [rad, power];
}

Object.defineProperty(Input, "leftStick", {
    get: function() {
        return this._getStickState("leftStick");
    },
    configurable: true
});

Object.defineProperty(Input, "rightStick", {
    get: function() {
        return this._getStickState("rightStick");
    },
    configurable: true
});

let STICK_MODE;
if (typeof VirtualPadPluginName !== "undefined") {
    const virtualPadPluginParams = PluginManager.parameters(VirtualPadPluginName)
    STICK_MODE = parseInt(virtualPadPluginParams["STICK_MODE"]);
}

class AnalogStickUtils {
    static degNormalization(deg) {
        if (deg >= 360) deg = deg % 360;
        if (deg < 0) {
            let rdeg = -deg;
            if (rdeg > 360) rdeg = rdeg % 360;
            deg = 360 - rdeg;
        }
        return deg;
    }

    static rad2deg(rad) {
        return (rad * 180 / Math.PI) + 90;
    }

    static deg2rad(deg) {
        return (deg - 90) * Math.PI / 180;
    }
}

class DotMoveAnalogStickUtils {
    static getAnalogStickInput() {
        const [rad, power] = Input.leftStick;
        const deg = AnalogStickUtils.rad2deg(rad);
        return [deg, power];
    }

    static isEnabledStickDash() {
        if (PP.EnabledStickDashSwitchId === 0) return true;
        return $gameSwitches.value(PP.EnabledStickDashSwitchId);
    }

    static isEnabledMove360() {
        if (PP.EnabledMove360SwitchId === 0) return true;
        return $gameSwitches.value(PP.EnabledMove360SwitchId);
    }
}


Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        let direction = this.getInputDirection();
        let [deg, power] = DotMoveAnalogStickUtils.getAnalogStickInput();

        let margin;
        if (DotMoveAnalogStickUtils.isEnabledStickDash()) {
            margin = 0.25;
        } else {
            margin = 0.5;
        }

        if (power >= margin) {
            $gameTemp.clearDestination();
            if (typeof DotMoveSystemPluginName !== "undefined") {
                if (DotMoveAnalogStickUtils.isEnabledStickDash()) {
                    if (power >= 0.9) {
                        this._dashing = true;
                    } else {
                        this._dashing = false;
                    }
                }

                if (DotMoveAnalogStickUtils.isEnabledMove360()) {
                    this.dotMoveByDeg(deg);
                } else {
                    direction = DotMoveUtils.deg2direction(deg);
                    this.executeMove(direction);
                }
            }
            return;
        } else if (direction > 0) {
            $gameTemp.clearDestination();
        } else {
            if (typeof VirtualPadPluginName !== "undefined") {
                if (STICK_MODE === 1) {
                    direction = $virtualPad.dir8();
                } else if (STICK_MODE === 2) {
                    deg = $virtualPad.deg();
                    if (typeof DotMoveSystemPluginName !== "undefined") {
                        if (deg != null) this.dotMoveByDeg(deg);
                    } else {
                        throw new Error("DotMoveSystem.js is not installed.");
                    }
                } else {
                    direction = $virtualPad.dir4();
                }
            } else {
                if ($gameTemp.isDestinationValid()) {
                    if (typeof DotMoveSystemPluginName !== "undefined") {
                        this.startTouchMove();
                        return;
                    } else {
                        const x = $gameTemp.destinationX();
                        const y = $gameTemp.destinationY();
                        direction = this.findDirectionTo(x, y);
                    }
                }
            }
        }
        if (direction > 0) {
            // Yami_8DirEx.jsとの併用に対応
            if (typeof Game_Player.prototype.processMoveByInput !== "undefined") {
                this.processMoveByInput(direction);
            } else {
                this.executeMove(direction);
            }   
        }
    }
};

window.AnalogStickUtils = AnalogStickUtils;
window.DotMoveAnalogStickUtils = DotMoveAnalogStickUtils;

})();
