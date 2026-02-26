export type ApiEnvelope<T> = {
  code: string;
  message: string;
  data: T;
};

export function getApiData<T>(response: { data: ApiEnvelope<T> }): T {
  return response.data.data;
}
