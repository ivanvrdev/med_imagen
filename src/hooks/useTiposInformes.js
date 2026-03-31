import React, { useState, useEffect } from 'react'
import { tiposInformesService } from '../services/tiposInformesService'

const useTiposInformes = () => {
  
  const [tiposInformes, setTiposInformes] = useState([])
  
  useEffect(()=>{
    tiposInformesService.getTiposInformes().then(setTiposInformes)
  }, [])

  return {tiposInformes}
}

export default useTiposInformes