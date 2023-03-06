import styles from '@/styles/Home.module.css';
import Posts from '@/components/Posts';
import { useContext } from "react";
import { globalContext } from "context/globalContext";


export default function Home() {
  const { walletStatus } = useContext(globalContext);
  return (
    <>
      {
        walletStatus && <Posts />
      }
    </>
  )
}
