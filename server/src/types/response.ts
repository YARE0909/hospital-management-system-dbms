export interface ServerResponse {
    hasError: boolean;
    message: string | null;
    data: any | null;
}