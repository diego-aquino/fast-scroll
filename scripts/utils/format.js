async function prettifyFiles(files) {
  await $`yarn prettier --write ${files}`;
}

module.exports = { prettifyFiles };
