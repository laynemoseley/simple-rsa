var prompt = require("prompt");
var { chunk } = require("lodash");

prompt.start();
prompt.get(["p", "q", "e", "d", "message"], function (err, result) {
  const { p, q, e, d, message } = result;

  console.log(`Encrypting "${message}"`);

  const encoded = encode(message);
  console.log("encoded:", encoded);

  const PublicKey = {
    n: BigInt(p * q),
    e: BigInt(e),
  };

  console.log("public key", PublicKey);

  const PrivateKey = {
    d: BigInt(d),
  };

  console.log("private key", PrivateKey);

  const ciphertext = encoded.map((char) => {
    return char ** PublicKey.e % PublicKey.n;
  });
  console.log("ciphertext", ciphertext);

  const decrypted = ciphertext.map((char) => {
    return char ** PrivateKey.d % PublicKey.n;
  });
  console.log("decrypted", decrypted);

  const decoded = decode(decrypted);
  console.log(`decoded: ${decoded}`);
});

// Returns an array of each letter encoded
const encode = (message) => {
  return message.split("").map((a) => BigInt(basicEncodingTable[a]));
};

// Decodes each item in the array back into a letter
const decode = (characters) => {
  const table = reverseEncodingTable();
  return characters
    .map((char) => {
      return table[char];
    })
    .join("");
};

const reverseEncodingTable = () => {
  const table = {};
  Object.keys(basicEncodingTable).forEach((character) => {
    const value = basicEncodingTable[character];
    table[value] = character;
  });

  return table;
};

const basicEncodingTable = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
  g: 16,
  h: 17,
  i: 18,
  j: 19,
  k: 20,
  l: 21,
  m: 22,
  n: 23,
  o: 24,
  p: 25,
  q: 26,
  r: 27,
  s: 28,
  t: 29,
  u: 30,
  v: 31,
  w: 32,
  x: 33,
  y: 34,
  z: 35,
};
