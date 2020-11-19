import { signin } from "./firebase";

const serviceLogin = (mail: string, pass: string) => {
  signin(mail, pass)
    .then(res => console.log("success"))
    .catch(err => console.log(err));
};

export default serviceLogin;
