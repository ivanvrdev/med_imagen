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
      field: 'sysmedi05_fecha_realizacion', 
      headerName: 'Fecha', 
      headerAlign: 'center',
      width: 110, 
      align: 'center',
      valueGetter: (value) => `${formateDate(value)}`
    },
    {
      field: 'syspers01_nombre_completo', 
      headerName: 'Paciente', 
      width: 200
    },
    {
      field: 'syspers01_dni', 
      headerName: 'DNI', 
      width: 90
    },
    {
      field: 'sysmedi06_descripcion', 
      headerName: 'Servicio', 
      width: 120
    },
    {
      field: 'sysmedi10_nombre', 
      headerName: 'Equipo', 
      width: 120
    },
    {
      field: 'sysmedi05_cantidad_informes', 
      headerName: 'Informes', 
      headerAlign: 'center', 
      width: 100, 
      align: 'center',
      renderCell: (params) => (
        <>
          {params.value}
          <IconButton
            color='info'
            onClick={()=>{navigate(`${params.row.id_sysmedi05}/informes`)}}
          >
            <ContentPasteIcon />
          </IconButton>
        </>
      )
    },
    {
      field: 'syscore01_username', 
      headerName: 'Usuario', 
      width: 90
    },
    {
      field: 'sysmedi05_fecha_alta', 
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
        pathEditForm="editar/:id_sysmedi05"
      />
    </>
  )
}

export default EstudiosPage