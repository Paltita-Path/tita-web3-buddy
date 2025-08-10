export type Resource = {
  title: string;
  description: string;
  link: string;
  tags: ("Desarrollo" | "Diseño" | "Comunidad" | "Finanzas DeFi" | "NFTs")[];
};

export const RESOURCES: Resource[] = [
  { title: "Intro a Solidity", description: "Curso gratuito para aprender a programar contratos inteligentes en Ethereum.", link: "https://cryptozombies.io", tags: ["Desarrollo"] },
  { title: "Hackathon ETHGlobal", description: "Evento global de creación de proyectos Web3 en equipo.", link: "https://ethglobal.com", tags: ["Comunidad", "Desarrollo"] },
  { title: "Comunidad Developer DAO", description: "Conecta con miles de developers Web3 alrededor del mundo.", link: "https://developerdao.com", tags: ["Comunidad", "Desarrollo"] },
  { title: "Guía NFT para principiantes", description: "Aprende qué son los NFTs y cómo crearlos.", link: "https://opensea.io/learn/nft", tags: ["NFTs", "Diseño"] },
  { title: "Curso DeFi básico", description: "Introducción a las Finanzas Descentralizadas.", link: "https://www.defi.education", tags: ["Finanzas DeFi"] },
  { title: "Base Bootcamp", description: "Programa educativo para aprender a construir en Base.", link: "https://base.org/bootcamp", tags: ["Desarrollo"] },
  { title: "Women in Blockchain", description: "Comunidad que impulsa la participación femenina en Web3.", link: "https://womeninblockchain.org", tags: ["Comunidad"] },
  { title: "LearnWeb3 DAO", description: "Academia online gratuita con rutas de aprendizaje Web3.", link: "https://learnweb3.io", tags: ["Desarrollo", "Comunidad"] },
  { title: "DAOstack Academy", description: "Recursos para aprender sobre DAOs y gobernanza.", link: "https://daostack.io", tags: ["Comunidad"] },
  { title: "Stellar Quest", description: "Desafíos interactivos para aprender a usar Stellar.", link: "https://quest.stellar.org", tags: ["Desarrollo", "Finanzas DeFi"] },
];
