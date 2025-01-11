export const saveTokenInCookies = (token) => {
  const cookieName = "token";
  const expiryDays = 1;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);

  document.cookie = `${cookieName}=${token};expires=${expiryDate.toUTCString()};path=/;secure;`;
};

export const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const deleteTokenFromCookies = () => {
  document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};
