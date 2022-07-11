export class AuthError extends Error implements ControllerError {
	constructor(message: string) {
		super(message);
		this.name = "AuthError";
	}
}
