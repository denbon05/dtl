import appCookies from '@/entities/app-cookies';
import appStorage from '@/entities/app-storage';
import { CookiesConcern } from '@/types/browser-storage';
import { ref, watch } from 'vue';

const cookiesConcern = ref(
  appStorage.getItem('cookiesConcern') ?? CookiesConcern.UNSETTLED
);

watch(cookiesConcern, (newValue) => {
  if (newValue === CookiesConcern.DENIED) {
    // set all the cookies expire time now
    appCookies.setAllExpired();
  }

  appStorage.setItem('cookiesConcern', newValue);
});

export const useCookies = () => {
  const setCookiesConcern = (concern: CookiesConcern) => {
    cookiesConcern.value = concern;
  };

  return {
    setCookiesConcern,
    cookiesConcern,
  };
};
