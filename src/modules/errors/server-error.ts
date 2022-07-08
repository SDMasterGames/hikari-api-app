export class ServerError extends Error implements ControllerError {
	constructor(message: string) {
		super(message);
		this.name = "ServerError";
	}
}
