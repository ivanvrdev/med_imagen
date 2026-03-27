import { 
  IconButton,
} from '@mui/material'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useNavigate } from 'react-router';
import { useEstudios } from '../hooks/useEstudios'
import { formateDate } from '../utils/dateUtils'
import GridWithModal from '../components/GridWithModal';

const EstudiosPage = () => {
  
  const estudios = useEstudios().estudios

  const navigate = useNavigate()
    
  //To do: Componentes reutilizables de acciones de la grilla
  const columns = [
    {
      field: 'uuid', 
      headerName: 'ID', 
      width: 100
    },
    {
      field: 'fechaRealizacion', 
      headerName: 'Fecha', 
      headerAlign: 'center',
      width: 110, 
      align: 'center',
      valueGetter: (value) => `${formateDate(value)}`
    },
    {
      field: 'nombreCompleto', 
      headerName: 'Paciente', 
      width: 200
    },
    {
      field: 'dni', 
      headerName: 'DNI', 
      width: 90
    },
    {
      field: 'tipoDiagnostico', 
      headerName: 'Servicio', 
      width: 120
    },
    {
      field: 'cantidadInformes', 
      headerName: 'Informes', 
      headerAlign: 'center', 
      width: 100, 
      align: 'center',
      renderCell: (params) => (
        <>
          {params.value}
          <IconButton
            color='info'
            onClick={()=>{navigate(`${params.row.uuid}/informes`)}}
          >
            <ContentPasteIcon />
          </IconButton>
        </>
      )
    },
    {
      field: 'usuario', 
      headerName: 'Usuario', 
      width: 90
    },
    {
      field: 'fechaAlta', 
      headerName: 'F. Alta',
      headerAlign: 'center',
      width: 110,
      align: 'center',
      valueGetter: (value) => formateDate(value)
    }
  ]

  return (
    <>
      <GridWithModal 
        label="Estudios"
        columns={columns}
        rows={estudios}
        pathAddForm="agregar"
        pathEditForm="editar/:uuid"
      />
    </>
  )
}

export default EstudiosPage