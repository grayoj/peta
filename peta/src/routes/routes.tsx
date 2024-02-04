import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export type RouteProps<T extends string> = {
  path: T;
  element: JSX.Element;
};

const RouteAdapter = <T extends string>({
  routes,
}: {
  routes: RouteProps<T>[];
}) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default RouteAdapter;

export const routes: RouteProps<string>[] = [
  { path: "/", element: <DashboardPage /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignupForm /> },
];
