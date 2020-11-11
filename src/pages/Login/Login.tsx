import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import loginService from "../../services/login";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../services/firebase";

const LoginContainer = styled.div`
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

const Login = () => {
  let [mail, setMail] = useState("");
  let [pass, setPass] = useState("");

  const [user, loading, error] = useAuthState(firebase.auth());
  if (user) return <Redirect to={{ pathname: "/" }}></Redirect>;

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Input
        value={mail}
        placeholder="Mail"
        onChange={e => setMail(e.target.value)}
      ></Input>
      <Input
        value={pass}
        type="password"
        placeholder="Pass"
        onChange={e => setPass(e.target.value)}
      ></Input>
      <Button
        onClick={() => {
          loginService(mail, pass);
        }}
      >
        Login
      </Button>
      <Link to="/register">Register</Link>
    </LoginContainer>
  );
};

export default Login;
