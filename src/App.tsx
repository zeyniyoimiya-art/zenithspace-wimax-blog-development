import { Layout } from "./components/Layout";
import { ArticleView } from "./components/ArticleView";
import { usePath } from "./lib/router";
import { Home } from "./pages/Home";
import { Cobertura } from "./pages/Cobertura";
import { Personajes } from "./pages/Personajes";
import { Empresas } from "./pages/Empresas";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { historia } from "./data/historia";
import { bolivia } from "./data/bolivia";

/** Página 404 */
function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-8xl font-bold text-cosmic">404</p>
      <p className="mt-4 text-lg text-muted">Señal perdida: esta página no existe en la red.</p>
      <a href="#/" className="btn-cosmic mt-8">Volver al inicio</a>
    </div>
  );
}

/** Enrutador de páginas (hash routing, apto para un único HTML estático) */
export default function App() {
  const path = usePath();

  let page;
  switch (path) {
    case "/":
      page = <Home />;
      break;
    case "/blog/historia":
      page = <ArticleView article={historia} />;
      break;
    case "/blog/personajes":
      page = <Personajes />;
      break;
    case "/blog/cobertura-mundial":
      page = <Cobertura />;
      break;
    case "/blog/wimax-bolivia":
      page = <ArticleView article={bolivia} />;
      break;
    case "/blog/empresas-bolivia":
      page = <Empresas />;
      break;
    case "/about":
      page = <About />;
      break;
    case "/contact":
      page = <Contact />;
      break;
    default:
      page = <NotFound />;
  }

  return <Layout>{page}</Layout>;
}
