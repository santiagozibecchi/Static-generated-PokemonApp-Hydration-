import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";

interface Props {
   pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
   // console.log(pokemon);
   return (
      <Layout title="Algun pokemon">
         <h1>{pokemon.name}</h1>
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
      fallback: false /* si el url no fue previamente rendirazo -> Error404*/,
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { id } = params as { id: string };
   const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

   // console.log(ctx);

   return {
      props: {
         pokemon: data,
      },
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
