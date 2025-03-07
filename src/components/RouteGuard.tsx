import { userService } from "@/services/userService";
import { useRouter } from "next/router"
import React from 'react';

function RouteGuard({children} : {children?: React.ReactNode}) {
  const router = useRouter();
  const [authorized, setAuthorized] = React.useState(false);

  React.useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCheck = (url: string) => {
    console.log("Checking the user's auth");
    const publicPaths = ['/Login', '/CreateAccount'];
    const path = url.split('?')[0];

    if(!userService.userValue && !publicPaths.includes(path)) {
      console.log("Unauthorized access!");
      setAuthorized(false);
      router.push({
        pathname: '/Login',
        query: {
          returnUrl: router.asPath,
        }
      });
    } else {
      console.log("Authorized access");
      setAuthorized(true);
    }
  }
  //Return page or got to login page
  if (authorized) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return null;
  }
}


export default RouteGuard;