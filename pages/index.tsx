import { Button } from "@nextui-org/react";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";

const title = "Listado de Pokemons";

const HomePage: NextPage = () => {
   return (
      <Layout title={title}>
         <Button color="gradient">Hola mundo</Button>
      </Layout>
   );
};

export default HomePage;
