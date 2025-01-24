import './App.css';
import RouteAdapter, { routes } from './routes/routes';
import { AuthProvider } from './services/AuthenticationProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <RouteAdapter routes={routes} />
      </AuthProvider>
    </>
  );
}

export default App;
