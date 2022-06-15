import { App } from "./app";

export const app = new App();

app.listen(process.env["PORT"] || 3000);
