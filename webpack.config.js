const path = require('path');
const Dotenv = require('dotenv-webpack');

const defaultTsCompilerOptions = {
  target: 'ES2015',
  moduleResolution: 'Node',
  noImplicitAny: true
};

module.exports = [
  // script.ts that runs in the browser
  {
    entry: './ts/script',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './js')
    },
    
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            onlyCompileBundledFiles: true,
            compilerOptions: Object.assign(
              {},
              defaultTsCompilerOptions,
              {lib: ['ES2017', 'DOM']}
            )
          }
        }
      ],
    },
    resolve: {
      extensions: ['.ts', 'js']
    },
    plugins: [new Dotenv()],
    node: {
      fs: 'empty' // Just to suppress "Can't resolve 'fs'" error
    }
  },
  
  // sw.ts, the service worker
  {
    entry: './ts/sw',
    output: {
      filename: 'sw.js',
      path: path.resolve(__dirname, './')
    },
    
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            onlyCompileBundledFiles: true,
            compilerOptions: Object.assign(
              {},
              defaultTsCompilerOptions,
              {lib: ['ES2017', 'WebWorker']}
            )
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', 'js']
    }
  }
];