import { useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { useRouter } from "next/router";
// components
import SigninButton from "@/components/SigninButton";


export default function Home() {
  const router = new useRouter();
  useEffect(() => {});



  return (
    <>
      <button onClick={() => {router.push("/create-profile")}}>Create Profile</button>
      <SigninButton />
      <button onClick={() => {router.push("/create-post")}}>Create Post</button>
    </>
  )
}
