const nxPreset = require('@nx/jest/preset').default;

// Projects supply their own transform (@swc/jest), so drop the preset's
// ts-jest entry instead of pulling ts-jest in alongside it. Jest merges
// preset and project transforms by key, so leaving it here would make Jest
// resolve a module we do not install.
const { transform, ...preset } = nxPreset;

module.exports = preset;
