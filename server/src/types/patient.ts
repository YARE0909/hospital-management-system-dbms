export interface Patient {
    firstName: string,
    lastName: string | null,
    dateOfBirth: Date,
    gender: string,
    mobileNo: string,
    email: string,
    password: string
}