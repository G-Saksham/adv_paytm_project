import { Button } from "./button";

interface AppbarProps {
    user?: any
    // {
    //     name?: string | null,
    //     number: number,
    //     email?: string | null,
    //     password: string,
    // },
    // TODO: can u figure out what the type should be here?
    onSignin?: any
    onSignout?: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between px-6 bg-emerald-500 p-2">
        <div className="text-xl flex flex-col justify-center font-bold text-white">
            PayTM
        </div>
        <div className="">
            <Button 
                onClick={user ? onSignout : onSignin}
            >
                {user ? "Logout" : "Login"}
            </Button>
        </div>
    </div>
}