import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import membersData from "../Assest/rosterData.json";
import resultData from "../Assest/manito_result_2026-04-01.json";
import { Member } from "../utils/matchUtils";
import { S } from "./MatchResult.style";
import CCCLogo from "../Assest/CCCLogo1.png";

interface ResultEntry {
  giverId: number;
  giverName: string;
  receiverId: number;
  receiverName: string;
  receiverPhone: string;
  receiverMajor: string;
  receiverBirthDate: string;
}

const members = membersData as Member[];
const results = resultData as ResultEntry[];

// ── 컨페티 ───────────────────────────────────────────────

const ConfettiCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const colors = ["#7e22ce", "#4ade80", "#f472b6", "#fbbf24", "#60a5fa"];
    const pieces: HTMLDivElement[] = [];

    for (let i = 0; i < 60; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        opacity: 0;
        left: ${Math.random() * 100}%;
        width: ${Math.random() * 6 + 4}px;
        height: ${Math.random() * 10 + 8}px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-name: confetti-fall;
        animation-delay: ${Math.random() * 3}s;
        animation-duration: ${Math.random() * 2 + 2}s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        ${Math.random() > 0.6 ? "border-radius: 50%;" : ""}
      `;
      container.appendChild(el);
      pieces.push(el);
    }
    return () => {
      pieces.forEach((p) => { if (container.contains(p)) container.removeChild(p); });
    };
  }, []);

  return <S.ConfettiWrap ref={containerRef} />;
};

// ── 아이콘 ───────────────────────────────────────────────

const HeartIcon = ({ color = "currentColor", size = 16 }: { color?: string; size?: number }) => (
  <svg style={{ width: size, height: size, color }} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg style={{ width: 14, height: 14, color: "#5b21b6" }} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg style={{ width: 48, height: 48, color: "#6d28d9", opacity: 0.8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// ── 메인 ─────────────────────────────────────────────────

const INFO_FIELDS = (result: ResultEntry) => [
  { label: "학과", value: result.receiverMajor },
  { label: "전화번호", value: result.receiverPhone },
  { label: "생년월일", value: result.receiverBirthDate },
];

export default function MatchResult() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const memberId = Number(id);
  const member = members.find((m) => m.id === memberId);
  const result = results.find((r) => r.giverId === memberId);


useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800;900&display=swap');
      @keyframes confetti-fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => { if (document.head.contains(style)) document.head.removeChild(style); };
  }, []);

  const handleCopyPhone = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.receiverPhone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── 에러 상태 ──
  if (!member || !result) {
    return (
      <S.ErrorWrapper>
        <S.ErrorBox>
          <S.ErrorEmoji>🔍</S.ErrorEmoji>
          <S.ErrorTitle>마니또 정보를 찾을 수 없어요</S.ErrorTitle>
          <S.ErrorDesc>배정이 완료된 후 다시 확인해주세요.</S.ErrorDesc>
          <S.ErrorButton onClick={() => navigate("/findManito")}>돌아가기</S.ErrorButton>
        </S.ErrorBox>
      </S.ErrorWrapper>
    );
  }

  const firstName = result.receiverName.slice(1);
  const infoFields = INFO_FIELDS(result);

  return (
    <S.Wrapper>
      <S.Phone>
        <ConfettiCanvas />

        {/* 떠다니는 별 */}
        <S.StarIcon as="svg" viewBox="0 0 24 24" fill="currentColor" top={48} left={32} opacity={0.8}>
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </S.StarIcon>
        <S.StarIcon as="svg" viewBox="0 0 24 24" fill="currentColor" top={128} right={40} size={20} opacity={0.6} delay="1s">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </S.StarIcon>
        <S.StarIcon as="svg" viewBox="0 0 24 24" fill="currentColor" top={256} left={24} size={12} opacity={0.9} delay="2s">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </S.StarIcon>

        {/* 스티커 노트 우상단 */}
        <S.StickerNote top={64} right={-16} rotate={12} size={80} bg="#e8f5a1">
          <S.StickerTape />
          <S.StickerText>행복한{"\n"}마니또!😊</S.StickerText>
        </S.StickerNote>

        {/* 스티커 노트 좌중단 */}
        <S.StickerNote top={192} left={-24} rotate={-12} size={64} bg="#d1f5b0" delay="1.5s">
          <S.StickerTape />
          <HeartIcon color="#16a34a" />
        </S.StickerNote>

        {/* 스크롤 영역 */}
        <S.ScrollArea>

            <S.LogoContainer>
                <S.logoImg src={CCCLogo} alt="CCC Logo" />
            </S.LogoContainer>


          {/* 헤더 */}
          <S.Header>
            <S.MatchBadge>
              <CheckCircleIcon />
              <S.MatchBadgeText>매칭 완료</S.MatchBadgeText>
            </S.MatchBadge>
            <S.Title>
              {member.name}님의 마니또를<br />찾았습니다! 🎉
            </S.Title>
            <S.SubTitle>설레는 마음으로 확인해보세요 🌱</S.SubTitle>
          </S.Header>

          {/* 카드 */}
          <S.Card>
            <S.CardBadge>
              <HeartIcon color="#f9a8d4" />
              나의 마니또
            </S.CardBadge>

            <S.AvatarWrap>
              <S.Avatar>
                <UserIcon />
                <S.AvatarBadge>
                  <HeartIcon color="#ec4899" />
                </S.AvatarBadge>
              </S.Avatar>
            </S.AvatarWrap>

            <S.ManitoName>{result.receiverName}</S.ManitoName>
            <S.NameUnderline />

            <S.CardDesc>
              이번 한 달 동안 <strong style={{ color: "#5b21b6", fontWeight: 700 }}>{firstName}</strong>님을 위해<br />
              따뜻한 기도와 사랑을 전해주세요! 💌
            </S.CardDesc>

            <S.InfoTable>
              {infoFields.map(({ label, value }, i) => (
                <S.InfoRow key={label} last={i === infoFields.length - 1}>
                  <S.InfoLabel>{label}</S.InfoLabel>
                  <S.InfoValue>{value}</S.InfoValue>
                </S.InfoRow>
              ))}
            </S.InfoTable>

            <S.ButtonGroup>
              <S.PrimaryButton onClick={handleCopyPhone}>
                📋 {copied ? "복사됐어요! ✓" : "전화번호 복사하기"}
              </S.PrimaryButton>
              <S.SecondaryButton onClick={() => navigate("/")}>
                홈으로 돌아가기
              </S.SecondaryButton>
            </S.ButtonGroup>
          </S.Card>

          {/* 하단 문구 */}
          <S.FooterMsg>
            <S.FooterMsgText>사랑으로 연결된 우리 CCC 💜</S.FooterMsgText>
          </S.FooterMsg>

        </S.ScrollArea>


      </S.Phone>
    <S.Footer>
        <S.FooterText>@2026 CCC 마니또. Life Transforming Communitas</S.FooterText>
    </S.Footer>

    </S.Wrapper>
  );
}