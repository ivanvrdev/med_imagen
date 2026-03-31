import informes from '../../data/mock/informes'
import estudios from '../../data/mock/estudios'
import pacientes from '../../data/mock/pacientes'
// import { formateDate } from '../../utils/dateUtils'

const informesRepositoryMock = {
  getAll: async () => informes,
  getByRelaSysMedi05: async (relaSysMedi05) => {
    const informesDelEstudio = informes.filter(informe => informe["rela_sysmedi05"] === relaSysMedi05)

    return informesDelEstudio
  },
  getOneById: async (idSysMedi07) => {
    const informe = informes.find(informe => informe["id_sysmedi07"] === idSysMedi07)
  
    return informe
  },
  getByOneIdForPDF: async (idSysMedi07) => {
    const informe = informes.find(informe => informe["id_sysmedi07"] === idSysMedi07)
  
    const estudioDelInforme = estudios.find(estudio => estudio["id_sysmedi05"] === informe["rela_sysmedi05"])
    const pacienteDelEstudio = pacientes.find(paciente => paciente["id_sysmedi01"] === estudioDelInforme["rela_sysmedi01"])

    return {
      ...informe,
      "sysmedi05_fecha_realizacion": estudioDelInforme["estudioDelInforme"],
      "syspers01_nombre_completo": pacienteDelEstudio["syspers01_nombre_completo"],
      "syspers01_dni": pacienteDelEstudio["syspers01_dni"],
    }
  }
}

export default informesRepositoryMock