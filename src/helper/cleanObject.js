export default function cleanObject(obj) {
  if (Object.keys(obj).length === 0) return obj;
  const stringfiedObj = JSON.stringify(obj, (_, value) =>
    ["", null].includes(value) ||
    (typeof value === "object" && (value.length === 0 || Object.keys(value).length === 0))
      ? undefined
      : value
  );
  const resObj = JSON.parse(stringfiedObj);
  const isEmptyPropsPresent = ["{}", "[]", '""', "null"].some((key) => stringfiedObj.includes(key));
  if (isEmptyPropsPresent) {
    return cleanObject(resObj);
  }
  return resObj;
}
