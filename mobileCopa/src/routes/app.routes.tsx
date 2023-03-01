import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { useTheme } from 'native-base';
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Details } from '../screens/Details';
import { Find } from '../screens/Find';

const { Navigator, Screen } = createBottomTabNavigator()

export default function AppRoutes() {
	const { colors, sizes } = useTheme()
	return (
		<Navigator
			screenOptions={{
				// passar regras para toda rota
				headerShown: false,
				tabBarLabelPosition: 'beside-icon',
				tabBarActiveTintColor: colors.yellow[500],
				tabBarInactiveTintColor: colors.gray[300],
				tabBarStyle: {
					position: 'absolute',
					height: 82,
					borderTopWidth: 0,
					backgroundColor: colors.gray[800]
				},

				tabBarItemStyle: {
					position: 'relative',
					top: Platform.OS === 'android' ? -10 : 0
				}
			}}
		>
			<Screen
				name='new'
				component={New}
				options={
					{
						tabBarIcon: ({ color }) => <PlusCircle color={color} />,
						tabBarLabel: 'Novo Bolão'

					}
				}
			/>

			<Screen
				name='pools'
				component={Pools}
				options={
					{
						tabBarIcon: ({ color }) => <SoccerBall color={color} />,
						tabBarLabel: 'Meus bolões'

					}
				}
			/>
			<Screen
				name='find'
				component={Find}
				options={{ tabBarButton: () => null }}
			/>

			<Screen
				name='details'
				component={Details}
				options={{ tabBarButton: () => null }}
			/>
		</Navigator>
	);
}