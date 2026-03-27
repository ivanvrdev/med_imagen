import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import PacientesPage from './pages/PacientesPage'
import EstudiosPage from './pages/EstudiosPage'
import Navbar from './components/layout/Navbar'
import EstudiosFormPage from './pages/EstudiosFormPage'
import InformesPage from './pages/InformesPage'
import InformePDFPage from './pages/InformePDFPage'
import Page404 from './pages/Page404'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<HomePage />}/>
          <Route path='pacientes' element={<PacientesPage />}/>
          <Route path='estudios'>
            <Route index element={<EstudiosPage />}/>
            <Route path='agregar' element={<EstudiosFormPage />}/>
            <Route path='editar/:uuid' element={<EstudiosFormPage />}/>
            <Route path=':uuid/informes'>
              <Route index element={<InformesPage />} />
            </Route>
          </Route>
          <Route path='*' element={<Page404/>}/>
        </Route>
        <Route path='informe/:id' element={<InformePDFPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
