import { Text, HStack, Box } from 'native-base';
import { CaretLeft, Export, SignOut} from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { ButtonIcon } from './ButtonIcon';

interface Props {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  showSignOutButton?: boolean
  onShare?:() => void;
  signOut?:() => void;
}

export function Header({ title, showBackButton = false, showShareButton = false, showSignOutButton = false, onShare, signOut}: Props) {

const { navigate } = useNavigation();

  const EmptyBoxSpace = () => (<Box w={6} h={6} />);

  return (
    <HStack w="full" h={24} bgColor="gray.800" alignItems="flex-end" pb={5} px={5}>
        {
          showSignOutButton?
          <ButtonIcon icon={SignOut} onPress={signOut}   />
          :
          <EmptyBoxSpace />
        }
      <HStack w="full" alignItems="center" justifyContent="space-between" paddingRight={10}>
        {
          showBackButton
            ? <ButtonIcon icon={CaretLeft} onPress={() => 
              navigate('pools')} />
            : <EmptyBoxSpace />
        }

        <Text color="white" fontFamily="medium" fontSize="md" textAlign="center">
          {title}
        </Text>

        {
          showShareButton
            ?
            <ButtonIcon icon={Export} onPress={onShare}   />
            :
            <EmptyBoxSpace />
        }

     
      </HStack>
    </HStack>
  );
}

