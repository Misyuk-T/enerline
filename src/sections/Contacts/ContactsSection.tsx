import type { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Button, Container, Reveal, SectionHeading } from '@/components';

import { ContactFormErrors, ContactFormState, ContactsSectionProps, SectionId } from '@/types';

const INITIAL_FORM_STATE: ContactFormState = {
  name: '',
  contact: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{9,20}$/;
const INITIAL_ERROR_STATE: ContactFormErrors = {};

export const ContactsSection = ({ content }: ContactsSectionProps) => {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ContactFormErrors>(INITIAL_ERROR_STATE);

  const validateForm = (values: ContactFormState): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {};
    const trimmedName = values.name.trim();
    const trimmedContact = values.contact.trim();
    const trimmedMessage = values.message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Вкажіть імʼя щонайменше з 2 символів.';
    }

    if (!EMAIL_PATTERN.test(trimmedContact) && !PHONE_PATTERN.test(trimmedContact)) {
      nextErrors.contact = 'Вкажіть коректний email або номер телефону.';
    }

    if (trimmedMessage.length < 10) {
      nextErrors.message = 'Повідомлення має містити щонайменше 10 символів.';
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
    const nextFormState: ContactFormState = {
      ...formState,
      [field]: value,
    };

    setFormState(nextFormState);

    if (Object.keys(errors).length > 0) {
      setErrors(validateForm(nextFormState));
    }
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const nextErrors = validateForm(formState);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const subject = `Запит з сайту Enerline від ${formState.name}`;
    const body = [
      `Ім'я: ${formState.name}`,
      `Email або телефон: ${formState.contact}`,
      '',
      'Повідомлення:',
      formState.message,
    ].join('\n');

    window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormState(INITIAL_FORM_STATE);
    setErrors(INITIAL_ERROR_STATE);
  };

  return (
    <section id={SectionId.Contacts} className="section-shell bg-primary">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Контакти"
            title={content.title}
            description={content.description}
            invert
          />

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 rounded-card border border-white/10 bg-white/10 p-5">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-white" />
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-white/60">Email</p>
                <a
                  className="mt-1 inline-block text-base font-medium text-white transition hover:text-white/80"
                  href={`mailto:${content.email}`}
                >
                  {content.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-card border border-white/10 bg-white/10 p-5">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-white" />
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-white/60">Телефон</p>
                <a
                  className="mt-1 inline-block text-base font-medium text-white transition hover:text-white/80"
                  href={`tel:${content.phone.replace(/\s+/g, '')}`}
                >
                  {content.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-card border border-white/10 bg-white/10 p-5">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-white" />
              <div>
                <p className="text-sm uppercase tracking-[0.14em] text-white/60">Регіон</p>
                <p className="mt-1 text-base font-medium text-white">{content.region}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <form
            className="rounded-card border border-white/10 bg-white p-6 shadow-soft md:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-text" htmlFor="name">
                Ім&apos;я
                <input
                  id="name"
                  className={`rounded-card border px-4 py-3 text-base text-text outline-none transition focus:border-primary ${
                    errors.name ? 'border-red-400' : 'border-border'
                  }`}
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleFieldChange('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                {errors.name ? <span className="text-sm text-red-500">{errors.name}</span> : null}
              </label>

              <label className="grid gap-2 text-sm font-medium text-text" htmlFor="contact">
                Email або телефон
                <input
                  id="contact"
                  className={`rounded-card border px-4 py-3 text-base text-text outline-none transition focus:border-primary ${
                    errors.contact ? 'border-red-400' : 'border-border'
                  }`}
                  type="text"
                  value={formState.contact}
                  onChange={(event) => handleFieldChange('contact', event.target.value)}
                  aria-invalid={Boolean(errors.contact)}
                  required
                />
                {errors.contact ? (
                  <span className="text-sm text-red-500">{errors.contact}</span>
                ) : null}
              </label>

              <label className="grid gap-2 text-sm font-medium text-text" htmlFor="message">
                Повідомлення
                <textarea
                  id="message"
                  className={`min-h-[144px] rounded-card border px-4 py-3 text-base text-text outline-none transition focus:border-primary ${
                    errors.message ? 'border-red-400' : 'border-border'
                  }`}
                  value={formState.message}
                  onChange={(event) => handleFieldChange('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  required
                />
                {errors.message ? (
                  <span className="text-sm text-red-500">{errors.message}</span>
                ) : null}
              </label>

              <Button type="submit" className="w-full">
                {content.submitLabel}
              </Button>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">{content.formNote}</p>
          </form>
        </Reveal>
      </Container>
    </section>
  );
};
