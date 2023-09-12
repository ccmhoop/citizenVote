import axios from "axios";
import { useSignIn } from "react-auth-kit";

function Register() {

    const signIn = useSignIn()



 return (
    <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
        <div className="h-fit w-fit bg-slate-900 text-white font-bold rounded-lg flex flex-col gap-5 p-5 m-2">
            <div className="flex justify-center text-2xl font-serif"><label>Register</label></div>
            <div className="border-2 border-white rounded mt-1"/>
            <div className="flex flex-col sm:flex-row gap-3">
                <div>
                    <label>username: <p id="reg_username_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_username" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>
                <div>
                    <label>email: <p id="reg_email_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_email" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>                
            </div>
           
            <div className="flex flex-col sm:flex-row gap-3">
                <div>
                    <label>first name: <p id="reg_firstname_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_firstname" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>
                <div>
                    <label>last name: <p id="reg_lastname_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_lastname" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>                
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div>
                    <label>adress: <p id="reg_adress_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_adress" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>
                <div>
                    <label>phone number: <p id="reg_phonenumber_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_phonenumber" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>                
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div>
                    <label>password: <p id="reg_password_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_password" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>
                <div>
                    <label>repeat password: <p id="reg_password2_error" className=" text-red-600 font-normal"></p></label>
                    <input id="reg_password2" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>                
            </div>
            <div className="border-2 border-white rounded mt-1"/>
            <div className="flex justify-center">
                <p id="auth_error" className=" text-red-600 font-normal"></p>
                </div>
                
                <div className="flex w-full justify-center">
                    <button onClick={() => RegisterButton()} className="w-48 h-9 rounded-md bg-blue-300">Sign Up</button>
                </div>
                <div className="flex justify-center font-normal">
                    <a href="/login" className="hover:underline">Already have an account? Login</a>
                </div>
        </div>
    </div>
 )
}

export default Register;