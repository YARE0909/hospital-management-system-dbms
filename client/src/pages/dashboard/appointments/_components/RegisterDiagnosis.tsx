import React from "react";
import { Button } from "@/components/ui/button";
import {
  CirclePlus,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  condition: z.string().min(1).max(50),
  prescription: z.string().min(1).max(50),
  notes: z.string().max(50).optional(),
});

const RegisterDiagnosis = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      condition: "",
      prescription: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    // try {
    //   await server.post("/patients/register", values);
    //   toast({
    //     title: "Patient registered successfully!",
    //     description: "The patient has been added to the database.",
    //   });
    //   form.reset();
    // } catch (error) {
    //   toast({
    //     title: "Something went wrong!",
    //     description: "Please try again later.",
    //     variant: "destructive",
    //   });
    // }

    console.log({ values })
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex gap-2 items-center">
            <CirclePlus className="h-4 w-4" />
            Diagnosis Info
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col justify-center items-center max-h-screen overflow-auto px-4"
        >
          <div className="w-full h-full flex flex-col gap-5 md:max-w-[40rem]">
            <div>
              <h1 className="text-2xl font-bold">Add Diagnosis</h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Input placeholder="Common cold" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prescription"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Prescription</FormLabel>
                      <FormControl>
                        <Input placeholder="Cough syrup" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input placeholder="2 times a day" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetClose asChild>
                  <Button className="w-full" type="submit">
                    Submit
                  </Button>
                </SheetClose>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RegisterDiagnosis;
