module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"],
        "tsconfigRootDir": __dirname
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "linebreak-style": 0,
        "consistent-return": "off"
    },
    "ignorePatterns": ["__tests__/*", "dist/*"]
}
