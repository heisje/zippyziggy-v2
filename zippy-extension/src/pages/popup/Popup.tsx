import React from 'react';
import Logo from '@assets/img/logo_white.svg';
import ZippyIcon from '@assets/img/icon48.png';
import GPTIcon from '@assets/img/chat-gpt.svg';
import Canny from '@assets/img/canny.jpg';
import Notion from '@assets/img/notion.png';
import { CHAT_GPT_URL, ZIPPY_SITE_URL, ZP_CANNY_URL, ZP_NOTION_URL } from '@pages/constants';
import styles from './Popup.module.scss';
import packageJson from '../../../package.json';

const Popup = () => {
  const handleOpenWebsiteClick = (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: e.currentTarget.href });
  };

  const buildTime = __BUILD_TIME__;

  return (
    <div className={styles.app}>
      <img className={styles.logo} src={Logo} alt="zippyziggy" />
      <div className={styles['link-wrapper']}>
        <a href={`${ZIPPY_SITE_URL}`} onClick={handleOpenWebsiteClick}>
          <img src={ZippyIcon} alt="지피지기 웹사이트" />
          <p>웹사이트 둘러보기</p>
        </a>
        <a href={`${CHAT_GPT_URL}`} onClick={handleOpenWebsiteClick}>
          <img src={GPTIcon} alt="챗 지피티 웹사이트" />
          <p>ChatGPT에서 사용해보기</p>
        </a>
        <a href={`${ZP_CANNY_URL}`} onClick={handleOpenWebsiteClick}>
          <img src={Canny} alt="Canny 버그 제보 사이트" />
          버그 제보 및 기능 요청
        </a>
        <a href={`${ZP_NOTION_URL}`} onClick={handleOpenWebsiteClick}>
          <img src={Notion} alt="지피지기 패치노트" />
          패치 노트
        </a>
      </div>
      <span className={styles.version}>
        {`버전 v${packageJson.version}`}
        <br /> {`빌드시간 ${buildTime}`}
      </span>
    </div>
  );
};

export default Popup;
