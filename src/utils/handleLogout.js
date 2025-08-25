import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function handleLogout() {
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
      // Optional: do additional cleanup or redirect
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}