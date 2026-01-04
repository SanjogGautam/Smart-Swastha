// components/QRScannerView.js
import React from "react";
import { QrCode, XCircle, CheckCircle } from "lucide-react";
import { QrReader } from "react-qr-reader";

const QRScannerView = ({
  isScannerOpen,
  setIsScannerOpen,
  scannedData,
  scannerError,
  setScannerError,
  onScanResult,
  onScannerError,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Scan Patient QR Code</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Point your camera at the patient's QR code to quickly pull up their
            profile.
          </p>

          {scannedData && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium">Last Scanned Data:</p>
              <p className="text-blue-600 text-sm break-all">{scannedData}</p>
            </div>
          )}

          {scannerError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">Scanner Error:</p>
              <p className="text-red-600 text-sm">{scannerError}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-md bg-gray-200 rounded-lg overflow-hidden relative mb-6">
            {isScannerOpen ? (
              <div className="relative">
                <QrReader
                  onResult={onScanResult}
                  onError={onScannerError}
                  constraints={{ facingMode: "environment" }}
                  scanDelay={500}
                  style={{ width: "100%" }}
                />
                <div className="absolute inset-0 border-2 border-white pointer-events-none">
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-500"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-500"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-500"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-500"></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 bg-gray-100">
                <QrCode className="w-24 h-24 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center">
                  Click "Start Scanner" to begin scanning QR codes
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsScannerOpen((prev) => !prev)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                isScannerOpen
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isScannerOpen ? (
                <>
                  <XCircle className="w-5 h-5 inline mr-2" />
                  Stop Scanner
                </>
              ) : (
                <>
                  <QrCode className="w-5 h-5 inline mr-2" />
                  Start Scanner
                </>
              )}
            </button>

            {scannerError && (
              <button
                onClick={() => setScannerError(null)}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Error
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Scanning Instructions
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
              Ensure good lighting for best scanning results
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
              Hold the QR code steady within the scanner frame
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
              The scanner will automatically detect and process QR codes
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-blue-600" />
              Patient profile will open automatically when found
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRScannerView;
