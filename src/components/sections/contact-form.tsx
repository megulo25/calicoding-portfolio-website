"use client"

import { type FormEvent, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormState {
  status: "idle" | "submitting" | "success" | "error"
  message: string
}

interface FieldErrors {
  name?: string
  email?: string
  projectType?: string
  message?: string
}

const PROJECT_TYPES = [
  "Mobile App",
  "Web Application",
  "TV / Streaming",
  "IoT / Connected",
  "Design System",
  "Other",
] as const

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateFields(form: FormData): FieldErrors {
  const errors: FieldErrors = {}

  const name = form.get("name")
  if (typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters."
  }

  const email = form.get("email")
  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Please enter a valid email address."
  }

  const projectType = form.get("projectType")
  if (typeof projectType !== "string" || projectType === "") {
    errors.projectType = "Please select a project type."
  }

  const message = form.get("message")
  if (typeof message !== "string" || message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters."
  }

  return errors
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * ContactForm — client-side validated contact form with project type selector,
 * inline field errors, and animated success state.
 */
export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    message: "",
  })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    // Validate
    const errors = validateFields(form)
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    // Simulate submission
    setFormState({ status: "submitting", message: "" })

    // Fake async — in production this would be a server action or API call
    setTimeout(() => {
      setFormState({
        status: "success",
        message: "Thanks for reaching out! We'll get back to you within 24 hours.",
      })
    }, 1200)
  }

  return (
    <AnimatePresence mode="wait">
      {formState.status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          className="flex flex-col items-center rounded-[var(--radius-md)] border border-copper/20 bg-obsidian-light px-8 py-16 text-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-copper/10">
            <span className="text-3xl" aria-hidden="true">
              ✓
            </span>
          </div>
          <h3 className="text-xl font-semibold">Message Sent</h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-canvas-dim">
            {formState.message}
          </p>
          <button
            type="button"
            onClick={() => {
              setFormState({ status: "idle", message: "" })
              setFieldErrors({})
            }}
            className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-copper transition-colors duration-300 hover:text-copper-light"
            data-cursor="hover"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
          noValidate
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
            >
              Name <span className="text-copper">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              aria-invalid={fieldErrors.name ? true : undefined}
              className="w-full border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 placeholder:text-canvas-dim/30 focus:border-copper"
            />
            {fieldErrors.name && (
              <p id="name-error" className="mt-2 font-mono text-[0.625rem] text-safety-orange">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
            >
              Email <span className="text-copper">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              aria-invalid={fieldErrors.email ? true : undefined}
              className="w-full border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 placeholder:text-canvas-dim/30 focus:border-copper"
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-2 font-mono text-[0.625rem] text-safety-orange">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Project Type */}
          <div>
            <label
              htmlFor="projectType"
              className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
            >
              Project Type <span className="text-copper">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              aria-describedby={
                fieldErrors.projectType ? "projectType-error" : undefined
              }
              aria-invalid={fieldErrors.projectType ? true : undefined}
              className="w-full appearance-none border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 focus:border-copper [&:invalid]:text-canvas-dim/30 [&>option]:bg-obsidian [&>option]:text-canvas"
            >
              <option value="" disabled>
                Select a project type…
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {fieldErrors.projectType && (
              <p
                id="projectType-error"
                className="mt-2 font-mono text-[0.625rem] text-safety-orange"
              >
                {fieldErrors.projectType}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-canvas-dim"
            >
              Message <span className="text-copper">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell us about your project, timeline, and goals…"
              aria-describedby={
                fieldErrors.message ? "message-error" : undefined
              }
              aria-invalid={fieldErrors.message ? true : undefined}
              className="w-full resize-none border-b border-canvas/10 bg-transparent py-3 text-canvas outline-none transition-colors duration-300 placeholder:text-canvas-dim/30 focus:border-copper"
            />
            {fieldErrors.message && (
              <p
                id="message-error"
                className="mt-2 font-mono text-[0.625rem] text-safety-orange"
              >
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formState.status === "submitting"}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] border border-copper bg-transparent px-8 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.15em] text-copper transition-all duration-300 hover:bg-copper hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper disabled:cursor-not-allowed disabled:opacity-50"
            data-cursor="hover"
          >
            {formState.status === "submitting" ? (
              <>
                Sending…
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-copper border-t-transparent"
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                Send Message
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
