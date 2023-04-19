import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { ButtonWrapper, Exit, Footer } from './Footer.style';
import Button from '../Button/Button';

interface PropsType {
  isNext: boolean;
  handleNext: () => void;
}

export default function CreateFooter({ isNext, handleNext }: PropsType) {
  return (
    <Footer>
      <Exit>
        <FaArrowLeft />
        <Link href="/prompts" className="text">
          나가기
        </Link>
      </Exit>
      {isNext ? (
        <ButtonWrapper>
          <Button width="6rem" className="prev testBtn" onClick={handleNext}>
            이전
          </Button>
          <Button width="7rem" className="testBtn">
            게시글 작성
          </Button>
        </ButtonWrapper>
      ) : (
        <Button width="6rem" color="primaryColor" onClick={handleNext} className="testBtn">
          다음
        </Button>
      )}
    </Footer>
  );
}
