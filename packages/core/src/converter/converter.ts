export class Converter {
  static toSnakeCase(obj: any) {
    const toSnake = (s) => s.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();

    return this.changeObjectProperty(obj, toSnake);
  }

  static toCamelCase(obj: any) {
    const toCamel = (s) => s.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
      .replace('-', '')
      .replace('_', ''));

    return this.changeObjectProperty(obj, toCamel);
  }

  static changeObjectProperty(o, converter: (obj: any) => any) {
    if (Array.isArray(o)) {
      return o.map((i) => this.changeObjectProperty(i, converter));
    }
    if (typeof o === 'object') {
      const n = {};

      Object.keys(o)
        .forEach((k) => {
          n[converter(k)] = this.changeObjectProperty(o[k], converter);
        });

      return n;
    }
    return o;
  }
}
