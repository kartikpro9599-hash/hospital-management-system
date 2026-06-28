// learn validators from
//https://youtu.be/ogVEqykJs_o?si=lyaemXGos28pyowP and https://youtu.be/T-GqjaS19SQ?si=kRCTWE846d6fMAc4 these are great tutorial and read the documentation of zod
//https://regexr.com/ for regex
//zod.dev/api#enum

import * as z from "zod";

export const createAccountValidator = z
  .object({
    fName: z
      .string()
      .trim()
      .min(2, { message: "please enter the correct name" })
      .max(20, { message: "First name is too long" })
      .regex(/^[A-Za-z]+$/, { message: "Name can only contain letters" }),

    lName: z
      .string()
      .trim()
      .min(2, { message: "please enter the correct last name" })
      .max(20, { message: "last name is too long" })
      .regex(/^[A-Za-z]+$/, { message: "Name can only contain letters" }),

    username: z
      .string()
      .trim()
      .min(2, { message: "username is too short" })
      .max(20, { message: "username is too long" })
      .regex(/^[A-Za-z0-9_]+$/, {
        message: "Username can contain only letters, numbers and _",
      }),

    age: z
      .number({ message: "enter the correct age" })
      .int({ message: "age must be a number" })
      .min(1, { message: "please enter the currect age" })
      .max(150, { message: "your are too old for registratiom" }), //i dont know what msg should i pass so i make this msg funny

    gender: z.enum(["male", "female", "transgender"], {
      message: "please choose your gender",
    }),

    phoneNo: z
      .string()
      .trim()
      .regex(/^[6-9][0-9]{9}$/, {
        message: "Invalid phone number",
      }),

    email: z.email({ message: "please enter the correct email" }),

    password: z
      .string()
      .min(8, { message: "password must contain at least 8 letters" })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
        { message: "Password must contain uppercase, lowercase and a number" },
      ),

    cnfPassword: z
      .string()
      .min(8, { message: "password must contain at least 8 letters" }),
  })
  .refine((data) => data.password === data.cnfPassword, {
    message: "Passwords does not match",
    path: ["cnfPassword"],
  });

export const loginAccountValidator = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "username is too short" })
    .max(20, { message: "username is too long" })
    .regex(/^[A-Za-z0-9_]+$/, {
      message: "username or Password is incorrrect",
    }),
  password: z
    .string()
    .min(8, { message: "password must contain at least 8 letters" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      { message: "username or Password is incorrrect" },
    ),
  loginType: z.enum(["patient", "doctor", "admin"], {
    message: "Please do not change the Local Storage",
  }),
});
