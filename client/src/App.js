import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategory";
import CategoryDetail from "./components/CategoryDetail";
import EditCategory from "./components/EditCategory";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route default path="/" element={<Home />} />
          <Route
            path="/:username"
            element={
              <CategoryList
                categories={categories}
                setCategories={setCategories}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
              />
            }
          />
          <Route path="/new" element={<AddCategory user={user} />} />
          <Route
            path="/category/:id"
            element={<CategoryDetail user={user} />}
          />
          <Route
            path="/category/edit/:id/"
            element={<EditCategory user={user} />}
          />
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
