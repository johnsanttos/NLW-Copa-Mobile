import { useContext } from "react";
import { Center, Heading, Text, useToast, VStack } from "native-base";
import Logo from '../assets/logo.svg'

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";


export function New() {

	const {signOut} = useContext(AuthContext)

	const [title, setTitle] = useState('');
	const [isLoading, setIsLoading] = useState(false)

	const toast = useToast()

	async function handlePoolCreate() {
		console.log('uiii')
		//title.trim() para verificar se tem espaços na aplicação
		if (!title.trim()) {
			return toast.show({
				title: 'Informe um nome para o seu bolão!',
				placement: 'top',
				bgColor: 'red.500'
			})
		}
		try {
			setIsLoading(true)
			await api.post('/pools', { title: title.toUpperCase()})
			toast.show({
				title: 'Bolão criado com sucesso!',
				placement: 'top',
				bgColor: 'green.500'
			})

			setTitle('')

		} catch (error) {
			console.log(error)
			toast.show({
				title: 'Não foi possivel criar o bolão',
				placement: 'top',
				bgColor: 'red.500'
			})
		} finally {
			setIsLoading(false)
		}

	}

	return (
		<VStack flex={1} bgColor={"gray.900"} >
			<Header 
			title="Criar novo bolão"
			showSignOutButton
			signOut={signOut}
			 />

			<VStack marginTop={8} mx={5} alignItems="center" >	
			<Logo />
			<Heading fontFamily="heading" color="white" fontSize='xl' my={8} textAlign="center">
					Crie seu próprio bolão da copa{'\n'}
					e compartilhe entre amigos!
				</Heading>

				<Input
					marginBottom={2}
					placeholder="Qual nome do seu bolão?"
					value={title}
					onChangeText={setTitle}
				/>
				<Button
					onPress={handlePoolCreate}
					title="CRIAR MEU BOLÃO"
					isLoading={isLoading}
				/>

				<Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4} >
					Após criar seu bolão, você receberá um código único
					que poderá usar para convidar outras pessoas.
				</Text>
			</VStack>

		</VStack>
	)
}