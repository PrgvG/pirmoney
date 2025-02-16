import { authService } from '../../../services/authService';
import { httpService } from '../../../services/httpService';

type Props = {
    username: string;
    password: string;
};

export const registerUser = async (props: Props) => {
    try {
        const response = await httpService.post<{ token: string }>(
            '/login',
            props,
        );

        authService.setToken(response.token);

        return { token: response.token, username: props.username };
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
    }
};
