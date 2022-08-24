import { FC, PropsWithChildren, ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
   title?: string;
   children?: ReactNode;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;
// console.log({ origin });

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

            <meta property="og:title" content={`Informacion sobre ${title}`} />
            <meta
               property="og:description"
               content={`Esta es la pagina sobre ${title}`}
            />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
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
