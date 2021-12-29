/**
 * 全局
 */
export const getVersionURL = (url: string) => {
    // 这里的地址还特么不能随机，否则会获取不到资源，因为url不匹配了，真是头大，有空把底层加载干掉把
    return Laya.ResourceVersion.manifest[url] || `${url}?ver=${new Date().getMinutes()}`;
};
