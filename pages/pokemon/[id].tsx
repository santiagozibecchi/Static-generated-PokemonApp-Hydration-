import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/layouts";

interface Props {
   // pokemon: any;
   id: string;
   name: string;
}

const PokemonPage: NextPage<Props> = ({ id, name }) => {
   const router = useRouter();
   console.log(router.query);

   return (
      <Layout title="Algun pokemon">
         <h1>
            {id} - {name}
         </h1>
      </Layout>
   );
};

// * [] => significa que tiene un argumento dinamico
// * Hay que decirle a Next que hacer con cada uno de esos path

// Hay que regresar un arreglo con cada uno de los path y esos path tiene que tener
// la data que van a hacer los parametros que voy a mandarle a cada uno del
// getStaticProps

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
   return {
      paths: [
         // * La cantidad de path que tengamos sera la cantidad de paginas que va a pregenerar en el buiildtime de la aplicacion
         {
            params: {
               id: "1",
            },
         },
      ],
      fallback: false /* si el url no fue previamente rendirazo -> Error404*/,
   };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   // const { data } = await pokeApi.get<PokemonListResponse>(
   //    "/pokemon?limit=151"
   // );

   return {
      props: {
         id: 1,
         name: "pokemuestra",
      },
   };
};

export default PokemonPage;
