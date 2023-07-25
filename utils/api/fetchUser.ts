import { toast } from "react-toastify";
import { IUser } from "@/types/user";

// This function will fetch and return user details
export default async function fetchUser(userId: string): Promise<IUser | null> {
  const response: Response = await fetch(`/api/users/${userId}`);

  // If response is not ok then show error toast
  if (!response.ok) {
    const errorText = await response.text();
    toast.error(errorText);
    return null;
  };

  // Convert to json and return the prompts
  const user: IUser = await response.json();
  return user;
};
