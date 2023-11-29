import(`${process.cwd()}/${process.argv[2]}`)
  .then((module) => {
    process.stdout.write(
      Object.entries(module.default.config)
        .reduce((acc, [key, value]) => `${acc}\n${key}=${value}`, '')
    );
  });
