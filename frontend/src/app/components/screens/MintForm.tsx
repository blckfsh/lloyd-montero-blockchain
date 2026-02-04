'use client'

import { useEffect } from 'react'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useForm } from '@tanstack/react-form-nextjs'
import { z } from 'zod'
import { parseEther } from 'viem'
import Button from '@/app/components/ui/button'
import {
  Form,
  FormError,
  FormField,
  FormHelper,
  FormInput,
  FormLabel
} from '@/app/components/ui/form'
import useMintToken from '@/app/lib/hooks/useMintToken'

const mintSchema = z.object({
  recipient: z
    .string()
    .trim()
    .regex(/^0x[a-fA-F0-9]{40}$/, {
      message: 'Enter a valid recipient address.'
    }),
  amount: z
    .string()
    .trim()
    .regex(/^\d+$/, { message: 'Enter a whole number amount.' })
    .refine((value) => BigInt(value) > BigInt(0), {
      message: 'Enter an amount greater than zero.'
    })
})

export default function MintForm() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const mintMutation = useMintToken()

  const form = useForm({
    defaultValues: {
      recipient: address ?? '',
      amount: ''
    },
    validators: {
      onSubmit: mintSchema
    },
    onSubmit: ({ value }) => {
      mintMutation.mutate({
        address: value.recipient as `0x${string}`,
        amount: parseEther(value.amount)
      })
    }
  })

  useEffect(() => {
    if (!address) {
      return
    }
    if (!form.getFieldValue('recipient')) {
      form.setFieldValue('recipient', address, { dontValidate: true })
    }
  }, [address, form])

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-semibold">Mint Token</h1>
      {isConnected && (
        <Form
          className="flex flex-col gap-3 w-80"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.Field name="recipient">
            {(field) => (
              <FormField>
                <FormLabel htmlFor="recipient">Recipient Address</FormLabel>
                <FormInput
                  id="recipient"
                  placeholder="0x..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.[0]?.message && (
                  <FormError>{field.state.meta.errors[0].message}</FormError>
                )}
              </FormField>
            )}
          </form.Field>

          <form.Field name="amount">
            {(field) => (
              <FormField>
                <FormLabel htmlFor="amount">Amount (whole tokens)</FormLabel>
                <FormInput
                  id="amount"
                  placeholder="100"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.[0]?.message && (
                  <FormError>{field.state.meta.errors[0].message}</FormError>
                )}
              </FormField>
            )}
          </form.Field>

          <FormHelper>
            Default recipient is your connected address.
          </FormHelper>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                variant="secondary"
                size="md"
                type="submit"
                disabled={!canSubmit || isSubmitting || mintMutation.isPending}
              >
                {mintMutation.isPending || isSubmitting ? 'Minting...' : 'Mint'}
              </Button>
            )}
          </form.Subscribe>

          {mintMutation.isError && (
            <div className="text-sm text-red-600">
              {mintMutation.error?.message ?? 'Mint failed.'}
            </div>
          )}
          {mintMutation.isSuccess && (
            <div className="text-sm text-green-600">
              Mint submitted successfully.
            </div>
          )}
        </Form>
      )}
    </div>
  )
}
