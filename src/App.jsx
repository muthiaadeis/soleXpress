import React, { Suspense } from "react";
import "./assets/tailwind.css";
// import Dashboard from "./pages/Dashboard";
// import News from "./pages/News";
// import FAQPage from "./pages/FAQPage";
// import CareerPage from "./pages/CareerPage";

import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AboutUs from "./pages/AboutUs";
import OurTim from "./pages/OurTim";
// import ErrorPage from "./pages/ErrorPage";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";
// import AuthLayout from "./layouts/AuthLayout";
// import MainLayout from "./layouts/MainLayout";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const News = React.lazy(() => import("./pages/News"))
const FAQPage = React.lazy(() => import("./pages/FAQPage"))
const CareerPage = React.lazy(() => import("./pages/CareerPage"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))

function App() {
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/news" element={<News />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/our-team" element={<OurTim />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
