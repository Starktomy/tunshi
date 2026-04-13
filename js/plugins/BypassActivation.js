/*:
 * @plugindesc Bypass for character activation verification.
 * @author Gemini CLI
 *
 * @help
 * This plugin automatically turns on all character activation switches
 * to prevent the "unactivated character" error from triggering.
 */

(function() {
    var ACTOR_ACTIVATION_SWITCHES = [
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45, 47, 49, 50, 51, 52
    ];

    var _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        // Ensure all activation switches are ON before starting battle
        for (var i = 0; i < ACTOR_ACTIVATION_SWITCHES.length; i++) {
            $gameSwitches.setValue(ACTOR_ACTIVATION_SWITCHES[i], true);
        }
        
        // Also set global activation flags if they exist
        $gameSwitches.setValue(101, true); // 通用激活
        $gameSwitches.setValue(102, true); // 高级激活
        if ($gameVariables) {
            $gameVariables.setValue(150, "MASTER_ACTIVE");
        }

        _Scene_Battle_start.call(this);
    };

    // Also do it on map load just in case
    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        for (var i = 0; i < ACTOR_ACTIVATION_SWITCHES.length; i++) {
            $gameSwitches.setValue(ACTOR_ACTIVATION_SWITCHES[i], true);
        }
        _Scene_Map_start.call(this);
    };
})();
