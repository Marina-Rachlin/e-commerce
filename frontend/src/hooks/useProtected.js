import UserAuth from "./userAuth";
import { useRouter } from "next/router";
import React from "react";

function Protected({ children }) {
  const isAuthenticated = UserAuth();// check the state.auth
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/");
    return null; 
  }

  return children;
}

export default Protected;

