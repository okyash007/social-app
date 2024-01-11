import { useState } from "react";
import Body from "./Body";
import { Toaster } from "sonner";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import ChatPage from "./pages/ChatPage";
import AllChats from "./pages/AllChats";

function App() {
  const user = useSelector((store) => store.app.user);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/landing",
          element: <Landing />,
        },
        {
          path: "/",
          element: user ? <Home /> : <Navigate to="/landing" />,
        },
        {
          path: "/profile/:username",
          element: user ? <ProfilePage /> : <Navigate to="/landing" />,
        },
        {
          path: "/create",
          element: user ? <CreatePost /> : <Navigate to="/landing" />,
        },
        {
          path: "/post/:id",
          element: user ? <Post /> : <Navigate to="/landing" />,
        },
        {
          path: "/chat",
          element: user ? <AllChats /> : <Navigate to="/landing" />,
        },
        {
          path: "/chat/:id",
          element: user ? <ChatPage /> : <Navigate to="/landing" />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster
        theme="dark"
        dir="rtl"
        offset={0}
        toastOptions={{
          unstyled: true,
        }}
      />
    </>
  );
}

export default App;
