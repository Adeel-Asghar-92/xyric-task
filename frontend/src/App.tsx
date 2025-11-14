import { ToastProvider } from './contexts/ToastContext';
import { ItemsList } from './components/ItemsList';

function App() {
  return (
    <ToastProvider>
      <ItemsList />
    </ToastProvider>
  );
}

export default App;
