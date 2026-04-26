import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leftside from "./components/Leftside";
import Rightside from "./components/Rightside";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatRequest from "./components/ChatRequest";
import ProfileSection from "./components/ProfileSection";
import AddFriend from "./components/AddFriend";
import AuthProvider from "./context/AuthProvider";
import FriendProvider from "./context/FriendProvider";
import MessageProvider from "./context/MessageProvider";
import SocketProvider from "./context/SocketProvider";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <FriendProvider>
              <MessageProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* <Route element={<ProtectedRoute />}> */}
                    <Route
                      path="/"
                      element={
                        <div className="flex h-screen">
                          <Leftside />
                          <Rightside />
                        </div>
                        // <MainContainer/>
                      }
                    />
                    {/* <Route path="/message" element={<Rightside />} /> */}
                    <Route path="/chat-request" element={<ChatRequest />} />
                    <Route path="/profile" element={<ProfileSection />} />
                    <Route path="/add-friend" element={<AddFriend />} />
                  {/* </Route> */}
                </Routes>
              </MessageProvider>
            </FriendProvider>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
