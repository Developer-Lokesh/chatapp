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
import MainContainer from "./pages/MainContainer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <FriendProvider>
            <Routes>
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </FriendProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
