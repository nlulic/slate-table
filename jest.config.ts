export default {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        inputSourceMap: true,
        presets: [
          "@babel/preset-typescript",
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },

  // An array of regexp pattern strings that are matched towards all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/site/"],

  // An array of regexp pattern strings used to skip the test coverage collection
  coveragePathIgnorePatterns: ["/test/"],

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["/node_modules/"],
};
