import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${(props) => props.theme.coral};
  color: ${(props) => props.theme.white};
  padding: 40px;
  li {
    margin-bottom: 15px;
  }
  span {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    right: 0;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    right: 0;
  }
  @media (min-width: 767px) {
    bottom: 0;
  }
`;

const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 30px;
`;

const Navigation = ({ userObj }) => {
  return (
    <Nav>
      <Title>
        <span>모두</span>가치일기
      </Title>
      <ul>
        <li>
          <Link to="/">모아보기</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj?.displayName ? userObj.displayName : "user"}의 프로필
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
