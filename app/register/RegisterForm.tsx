"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validators/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

type Input = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  //local states
  const [formStep, setFormStep] = useState(0);

  const { toast } = useToast();

  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      studentId: "",
      year: "",
    },
  });

  const onSubmit = (data: Input) => {
    if (data.confirmPassword !== data.password) {
      toast({
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    console.log(data);
  };

  //   console.log(form.watch());

  return (
    <div className="my-10">
      <Toaster />
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Start your journey in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* first page */}
              <div className={cn("space-y-3", { hidden: formStep === 1 })}>
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please Enter Your Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* student id */}
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Student Id</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Student Id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Your Year" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {[8, 9, 10].map((year) => (
                            <SelectItem value={year.toString()} key={year}>
                              Year {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* second page */}
              <div className={cn("space-y-3", { hidden: formStep === 0 })}>
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* confirm password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className={cn("", { hidden: formStep === 0 })}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className={cn("", { hidden: formStep === 1 })}
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    //validation
                    form.trigger(["email", "name", "studentId", "year"]);

                    const emailState = form.getFieldState("email");
                    const nameState = form.getFieldState("name");
                    const yearState = form.getFieldState("year");
                    const studentIdState = form.getFieldState("studentId");

                    if (!emailState.isDirty || emailState.invalid) return;
                    if (!nameState.isDirty || nameState.invalid) return;
                    if (!yearState.isDirty || yearState.invalid) return;
                    if (!studentIdState.isDirty || studentIdState.invalid)
                      return;
                    setFormStep(1);
                  }}
                >
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  className={cn("", { hidden: formStep === 0 })}
                  type="button"
                  variant="ghost"
                  onClick={() => setFormStep(0)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Prev Step
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
