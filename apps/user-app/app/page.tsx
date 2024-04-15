"use client"

import {Button} from "@repo/ui/button"
import {useBalance} from "@payment-exchange/store/useBalance"

export default function Page(): JSX.Element {

  const balance = useBalance();
  return (
    <div >
      <div>
        pages client component balance = {balance}
      </div>
      <div>
        <Button>Click Here!</Button>
      </div>
    </div>
  );
}