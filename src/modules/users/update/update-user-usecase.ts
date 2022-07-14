import { User } from "../../../entities";
import { IUsersRepository } from "../../../repositories/interface-users-repository";
import { UserData } from "../../../repositories/ports";
import { ValidateUtils } from "../../../utils";
import { MissingParams, NotFoundError } from "../../errors";
import { badRequest, ok, serverError } from "../../httpHelper";
import { IUpdateUserRequestDTO } from "./update-user-dto";

export class updateUserUseCase {
	constructor(private IUserRepository: IUsersRepository) {}

	async execute(UpdateDataDTO: IUpdateUserRequestDTO) {
		try {
			if (!UpdateDataDTO.uuid) {
				return badRequest(new MissingParams("uuid não foi informado"));
			}
			const invalid = ValidateUtils.invalidParams(UpdateDataDTO);
			if (invalid.length > 0)
				return badRequest(new MissingParams(invalid.join(", ")));

			const userData = await this.IUserRepository.findByUuid(
				UpdateDataDTO.uuid
			);

			if (!userData) {
				return badRequest(
					new NotFoundError(`${UpdateDataDTO.uuid} não foi encontrado`)
				);
			}

			const changedUser = User.create({
				...userData,
				avatar_url: changedAvatarUrl(UpdateDataDTO, userData),
				favorites: changedFavorites(UpdateDataDTO, userData),
			});

			if (shouldUpdateAvatarUrl(UpdateDataDTO)) {
				await this.IUserRepository.updateAvatarUrl(
					changedUser.getUuid(),
					changedUser.getProfile().avatar_url
				);
			}

			if (shouldUpdateFavorites(UpdateDataDTO)) {
				await this.IUserRepository.updateFavorites(
					changedUser.getUuid(),
					changedUser.getFavorites()
				);
			}

			const user = (await this.IUserRepository.findByUuid(
				changedUser.getUuid()
			)) as UserData;

			return ok(User.create(user).get());
		} catch (error: any) {
			return serverError(error.message);
		}
	}
}

function shouldUpdateAvatarUrl(updateDataDTO: IUpdateUserRequestDTO): boolean {
	return Object.keys(updateDataDTO).indexOf("avatar_url") !== -1;
}

function shouldUpdateFavorites(updateDataDTO: IUpdateUserRequestDTO): boolean {
	return Object.keys(updateDataDTO).indexOf("favorites") !== -1;
}

function changedAvatarUrl(
	updateDataDTO: IUpdateUserRequestDTO,
	original: UserData
): string {
	if (!shouldUpdateAvatarUrl(updateDataDTO)) return original.avatar_url;
	return original.avatar_url !== updateDataDTO.avatar_url
		? (updateDataDTO.avatar_url as string)
		: original.avatar_url;
}

function changedFavorites(
	updateDataDTO: IUpdateUserRequestDTO,
	original: UserData
): string[] {
	if (!shouldUpdateFavorites(updateDataDTO)) return original.favorites;

	const favorites = original.favorites;

	if (favorites.includes(updateDataDTO.favorites as string)) {
		favorites.splice(favorites.indexOf(updateDataDTO.favorites as string), 1);
	} else {
		favorites.push(updateDataDTO.favorites as string);
	}
	return favorites;
}
