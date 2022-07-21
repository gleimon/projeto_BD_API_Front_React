import Home from './components/Home';
import Sobre from './components/Sobre';
import Alunos from './components/Alunos';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <center><h1>Aplicação React - Escola Mundial</h1></center>
      <BrowserRouter>

      <Nav variants="tabs">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/alunos">Cadastro de Estudantes</Nav.Link>
        <Nav.Link as={Link} to="/sobre">Nossas Instalações</Nav.Link>
        <Nav.Link as={Link} to="/sobre">Corpo Docente</Nav.Link>
        <Nav.Link as={Link} to="/sobre">Nossa Escola</Nav.Link>
      </Nav>
      <h1></h1>
      
      <Routes>
        <Route path="/" index element={<Home/>}></Route>
        <Route path="/alunos" index element={<Alunos/>}></Route>
        <Route path="/sobre" index element={<Sobre/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
