import { BiLogOut } from "react-icons/bi";
import useLogout from "../../../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  function handle_logout() {
    const log = confirm("Do you want to logout??");
    log ? logout() : null;
  }
  return (
    <button
      className="ml-5 mt-5 bg-gray-700 px-3 py-2 btn "
      onClick={handle_logout}
    >
      <div className=" flex gap-1  items-center">
        <BiLogOut className="w-8 h-8 text-white cursor-pointer" />
        <span>Logout</span>
      </div>
    </button>
  );
};
export default LogoutButton;
