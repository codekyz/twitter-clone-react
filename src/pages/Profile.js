import { updateProfile } from "firebase/auth";
import {
  where,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService, dbService } from "../fbase";
import Tweet from "../components/Tweet";

const Wrap = styled.section`
  @media (max-width: 480px) {
    margin-top: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    margin-top: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
  }
  @media (min-width: 767px) {
    margin-left: 250px;
    margin-bottom: 60px;
  }
`;

const Tweets = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const ProfileForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  input {
    padding: 10px;
    margin-bottom: 10px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.gray};
    &:nth-child(2) {
      cursor: pointer;
      background-color: ${(props) => props.theme.coral};
      color: ${(props) => props.theme.white};
    }
  }
`;

const Button = styled.button`
  border: 0;
  padding: 5px 5px 2px 5px;
  margin-bottom: 20px;
  cursor: pointer;
  font-family: "GangwonEdu_OTFBoldA";
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.coral};
    color: ${(props) => props.theme.white};
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Profile = ({ refreshUser, userObj }) => {
  const [myTweets, setMyTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(
    userObj?.displayName ? userObj.displayName : "user"
  );

  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const getMyTweets = () => {
    const q = query(
      collection(dbService, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setMyTweets(tweetArray);
    });
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <Wrap>
      <ProfileForm onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display Name"
        />
        <input type="submit" value="Update Profile" />
      </ProfileForm>
      <Button onClick={onLogOutClick}>로그아웃</Button>
      <Title>내 일기 모아보기</Title>
      <Tweets>
        {myTweets.map((item) => (
          <Tweet
            key={item.id}
            tweetObj={item}
            isOwner={item.creatorId === userObj.uid}
          />
        ))}
      </Tweets>
    </Wrap>
  );
};
export default Profile;
