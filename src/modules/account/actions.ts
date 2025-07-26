"use server";

import { createUser, getToken, User, getUser } from "@lib/data";
import { error } from "console";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("username") as string;

  const user = {
    email,
    password,
    name,
  };

  try {
    await createUser(user);
    await getToken({ email, password });
  } catch (err: any) {
    return err.toString()
  }  
}

export async function logUserIn(
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await getToken({ email, password });
  } catch (error: any) {
    return error.toString()
  }
}

export async function getActiveUser() {
  try {
    return await getUser();
  } catch (error: any) {
    throw new Error(error.toString());
  }
}