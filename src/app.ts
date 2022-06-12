import "dotenv/config";
import express from "express";
import { EndpointProjects } from "./routes/";

export class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.initRoutes();
  }

  private initRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    this.app.use(new EndpointProjects().router);
  }

  listen(port: string | number) {
    this.app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  }
}
