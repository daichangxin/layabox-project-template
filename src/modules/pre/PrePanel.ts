import { AsyncPanel, Resize } from '@inno/game-sdk';
import { SceneBG } from '../../supports/SceneBG';

export class PrePanel extends AsyncPanel {
    protected $skin: c.UI_pre;
    private bar_jindu: fgui.GProgressBar;

    constructor() {
        super('res/ui/pre', 'UI_pre');
    }

    protected doReady() {
        super.doReady();
        this._isScene = true;
        this._skin.setSize(Resize.getWidth(), Resize.getHeight());
        this.bar_jindu = this.$skin.loadUI.asCom.getChild('bar_jindu').asProgress;
        this.bar_jindu.value = 0;
    }

    update(value: number, des: string) {
        if (!this._isReady) {
            this.addReady(this, this.update, [value, des]);
            return;
        }
        this.bar_jindu.tweenValue(value, 0.2);
    }

    protected doAwaken() {
        SceneBG.changePreBG();
    }
}
