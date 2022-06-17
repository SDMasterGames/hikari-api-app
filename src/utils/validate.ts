export class ValidateUtils {
  static isStringValid(string: string): boolean {
    return typeof string === "string" &&
    string.search(/^(NaN|null|undefined)/gi) === -1
  }
}