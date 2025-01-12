"use client"
import { useSelector } from "react-redux";
import Timer from "./components/Timer";


export default function Home() {
  const {user} = useSelector((state)=> state?.userData)
  console.log(user)
  return (
    <>
    <Timer timeSpan={1500}/>
    </>
  );
}
