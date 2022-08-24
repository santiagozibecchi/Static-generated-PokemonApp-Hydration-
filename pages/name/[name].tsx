import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { localFavorites } from "../../utils";
import confetti from "canvas-confetti";
import { Layout } from "../../components/layouts";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { pokeApi } from "../../api";

interface Props {
   pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
   // Puedo realizarlo de esta manera porque el LS es sincrono, lo puedo leer en el preciso instante
   const [isInFavorites, setIsInFavorites] = useState(false);

   console.log(pokemon);

   useEffect(() => {
      setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
   }, [pokemon.id]);

   const onToggleFavorite = () => {
      localFavorites.toggleFavorite(pokemon.id);
      setIsInFavorites(!isInFavorites);
      console.log(isInFavorites);

      if (isInFavorites) return;
      confetti({
         zIndex: 999,
         particleCount: 100,
         spread: 160,
         angle: -100,
         origin: {
            x: 1,
            y: 0,
         },
      });
   };

   return (
      <Layout title={pokemon.name}>
         <Grid.Container css={{ marginTop: "5px" }} gap={2}>
            <Grid xs={12} sm={4}>
               <Card hoverable css={{ padding: "30px" }}>
                  <Card.Body>
                     <Card.Image
                        src={
                           pokemon.sprites.other?.dream_world.front_default ||
                           "/no-image.png"
                        }
                        alt={pokemon.name}
                        width="100%"
                        height={200}
                     />
                  </Card.Body>
               </Card>
            </Grid>

            <Grid xs={12} sm={8}>
               <Card>
                  <Card.Header
                     css={{
                        display: "flex",
                        justifyContent: "space-between",
                     }}
                  >
                     <Text h1 transform="capitalize">
                        {pokemon.name}
                     </Text>

                     <Button
                        onClick={onToggleFavorite}
                        color="gradient"
                        ghost={!isInFavorites}
                     >
                        {isInFavorites
                           ? "En favoritos"
                           : "Guardar en Favoritos"}
                     </Button>
                  </Card.Header>

                  <Card.Body>
                     <Text size={30}>Sprites: </Text>

                     <Container display="flex" direction="row" gap={0}>
                        <Image
                           src={pokemon.sprites.front_default}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                        <Image
                           src={pokemon.sprites.back_default}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                        <Image
                           src={pokemon.sprites.front_shiny}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                        <Image
                           src={pokemon.sprites.back_shiny}
                           alt={pokemon.name}
                           width={100}
                           height={100}
                        />
                     </Container>
                  </Card.Body>
               </Card>
            </Grid>
         </Grid.Container>
      </Layout>
   );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// * getStaticPaths indica cuales son todos los argumentos permitidos
export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const { data } = await pokeApi.get<PokemonListResponse>(
      `/pokemon?limit=151`
   );
   const { results } = data;

   // Necesito un arreglo con el nombre de los 151 pokemons

   return {
      paths: results.map((poke) => ({
         params: { name: poke.name },
      })),
      fallback: false,
   };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { name } = params as { name: string };
   const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`); // your fetch function here

   return {
      props: {
         pokemon: data,
      },
   };
};

export default PokemonByNamePage;
