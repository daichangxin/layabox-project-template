import { BaseDB, Singleton } from '@pawgame/game-library';
import { getConfig } from '../../supports/Config';

type CodeVo = {
    code: number;
    des: string;
};

export class CodeDB extends BaseDB<CodeVo> {
    static getInst() {
        return Singleton.get(CodeDB);
    }

    constructor() {
        super(getConfig<CodeVo>('code'), 'code');
    }
}
