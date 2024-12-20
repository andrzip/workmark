import React, { useState } from "react";
import "../pages/RegisterPage.css";

function RegisterPage({ onAddRecord }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [type, setType] = useState("full");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) {
      onAddRecord(date, type);
      setDate(today);
      setType("full");
      alert("Serviço registrado com sucesso!");
    }
  };

  return (
    <div className="page">
      <h1 className="title">Registrar Trabalho</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Data:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <div className="form-buttons">
          <button 
            type="button" 
            className={`form-button ${type === 'full' ? 'selected' : ''}`}
            onClick={() => setType("full")}
          >
            Diária (R$50)
          </button>
          <button 
            type="button" 
            className={`form-button ${type === 'half' ? 'selected' : ''}`}
            onClick={() => setType("half")}
          >
            Meia Diária (R$25)
          </button>
        </div>
        <button type="submit" className="form-button">Adicionar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
