import { t } from './langues.js';

export function initContact() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject?.value.trim() ?? '';
    const message = form.message.value.trim();

    const body = `Nom : ${name}\nE-mail : ${email}\n\n${message}`;
    const mailto = `mailto:babylone.isshak@gmail.com?subject=${encodeURIComponent(subject || 'Message depuis le portfolio')}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    form.reset();
    if (success) {
      success.style.display = 'flex';
      success.querySelector('[data-i18n]').innerHTML = t('contact.form.success');
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    }
  });

  function validate() {
    let valid = true;

    const name  = form.name.value.trim();
    const email = form.email.value.trim();
    const msg   = form.message.value.trim();

    setError('name-error',    !name    ? t('contact.form.err.name')    : '');
    setError('email-error',   !isValidEmail(email) ? t('contact.form.err.email')   : '');
    setError('message-error', !msg     ? t('contact.form.err.message') : '');

    if (!name || !isValidEmail(email) || !msg) valid = false;
    return valid;
  }

  function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  /* Update error messages on lang change */
  document.addEventListener('langchange', () => {
    ['name-error', 'email-error', 'message-error'].forEach(id => setError(id, ''));
  });
}
