import { FlatList, Icon, VStack, useToast } from "native-base";
import { Octicons } from '@expo/vector-icons'
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";


export function Pools() {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);
	const [pools, setPools] = useState<PoolCardProps[]>([])

	const toast = useToast()

	async function fetchPools() {
		try {
			setIsLoading(true)
			const response = await api.get('/pools')

			setPools(response.data.pools)

		} catch (error) {
			console.log(error)
			toast.show({
				title: 'Não foi possivel carregar os bolões',
				placement: 'top',
				bgColor: 'red.500'
			})
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchPools()
	}, [

	])

	return (
		<VStack flex={1} bgColor={"gray.900"}>

			<Header
				title="Meus bolões"
			/>

			<VStack marginTop={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
				<Button
					onPress={() => navigation.navigate('find')}

					isLoading={isLoading}
					type="SECONDARY"
					title="BUSCAR BOLÃO POR CÓDIGO"
					leftIcon={< Icon as={Octicons} name="search" size="md" color="black"

					/>

					}
				/>
			</VStack>
			{
				isLoading ? <Loading /> :
					<FlatList
						//data = dados da nossa lista , keyExtractor={item=>item.id}= valor unico da listagem , renderItem {({item}) => <PoolCard
						//data={item} component que vai renderizar a flatlist, passando o item individualmente
						data={pools}
						keyExtractor={item => item.id}
						renderItem={({ item }) => <PoolCard
							data={item}
						/>}
						padding={5}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 10 }}
						ListEmptyComponent={() => <EmptyPoolList />}
					/>}
		</VStack>
	)

}