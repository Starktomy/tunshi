/*:
 * ===============================
 * MND_SkipLoadError.js
 * ===============================
 * @plugindesc 以弹窗显示与插件、图片、声音文件缺失有关的错误停息，并尝试忽略错误继续游戏。(v1.0.2)
 * @author 莴瓜 @66rpg
 * 
 * @help
 * 本插件不需要配置，但请注意：
 * 本插件可能在官方升级RMMV后存在兼容性问题（如果官方修改了相应的方法的话)，本
 * 插件发布时只在 RMMV 1.4.1 (steam版)下作简单测试。
 * 
 * by 鳗驼螺(Mandarava) 2016.06.06
 */

PluginManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        alert('Failed to load: ' + url);
    }
};

ImageManager.loadSvActor = function(filename, hue) {
    var fs=require("fs");
    var path=require("path");
    var folder = path.join(path.dirname(process.mainModule.filename), 'img/sv_actors/');
    var file = folder + filename + '.png';
    if(fs.existsSync(file)){
        return this.loadBitmap('img/sv_actors/', filename, hue, false);
    }else{
        alert("Failed to load: "+file);
        return this.loadEmptyBitmap();
    }
};

ImageManager.isReady = function() {
    for (var key in this.cache._inner) {
        var bitmap = this.cache._inner[key].item;
        if (bitmap.isError()) {
            alert('Failed to load: ' + bitmap.url);
            bitmap=ImageManager.loadEmptyBitmap();
            this.cache.setItem(key, bitmap);
        }
        if (!bitmap.isReady()) {
            return false;
        }
    }
    return true;
};

AudioManager.checkWebAudioError = function(webAudio) {
    if (webAudio && webAudio.isError()) {
        alert('Failed to load: ' + webAudio.url);
        webAudio.initialize("");
    }
};