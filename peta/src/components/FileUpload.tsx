import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>(
    'idle',
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setErrorMessage(null);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      setUploadStatus('uploading');
      setErrorMessage(null);
      const token = localStorage.getItem('token');

      const response = await axios.post(`http://localhost:9000/api/v1/process`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setUploadStatus('success');
      console.log('Upload successful:', response.data);
    } catch (error: any) {
      setUploadStatus('error');
      setErrorMessage(error.response?.data?.error || 'An error occurred during upload.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload PDF</h2>

      <div
        className={`w-full h-40 border-2 ${
          selectedFile ? 'border-green-500' : 'border-dashed border-gray-300'
        } rounded-lg flex items-center justify-center mb-4 bg-white`}
      >
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center text-gray-600 cursor-pointer"
        >
          {selectedFile ? (
            <>
              <p className="text-sm font-medium">Selected File:</p>
              <p className="text-sm text-green-600">{selectedFile.name}</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium">Drag & drop a PDF file here</p>
              <p className="text-xs text-gray-500">or click to select a file</p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      <button
        onClick={handleFileUpload}
        disabled={uploadStatus === 'uploading'}
        className={`px-4 py-2 text-white font-semibold rounded-md ${
          uploadStatus === 'uploading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
      </button>

      {uploadStatus === 'success' && (
        <p className="text-green-500 text-sm mt-4">File uploaded successfully!</p>
      )}
      {uploadStatus === 'error' && (
        <p className="text-red-500 text-sm mt-4">Failed to upload file. Please try again.</p>
      )}
    </div>
  );
};

export default FileUpload;
