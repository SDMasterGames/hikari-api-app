export interface IUpdateProjectDetailRequestDTO<T> {
  updateType?: T;
  id?: string;
  data?: {
    [key: string]: any;
  };
}
