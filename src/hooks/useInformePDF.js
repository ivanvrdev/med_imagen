import {useState, useEffect} from 'react'
import {informesService} from '../services/informesService'

const useInformePDF = (params) => {
  
  const [informe, setInforme] = useState(null)

  useEffect(()=>{
    if(params["id_sysmedi07"]){
      informesService.getInformeParaPDF(params["id_sysmedi07"]).then(setInforme)
    }
  }, [params])

  useEffect(()=>{
    console.log(informe)
  }, [informe])

  return {informe}
}

export default useInformePDF