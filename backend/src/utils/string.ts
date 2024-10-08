export enum StringTransformations {
  SNAKE_TO_CAMEL,
  CAMEL_TO_SNAKE,
}

export const convertSnakeCaseToCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

export const convertCamelCaseToSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

const getConversionType = (
  key: string,
  conversionType: StringTransformations
) => {
  switch (conversionType) {
    case StringTransformations.CAMEL_TO_SNAKE:
      return convertCamelCaseToSnakeCase(key);
    case StringTransformations.SNAKE_TO_CAMEL:
      return convertSnakeCaseToCamelCase(key);
    default:
      return;
  }
};

// todo: get rid of any if possible
export const convertObjectKeys = <T extends Record<string, any>, U>(
  obj: T,
  conversionType: StringTransformations
): U => {
  return Object.keys(obj).reduce<U>((acc: U, key: string) => {
    const formattedKey = getConversionType(key, conversionType);
    // need to properly error handle
    if (formattedKey) {
      acc[formattedKey as keyof U] = obj[key];
    }
    return acc;
  }, {} as U);
};

export const convertArrayKeys = <T extends Record<string, any>, U>(
  arr: T[],
  conversionType: StringTransformations
): U[] => {
  return arr.map((obj) => convertObjectKeys<T, U>(obj, conversionType));
};
