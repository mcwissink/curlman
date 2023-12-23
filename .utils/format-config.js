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

import(`${process.cwd()}/${process.argv[2]}`)
  .then((module) => {
    console.log(
      Object.entries(module.default.config)
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
  });
