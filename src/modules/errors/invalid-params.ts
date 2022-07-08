export class InvalidParams extends Error implements ControllerError {
	constructor(message: string) {
		super(`Parametros Invalidos: ${message}`);
		this.name = "InvalidParams";
	}
}
