import { createStore, Store, Commit } from "vuex";
import { InjectionKey } from "vue";

import { User } from "../types/user";
import { Role } from "../types/role";

export interface State {
    user: User | null;
    token: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state: State, user: User) {
            state.user = user;
        },
        setToken(state: State, token: string) {
            state.token = token;
        },
        logout(state: State) {
            state.user = null;
            state.token = null;
        },
    },
    actions: {
        login({ commit }: {commit: Commit}, { token, user }: { token: string; user: User }) {
            commit("setToken", token);
            commit("setUser", user);
        },
        logout({ commit }) {
            commit("logout");
        },
    },
    getters: {
        isAuthenticated: (state: State) => state.token !== null && state.token,
        isAdmin: (state: State) => {
            return state.user !== null && state.user.role === Role.admin;
        },
    },
});
