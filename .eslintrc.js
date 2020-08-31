module.exports = {
  extends: ["@cszatma", "airbnb/rules/react", "airbnb/hooks"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/__test__/**", "src/setupTests.ts"],
      },
    ],
    "import/no-default-export": ["off"],
    "no-confusing-arrow": ["off"],
    "object-curly-newline": ["off"],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/destructuring-assignment": ["off"],
    "react/sort-comp": ["off"],
    "react/prop-types": ["off"],
    "react/state-in-constructor": ["error", "never"],
    "react/static-property-placement": ["error", "static public field"],
    "@typescript-eslint/naming-convention": ["off"],
    "react/jsx-one-expression-per-line": ["off"],
  },
};
