const _ = require('lodash');
const path = require('path');

const sharedConfigs = {
    context: __dirname,
    entry: {
        app: './src/index.tsx'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};

const mergeResolver = (objValue, srcValue) => (
    _.isArray(objValue) ? objValue.concat(srcValue) : undefined
);

module.exports = (configs) => _.mergeWith(sharedConfigs, configs, mergeResolver);
