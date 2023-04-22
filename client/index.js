const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const tree = new MerkleTree(niceList);

async function main() {
  
  if (process.argv.length < 3) {
    console.log('Usage: node index.js [name]');
    process.exit(1);
  }
  const name = process.argv[2];
  const index = niceList.findIndex(x => x === name);
  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name
  });
  console.log( { gift } );
}

main();