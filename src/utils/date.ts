const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const;

export function formatDateOnly(isoDate: string): string {
  return isoDate.slice(0, 10);
}

export function formatTimeHHMM(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function formatDateWithDay(isoDateTime: string): string {
  const d = new Date(isoDateTime);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dayName = DAY_NAMES[d.getDay()];
  return `${y}. ${m}. ${day} (${dayName})`;
}

export function formatDateKoreanWithUntil(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일까지`;
}

export function formatDateDotSeparated(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year} . ${month} . ${day}`;
}
