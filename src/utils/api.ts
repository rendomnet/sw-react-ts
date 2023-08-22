export async function fetchApi<T>(url: string): Promise<T> {
  const response: Response = await fetch(url);
  const data: T = await response.json();
  return data;
}
