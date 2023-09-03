export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const getDataFromKeys = (data, keys: string[]) => {
  return keys.reduce((outData, key) => {
    outData[key] = data[key];
    return outData;
  }, {});
};

export const toCamelCase = (str: string) =>
  str.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });

export const keysToCamel = obj => {
  if (obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function') {
    const newObj = {};

    Object.keys(obj).forEach(k => {
      newObj[toCamelCase(k)] = keysToCamel(obj[k]);
    });

    return newObj;
  } else if (Array.isArray(obj)) {
    return obj.map(i => {
      return keysToCamel(i);
    });
  }

  return obj;
};
