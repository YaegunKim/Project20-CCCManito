import styled from "@emotion/styled";
import BackgroundImg from "../Assest/ChatGPT_Image_bg02.png";
import { ReactComponent as HeartSvg } from "../Assest/heart.svg";

const PURPLE = "#6e2ef2";
const GREEN = "#5e9f42";
const WHITE = "#fefefb";

export const S = {
  /* ── 레이아웃 ── */
  Page: styled.div`
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    background-image: url(${BackgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 16px 80px;
    box-sizing: border-box;
    gap: 24px;
  `,

  /* ── 로고 ── */
  LogoImg: styled.img`
    width: 120px;
  `,

  /* ── 카드 공통 ── */
  Card: styled.div`
    width: 100%;
    max-width: 640px;
    background: ${WHITE};
    border-radius: 16px;
    border: 0.5px solid rgb(202, 202, 202);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 24px;
    box-sizing: border-box;
  `,

  CardTitle: styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: ${PURPLE};
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  /* ── 조건 토글 ── */
  OptionRow: styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: #333;
    &:last-child { border-bottom: none; }
  `,

  Toggle: styled.input`
    appearance: none;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    background: #ddd;
    position: relative;
    cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;

    &::after {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      top: 3px;
      left: 3px;
      transition: left 0.2s;
    }

    &:checked {
      background: ${PURPLE};
    }
    &:checked::after {
      left: 23px;
    }
  `,

  /* ── 멤버 풀 그리드 ── */
  MemberGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
  `,

  MemberChip: styled.button<{ excluded: boolean; gender: string }>`
    padding: 8px 4px;
    border-radius: 10px;
    border: 1.5px solid ${(p) => (p.excluded ? "#ddd" : p.gender === "형제" ? PURPLE : GREEN)};
    background: ${(p) => (p.excluded ? "#f5f5f5" : p.gender === "형제" ? `${PURPLE}18` : `${GREEN}18`)};
    color: ${(p) => (p.excluded ? "#bbb" : p.gender === "형제" ? PURPLE : GREEN)};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: ${(p) => (p.excluded ? "line-through" : "none")};
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    &:hover {
      opacity: 0.75;
    }
  `,

  ChipRole: styled.span`
    font-size: 10px;
    font-weight: 400;
    opacity: 0.8;
  `,

  /* ── 배정 버튼 ── */
  AssignButton: styled.button`
    width: 100%;
    max-width: 640px;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: ${PURPLE};
    color: #fff;
    font-size: 18px;
    font-weight: 800;
    cursor: pointer;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 16px rgba(110, 46, 242, 0.35);
    transition: transform 0.1s, box-shadow 0.1s;

    &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(110, 46, 242, 0.45); }
    &:active { transform: translateY(0); }
    &:disabled { background: #ccc; box-shadow: none; cursor: not-allowed; }
  `,

  /* ── 결과 ── */
  ResultItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    &:last-child { border-bottom: none; }
  `,

  ResultGiver: styled.span`
    font-weight: 700;
    color: #333;
    min-width: 72px;
  `,

  Arrow: styled.span`
    color: ${PURPLE};
    font-size: 18px;
    margin: 0 8px;
  `,

  ResultReceiver: styled.span`
    font-weight: 600;
    color: ${GREEN};
    flex: 1;
  `,

  ResultMeta: styled.span`
    font-size: 12px;
    color: #999;
    text-align: right;
  `,

  DownloadButton: styled.button`
    margin-top: 16px;
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 2px solid ${GREEN};
    background: transparent;
    color: ${GREEN};
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;

    &:hover { background: ${GREEN}; color: #fff; }
  `,

  ErrorText: styled.p`
    color: #e53e3e;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin: 0;
  `,

  /* ── 푸터 ── */
  Footer: styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${PURPLE};
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
  `,

  FooterText: styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #fff;
  `,

  heartIcon: styled(HeartSvg)`
    width: 16px;
    height: 16px;
    color: ${PURPLE};
    vertical-align: middle;
  `,
};