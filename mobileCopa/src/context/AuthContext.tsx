import { ReactNode, createContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
	name: string;
	avatarUrl: string
}

export interface AuthContextDataProps {
	user:UserProps
	isUserLoading:boolean
	signIn:() => Promise<void>
}

interface AuthContextProviderProps{
	children: ReactNode
} 

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider ({children}: AuthContextProviderProps) {

	//vai começar como um objeto vazio e depois reber a tipagem {}as UserProps)
	const[user,setUser] =useState<UserProps>({}as UserProps)
	const [isUserLoading, setIsUserLoading] = useState (false)

	const[request, response,prompAsync] = Google.useAuthRequest({
		clientId: '1019080141506-g4roe3750gsqr2mpds5hlpp6gj4gm695.apps.googleusercontent.com',
		redirectUri: AuthSession.makeRedirectUri({useProxy:true}),
		scopes: ['profile','email']
	})

	 async function signIn(){
	try {
		setIsUserLoading(true)
		await prompAsync()
		
	} catch (error) {
		console.log(error);
		throw error
		
	} finally{
		setIsUserLoading(false)
	

	}
	}

	return (
		<AuthContext.Provider value={{
			signIn,
			isUserLoading,
			user,
		}}>
			{children}

		</AuthContext.Provider>
	)
}