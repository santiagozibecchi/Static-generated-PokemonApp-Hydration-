import { useEffect, useState } from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from "canvas-confetti";

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
   pokemon: Pokemon;
}

// * Para saber si estamos corriendo codidgo del lado del servidor
// clg({existWinwdown: typeof window})

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
   // Puedo realizarlo de esta manera porque el LS es sincrono, lo puedo leer en el preciso instante
   const [isInFavorites, setIsInFavorites] = useState(false);

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

// * [] => significa que tiene un argumento dinamico
// * Hay que decirle a Next que hacer con cada uno de esos path

// Hay que regresar un arreglo con cada uno de los path y esos path tiene que tener
// la data que van a hacer los parametros que voy a mandarle a cada uno del
// getStaticProps

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// Se ejecuta del lado del servidor

export const getStaticPaths: GetStaticPaths = async (ctx) => {
   // Creo un arreglo que barre de 1 a 151
   const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);
   // console.log({ pokemon151 });

   return {
      // paths: [
      // * La cantidad de path que tengamos sera la cantidad de paginas que va a pregenerar en el buiildtime de la aplicacion
      //    {
      //       params: {
      //          id: "1",
      //       },
      //    },
      // ],
      paths: pokemon151.map((id) => ({
         params: { id },
      })),
      // fallback: false /* si el url no fue previamente rendirazo -> Error404*/,
      fallback: "blocking",
   };
};

// * getStaticProps -> quien genera la data que termina siendo almacenada en fileSystem
export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { id } = params as { id: string };

   const pokemon = await getPokemonInfo(id);

   if (!pokemon) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      };
   }

   // Es recomendable solamente pasar la informacion con la cual se va a trabajar
   return {
      props: {
         pokemon,
      },
      revalidate: 86400 /* 60*60*24 */,
   };
};

// pokemon151: [
//    '1',   '2',  '3',  '4',  '5',  '6',  '7',  '8',  '9',
//    '10',  '11', '12', '13', '14', '15', '16', '17', '18',
//    '19',  '20', '21', '22', '23', '24', '25', '26', '27',
//    '28',  '29', '30', '31', '32', '33', '34', '35', '36',
//    '37',  '38', '39', '40', '41', '42', '43', '44', '45',
//    '46',  '47', '48', '49', '50', '51', '52', '53', '54',
//    '55',  '56', '57', '58', '59', '60', '61', '62', '63',
//    '64',  '65', '66', '67', '68', '69', '70', '71', '72',
//    '73',  '74', '75', '76', '77', '78', '79', '80', '81',
//    '82',  '83', '84', '85', '86', '87', '88', '89', '90',
//    '91',  '92', '93', '94', '95', '96', '97', '98', '99',
//    '100',
//    ... 51 more items
//  ]

export default PokemonPage;
