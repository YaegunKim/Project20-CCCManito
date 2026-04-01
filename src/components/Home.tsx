import CCCLogo from "../Assest/CCCLogo1.png";
import { S } from "./Home.style";
import FindManito from "./FindManito";
import AboutManito from "./AboutManito";
import TodayManito from "./TodayManito";

export default function Home() {

  return (
    <S.Page>
        <S.Content>
        {/* 스티커 노트 우상단 */}
        <S.StickerNote top={64} right={-16} rotate={12} size={80} bg="#e8f5a1">
          <S.StickerTape />
          <S.StickerText>행복한{"\n"}마니또!😊</S.StickerText>
        </S.StickerNote>

        {/* 스티커 노트 좌중단 */}
        <S.StickerNote top={192} left={-24} rotate={-12} size={64} bg="#d1f5b0" delay="1.5s">
          <S.StickerTape />
            <S.heartIcon aria-hidden focusable="false" />
        </S.StickerNote>

        
            <S.LogoContainer>
                <S.logoImg src={CCCLogo} alt="CCC Logo" />
            </S.LogoContainer>
            <S.TitleContainer>
                <S.title>
                <S.heartIcon aria-hidden focusable="false" />
                시CC 마니또
                <S.heartIcon aria-hidden focusable="false" />
                </S.title>
                <S.subtitle>
                    서로를 아껴주고, 기도하며 연합해요.
                </S.subtitle>
                <S.description>
                    이번 달, 누가 나의 마니또일까요?{`\n`}설레는 마음으로 확인해보세요!🌱
                </S.description>
            </S.TitleContainer>
            <FindManito/>
            <S.ContentContainer>
                <AboutManito/>
                <TodayManito/>
            </S.ContentContainer>
        </S.Content>
        <S.Footer>
          <S.FooterText>@2026 CCC 마니또. Life Transforming Communitas</S.FooterText>
        </S.Footer>
    </S.Page>
  );
}