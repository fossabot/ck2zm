/**
 * Export and download passed string as `.csv` file
 */
export default function downloadCsv(str:string, fileName='export.csv') {
  let csvData = new Blob([str], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // For IE11 only
    navigator.msSaveBlob(csvData, fileName);
  } else {
    // For other browsers
    let csvURL = window.URL.createObjectURL(csvData);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", fileName);
    tempLink.click();
  }
 
}
