import React from 'react'
import GridWithModal from '../components/GridWithModal'
import {usePacientes} from '../hooks/usePacientes'

const PacientesPage = () => {

  const pacientes = usePacientes().pacientes

  const columns = [
    // {
    //   field: 'uuid',
    //   headerName: 'ID',
    //   width: 100
    // },
    {
      field: 'syspers01_dni',
      headerName: 'DNI',
      width: 100
    },
    {
      field: 'syspers01_nombre_completo', 
      headerName: 'Nombre y Apellido', 
      width: 200 
    },
    {
      field: 'sysmedi01_obra_social_principal', 
      headerName: 'Obra Social', 
      width: 120 
    },
    {
      field: 'sysmedi01_telefono_principal', 
      headerName: 'Teléfono',
      headerAlign: 'center', 
      width: 150,
      align: 'center' 
    },
    {
      field: 'sysmedi01_email_principal',
      headerName: 'Correo Electrónico', 
      width: 225
    },
    {
      field: 'sysmedi01_domicilio_principal',
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
        pathEditForm="editar/:id_sysmedi01"
      />
    </>
  )
}

export default PacientesPage