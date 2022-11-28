import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Admin from "./pages/Admin";
import User from "./pages/User";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:5000");

const getAuth = () => {
  const user = localStorage.getItem("token");
  return user;
};

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Authorization />}></Route>

        <Route
          path="/admin"
          element={
            <RequireAuth redirectTo="/login">
              <Admin socket={socket} />
            </RequireAuth>
          }
        />
        <Route exact path="/user" element={<User socket={socket} />}></Route>
        <Route
          exact
          path="*"
          element={<Navigate replace to="/login" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
