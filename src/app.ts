import "dotenv/config";
import express from "express";
import {
	EndpointProjects,
	EndpointProjectsDetail,
	EndpointUsers,
} from "./routes/";

export class App {
	public app: express.Application;
	constructor() {
		this.app = express();
		this.middleware();
		this.initRoutes();
	}

	private middleware() {
		this.app.use(express.json());
	}

	private initRoutes() {
		this.app.get("/", (req, res) => {
			res.send("Hello World!");
		});

		this.app.use(new EndpointProjects().router);
		this.app.use(new EndpointProjectsDetail().router);
		this.app.use(new EndpointUsers().router);
	}

	listen(port: string | number) {
		this.app.listen(port, () => {
			console.log("Server running on port " + port);
		});
	}
}
