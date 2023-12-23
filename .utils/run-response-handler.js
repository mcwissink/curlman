import fs from 'fs';
import readline from 'readline';
import { session } from './session.js';

const readStdin = () => new Promise((resolve) => {
  let acc = '';
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })
    .on('line', (line) =>{
      acc += `${line}\n`;
    })
    .once('close', () => {
      resolve(acc);
    });
});

const response = await readStdin();
console.log(response);
const module = await import(`${process.cwd()}/${process.argv[2]}`);
module.default.responseHandler?.(response);
session.write();
