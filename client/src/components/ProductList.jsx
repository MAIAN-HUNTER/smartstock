import { useEffect, useState } from "react";
import api from "../services/api";

function ProductList({ onEdit, setProducts: updateProducts }) {
  const [products, setProducts] = useState([]);
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("estoque");

  async function fetchProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      if (updateProducts) {
        updateProducts(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  fetchProducts();
}, []);

  const produtosFiltrados = products.filter((produto) =>
    produto.name.toLowerCase().includes(busca.toLowerCase())
  );

  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordem === "nome") {
      return a.name.localeCompare(b.name);
    }

    if (ordem === "preco") {
      return a.price - b.price;
    }

    return a.quantity - b.quantity;
  });

  const totalProdutos = products.length;

const itensCriticos = products.filter((p) => p.quantity <= 5).length;

const valorTotalEstoque = products.reduce((total, p) => {
  return total + p.price * p.quantity;
}, 0);

  return (
    <div>
      <h2>Produtos</h2>
      <div className="metrics">
  <div className="metric-card">
    <h3>📦 Produtos</h3>
    <p>{totalProdutos}</p>
  </div>

  <div className="metric-card">
    <h3>🔴 Críticos</h3>
    <p>{itensCriticos}</p>
  </div>

  <div className="metric-card">
    <h3>💰 Estoque</h3>
   <p>
  R$ {valorTotalEstoque.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}
</p>
  </div>
</div>

      <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
        <option value="estoque">Ordenar por Estoque</option>
        <option value="nome">Ordenar por Nome</option>
        <option value="preco">Ordenar por Preço</option>
      </select>

      <input
        type="text"
        placeholder="🔍 Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {produtosOrdenados.map((p) => {
        let status = "";

        if (p.quantity <= 5) {
          status = "🔴 Crítico";
        } else if (p.quantity <= 10) {
          status = "🟡 Baixo";
        } else {
          status = "🟢 Normal";
        }

       return (

        
  <div key={p.id} className="product-card">
    <p><strong>{p.name}</strong></p>
    <p>Quantidade: {p.quantity}</p>
    <p>
  Preço: R$ {Number(p.price).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}
</p>
    <p>{status}</p>

    <div className="actions">
      <button onClick={() => onEdit(p)}>Editar</button>
      <button onClick={() => handleDelete(p.id)}>Deletar</button>
    </div>
  </div>

  
);
      })}

      {produtosOrdenados.length === 0 && (
        <p>🚫 Nenhum produto encontrado</p>
      )}
    </div>
  );
}

export default ProductList;