import type { NextPage, GetStaticProps } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";

// * getStaticProps
// Cuando se esta haciendo el yarn build ya a la fn

const title = "Listado de Pokemons";

const HomePage: NextPage = (props) => {
   console.log({ props });
   return (
      <Layout title={title}>
         <ul>
            <li>Pokemons</li>
            <li>Pokemons</li>
            <li>Pokemons</li>
            <li>Pokemons</li>
            <li>Pokemons</li>
            <li>Pokemons</li>
         </ul>
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
   const { data } = await pokeApi.get("/pokemon?limit=151");

   // ! Nada llega al cliente con execion de las props
   return {
      props: {
         pokemons: data.results,
      },
   };
};

export default HomePage;
