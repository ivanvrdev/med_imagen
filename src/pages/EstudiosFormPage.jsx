import React from 'react'
import {
  Container,
  Paper,
  Typography
} from '@mui/material'
import { useParams } from 'react-router'

const EstudiosFormPage = () => {
  
  const { dni } = useParams()
  
  return (
    <Container>
      <Paper
        sx={{
          padding: 1
        }}
      >
        <Typography 
          variant="h6" 
          component="div"
          align='left'
        >
          {dni ? "Editar" : "Nuevo"} Estudio
        </Typography>
        
      </Paper>
    </Container>
  )
}

export default EstudiosFormPage