import React from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-[30px] border border-slate-200 bg-white p-8 shadow-2xl animate-[fadeIn_0.35s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition-all duration-300"
        >
        <IoClose className="text-2xl" />
        </button>

        {children}
      </div>
    </div>
  );
}