export const INTERNAL_API_BASE_URL = process.env.INTERNAL_API_BASE_URL

console.log(INTERNAL_API_BASE_URL)

export const STATUS_MESSAGES: Record<number, string> = {
        400: "Invalid Input Data",
        404: "Authentication service unavailable (404).",
        409: "An account with this email already exists.",
        500: "Internal server error. Please try again later.",
      };