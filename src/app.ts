import express from "express";

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
  }

  listen(port: string | number) {
    this.app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  }
}
