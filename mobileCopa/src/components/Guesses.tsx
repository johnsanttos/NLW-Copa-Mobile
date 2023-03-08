import { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';

import { api } from '../services/api';

import { Loading } from './Loading';
import { Game, GameProps } from '../components/Game';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { isLoaded } from 'expo-font';

interface Props {
  poolId: string;
  code: string
}


export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [game,setGame] =useState<GameProps []>([])
  const[firstTeamPoints, setFirstTeamPoints] = useState('')
  const[secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast();
  async function fetchGames() {

    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
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

  async function handleGuessConfirm(gameId:string) {
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
          return toast.show({
          title: 'Informe o placar do palpite',
          placement: 'top',
          bgColor: 'red.500'
        });
      }
   
      await api.post (`/pools/${poolId}/games/${gameId}/guesses`,{
        //Number parse para converter string em numero
        firstTeamPoints : Number(firstTeamPoints),
        secondTeamPoints : Number(firstTeamPoints)
      })
      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });

      fetchGames()

    } catch (error) {
      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      });
    }

  }
  useEffect(()=>{
    fetchGames()
  },[poolId])
  //passar o pool id para se o id alterar fazer uma nova requisição com useEfect
  if (isLoading){
    return <Loading/>
  }
  return (
   <FlatList
   data={game}
   keyExtractor={item => item.id}
   renderItem={({item})=>(
   <Game
   data={item}
   setFirstTeamPoints={setFirstTeamPoints}
   setSecondTeamPoints={setSecondTeamPoints}
   onGuessConfirm={() =>handleGuessConfirm(item.id)}
   />
   )}
   _contentContainerStyle={{pb: 10}}
   ListEmptyComponent={()=> <EmptyMyPoolList 
    code={code}
   />}
   />
  )
}