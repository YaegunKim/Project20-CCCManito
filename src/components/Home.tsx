import CCCLogo from "../Assest/CCCLogo1.png";
import { S } from "./Home.style";
import FindManito from "./FindManito";
import AboutManito from "./AboutManito";

export default function Home() {

  return (
    <S.Page>
        <S.Content>
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
            <S.ContentContainer>
                <FindManito/>
                <AboutManito/>
            </S.ContentContainer>
        </S.Content>
        <S.Footer>
          <S.FooterText>@2026 CCC 마니또. Life Transforming Communitas</S.FooterText>
        </S.Footer>
    </S.Page>
  );
}