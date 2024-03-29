import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectScript from '@pages/content/utils/extension/inject-script';
import {
  CHAT_GPT_URL,
  MK_DATA_FROM_PROMPT_CARD_PLAY,
  MK_REQUEST_DATA,
  MK_RESIGN,
  MK_SIGN_OUT,
  ZIPPY_SITE_URL,
  ZP_BACKDROP_ID,
  ZP_OVERLAY_ID,
  ZP_PROMPT_CONTAINER_ID,
  ZP_ROOT_ID,
} from '@pages/constants';
import { createRoot } from 'react-dom/client';
import ContentScript from '@pages/content/components/ZippyApp/ZippyApp';
import { getPromptDetail } from '@pages/content/apis/prompt';
import intervalForFindElement from '@pages/content/utils/extension/intervalForFindElement';
import logOnDev from '@pages/content/utils/@shared/logging';

refreshOnUpdate('pages/content');

const currentUrl = window.location.href;

const addRoot = async () => {
  // 리액트의 root 심기
  const root = document.createElement('div');
  root.id = ZP_ROOT_ID;

  // 모달을 위한 포탈 root
  const backdropRoot = document.createElement('div');
  backdropRoot.id = ZP_BACKDROP_ID;

  const overlayRoot = document.createElement('div');
  overlayRoot.id = ZP_OVERLAY_ID;

  document.body.appendChild(root);
  document.body.prepend(backdropRoot);
  document.body.prepend(overlayRoot);

  createRoot(root).render(<ContentScript />);
};

if (currentUrl.startsWith(CHAT_GPT_URL)) {
  // ChatGPT 사이트에서 실행할 로직
  injectScript();
  addRoot().then(() => {
    chrome.runtime.sendMessage({ type: MK_REQUEST_DATA });
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      switch (msg.type) {
        case MK_DATA_FROM_PROMPT_CARD_PLAY: {
          const message = {
            type: MK_DATA_FROM_PROMPT_CARD_PLAY,
            data: msg.data,
          };
          intervalForFindElement(`#${ZP_PROMPT_CONTAINER_ID}`, () => {
            window.postMessage(message, CHAT_GPT_URL);
          });
          break;
        }
        default:
          break;
      }
    });
  });
}

// 지피지기 사이트에서 적용할 로직
if (currentUrl.startsWith(ZIPPY_SITE_URL)) {
  logOnDev.log('지피지기 kr 로직');
  // 프론트엔드에서 확장이 설치되었는지 확인을 하기위해 심는 attribute
  document.documentElement.setAttribute('zippy', 'true');
  // 로그아웃 연동
  intervalForFindElement('[class^=userUuid__ProfileHeaderContainer]', ($authContainer: Element) => {
    const $signOutButton = $authContainer.querySelector('#logout');
    if ($signOutButton) {
      $signOutButton.addEventListener('click', () => {
        const name = document.querySelector('h1').textContent;
        chrome.runtime.sendMessage({ type: MK_SIGN_OUT, name });
      });
    }
  });

  // 탈퇴 연동
  intervalForFindElement('[class^=ModalStyle__ModalContent]', ($authContainer: Element) => {
    if ($authContainer) {
      const resignButton = $authContainer.querySelector('.btnBox > button:last-of-type');
      const isResignModal =
        $authContainer.querySelector('.modalTitle')?.textContent === '회원 탈퇴';

      if (isResignModal) {
        resignButton.addEventListener('click', () => {
          const name = (document.querySelector('.nickNameInput') as HTMLInputElement).placeholder;
          chrome.runtime.sendMessage({ type: MK_RESIGN, name });
        });
      }
    }
  });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of [...mutation.addedNodes]) {
        const $targetElement = node as HTMLElement;
        if (typeof $targetElement.className === 'object') return;
        if (
          $targetElement.className?.startsWith('Detailstyle__Container') ||
          $targetElement.className?.startsWith('Detailstyle__LeftContainer')
        ) {
          const $promptPlayDesktop = document.querySelector('#promptPlayDesktop') as HTMLElement;
          const $promptPlayMobile = document.querySelector('#promptPlayMobile') as HTMLElement;
          if ($promptPlayDesktop || $promptPlayMobile) {
            const { uuid } = $promptPlayDesktop.dataset;
            const title = document.querySelector('.title')?.textContent;
            const $ComponentStyleSubContainer = document.querySelectorAll(
              '[class^=ComponentStyle__SubContainer]'
            );
            const $colorBox = $ComponentStyleSubContainer[2].querySelector('.colorBox');
            const prefix = $colorBox.querySelector('span:first-of-type')?.textContent ?? '';
            const example = $colorBox.querySelector('span.example')?.textContent ?? '';
            const suffix = $colorBox.querySelector('span:last-of-type')?.textContent ?? '';

            $promptPlayDesktop.addEventListener('click', () => {
              chrome.runtime.sendMessage({
                type: MK_DATA_FROM_PROMPT_CARD_PLAY,
                data: { title, prefix, example, suffix, uuid },
              });
            });

            $promptPlayMobile.addEventListener('click', () => {
              chrome.runtime.sendMessage({
                type: MK_DATA_FROM_PROMPT_CARD_PLAY,
                data: { title, prefix, example, suffix, uuid },
              });
            });
          }
        }
        if ($targetElement.className?.startsWith('CardStyle__Conatiner')) {
          const promptUuid = $targetElement.dataset.uuid;
          const $playButton = $targetElement.querySelector('#promptCardPlay');
          $playButton.addEventListener('click', async () => {
            const { title, prefix, example, suffix, uuid } = await getPromptDetail(promptUuid);
            await chrome.runtime.sendMessage({
              type: MK_DATA_FROM_PROMPT_CARD_PLAY,
              data: { title, prefix, example, suffix, uuid },
            });
          });
        }
      }
    }
  });

  const { body } = document;
  if (body) observer.observe(body, { subtree: true, childList: true });
}
