import React from 'react'

export default function Categories() {



  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Toys", "Automotive", "Books", "Fashion", "Home & Garden",];
  
  return (
    <div className="mt-8">
    
      <ul  className=" w-[217px] h-[344px] flex flex-col justify-between  ">
        {categories.map((category, index) => (
        <li key={index} className="h-[24px] capitalize text-sm">{category}</li>
        ))}
      </ul>
   
    </div>
  )
}
