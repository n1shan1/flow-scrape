export function getAppUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  return `${baseUrl}/${path}`;
}
