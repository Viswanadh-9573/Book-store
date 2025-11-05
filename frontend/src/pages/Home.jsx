import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import Search from '../components/Search'
import Category from '../components/Category'
import NewArrival from '../components/NewArrival'
import Newsletter from '../components/NewsLetter'
import { AppContext } from '../context/AppContext'
const Home = () => {
  const{setSearchQuery,setSelectedCategory}= useContext(AppContext);
  useEffect(()=>{
    setSearchQuery("");
    setSelectedCategory("");
  },[])
  return (
    <div>
        <Hero/>
        <Search/>
        <Category/>
        <NewArrival/>
        <Newsletter/>
       
    </div>
  )
}

export default Home
