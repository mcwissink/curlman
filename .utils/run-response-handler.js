import readline from 'readline';

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

import(`${process.cwd()}/${process.argv[2]}`)
    .then((module) => {
        readStdin().then((response) => {
            if (module.default.responseHandler) {
                console.log(response);
                module.default.responseHandler(response);
            }
        })
    });
