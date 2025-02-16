
import { lazy, Suspense } from 'react';
import { Router } from './Router';
import Route from './Route';
import Page404 from './pages/404';
import SearchPage from './pages/SearchPage';

const LazyAboutPage = lazy(() => import('./pages/About'));
const LayHomePage = lazy(() => import('./pages/Home'));

const routes = [
  { path: '/:lang/about', Component: LazyAboutPage },
  { path: '/contact/:query', Component: SearchPage }
];

function App() {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>} >
        <Router routes={routes} defaultComponent={Page404} >

          <Route path="/" Component={LayHomePage} />
          <Route path="/about" Component={LazyAboutPage} />

        </Router>
      </Suspense>
    </main>
  );
}

export default App;
