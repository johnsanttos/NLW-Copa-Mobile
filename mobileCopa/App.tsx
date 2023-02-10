import { NativeBaseProvider, StatusBar} from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './components/Lodiang';
import { SignIn } from './src/screens/SignIn';


export default function App() {

   const [fontsLoaded] = useFonts({useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})



  return (
    
    <NativeBaseProvider>
      <StatusBar
         barStyle='light-content'
         backgroundColor="transparent"
         translucent
      />
   {fontsLoaded ?  <Loading/> : <SignIn/> }
    </NativeBaseProvider>
  );
}
