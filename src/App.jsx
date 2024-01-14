import { useEffect, useState } from "react";
import Body from "./Body";
import { Toaster } from "sonner";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import ChatPage from "./pages/ChatPage";
import AllChats from "./pages/AllChats";
import UserSetting from "./pages/UserSetting";
import { setUser } from "./store/appSlice";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        try {
          const response = await fetch(
            "https://gitsta.onrender.com/api/v1/user/profile/" + user.username
          );
          const data = await response.json();
          // setData(data);
          dispatch(setUser(data.data));
        } catch (error) {
          // setData(data);
        }
      }

      fetchData();
    }
  }, []);

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
        {
          path: "/settings",
          element: user ? <UserSetting /> : <Navigate to="/landing" />,
        },
        {
          path: "/search",
          element: user ? <SearchPage /> : <Navigate to="/landing" />,
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
