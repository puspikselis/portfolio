'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

type Props = { isOpen: boolean; onClose: () => void };

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputC =
  'inset-shadow-0-1-0 inset-shadow-white/8 h-11 w-full rounded-2xl bg-nero-100 px-4 py-3 text-15/6 text-white shadow-[0_1px_2px_rgba(0,0,0,.48)] transition-all placeholder:text-dim-gray-100 focus:placeholder:opacity-50 focus:outline-none focus:ring-1 focus:ring-orange-100 invalid:ring-1 invalid:ring-red-500/80 invalid:focus:ring-red-500';

export function ContactDialog({ isOpen, onClose }: Props) {
  const { showToast } = useToast();
  const honeyRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues: { email: '', message: '', name: '', phone: '' },
    mode: 'onChange', // real-time button enable/disable
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    // Honeypot guard
    if (honeyRef.current?.value) return;

    const fd = new FormData();
    fd.set('name', values.name);
    fd.set('email', values.email);
    fd.set('phone', values.phone ?? '');
    fd.set('message', values.message);
    fd.set('_replyto', values.email);
    fd.set('_subject', `Portfolio Contact from ${values.name}`);

    try {
      const res = await fetch('https://formsubmit.co/ajax/kristaps@kruze.lv', {
        body: fd,
        headers: { Accept: 'application/json' },
        method: 'POST',
      });
      if (!res.ok) throw new Error('send failed');

      // Play success sound
      const audio = new Audio('/audio/mail-sent.mp3');
      audio.play().catch(() => {});
      reset();
      onClose();
      showToast('Message sent successfully!', "I'll get back to you as soon as possible.");
    } catch {
      showToast('Failed to send message', 'Please email me directly at kristaps@kruze.lv');
    }
  };

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) {
          reset();
          onClose();
        }
      }}
      open={isOpen}
    >
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
        >
          <div className="relative mx-auto flex min-h-screen max-w-404 items-center justify-center">
            <Dialog.Close
              asChild
              className="absolute inset-shadow-0-1-0 inset-shadow-white/8 top-5 right-5 z-60 h-9 rounded-full bg-nero-100 px-5 font-semibold text-12 text-white hover:bg-nero-200 md:top-8 md:right-12"
            >
              <button type="button">Close</button>
            </Dialog.Close>

            <div className="w-full max-w-136 space-y-12 px-5 py-12">
              <div className="space-y-2">
                <Dialog.Title asChild>
                  <h1 className="-tracking-[0.01em] font-medium text-28/10 text-white">
                    Get in touch
                  </h1>
                </Dialog.Title>
                <Dialog.Description asChild>
                  <p className="-tracking-[0.02em] text-15/7 text-nobel-100">
                    I&apos;d love to hear from you! You can reach me by filling out the form below,
                    or directly via email at{' '}
                    <a
                      className="text-white transition-opacity hover:opacity-80"
                      href="mailto:kristaps@kruze.lv"
                    >
                      kristaps@kruze.lv
                    </a>{' '}
                    or phone{' '}
                    <a
                      className="text-white transition-opacity hover:opacity-80"
                      href="tel:+37129234926"
                    >
                      +371 292 34 926
                    </a>
                    .
                  </p>
                </Dialog.Description>
              </div>

              <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label
                      className="-tracking-[0.01em] block font-medium text-15 text-white"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      {...register('name')}
                      className={inputC}
                      placeholder="John Doe"
                      {...(errors.name && {
                        'aria-describedby': 'name-error',
                        'aria-invalid': 'true',
                      })}
                    />
                    {errors.name && (
                      <p
                        className="-tracking-[0.01em] text-12/4 text-red-500"
                        id="name-error"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <label
                      className="-tracking-[0.01em] block font-medium text-15 text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={inputC}
                      placeholder="your@email.com"
                      {...(errors.email && {
                        'aria-describedby': 'email-error',
                        'aria-invalid': 'true',
                      })}
                    />
                    {errors.email && (
                      <p
                        className="-tracking-[0.01em] text-12/4 text-red-500"
                        id="email-error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="-tracking-[0.01em] block font-medium text-15 text-white"
                    htmlFor="phone"
                  >
                    Phone # <span className="text-dim-gray-100">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={inputC}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="-tracking-[0.01em] block font-medium text-15 text-white"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    className={cn(inputC, 'h-auto min-h-24 resize-y')}
                    placeholder="I'm looking for help with..."
                    {...(errors.message && {
                      'aria-describedby': 'message-error',
                      'aria-invalid': 'true',
                    })}
                  />
                  {errors.message && (
                      <p
                        className="-tracking-[0.01em] text-12/4 text-red-500"
                        id="message-error"
                      >
                        {errors.message.message}
                      </p>
                  )}
                </div>

                {/* Honeypot */}
                <input
                  aria-hidden="true"
                  autoComplete="off"
                  className="hidden"
                  name="_honey"
                  ref={honeyRef}
                  tabIndex={-1}
                  type="text"
                />

                <button
                  className="inset-shadow-0-1-0 inset-shadow-white/8 h-12 rounded-full bg-white px-6 font-semibold text-13/4 text-nero-100 hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-nero-300 disabled:text-dim-gray-100 disabled:opacity-50"
                  disabled={isSubmitting || !isValid}
                  type="submit"
                >
                  {isSubmitting ? 'Sending…' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
