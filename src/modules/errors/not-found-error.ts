export class NotFoundError extends Error implements ControllerError {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}
