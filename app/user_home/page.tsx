"use client"


import Link from "next/link";




export default function UserHome () {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex justify-items-center w-3/12 border-x p-12">
        <StateDisplay />
      </div>
      <div className="w-6/12 border-x p-12">
        Middle
      </div>
      <div className="w-3/12 border-x p-12">
        <Link href="/map">Go to map</Link>
      </div>
    </div>
  );
}



function StateDisplay () {
  return (
    <div>
      <h1 className="text-xl font-bold text-center">Darshan Kalola</h1>
      <br />
      <StateItemCard />
      <p>Health score: 45/100</p>
      <p>Mental wellbeing score: 79/100</p>
      <p>Social wellbeing score: 81/100</p>
    </div>
  );
}

function StateItemCard () {
  return (
    <div className="border">
      <p>Net worth: 1,200,300</p>
    </div>
  )
}