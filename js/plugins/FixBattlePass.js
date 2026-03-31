
(function() {
    // 1. 强制修正道具名称和描述
    var _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
        if (item) {
            if (item.id === 17 || item.id === 487) {
                item.name = "将军令";
                if (item.description) {
                    item.description = item.description.replace(/.*激活.*/g, "已激活至尊权限。");
                }
            }
            // 通用清理：移除任何名字中的“未激活”
            if (item.name && item.name.contains("未激活")) {
                item.name = item.name.replace("未激活", "");
            }
        }
        _Window_Base_drawItemName.call(this, item, x, y, width);
    };

    // 2. 内存数据强制修正
    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataItems || object === $dataArmors || object === $dataWeapons) {
            object.forEach(function(item) {
                if (item && item.name && item.name.contains("未激活")) {
                    item.name = item.name.replace("未激活", "");
                }
                if (item && (item.id === 17 || (object === $dataArmors && item.id === 487))) {
                    item.name = "将军令";
                }
            });
        }
    };

    // 3. 游戏启动与存轴读取时 自动激活全局开关
    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        activateAll();
    };

    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        activateAll();
    };

    function activateAll() {
        if ($gameSwitches) {
            $gameSwitches.setValue(101, true); // 通用激活
            $gameSwitches.setValue(102, true); // 高级激活
            console.log("Global Switches 101, 102 activated.");
        }
        if ($gameVariables) {
            $gameVariables.setValue(116, 8);   // 战令最高等级
            $gameVariables.setValue(150, "MASTER_ACTIVE"); // 激活码占位
            console.log("Battle Pass Variable 116 set to 8.");
        }
    }
})();
