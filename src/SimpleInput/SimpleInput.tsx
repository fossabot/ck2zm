import React from "react";

import { saveAs } from "file-saver";

import Papa from "papaparse";

function SimpleInput() {
  let fileReader: FileReader | undefined;

  const handleFileRead = (ev: ProgressEvent) => {
    // console.log("handleFileRead", ev, fileReader);
    if (fileReader) {
      const content = fileReader.result;
      if (typeof content === "string") {
        // console.log(content);
        const csvObject = Papa.parse(content);
        console.log(csvObject);
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        // saveAs(blob, "export.csv");
      } else {
        console.error("File is empty");
      }
    }
  };

  const handleFileChosen = (file: any) => {
    // console.log("handleFileChosen", file);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("handleInputChange", e);
    if (e && e.target && e.target.files) {
      handleFileChosen(e.target.files[0]);
    }
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={handleInputChange} />
    </>
  );
}

export default SimpleInput;
