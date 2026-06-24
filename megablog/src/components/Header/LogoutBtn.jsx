import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../feature/authSlice"

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()))
  }

  return (
    <button
      onClick={logoutHandler}
      className="w-full rounded-full px-5 py-2 text-sm font-medium text-red-400
        transition duration-200 hover:bg-red-500/10 hover:text-red-300 md:w-auto"
    >
      Logout
    </button>
  )
}

export default LogoutBtn