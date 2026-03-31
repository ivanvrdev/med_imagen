import { informesRepository } from '../repositories/informesRepository'

export const informesService = {
  getInformes: async () => {
    return informesRepository.getAll()
  },
  getInformesByRelaSysMedi05: async (relaSysMedi05) => {
    return informesRepository.getByRelaSysMedi05(relaSysMedi05)
  },
  getInformeById: async (idSysMedi07) => {
    return informesRepository.getOneById(idSysMedi07)
  },
  getInformeParaPDF: async (idSysMedi07) => {
    return informesRepository.getByOneIdForPDF(idSysMedi07)
  }
}