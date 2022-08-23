import { useState, useEffect } from "react";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritePokemon } from "../../components/pokemon";

const FavoritesPage = () => {
   const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

   // Lo crea el lado del cliente
   useEffect(() => {
      // Regresa el arreglo de pokemons que esta en el LS -> localFavorites.pokemons()
      setFavoritesPokemons(localFavorites.pokemons());
   }, []);

   return (
      <Layout title="Pokemons - Favoritos">
         {favoritesPokemons.length === 0 ? (
            <NoFavorites />
         ) : (
            <FavoritePokemon pokemons={favoritesPokemons}/>
         )}
      </Layout>
   );
};

export default FavoritesPage;
