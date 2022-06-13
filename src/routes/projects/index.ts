import { Router } from "express";
import { GetChaptersController } from "../../modules/projects/getChapters";
import { GetHomeController } from "../../modules/projects/getHome";

export class EndpointProjects {
  public path = "/projects";
  public router = Router();
  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/`, async (req, res) => {
      const { status, data, error } = await GetHomeController.handle({
        query: req.query,
      });
      return res.status(status).json(error ? { error } : data);
    });

    this.router.get(`${this.path}/chapters`, async (req, res) => {
      const { status, data, error } = await GetChaptersController.handle({
        query: req.query,
      });

      return res.status(status).json(error ? { error } : data);
    });
  }
}
