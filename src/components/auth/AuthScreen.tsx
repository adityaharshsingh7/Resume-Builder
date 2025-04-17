
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { FileText } from 'lucide-react';

const AuthScreen: React.FC = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const toggleAuthMode = () => {
    setAuthMode(prevMode => prevMode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-resume-primary">
            <FileText className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Smart Resume Hub</h1>
          </div>
        </div>

        {authMode === 'signin' ? (
          <SignInForm onSignUpClick={toggleAuthMode} />
        ) : (
          <SignUpForm onSignInClick={toggleAuthMode} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
