"use client";
import Image from "next/image";
import gpay from "@/Untitled.png";
import rikroll from "@/rick.png";
import { useEffect } from "react";
import upi from "@/upi.png";

export default function Home() {
  useEffect(() => {
    async function ping() {
      const res = await fetch("/api/click");
      console.log(res);
      if (res.status === 200) {
        alert("Payment was successfully done");
        console.log("B*tch got fucked up successfully");
      }
    }
    ping();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14 relative pb-32 md:pb-20 mb-6">
      <div>
        <Image
          src={gpay}
          alt="GPAY logo"
          width={200}
          height={200}
          className="mix-blend-multiply mx-auto mb-2"
          priority
        />
        <Image
          src={rikroll}
          alt="QR"
          width={400}
          height={400}
          className="rounded-xl shadow-md"
          placeholder="blur"
        />
        <p className="text-xs text-zinc-500 mx-2">
          (Scan this QR to know more or visit this{" "}
          <a
            href="https://sl8.vercel.app/r8pvj"
            target="_blank"
            className="text-blue-500"
            rel="noopener noreferrer"
          >
            Link
          </a>
          )
        </p>
      </div>
      <p className="text-lg text-center my-6">
        Xeven has send you money, through this QR (₹11,000) .<br />
        You will receive the payment shortly!🎉
      </p>
      <button
        onClick={() => {
          alert("Payment is processing, please wait for a moment...");
        }}
        type="button"
        className="bg-blue-500 font-semibold active:scale-95 transition-all text-white px-4 py-2 rounded-lg"
      >
        Check Status
      </button>
      <div className="flex flex-col items-center absolute bottom-1 right-10 mix-blend-multiply">
        <p className="text-xs text-zinc-500">Powered by</p>
        <Image src={upi} alt="UPI" width={100} height={100} />
      </div>
    </main>
  );
}
