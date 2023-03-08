import { ReactNode, createContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
import { api } from "../services/api";
import { Loading } from "../components/Loading";



WebBrowser.maybeCompleteAuthSession()

interface UserProps {
	name: string;
	avatarUrl: string
}

export interface AuthContextDataProps {
	user: UserProps
	isUserLoading: boolean
	signIn: () => Promise<void>
	signOut:() => Promise<void>
}

interface AuthContextProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {

	//vai começar como um objeto vazio e depois reber a tipagem {}as UserProps)
	const [user, setUser] = useState<UserProps>({} as UserProps)
	const [isUserLoading, setIsUserLoading] = useState(true)

	const [request, response, prompAsync] = Google.useAuthRequest({
		clientId: process.env.CLIENT_ID,
		redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
		scopes: ['profile', 'email']
	})

	async function signIn() {
		try {
			setIsUserLoading(true)
			await prompAsync()

		} catch (error) {
			console.log(error);
			throw error

		} finally {
			setIsUserLoading(false)


		}
	}

	async function signInWithGoogle(access_Token: string) {

		try {

			const tokenResponse = await api.post('/users', { access_token: access_Token });

			api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

			const userInfoResponse = await api.get('/me');

			const data = {
				...userInfoResponse
			}

			//JSON.stringify() transforma um objeto em string
			await AsyncStorage.setItem('@johncopa', JSON.stringify(data))

			setUser(userInfoResponse.data.user);


		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			setIsUserLoading(false);
		}
	}

	useEffect(() => {
		if (response?.type === 'success' && response.authentication?.accessToken) {
			signInWithGoogle(response.authentication.accessToken)
		}
	}, [response])

	useEffect(() => {

		async function getUser() {
			//pegar dados salvos do asyncStorage
			const userInfo = await AsyncStorage.getItem('@johncopa')
			//JSON.parse tranforma string em objeto
			let hasUser = JSON.parse(userInfo || '{}')
			// verificar se recebemos as informações do async
			if (Object.keys(hasUser).length > 0) {
				api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.data.token}`;
				//console.log('iiiiiiiiiiiiiiiiiiiiiiiiii' , hasUser.data)
				setUser(hasUser.data.user)
			}
			setIsUserLoading(false)
		}

		getUser()

	}, [])

	async function signOut() {
		await AsyncStorage.clear().then(() => {
			setUser({
				name:'',
				avatarUrl: ''
		})
		})
	}

	if (isUserLoading) {
		return <Loading />
	}


	return (
		<AuthContext.Provider value={{
			signIn,
			signOut,
			isUserLoading,
			user,
		}}>
			{children}

		</AuthContext.Provider>
	)
}