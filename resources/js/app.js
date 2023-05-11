// resources/js/components/HelloReact.js

import HelloReact from './components/HelloReact';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';


// if (document.getElementById('app')) {
//     ReactDOM.render(<App />, document.getElementById('app'));
// }
export default function App() {
    return (
     <HelloReact></HelloReact>
    );
}

createRoot(document.getElementById('app')).render(<App />);
