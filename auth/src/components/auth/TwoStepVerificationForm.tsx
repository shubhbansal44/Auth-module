"use client";

import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useTransition, useState } from "react";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { TwoStepVerificationSchema } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { Authenticate } from "@/actions/two-step-verification";

export const TwoStepVerificationForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof TwoStepVerificationSchema>>({
    resolver: zodResolver(TwoStepVerificationSchema),
    defaultValues: {
      token: "",
    },
  });

  const Submit = async (values: z.infer<typeof TwoStepVerificationSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      Authenticate(values).then((res) => {
        if (res) {
          setError(res.error);
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter OTP"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Submit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <InputOTP maxLength={6} disabled={isPending} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl> 
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Authenticate
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
