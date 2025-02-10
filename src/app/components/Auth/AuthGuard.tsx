"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isSignedIn }: { isSignedIn: boolean | null | undefined } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("/signin");
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn, router]);

  if (isLoading) return <p>Loading.... </p>;

  return <>{children}</>;
};

export default AuthGuard;
