
export function isItNullOrUndefined(what: any) {
  if (what === undefined) {
    return true;
  }
  if (what === null) {
    return true;
  }
  return false;
}

export function isItEmptyString(what: any) {
  if (what === '') {
    return true;
  }
  return false;
}

