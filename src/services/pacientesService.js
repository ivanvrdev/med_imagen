import { pacientesRepository } from '../repositories/pacientesRepository'

export const pacientesService = {
  getPacientes: async()=>{
    return pacientesRepository.getAll()
  },
  getPacientesDataGrid: async()=>{
    return pacientesRepository.getAll()
    .then(pacientes => {
      //To do: Mover esta lógica a repository mock de pacientes
      const rowsDataGrid = pacientes.map(paciente => ({
        ...paciente, 
        telefono: paciente.contacto.telefono, 
        email: paciente.contacto.email,
        domicilioFull: `${paciente.domicilio.calle}, ${paciente.domicilio.ciudad}, ${paciente.domicilio.provincia}`
      }))

      return rowsDataGrid
    })
  }
}