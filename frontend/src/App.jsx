import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage.jsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout.jsx";
import ChatPage from "./pages/chat/ChatPage.jsx";
import AlbumPage from "./pages/album/AlbumPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={ <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} /> }/>
        <Route path="/auth-callback" element={ <AuthCallbackPage /> } />

        <Route path="/admin" element={ <AdminPage /> } />
        <Route element={ <MainLayout/> } >
          <Route path="/" element={ <HomePage /> } />
          <Route path="/chat" element={ <ChatPage /> } />
          <Route path="/albums/:albumId" element={ <AlbumPage /> } />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
