"use client"

export const Signup = () => {
    return <div className="flex flex-col-1 lg:flex-cols-2 w-full h-screen bg-emerald-100 p-6">
        <div className="flex flex-col justify-center bg-white w-full rounded-lg mr-3">
            <div className="rounded-lg">
                <div className=" flex justify-center font-extrabold text-4xl text-emerald-900">
                    Welcome to Paytm!
                </div>
                <div className="flex justify-center text-md pt-2 pb-4 text-emerald-800">
                    Already have an account? 
                    <div className="underline px-1">
                        Signin
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col w-80">
                        <Inputbox 
                            label="Name"
                            type="text"
                            placeholder="Name"
                            onChange={()=>{}}
                        />
                        <Inputbox
                            label="Email" 
                            type="text"
                            placeholder="Email"
                            onChange={()=>{}}
                        />
                        <Inputbox
                            label="Password" 
                            type="Password"
                            placeholder="Password"
                            onChange={()=>{}}
                        />
                        <Inputbox
                            label="Phone Number" 
                            type="Number"
                            placeholder="Number"
                            onChange={()=>{}}
                        />
                        <Submitbutton 
                            label="Signup with the Credentials"
                            onClick={()=>{ }}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full bg-emerald-100 rounded-lg hidden lg:block ml-3">
            <div className="flex justify-center">
                <div className="">
                    <div className="text-emerald-900 text-3xl font-semibold text-center">
                        Unlock endless possibilities with our secure payment platform
                    </div>
                    <div className="px-4 py-2 text-emerald-800 text-2xl font-semibold" >
                        “You can never cross the ocean until you have the courage to lose sight of the shore.”
                        <div className="text-lg ">
                            By Christopher Columbus
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export type inputbox = {
    label: string,
    type?: string,
    placeholder: string,
    onChange: (e: any) => void
}

export const Inputbox = ({
    label,
    type,
    placeholder,
    onChange
}: inputbox) => {
    return <div className="mb-6">
        <label className=" text-lg font-semibold text-emerald-800">{label}</label>
        <input 
            type={type} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-emerald-500 block w-full p-2.5"
            placeholder={placeholder}
            onChange={onChange}
            required
        />
</div>
}

export const Submitbutton = ({
    label,
    onClick
}: {
    label: string,
    onClick: (e: any) => void
 }) => {
    return <button 
        onClick={onClick}
        className="bg-emerald-500 hover:bg-emerald-600 rounded-lg p-4 text-lg font-semibold text-white"
        >
            {label}
    </button>
}