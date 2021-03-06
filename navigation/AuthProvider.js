import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import { GoogleSignin }from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try{
                        let a = await auth().signInWithEmailAndPassword(email, password);
                        console.log("AuTH" , a);
                    } catch(e){
                        console.log(e);
                    }
                },
                googleLogin: async() =>{
                    try{
                        const { idToken } = await GoogleSignin.signIn();
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                        await auth().signInWithCredential(googleCredential).catch(error => {
                            console.log('Something went wrong with sign up: ', error);
                        });
                    }catch(e){
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch(e){
                        console.log(e);
                    }
                },
                logout: async() => {
                    try{
                        await auth().signOut();
                    } catch(e){
                        console.log(e);
                    }
                }
                
            }}
        >
            {children}

        </AuthContext.Provider>
    );
}