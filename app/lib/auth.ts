'use server'

import { signupSchema, loginSchema } from "./schemas";
import { z } from "zod";
import { STATUS_MESSAGES } from "./api";
import { getInternalApiBaseUrl } from "@/app/lib/api";
import { redirect } from "next/navigation";

export interface ActionState {
  success?: boolean;
  message: string;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}

export async function loginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const validated = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    const errors = {
      email: tree.properties?.email?.errors ?? [],
      password: tree.properties?.password?.errors ?? [],
    };

    return {
      success: false,
      message: "Please review your fields and try again",
      errors,
    };
  }
  return {
    success: false,
    message: "Please review your fields and try again",
  };
}

export async function signupAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  //get validation state of form input fields
  const validated = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    //get a tree object of errors
    const tree = z.treeifyError(validated.error);

    //extract errors from tree
    const errors = {
      username: tree.properties?.username?.errors ?? [],
      email: tree.properties?.email?.errors ?? [],
      password: tree.properties?.password?.errors ?? [],
      confirmPassword: tree.properties?.confirmPassword?.errors ?? [],
    };

    //fields unproperly filled
    return {
      success: false,
      message: "Please check your fields and try again",
      errors,
    };
  }

  //define redirect url
  let redirectTo: string | null = null;

  try {
    //define url
    const url = `${getInternalApiBaseUrl()}/auth/register`;
    console.log(url);

    //create body from formData
    const { username, email, password } = validated.data;

    //create user
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: username,
        email: email,
        password: password,
      }),
    });

    //handle error
    if (!res.ok) {
      return {
        success: false,
        message: STATUS_MESSAGES[res.status] || "An unexpected error occured !",
      };
    }

    //no errors , redirectUrl exists
    redirectTo = "/auth/login";
  } catch (error) {
    //log error and return failure
    console.error("Failed to signup !", error);
    return {
      success: false,
      message: "A network error occured , please try again !",
    };
  }

  //redirect
  if (redirectTo) {
    redirect(redirectTo);
  }

  // return success
  return {
    success: true,
    message: "Registration Successful !",
  };
}
