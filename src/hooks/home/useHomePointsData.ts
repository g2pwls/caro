import { useCallback, useEffect, useState } from 'react';
import {
  checkAttendance,
  claimPoints,
  fetchAttendanceStatus,
  fetchPendingPoints,
  fetchPointHistory,
  type PointHistory,
} from '@/services/rewardService';
import { fetchDashboard } from '@/services/profileService';
import { calculateProgressRatio, syncWidgetData } from '@/hooks/useWidgetSync';

interface UseHomePointsDataParams {
  topToggle: number;
}

export function useHomePointsData({ topToggle }: UseHomePointsDataParams) {
  const [pointHistories, setPointHistories] = useState<PointHistory[]>([]);
  const [attendanceStreak, setAttendanceStreak] = useState(0);
  const [isAttendanceChecked, setIsAttendanceChecked] = useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
  const [attendancePoints, setAttendancePoints] = useState(0);
  const [attendedDays, setAttendedDays] = useState<Set<number>>(new Set());
  const [pendingPoints, setPendingPoints] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimAnimating, setIsClaimAnimating] = useState(false);

  const refreshPointHistory = useCallback(async () => {
    try {
      const data = await fetchPointHistory();
      setPointHistories(data.histories);
    } catch (err) {
      console.warn('포인트 이력 조회 실패:', err);
      setPointHistories([]);
    }
  }, []);

  const refreshAttendanceStatus = useCallback(async () => {
    try {
      const data = await fetchAttendanceStatus();
      setAttendanceStreak(data.currentStreak);
      setIsAttendanceChecked(data.isAttendedToday);
      setAttendedDays(new Set(data.attendanceRecords.map((r) => r.dayOrder)));
    } catch (err) {
      console.warn('출석 현황 조회 실패:', err);
    }
  }, []);

  const refreshPendingPoints = useCallback(async () => {
    try {
      const data = await fetchPendingPoints();
      setPendingPoints(data.totalPendingPoints);
      return data.totalPendingPoints;
    } catch (err) {
      console.warn('미수령 포인트 조회 실패:', err);
      setPendingPoints(0);
      return 0;
    }
  }, []);

  useEffect(() => {
    if (topToggle !== 1) return;
    void refreshPointHistory();
    void refreshAttendanceStatus();
    void refreshPendingPoints();
  }, [topToggle, refreshPointHistory, refreshAttendanceStatus, refreshPendingPoints]);

  const handleClaimPoints = useCallback(async () => {
    if (isClaiming || pendingPoints <= 0) return;
    setIsClaiming(true);
    setIsClaimAnimating(true);
    try {
      await claimPoints();
      const latestPendingPoints = await refreshPendingPoints();
      fetchDashboard()
        .then((dashboard) => {
          syncWidgetData({
            totalDistanceKm: dashboard.totalDistanceKm,
            pendingPoints: latestPendingPoints,
            progressRatio: calculateProgressRatio(dashboard.totalDistanceKm),
          });
        })
        .catch(() => {});
    } catch (err) {
      console.warn('포인트 수령 실패:', err);
    } finally {
      setTimeout(() => {
        setIsClaimAnimating(false);
      }, 1000);
      setIsClaiming(false);
    }
  }, [isClaiming, pendingPoints, refreshPendingPoints]);

  const handleAttendanceCheck = useCallback(async () => {
    if (isAttendanceChecked) return;
    try {
      const result = await checkAttendance();
      setAttendanceStreak(result.streak);
      setAttendancePoints(result.points);
      setIsAttendanceChecked(true);
      setIsAttendanceModalVisible(true);
      await refreshAttendanceStatus();
      await refreshPointHistory();
    } catch (err) {
      console.warn('출석체크 실패:', err);
    }
  }, [isAttendanceChecked, refreshAttendanceStatus, refreshPointHistory]);

  return {
    pointHistories,
    attendanceStreak,
    isAttendanceChecked,
    isAttendanceModalVisible,
    setIsAttendanceModalVisible,
    attendancePoints,
    attendedDays,
    pendingPoints,
    setPendingPoints,
    isClaiming,
    isClaimAnimating,
    handleClaimPoints,
    handleAttendanceCheck,
    refreshPendingPoints,
  };
}
