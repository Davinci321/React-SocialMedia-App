import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Main } from './main/Main-page';
import { Login } from './Pages/Login-page';
import { Navbar } from './Components/Navbar';
import { Createpost } from './create-post/Create-post';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route  path='/' element={<Main/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<Createpost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
