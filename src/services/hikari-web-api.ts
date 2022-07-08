import "dotenv/config";
import axios from "axios";

const baseURL = process.env["HIKARI_WEB_API_URL"];

if (!baseURL) {
	throw new Error("HIKARI_WEB_API_URL is not defined");
}

const HikariWebApi = axios.create({
	baseURL,
});

export { HikariWebApi };
