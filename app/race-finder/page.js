// pages/race-finder.js
"use client";
import dynamic from 'next/dynamic';
import { useState } from "react";
// import Image from "next/image";


const RaceFinderComponent = dynamic(() => import('../components/RaceFinderComponent.js'), {
	ssr: false,
})
const RaceFinder = () => {
	const [races, setRaces] = useState([
    {
      id: 1,
      name: "Western States 100",
      date: "June 25th, 2025",
      tags: ["lottery", "WS qualifier"],
      location: { lat: 39.2241, lng: -120.2176 },
      image: "/images/western-states.jpg",
    },
    {
      id: 2,
      name: "Twisted Fork Trail Festival",
      date: "June 15th, 2025",
      tags: [],
      location: { lat: 40.725192364214685, lng: -111.5468284534004 },
      image: "/images/western-states.jpg",
    },
    {
      id: 3,
      name: "UTMB",
      date: "August 30th, 2025",
      tags: ["UTMB Qualifier"],
      location: { lat: 45.92295771663605, lng: 6.871692761358857 },
      image: "/images/western-states.jpg",
    },
  ]);

	return (
		<>
			{/* <div>
        <div className="space-y-6">
          {races.map((race) => (
            <div key={race.id} className="border border-gray-300 rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold mt-2">{race.name}</h3>
              <p className="text-gray-600">{race.date}</p>
              <div className="flex space-x-2 mt-2">
                {race.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}
			<h1 className='text-center'>Race Finder</h1>
			<RaceFinderComponent races={races}/>
		</>
	)
}
export default RaceFinder
