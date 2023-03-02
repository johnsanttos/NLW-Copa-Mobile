import { useEffect, useState } from "react";
import { HStack, VStack, useToast } from "native-base";
import { useRoute } from '@react-navigation/native'
import { Header } from "../components/Header";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from "react-native";

interface RouteParams {
	id: string
}

export function Details() {
	const route = useRoute();
	const { id } = route.params as RouteParams

	const[otionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
	const [isLoading, setIsLoading] = useState(true);
	const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)

	const toast = useToast()

	async function fetchPoolDetails() {

		try {
			setIsLoading(true)
			const response = await api.get(`/pools/${id}`)
			console.log('essa fera aii', poolDetails._count?.participants)

			setPoolDetails(response.data.pool)

		} catch (error) {
			console.log(error)
			toast.show({
				title: 'Não foi possivel carregar detalhes do bolão',
				placement: 'top',
				bgColor: 'red.500'
			})
		} finally {
			setIsLoading(false)
		}
	}


	async function handleCodeShare() {
		await Share.share({
			message:poolDetails.code
		})
	}

	useEffect(() => {
		fetchPoolDetails()
	}, [id])

	if (isLoading) {
		return (
			<Loading />
		)
	}

	console.log('olhaaa', poolDetails._count?.participants)
	return (
		<VStack flex={1} bgColor={"gray.900"}>
			<Header
				title={poolDetails.title} 
				showBackButton 
				showShareButton
				onShare={handleCodeShare}
			/>
			{ poolDetails._count?.participants < 0 ? 
			
					<VStack px={5} flex={1}>
						<PoolHeader
							data={poolDetails}
						/>

						<HStack bgColor='gray.800' p={1} rounded="sm" mb={5}>
							<Option 
							title="Seus palpites"
							isSelected={otionSelected === 'guesses'}
							onPress={()=>{setOptionSelected('guesses')}}
							/>
							
							<Option 
							title="Ranking do grupo" 
							isSelected={otionSelected === 'ranking'}
							onPress={()=>{setOptionSelected('ranking')}}
							/>
						</HStack>
					</VStack>
					: <EmptyMyPoolList
						code={poolDetails.code}
					/>
			}

		</VStack>
	);
}