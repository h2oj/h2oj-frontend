module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        es6: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    plugins: ['vue']
};
