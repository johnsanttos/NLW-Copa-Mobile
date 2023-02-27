import { Center, Heading, VStack, useToast } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { isLoading } from "expo-font";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";



export function Find() {
	const [isLoading, setIsloading] = useState(false)
	const [code, setCode] = useState('')

	const toast = useToast()
	const{navigate} = useNavigation()



	async function handleJoinPool() {
		try {
			setIsloading(true)

			if(code.trim() === ''){
			return toast.show({
					title: 'Informe o código',
					placement: 'top',
					bgColor: 'red.500'
				})
			}

		 await api.post('/pools/join', {code:code})
		 toast.show({
			title: 'Você entrou no bolão com sucesso!',
			placement: 'top',
			bgColor: 'green.500'
		})
			navigate('pools')
		} catch (error) {
			console.log(error)
			setIsloading(false)
			if (error.response?.data?.message === 'Pool not found') {
				return toast.show({
					title: 'Bolão não encontrado!',
					placement: 'top',
					bgColor: 'red.500'
				})
			}

			if (error.response?.data?.message === 'You are already a join this pool.') {
				return toast.show({
					title: 'Você ja esta nesse bolão!',
					placement: 'top',
					bgColor: 'red.500'
				})
			}

			toast.show({
				title: 'Não foi possivel localizar o bolão!',
				placement: 'top',
				bgColor: 'red.500'
			})

		} 
	}

	return (
		<VStack flex={1} bgColor={"gray.900"} >
			<Header title="Buscar por código" showBackButton />

			<VStack marginTop={8} mx={5} alignItems="center" >

				<Heading color="white" fontSize='xl' mb={8} textAlign="center">
					Encontre um bolão através de{'\n'}
					seu código único
				</Heading>

				<Input
					value={code}
					onChangeText={setCode}
					autoCapitalize="characters"
					marginBottom={2}
					placeholder="Qual o código do bolão?"
				/>
				<Button
					onPress={handleJoinPool}
					title="BUSCAR POR CÓDIGO"
					isLoading={isLoading}
				/>
			</VStack>

		</VStack>
	)
}