import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { dbService, storageService } from "../fbase";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const Card = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.gray};
  border-radius: 5px;
  box-shadow: 0 0 2px ${(props) => props.theme.coral};
  button,
  input[type="submit"] {
    border: 0;
    padding: 5px 5px 2px 5px;
    margin-top: 5px;
    cursor: pointer;
    font-family: "GangwonEdu_OTFBoldA";
    border-radius: 5px;
    &:hover {
      background-color: ${(props) => props.theme.coral};
      color: ${(props) => props.theme.white};
    }
  }
`;

const EditForm = styled.form`
  display: flex;
  input[type="textarea"] {
    flex-grow: 1;
    padding: 5px 5px 2px 5px;
    margin-bottom: 10px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white};
  }
  input[type="submit"] {
    margin-top: 0;
    margin-bottom: 10px;
    margin-left: 5px;
  }
`;

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "tweets", `${tweetObj.id}`));
      await deleteObject(ref(storageService, tweetObj.attachmentUrl));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "tweets", `${tweetObj.id}`), {
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <Wrap>
      {editing ? (
        <Card>
          {isOwner && (
            <>
              <EditForm onSubmit={onSubmit}>
                <input
                  type="textarea"
                  onChange={onChange}
                  value={newTweet}
                  required
                />
                <input type="submit" value="Update" />
              </EditForm>
              <button onClick={toggleEditing}>취소</button>
            </>
          )}
        </Card>
      ) : (
        <Card>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt="pic"
            />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>수정하기</button>
              <button onClick={onDeleteClick}>삭제하기</button>
            </>
          )}
        </Card>
      )}
    </Wrap>
  );
};

export default Tweet;
