/** Application cookies type safe interface */
class AppCookies {
  setAllExpired = () =>
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
}

export default new AppCookies();
