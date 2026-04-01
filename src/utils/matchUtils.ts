export interface Member {
    id: number;
    name: string;
    role: "순장" | "순원";
    gender: "형제" | "자매";
    studentId: string;
    major: string;
    phone: string;
    birthDate: string;
  }
  
  export interface MatchResult {
    giver: Member;
    receiver: Member;
  }
  
  export interface MatchOptions {
    sameGender: boolean;    // 같은 성별끼리
    순원ToSunJang: boolean; // 순원은 순장만 뽑기
    noMutual: boolean;      // 서로는 뽑지 않기
  }
  
  // ── 풀 분류 ──────────────────────────────────────────────
  
  export interface GroupedPool {
    maleSJ: Member[];   // 형제 순장
    maleSW: Member[];   // 형제 순원
    femaleSJ: Member[]; // 자매 순장
    femaleSW: Member[]; // 자매 순원
  }
  
  export function groupPool(pool: Member[]): GroupedPool {
    return {
      maleSJ:   pool.filter((m) => m.gender === "형제" && m.role === "순장"),
      maleSW:   pool.filter((m) => m.gender === "형제" && m.role === "순원"),
      femaleSJ: pool.filter((m) => m.gender === "자매" && m.role === "순장"),
      femaleSW: pool.filter((m) => m.gender === "자매" && m.role === "순원"),
    };
  }
  
  // ── 유틸 ─────────────────────────────────────────────────
  
  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  // ── 순원 → 순장 배정 ──────────────────────────────────────
  
  /**
   * 순원들을 순장에게 1:1 배정 (순원 수 ≤ 순장 수 가정)
   * sameGender ON  → 형제순원→형제순장 / 자매순원→자매순장
   * sameGender OFF → 전체 순원 → 전체 순장 (성별 무관)
   *
   * @returns giverId → receiverId Map, 실패 시 null
   */
  export function SWtoSJ(
    groups: GroupedPool,
    options: Pick<MatchOptions, "sameGender" | "noMutual">
  ): Map<number, number> | null {
    const result = new Map<number, number>();
  
    if (options.sameGender) {
      // 형제 순원 → 형제 순장
      const maleMap = matchSWtoSJ(groups.maleSW, groups.maleSJ, options.noMutual, result);
      if (!maleMap) return null;
      maleMap.forEach((v, k) => result.set(k, v));
  
      // 자매 순원 → 자매 순장
      const femaleMap = matchSWtoSJ(groups.femaleSW, groups.femaleSJ, options.noMutual, result);
      if (!femaleMap) return null;
      femaleMap.forEach((v, k) => result.set(k, v));
    } else {
      // 전체 순원 → 전체 순장 (성별 무관)
      const allSW = [...groups.maleSW, ...groups.femaleSW];
      const allSJ = [...groups.maleSJ, ...groups.femaleSJ];
      const map = matchSWtoSJ(allSW, allSJ, options.noMutual, result);
      if (!map) return null;
      map.forEach((v, k) => result.set(k, v));
    }
  
    return result;
  }
  
  /**
   * SW 리스트를 SJ 리스트에 백트래킹으로 1:1 배정
   * usedReceivers: 이미 다른 곳에서 배정된 receiver id set
   */
  function matchSWtoSJ(
    swList: Member[],
    sjList: Member[],
    noMutual: boolean,
    existingAssignment: Map<number, number>
  ): Map<number, number> | null {
    if (swList.length === 0) return new Map();
    if (swList.length > sjList.length) return null; // 순장 부족
  
    const givers = shuffle(swList);
    const assignment = new Map<number, number>();
    const usedReceiverIds = new Set<number>();
  
    const candidateQueues = givers.map(() => shuffle(sjList));
    const candidateIndex = new Array(givers.length).fill(0);
  
    let i = 0;
    while (i < givers.length) {
      const giver = givers[i];
      let found = false;
  
      while (candidateIndex[i] < candidateQueues[i].length) {
        const receiver = candidateQueues[i][candidateIndex[i]];
        candidateIndex[i]++;
  
        if (usedReceiverIds.has(receiver.id)) continue;
        if (giver.id === receiver.id) continue;
  
        // noMutual: receiver가 이미 giver를 뽑고 있으면 안 됨
        if (noMutual) {
          const receiverTarget = existingAssignment.get(receiver.id) ?? assignment.get(receiver.id);
          if (receiverTarget === giver.id) continue;
        }
  
        assignment.set(giver.id, receiver.id);
        usedReceiverIds.add(receiver.id);
        found = true;
        break;
      }
  
      if (found) {
        i++;
      } else {
        if (i === 0) return null;
        candidateIndex[i] = 0;
        candidateQueues[i] = shuffle(sjList);
        i--;
        const prevReceiverId = assignment.get(givers[i].id)!;
        assignment.delete(givers[i].id);
        usedReceiverIds.delete(prevReceiverId);
      }
    }
  
    return assignment;
  }
  
  // ── 나머지 전체 배정 (백트래킹) ───────────────────────────
  
  /**
   * SWtoSJ 결과를 제외한 나머지 멤버들을 배정
   * 이미 receiver로 배정된 id도 제외
   */
  export function assignRemainder(
    pool: Member[],
    existing: Map<number, number>, // SWtoSJ 결과
    options: Pick<MatchOptions, "sameGender" | "noMutual">
  ): Map<number, number> | null {
    // 아직 giver로 배정 안 된 멤버
    const remainGivers = pool.filter((m) => !existing.has(m.id));
    // 아직 receiver로 사용 안 된 멤버
    const usedReceiverIds = new Set(existing.values());
    const remainReceivers = pool.filter((m) => !usedReceiverIds.has(m.id));
  
    if (remainGivers.length === 0) return new Map();
  
    const givers = shuffle(remainGivers);
    const assignment = new Map<number, number>();
    const assignedReceiverIds = new Set<number>();
  
    const candidateQueues = givers.map(() => shuffle(remainReceivers));
    const candidateIndex = new Array(givers.length).fill(0);
  
    let i = 0;
    while (i < givers.length) {
      const giver = givers[i];
      let found = false;
  
      while (candidateIndex[i] < candidateQueues[i].length) {
        const receiver = candidateQueues[i][candidateIndex[i]];
        candidateIndex[i]++;
  
        if (assignedReceiverIds.has(receiver.id)) continue;
        if (giver.id === receiver.id) continue;
        if (options.sameGender && giver.gender !== receiver.gender) continue;
  
        // noMutual: receiver가 giver를 뽑고 있으면 안 됨
        if (options.noMutual) {
          const receiverTarget = existing.get(receiver.id) ?? assignment.get(receiver.id);
          if (receiverTarget === giver.id) continue;
        }
  
        assignment.set(giver.id, receiver.id);
        assignedReceiverIds.add(receiver.id);
        found = true;
        break;
      }
  
      if (found) {
        i++;
      } else {
        if (i === 0) return null;
        candidateIndex[i] = 0;
        candidateQueues[i] = shuffle(remainReceivers);
        i--;
        const prevReceiverId = assignment.get(givers[i].id)!;
        assignment.delete(givers[i].id);
        assignedReceiverIds.delete(prevReceiverId);
      }
    }
  
    return assignment;
  }
  
  // ── 메인 진입점 ───────────────────────────────────────────
  
  /**
   * 최종 배정 함수
   * @returns MatchResult[] 또는 null (배정 불가)
   */
  export function assignManito(
    pool: Member[],
    options: MatchOptions
  ): MatchResult[] | null {
    const groups = groupPool(pool);
    const memberById = new Map(pool.map((m) => [m.id, m]));
  
    let finalAssignment = new Map<number, number>();
  
    if (options.순원ToSunJang) {
      // 1단계: 순원 → 순장 배정
      const swMap = SWtoSJ(groups, options);
      if (!swMap) return null;
      swMap.forEach((v, k) => finalAssignment.set(k, v));
  
      // 2단계: 나머지 배정
      const remainMap = assignRemainder(pool, finalAssignment, options);
      if (!remainMap) return null;
      remainMap.forEach((v, k) => finalAssignment.set(k, v));
    } else {
      // 순원ToSunJang OFF: 전체 백트래킹
      const remainMap = assignRemainder(pool, new Map(), options);
      if (!remainMap) return null;
      finalAssignment = remainMap;
    }
  
    // Map → MatchResult[]
    return pool.map((giver) => ({
      giver,
      receiver: memberById.get(finalAssignment.get(giver.id)!)!,
    }));
  }
  
  // ── 다운로드 ──────────────────────────────────────────────
  
  export function downloadResultJson(results: MatchResult[]) {
    const output = results.map(({ giver, receiver }) => ({
      giverId: giver.id,
      giverName: giver.name,
      receiverId: receiver.id,
      receiverName: receiver.name,
      receiverPhone: receiver.phone,
      receiverMajor: receiver.major,
      receiverBirthDate: receiver.birthDate,
    }));
  
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manito_result_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }