import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);

  const { loading, login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login(username, password);
  }
  return (
    <div className="text-white">
      <div className="load-animate w-full h-[100vh] mob:h-[90vh] flex items-center xs:px-0 xs:items-end xs:pb-[180px] relative bg-black">
        <div className="load-animate w-[380px] z-10 bg-black/70 mx-auto lg:w-[430px] rounded-md px-8 pt-16 pb-20 xs:pt-9 shadow-[B6C4B6] shadow-sm border-stone-900 text-white border-2 border-[#4a4a4a] ">
          <h1 className="text-white font-semibold text-3xl">Sign In</h1>
          <form className="mt-[40px]" action="POST" onSubmit={handleSubmit}>
            <input
              className="w-full h-[8vh] xs:h-[6.5vh] rounded-sm bg-[#333333] border-b-[3px] border-gray-300 focus:border-green-500 focus:outline-none p-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              autoComplete="email"
              required
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className="w-full h-[8vh] xs:h-[6.5vh] rounded-sm mt-[25px] bg-[#333333] border-b-[3px] border-t-0 border-l-0 border-r-0 outline-none focus:ring-0 border-gray-300 focus:border-green-500 p-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="email"
                required
              />
              <label
                onClick={() => setshow(!show)}
                className="text-gray-400 absolute top-[40px] right-[17px] cursor-pointer select-none"
              >
                {show ? "Hide" : "Show"}
              </label>
            </div>
            <button className="w-full h-[7vh] bg-cyan-800 rounded-sm mb-4 text-xl font-medium mt-[25px] border-2 border-[#4a4a4a]">
              Login
            </button>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2 mt-2">
                <Link to="/Signup" className="flex gap-2 items-center">
                  <p className="font-light">{"Don't have an account?"}</p>
                  <p className="font-medium text-gray-300 cursor-pointer duration-150 text-lg hover:text-white">
                    Register
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
