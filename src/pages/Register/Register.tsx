import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import serviceRegister from "../../services/register";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../services/firebase";

const RegisterContainer = styled.div`
  margin: auto;
  width: 500px;
  border: 1px grey solid;
  border-radius: 3px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
`;

const Input = styled.input`
  border: 1px grey solid;
  border-radius: 3px;
  font-size: 20px;
  padding: 5px;
  margin: auto;
  margin-bottom: 20px;
  display: block;
`;

const Button = styled.button`
  font-size: 20px;
  background-color: black;
  color: white;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin: auto;
  display: block;
  border-radius: 3px;
  border-color: black;
  font-weight: 800;
`;

const Register = () => {
  let [mail, setMail] = useState("");
  let [pass, setPass] = useState("");
  let [pass2, setPass2] = useState("");
  let [birthdate, setBirthdate] = useState("");

  const [user] = useAuthState(firebase.auth());
  if (user) return <Redirect to={{ pathname: "/" }}></Redirect>;

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <form>
        <label>Mail</label>
        <Input
          value={mail}
          placeholder="Mail"
          onChange={e => setMail(e.currentTarget.value)}
        ></Input>
        <label>Pass</label>
        <Input
          type="password"
          value={pass}
          placeholder="Pass"
          onChange={e => setPass(e.currentTarget.value)}
        ></Input>
        <label>Pass Again</label>
        <Input
          value={pass2}
          type="password"
          placeholder="Pass Again"
          onChange={e => setPass2(e.currentTarget.value)}
        ></Input>
        <label>Birthdate</label>
        <Input
          value={birthdate}
          placeholder="30/12/99"
          onChange={e => setBirthdate(e.currentTarget.value)}
        ></Input>
      </form>

      <Button onClick={() => serviceRegister(mail, pass, pass2, birthdate)}>
        Ok
      </Button>
      <Link to="/login">Login</Link>
    </RegisterContainer>
  );
};

export default Register;
