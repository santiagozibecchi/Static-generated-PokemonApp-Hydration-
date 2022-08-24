import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
   try {
      const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`); // your fetch function here

      return {
         sprites: data.sprites,
         id: data.id,
         name: data.name,
      };
   } catch (error) {
      console.log(error);
      return null;
   }
};
