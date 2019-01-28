import React from "react";
import "antd/dist/antd.css";
import { Upload, Icon, message } from "antd";

const props = {
  accept: ".csv",
  customRequest: (obj: any) => {
    console.log("customRequest", obj);
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", obj.filename, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          console.log(allText);
        }
      }
    };
    rawFile.send(null);
    obj.onSuccess();
  },
  onChange(info: any) {
    console.log("onChange", info.file.status, info);
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};

class UploadComponent extends React.Component {
  render() {
    return (
      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Нажмите или перетащите файл в эту область, чтобы загрузить
        </p>
        <p className="ant-upload-hint">
          Никакие данные не передаются на сервер. Вся обработка происходит
          строго в вашем браузере.
        </p>
      </Upload.Dragger>
    );
  }
}

export default UploadComponent;
