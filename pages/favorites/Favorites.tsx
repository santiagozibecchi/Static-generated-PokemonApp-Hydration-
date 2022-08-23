import { useState, useEffect } from "react";
import { Card, Grid } from "@nextui-org/react";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";

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
            <Grid.Container gap={2} direction="row" justify="flex-start">
               {favoritesPokemons.map((id) => (
                  <Grid xs={6} sm={3} md={2} xl={1} key={id}>
                     <Card hoverable clickable css={{ paddind: 10 }}>
                        <Card.Image
                           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                           width={"100%"}
                           height={140}
                        />
                     </Card>
                  </Grid>
               ))}
            </Grid.Container>
         )}
      </Layout>
   );
};

export default FavoritesPage;
