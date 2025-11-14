import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg max-w-md animate-slide-in ${
      type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      )}
      <p className={`text-sm font-medium ${type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className={`ml-auto p-1 rounded-md hover:bg-opacity-20 transition-colors ${
          type === 'success' ? 'hover:bg-green-200' : 'hover:bg-red-200'
        }`}
      >
        <X className={`w-4 h-4 ${type === 'success' ? 'text-green-600' : 'text-red-600'}`} />
      </button>
    </div>
  );
}
