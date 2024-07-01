"use server";
import { revalidatePath } from "next/cache";
import { newsletterSchema } from "./newsletter-schema";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  isSuccessful?: boolean;
};

export async function onNewsletterSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = newsletterSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  revalidatePath("/");
  return { message: "User registered", isSuccessful: true };
}
