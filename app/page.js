"use client"
import { useSelector } from "react-redux";
import Timer from "./components/Timer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter()
  const {user} = useSelector((state)=> state?.userData)
  useEffect(()=>{
    if(!user?.email){
      router.push("/sign-in")
    }
  },[user,router])
  return (
    <>
    {/* 25 minutes 1500 seconds */}
    <Timer timeSpan={10} timerType="focus-session"/>
    </>
  );
}
