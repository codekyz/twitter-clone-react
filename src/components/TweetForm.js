import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
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
    &:nth-child(3) {
      cursor: pointer;
      background-color: ${(props) => props.theme.coral};
      color: ${(props) => props.theme.white};
    }
  }
`;

const ImgPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    button {
      margin-left: 10px;
      padding: 5px 5px 3px 5px;
      font-family: "GangwonEdu_OTFBoldA";
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: ${(props) => props.theme.coral};
      color: ${(props) => props.theme.white};
    }
  }
`;

const TweetForm = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(attachmentRef, response);
    }
    const tweetObj = {
      text: tweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "tweets"), tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="????????? ?????????????"
        maxLength={120}
      />
      <input onChange={onFileChange} type="file" accept="image/*" />
      <input type="submit" value="?????????" />
      {attachment && (
        <ImgPreview>
          <span>?????? ????????????</span>
          <div>
            <img src={attachment} alt="pic" width="50px" height="50px" />
            <button onClick={onClearAttachment}>?????? ?????????</button>
          </div>
        </ImgPreview>
      )}
    </Form>
  );
};

export default TweetForm;
