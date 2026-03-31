import estudios from "../../data/mock/estudios";
import pacientes from "../../data/mock/pacientes"
import informes from "../../data/mock/informes"

export const estudiosRepositoryMock = {
  getAll: async () => {
    return estudios.map(estudio => {
      
      const paciente = pacientes.find(paciente => (paciente["id_sysmedi01"] === estudio["rela_sysmedi01"]))
      
      const cantidadInformesDelEstudio = informes.filter(informe => informe["rela_sysmedi05"] === estudio["id_sysmedi05"]).length

      return {
        ...estudio,
        "syspers01_nombre_completo": paciente["syspers01_nombre_completo"],
        "syspers01_dni": paciente["syspers01_dni"],
        "sysmedi05_cantidad_informes": cantidadInformesDelEstudio
      }
    })
  }
}