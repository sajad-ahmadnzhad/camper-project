function convertToArrayIfString(value: any) {
  if (typeof value === "string") {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  }

  return value;
}
export default convertToArrayIfString