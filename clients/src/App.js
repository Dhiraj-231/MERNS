import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Headers/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import NewPost from "./components/NewPost/NewPost";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserProfile from "./components/UserProfile/UserProfile";
import Search from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />
        <Route path="/newPost" element={isAuthenticated ? <NewPost /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/updateProfile" element={isAuthenticated ? <UpdateProfile /> : <Login />} />
        <Route path="/user/updatePassword" element={isAuthenticated ? <UpdatePassword /> : <Login />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={< ResetPassword />} />
        <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Login />} />
        <Route path="*" element={<NotFound/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;