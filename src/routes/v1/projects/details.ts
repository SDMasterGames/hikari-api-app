import { Router } from "express";
import {
  CreateProjectDetailController,
  GetProjectDetailController,
  UpdateProjectDetailController,
} from "../../../modules/projects-details/";

export class EndpointProjectsDetail {
  public path = "/v1/projects/details";
  public router = Router();
  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}`, async (req, res) => {
      const { status, data, error } =
        await CreateProjectDetailController.handle({
          body: req.body,
        });
      return res.status(status).json(error ? { error } : data);
    });

    this.router.get(`${this.path}`, async (req, res) => {
      const { status, data, error } = await GetProjectDetailController.handle({
        query: req.query,
      });
      return res.status(status).json(error ? { error } : data);
    });

    this.router.get(`${this.path}/:id`, async (req, res) => {
      const { status, data, error } =
        await UpdateProjectDetailController.handle({
          params: req.params,
          body: req.body,
        });
      return res.status(status).json(error ? { error } : data);
    });
  }
}
