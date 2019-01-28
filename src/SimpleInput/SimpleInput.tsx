import React from "react";

class SimpleInput extends React.Component {
  fileReader: FileReader | undefined;

  handleFileRead = (ev: ProgressEvent) => {
    // console.log("handleFileRead", ev, this.fileReader);
    if (this.fileReader) {
      const content = this.fileReader.result;
      if (typeof content === "string") {
        console.log(content);
      } else {
        console.error("File is empty");
      }
    }
  };

  handleFileChosen = (file: any) => {
    // console.log("handleFileChosen", file);
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(file);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("handleInputChange", e);
    if (e && e.target && e.target.files) {
      this.handleFileChosen(e.target.files[0]);
    }
  };

  render() {
    return (
      <>
        <input type="file" accept=".csv" onChange={this.handleInputChange} />
      </>
    );
  }
}

export default SimpleInput;
