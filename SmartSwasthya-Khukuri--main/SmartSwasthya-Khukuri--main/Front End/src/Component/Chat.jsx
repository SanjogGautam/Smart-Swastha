import React, { useState, useRef, useEffect } from "react";

function Chat({ isOpen: propIsOpen, onClose }) {
  // Determine initial chat open state based on propIsOpen
  // If propIsOpen is explicitly true, start open. Otherwise, start closed.
  const [isChatOpen, setIsChatOpen] = useState(propIsOpen || false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Retrieve API key from environment variables (client-side access)
  // WARNING: Exposing API keys in frontend code is a security risk.
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // This useEffect ensures that if the propIsOpen changes from the parent,
  // the internal state updates.
  useEffect(() => {
    setIsChatOpen(propIsOpen);
  }, [propIsOpen]);

  // Only show the toggle button if `propIsOpen` is not explicitly true
  // This means the parent (e.g., Home.jsx) is controlling its visibility,
  // allowing it to be initially closed and toggled.
  const showToggleButton = propIsOpen === false || propIsOpen === undefined;

  // The toggle function is now primarily for the floating button.
  // When chat is full-screen, the close action is typically handled by `onClose` prop from parent.
  const toggleChat = () => {
    const newState = !isChatOpen;
    setIsChatOpen(newState);
    if (!newState && onClose) {
      onClose(); // Notify parent if chat is closed by its own button
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) {
      return;
    }
    if (!API_KEY) {
      const errorMessage =
        "API Key is missing! Please set VITE_GEMINI_API_KEY in your .env file.";
      console.error(errorMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: errorMessage,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      return;
    }

    setIsLoading(true);

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      text: inputText.trim() || undefined,
      imageUrl: imagePreviewUrl || undefined,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText("");
    clearImage(); // Clear image after adding to messages

    try {
      let parts = [];
      let modelName = "gemini-2.0-flash";

      if (inputText.trim()) {
        parts.push({ text: inputText.trim() });
      }

      if (selectedImage && imagePreviewUrl) {
        const base64ImageData = imagePreviewUrl.split(",")[1];
        parts.push({
          inlineData: {
            mimeType: selectedImage.type || "image/png",
            data: base64ImageData,
          },
        });
      }

      if (!inputText.trim() && selectedImage) {
        parts.unshift({
          text: "Describe this image in detail and provide a brief narration.",
        });
      }

      const payload = { contents: [{ role: "user", parts: parts }] };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      let aiResponseText = "Sorry, I couldn't get a response from the AI.";

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        aiResponseText = result.candidates[0].content.parts[0].text;
      } else if (result.error) {
        console.error("Gemini API Error:", result.error);
        aiResponseText = `Error from AI: ${result.error.message}`;
      } else {
        console.error(
          "Gemini API response structure unexpected or empty:",
          result
        );
      }

      const newAiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "An error occurred while communicating with the AI. Please try again.",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine chat window classes based on `propIsOpen`
  const chatWindowClasses =
    propIsOpen === true
      ? "fixed inset-0 w-full h-full rounded-none" // Full screen when propIsOpen is true
      : "fixed bottom-24 right-8 w-80 md:w-96 h-[600px] rounded-lg shadow-xl"; // Floating when propIsOpen is false/undefined

  return (
    <div className="relative h-screen bg-gray-100 font-inter">
      {/* Custom CSS for scrollbar styling */}
      <style>
        {`
          body { font-family: 'Inter', sans-serif; }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
            border-radius: 10px;
          }
        `}
      </style>

      {/* Floating Chat Button - only render if not full screen (controlled by parent as false/undefined) */}
      {showToggleButton && (
        <button
          onClick={toggleChat}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out z-50"
          aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
        >
          {isChatOpen ? (
            // Close icon when chat is open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Chat icon when chat is closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Chat Window - conditionally rendered based on isChatOpen state */}
      {isChatOpen && (
        <div
          className={`bg-white flex flex-col z-50 overflow-hidden border border-gray-200 ${chatWindowClasses}`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg shadow-md">
            <h3 className="text-lg font-semibold">AI Health Assistant</h3>
            {/* Show close button only if:
              1. The chat is in its floating state (propIsOpen is false/undefined), or
              2. An 'onClose' function is provided by the parent (essential for full-screen chat to close).
              Clicking this button will call the 'onClose' prop if it exists, otherwise it will use the internal 'toggleChat'.
            */}
            {(propIsOpen === false || onClose) && (
              <button
                onClick={onClose || toggleChat} // Use onClose prop if available, otherwise use internal toggle
                className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                aria-label="Close Chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-10">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">
                  Welcome to AI Health Assistant!
                </p>
                <p className="text-sm mt-2">
                  Start a conversation by typing a message or uploading an
                  image.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text && (
                    <p className="text-sm break-words">{msg.text}</p>
                  )}
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Sent content"
                      className="mt-2 rounded-md max-w-full h-auto object-cover"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                  <span
                    className={`block text-xs mt-1 ${
                      msg.sender === "user" ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[75%] p-3 rounded-lg shadow-sm bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    <span className="text-sm">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {imagePreviewUrl && (
              <div className="relative mb-3 p-2 border border-gray-300 rounded-md bg-gray-50">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="max-w-full h-24 object-contain rounded-sm"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
                aria-label="Upload Image"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none custom-scrollbar"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1}
                style={{ maxHeight: "100px" }}
                disabled={isLoading}
              ></textarea>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || (!inputText.trim() && !selectedImage)}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send Message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
