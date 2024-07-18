import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./context/store";
import Root from "./pages/Root";
import ProtectedRoute from "./pages/ProtectedRoute";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import "./index.css";
import MainBoard from "./pages/MainBoard";
import Profile from "./pages/Profile";
import AddFeedback from "./pages/AddFeedback";
import Feedback from "./pages/Feedback";
import EditFeedback from "./pages/EditFeedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <MainBoard />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/add-feedback",
    element: <AddFeedback />,
  },
  {
    path: "/feedback/:id",
    element: <Feedback />,
  },
  {
    path: "/edit-feedback/:id",
    element: <EditFeedback />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
