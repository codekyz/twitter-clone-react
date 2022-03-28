import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { authService } from "../fbase";

const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.gray};
  &:last-child {
    cursor: pointer;
    background-color: ${(props) => props.theme.coral};
    color: ${(props) => props.theme.white};
  }
`;

const Toggle = styled.span`
  padding: 10px 15px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
`;

const Main = styled.main`
  width: 100%;
  padding: 50px;
  text-align: center;
  background-color: ${(props) => props.theme.coral};
  color: ${(props) => props.theme.white};
  margin-bottom: 50px;
  font-weight: 700;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (!newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <Main>로그인하거나 계정을 생성하고 "가치일기"를 확인하세요.</Main>
      <Toggle onClick={toggleAccount}>
        {newAccount ? "⇒ 계정 만들기" : "⇒ 로그인"}
      </Toggle>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
        <Input type="submit" value={newAccount ? "로그인" : "계정 만들기"} />
        {error}
      </Form>
    </>
  );
};

export default AuthForm;
