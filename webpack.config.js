module.exports = {
  entry: {
    app: "./src/frontend/app.js",
    background: "./src/background.js"
  },
  output: {
    filename: "dist/[name].js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
