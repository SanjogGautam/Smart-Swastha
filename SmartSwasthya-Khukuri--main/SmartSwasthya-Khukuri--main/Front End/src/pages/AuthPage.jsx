import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react"; // Import Clerk components
// useNavigate is not strictly necessary here as Clerk components handle redirection
// but if you need custom logic after Clerk's redirect, you can re-introduce it.
// import { useNavigate } from 'react-router-dom';

function AuthPage() {
  // The 'isLoginMode' state is still kept here to decide which Clerk component to render initially.
  // However, Clerk's components themselves provide UI to switch between sign-in/sign-up modes.
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="max-w-md mx-auto px-6 sm:px-10 py-12">
      <section className="p-8 sm:p-10 rounded-xl  text-gray-800 text-center">
        {/* The h2 and descriptive p tags are removed as Clerk components provide their own titles/descriptions */}

        {/* Conditional rendering of Clerk's SignIn or SignUp component */}
        {isLoginMode ? (
          <SignIn
            afterSignInUrl="/appointment" // Redirect after successful sign-in
            // You can customize appearance and behavior further with props
            // appearance={{ /* ... */ }}
          />
        ) : (
          <SignUp
            afterSignUpUrl="/appointment" // Redirect after successful sign-up
            // You can customize appearance and behavior further with props
            // appearance={{ /* ... */ }}
          />
        )}

        {/* The manual toggle button is removed as Clerk's components include their own links for switching modes */}
      </section>
    </div>
  );
}

export default AuthPage;
