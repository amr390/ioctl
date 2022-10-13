
import { Router } from "next/router";
import { useEffect, useState } from "react"



export const useUser = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(()=> {
    async getUserDetails = ()=> {
      const {authenticated, user} = await getAuthenticatedUser();
      if (!authenticated) {
        Router.push(APP_ROUTES.SIGN_IN);
        return;
      }
      setUser(user);
      setAuthenticated(authenticated)
    }

    getUserDetails();
  }, []);
  return {user, authenticated}

}
