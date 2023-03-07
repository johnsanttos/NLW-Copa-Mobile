import { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';

import { api } from '../services/api';

import { Loading } from './Loading';
import { Game, GameProps } from '../components/Game';
import { EmptyMyPoolList } from './EmptyMyPoolList';

interface Props {
  poolId: string;

}




export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [game,setGame] =useState<GameProps>({}as GameProps)

  const toast = useToast();
  async function fetchGames() {

    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      console.log( 'aiiiieeeee', response.data.games)
      setGame(response.data.games)

    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possível listar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    fetchGames()
  },[poolId])
  //passar o pool id para se o id alterar fazer uma nova requisição com useEfect
  return (
    <Box>

    </Box>
  )

}