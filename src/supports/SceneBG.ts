import { FairyLoader, RES, Resize, UILayer } from '@pawgame/laya-game-sdk';
import { getVersionURL } from './getVersionURL';

let bg: FairyLoader;
function setBG(url: string) {
    if (!bg) {
        bg = new FairyLoader();
        bg.align = 'center';
        bg.verticalAlign = 'middle';
        bg.setSize(Resize.getWidth(), Resize.getHeight());
    }
    if (url) {
        UILayer.inst.getUIRoot().addChildAt(bg, 0);
        const realURL = getVersionURL(url);
        RES.load(realURL).then(() => {
            (bg.content as Laya.Sprite).texture = Laya.loader.getRes(realURL);
        });
    } else {
        bg.url = null;
        bg.removeFromParent();
    }
}

function changeEmpty() {
    setBG(null);
}

function changePreBG() {
    setBG('res/images/scene/bg_pre.jpg');
}

function changeHome() {
    setBG('res/images/scene/bg.png');
}

export const SceneBG = {
    setBG,
    changeEmpty,
    changePreBG,
    changeHome,
};
