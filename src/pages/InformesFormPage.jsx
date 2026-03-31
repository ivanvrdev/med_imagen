import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Paper,
  Typography,
  TextField,
  Box,
  MenuItem
} from '@mui/material'
import { useParams } from 'react-router'

import useSesion from '../hooks/useSesion'
import useTiposInformes from '../hooks/useTiposInformes'
import {informesService} from '../services/informesService'
import { getCurrentDate } from '../utils/dateUtils'

import ReactQuillEditor from '../components/ReactQuillEditor'
import PdfGridLayout from '../components/Pdfgridlayout'

const initialForm = {
  "rela_syscore01": "",
  "syscore01_username": "",
  "sysmedi07_fecha_alta": "",
  "rela_sysmedi08": "",
  "sysmedi07_contenido": "",
  "sysmedi12_list": [],
  "sysmedi11_list": [],
}

const InformesFormPage = () => {
  
  const sesion = useSesion().sesion
  const tiposInformes = useTiposInformes().tiposInformes
  
  const [form, setForm] = useState(initialForm)
  
  const params = useParams()

  
  useEffect(()=>{
    
    const handleFormValues = (formValues) => {
      setForm(formValues)
    }
    
    if(params["id_sysmedi07"]){
      informesService.getInformeById(params["id_sysmedi07"])
      .then(handleFormValues)
    }else{
      handleFormValues({
        ...form,
        "rela_syscore01": sesion["id_syscore01"],
        "syscore01_username": sesion["syscore01_username"],
        "sysmedi07_fecha_alta": getCurrentDate(),
      })
    }
  
  }, [params, sesion, form])

  // useEffect(()=>{
  //   console.log(form)
  // }, [form])

  if(!form) return null

  return (
    <Container>
      <Paper sx={{marginTop: "10px"}}>
        <Typography variant='h6'>
          {params["id_sysmedi07"] ? "Editar" : "Agregar"} Informe
        </Typography>
        <Box
          component="form"
          sx={{ 
            '& .MuiTextField-root': { m: 1, width: '45ch' }, 
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            disabled
            name='syscore01_username'
            label="Usuario de alta"
            defaultValue={form["syscore01_username"]}
          />
          <TextField 
            disabled
            name='sysmedi07_fecha_alta'
            label="Fecha de alta"
            type='date'
            defaultValue={form["sysmedi07_fecha_alta"]}
          />
        </Box>
        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '92ch' } }}
        >
          <TextField
            select
            name="rela_sysmedi08"
            label="Tipo de Informe"
            value={form["rela_sysmedi08"]}
          >
            {tiposInformes?.map(tipo => (
              <MenuItem key={tipo["id_sysmedi08"]} value={tipo["id_sysmedi08"]}>
                {tipo["sysmedi08_descripcion"]}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <ReactQuillEditor 
          defaultValue={form["sysmedi07_contenido"]}
        />
      </Paper>
      <PdfGridLayout 
        defaultPages={form["sysmedi12_list"]}
      />
    </Container>
  )
}

export default InformesFormPage