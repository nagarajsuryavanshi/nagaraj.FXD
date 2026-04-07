'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, CheckCircle } from 'lucide-react';

export default function ContactApp() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleSubmit() {
    const newErrors: Record<string, boolean> = {};
    if (!form.name) newErrors.name = true;
    if (!form.email) newErrors.email = true;
    if (!form.message) newErrors.message = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  }

  const inputStyle = (field: string) => ({
    background: 'rgba(255,255,255,0.06)',
    borderColor: errors[field] ? '#ff5f57' : 'rgba(255,255,255,0.1)',
    color: '#f0f0ff',
    outline: 'none',
  });

  return (
    <div className="p-7">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#7c6af7' }}>
          Get In Touch
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,255,0.55)' }}>
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            className="flex flex-col items-center gap-3 p-8 rounded-xl border text-center"
            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(40,200,64,0.3)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={40} color="#28c840" />
            <h3 className="text-lg font-bold text-white">Message Sent!</h3>
            <p className="text-sm" style={{ color: 'rgba(240,240,255,0.55)' }}>
              Thanks, <strong className="text-white">{form.name}</strong>! I&apos;ll get back to you at{' '}
              <strong className="text-white">{form.email}</strong> within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" className="flex flex-col gap-3.5 max-w-[480px]">
            {[
              { key: 'name',    label: 'Your Name',      type: 'text',  placeholder: 'John Doe' },
              { key: 'email',   label: 'Email Address',  type: 'email', placeholder: 'john@example.com' },
              { key: 'subject', label: 'Subject',        type: 'text',  placeholder: 'Project Inquiry' },
            ].map(f => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,240,255,0.45)' }}>
                  {f.label}
                </label>
                <motion.input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => { setForm(p => ({ ...p, [f.key]: e.target.value })); setErrors(p => ({ ...p, [f.key]: false })); }}
                  placeholder={f.placeholder}
                  className="px-3.5 py-2.5 rounded-xl text-sm border font-[inherit] transition-all"
                  style={inputStyle(f.key)}
                  animate={errors[f.key] ? { x: [0,-6,6,-4,4,0] } : {}}
                  transition={{ duration: 0.35 }}
                  onFocus={e => { e.target.style.borderColor = '#7c6af7'; e.target.style.boxShadow = '0 0 0 3px rgba(124,106,247,0.2)'; }}
                  onBlur={e => { e.target.style.borderColor = errors[f.key] ? '#ff5f57' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = ''; }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,240,255,0.45)' }}>
                Message
              </label>
              <motion.textarea
                value={form.message}
                onChange={e => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: false })); }}
                placeholder="Tell me about your project or just say hello..."
                rows={4}
                className="px-3.5 py-2.5 rounded-xl text-sm border font-[inherit] resize-none transition-all"
                style={inputStyle('message')}
                animate={errors.message ? { x: [0,-6,6,-4,4,0] } : {}}
                transition={{ duration: 0.35 }}
                onFocus={e => { e.target.style.borderColor = '#7c6af7'; e.target.style.boxShadow = '0 0 0 3px rgba(124,106,247,0.2)'; }}
                onBlur={e => { e.target.style.borderColor = errors.message ? '#ff5f57' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = ''; }}
              />
            </div>

            <motion.button
              className="flex items-center gap-2 self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white grad-bg"
              style={{ boxShadow: '0 4px 20px rgba(124,106,247,0.35)' }}
              onClick={handleSubmit}
              disabled={sending}
              whileHover={{ opacity: 0.9, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Send size={14} />
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social links */}
      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#7c6af7' }}>
          Connect With Me
        </p>
        <div className="flex flex-wrap gap-2.5">
          {[
            { href: 'https://github.com/nagarajsuryavanshi',   icon: Github,   label: 'GitHub',   color: '#f0f0ff' },
            { href: 'https://linkedin.com/in/nagarajsuryavanshi', icon: Linkedin, label: 'LinkedIn', color: '#0a66c2' },
            { href: 'mailto:nagaraj.suryavanshi@7edge.com',   icon: Mail,    label: 'Email',    color: '#e879f9' },
          ].map(s => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: '#f0f0ff' }}
              whileHover={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(124,106,247,0.3)', y: -2 }}
            >
              <s.icon size={15} color={s.color} /> {s.label}
            </motion.a>
          ))}
        </div>
      </div>

      <div
        className="mt-5 p-3.5 rounded-xl border text-xs flex items-center gap-2"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(240,240,255,0.45)' }}
      >
        🕐 Usually responds within <strong className="text-white/70">&nbsp;24 hours</strong>
      </div>
    </div>
  );
}
