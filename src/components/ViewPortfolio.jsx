import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const ViewPortfolio = () => {
  const { id } = useParams();
  const [portfolioData, setportfolioData] = useState(null)
  const fetchportfolioData = async () => {
    const res = await fetch('http://localhost:5000/portfolio/getbyid/' + id)
    console.log(res.status);
    const data = await res.json()
    console.table(data);
    setportfolioData(data)
  }

  useEffect(() => {
    fetchportfolioData()
  }, [])
  const displayportfolio = () => {
    if (portfolioData !== null) {
      return (<div className='container w-100'>
        <img className='w-25 d-block' src={'http://localhost:5000/' + portfolioData.image} alt=" " />
        <div className="p-4">
          <p className='m-0'>Full Name</p>
          <h2>{portfolioData.fullname}</h2>

          <p></p>
          <h2>{portfolioData.bio}</h2>
          <h2>{portfolioData.facebook}</h2>
          <h2>{portfolioData.linkedin}</h2>
          <h2>{portfolioData.email}</h2>
          <h2>{portfolioData.skills}</h2>
          <h2>{portfolioData.createdat}</h2>
          <h2>{portfolioData.image}</h2>


        </div>
      </div>)
    }
  }

  return (
    <div className="">

      {/* <h1> Portfolio</h1>*/}
      <div className="mt-5" >
        {displayportfolio()}
      </div>
    </div>
  )
}

export default ViewPortfolio