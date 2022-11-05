import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./auth-request-api";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    FAILED_OPERATION: "FAILED_OPERATION",
    RESET_FAILED_OPERATION: "LOGOUT_USER",
};

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                });
            }
            case AuthActionType.FAILED_OPERATION: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    failedLogin: payload.failedLogin ?? false,
                    failedRegister: payload.failedRegister ?? false,
                });
            }
            default:
                return auth;
        }
    };

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user,
                },
            });
        }
    };

    auth.registerUser = async function (
        firstName,
        lastName,
        email,
        password,
        passwordVerify
    ) {
        // const response = await api.registerUser(
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     passwordVerify
        // );
        api.registerUser(firstName, lastName, email, password, passwordVerify)
            .then((response) => {
                if (response.status === 200) {
                    authReducer({
                        type: AuthActionType.REGISTER_USER,
                        payload: {
                            user: response.data.user,
                        },
                    });
                    history.push("/");
                } else {
                    alert("got non failnig non 200 response code");
                }
            })
            .catch((reason) => {
                authReducer({
                    type: AuthActionType.FAILED_OPERATION,
                    payload: {
                        failedRegister: reason.response.data.errorMessage,
                    },
                });
            });
    };

    auth.loginUser = function (email, password) {
        api.loginUser(email, password)
            .then((response) => {
                if (response.status === 200) {
                    authReducer({
                        type: AuthActionType.LOGIN_USER,
                        payload: {
                            user: response.data.user,
                        },
                    });
                    history.push("/");
                } else {
                    alert("got a nonfailing, non 200 code");
                }
            })
            .catch((reason) => {
                authReducer({
                    type: AuthActionType.FAILED_OPERATION,
                    payload: { failedLogin: reason.response.data.errorMessage },
                });
            });
    };

    auth.logoutUser = async function () {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null,
            });
            history.push("/");
        }
    };

    auth.getUserInitials = function () {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    };

    auth.resetFailure = function () {
        authReducer({
            type: AuthActionType.RESET_FAILED_OPERATION,
            payload: {},
        });
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
