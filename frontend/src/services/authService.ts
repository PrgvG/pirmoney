type TokenService = {
    setToken(token: string): void;
    getToken(): string | null;
    removeToken(): void;
};

class AuthService implements TokenService {
    setToken(token: string): void {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        document.cookie = `jwt=${token}; path=/; samesite=strict; expires=${expirationDate.toUTCString()};`;
    }

    getToken(): string | null {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find((cookie) =>
            cookie.trim().startsWith('jwt='),
        );

        return tokenCookie ? tokenCookie.split('=')[1] : null;
    }

    removeToken(): void {
        document.cookie =
            'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

export const authService = new AuthService();
