import { useCallback, useEffect, useState } from 'react';
import { fetchMemberPoints, type MemberPoints } from '@/services/rewardService';

interface UseMemberPointsParams {
  accessToken: string | null;
  enabled?: boolean;
}

export function useMemberPoints({ accessToken, enabled = true }: UseMemberPointsParams) {
  const [memberPoints, setMemberPoints] = useState<MemberPoints | null>(null);

  const reload = useCallback(async () => {
    if (!accessToken) return null;
    try {
      const data = await fetchMemberPoints();
      setMemberPoints(data);
      return data;
    } catch (err) {
      console.warn('포인트 조회 실패:', err);
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    if (!enabled || !accessToken) return;
    void reload();
  }, [accessToken, enabled, reload]);

  return {
    memberPoints,
    availablePoints: memberPoints?.availablePoints ?? 0,
    reload,
  };
}
