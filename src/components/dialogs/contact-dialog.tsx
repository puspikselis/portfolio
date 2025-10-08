'use client';

import { useEffect, useRef, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

type Props = { isOpen: boolean; onClose: () => void };

type Phase = 'idle' | 'sending';

const shadowC = 'inset-shadow-0-1-0 inset-shadow-white/8';
const labelC = '-tracking-[0.01em] block font-medium text-15 text-white leading-6';
const headingC = '-tracking-[0.01em] font-medium text-28/10 text-white';
const paragraphC = '-tracking-[0.02em] text-15/7 text-nobel-100';
const inputC = cn(
  shadowC,
  'h-12 w-full rounded-2xl bg-nero-100 px-4 py-3 text-15 text-white leading-6',
  'shadow-[0_1px_2px_rgba(0,0,0,.48)] transition-all duration-200',
  'placeholder:text-dim-gray-100 focus:placeholder:opacity-50',
  'focus:outline-none focus:ring-1 focus:ring-orange-100',
);
const btnC = cn(
  shadowC,
  'h-12 w-26 rounded-full bg-white px-4 font-semibold text-13 text-nero-100 leading-4',
  'transition-colors duration-200 ease-in-out hover:bg-white/90',
  'cursor-pointer disabled:cursor-not-allowed disabled:bg-nero-300 disabled:text-dim-gray-100 disabled:opacity-50',
);

function ContactFormView({
  formRef,
  onSubmit,
  onInput,
  phase,
  isValid,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInput: () => void;
  phase: Phase;
  isValid: boolean;
}) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the name input when the dialog opens
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100); // Small delay to ensure dialog is fully rendered

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="space-y-2">
        <Dialog.Title asChild>
          <h1 className={headingC}>Get in touch</h1>
        </Dialog.Title>
        <p className={paragraphC}>
          I&apos;d love to hear from you! You can reach me by filling out the form below, or
          directly via email at{' '}
          <a
            className="text-white transition-opacity duration-200 ease-in-out hover:opacity-80"
            href="mailto:kristaps@kruze.lv"
          >
            kristaps@kruze.lv
          </a>{' '}
          or phone{' '}
          <a
            className="text-white transition-opacity duration-200 ease-in-out hover:opacity-80"
            href="tel:+37129234926"
          >
            +371 292 34 926
          </a>
          .
        </p>
      </div>

      <form className="space-y-5" onInput={onInput} onSubmit={onSubmit} ref={formRef}>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className={labelC} htmlFor="name">
              Name
            </label>
            <input ref={nameInputRef} className={inputC} id="name" name="name" placeholder="John Doe" required />
          </div>

          <div className="flex-1 space-y-2">
            <label className={labelC} htmlFor="email">
              Email
            </label>
            <input
              className={inputC}
              id="email"
              name="email"
              placeholder="your@email.com"
              required
              type="email"
            />
          </div>
        </div>

        <div className="w-1/2 space-y-2 pr-2">
          <label className={labelC} htmlFor="phone">
            Phone # <span className="text-dim-gray-100">(optional)</span>
          </label>
          <input
            className={inputC}
            id="phone"
            name="phone"
            placeholder="+1 (555) 000-0000"
            type="tel"
          />
        </div>

        <div className="space-y-2">
          <label className={labelC} htmlFor="message">
            Message
          </label>
          <textarea
            className={cn(inputC, 'h-24 resize-y')}
            id="message"
            name="message"
            placeholder="I'm looking for help with..."
            required
          />
        </div>
        <input
          aria-label="Leave this field empty"
          autoComplete="off"
          className="hidden"
          name="_honey"
          tabIndex={-1}
          type="text"
        />
        <button 
          className={btnC} 
          disabled={phase === 'sending' || !isValid} 
          title={!isValid ? 'Please fill out all required fields' : undefined}
          type="submit"
        >
          {phase === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </form>
    </>
  );
}

export function ContactDialog({ isOpen, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      formRef.current?.reset();
      setPhase('idle');
      onClose();
    }
  };

  const checkValidity = () => {
    setIsValid(formRef.current?.checkValidity() ?? false);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhase('sending');

    const fd = new FormData(e.currentTarget);
    fd.set('_replyto', String(fd.get('email') || ''));
    fd.set('_subject', `Portfolio Contact from ${fd.get('name') || ''}`);

    try {
      const res = await fetch('https://formsubmit.co/ajax/kristaps@kruze.lv', {
        body: fd,
        headers: { Accept: 'application/json' },
        method: 'POST',
      });
      if (res.ok) {
        // Play success sound
        const audio = new Audio('/audio/mail-sent.mp3');
        audio.play().catch(() => {
          // Ignore audio play errors (e.g., user hasn't interacted with page yet)
        });

        formRef.current?.reset();
        setPhase('idle');
        handleOpenChange(false);
        showToast('Message sent successfully!', "I'll get back to you as soon as possible.");
      } else {
        setPhase('idle');
        alert('Failed to send. Please email me directly at kristaps@kruze.lv');
      }
    } catch {
      setPhase('idle');
      alert('Failed to send. Please email me directly at kristaps@kruze.lv');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-30">
          <div className="-translate-x-1/2 fixed inset-y-0 left-1/2 w-full max-w-404">
            <div
              className={cn(
                'mx-px h-full bg-black/95 backdrop-blur-sm',
                'data-[state=open]:fade-in-0 data-[state=open]:animate-in',
                'data-[state=closed]:fade-out-0 data-[state=closed]:animate-out',
              )}
            />
          </div>
        </Dialog.Overlay>
        <Dialog.Content
          className={cn(
            'fixed inset-0 z-40 overflow-y-auto',
            'data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-2 data-[state=open]:animate-in',
            'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-2 data-[state=closed]:animate-out',
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative mx-auto flex min-h-screen max-w-404 items-center justify-center">
            <Dialog.Close
              className={cn(
                'absolute top-5 right-5 z-[60] h-9 rounded-full bg-nero-100 px-5',
                'font-semibold text-12 text-white transition-colors duration-200 ease-in-out hover:bg-nero-200',
                'md:top-8 md:right-12',
                shadowC,
              )}
            >
              Close
            </Dialog.Close>

            <div className="w-full max-w-136 space-y-6 px-5 py-12">
              <ContactFormView
                formRef={formRef}
                isValid={isValid}
                onInput={checkValidity}
                onSubmit={submit}
                phase={phase}
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
