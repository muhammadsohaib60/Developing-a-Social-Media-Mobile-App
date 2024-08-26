import { signUpProps } from "@/constants/types";

export const signup = async (data: signUpProps) => {
  console.log(data);
};

export const signin = async (emailOrPhone: string, password: string) => {};
