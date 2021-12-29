import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { Header, ListComponent, IColumns } from "../../components";
import { ModalComponent } from "../../components/Modal/Modal";
import { useReduxSelector } from "../../redux";
import {
  useCreatePost,
  useDeletePost,
  useEditPost,
  useGetList,
  useGetListByUser,
} from "./List.hook";

import "./style.css";

export const List = () => {
  const { auth } = useReduxSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postIdSelected, setPostIdSelected] = useState<string | number>("0");
  const [favoritesPost, setFavoritePost] = useState<Record<string, string>[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const {
    refetch: refetchGetList,
    data: rows,
    isLoading: isLoadingPost,
    isFetched,
  } = useGetList();
  const {
    refetch: refetchGetUser,
    data: userListData,
    isLoading: isLoadingUser,
  } = useGetListByUser(auth.id);

  const deletePost = useDeletePost();
  const editPost = useEditPost();
  const createPost = useCreatePost();

  useEffect(() => {
    refetchGetList();
    refetchGetUser();
  }, [isFetched, open, editPost.isSuccess, editPost.isLoading]);

  useEffect(() => {
    const getFavoritesPost = () => {
      const data = query(collection(firestore, "favorites"));
      onSnapshot(data, (querySnapshot) => {
        setFavoritePost(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
        );
      });
    };
    getFavoritesPost();
  }, []);

  console.log(favoritesPost)

  const columns: IColumns[] = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "title", label: "Title", minWidth: 170, align: "right" },
    { id: "body", label: "Body", minWidth: 300, align: "right" },
    { id: "user", label: "User", minWidth: 170, align: "right" },
  ];

  const editPostAction = (id: string | number) => {
    setOpen(true);
    setIsEdit(true);
    setPostIdSelected(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendEditPost = () => {
    editPost.mutate({
      id: postIdSelected,
      body: {
        title,
        body,
      },
    });
    setIsEdit(false);
    handleClose();
  };
  const sendCreatePost = () => {
    createPost.mutate({
      id: postIdSelected,
      body: {
        title,
        body,
        user_uuid: auth.id,
      },
    });
    handleClose();
  };

  const createFavorites = async (id: string | number) => {
    const filterById = rows.filter((row: any) => row.id === id);
    try {
      await addDoc(collection(firestore, "favorites"), {
        id,
        title: filterById[0].title,
        body: filterById[0].body,
        user: filterById[0].user
      });
    } catch (err) {
      alert(err);
    }
  };

  const actions = (id: string | number) => (
    <div>
      <Button color="secondary" onClick={() => createFavorites(id)}>
        Edit
      </Button>
      <Button color="warning" onClick={() => editPostAction(id)}>
        Edit
      </Button>
      <Button
        color="error"
        onClick={() => {
          deletePost.mutate(id);
          refetchGetList();
        }}
      >
        Delete
      </Button>
    </div>
  );

  const textButton = isEdit ? "Editar" : "Crear";

  return (
    <div>
      <Header type="secondary" />
      <div className="containerList">
        <h1>Bienvenido {auth.displayName || auth.email || "Usuari@"}</h1>
        <h2>Post List</h2>
        <Button onClick={() => setOpen(true)}>Crear post</Button>
        {!isLoadingPost && (
          <ListComponent columns={columns} rows={rows} actions={actions} />
        )}
        <h2>Favorite List</h2>
        {!isLoadingUser && (
          <ListComponent columns={columns} rows={favoritesPost} />
        )}
      </div>
      <ModalComponent
        handleClose={handleClose}
        open={open}
        textButton={`${textButton} un usuario`}
        buttonAction={() => {
          isEdit ? sendEditPost() : sendCreatePost();
        }}
      >
        <div className="contentModal">
          <h2>{`${textButton} un post`}</h2>
          <TextField
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <TextField
            label="Body"
            variant="outlined"
            onChange={(e) => setBody(e.target.value)}
            type="text"
            multiline
          />
        </div>
      </ModalComponent>
    </div>
  );
};
