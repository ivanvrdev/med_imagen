import {useState, useEffect} from 'react'
import {informesService} from '../services/informesService'

const useInformes = () => {

  const [informes, setInformes] = useState([])

  useEffect(()=>{
    informesService.getDataGridRowsInformes().then(setInformes)
  }, [])

  return {informes}
}

export default useInformes