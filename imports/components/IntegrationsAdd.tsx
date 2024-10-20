import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserContext } from "./ContextProvider";
import { Integrations, SyncedUser } from "../types";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createIntegration } from "/imports/methods/integrations/create";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { formatDate } from "date-fns";
import { useToast } from "./hooks/use-toast";
import { ChevronLeft } from "lucide-react";

const IntegrationsAdd = () => {
  const user = useContext(UserContext) as SyncedUser;
  const navigate = useNavigate();
  const { toast } = useToast();
  const formSchema = z.object({
    kind: z.literal("Discord"),
    name: z.string(),
    url: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kind: "Discord",
      name: "",
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createIntegration({ ...values }).then(
      (value) => {
        toast({
          title: "Success",
        });
        navigate("/integrations");
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <div className="flex overflow-scroll h-full absolute w-full justify-safe-center items-safe-center bg-tgtg">
        <Card className="m-3 max-w-xl min-w-72 h-fit">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle className="flex flex-row items-center">
              <Link to={"/integrations"}>
                <ChevronLeft className="my-auto bg-tgtg rounded-full square p-1 w-7 h-7 text-white mr-1" />
              </Link>
              New Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kind"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Discord">Discord</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default IntegrationsAdd;
