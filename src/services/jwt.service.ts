import { TokenProvider } from '@/generated-api/auth/auth';
import useTokenStore from '@/store/tokenStore';

const store = useTokenStore();

export class JwtProvider implements TokenProvider {
    getToken(): string {
        return localStorage.jiraToken;
    }
}

export function setJiraToken(jwt: string) {
    store.commit('auth/setAuthentication', true);
    localStorage.jiraToken = jwt;
}

export function removeJiraToken() {
    store.commit('auth/setAuthentication', false);
    localStorage.removeItem('jiraToken');
}
