export const BASE_URL =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_Td4xWgXkMe1wbsxSX0anJPLexQprp&ipAddress=";

export async function getIp(ip: string) {
  try {
    const response = await fetch(`${BASE_URL}${ip}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
