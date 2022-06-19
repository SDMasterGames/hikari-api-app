export class AlreadyExistsError extends Error implements ControllerError {
    constructor(message: string) {
      super(message);
      this.name = "AlreadyExistsError";
    }
  }