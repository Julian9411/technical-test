import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { ICreatePost, IEditPost } from "./list.props";

export const useGetList = () =>
  useQuery("getList", () =>
    axios.get("https://waco-api.herokuapp.com/api/posts/all").then((res) => {
      return res.data.data;
    })
  );
export const useGetListByUser = (id: string) =>
  useQuery(
    "getListUser",
    () =>
      axios
        .get(`https://waco-api.herokuapp.com/api/users/${id}/post`)
        .then((res) => {
          return res.data.data;
        }),
    {
      refetchIntervalInBackground: true,
    }
  );

export const useDeletePost = () =>
  useMutation("deletePost", (id: string | number) =>
    axios.delete(`https://waco-api.herokuapp.com/api/posts/${id}`)
  );

export const useEditPost = () =>
  useMutation(
    "editPost",
    ({ id, body }: { id: string | number; body: IEditPost }) =>
      axios({
        method: "put",
        url: `https://waco-api.herokuapp.com/api/posts/${id}`,
        data: body,
      })
  );

export const useCreatePost = () =>
  useMutation(
    "createPost",
    ({ body }: { id: string | number; body: ICreatePost }) =>
      axios({
        method: "post",
        url: "https://waco-api.herokuapp.com/api/posts/",
        data: body,
      })
  );
