import Cookies from 'js-cookie';

export const EnumTokens = {
    ACCESS_TOKEN: 'access_token',
    USER_ID: 'user_id'
};

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
    return accessToken || null;
};

export const saveAccessTokenStorage = (token) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, token);
};

export const saveUserId = (id) => {
    Cookies.set(EnumTokens.USER_ID, id);
};

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
    Cookies.remove(EnumTokens.USER_ID);
};

export const getUserId = () => {
    const userId = Cookies.get(EnumTokens.USER_ID);
    return userId || null;
};
