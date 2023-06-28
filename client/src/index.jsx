import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import {Provider} from 'react-redux'
import { store } from './redux/store';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App/>
    </Provider>
)