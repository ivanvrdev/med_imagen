import informes from '../../data/mock/informes'
import { formateDate } from '../../utils/dateUtils'

const informesRepositoryMock = {
  getAll: async () => informes,
  getAllDataGridRows: async () => {
    return informes.map(informe => ({
      id: informe.id,
      idVisible: informe.id,
      fechaInforme: formateDate(informe.estudio.fechaInforme),
      medicoInformante: informe.medicoInformante.nombreCompleto,
      medicoEspecialidad: informe.medicoInformante.especialidad,
      medicoMatricula: informe.medicoInformante.matricula,
      // regionAnatomica: informe.estudio.regionAnatomica,
      estado: informe.estudio.estado
    }))
  }
}

export default informesRepositoryMock