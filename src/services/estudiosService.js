import { estudiosRepository } from '../repositories/estudiosRepository'

export const estudiosService = {
  getEstudios: async () => {
    return estudiosRepository.getAll()
  } 
}