import fs from 'fs';

class Session {
  constructor() {
    this.env = fs.existsSync('.session.json') ? JSON.parse(fs.readFileSync('.session.json')) : {};
    this.envProxy = new Proxy(this.env, {
      get(target, prop) {
        return prop in target ? target.prop : process.env[prop];
      },
    })
  }

  write() {
    fs.writeFileSync('.session.json', JSON.stringify(this.env))
  }
}

export const session = new Session();
global.CM = session.envProxy;

