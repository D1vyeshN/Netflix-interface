import './App.scss';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from '../src/Components/Home';
import Header from '../src/Components/Header'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
