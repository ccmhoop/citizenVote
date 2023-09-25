import axios from "axios";
import { useSignIn } from "react-auth-kit";

function Login() {
    const signIn = useSignIn()
   

    async function loginButton(){
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        document.getElementById("auth_error").innerHTML = ""
        var iter = 0;
    
        if(username.length < 1){
            document.getElementById("username_error").innerHTML = "You must provide an username!"
        }
        else{
            document.getElementById("username_error").innerHTML = ""
            iter++
        }
    
        if(password.length < 1){
            document.getElementById("password_error").innerHTML = "You must provide a password!"
        }
        else{
            document.getElementById("password_error").innerHTML = ""
            iter++
        }
        console.log(`username: ${username} , password: ${password} , iter: ${iter}`)

        // const cfg = {
        //     headers: {authorisation: {`Bearer ${token}`}}
        // }

        if(iter == 2){
           await axios.post("http://localhost:8080/api/v1/auth/auth", {
                username,
                password
            })
            .then(response => {
                console.log(response)
                signIn({
                    token: response.data.token,
                    expiresIn: 60,
                    tokenType: "Bearer",
                    authState: {username: response.data.name, role: response.data.role}
                })
                window.location.pathname = ''
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 403){
                    document.getElementById("auth_error").innerHTML = "Your username or password is incorrect"
                }
                else if(error.response.status > 499){
                    document.getElementById("auth_error").innerHTML = "Internal Server Error"
                }
            })
        }
    
    
    }

    return (
        <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
            <div className="h-fit w-fit bg-slate-900 text-white font-bold rounded-lg flex flex-col gap-5 p-5">
                <div className="flex justify-center text-2xl font-serif"><label>Login</label></div>
                <div className="border-2 border-white rounded mt-1"></div>
                <label>Username: <p id="username_error" className=" text-red-600 font-normal"></p></label>
                <input id="username" className="sm:w-96 border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                <label>Password: <p id="password_error" className=" text-red-600 font-normal"></p></label>
                <input type="password" id="password" className="border border-solid border-neutral-300 bg-transparent  bg-clip-padding px-3 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"/>
                <div className="flex flex-col sm:flex-row gap-1 justify-evenly font-normal ">
                    <div className="flex gap-3 my-5 sm:m-0 ">
                        <input type="checkbox"/>
                        <label>Remember me</label>
                    </div>
                    <div><a href="/forgotPassword" className="hover:underline items-center">forgot password?</a></div>                    
                </div>
                <div className="border-2 border-white rounded mt-1"></div>
                <div className="flex justify-center">
                <p id="auth_error" className=" text-red-600 font-normal"></p>
                </div>
                
                <div className="flex w-full justify-center">
                    <button onClick={() => loginButton()} className="w-48 h-9 rounded-md bg-blue-300">Login</button>
                </div>
                <div className="flex justify-center font-normal">
                    <a href="/register" className="hover:underline">No account? Register</a>
                </div>
                
                
                

            </div>
        </div>
    )
}





export default Login;