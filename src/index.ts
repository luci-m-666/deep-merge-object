const isObject = (item: any) =>
  item && typeof item === 'object' && !Array.isArray(item);

export function objectMerge(target, ...sources) {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return target;
      }
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        objectMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return objectMerge(target, ...sources);
}
