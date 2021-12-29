import { App, Console, EventConsts, FairyRes, Scene, SoundManager, View } from '@inno/game-sdk';
import { GFacade, Singleton } from '@pawgame/game-library';
import { loadConfig } from '../../supports/Config';
import { PathDefine } from '../../supports/PathDefine';
import { HomeScene } from '../home/HomeScene';
import { PrePanel } from '../pre/PrePanel';

export class GameOperate {
    private _pre: PrePanel;
    private _isBasicResReady: boolean;

    static get inst() {
        return Singleton.get(GameOperate);
    }

    /** 初始化框架 */
    init() {
        fgui.UIConfig.packageFileExtension = 'gz';
        fgui.UIConfig.buttonSound = PathDefine.getSound('SFX_ui3');
        Laya.SoundManager.useAudioMusic = false;
        Laya.SoundManager.autoStopMusic = true;
        App.inst.init();
        this.initPanels();
        this.initModels();
    }

    async startUp() {
        this._pre = View.togglePanel(PrePanel, 1);
        await loadConfig();
        await this.loadResource();
        this._isBasicResReady = true;
        this.enterGame();
    }

    async loadResource() {
        try {
            this._pre.update(30, '小喵正在看电视');
            await FairyRes.getPackageRes('res/ui/basic').loadAll();
            await FairyRes.loadPackage('res/ui/effect');
            this._pre.update(40, '小喵正在玩耍');
            await FairyRes.getPackageRes('res/ui/home').loadAll();
            this._pre.update(100, '小喵正在来临的路上');
        } catch (e) {
            Console.log('sys', 'loadResource.fail, retry..');
            await this.loadResource();
        }
        Console.log('test', 'load resource complete');
    }

    private initPanels() {
        // Singleton.registerInst(HomeUIPanel.NAME, HomeUIPanel);
    }

    private initModels() {
        // Models
        // Singleton.get(LoginData);
        // ADD HERE
    }

    onLogin() {
        this.enterGame();
    }

    private enterGame() {
        // isLogin
        if (!this._isBasicResReady) {
            Console.log('test', 'enterGame.return: basic res not ready');
            return;
        }
        View.togglePanel(PrePanel, 0);
        Scene.change(HomeScene);

        GFacade.inst.addListener(EventConsts.STAGE_AWAKEN, this, this.doResume);
        GFacade.inst.addListener(EventConsts.STAGE_SLEEP, this, this.doPause);
    }

    private doPause() {
        SoundManager.inst.sysMute = true;
    }

    private doResume() {
        SoundManager.inst.sysMute = false;
    }

    get isBasicResReady() {
        return this._isBasicResReady;
    }
}
