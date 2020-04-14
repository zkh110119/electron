const { spawnSync } = require('child_process');
const path = require('path');
const { inspect } = require('util');

const srcPath = path.resolve(__dirname, '..', '..', '..');
const patchExportPath = path.resolve(__dirname, 'export_all_patches.py');
const configPath = path.resolve(__dirname, '..', 'patches', 'config.json');

// Re-export all the patches to check if there were changes.
spawnSync('python', [patchExportPath, configPath], { cwd: srcPath });

// Update indices.
spawnSync('git', ['update-index', '--refresh', '||', 'true']);

// If the exit code is 0, then there were no differences.
spawnSync('git', ['diff-index', '--quiet', 'HEAD']);
