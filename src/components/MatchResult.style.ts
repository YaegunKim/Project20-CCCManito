import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import BackgroundImg from "../Assest/ChatGPT_Image_bg02.png";

// ── 애니메이션 ────────────────────────────────────────────

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const floatRotate = keyframes`
  0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  50% { transform: translateY(-15px) rotate(calc(var(--rot, 0deg) + 3deg)); }
`;

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(126, 34, 206, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(126, 34, 206, 0); }
`;

export const confettiFall = keyframes`
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
`;

// ── 레이아웃 ──────────────────────────────────────────────

export const S = {
  Wrapper: styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${BackgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `,

  Phone: styled.div`
    position: relative;
    width: 100%;
    min-height: 812px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  `,

  ConfettiWrap: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 50;
    overflow: hidden;
  `,

  // ── 떠다니는 별 ──

  StarIcon: styled.svg<{ top: number; left?: number; right?: number; size?: number; opacity?: number; delay?: string }>`
    position: absolute;
    top: ${(p) => p.top}px;
    ${(p) => p.left !== undefined ? `left: ${p.left}px;` : ""}
    ${(p) => p.right !== undefined ? `right: ${p.right}px;` : ""}
    width: ${(p) => p.size ?? 16}px;
    height: ${(p) => p.size ?? 16}px;
    color: #fff;
    opacity: ${(p) => p.opacity ?? 0.8};
    animation: ${floatSlow} 4s ease-in-out infinite;
    animation-delay: ${(p) => p.delay ?? "0s"};
  `,

  // ── 스티커 노트 ──

  StickerNote: styled.div<{ top: number; right?: number; left?: number; rotate: number; size: number; bg: string; delay?: string }>`
    position: absolute;
    top: ${(p) => p.top}px;
    ${(p) => p.right !== undefined ? `right: ${p.right}px;` : ""}
    ${(p) => p.left !== undefined ? `left: ${p.left}px;` : ""}
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;
    background: ${(p) => p.bg};
    border-radius: 2px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: rotate(${(p) => p.rotate}deg);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${floatRotate} 6s ease-in-out infinite;
    animation-delay: ${(p) => p.delay ?? "0s"};
  `,

  StickerTape: styled.div`
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 12px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 2px;
  `,

  StickerText: styled.p`
    font-size: 10px;
    color: #166534;
    font-weight: 700;
    text-align: center;
    line-height: 1.4;
    margin: 0;
  `,

  // ── 스크롤 영역 ──

  ScrollArea: styled.div`
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px 120px;
    overflow-y: auto;

    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
  `,

  // ── 로고 ──

  LogoContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-bottom: 50px;
  `,
  logoImg: styled.img`
    width: 50%;
  `,

  // ── 헤더 ──

  Header: styled.div`
    text-align: center;
    margin-bottom: 24px;
    animation: ${popIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
    opacity: 0;
  `,

  MatchBadge: styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 16px;
    background: #ede9fe;
    border-radius: 9999px;
    margin-bottom: 12px;
    border: 1px solid #ddd6fe;
  `,

  MatchBadgeText: styled.span`
    color: #5b21b6;
    font-size: 12px;
    font-weight: 700;
  `,

  Title: styled.h1`
    font-size: 22px;
    font-weight: 900;
    color: #4c1d95;
    margin: 0 0 8px;
    line-height: 1.4;
  `,

  SubTitle: styled.p`
    font-size: 13px;
    color: #15803d;
    font-weight: 500;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.4);
    margin: 0;
  `,

  // ── 카드 ──

  Card: styled.div`
    width: 70vw;
    background: #fff;
    border-radius: 28px;
    padding: 28px 24px;
    border: 1px solid #f3e8ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-shadow: 0 10px 40px -10px rgba(126, 34, 206, 0.15);
    animation: ${popIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
    opacity: 0;
  `,

  CardBadge: styled.div`
    position: absolute;
    top: -14px;
    background: linear-gradient(to right, #5b21b6, #7c3aed);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 6px 20px;
    border-radius: 9999px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  AvatarWrap: styled.div`
    margin-top: 16px;
    margin-bottom: 20px;
  `,

  Avatar: styled.div`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ede9fe, #fce7f3);
    border: 4px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: ${pulseGlow} 2.5s infinite;
  `,

  AvatarBadge: styled.div`
    position: absolute;
    bottom: -4px;
    right: -4px;
    background: #fff;
    padding: 6px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  ManitoName: styled.h2`
    font-size: 26px;
    font-weight: 900;
    color: #1f2937;
    margin-bottom: 4px;
  `,

  NameUnderline: styled.div`
    width: 32px;
    height: 4px;
    background: #4ade80;
    border-radius: 9999px;
    margin-bottom: 12px;
    opacity: 0.6;
  `,

  CardDesc: styled.p`
    color: #6b7280;
    font-size: 13px;
    margin-bottom: 24px;
    text-align: center;
    line-height: 1.7;
  `,

  // ── 정보 테이블 ──

  InfoTable: styled.div`
    width: 100%;
    background: #faf5ff;
    border-radius: 16px;
    padding: 16px 20px;
    margin-bottom: 20px;
  `,

  InfoRow: styled.div<{ last?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: ${(p) => (p.last ? "none" : "1px solid #ede9fe")};
  `,

  InfoLabel: styled.span`
    font-size: 12px;
    color: #7c3aed;
    font-weight: 700;
  `,

  InfoValue: styled.span`
    font-size: 13px;
    color: #374151;
    font-weight: 600;
  `,

  // ── 버튼 ──

  ButtonGroup: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  PrimaryButton: styled.button`
    width: 100%;
    background: #5b21b6;
    color: #fff;
    border: none;
    border-radius: 16px;
    padding: 14px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, transform 0.1s;

    &:hover { background: #4c1d95; }
    &:active { transform: scale(0.98); }
  `,

  SecondaryButton: styled.button`
    width: 100%;
    background: #f9fafb;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 14px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, transform 0.1s;

    &:hover { background: #f3f4f6; }
    &:active { transform: scale(0.98); }
  `,

  // ── 하단 문구 ──

  FooterMsg: styled.div`
    margin-top: 32px;
    text-align: center;
    animation: ${popIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
    opacity: 0;
  `,

  FooterMsgText: styled.p`
    color: #5b21b6;
    font-weight: 700;
    font-size: 13px;
    padding: 8px 20px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.6);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
  `,

  // ── 푸터 ──

  Footer: styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #8040f0;
    padding: 12px;
    z-index: 20;
    display: flex;
    justify-content: center;
  `,

  FooterText: styled.p`
    color: #fff;
    font-size: 10px;
    opacity: 0.9;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin: 0;
  `,

  // ── 에러 ──

  ErrorWrapper: styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #8ad1ff 0%, #ccebff 50%, #eaf7ff 100%);
  `,

  ErrorBox: styled.div`
    text-align: center;
    padding: 40px;
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  `,

  ErrorEmoji: styled.p`
    font-size: 48px;
    margin-bottom: 16px;
  `,

  ErrorTitle: styled.p`
    color: #4c1d95;
    font-weight: 800;
    font-size: 18px;
    margin-bottom: 8px;
  `,

  ErrorDesc: styled.p`
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 24px;
  `,

  ErrorButton: styled.button`
    background: #7e22ce;
    color: #fff;
    border: none;
    border-radius: 14px;
    padding: 12px 28px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    font-family: inherit;
  `,
};