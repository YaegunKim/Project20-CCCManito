import { useState, useMemo } from "react";
import CCCLogo from "../Assest/CCCLogo1.png";
import { S } from "./RandomMatch.style";
import membersData from "../Assest/rosterData.json";
import { Member, MatchResult, MatchOptions, assignManito, downloadResultJson } from "../utils/matchUtils";

const allMembers = membersData as Member[];

export default function RandomMatch() {
  /* ── 조건 상태 ── */
  const [options, setOptions] = useState<MatchOptions>({
    sameGender: true,
    순원ToSunJang: true,
    noMutual: true,
  });

  /* ── 제외 멤버 set ── */
  const [excludedIds, setExcludedIds] = useState<Set<number>>(new Set());

  /* ── 결과 ── */
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* ── 현재 풀 ── */
  const pool = useMemo(
    () => allMembers.filter((m) => !excludedIds.has(m.id)),
    [excludedIds]
  );

  const toggleExclude = (id: number) => {
    setExcludedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleOption = (key: keyof MatchOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAssign = () => {
    setError(null);
    setResults(null);

    if (pool.length < 2) {
      setError("풀에 멤버가 2명 이상 있어야 해요.");
      return;
    }

    const matched = assignManito(pool, options);
    if (!matched) {
      setError(
        "조건을 만족하는 배정을 찾지 못했어요. 조건을 완화하거나 풀을 늘려보세요."
      );
      return;
    }
    setResults(matched);
  };

  /* ── 성별별 그룹 (가나다 정렬) ── */
  const brothers = useMemo(
    () => [...allMembers].filter((m) => m.gender === "형제").sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const sisters = useMemo(
    () => [...allMembers].filter((m) => m.gender === "자매").sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  return (
    <S.Page>
      {/* 로고 */}
      <S.LogoImg src={CCCLogo} alt="CCC Logo" />

      {/* 조건 설정 */}
      <S.Card>
        <S.CardTitle>
          <S.heartIcon aria-hidden focusable="false" />
          배정 조건
        </S.CardTitle>

        <S.OptionRow>
          같은 성별끼리 배정
          <S.Toggle
            type="checkbox"
            checked={options.sameGender}
            onChange={() => toggleOption("sameGender")}
          />
        </S.OptionRow>
        <S.OptionRow>
          순원은 순장만 뽑도록
          <S.Toggle
            type="checkbox"
            checked={options.순원ToSunJang}
            onChange={() => toggleOption("순원ToSunJang")}
          />
        </S.OptionRow>
        <S.OptionRow>
          서로는 뽑지 않도록
          <S.Toggle
            type="checkbox"
            checked={options.noMutual}
            onChange={() => toggleOption("noMutual")}
          />
        </S.OptionRow>
      </S.Card>

      {/* 멤버 풀 — 형제 */}
      <S.Card>
        <S.CardTitle>👨 형제 ({brothers.length - brothers.filter((m) => excludedIds.has(m.id)).length}/{brothers.length})</S.CardTitle>
        <S.MemberGrid>
          {brothers.map((m) => (
            <S.MemberChip
              key={m.id}
              excluded={excludedIds.has(m.id)}
              gender={m.gender}
              onClick={() => toggleExclude(m.id)}
              title={excludedIds.has(m.id) ? "클릭해서 포함" : "클릭해서 제외"}
            >
              {m.name}
              <S.ChipRole>{m.role}</S.ChipRole>
            </S.MemberChip>
          ))}
        </S.MemberGrid>
      </S.Card>

      {/* 멤버 풀 — 자매 */}
      <S.Card>
        <S.CardTitle>👩 자매 ({sisters.length - sisters.filter((m) => excludedIds.has(m.id)).length}/{sisters.length})</S.CardTitle>
        <S.MemberGrid>
          {sisters.map((m) => (
            <S.MemberChip
              key={m.id}
              excluded={excludedIds.has(m.id)}
              gender={m.gender}
              onClick={() => toggleExclude(m.id)}
              title={excludedIds.has(m.id) ? "클릭해서 포함" : "클릭해서 제외"}
            >
              {m.name}
              <S.ChipRole>{m.role}</S.ChipRole>
            </S.MemberChip>
          ))}
        </S.MemberGrid>
      </S.Card>

      {/* 배정 버튼 */}
      <S.AssignButton onClick={handleAssign} disabled={pool.length < 2}>
        🎲 마니또 랜덤 배정하기
      </S.AssignButton>

      {/* 에러 */}
      {error && (
        <S.Card>
          <S.ErrorText>⚠️ {error}</S.ErrorText>
        </S.Card>
      )}

      {/* 결과 */}
      {results && (
        <S.Card>
          <S.CardTitle>
            <S.heartIcon aria-hidden focusable="false" />
            배정 결과 ({results.length}쌍)
          </S.CardTitle>

          {results.map(({ giver, receiver }) => (
            <S.ResultItem key={giver.id}>
              <S.ResultGiver>{giver.name}</S.ResultGiver>
              <S.Arrow>→</S.Arrow>
              <S.ResultReceiver>{receiver.name}</S.ResultReceiver>
              <S.ResultMeta>{receiver.major} · {receiver.phone}</S.ResultMeta>
            </S.ResultItem>
          ))}

          <S.DownloadButton onClick={() => downloadResultJson(results)}>
            📥 JSON 다운로드
          </S.DownloadButton>
        </S.Card>
      )}

      <S.Footer>
        <S.FooterText>@2026 CCC 마니또. Life Transforming Communitas</S.FooterText>
      </S.Footer>
    </S.Page>
  );
}