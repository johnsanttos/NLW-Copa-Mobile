import { Center, Text, Icon } from "native-base";
import Logo from "../assets/logo.svg"
import {Fontisto } from '@expo/vector-icons'
import { useAuth } from "../hooks/useAuth";
import { Button } from "../../components/Button";

export function SignIn() {

  const {signIn ,user} = useAuth()

  //console.log ('DADOS' , user)

  return (
    <Center flex={1} bgColor={"gray.900"} padding={7}>

      <Logo width={212} height={40} />

      <Button 
       onPress={signIn}
        type="SECONDARY"
        title='ENTRAR COM GOOGLE'
        leftIcon={<Icon as={Fontisto} name='google' color="white" size="md" />}
        marginTop={12}
  
        _loading={{
          _spinner: { color: 'white' }
        }}
      />
      <Text color="white" textAlign="center" marginTop={4}>
        Não utilizamos nenhuma informação além{'\n'}
        do seu e-mail para criação de sua conta.
      </Text>

    </Center>

  )
}