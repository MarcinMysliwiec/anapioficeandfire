const findNumber = (StringParam: string): number | null => {
  const firstNumber = StringParam.match(/\d+/);
  if (firstNumber) {
    return parseInt(firstNumber[0], 10);
  }
  return null;
};

const containStringInsensitive = (
  StringParam_01: string,
  StringParam_02: string,
): boolean => {
  return StringParam_01.toLowerCase().includes(StringParam_02.toLowerCase());
};

const removeSubstring = (
  StringParam_01: string,
  StringParam_02: string,
): string => {
  return StringParam_01.replace(StringParam_02, "");
};

const getIndexFromURL = (url: string): number => {
  const indexLastSlash = url.lastIndexOf("/");
  const idNumber = url.substring(indexLastSlash + 1);
  return parseInt(idNumber, 10);
};

export {
  findNumber,
  containStringInsensitive,
  removeSubstring,
  getIndexFromURL,
};
