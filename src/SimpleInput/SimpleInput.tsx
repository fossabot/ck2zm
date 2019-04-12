import React from "react";

import { saveAs } from "file-saver";

import Papa from "papaparse";

const handleFileRead = (progressEvent: ProgressEvent) => {
  const fileReader = progressEvent.target as FileReader;

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

const handleFileChosen = (file: Blob) => {
  const fileReader = new FileReader();
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // console.log("handleInputChange", e);
  if (e && e.target && e.target.files) {
    const file = e.target.files[0];
    handleFileChosen(file);
  }
};

export default function SimpleInput() {
  return (
    <>
      <input type="file" accept=".csv" onChange={handleInputChange} />
    </>
  );
}
