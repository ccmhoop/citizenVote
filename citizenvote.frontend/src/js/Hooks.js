



export const useToken = () => {
  if(document.cookie){
    var cookieArr = document.cookie.split(';')
    for(const cookie of cookieArr){
      const cookienv = cookie.split("=")
      if(cookienv[0] === "_auth"){
        console.log(cookienv[1].length)
        return cookienv[1];
      }
    }
  }
  return null;
}
    


