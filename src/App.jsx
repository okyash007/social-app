import { useState } from "react";
import Body from "./Body";
import { Toaster } from "sonner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import ProfilePage from "./pages/ProfilePage";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import ChatPage from "./pages/ChatPage";
import AllChats from "./pages/AllChats";

function App() {
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
          element: <Home />,
        },
        {
          path: "/profile/:username",
          element: <ProfilePage />,
        },
        {
          path: "/create",
          element: <CreatePost />,
        },
        {
          path: "/post/:id",
          element: <Post />,
        },
        {
          path: "/chat",
          element: <AllChats />,
        },
        {
          path: "/chat/:id",
          element: <ChatPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
        <Toaster
          theme="dark"
          dir="rtl"
          offset={0}
          toastOptions={{
            unstyled: true,
          }}
        />
      </Provider>
    </>
  );
}

export default App;
