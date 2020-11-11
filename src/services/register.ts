import { signup, db } from "./firebase";

const serviceRegister = (
  mail: string,
  pass: string,
  pass2: string,
  birthdate: string
) => {
  if (pass !== pass2) {
    console.log("Error pass mismatch");
    return;
  }
  signup(mail, pass)
    .then(res => {
      console.log(res);
      const { user } = res;
      if (!user) return;
      console.log("users/" + user.uid);
      db.collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          uid: user.uid,
          birthdate
        });
    })
    .catch(err => console.log(err));
};

export default serviceRegister;
