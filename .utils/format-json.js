import fs from 'fs';

process.stdout.write(
  Object.entries(JSON.parse(fs.readFileSync(`${process.cwd()}/${process.argv[2]}`, 'utf-8')))
    .reduce((acc, [key, value]) => `${acc}${key}=${value}\n`, '')
)
