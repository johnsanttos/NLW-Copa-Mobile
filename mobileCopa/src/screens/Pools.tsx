import { Icon, VStack } from "native-base";
import { Octicons } from '@expo/vector-icons'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

export function Pools() {
	const navigation = useNavigation();

	const handlePress = () => {
		console.log('Botão pressionado');
	  };


	return (
		<VStack flex={1} bgColor={"gray.900"}>

			<Header
				title="Meus bolões"
			/>

			<VStack marginTop={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
				<Button
					onPress={()=>navigation.navigate('find')}
					type="SECONDARY"
					title="BUSCAR BOLÃO POR CÓDIGO"
					leftIcon={< Icon as={Octicons} name="search" size="md" color="black"
				
					/>

					}
				/>

				{/* <TouchableOpacity
				style={{height:70, width:350, backgroundColor: '#fff', borderRadius:10}}
				onPress={buscarBolao}
				>
					<Text> BUSCAR BOLÃO POR CÓDIGO"</Text>
				</TouchableOpacity> */}
			</VStack>

		</VStack>
	)

}