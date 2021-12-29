import { GAsyncPanel } from '../../supports/AsyncPanel';

export class BagPanel extends GAsyncPanel {
    constructor() {
        super('res/ui/bag', 'bagUI');
    }

    protected doReady(): void {
        this._isCenter = true;
        this._isMode = true;
        this._isPopUp = true;
    }
}
