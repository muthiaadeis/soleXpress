import React from 'react';

function ErrorPage() {
  return (
    <div className="bg-blue flex flex-col items-center justify-center min-h-screen font-poppins">
      <h1 className="text-black text-4xl font-extrabold mb-6">Oops!</h1>
      <h2 className="text-[#5ef3df] font-extrabold text-[15rem] leading-none select-none">404</h2>
      <a href="/" className="flex items-center space-x-2 text-black border-b border-black pb-0.5 mt-6 text-base">
        <i className="fas fa-undo-alt"></i>
        <span>Go Home</span>
      </a>
    </div>
  );
}

export default ErrorPage;
