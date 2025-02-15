import HomePage from './pages/Home';
import AboutPage from './pages/About';
import { Router } from './Router';
import Page404 from './pages/404';
import SearchPage from './pages/SearchPage';

const routes = [
  { path: '/', Component: HomePage },
  { path: '/about', Component: AboutPage },
  { path: '/contact/:query', Component: SearchPage }
];

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  );
}

export default App;
