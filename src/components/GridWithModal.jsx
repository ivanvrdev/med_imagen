import { useState } from 'react'
import { 
  Typography,
  Box,
  Container,
  Paper,
  Divider,
  Fab,
  Modal,
  IconButton
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router';

import { dataGridConstants } from '../constants/dataGrid'

const paginationModel = { page: 0, pageSize: 10 };

const GridWithModal = ({
  columns, 
  rows,
  pathAddForm,
  pathEditForm, 
  extraActions = [],
  ...props
}) => {

  const [openModal, setOpenModal] = useState(false)
  const [idRegistroModal, setIdRegistroModal] = useState(null)

  const navigate = useNavigate()

  const actionsCol = {
    field: 'id',
    headerName: 'Acciones',
    headerAlign: 'center',
    align: 'center',
    width: 110 + (extraActions.length * 55), 
    renderCell: (params) => (
      <>
        {extraActions.map(({ component }) => component(params))}
        <IconButton
          color='warning'
          onClick={() => {

            const pathArray = pathEditForm.split(":")
            const paramFieldName = pathArray[1]
            const paramFieldValue = params.row[paramFieldName] 

            navigate(pathArray[0]+paramFieldValue)
          }}
        >
          <EditDocumentIcon />
        </IconButton>
        <IconButton
          color='error'
          onClick={() => handleOpenModal(params.value)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </>
    )
  }

  const handleOpenModal = (idRegistro = null) => {
    setOpenModal(true)
    setIdRegistroModal(idRegistro)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setIdRegistroModal(null)
  }

  return (
    <>
      <Container
        sx={{paddingTop: '20px'}}
        // disableGutters
      >
        <Paper
          sx={dataGridConstants.paperStyle}
        >
          <Divider/>
          <DataGrid
            rows={rows}
            columns={
              [actionsCol, ...columns]
            }
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 25, 50, 100]}
            // checkboxSelection
            hideFooterSelectedRowCount
            ignoreDiacritics
            sx={{ border: 0 }}
            showToolbar
            loading={false}//To do: Reemplazar por un estado proximamente
            {...props}
          />
        </Paper>
      </Container>
      <Fab 
        color='success' 
        variant='extended'
        onClick={() => navigate(pathAddForm)}
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
        Agregar
      </Fab>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        // aria-labelledby="formulario-estudios"
        // aria-describedby="formulario-estudios"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography>Id: {idRegistroModal}</Typography>
        </Box>
      </Modal>
    </>
  )
}

export default GridWithModal