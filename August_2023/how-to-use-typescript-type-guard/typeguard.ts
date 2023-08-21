function format(param: string | number) {
  if (typeof param === "string") {
    // TypeScript knows that param is a string here
    return param.toUpperCase();
  } else {
    // TypeScript knows that param is a number here
    return param.toFixed(2);
  }
}
