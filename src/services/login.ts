import { signin } from "./firebase";
import { message } from "antd";

const serviceLogin = (mail: string, pass: string) => {
  signin(mail, pass)
    .then(res => message.success("Login success"))
    .catch(err => console.log(err));
};

export default serviceLogin;
