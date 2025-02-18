import { httpService } from '../../services/httpService';
import { User } from './model';

async function getUser() {
    return await httpService.get<User>('/user');
}

type PostUserProps = {
    username: string;
    password: string;
};

async function loginUser(props: PostUserProps) {
    return await httpService.post<{ token: string }>('/login', props);
}

async function registerUser(props: PostUserProps) {
    return await httpService.post<{ token: string }>('/register', props);
}

export const userApi = {
    getUser,
    loginUser,
    registerUser,
};
