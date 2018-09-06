import decode from 'jwt-decode';

const validateToken = (token) => {
    if (token) {
        const currentTime = Date.now();
        const tokenExp = decode(token).exp * 1000;
        return currentTime < tokenExp;
    }
    return false;
}

export default validateToken;