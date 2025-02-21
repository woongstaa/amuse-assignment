import './App.css';
import { Todos } from '../pages';
import { ThemeProvider } from './ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Todos />
    </ThemeProvider>
  );
}

export default App;
