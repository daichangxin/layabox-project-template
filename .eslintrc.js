module.exports = {
    extends: ['@shm-open/eslint-config-bundle'],
    rules: {
        'no-underscore-dangle': 0,
        'no-plusplus': [
            2,
            {
                allowForLoopAfterthoughts: true,
            },
        ],
    },
    globals: {
        Laya: true,
        fgui: true,
        Config: true,
        c: true,
    },
};
