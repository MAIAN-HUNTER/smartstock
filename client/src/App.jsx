import { useState, useEffect } from "react";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import "./App.css";

function App() {

  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  const [produtoEditando, setProdutoEditando] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {

  const handleBeforeUnload = (event) => {

    localStorage.removeItem("token");

    event.preventDefault();

    event.returnValue = "";
  };

  window.addEventListener(
    "beforeunload",
    handleBeforeUnload
  );

  return () => {
    window.removeEventListener(
      "beforeunload",
      handleBeforeUnload
    );
  };

}, []);

  function handleReload() {
    setReload(!reload);
  }

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {

    localStorage.removeItem("token");

    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container">

      <h1>📦 SmartStock</h1>

      <button onClick={handleLogout}>
        Logout
      </button>
        <Dashboard products={products} />
      <div className="card">
        
        <ProductForm
          onProductCreated={handleReload}
          produtoEditando={produtoEditando}
          setProdutoEditando={setProdutoEditando}
        />
      </div>

      <div className="card">
        <ProductList
          key={reload}
          onEdit={setProdutoEditando}
          setProducts={setProducts}
        />
      </div>

    </div>
  );
}

export default App;