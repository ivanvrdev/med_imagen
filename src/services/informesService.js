import { informesRepository } from '../repositories/informesRepository'

export const informesService = {
  getInformes: async () => {
    return informesRepository.getAll()
  },
  getDataGridRowsInformes: async () => {
    return informesRepository.getAllDataGridRows()
  }
}