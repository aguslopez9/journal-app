import { registerUserEmailPassword, signInWithGoogle } from "../../firebase/provider"
import { checkingCredentials, logout, login } from "./"


export const checkingAuthentication = (email, password) => {
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

        const {ok, uid, photoURL, errorMessage} = await registerUserEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))

    }


}