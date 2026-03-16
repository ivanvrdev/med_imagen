// Proximamente:
// import { userRepositoryMock } from './mock/userRepository.mock'
// import { userRepositoryApi }  from './api/userRepository.api'

// const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// export const userRepository = USE_MOCK
//   ? userRepositoryMock
//   : userRepositoryApi

//--------------------
// Provisorio hasta tener api
import { estudiosRepositoryMock } from "./mock/estudiosRepository.mock";

export const estudiosRepository = estudiosRepositoryMock