"use server";

import { server } from "@/lib/server";
import { z } from "zod";
import { formSchema } from "../_components/RegisterPatient";

interface responseType {
  hasError: boolean;
  message: string;
  data: any;
}

const registerPatient = async (patient: z.infer<typeof formSchema>) => {
  try {
    const response: responseType = await server.post("/patients/register", {
      data: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth
          ? new Date(patient.dateOfBirth).toISOString()
          : undefined,
        mobileNo: patient.mobileNo,
        gender: patient.gender,
        password: "password",
      },
    });
    if (response.hasError === false) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default registerPatient;
