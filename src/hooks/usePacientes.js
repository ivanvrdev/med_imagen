import { useState, useEffect } from "react";
import { pacientesService } from "../services/pacientesService";

export function usePacientes(){
  const [pacientes, setPacientes] = useState([])

  useEffect(()=>{
    pacientesService.getPacientesDataGrid().then(setPacientes)
  }, [])

  return {pacientes}
}