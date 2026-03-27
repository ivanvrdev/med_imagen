import React from 'react'
import GridWithModal from '../components/GridWithModal'
import {usePacientes} from '../hooks/usePacientes'

const PacientesPage = () => {

  const pacientes = usePacientes().pacientes

  const columns = [
    {
      field: 'uuid',
      headerName: 'ID',
      width: 100
    },
    {
      field: 'dni',
      headerName: 'DNI',
      width: 100
    },
    {
      field: 'nombreCompleto', 
      headerName: 'Nombre y Apellido', 
      width: 200 
    },
    {
      field: 'obraSocialPrincipal', 
      headerName: 'Obra Social', 
      width: 120 
    },
    {
      field: 'telefono', 
      headerName: 'Teléfono',
      headerAlign: 'center', 
      width: 150,
      align: 'center' 
    },
    {
      field: 'email',
      headerName: 'Correo Electrónico', 
      width: 225
    },
    {
      field: 'domicilioFull',
      headerName: 'Domicilio',
      width: 300
    }
  ]

  return (
    <>
      <GridWithModal
        label="Pacientes"
        columns={columns}
        rows={pacientes}
        pathAddForm="agregar"
        pathEditForm="editar/:uuid"
      />
    </>
  )
}

export default PacientesPage