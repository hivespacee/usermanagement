import { X } from 'lucide-react';

const Modal = ({ title, isOpen, onClose, children, widthClass = 'max-w-2xl' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className={`relative w-full ${widthClass} mx-4 rounded-xl border border-neutral-700 bg-neutral-900 p-5`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-100 font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;


