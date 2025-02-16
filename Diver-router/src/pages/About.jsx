/* eslint-disable react/prop-types */
import { Link } from "../Link.jsx";

const i18n = {
  es: {
    title: " hola me llamo Diver ",
    button: "Ir a la página de about",
    description: "Esta es la página de about.",
  },
  en: {
    title: "Hello, my name is Diver",
    button: "Go to the about page",
    description: "This is the about page.",
  }
};
const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function AboutPage({ routerParams }) {

  const i18n = useI18n(routerParams.lang ?? 'es');
  return (
    <>
      <div>
        <h1> {i18n.title} </h1>
        <img
          src="https://avatars.githubusercontent.com/u/141965236?s=
         400&u=fc69947bdf40b1bb53d84ead1283b8a9b8e2253c&v=4"
          alt="foto de Diver"
        />
        <p>{i18n.description}</p>
      </div>
      <Link to='/' > {i18n.button} </Link>
    </>
  );

}
