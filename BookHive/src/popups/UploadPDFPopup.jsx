// filepath: d:\Byteverse final\version1.0\version1.0\client\src\popups\UploadPDFPopup.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadPDF } from "../store/slices/pdfSlice";

const UploadPDFPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUploadPDF = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdfFile);
    dispatch(uploadPDF(formData));
  };

  return (
    <div className="popup-container">
      <form onSubmit={handleUploadPDF}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Upload PDF:</label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPDFPopup;
