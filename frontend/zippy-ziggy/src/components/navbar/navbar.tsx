/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Image from 'next/image';
import { FaBars, FaRegBell, FaRegBookmark } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useRouter } from 'next/router';
import { NavWrapper, NavList, NavOption, Logo, NavUser, Overlay } from './navbar.style';

const Navbar = ({ toggleTheme }) => {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { isDark } = useTheme();

  // 네비게이션바 닫기
  const handleNavClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  // 네비게이션바 목록[내용, 인덱스, 라우팅]
  const navOptions: Array<Array<string>> = [
    ['프롬프트', '0', '/prompts'],
    ['대화공유', '1', '/#'],
    ['튜토리얼', '2', '/#'],
    ['다운로드', '3', '/#'],
  ];

  // 선택된 옵션 표시
  const handleIsSelected = (e) => {
    e.preventDefault();
    setIsSelected(e.target.innerText);
    handleNavClose(e);
  };

  // 메인페이지로 이동
  const moveMain = (e) => {
    e.preventDefault();
    setIsSelected(null);
    router.push('/');
  };

  return (
    <NavWrapper>
      <FaBars className="toggleBtn" onClick={() => setIsOpen((prev) => !prev)} />
      <div style={{ display: 'flex' }}>
        <Logo>
          {isDark ? (
            <Image
              priority
              src="/images/Logo_dark.png"
              alt="로고주세요"
              width={200}
              height={50}
              className="LogoImage"
              onClick={moveMain}
            />
          ) : (
            <Image
              priority
              src="/images/Logo_white.png"
              alt="로고주세요"
              width={200}
              height={50}
              className="LogoImage"
              onClick={moveMain}
            />
          )}
        </Logo>
        <NavList isOpen={isOpen}>
          {navOptions.map(([navOption, index, link]) => {
            return (
              <NavOption
                key={index}
                onClick={handleIsSelected}
                onKeyDown={handleIsSelected}
                tabIndex={Number(index)}
                role="button"
                className={isSelected === navOption ? 'active' : ''}
              >
                <Link href={link}>{navOption}</Link>
              </NavOption>
            );
          })}
          <NavOption
            onClick={toggleTheme}
            onKeyDown={toggleTheme}
            tabIndex={navOptions.length}
            role="button"
            className="themeBtn"
          >
            테마 바꾸기
          </NavOption>
        </NavList>
      </div>
      <NavUser>
        <FaRegBookmark className="item bookmark" />
        <FaRegBell className="item" />
        <Link href={{ pathname: '/account/login' }}>
          <Image
            priority
            src="/images/noProfile.png"
            alt="프사"
            width={30}
            height={30}
            className="profileImage"
          />
        </Link>
      </NavUser>
      {isOpen && <Overlay onClick={handleNavClose} />}
    </NavWrapper>
  );
};

export default Navbar;