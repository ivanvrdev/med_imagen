import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import PacientesPage from './pages/PacientesPage'
import PacientesFormPage from './pages/PacientesFormPage'
import EstudiosPage from './pages/EstudiosPage'
import Navbar from './components/layout/Navbar'
import EstudiosFormPage from './pages/EstudiosFormPage'
import InformesPage from './pages/InformesPage'
import InformesFormPage from './pages/InformesFormPage'
import InformePDFPage from './pages/InformePDFPage'
import Page404 from './pages/Page404'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<HomePage />}/>
          <Route path='pacientes'>
            <Route index element={<PacientesPage />}/>
            <Route path='agregar' element={<PacientesFormPage />}/>
            <Route path='editar/:id_sysmedi01' element={<PacientesFormPage />}/>
          </Route>
          <Route path='estudios'>
            <Route index element={<EstudiosPage />}/>
            <Route path='agregar' element={<EstudiosFormPage />}/>
            <Route path='editar/:id_sysmedi05' element={<EstudiosFormPage />}/>
            <Route path=':id_sysmedi05/informes'>
              <Route index element={<InformesPage />} />
              <Route path='editar/:id_sysmedi07' element={<InformesFormPage />} />
              <Route path='agregar' element={<InformesFormPage />} />
            </Route>
          </Route>
          <Route path='*' element={<Page404/>}/>
        </Route>
        <Route path='informe/:id_sysmedi07' element={<InformePDFPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
