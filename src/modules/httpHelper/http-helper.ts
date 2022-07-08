import { IHttpResponse } from "./";
import { ServerError } from "../errors/server-error";

export const badRequest = (error: Error): IHttpResponse => ({
	status: 400,
	error,
});

export const created = (data: any): IHttpResponse => ({
	status: 201,
	data,
});

export const ok = (data: any): IHttpResponse => ({
	status: 200,
	data,
});

export const serverError = (reason: string): IHttpResponse => ({
	status: 500,
	error: {
		name: new ServerError(reason).name,
		message: reason,
	},
});
