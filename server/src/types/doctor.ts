export interface Doctor {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    gender: "male" | "female";
    mobile_no: string;
    email: string;
    specialization: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}