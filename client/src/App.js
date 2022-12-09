import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import PokemonCreated from './components/PokemonCreated'
import Detail from './components/Detail'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/create' component={PokemonCreated}/>
      <Route path='/pokemons/:id' component={Detail}/>
  
    </div>
    </BrowserRouter>
  );
}

export default App;
