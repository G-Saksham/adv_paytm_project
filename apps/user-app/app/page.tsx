"use client"

import {signIn, signOut, useSession } from "next-auth/react"
import {Button} from "@repo/ui/button"
import {useBalance} from "@payment-exchange/store/useBalance"
import { Appbar } from "@repo/ui/Appbar"

export default function Page(): JSX.Element {
  const session = useSession();
  const balance = useBalance();
  return (
    <div >
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
    </div>
  );
}