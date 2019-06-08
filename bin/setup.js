const util = require('util');
const exec = util.promisify(require('child_process').exec);

const install = async () => {
  const installRust = async () => {
    const { stdout, stderr } = await exec('curl https://sh.rustup.rs -sSf | sh -s -- -y');
    console.log(stdout);
    console.error(stderr);
  };

  const installWasmPack = async () => {
    const { stdout, stderr } = await exec('curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh');
    console.log(stdout);
    console.error(stderr);
  };

  const installCargoGenerate = async () => {
    const { stdout, stderr } = await exec('cargo install cargo-generate');
    console.log(stdout);
    console.error(stderr);
  };

  console.log('Beginning installation. This might take a while...');

  try {
    await installRust();
    await installWasmPack();
    await installCargoGenerate();
  } catch (e) {
    console.error(e);
  }
};

install();