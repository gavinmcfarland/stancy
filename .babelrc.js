const presets = ["@babel/preset-env"];
const plugins = [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["add-module-exports"],
    ["@babel/plugin-transform-runtime", { "regenerator": true }]
];

// Rewire doesn't seem to be working with add-module-exports, so we use it just for testing
if (process.env.NODE_ENV === 'test') {
    plugins.push(["rewire"]);
}

module.exports = { presets, plugins };