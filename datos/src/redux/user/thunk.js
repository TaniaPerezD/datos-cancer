import Swal from 'sweetalert2'
import { mainApi } from '../../axios'
import { setUser, startLoadingUser } from './userSlice'

export const loginUser = (email, password) => {
  return async(dispatch) => {

    dispatch(startLoadingUser())
    await mainApi.post('/', { //Aca hay que poner el endpoint o la ruta jsja
      email,
      password
    })
    .then(resp => {
      dispatch(setUser(resp.data))
      localStorage.setItem("user-ptin", resp.data.name)
      localStorage.setItem("token-ptin", resp.data.token)
      localStorage.setItem("rol-ptin", resp.data.rol)
      localStorage.setItem("uid-ptin", resp.data.uid)
    })
    .catch(err => {
      Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: "Usuario o contraseña incorrectos"
      })
    })
  }
}