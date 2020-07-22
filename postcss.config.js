module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-aspect-ratio-mini': {},
        'postcss-write-svg': {
            utf8: false,
        },
        'postcss-cssnext': {},
        'postcss-px-to-viewport': {
            viewportWidth: 750, // (Number) 视口的宽度
            viewportHeight: 1334, // (Number) 视口的高度。
            unitPrecision: 3, // (Number) 允许REM单位增长到的十进制数

            viewportUnit: 'vw', // (String) 使用单位
            selectorBlackList: ['.ignore', '.hairlines', '.van'], // (Array) 保留px单位的类名集合
            minPixelValue: 1, // (Number) 设置要替换的最小像素值.
            mediaQuery: false, // (Boolean) 允许在媒体查询中转换px
        },
        'postcss-viewport-units': {
            filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1,
        },
        cssnano: {
            'cssnano-preset-advanced': {
                zindex: false,
                autoprefixer: false,
            },
        },
    },
};