import styled from 'styled-components';

const Conatiner = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.whiteColor80};
  box-shadow: ${({ theme }) => theme.shadows.boxShadowLarge};

  .image {
    background-color: ${({ theme }) => theme.colors.grayColor};
    /* cursor: pointer; */
    width: 100%;
    /* height: 10rem; */
    object-fit: contain;
    border-radius: 4px 4px 0 0;
    aspect-ratio: calc(2);
  }

  .caption {
    font-size: var(--fonts-body-xm);
    color: ${({ theme }) => theme.colors.blackColor30};
  }
`;

const Body = styled.div`
  padding: 1rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: var(--fonts-heading);
    font-size: var(--fonts-desktop-heading-xl);
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const Content = styled.div`
  margin-top: 1rem;
  font-size: var(--fonts-body-sm);
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 3rem;
`;

const Infos = styled.div`
  display: flex;

  .divider {
    margin-inline: 0.5rem;
  }
`;

const Footer = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.blackColor10};

  .user {
    display: flex;
    align-items: center;

    .nickname {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
    }
  }

  .extraBox {
    display: flex;

    .item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      .like {
        margin-right: 0.5rem;
      }
      /* box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.03); */
      /* border-radius: var(--borders-radius-round); */
      /* aspect-ratio: calc(1); */
      /* width: 2rem; */
    }
  }
`;

export { Conatiner, Body, Title, Content, Infos, Footer };
