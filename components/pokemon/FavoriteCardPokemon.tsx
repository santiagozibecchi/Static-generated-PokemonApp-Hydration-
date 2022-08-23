import React, { FC } from "react";
import { useRouter } from "next/router";
import { Grid, Card } from "@nextui-org/react";

interface Props {
   pokemonId: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ pokemonId }) => {
   const router = useRouter();

   const onFavoriteClick = () => {
      // usando el router navegar a la pagina del pokemon
      router.push(`/pokemon/${pokemonId}`);
   };

   return (
      <Grid xs={6} sm={3} md={2} xl={1} onClick={onFavoriteClick}>
         <Card hoverable clickable css={{ paddind: 10 }}>
            <Card.Image
               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
               width={"100%"}
               height={140}
            />
         </Card>
      </Grid>
   );
};
