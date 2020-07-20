const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const splitChunks = {
    cacheGroups: {
        default: {
            test(module) {
                return !/\.css$/.test(module.request);
            },
        },
    },
};

const optimization = {
    minimizer: [
        new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            sourceMap: true,
            cache: true,
            parallel: true,
        }),
    ],
    splitChunks: {
        ...splitChunks,
        // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksname
        name: false,
    },
    moduleIds: 'hashed',
    runtimeChunk: 'single',
};

const devOptimization = {
    sideEffects: true,
    splitChunks,
};

module.exports = {
    // 修改output.path
    outputDir: 'dist',
    // 修改output.publishPath
    publicPath: process.env.BASE_URL,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: [
                path.resolve(__dirname, './src/styles/*.styl'),
            ],
        },
    },
    // devServer: {
    //     disableHostCheck: true,
    //     proxy: {
    //         '/lk-business/test': {
    //             target: 'http://m.stage.ktvsky.com',
    //             changeOrigin: true,
    //         },
    //     },
    //     host: 'm.dev.ktvsky.com',
    // },
    configureWebpack: {
        optimization: isProduction ? optimization : devOptimization,
    },
    chainWebpack: config => {
        config.plugin('vconsole-webpack-plugin')
            .use('vconsole-webpack-plugin')
            .tap(options => {
                options[0] = {
                    enable: process.env.NODE_ENV === 'stage',
                };
                return options;
            });
    },
};
