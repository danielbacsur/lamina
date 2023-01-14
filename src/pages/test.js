import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm)
      // Send Axios request here
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <>
    <div className="bg-black w-40 h-40 rounded"></div>
    <input
      autoFocus
      type='text'
      autoComplete='off'
      className='live-search-field'
      placeholder='Search here...'
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      </>
  )
};

export default Test;
