import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import PacientesPage from './pages/PacientesPage'
import EstudiosPage from './pages/EstudiosPage'
import Navbar from './components/layout/Navbar'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<HomePage />}/>
          <Route path='pacientes' element={<PacientesPage />}/>
          <Route path='estudios' element={<EstudiosPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
