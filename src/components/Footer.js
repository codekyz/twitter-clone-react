import styled from "styled-components";

const Copyright = styled.footer`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: ${(props) => props.theme.gray};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  a {
    &:hover {
      color: ${(props) => props.theme.coral};
    }
  }
`;

const Footer = () => {
  return (
    <Copyright>
      <div>
        ⓒ{new Date().getFullYear()}{" "}
        <a href="https://github.com/codekyz" target="_blank" rel="noreferrer">
          codekyz
        </a>
      </div>
    </Copyright>
  );
};

export default Footer;
