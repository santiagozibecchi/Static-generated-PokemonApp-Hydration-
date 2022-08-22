import { FC, PropsWithChildren, ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
   title?: string;
   children?: ReactNode;
}

// * Static side generation:
// Antes de que la persona haga una solicitud a
// mi sitio web => yo ya se que se van a mostrar los 151 pokemons y nada mas
// tod[o] para por la funcion getStaticProps -> se ejecuta del lado del server

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
   return (
      <>
         <Head>
            <title>{title || "PokemonApp"}</title>
            <meta name="author" content="Santiago Zibecchi" />
            <meta
               name="description"
               content={`Informacion sobre el pokemon ${title}`}
            />
            <meta name="keywords" content={`${title}, pokemon, pokedex`} />
         </Head>

         <Navbar />

         <main
            style={{
               padding: "0px 20px",
            }}
         >
            {children}
         </main>
      </>
   );
};
