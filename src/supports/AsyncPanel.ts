import { AsyncPanel, View } from '@inno/game-sdk';
import { Handler } from '@pawgame/game-library';
import { LoadingPanel } from '../modules/loading/LoadingPanel';
import { showAlert } from './Alert';

export class GAsyncPanel extends AsyncPanel {
    protected async load() {
        if (!this._isLoading) {
            View.togglePanel(LoadingPanel, 1);
        }
        await super.load();
    }

    protected onResReady() {
        View.togglePanel(LoadingPanel, 0);
        super.onResReady();
    }

    protected onResError() {
        View.togglePanel(LoadingPanel, 0);
        showAlert(
            '提示',
            '哎呀，加载失败了，请重试',
            Handler.create(this, () => {
                this.load();
            }),
        );
    }
}
