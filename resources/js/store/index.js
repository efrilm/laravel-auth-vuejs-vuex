import axios from "axios";
import { createStore } from "vuex";
export default createStore({
    state: {
        token: localStorage.getItem("token") || "",
        isAuthenticated: false,
    },
    mutations: {
        // updateAuthenticationStatus(state, status) {
        //     state.isAuthenticated = status;
        // },
        UpdateAuthStatus(state, status) {
            state.isAuthenticated = status;
            console.log("status is" + state.isAuthenticated);
        },
        updateToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
    },
    actions: {
        // Check User
        // checkUserAuthenticationStatus({ commit }) {
        //     // Api/authenticated
        //     axios
        //         .get("api/authenticated")
        //         .then((response) => {
        //             commit("updateAuthenticationStatus", response.data.status);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // },
        setAuthStatus({ commit }, status) {
            commit("UpdateAuthStatus", status);
        },
        setAuthToken({ commit }, token) {
            commit("updateToken", token);
        },
    },
    getters: {
        authStatus: (state) => state.isAuthenticated,
    },
});
