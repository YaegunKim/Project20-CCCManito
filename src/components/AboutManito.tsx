import { S } from "./AboutManito.style";
import giftBox from "../Assest/purple_gift_box.png";

export default function AboutManito() {
    return (
        <S.Container>
            <S.Content>
                <S.giftBox src={giftBox} alt="giftBox" />
                <S.title>
                마니또란?
                </S.title>
                <S.description>
                매달 한 사람을 정해 서로를 위해 아끼고 기도하는 활동이에요.
                </S.description>
            </S.Content>
            <S.Footer>
                <S.FooterText>
                    사랑으로 연결된 우리 CCC💜
                </S.FooterText>
            </S.Footer>
        </S.Container>
    );
}