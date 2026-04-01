import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "./FindManito.style";
import membersData from "../Assest/rosterData.json";
import { Member } from "../utils/matchUtils";

const members = membersData as Member[];

// ── 유효성 검사 유틸 ──────────────────────────────────────

/** 전화번호: 숫자만 추출해서 11자리인지 확인 */
function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  return digits.length === 11 ? digits : null;
}

/** 생년월일: 숫자만 추출해서 8자리인지 확인 (YYYYMMDD) */
function normalizeBirthDate(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  return digits.length === 8 ? digits : null;
}

/**
 * 학번: 10자리 숫자, 앞 4자리가 "20" + 입력한 2자리 학번과 일치
 * ex) 입력 학번 "23" → 앞 4자리가 "2023"이어야 함
 * 단, members의 studentId는 "23"처럼 2자리로 저장되어 있으므로
 * 입력값 앞 4자리에서 뒤 2자리를 추출해 비교
 */
function normalizeStudentId(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length !== 10) return null;
  const yearPrefix = digits.slice(0, 4); // ex) "2023"
  if (!yearPrefix.startsWith("20")) return null;
  return yearPrefix.slice(2); // ex) "23" → members의 studentId 형식
}

// ── 컴포넌트 ─────────────────────────────────────────────

export default function FindManito() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFind = () => {
    setError(null);

    // 유효성 검사
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) {
      setError("전화번호를 올바르게 입력해주세요. (예: 010-1234-5678)");
      return;
    }

    const normalizedBirth = normalizeBirthDate(birthDate);
    if (!normalizedBirth) {
      setError("생년월일을 올바르게 입력해주세요. (예: 19991231 또는 1999.12.31)");
      return;
    }

    const normalizedStudentId = normalizeStudentId(studentId);
    if (!normalizedStudentId) {
      setError("학번을 올바르게 입력해주세요. (예: 2023123456)");
      return;
    }

    // members에서 본인 찾기
    const matched = members.find((m) => {
      const memberPhone = m.phone.replace(/\D/g, "");
      const memberBirth = m.birthDate.replace(/\D/g, "");
      return (
        memberPhone === normalizedPhone &&
        memberBirth === normalizedBirth &&
        m.studentId === normalizedStudentId
      );
    });

    if (!matched) {
      setError("일치하는 회원 정보를 찾을 수 없어요. 다시 확인해주세요.");
      return;
    }

    navigate(`/matchResult/${matched.id}`);
  };

  return (
    <S.Container>
      <S.Content>
        <S.IconContainer>
          <S.searchIcon aria-hidden focusable="false" />
        </S.IconContainer>
        <S.title>
          내 마니또 찾기
          <S.heartIcon aria-hidden focusable="false" />
        </S.title>
        <S.description>
          나의 전화번호와 생년월일을 입력하고 {`\n`} 이번 달 나의 마니또를 확인해보세요!
        </S.description>
        <S.InputContainer>
          <S.Input
            type="text"
            placeholder="전화번호(01012345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <S.Input
            type="text"
            placeholder="생년월일(19991231)"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <S.Input
            type="text"
            placeholder="학번(2023123456)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          {error && <S.ErrorText>{error}</S.ErrorText>}
          <S.Button onClick={handleFind}>내 마니또 확인하기</S.Button>
        </S.InputContainer>
      </S.Content>
    </S.Container>
  );
}