import { Route, Routes } from 'react-router-dom';
import './App.css';
import Forma from './components/forma/Forma';
import Navigation from './components/navigation/Navigation';
import Politra from './components/politra/Politra';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/' element={<Forma/>}/>
        <Route path='/politra' element={<Politra/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
