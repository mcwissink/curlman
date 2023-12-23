import './session.js';

const formatKeyValue = (key, value) => {
  switch (typeof value) {
    case 'number':
    case 'string':
      return `${key}=${value}`;
    case 'boolean':
      return value ? key : '';
    default:
      console.error(`Unsupported value type [${typeof value}] for key [${key}]`)
      process.exit(1);
  }
}

const module = await import(`${process.cwd()}/${process.argv[2]}`)
const config = module.default.config

console.log(
  Object.entries(typeof config === 'function' ? await config() : config)
    .reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((arrayValue) => acc.push(formatKeyValue(key, arrayValue)));
      } else {
        acc.push(formatKeyValue(key, value));
      }
      return acc;
    }, [])
    .join('\n')
);
