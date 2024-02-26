import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/utrend_logo.png';
import { useState } from 'react';
import Login from '../AuthModal/Login';
import SignUp from '../AuthModal/SignUp';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const onLoginClickHandler = () => {
    setIsLoginOpen((prev) => !prev);
  };
  const onSignUpClickHandler = () => {
    setIsSignUpOpen((prev) => !prev);
  };

  return (
    <HeaderWrap>
      <Logo>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </Logo>
      <Auth>
        <p onClick={onLoginClickHandler}>로그인</p>
        <p onClick={onSignUpClickHandler}>회원가입</p>
      </Auth>
      {/* 로그인, 회원가입 모달창 */}
      <Login
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        isSignUpOpen={isSignUpOpen}
        setIsSignUpOpen={setIsSignUpOpen}
      />
      <SignUp
        isSignUpOpen={isSignUpOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
      />
    </HeaderWrap>
  );
}

export const HeaderWrap = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px #00000011;
`;
export const Logo = styled.h1`
  width: 200px;
  & > a > img {
    width: 100%;
  }
`;

export const Auth = styled.div`
  display: flex;
  gap: 20px;
  position: absolute;
  right: 0;
  margin-right: 30px;
  & > p {
    color: #febe98;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
      font-weight: bold;
    }
  }
`;
