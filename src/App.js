import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Inscription from './views/Inscription';
import Connexion from './views/Connexion';
import Accueil from './views/Accueill';
import Header from './components/Header';
import Apropos from './views/Apropos';
import Contact from './views/Contact';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/inscription' element={<Inscription/>}/>
        <Route path='/connexion'  element={<Connexion/>}/>
        <Route path='/' element={<Accueil/>}/>
        <Route path='/aPropos' element={<Apropos/>}/>
        <Route path='/contact'  element={<Contact/>}/>
      </Routes>
    </BrowserRouter>

    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />

    </>);
}

export default App;
