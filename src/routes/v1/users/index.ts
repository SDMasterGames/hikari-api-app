import { Router } from "express";
import {
	AuthUserController,
	CreateUserController,
	GetUserController,
	RevalidateUserController,
} from "../../../modules/users/";

export class EndpointUsers {
	public path = "/v1/users";
	public router = Router();
	constructor() {
		this.initRoutes();
	}

	public initRoutes() {
		this.router.get(this.path + "/:uuid", async (req, res) => {
			const { status, data, error } = await GetUserController.handle({
				params: req.params,
			});
			return res.status(status).json(error ? { error } : data);
		});

		this.router.post(this.path + "/", async (req, res) => {
			const { status, data, error } = await CreateUserController.handle({
				body: req.body,
			});
			return res.status(status).json(error ? { error } : data);
		});
		this.router.post(this.path + "/auth", async (req, res) => {
			const { status, data, error } = await AuthUserController.handle({
				body: req.body,
			});
			return res.status(status).json(error ? { error } : data);
		});
		this.router.get(this.path + "/revalidate/:token", async (req, res) => {
			const { status, data, error } = await RevalidateUserController.handle({
				params: req.params,
			});
			return res.status(status).json(error ? { error } : data);
		});
	}
}
