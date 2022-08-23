const toggleFavorite = (id: number) => {
   // Grabar en LS el obj si el id existe
   let favorites: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
   );
   // favorites es un tipo un arreglo de tipo number
   //  localStorage.getItem: Lo que hace es obtener el VALUE de la propiedad
   // "favorites" -> Toda la inf. en el LS es almacenada como string
   // Por eso, es necesario parsearlo para obtener el objeto y poder manipularlo.
   // En caso de que no se encuentre un valor, le decimos que devuelva un arrar vacio

   // A partir de lo anterior se pueden obtener dos valor value o []
   // si favorite encuentra un valor(number) -> true
   if (favorites.includes(id)) {
      // la variable ahora filtra y excluye todos los valores que
      // tengan el valor de id, es decir... LO ELIMINA
      // regresa un nuevo arreglo sin el pokemon que viene del id:number
      favorites = favorites.filter((pokeId) => pokeId !== id);
      //   Regresa todos los pokeId que sean distinto del id que le estoy pasando, osea, todos los valores que ya estaban anteriormente pero sin el que le estoy pasando por argumento
      //   Se realiza esta validacion para no guardar los mismos valores y hacer crecer el arreglo con los mismos ids
      // Entonces, si el id no se encuentra ya en LS, lo guardo:
   } else {
      favorites.push(id);
   }
   // Ahora Grabo en LS nuevamente
   localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Necesito una funcion que me sirva para verificar si el pokemon existe en favoritos
const existInFavorites = (id: number): boolean => {
   // si lo siguiente se esta generando del lado del servidor regresar false
   if (typeof window === "undefined") return false;

   const favorites: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
   );

   return favorites.includes(id);
};

// Obtener el arreglo de los id de los pokemons en LS
const pokemons = (): number[] => {
   return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export default { toggleFavorite, existInFavorites, pokemons };
