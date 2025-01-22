export interface ErrorLog {
    message: string; // The error message
    stack?: string; // Optional stack trace for debugging
    method?: string; // HTTP method (e.g., GET, POST)
    endpoint?: string; // The API endpoint or URL where the error occurred
    requestData?: string; // The request payload or related data
    user?: string; // Reference to the user ID (optional)
    occurredAt?: Date; // Date when the error occurred, defaults to the current date
    createdAt?: Date; // Timestamp when the record was created
    updatedAt?: Date; // Timestamp when the record was last updated
}