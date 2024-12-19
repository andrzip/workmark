import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SummaryPage from "./pages/SummaryPage";
import './App.css';

function App() {
  const [records, setRecords] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  // Carrega os dados do localStorage quando o componente é montado
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("records")) || [];
    const storedMonth = localStorage.getItem("currentMonth") || new Date().toISOString().slice(0, 7);
    setRecords(storedRecords);
    setCurrentMonth(storedMonth);
  }, []);

  // Salva os dados no localStorage sempre que há alteração
  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
    localStorage.setItem("currentMonth", currentMonth);
  }, [records, currentMonth]);

  const addRecord = (date, type) => {
    setRecords([...records, { date, type }]);
  };

  const deleteRecord = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  const editRecord = (index, newRecord) => {
    const updatedRecords = [...records];
    updatedRecords[index] = newRecord;
    setRecords(updatedRecords);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Registrar</Link>
        <Link to="/summary" className="nav-link">Resumo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<RegisterPage onAddRecord={addRecord} />} />
        <Route 
          path="/summary" 
          element={<SummaryPage 
            records={records} 
            currentMonth={currentMonth} 
            setCurrentMonth={setCurrentMonth} 
            onDeleteRecord={deleteRecord} 
            onEditRecord={editRecord} 
          />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
