import React from "react";
import { exportToCsv } from "../utils/export";
import "../pages/SummaryPage.css";

function SummaryPage({ records, currentMonth, setCurrentMonth, onDeleteRecord, onEditRecord }) {
  const filteredRecords = records.filter(record => record.date.startsWith(currentMonth));

  const fullDays = filteredRecords.filter(record => record.type === "full").length;
  const halfDays = filteredRecords.filter(record => record.type === "half").length;

  const totalMonthly = filteredRecords.reduce((sum, record) => {
    return sum + (record.type === "full" ? 50 : 25);
  }, 0);

  const totalWorked = records.reduce((sum, record) => {
    return sum + (record.type === "full" ? 50 : 25);
  }, 0);

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este registro?")) {
      onDeleteRecord(index);
    }
  };

  const handleEdit = (index) => {
    const date = prompt("Digite a nova data (YYYY-MM-DD):", filteredRecords[index].date);
    const type = prompt("Digite o novo tipo (full/half):", filteredRecords[index].type);
    if (date && type) {
      onEditRecord(index, { date, type });
    }
  };

  const handleExport = () => {
    exportToCsv(filteredRecords, "trabalhos.csv");
  };

  return (
    <div className="container">
      <div className="page">
        <h1 className="title">Registros</h1>
        <label className="form-label">
          Mês:
          <input
            type="month"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="form-input"
          />
        </label>
        <ul className="summary-list">
            {filteredRecords.map((record, index) => (
              <li key={index} className="summary-item">
                <span className="summary-date">{record.date}</span>
                <span className="summary-type">{record.type === "full" ? "Diária" : "Meia Diária"}</span>
                <button onClick={() => handleEdit(index)} className="summary-button">Editar</button>
                <button onClick={() => handleDelete(index)} className="summary-button delete">Excluir</button>
              </li>
            ))}
          </ul>
        <button onClick={handleExport} className="form-button export-button">Exportar para Planilha</button>
      </div>

      <div className="page">
      <h1 className="title">Resumo</h1>
      <div className="summary-section">
        <div className="summary-box">
          <h3>Dias Trabalhados</h3>
          {fullDays + halfDays} dias
        </div>

        <div className="summary-box">
          <h3>Ganhos</h3>
          <ul>
            <li><strong>Diárias Inteiras:</strong> {fullDays} (R${fullDays * 50})</li>
            <li><strong>Meias Diárias:</strong> {halfDays} (R${halfDays * 25})</li>
            <li><strong>Total Mensal:</strong> R${totalMonthly}</li>
          </ul>
        </div>
      </div>

      <h2 className="summary-total">Total Ganho: R${totalWorked}</h2>
    </div>
    </div>
  );
}

export default SummaryPage;
