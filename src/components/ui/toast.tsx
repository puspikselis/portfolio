'use client';

import * as Toast from '@radix-ui/react-toast';
import { createContext, useContext, useState } from 'react';

import { CheckCircle } from '@/components/icons/check-circle';
import { cn } from '@/lib/utils';

type ToastContextType = {
  showToast: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const showToast = (newTitle: string, newDescription?: string) => {
    setTitle(newTitle);
    setDescription(newDescription || '');
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="up">
        {children}
        {title && (
          <Toast.Root
            className={cn(
              'inset-shadow-0-1-0 inset-shadow-white/8',
              'fixed top-5 right-5 z-50 flex h-15 w-76 items-center justify-center rounded-2xl bg-nero-300',
              'md:top-8 md:right-12',
              'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full data-[state=closed]:animate-out data-[state=closed]:duration-300',
              'data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-full data-[state=open]:animate-in data-[state=open]:duration-500',
            )}
            duration={4000}
            onOpenChange={setOpen}
            open={open}
          >
            <div className="flex h-15 w-76 items-center justify-center gap-3 p-3">
              <div className="inset-shadow-0-1-0 inset-shadow-white/8 flex size-8 items-center justify-center rounded-lg bg-nero-100">
                <CheckCircle />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Toast.Title className="-tracking-[0.03em] font-semibold text-12 text-white leading-4">
                  {title}
                </Toast.Title>
                {description && (
                  <Toast.Description className="-tracking-[0.03em] font-medium text-12 text-dim-gray-100 leading-4">
                    {description}
                  </Toast.Description>
                )}
              </div>
            </div>
          </Toast.Root>
        )}
        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
