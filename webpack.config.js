const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "chat.[name].[contenthash].js",
	},
	mode: 'production',
	resolve: {
		extensions: [".js"],
		alias: {
			vue: "vue/dist/vue.js",
			icns: path.resolve(__dirname, "src/assets/images/icons"),
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css|.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: "./src/templates/index.html",
			filename: "index.html",
			title: "Hey! - Mini Chat",
			meta: {
				viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
			},
		}),
		new MiniCssExtractPlugin(
			{filename: "chat.[name].[contenthash].css"}
		),
		//new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(),
		new VueLoaderPlugin()
	],
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin()
		],
		splitChunks: {
			chunks: "all",
		},

	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		historyApiFallback: true,
		port: 3006
	}
};
