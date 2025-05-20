import { GiSonicShoes } from "react-icons/gi";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div id="sidebar-logo" className="justify-center flex items-center mt-6">
          <h1 className="font-podkova-semibold font-semibold text-3xl text-gray-800">
            SoleXpress
          </h1>
        </div>

        <Outlet />

        <p className="font-podkova text-center text-sm text-gray-500 mt-6">
          © 2025 SoleXpress Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
