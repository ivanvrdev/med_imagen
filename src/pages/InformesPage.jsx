import React from 'react'
import { IconButton } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
//import { useNavigate } from 'react-router'
import GridWithModal from '../components/GridWithModal'
import useInformes from '../hooks/useInformes'
import { openInNewWindow } from '../utils/windowUtils'

const InformesPage = () => {

  const informes = useInformes().informes
  //const navigate = useNavigate()

  const columns = [
    {
      field: 'idVisible',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 150 
    },
    {
      field: 'fechaInforme',
      headerName: 'Fecha',
      headerAlign: 'center',
      align: 'center',
      width: 120
    },
    {
      field: 'medicoInformante',
      headerName: 'Médico Informante',
      // headerAlign: 'center',
      // align: 'center',
      width: 300
    },
    {
      field: 'medicoEspecialidad',
      headerName: 'Especialidad',
      // headerAlign: 'center',
      // align: 'center',
      width: 220
    },
    {
      field: 'medicoMatricula',
      headerName: 'Matrícula',
      headerAlign: 'center',
      align: 'center',
      width: 150
    },
    {
      field: 'estado',
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      width: 150
    },
  ]

  return (
    <>
      <GridWithModal 
        label="Informes"
        columns={columns}
        rows={informes}
        pathAddForm="agregar"
        pathEditForm="editar/:uuid"
        extraActions={[
          {
            component: (params) => (
              <IconButton
                color='error'
                onClick={()=>{openInNewWindow(`/informe/${params.row.idVisible}`)}}
              >
                <PictureAsPdfIcon />
              </IconButton>
            )
          }
        ]}
      />
    </>
  )
}

export default InformesPage