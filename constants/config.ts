export const APP_THEME_PREFERENCE = 'APP_THEME_PREFERENCE';
export const CURRENT_USER = 'CURRENT_USER';
export const USER_LOCATION_DATA = 'USER_LOCATION_DATA';
export const API_DEV_URL = 'http://192.168.0.200:4000';
export const API_PROD_URL = 'https://connectly-server-kqcj.onrender.com';
export const AUTH_CLIENT_ID =
  '431893587938-e7tru3ah5qcqbup857r0i6iluks277mm.apps.googleusercontent.com';

export const ONE_MB = 1000000;
export const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const env = process.env.NODE_ENV || 'development';

export const API_BASE_URL = env === 'production' ? API_PROD_URL : API_DEV_URL;
