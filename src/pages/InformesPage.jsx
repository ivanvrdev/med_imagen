import React from 'react'
import { IconButton } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { useParams } from 'react-router'
import GridWithModal from '../components/GridWithModal'
import useInformes from '../hooks/useInformes'
import { openInNewWindow } from '../utils/windowUtils'


const InformesPage = () => {

  const params = useParams()

  const informes = useInformes(params["id_sysmedi05"]).informes
  //const navigate = useNavigate()

  const columns = [
    {
      field: 'sysmedi07_fecha_alta',
      headerName: 'Fecha',
      headerAlign: 'center',
      align: 'center',
      width: 120
    },
    {
      field: 'sysmedi07_comprobante',
      headerName: 'Comprobante',
      headerAlign: 'center',
      align: 'center',
      width: 150
    },
    {
      field: 'sysmedi08_descripcion',
      headerName: 'Tipo de Informe',
      // headerAlign: 'center',
      // align: 'center',
      width: 300
    },
    {
      field: 'sysmedi09_descripcion',
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      width: 150
    },
    {
      field: 'syscore01_username',
      headerName: 'Usuario de alta',
      // headerAlign: 'center',
      // align: 'center',
      width: 120
    },
  ]

  return (
    <>
      <GridWithModal 
        label="Informes"
        columns={columns}
        rows={informes}
        pathAddForm="agregar"
        pathEditForm="editar/:id_sysmedi07"
        extraActions={[
          {
            component: (params) => (
              <IconButton
                color='error'
                onClick={()=>{openInNewWindow(`/informe/${params.row.id_sysmedi07}`)}}
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