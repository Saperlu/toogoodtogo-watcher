import React, { useContext, useEffect } from "react";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import isStrongPassword from "validator/lib/isStrongPassword";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Accounts } from "meteor/accounts-base";
import { UserContext } from "./ContextProvider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./hooks/use-toast";
import { formatDate } from "date-fns";

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

const Register = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = Accounts.createUser(
      {
        email: values.email,
        password: values.password,
      },
      (err) => {
        if (err) {
          toast({
            title: "Erreur",
            description:
              "reason" in err ? (err as any).reason : "Erreur inconnue.",
            variant: "error",
          });
          return;
        }
        console.log(`Account created : ${user}`);
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
            <CardTitle>Register</CardTitle>
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
              <Button
                className="mt-3"
                onClick={() => {
                  toast({
                    title: "Error",
                    description: "You are way too cute",
                    className: "bg-rose-200",
                  });
                }}
              >
                Cute button
              </Button>
              <br />
              <Button
                className="mt-3"
                onClick={() => {
                  form.setValue(
                    "email",
                    formatDate(Date.now(), "hh-mm-ss") + "@azer.azer"
                  );
                  form.setValue("password", "azer");
                }}
              >
                Fill
              </Button>
            </Form>
            <div className="mt-2 text-center">
              Already have an account ? Go to{" "}
              <Link to={"/login"} className="underline text-blue-700">
                login page
              </Link>
              .
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
