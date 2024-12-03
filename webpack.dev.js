const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  stats: 'errors-only',
  entry: {
    common: ['./scripts/common.js', './styles/common.scss'],
    'product-item': ['./styles/product-item.scss'],
    'product-form': ['./scripts/product-form.js'],
    'hero-slider-section': ['./scripts/sections/hero-slider-section.js', './styles/sections/hero-slider-section.scss'],
    header: ['./scripts/sections/header.js', './styles/sections/header.scss'],
    'announcement-bar': ['./scripts/sections/announcement-bar.js', './styles/sections/announcement-bar.scss'],
    footer: ['./scripts/sections/footer.js', './styles/sections/footer.scss'],
    'featured-collection': ['./styles/sections/featured-collection.scss'],
    'cart-drawer': ['./scripts/sections/cart-drawer.js', './styles/sections/cart-drawer.scss'],
    'cart-items': ['./scripts/cart-items.js'],
    'predictive-search': ['./scripts/predictive-search.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'assets'),
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
