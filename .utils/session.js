import fs from 'fs';

class Session {
  constructor() {
    this.env = this.read();
    this.envProxy = new Proxy(this.env, {
      get(target, prop) {
        if (prop in target) {
          return target.prop;
        } else if (prop in process.env) {
          return process.env[prop];
        } else {
          console.error(`Missing variable [${prop}]`);
          process.exit(1);
        }
      },
    })
  }

  read() {
    fs.existsSync('.session.json') ? JSON.parse(fs.readFileSync('.session.json')) : {};
  }

  write() {
    fs.writeFileSync('.session.json', JSON.stringify(this.env))
  }
}

const session = new Session();
global.CM = session.envProxy;
export { session };

