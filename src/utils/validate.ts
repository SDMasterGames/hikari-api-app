export class ValidateUtils {
	static StringValid(string: string): boolean {
		return (
			typeof string === "string" &&
			string.search(/^(NaN|null|undefined)/gi) === -1
		);
	}
	static IntegerValid(number: number): boolean {
		return typeof number === "number" && Number.isInteger(number);
	}

	static invalidParams(obj: any): string[] {
		return Object.entries<string>(obj)
			.filter(([key, value]) => {
				return !value || !this.StringValid(value);
			})
			.map(([key]) => key);
	}
	static validateImageUrl(url: string): boolean {
		return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi.test(url);
	}
}
