import { TokenPayload } from "@/services/tokenService";

export function isTokenPayload(data: any): data is TokenPayload {
  return (
    data &&
    typeof data === "object" &&
    typeof data.id === "string" &&
    typeof data.email === "string" &&
    typeof data.name === "string"
  );
}
