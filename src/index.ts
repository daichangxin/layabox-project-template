import { GameOperate } from './modules/game/GameOperate';

const onVersionLoaded = () => {
    // 游戏运行阶段，流畅运行
    Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
    GameOperate.inst.startUp();
};

const startUp = () => {
    // 修复部分华为设备不支持webGL2
    Config.useWebGL2 = false;
    // 修复ios15会黑屏
    Config.isAntialias = true;
    if (typeof Laya3D !== 'undefined') Laya3D.init(750, 1334);
    else Laya.init(750, 1334, Laya.WebGL);
    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
    Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
    Laya.stage.alignV = 'top';
    Laya.stage.alignH = 'left';
    // 兼容微信不支持加载scene后缀场景
    Laya.URL.exportSceneToJson = true;
    // 关闭多点触控
    Laya.MouseManager.multiTouchEnabled = false;
    // 初始化阶段，降帧
    Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
    Laya.stage.bgColor = '#FFFFFF';
    GameOperate.inst.init();

    // 激活资源版本控制
    Laya.ResourceVersion.enable(
        `version.json?ver=${Math.random()}`,
        Laya.Handler.create(this, onVersionLoaded),
        Laya.ResourceVersion.FILENAME_VERSION,
    );
};

startUp();
