import { RES } from '@pawgame/laya-game-sdk';
import pako from 'pako';
import { getVersionURL } from './getVersionURL';

let data: Record<string, unknown>;
export async function loadConfig() {
    return new Promise((resolve, reject) => {
        const uri = getVersionURL('res/config/config.dat');
        RES.load([{ url: uri, type: Laya.Loader.BUFFER }]).then((res) => {
            if (res) {
                const rawData: ArrayBuffer = Laya.loader.getRes(uri);
                const content = pako.inflate(new Uint8Array(rawData), { to: 'string' });
                data = JSON.parse(content);
                resolve(data);
            } else {
                reject(res);
            }
        });
    });
}

export const getConfig = <T>(name: string) => {
    return data[name] as T[];
};
