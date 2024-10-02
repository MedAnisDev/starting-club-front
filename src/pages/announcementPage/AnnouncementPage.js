import React from "react";
import { Card, Button } from "antd";
import {fetchAllAnnouncements} from "../../service/announcement/announcement";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toolbar } from "../../components";
import "./announcementPage.css";
function AnnouncementPage() {

  const [announcements, setAnnouncements] = useState([]);
  const [pageNumber , setPageNumber] = useState(1) ;
  const [sortedBy , setSortedBy] = useState('createdAt') ;
  const [direction , setDirection] = useState('ASC') ;
  const isLoading = useSelector((state) => state.loader.state);

  //defining announcement columns
  const columns = [
    { value: "title", label: "Title" },
    { value: "createdAt", label: "created At" },
  ];

  const fetchAllAnnouncementsData  = async (pageNumber ,sortedBy) => {
    try { 
      const data = await fetchAllAnnouncements(pageNumber ,sortedBy) ;
      setAnnouncements(data);
    }catch(err){
      console.log("error : ", err);
    }
  }

  const onPageNumberChange = (value)=> {
    setPageNumber(value) ;
  }
  const onSortedByChange = (value)=> {
    setSortedBy(value);
  }
  const onDirectionChange = (value)=> {
    setDirection(value);
  }

  useEffect(() => {
    console.log("sortedBy selected : ", sortedBy);
    console.log("pageNumber selected : ", pageNumber);
    fetchAllAnnouncementsData(pageNumber ,sortedBy);
  }, [pageNumber ,sortedBy]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="news-page">
      <h2 className="page-title">Announcements</h2>
      <Toolbar 
        pageNumber={pageNumber}
        onPageNumberChange={onPageNumberChange}
        sortedBy={sortedBy}
        onSortedByChange={onSortedByChange}
        columns={columns}
      />
      <div className="announcement-cards-container">
        
        {announcements.length === 0 ? (
          <p> there is no announcements yet to load !</p>
        ) : (
          announcements.map((announcement, index) => (
            <Card
              key={index}
              hoverable
              className="announcement-card"
              cover={
                <img
                  alt={announcement.title}
                  src={announcement.image}
                  className="announcement-image"
                />
              }
            >
              <h3>{announcement.title}</h3>
              <p className="announcement-date">{announcement.date}</p>
              <p className="announcement-description">
                {announcement.description}
              </p>
              <Button type="primary">Lire plus</Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );

}

export default AnnouncementPage;
