export interface IEditPost {
  title?: string;
  body?: string;
}
export interface ICreatePost extends IEditPost {
  user_uuid: string;
}