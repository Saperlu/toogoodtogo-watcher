import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
// import isStrongPassword from "validator/lib/isStrongPassword";
import { Meteor } from "meteor/meteor";
import { UserContext } from "./ContextProvider";
import { useToast } from "./hooks/use-toast";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  // password: z.string().refine(
  //   (p) =>
  //     isStrongPassword(p, {
  //       minLength: 8,
  //       minNumbers: 1,
  //       minUppercase: 1,
  //       minLowercase: 1,
  //       minSymbols: 1,
  //     }),
  //   {
  //     message: "At least 8 characters, 1 lower, 1 upper, 1 digit, 1 symbol.",
  //   }
  // ),
  password: z.string(),
});

const Login = () => {
  const { toast } = useToast();
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    Meteor.loginWithPassword(
      {
        email: values.email,
      },
      values.password,
      (err) => {
        if (err) {
          toast({
            title: "Error",
            description:
              "reason" in err ? (err as any).reason : "Erreur inconnue.",
            variant: "error",
          });
          return;
        }
      }
    );
  }

  useEffect(() => {
    if (user) navigate("/waiting");
  }, [user]);

  return (
    <>
      <div className="flex overflow-scroll h-full absolute w-full justify-safe-center items-safe-center bg-tgtg">
        <Card className="m-3 max-w-xl min-w-72 h-fit">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormDescription>
                        This has to be the same as your Too Good To Go account !
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="P@$$w0rd" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <div className="mt-2 text-center">
              Don't have an account ? Go to{" "}
              <Link to={"/register"} className="underline text-blue-700">
                register page
              </Link>
              .
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
