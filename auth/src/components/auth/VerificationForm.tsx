"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { GridLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { Verify } from "@/actions/verify";
import { Checkmark } from "react-checkmark";
import { MdError } from "react-icons/md";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verify = useCallback(() => {
    Verify(token).then((res) => {
      if (res) {
        setError(res.error);
        setSuccess(res.success);
      }
    });
  }, [token]);

  useEffect(() => {
    verify();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full">
          {!success && !error && <GridLoader />}
          {success && <Checkmark size="large" />}
          {error && <MdError className="text-destructive h-14 w-14" />}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
