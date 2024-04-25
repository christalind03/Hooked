"use client"

import { Button } from "../ui/Button"
import { UserAvatar } from "@/components/NavBar/UserAvatar"
import { useRouter } from "next/navigation"
import { useUser } from "@/components/UserProvider"

export function NavBar() {
  const router = useRouter()
  const supabaseUser = useUser()

  return (
    <div className="backdrop-blur-lg flex h-14 items-center justify-between left-0 px-5 sticky top-0 z-10">
      <h1 className="cursor-pointer font-extrabold text-xl" onClick={() => router.push("/home")}>🧶 Threadify</h1>

      <div className="cursor-pointer flex gap-3 items-center justify-center">
        {supabaseUser ? (
          <UserAvatar supabaseUser={supabaseUser} />
        ) : (
          <Button onClick={() => router.push("/login")}>Log In</Button>
        )}
      </div>
    </div>
  )
}
