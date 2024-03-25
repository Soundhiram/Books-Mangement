// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.module.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AppRoutes from './route';

export function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
