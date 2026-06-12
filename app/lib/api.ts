//export getter instead of const
export const getInternalApiBaseUrl = () => {
  const url = process.env.INTERNAL_API_BASE_URL;
  if (!url) throw new Error("INTERNAL_API_BASE_URL is not defined");
  return url;
};

console.log(getInternalApiBaseUrl)

export const STATUS_MESSAGES: Record<number, string> = {
        400: "Invalid Input Data",
        404: "Authentication service unavailable (404).",
        409: "An account with this email already exists.",
        500: "Internal server error. Please try again later.",
      };