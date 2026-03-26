SceneManager.cancelAnimationFrame = function () {
  cancelAnimationFrame(this.update.bind(this));
};

const _Graphics_createCanvas = Graphics._createCanvas;
Graphics._createCanvas = function () {
  _Graphics_createCanvas.apply(this, arguments);
  this._canvas.addEventListener(
    "webglcontextlost",
    async function (e) {
      SceneManager.cancelAnimationFrame();
      let webglcontextlostTimer = setTimeout(async function () {
        alert("检测到游戏画面崩溃,即将尝试修复\n修复结束后请尽快结束当前操作并前往存档\n存档完成后重启游戏");
        SceneManager.initGraphics();
        clearTimeout(webglcontextlostTimer);
        delete webglcontextlostTimer;
      }, 2000);
    },
    { passive: true }
  );
};