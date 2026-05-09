/*:
 * @plugindesc Bypass for character activation verification.
 * @author Gemini CLI
 *
 * @help
 * This plugin removes the passive states 485 and 486 that trigger the
 * "unactivated character" gameover logic directly upon database load,
 * permanently bypassing the need for external server verification.
 */

(function() {
    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, object);
        
        // Strip the passive state 485 from all classes
        if (object === $dataClasses) {
            for (var i = 1; i < $dataClasses.length; i++) {
                if ($dataClasses[i] && $dataClasses[i].note) {
                    $dataClasses[i].note = $dataClasses[i].note.replace(/<Passive State:\s*485>/g, '');
                }
            }
        }
        
        // Also neuter the states themselves just in case they are applied elsewhere
        if (object === $dataStates) {
            if ($dataStates[485] && $dataStates[485].note) {
                $dataStates[485].note = $dataStates[485].note.replace(/<Ally Aura:\s*486>/g, '');
            }
            if ($dataStates[486]) {
                $dataStates[486].customActionStartEffect = "";
                $dataStates[486].note = ""; // Remove any residual tags
            }
        }
    };
})();
