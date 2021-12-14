module.exports = {
  // 局部引入element-plus，自动引入css样式
  plugins: [
    [
      "import",
      {
        libraryName: "element-plus",
        customStyleName: (name) => {
          return `element-plus/lib/components/${name}/style/css`;
        }
      }
    ]
  ],
  presets: ["@vue/cli-plugin-babel/preset"]
};
