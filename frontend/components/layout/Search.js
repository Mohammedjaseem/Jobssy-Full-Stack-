import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

import { useRouter } from 'next/router'

const Search = () => {

  const [Keyword, setKeyword] = useState('')
  const [Location, setLocation] = useState('')

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault()

    if(Keyword){
      let searchQuery = `/?keyword=${Keyword}`;
      if(Location) searchQuery =  searchQuery.concat(`&location=${Location}`)

      console.log(searchQuery)
      
      router.push(searchQuery)
    } else {
      router.push('/')
    }
  }
  


  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/job-search.svg" alt="search" fill="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> SEARCH</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Enter Your Keyword"
                    value={Keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-industry"></i>
                  <input
                    type="text"
                    placeholder="Enter City, State ..."
                    value={Location}
                    onChange={(e) => setLocation(e.target.value)}
                    
                  />
                </div>
              </div>
              <div className="searchButtonWrapper">
                <button type="submit" className="searchButton">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search