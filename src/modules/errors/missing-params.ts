export class MissingParams extends Error implements ControllerError {
	constructor(message: string) {
		super(`Parametros Faltando: ${message}`);
		this.name = "MissingParams";
	}
}
