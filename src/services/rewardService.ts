import apiClient from '@/services/apiClient';
import type { ApiEnvelope } from '@/services/apiResponse';
import { getApiData } from '@/services/apiResponse';

// ── 카테고리 ──

export type RewardCategory = {
  category: string;
  categoryLabel: string;
};

type RewardCategoriesResponse = ApiEnvelope<RewardCategory[]>;

/**
 * 리워드 카테고리 목록 조회
 * GET /api/v1/rewards/categories
 */
export async function fetchRewardCategories(): Promise<RewardCategory[]> {
  const response = await apiClient.get<RewardCategoriesResponse>(
    '/api/v1/rewards/categories',
  );
  return getApiData(response);
}

// ── 쿠폰 목록 ──

export type RewardCoupon = {
  id: number;
  brandName: string;
  itemName: string;
  category: string;
  categoryLabel: string;
  requiredPoints: number;
  imageUrl: string;
  redeemCount: number;
};

type RewardCouponsData = {
  rewardCoupons: RewardCoupon[];
  nextCursor: number | null;
  hasNext: boolean;
};

type RewardCouponsResponse = ApiEnvelope<RewardCouponsData>;

export type FetchRewardCouponsParams = {
  category?: string;
  sort?: string;
  cursor?: number;
  size?: number;
};

/**
 * 리워드 쿠폰 목록 조회
 * GET /api/v1/rewards/coupons
 */
export async function fetchRewardCoupons(
  params: FetchRewardCouponsParams = {},
): Promise<RewardCouponsData> {
  const response = await apiClient.get<RewardCouponsResponse>(
    '/api/v1/rewards/coupons',
    { params },
  );
  return getApiData(response);
}

// ── 보유 포인트 조회 ──

export type MemberPoints = {
  totalAttendancePoints: number;
  totalDrivingPoints: number;
  totalUsedPoints: number;
  availablePoints: number;
};

type MemberPointsResponse = ApiEnvelope<MemberPoints>;

/**
 * 보유 포인트 조회
 * GET /api/v1/members/points
 */
export async function fetchMemberPoints(): Promise<MemberPoints> {
  const response = await apiClient.get<MemberPointsResponse>(
    '/api/v1/members/points',
  );
  return getApiData(response);
}

// ── 미수령 운행 포인트 현황 ──

export type PendingPoints = {
  totalPendingPoints: number;
};

type PendingPointsResponse = ApiEnvelope<PendingPoints>;

/**
 * 미수령 운행 포인트 현황 조회
 * GET /api/v1/members/points/pending
 */
export async function fetchPendingPoints(): Promise<PendingPoints> {
  const response = await apiClient.get<PendingPointsResponse>(
    '/api/v1/members/points/pending',
  );
  return getApiData(response);
}

// ── 운행 포인트 수령 ──

export type ClaimPointsResult = {
  claimedPoints: number;
  remainingPendingCount: number;
};

type ClaimPointsResponse = ApiEnvelope<ClaimPointsResult>;

/**
 * 운행 포인트 수령
 * POST /api/v1/members/points/claim
 */
export async function claimPoints(): Promise<ClaimPointsResult> {
  const response = await apiClient.post<ClaimPointsResponse>(
    '/api/v1/members/points/claim',
  );
  return getApiData(response);
}

// ── 예상 적립 포인트 계산 ──

export type PointEstimate = {
  distanceKm: number;
  estimatedPoints: number;
};

type PointEstimateResponse = ApiEnvelope<PointEstimate>;

/**
 * 예상 적립 포인트 계산
 * GET /api/v1/members/points/estimate?distanceKm=...
 */
export async function fetchPointEstimate(distanceKm: number): Promise<PointEstimate> {
  const response = await apiClient.get<PointEstimateResponse>(
    '/api/v1/members/points/estimate',
    { params: { distanceKm } },
  );
  return getApiData(response);
}

// ── 포인트 이력 ──

export type DrivingDetail = {
  drivingRecordId: number;
  startDateTime: string;
  endDateTime: string;
  distanceKm: number;
  carBrandName: string;
  carModelName: string;
  carVariant: string;
};

export type PointHistory = {
  type: 'DRIVING' | 'ATTENDANCE' | 'COUPON_EXCHANGE';
  description: string;
  pointChange: number;
  date: string;
  drivingDetail?: DrivingDetail | null;
};

type PointHistoryData = {
  totalCount: number;
  histories: PointHistory[];
};

type PointHistoryResponse = ApiEnvelope<PointHistoryData>;

/**
 * 포인트 이력 조회
 * GET /api/v1/members/points/history
 */
export async function fetchPointHistory(): Promise<PointHistoryData> {
  const response = await apiClient.get<PointHistoryResponse>(
    '/api/v1/members/points/history',
  );
  return getApiData(response);
}

// ── 보유 쿠폰 ──

export type MemberCoupon = {
  id: number;
  brandName: string;
  itemName: string;
  expiredAt: string;
  usedPoints: number;
};

type MemberCouponsData = {
  totalCount: number;
  coupons: MemberCoupon[];
};

type MemberCouponsResponse = ApiEnvelope<MemberCouponsData>;

/**
 * 보유 쿠폰 목록 조회
 * GET /api/v1/members/coupons
 */
export async function fetchMemberCoupons(): Promise<MemberCouponsData> {
  const response = await apiClient.get<MemberCouponsResponse>(
    '/api/v1/members/coupons',
  );
  return getApiData(response);
}

// ── 쿠폰 교환 ──

type ExchangeCouponResponse = ApiEnvelope<{
  id: number;
}>;

/**
 * 쿠폰 교환
 * POST /api/v1/members/coupons
 */
export async function exchangeCoupon(rewardCouponId: number): Promise<{ id: number }> {
  const response = await apiClient.post<ExchangeCouponResponse>(
    '/api/v1/members/coupons',
    { rewardCouponId },
  );
  return getApiData(response);
}

// ── 보유 쿠폰 상세 ──

export type MemberCouponDetail = {
  brandName: string;
  itemName: string;
  barcodeNumber: string;
  expiredAt: string;
  exchangedAt: string;
  imageUrl: string;
};

// ── 출석 현황 조회 ──

export type AttendanceRecord = {
  dayOrder: number;
  attendanceDate: string;
  points: number;
};

export type AttendanceStatus = {
  currentStreak: number;
  isAttendedToday: boolean;
  attendanceRecords: AttendanceRecord[];
};

type AttendanceStatusResponse = ApiEnvelope<AttendanceStatus>;

/**
 * 출석 현황 조회
 * GET /api/v1/members/attendances/status
 */
export async function fetchAttendanceStatus(): Promise<AttendanceStatus> {
  const response = await apiClient.get<AttendanceStatusResponse>(
    '/api/v1/members/attendances/status',
  );
  return getApiData(response);
}

// ── 출석 체크 ──

export type AttendanceResult = {
  id: number;
  streak: number;
  points: number;
};

type AttendanceResponse = ApiEnvelope<AttendanceResult>;

/**
 * 출석 체크
 * POST /api/v1/members/attendances
 */
export async function checkAttendance(): Promise<AttendanceResult> {
  const response = await apiClient.post<AttendanceResponse>(
    '/api/v1/members/attendances',
  );
  return getApiData(response);
}

// ── 보유 쿠폰 상세 ──

type MemberCouponDetailResponse = ApiEnvelope<MemberCouponDetail>;

/**
 * 보유 쿠폰 상세 조회
 * GET /api/v1/members/coupons/{member-coupon-id}
 */
export async function fetchMemberCouponDetail(
  memberCouponId: number,
): Promise<MemberCouponDetail> {
  const response = await apiClient.get<MemberCouponDetailResponse>(
    `/api/v1/members/coupons/${memberCouponId}`,
  );
  return getApiData(response);
}
