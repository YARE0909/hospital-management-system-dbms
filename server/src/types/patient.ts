export interface Patient {
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    gender: "male" | "female";
    mobile_no: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}