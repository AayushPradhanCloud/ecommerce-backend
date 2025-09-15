import { QueryProvider } from './providers/QueryProvider';
import { AppRouter } from './providers/RouterProvider';
import './App.css';

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;