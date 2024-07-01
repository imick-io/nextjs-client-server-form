"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema } from "./newsletter-schema";
import { z } from "zod";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

const ActionButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`btn btn-primary btn-lg ${pending ? "btn-disabled" : ""}`}
      type="submit"
      aria-disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      Submit
    </button>
  );
};

import { onNewsletterSubmitAction } from "./newsletter-action";

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const NewsletterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(onNewsletterSubmitAction, {
    message: "",
  });

  const {
    register,
    handleSubmit,

    formState: { errors, defaultValues },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      ...(state?.fields ?? {}),
    },
  });

  return (
    <>
      {/* Error Alert */}
      {state?.issues && (
        <div role="alert" className="alert alert-error">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Alert */}
      {state.message !== "" && state.isSuccessful && (
        <div role="alert" className="alert alert-success">
          <p>{state.message}</p>
        </div>
      )}

      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
        className="grid grid-cols-2 gap-6"
      >
        {/* First Name field */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">What is your first name?</span>
          </div>
          <input
            type="text"
            className="input-lg input-bordered input"
            placeholder="Enter your name"
            autoComplete="given-name"
            defaultValue={defaultValues?.first}
            {...register("first")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.first?.message}
            </span>
          </div>
        </label>

        {/* Last Name field */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">What is your last name?</span>
          </div>
          <input
            type="text"
            className="input-lg input-bordered input"
            placeholder="Enter your name"
            autoComplete="family-name"
            defaultValue={defaultValues?.last}
            {...register("last")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.last?.message}
            </span>
          </div>
        </label>

        {/* Email field */}
        <label className="form-control w-full col-span-full">
          <div className="label">
            <span className="label-text">What is your email?</span>
          </div>
          <input
            type="text"
            className="input-lg input-bordered input"
            placeholder="Enter your email"
            autoComplete="email"
            defaultValue={defaultValues?.email}
            {...register("email")}
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {errors.email?.message}{" "}
            </span>
          </div>
        </label>

        <div className="flex justify-end col-span-full">
          <ActionButton />
        </div>
      </form>
    </>
  );
};
