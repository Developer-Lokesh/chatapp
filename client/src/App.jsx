import { BrowserRouter, Route, Routes } from "react-router-dom";
import Leftside from "./components/Leftside";
import Rightside from "./components/Rightside";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex h-screen">
                <Leftside />
                <Rightside />
              </div>
            }
          />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
};

export default App;
