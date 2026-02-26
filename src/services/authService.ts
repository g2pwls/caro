import axios from 'axios';

import type { ApiResponse } from '@/types/vehicle';
import type {
  LoginRequest,
  LoginResponseData,
  SignUpRequest,
  SignUpResponseData,
  ReissueRequest,
  ReissueResponseData,
} from '@/types/auth';
import { requireApiBaseUrl } from '@/utils/api';

type EmailExistsResponse = {
  exists: boolean;
};

export async function loginWithEmail(
  payload: LoginRequest,
): Promise<LoginResponseData> {
  const baseUrl = requireApiBaseUrl();

  const { data } = await axios.post<ApiResponse<LoginResponseData>>(
    `${baseUrl}/api/v1/auth/login`,
    payload,
  );

  return data.data;
}

export async function signUpWithEmail(
  payload: SignUpRequest,
): Promise<SignUpResponseData> {
  const baseUrl = requireApiBaseUrl();

  const { data } = await axios.post<ApiResponse<SignUpResponseData>>(
    `${baseUrl}/api/v1/auth/sign-up`,
    payload,
  );

  return data.data;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const baseUrl = requireApiBaseUrl();

  const { data } = await axios.get<ApiResponse<EmailExistsResponse>>(
    `${baseUrl}/api/v1/auth/email/exists`,
    {
      params: { email },
    },
  );

  return data.data?.exists ?? false;
}

export async function reissueToken(
  payload: ReissueRequest,
): Promise<ReissueResponseData> {
  const baseUrl = requireApiBaseUrl();

  const { data } = await axios.post<ApiResponse<ReissueResponseData>>(
    `${baseUrl}/api/v1/auth/reissue`,
    payload,
  );

  return data.data;
}

export async function logout(params: { accessToken: string }): Promise<void> {
  const baseUrl = requireApiBaseUrl();
  if (!params.accessToken) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }

  // logout은 apiClient를 사용하지 않음 (순환 참조 방지 + 토큰 만료 시에도 호출 필요)
  await axios.post<ApiResponse<unknown>>(
    `${baseUrl}/api/v1/auth/logout`,
    null,
    {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    },
  );
}
