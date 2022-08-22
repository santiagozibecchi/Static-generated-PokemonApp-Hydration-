import type { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

// * getStaticProps
// Cuando se esta haciendo el yarn build ya a la fn

interface Props {
   pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
   return (
      <Layout title="Listado de Pokemons">
         <Grid.Container gap={2} justify="flex-start">
            {pokemons.map((pokemon) => (
               <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
         </Grid.Container>
      </Layout>
   );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

// ! Funcion que solo se ejecuta del lado del servidor y en build time
// ! Solo se puede utilizar en las Pages, no es compatible con los componentes

// ? Podemos leer fileSystem, base de datos, peticiones http mandado secret tokens

export const getStaticProps: GetStaticProps = async (ctx) => {
   const { data } = await pokeApi.get<PokemonListResponse>(
      "/pokemon?limit=151"
   );

   const { results } = data;

   // img = https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

   const pokemons: SmallPokemon[] = results.map(({ name, url }, index) => {
      return {
         name,
         url,
         id: index + 1,
         img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            index + 1
         }.svg`,
      };
   });

   // ! Nada llega al cliente con execion de las props
   return {
      props: {
         pokemons,
      },
   };
};

export default HomePage;
