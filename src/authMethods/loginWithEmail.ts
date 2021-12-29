import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase";
import { AppDispatch } from "../redux";
import { addAuth } from "../redux/actions/auth";

export const loginWithEmail = ({
  email,
  pass,
  navigate,
  dispatch,
}: {
  email: string;
  pass: string;
  navigate: (route: string) => void;
  dispatch: AppDispatch
}) => {
  signInWithEmailAndPassword(authentication, email, pass)
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
