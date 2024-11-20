import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

import { User } from "../types/user";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

interface State {
    auth: AuthState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        auth: {
            user: null,
            token: null,
            isAuthenticated: false,
        }
    },
    getters: {
        isAdmin: (state) => state.auth.user?.role === 'ADMIN',
        isDoctor: (state) => state.auth.user?.role === 'DOCTOR',
        isPatient: (state) => state.auth.user?.role === 'PATIENT',
    },
    mutations: {
        setUser(state, user: User | null) {
            state.auth.user = user;
            state.auth.isAuthenticated = !!user;
        },
        setToken(state, token: string | null) {
            state.auth.token = token;
        },
        logout(state) {
            state.auth.user = null;
            state.auth.token = null;
            state.auth.isAuthenticated = false;
        }
    },
    actions: {
        login({ commit }, { token, user }) {
            commit('setToken', token);
            commit('setUser', user);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },

        logout({ commit }) {
            commit('logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});
