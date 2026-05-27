import { useState, useEffect } from "react";
import api from "../services/api";

function ProductForm({ onProductCreated, produtoEditando, setProdutoEditando }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (produtoEditando) {
    setName(produtoEditando.name);
    setQuantity(produtoEditando.quantity);
    setPrice(produtoEditando.price);
  } else {
    setName("");
    setQuantity("");
    setPrice("");
  }
}, [produtoEditando]);

  async function handleSubmit(e) {
    e.preventDefault();
        setLoading(true);
    try {
  if (produtoEditando) {
    await api.put(`/products/${produtoEditando.id}`, {
      name,
      quantity: Number(quantity),
      price: Number(
  price.replace(",", "."))
    });
    
    setMessage("Produto atualizado com sucesso 🚀");
    setProdutoEditando(null);
  } else { await new Promise(res => setTimeout(res, 1000));
    await api.post("/products", {
      name,
      quantity: Number(quantity),
      price: Number(
  price.replace(",", "."))
    });

    setMessage("Produto criado com sucesso ✅");
  }

  setName("");
  setQuantity("");
  setPrice("");
  onProductCreated();

  setTimeout(() => setMessage(""), 2000);
  
} catch (err) {
  setMessage(err.response?.data?.error || "Erro ao salvar produto ❌");

  setTimeout(() => setMessage(""), 2000);
  
} finally {
    setLoading(false);
    }
}

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>{produtoEditando ? "Editar Produto" : "Criar Produto"}</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantidade" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço" />

      <button type="submit" disabled={loading}>
  {loading 
    ? "Salvando..." 
    : produtoEditando 
      ? "Atualizar" 
      : "Criar"}
</button>
         {produtoEditando && (
      <button
        type="button"
        onClick={() => setProdutoEditando(null)}
      >
        ❌ Cancelar
      </button>
    )}

      {message && <p>{message}</p>}
    </form>
  );
}

export default ProductForm;