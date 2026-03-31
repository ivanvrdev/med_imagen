import { tiposInformesRepository } from '../repositories/tiposInformesRepository'

export const tiposInformesService = {
  getTiposInformes: async () => {
    return tiposInformesRepository.getAll()
  } 
}