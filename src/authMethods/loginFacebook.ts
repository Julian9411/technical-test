import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../firebase";
import { AppDispatch } from "../redux";
import { addAuth } from "../redux/actions/auth";

export const loginFacebook = (
  navigate: (route: string) => void,
  dispatch: AppDispatch
) => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(authentication, provider)
    .then((response) => {
      const token = response?.user?.uid;
      dispatch(
        addAuth({
          id: token,
          email: response?.user?.email || "",
          displayName: response?.user?.displayName || "",
        })
      );
      navigate("/list");
    })
    .catch((err) => console.log(err.message));
};
