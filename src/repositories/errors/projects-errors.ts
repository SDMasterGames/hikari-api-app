export class ProjectsError extends Error{
  constructor(message: string) {
    super(message);    
    this.name = "ProjectsError";
  }
}
