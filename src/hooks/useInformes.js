import {useState, useEffect} from 'react'
import {informesService} from '../services/informesService'

const useInformes = (idSysMedi05) => {
  
  const [informes, setInformes] = useState([])

  useEffect(()=>{
    informesService.getInformesByRelaSysMedi05(idSysMedi05).then(setInformes)
  }, [idSysMedi05])

  return {informes}
}

export default useInformes