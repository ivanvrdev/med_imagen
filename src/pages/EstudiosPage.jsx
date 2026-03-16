import React from 'react'
import { useEstudios } from '../hooks/useEstudios'
import { 
  Typography,
  Container,
  Paper
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  {field: 'id', headerName: 'ID', width: 70 },
  {field: 'fechaRealizacion', headerName: 'Fecha', with: 70},
  {field: 'nombreCompleto', headerName: 'Paciente', with: 70},
  {field: 'dni', headerName: 'DNI', with: 70},
  {field: 'tipoDiagnostico', headerName: 'Servicio', with: 70},
  {field: 'cantidadInformes', headerName: 'Informes', with: 70, type: 'number'},
  {field: 'usuario', headerName: 'Usuario', with: 70},
  {field: 'fechaAlta', headerName: 'F. Alta', with: 70}
]

const paginationModel = { page: 0, pageSize: 5 };

const EstudiosPage = () => {
  
  const estudios = useEstudios().estudios
  
  return (
   <Container>
      <Typography
        component='div'
        variant='h6'
        align='left'
      >
        Estudios
      </Typography>
      <Paper
        sx={{height: 400, width: '100%'}}
      >
        <DataGrid
          rows={estudios}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          showToolbar
        />
      </Paper>
    </Container>
  )
}

export default EstudiosPage