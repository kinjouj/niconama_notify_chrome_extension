module.exports = {
  entry: ["./src/background.js"],
  output: {
    filename: "dist/background.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
