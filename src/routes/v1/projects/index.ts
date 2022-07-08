import { Router } from "express";
import {
	GetChaptersController,
	GetFavoritesController,
	GetHomeController,
} from "../../../modules/projects/";

export class EndpointProjects {
	public path = "/v1/projects";
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

		this.router.get(`${this.path}/favorites`, async (req, res) => {
			const { status, data, error } = await GetFavoritesController.handle({
				query: req.query,
			});

			return res.status(status).json(error ? { error } : data);
		});
	}
}
