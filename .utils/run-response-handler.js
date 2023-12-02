import fs from 'fs';
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

const loadSession = () => {
    try {
        const session = fs.readFileSync('.session.json');
        return new Map(Object.entries(JSON.parse(session)));
    } catch {
        return new Map();
    }
};

import(`${process.cwd()}/${process.argv[2]}`)
    .then((module) => {
        readStdin().then((response) => {
            if (module.default.responseHandler) {
                const session = loadSession();
                module.default.responseHandler({
                    response,
                    session,
                });
                fs.writeFileSync('.session.json', JSON.stringify(Object.fromEntries(session)))
            }
        })
    });
