import React from 'react';
import { useState , useEffect } from 'react';
import { notification, Button, Card } from "antd";
import {getAllAthletes , getAthleteById} from "../../service/athlete/athlete";
import { useNavigate } from 'react-router';
import Toolbar from '../../components/toolbar/Toolbar';
import './AthletePage.css';

const AthletePage = () => {
  const [athletes , setAthletes] = useState([]) ;
  const [pageNumber ,setPageNumber] = useState(1);
  const [sortedBy , setSortedBy] = useState('createdAt'); 

  const navigate = useNavigate() ;

  
  const sortedByColumns =[
    { value: "createdAt", label: "created At" },
    { value :'hasMedal' , label:"has Medal"}, 
    { value: "dateOfBirth", label: "date of birth"}
    ]
 
  const getAllAthletesData = async(pageNumber ,sortedBy) =>{
    try{
      const response = await getAllAthletes(pageNumber ,sortedBy) ;
      console.log("get all athletes repsonse : ",response);
      setAthletes(response) ;
    }catch(err){
      console.log("error from getAllAthletesData",err);
    }
  }

  const handleSeeAllButtonClick = (athleteId)=> {
    navigate(`/athlete-profile/${athleteId}`)
  }

  const onPageNumberChange = (value) =>{
    setPageNumber(value)
  }

  const onSortedByChange = (value) =>{
    setSortedBy(value)
  }

  useEffect(()=>{
    getAllAthletesData(pageNumber ,sortedBy) ;
  },[pageNumber ,sortedBy]);

  return (
    <div className='athlete-container'>
      <Toolbar 
         pageNumber={pageNumber}
         onPageNumberChange={onPageNumberChange}
         sortedBy={sortedBy}
         onSortedByChange={onSortedByChange}
         columns = {sortedByColumns}
      />
      {athletes.length>0 ?(
        athletes.map((athlete , index)=>(
          <Card
          key={index}
          hoverable
          className="athlete-card"
          >
           <h3>{athlete.firstname} - {athlete.lastname}</h3>
            <p>{athlete.dateOfBirth}</p>
            <p>{athlete.phoneNumber}</p>
            <p>{athlete.hasMedal? "has medal":"has no medals yet"}</p>
            <Button type="primary" onClick={() => handleSeeAllButtonClick(athlete.id)}>Lire plus</Button>
          </Card>
        ))
      ):(
        <p>there is no atholetes yet !</p>
      )
      }
    </div>
  );
};

export default AthletePage;