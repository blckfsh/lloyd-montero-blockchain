'use client'

import * as React from 'react'

const baseFieldClasses = 'flex flex-col gap-1 text-sm'
const baseInputClasses = 'h-10 rounded-md border border-slate-300 px-3'
const baseErrorClasses = 'text-xs text-red-600'
const baseHelperClasses = 'text-xs text-slate-600'

type FormProps = React.FormHTMLAttributes<HTMLFormElement>
type FormFieldProps = React.HTMLAttributes<HTMLDivElement>
type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>
type FormTextProps = React.HTMLAttributes<HTMLDivElement>

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={className} {...props} />
  )
)

Form.displayName = 'Form'

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[baseFieldClasses, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)

FormField.displayName = 'FormField'

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={className} {...props} />
  )
)

FormLabel.displayName = 'FormLabel'

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={[baseInputClasses, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)

FormInput.displayName = 'FormInput'

const FormError = React.forwardRef<HTMLDivElement, FormTextProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[baseErrorClasses, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)

FormError.displayName = 'FormError'

const FormHelper = React.forwardRef<HTMLDivElement, FormTextProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[baseHelperClasses, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
)

FormHelper.displayName = 'FormHelper'

export { Form, FormError, FormField, FormHelper, FormInput, FormLabel }

