import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { getToken } from "../js/getToken";


function Register(props) {

    const token = getToken();
    const signIn = useSignIn()


    async function RegisterButton(){
        const username = document.getElementById("reg_username").value
        const password = document.getElementById("reg_password").value
        const password2 = document.getElementById("reg_password2").value
        const email = document.getElementById("reg_email").value
        const phonenumber = document.getElementById("reg_phonenumber").value
        const adress = document.getElementById("reg_adress").value
        const firstname = document.getElementById("reg_firstname").value
        const lastname = document.getElementById("reg_lastname").value
        var iter = 0;


        iter += CheckFormErrors("reg_username_error", username, "Username Required", "reg_email_error", email, "Email Required")
        iter += CheckFormErrors("reg_firstname_error", firstname, "Firstname Required", "reg_lastname_error", lastname, "Lastname Required")
        iter += CheckFormErrors("reg_adress_error", adress, "Adress Required", "reg_phonenumber_error", phonenumber, "Phonenumber Required")
        iter += CheckFormErrors("reg_password_error", password, "Password Required", "reg_password2_error", password2, "Repeat Password Required") 
        if(password !== password2 && password.length !== 0 && password2.length !== 0){
            document.getElementById("reg_password_error").innerHTML = "Passwords not Matching"
            document.getElementById("reg_password2_error").innerHTML = "<br>"
        }
        else{
            document.getElementById("reg_password_error").innerHTML = ""
            document.getElementById("reg_password2_error").innerHTML = ""
            iter++
        }
        //passwords

       

        if(iter === 5){
            var url = null;
            
            if(props.registryType === "manicipality"){
                url = "http://localhost:8080/api/v1/manicipalityRegistry"
                
            }
            else if(props.registryType === "citizen"){
                url = "http://localhost:8080/api/v1/auth/register"
            }
            


            await axios.post(url, {
                firstname,
                lastname,
                phonenumber,
                username,
                password,
                adress,
                email
            }, token.cfg)
            .then(response => {
                console.log(response)
                
                if(props.registryType === "manicipality"){
                    document.getElementById("auth_error").style.color = "green"
                    document.getElementById("auth_error").innerHTML = "User Succesfully created"

                    document.getElementById("reg_username").value = ""
                    document.getElementById("reg_password").value = ""
                    document.getElementById("reg_password2").value = ""
                    document.getElementById("reg_email").value = ""
                    document.getElementById("reg_phonenumber").value = ""
                    document.getElementById("reg_adress").value = ""
                    document.getElementById("reg_firstname").value = ""
                    document.getElementById("reg_lastname").value = ""
                }
                else if(props.registryType === "citizen"){
                    signIn({
                        token: response.data.token,
                        expiresIn: 60,
                        tokenType: "Bearer",
                        authState: {username: response.data.name, role: response.data.role}
                    })
                    window.location.pathname = ''
                }
                
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 403){
                    document.getElementById("auth_error").style.color = "red"
                    document.getElementById("auth_error").innerHTML = "No Authorization!"
                }
                else if(error.response.status > 499){
                    document.getElementById("auth_error").style.color = "red"
                    document.getElementById("auth_error").innerHTML = "Internal Server Error"
                }
            })
        }



    }

 return (
    <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
        <div className="h-fit w-fit bg-slate-900 text-white font-bold rounded-lg flex flex-col gap-5 p-5 m-2">
            {props.registryType === "manicipality" && 
            <>
                <div className="flex justify-center text-2xl font-serif"><label>Register Manicipality</label></div>
            </>
            }
             {props.registryType === "citizen" && 
            <>
                <div className="flex justify-center text-2xl font-serif"><label>Register</label></div>
            </>
            }
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
                    <input type="password" id="reg_password" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>
                <div>
                    <label>repeat password: <p id="reg_password2_error" className=" text-red-600 font-normal"></p></label>
                    <input type="password" id="reg_password2" className="sm:w-64 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                </div>                
            </div>
            <div className="border-2 border-white rounded mt-1"/>
            <div className="flex justify-center">
                <p id="auth_error" className=" text-red-600 font-normal"></p>
                </div>
                
                <div className="flex w-full justify-center">
                {props.registryType === "manicipality" && 
                    <button onClick={() => RegisterButton()} className="w-48 h-9 rounded-md bg-blue-300">Create Account</button>
                }
                {props.registryType === "citizen" && 
                    <button onClick={() => RegisterButton()} className="w-48 h-9 rounded-md bg-blue-300">Sign Up</button>
                }
                </div>
                {props.registryType === "citizen" && 
                <div className="flex justify-center font-normal">
                    <a href="/login" className="hover:underline">Already have an account? Login</a>
                </div>}
        </div>
    </div>
 )
}


function CheckFormErrors(form1errId, form1errvalue,form1errMsg,form2errId,form2errvalue,form2errMsg){
    if(form1errvalue.length < 1 || form2errvalue.length < 1){
        document.getElementById(form1errId).innerHTML = form1errMsg
        document.getElementById(form2errId).innerHTML = form2errMsg
        if(form1errvalue.length >= 1){
            document.getElementById(form1errId).innerHTML = "<br>"
            
        }
        if(form2errvalue.length >= 1){
            document.getElementById(form2errId).innerHTML = "<br>"
        }
        return 0;
    }
    else{
        document.getElementById(form1errId).innerHTML = ""
        document.getElementById(form2errId).innerHTML = ""
        return 1;
    }
}

export default Register;