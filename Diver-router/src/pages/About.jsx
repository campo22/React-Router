import { Link } from "../Link.jsx";

export default function AboutPage() {
  return (
    <>
      <div>
        <h1>About</h1>
        <img
          src="https://avatars.githubusercontent.com/u/141965236?s=
         400&u=fc69947bdf40b1bb53d84ead1283b8a9b8e2253c&v=4"
          alt="foto de Diver"
        />
        <p>Esta es la página de about.</p>
      </div>
      <Link to='/' >Ir a la página de inicio</Link>
    </>
  );

}
