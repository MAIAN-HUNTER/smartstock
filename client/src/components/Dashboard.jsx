import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Dashboard({ products }) {

  const itensCriticos = products.filter(
    (p) => p.quantity <= 5
  ).length;

  const itensNormais = products.filter(
    (p) => p.quantity > 5
  ).length;

  const valorTotal = products.reduce(
    (total, p) => total + p.price * p.quantity,
    0
  );

  const pieData = [
    {
      name: "Críticos",
      value: itensCriticos
    },
    {
      name: "Normais",
      value: itensNormais
    }
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>📦 Produtos</h3>
          <p>{products.length}</p>
        </div>

        <div className="dashboard-card">
          <h3>🔴 Críticos</h3>
          <p>{itensCriticos}</p>
        </div>

        <div className="dashboard-card">
          <h3>💰 Estoque</h3>
          <p>
            R$ {valorTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>

      </div>

      <div className="chart-container">

        <h3>📊 Quantidade por Produto</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="quantity" />

          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-container">

        <h3>🧩 Estoque Crítico</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >

              <Cell />

              <Cell />

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Dashboard;