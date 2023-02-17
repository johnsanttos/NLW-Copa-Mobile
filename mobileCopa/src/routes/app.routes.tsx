import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';

const {Navigator, Screen} = createBottomTabNavigator()

export default function AppRoutes() {
  return (
<Navigator>
	<Screen
	name='new'
	component={New}
	/>

<Screen
	name='pools'
	component={Pools}
	/>
</Navigator>
  );
}