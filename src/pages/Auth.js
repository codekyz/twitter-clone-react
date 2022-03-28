import { authService } from "../fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "../components/AuthForm";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px 8px 15px;
  margin-bottom: 10px;
  font-family: "GangwonEdu_OTFBoldA";
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.gray};
  color: ${(props) => props.theme.black};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.coral};
    color: ${(props) => props.theme.white};
  }
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <Wrap>
      <AuthForm />
      <Buttons>
        <Button name="google" onClick={onSocialClick}>
          Google 계정으로 계속하기
        </Button>
        <Button name="github" onClick={onSocialClick}>
          Github 계정으로 계속하기
        </Button>
      </Buttons>
    </Wrap>
  );
};
export default Auth;
