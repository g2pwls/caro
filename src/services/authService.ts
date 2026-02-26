import axios from 'axios';

import type {
  LoginRequest,
  LoginResponseData,
  SignUpRequest,
  SignUpResponseData,
  ReissueRequest,
  ReissueResponseData,
} from '@/types/auth';
import type { ApiEnvelope } from '@/services/apiResponse';
import { getApiData } from '@/services/apiResponse';
import { requireApiBaseUrl } from '@/utils/api';

type EmailExistsResponse = {
  exists: boolean;
};

export async function loginWithEmail(
  payload: LoginRequest,
): Promise<LoginResponseData> {
  const baseUrl = requireApiBaseUrl();

  const response = await axios.post<ApiEnvelope<LoginResponseData>>(
    `${baseUrl}/api/v1/auth/login`,
    payload,
  );

  return getApiData(response);
}

export async function signUpWithEmail(
  payload: SignUpRequest,
): Promise<SignUpResponseData> {
  const baseUrl = requireApiBaseUrl();

  const response = await axios.post<ApiEnvelope<SignUpResponseData>>(
    `${baseUrl}/api/v1/auth/sign-up`,
    payload,
  );

  return getApiData(response);
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const baseUrl = requireApiBaseUrl();

  const response = await axios.get<ApiEnvelope<EmailExistsResponse>>(
    `${baseUrl}/api/v1/auth/email/exists`,
    {
      params: { email },
    },
  );

  return getApiData(response)?.exists ?? false;
}

export async function reissueToken(
  payload: ReissueRequest,
): Promise<ReissueResponseData> {
  const baseUrl = requireApiBaseUrl();

  const response = await axios.post<ApiEnvelope<ReissueResponseData>>(
    `${baseUrl}/api/v1/auth/reissue`,
    payload,
  );

  return getApiData(response);
}

export async function logout(params: { accessToken: string }): Promise<void> {
  const baseUrl = requireApiBaseUrl();
  if (!params.accessToken) {
    throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
  }

  // logout은 apiClient를 사용하지 않음 (순환 참조 방지 + 토큰 만료 시에도 호출 필요)
  await axios.post<ApiEnvelope<unknown>>(
    `${baseUrl}/api/v1/auth/logout`,
    null,
    {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    },
  );
}
