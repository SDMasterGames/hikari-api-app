export interface IAuthRepository {
	authenticate(uuid: string): Promise<string>;
	verify(token: string): Promise<any>;
}
