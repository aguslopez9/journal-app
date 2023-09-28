import { loginEmailPassword, logoutFirebase, registerUserEmailPassword, signInWithGoogle } from "../../firebase/provider"
import { checkingCredentials, logout, login } from "./"


export const checkingAuthentication = () => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {

        dispatch(checkingCredentials());

       const result = await signInWithGoogle();
       if (!result.ok) return dispatch( logout(result.errorMessage) );

       dispatch(login(result))
    }
}

export const startCreatingUserEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await registerUserEmailPassword({email, password, displayName});

        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))

    }


}

export const startLoginEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginEmailPassword({email, password});
        console.log(resp);

        if(!result.ok) return dispatch(logout(result));
        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(logout({}));

    }
}