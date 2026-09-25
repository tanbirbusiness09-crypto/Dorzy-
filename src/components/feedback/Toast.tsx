import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  durationMs?: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: string | Omit<ToastMessage, 'id'>, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: string | Omit<ToastMessage, 'id'>, type?: ToastType) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage =
        typeof toast === 'string'
          ? { id, title: toast, type: type || 'info' }
          : { ...toast, id, type: toast.type || type || 'info' };
      setToasts((prev) => [...prev, newToast]);

      const duration = typeof toast === 'string' ? 4000 : (toast.durationMs ?? 4000);
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div
        aria-live="assertive"
        className="fixed bottom-4 end-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#1E5638] shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#B42318] shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#8A5814] shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#175CD3] shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-[#CDE3D5] bg-[#FFFFFF]';
      case 'error':
        return 'border-[#FECDCA] bg-[#FFFFFF]';
      case 'warning':
        return 'border-[#ECD8B6] bg-[#FFFFFF]';
      case 'info':
      default:
        return 'border-[#B2DDFF] bg-[#FFFFFF]';
    }
  };

  return (
    <div
      className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start justify-between gap-3 text-start transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 ${getBorderColor()}`}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div>
          <h5 className="text-xs sm:text-sm font-bold text-[#121316]">{toast.title}</h5>
          {toast.description && (
            <p className="text-xs text-[#65625D] mt-0.5 leading-relaxed">{toast.description}</p>
          )}
        </div>
      </div>

      <button
        onClick={onDismiss}
        aria-label="Dismiss toast"
        className="text-[#8E8B85] hover:text-[#121316] p-1 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
