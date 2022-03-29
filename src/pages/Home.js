import { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Tweet from "../components/Tweet";
import TweetForm from "../components/TweetForm";
import styled from "styled-components";

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

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <Wrap>
      <TweetForm userObj={userObj} />
      <Tweets>
        {tweets.map((item) => (
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
export default Home;
