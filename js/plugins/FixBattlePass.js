
(function() {
    // 核心拦截：直接修改物品实例的名称获取逻辑
    var _Game_Item_name = Game_Item.prototype.name;
    Game_Item.prototype.name = function() {
        var name = _Game_Item_name.call(this);
        if (this.isItem() && this._itemId === 17) return "将军令";
        if (this.isArmor() && this._itemId === 487) return "将军令";
        return name ? name.replace("(假)", "").replace("未激活", "") : name;
    };

    // 窗口拦截：确保所有绘制名称的地方都强制修正
    var _Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
        if (item) {
            if (item.id === 17 || (DataManager.isArmor(item) && item.id === 487)) {
                item.name = "将军令";
                if (item.description) {
                    item.description = item.description.replace(/.*激活.*/g, "已激活至尊权限。");
                }
            }
            if (item.name) {
                item.name = item.name.replace("(假)", "").replace("未激活", "");
            }
        }
        _Window_Base_drawItemName.call(this, item, x, y, width);
    };

    // 对话框文本拦截：防止显示“获得 将军令(假)”
    var _Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Message_convertEscapeCharacters.call(this, text);
        return text.replace(/将军令\(假\)/g, "将军令").replace(/将军令未激活/g, "将军令");
    };

    // 数据加载时强制修正原始数据对象
    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataItems || object === $dataArmors || object === $dataWeapons) {
            object.forEach(function(item) {
                if (item && item.name) {
                    item.name = item.name.replace("(假)", "").replace("未激活", "");
                    if (item.id === 17 || (object === $dataArmors && item.id === 487)) {
                        item.name = "将军令";
                    }
                }
            });
        }
    };

    // 全局激活逻辑
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

    // 修复旧档案中装备槽位长度不一致导致部分装备栏缺失的bug
    var _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        var slots = _Game_Actor_equipSlots.call(this);
        if (this._equips) {
            while (this._equips.length < slots.length) {
                this._equips.push(new Game_Item());
            }
        }
        return slots;
    };

    function activateAll() {
        if ($gameSwitches) {
            $gameSwitches.setValue(101, true); // 通用激活
            $gameSwitches.setValue(102, true); // 高级激活
        }
        if ($gameVariables) {
            $gameVariables.setValue(116, 8);   // 战令最高等级
            $gameVariables.setValue(150, "MASTER_ACTIVE"); 
        }
    }
})();
