import { useState } from "react";
import { S } from "./TodayManito.style";
import membersData from "../Assest/rosterData.json";
import { Member } from "../utils/matchUtils";

const members = membersData as Member[];

const pickRandom = () => members[Math.floor(Math.random() * members.length)];

export default function TodayManito() {
  const [picked, setPicked] = useState<Member>(pickRandom);

  return (
    <S.Container>
      <S.Content>
        <S.title>오늘의 마니또</S.title>
        <S.name>{picked.name} {picked.role}
            <S.description>{picked.major} {picked.studentId}</S.description>
        </S.name>
        <S.Button onClick={() => setPicked(pickRandom())}>
          🎲 다시 뽑기
        </S.Button>
      </S.Content>
      <S.Footer>
        <S.FooterText>사랑으로 연결된 우리 CCC💚</S.FooterText>
      </S.Footer>
    </S.Container>
  );
}