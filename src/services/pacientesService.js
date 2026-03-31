import { pacientesRepository } from '../repositories/pacientesRepository'

export const pacientesService = {
  getPacientes: async()=>{
    return pacientesRepository.getAll()
  }
}