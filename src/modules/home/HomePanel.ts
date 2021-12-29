import { AsyncPanel, RES, Resize } from '@inno/game-sdk';
import { View } from '@pawgame/game-library';
import { showSimpleAlert } from '../../supports/Alert';
import { showToast } from '../../supports/Toast';
import { getVersionURL } from '../../supports/getVersionURL';
import { BagPanel } from '../bag/BagPanel';
import { CodeDB } from '../game/CodeDB';

export class HomePanel extends AsyncPanel {
    private $skin: c.UI_home;

    constructor() {
        super('res/ui/home', 'UI_home');
    }

    protected async doReady() {
        super.doReady();
        this._isScene = true;
        this._isCenter = true;

        const safeY = Resize.getSafeY();
        this._skin.y = safeY;
        this._skin.setSize(Resize.getWidth(), Resize.getHeight() - safeY);

        const url = getVersionURL('res/images/scene/bg.png');
        RES.load(url).then(() => {
            (this.$skin.bg.content as Laya.Sprite).texture = Laya.loader.getRes(url);
        });

        // ground items
        for (let i = 1; i <= 6; i++) {
            const groundItem = this.$skin.dele_ground.$skin[`ground_${i}`] as fgui.GComponent;
            groundItem.onClick(this, this.onGroundItemClick);
        }

        // ground items
        this.$skin.dele_ground.$skin.ground_101.onClick(this, () => {
            View.toggle(BagPanel);
        });

        for (let i = 2; i <= 3; i++) {
            const groundItem = this.$skin.dele_ground.$skin[`ground_10${i}`] as fgui.GComponent;
            groundItem.onClick(this, this.onTopGroundItemClick);
        }
    }

    private onGroundItemClick() {
        showSimpleAlert('提示', '暂未开放');
    }

    private onTopGroundItemClick() {
        showToast(CodeDB.getInst().get('1').des);
    }
}
