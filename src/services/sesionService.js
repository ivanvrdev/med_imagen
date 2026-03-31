import { sesionRepository } from '../repositories/sesionRepository'

export const sesionService = {
  getSesion: () => sesionRepository.getSesion()
}