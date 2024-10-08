import EventCalendar from '../../components/eventCalendar/EventCalendar';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Toolbar } from '../../components';
import { fetchAllEvents } from '../../service/event/event';
import { Card, Button, Select } from "antd";
import { useNavigate } from 'react-router-dom';
import { noData } from '../../assets';
import moment from 'moment';

import './EventsPage.css';
const { Option } = Select;

function EventsPage() {
  /**const events = [
    { title: 'Événement 1', date: '10/02/2024', location: 'Lieu 1', description: 'Description de l\'événement 1...' },
    { title: 'Événement 2', date: '15/03/2024', location: 'Lieu 2', description: 'Description de l\'événement 2...' },
  ]; */


  const columns = [
    { value: "createdAt", label: "created At" },
    { value :'date' , label:"Date"}, 
    { value: "title", label: "Title"}
    ];

  const types =[
    { value: "LONGUEUR", label: "longuer" },
    { value: "_100M", label: "100 m" },
    { value :'_400m' , label:"400 m"},    
    { value :'_800M' , label:"800 m"},   
  ]
  const isLoading = useSelector((state) => state.loader.state);
  const [pageNumber ,setPageNumber] = useState(1);
  const [sortedBy , setSortedBy] = useState('createdAt');
  const [events , setEvents]= useState([]);
  const[selectedType , setSelectedType] = useState('');
  
  const navigate = useNavigate(); 

  const onPageNumberChange = (value)=> {
    setPageNumber(value) ;
  }
  const onSortedByChange = (value)=> {
    setSortedBy(value);
  }

  const fetchAllEventsData = async(pageNumber ,sortedBy , selectedType)=>{
   try {
    const data = await fetchAllEvents(pageNumber ,sortedBy , selectedType) ;
    console.log("events in endpoint call: " , data);
    setEvents(data) ;
    }catch(err){
      console.log("error from fetchAllEventsData :", err)
    }
  }
  const handleSeeAllButtonClick =(eventId)=>{
    navigate(`/event-details/${eventId}`)
  }

  useEffect(()=>{
    fetchAllEventsData(pageNumber ,sortedBy , selectedType);
  },[pageNumber,sortedBy, selectedType])


  return (
    <div className="public-page-container">
      <h2 className='title'>Événements</h2>
      <Toolbar 
        pageNumber={pageNumber}
        onPageNumberChange={onPageNumberChange}
        sortedBy={sortedBy}
        onSortedByChange={onSortedByChange}
        columns={columns}
      />
      {/** selecting all events by type */}
      {/**<Select
        name="selectedType"
        value={selectedType}
        onChange={(value) => setSelectedType(value || '')}
        style={{ width: 200 }}
      >
        <Option value=''>All</Option>
        {
          types.map((type) =>{
            return (<Option value={type.value}>{type.label}</Option>) ;
          }
        )}
      </Select>
 */}
      {events.length === 0 ? (
        <div className="noData-container">
          <img src={noData} className="noData" />
        </div>
      ) : (
        <div className='card-container'>
          {events.map((event, index) => (
          <Card
              key={index}
              hoverable
              
          >
            <div className='card-content'>
              <h3 className='title'>{event.title}</h3>
              <p > {moment(event.date).format('MMMM Do YYYY, h:mm a')} - {event.location}</p>
              <p><strong>Category : </strong>{event.type}</p>
              <Button 
                type="primary" 
                onClick={() => handleSeeAllButtonClick(event.id)}
                style={{width:"200px"}}
                >
                  Lire plus
                </Button> 
            </div>
          </Card>
        ))}
        </div>
      )

      }
    </div>
  );
}

export default EventsPage;
