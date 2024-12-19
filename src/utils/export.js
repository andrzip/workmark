export function exportToCsv(records, filename) {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Data,Tipo"].concat(
        records.map(record => `${record.date},${record.type}`)
      ).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }