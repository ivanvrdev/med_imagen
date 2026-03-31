import React, { useState } from 'react'
import { sesionService } from '../services/sesionService'

const useSesion = () => {
  
  const [sesion] = useState(sesionService.getSesion())

  return {sesion}
}

export default useSesion