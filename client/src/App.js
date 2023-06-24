import './App.css';

import {Route, Routes} from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import MainPage from "./components/MainPage";
import CreateHero from "./components/CreateHero";
import FullHeroInfo from "./components/FullHeroInfo";
import EditHero from "./components/EditHero";
function App() {
  return (
      <Routes>
        <Route path='/' element={<MainLayout/>}>
            <Route index element={<MainPage/>}/>
            <Route path='/createHero' element={<CreateHero/>}/>
            <Route path='/hero/:id' element={<FullHeroInfo/>}/>
            <Route path='/edit/:id' element={<EditHero/>}/>
        </Route>
      </Routes>

  );
}

export default App;
