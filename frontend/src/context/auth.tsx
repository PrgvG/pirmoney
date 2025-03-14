import {
    createContext,
    FC,
    PropsWithChildren,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { authService } from '../services/authService';
import { User, userApi } from '../entities';

type AuthContext = {
    user: User | null;
    setUser: (user: User, token: string) => void;
    clearUser: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: FC<
    PropsWithChildren<{
        loginPage: ReactNode;
    }>
> = ({ children, loginPage }) => {
    const hasToken = Boolean(authService.getToken());
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(hasToken);

    useEffect(() => {
        const handleCheckAuth = async () => {
            try {
                const user = await userApi.getUser();

                setUser(user);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                authService.removeToken();
            } finally {
                setIsLoading(false);
            }
        };

        if (hasToken) {
            handleCheckAuth();
        }
    }, []);

    const handleClearUser = () => {
        setUser(null);
        authService.removeToken();
    };

    const handleSetUser = (user: User, token: string) => {
        setUser(user);
        authService.setToken(token);
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{ user, setUser: handleSetUser, clearUser: handleClearUser }}
        >
            {user ? children : loginPage}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
