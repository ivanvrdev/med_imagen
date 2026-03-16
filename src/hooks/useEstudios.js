import { useState, useEffect } from "react";
import { estudiosService } from "../services/estudiosService";

export function useEstudios(){
  const [estudios, setEstudios] = useState([])

  useEffect(()=>{
    estudiosService.getEstudios().then(setEstudios)
  }, [])

  return {estudios}
}