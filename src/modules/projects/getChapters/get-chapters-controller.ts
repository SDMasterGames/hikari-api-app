import { IHttpRequest, IHttpResponse } from "../../httpHelper";
import { getChaptersUseCase } from "./get-chapters-usecase";

export class getChaptersController {
  constructor(private useCase: getChaptersUseCase) {}

  async handle({ query }: IHttpRequest): Promise<IHttpResponse> {
    const { slug } = query;
    const result = await this.useCase.execute({ slug });
    return result;
  }
}
