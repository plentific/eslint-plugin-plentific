const config = {
  presets: ['@babel/preset-env'],

  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        src: './examples/app/scripts',
        shared: './examples/app/shared/scripts',
        modules: './examples/app/modules',
      },
    }],
  ],

  exclude: '/node_modules/',
}

module.exports = config;
