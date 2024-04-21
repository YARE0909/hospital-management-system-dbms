import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckIcon, CirclePlus } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { server } from "@/lib/api/server";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  patientId: z.string().min(1).max(50),
  doctorId: z.string().min(1).max(50),
  appointmentDate: z.date(),
  appointmentType: z.enum(["checkUp", "routine", "followUp"]),
});

const RegisterAppointment = ({
  patientList,
  doctorList,
}: {
  patientList: any;
  doctorList: any;
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      appointmentDate: new Date(),
      appointmentType: "checkUp",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await server.post("/appointments/register", values);
      toast({
        title: "Patient registered successfully!",
        description: "The patient has been added to the database.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex gap-2 items-center">
            <CirclePlus className="h-4 w-4" />
            Appointment
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="flex flex-col justify-center items-center max-h-screen overflow-auto px-4"
        >
          <div className="w-full md:max-w-[40rem]">
            <SheetHeader>
              <h1 className="text-2xl font-bold">Register Appointment</h1>
            </SheetHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Patient</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? patientList.find(
                                    (patient: any) =>
                                      patient.value === field.value
                                  )?.label
                                : "Select patient"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search patient..."
                              className="h-9"
                            />
                            <CommandEmpty>No patient found.</CommandEmpty>
                            <CommandGroup>
                              {patientList?.map((patient: any) => (
                                <CommandItem
                                  value={patient.label}
                                  key={patient.value}
                                  onSelect={() => {
                                    form.setValue("patientId", patient.value);
                                  }}
                                >
                                  {patient.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      patient.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appointmentType"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select appointment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="checkUp">Check Up</SelectItem>
                          <SelectItem value="routine">Routine</SelectItem>
                          <SelectItem value="followUp">Follow Up</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }: any) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Doctor</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? doctorList.find(
                                    (doctor: any) =>
                                      doctor.value === field.value
                                  )?.label
                                : "Select doctor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search doctor..."
                              className="h-9"
                            />
                            <CommandEmpty>No doctor found.</CommandEmpty>
                            <CommandGroup>
                              {doctorList?.map((doctor: any) => (
                                <CommandItem
                                  value={doctor.label}
                                  key={doctor.value}
                                  onSelect={() => {
                                    form.setValue("doctorId", doctor.value);
                                  }}
                                >
                                  {doctor.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      doctor.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetClose>
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

export default RegisterAppointment;
