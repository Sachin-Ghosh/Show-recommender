import Navbar from "../components/Navbar";
import { useRouter } from 'next/router';
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const title = router.pathname === '/' ? 'Show List' : 'Show Details';

  return (
    <>
      <Navbar title={title} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;