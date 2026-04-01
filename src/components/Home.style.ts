import styled from "@emotion/styled";
import BackgroundImg from "../Assest/ChatGPT_Image_bg02.png";
import { ReactComponent as HeartSvg } from "../Assest/heart.svg";


/** 전체 화면: 배경은 아래 레이어, 위에 UI 쌓기 */
export const S = {
  Page: styled.div`
    width: 100%;
    height: 100vh;
  `,
  Content: styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
    isolation: isolate;
    background-image: url(${BackgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  `,

  LogoContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  `,

  logoImg: styled.img`
    width: 50%;
  `,
  heartIcon: styled(HeartSvg)`
  width: 4vw;
  height: 4vw;
  color: #5e9f42;
  vertical-align: middle;
  `,

  TitleContainer: styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fefefb;
    border-radius: 10px;
    border: 0.5px solid rgb(202, 202, 202);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    gap: 12px;
  `,

  title: styled.span`
    color: #6e2ef2;
    font-size: 5vw;
    font-weight: 800;
    text-align: center;
  `,

  subtitle: styled.span`
    font-size: 3vw;
    font-weight: 500;
    color: #5e9f42;
  `,

  description: styled.span`
    font-size: 3vw;
    font-weight: 500;
    white-space: pre-line;
  `,
  ContentContainer: styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  align-items: stretch;
  `,
  Footer: styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #6e2ef2;
    padding: 10px;
    box-sizing: border-box;
  `,
  FooterText: styled.span`
    font-size: 2.5vw;
    font-weight: 500;
    color: #fff;
  `,
};