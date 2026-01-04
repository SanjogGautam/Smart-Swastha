// src/pages/QRScannerPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRScannerView from "../components/QRScannerView";

const QRScannerPage = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null); // This will display the MODIFIED ID
  const [scannerError, setScannerError] = useState(null);
  const navigate = useNavigate();

  // Define the new ID you want to display
  const desiredPatientId = "user_DESIRED_NEW_ID_12345";
  const desiredMemberNumber = "DESIRED_MEMBER_XYZ";

  const handleScanResult = (result, error) => {
    if (result) {
      const rawQrText = result.text; // This is the actual data from the QR code

      // --- Modification starts here ---
      // Instead of using rawQrText for display, use your desired IDs
      // You can format it as a JSON string to match the original display style
      const displayData = JSON.stringify({
        patientId: desiredPatientId,
        memberNumber: desiredMemberNumber,
      });
      setScannedData(displayData); // Display the desired ID data
      // --- Modification ends here ---

      try {
        const parsedData = JSON.parse(rawQrText); // Still parse the actual QR data if you need its original values for other logic (e.g., validation)
        const { patientId: actualPatientId, memberNumber: actualMemberNumber } = parsedData;

        console.log("ACTUAL Scanned Patient ID:", actualPatientId);
        console.log("ACTUAL Scanned Member Number:", actualMemberNumber);

        // --- Important: For navigation, decide if you want to use the actual scanned ID
        // --- or your desired ID. The prompt implies you want to navigate with the new ID.
        // For navigation, use the desired IDs
        navigate(`/appointment/${desiredPatientId}/${desiredMemberNumber}`);

        // If you still need to use the actual scanned ID for navigation, use actualPatientId and actualMemberNumber here:
        // navigate(`/appointment/${actualPatientId}/${actualMemberNumber}`);

        // Stop the scanner after any successful scan (even if you're replacing the ID)
        setIsScannerOpen(false);

      } catch (e) {
        setScannerError("Invalid QR code data: Not a valid JSON string.");
        console.error("Error parsing actual QR code data:", e);
        // Optionally, reset scannedData if the actual QR is invalid
        setScannedData(null);
      }
    }

    if (error) {
      console.error("QR Scanner Error:", error);
      // Only set error if it's not the common 'NotFoundException'
      if (error.name !== "NotFoundException") {
        setScannerError(error.message || "An unknown scanner error occurred.");
      }
    }
  };

  const handleScannerError = (error) => {
    console.error("Scanner Error (from onError prop):", error);
    // Be careful with this, as react-qr-reader often throws errors when no QR code is in view.
    // You might want to be more specific with error handling.
    if (error.name !== "NotFoundException") {
      setScannerError(error.message || "An unknown scanner error occurred.");
      setIsScannerOpen(false); // Optionally stop scanner on persistent error
    }
  };

  return (
    <QRScannerView
      isScannerOpen={isScannerOpen}
      setIsScannerOpen={setIsScannerOpen}
      scannedData={scannedData} // This is now set to your desired ID
      scannerError={scannerError}
      setScannerError={setScannerError}
      onScanResult={handleScanResult}
      onScannerError={handleScannerError}
    />
  );
};

export default QRScannerPage;