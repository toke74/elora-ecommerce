"use client";

import { useState } from "react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Register = () => {
  const [visible, setVisible] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full h-full">
      <Card className="w-80 xs:w-96 xm:w-[450px]  m-auto my-12 pb-5  shadow-3xl border-none  ">
        <CardHeader>
          <CardTitle className="flex justify-center text-xl">
            Register as a new user
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <div className="max-w-[350px] xm:max-w-[380px] xs:ml-3 flex justify-center flex-col items-center space-y-5 xs:px-5 ">
            <Button variant={"outline"} className="w-full ">
              <FcGoogle size={20} className="mr-2" /> Sign up with Google
            </Button>
            <Button variant={"outline"} className="w-full">
              <FaGithub size={20} className="mr-2" /> Sign up with Github
            </Button>
          </div>
        </CardContent>

        <div className="relative max-w-[350px]  m-auto flex px-7 pb-4 items-center">
          <div className="flex-grow h-[0.6px] border-t-0 bg-gray-300"></div>
          <span className="flex-shrink mx-2">or</span>
          <div className="flex-grow h-[0.6px] border-t-0 bg-gray-300"></div>
        </div>

        <div className="max-w-[350px] xm:max-w-[380px] m-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={visible ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      {visible ? (
                        <AiOutlineEye
                          className="absolute  right-2 top-8 cursor-pointer  text-gray-500 "
                          size={19}
                          onClick={() => setVisible(false)}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute right-2 top-8 cursor-pointer text-gray-500"
                          size={19}
                          onClick={() => setVisible(true)}
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-center mt-[6px]">
                <Button className="w-full  py-4 px-7 text-base" type="submit">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Form>
          <div className="text-xs xs:text-sm mb-5 px-6">
            Already have an account?
            <Link
              className="ml-2 text-primary text-xs hover:opacity-85"
              href={"/login"}
            >
              Log in here
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
