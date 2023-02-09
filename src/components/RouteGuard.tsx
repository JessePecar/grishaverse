import { userService } from "@/services/userService";
import { useRouter } from "next/router"
import React from 'react';

const RouteGuard: React.FC<{children: JSX.Element}> = (props) => {
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
  }, []);

  const authCheck = (url: string) => {
    const publicPaths = ['/Login'];
    const path = url.split('?')[0];

    if(!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/Login',
        query: {
          returnUrl: router.asPath,
        }
      });
    } else {
      setAuthorized(true);
    }
  }
  //Return page or got to login page
  return (authorized ? props.children : <></>);
}


export default RouteGuard;