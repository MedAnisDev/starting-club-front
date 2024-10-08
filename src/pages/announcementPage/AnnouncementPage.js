import React from "react";
import { Card, Button, Modal } from "antd";
import {fetchAllAnnouncements} from "../../service/announcement/announcement";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toolbar } from "../../components";

import { noData } from "../../assets";
import moment from "moment"; 


import "./announcementPage.css";
function AnnouncementPage() {

  const [announcements, setAnnouncements] = useState([]);
  const [pageNumber , setPageNumber] = useState(1) ;
  const [sortedBy , setSortedBy] = useState('createdAt') ;
  const [direction , setDirection] = useState('ASC') ;
  const isLoading = useSelector((state) => state.loader.state);

  const [isReadingContent , setIsReadingContent] = useState(false) ;
  const [selectedContent , setSelectedContent] = useState('') ;


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

  const showModal = (currentContent)=> {
    setIsReadingContent(true);
    setSelectedContent(currentContent);
  }
  const hideModal = ()=> {
    setIsReadingContent(false);
    setSelectedContent('');
  }

  useEffect(() => {
    console.log("sortedBy selected : ", sortedBy);
    console.log("pageNumber selected : ", pageNumber);
    fetchAllAnnouncementsData(pageNumber ,sortedBy);
  }, [pageNumber ,sortedBy]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="public-page-container">
      <h2 className="title">Actualités</h2>
      <Toolbar 
        pageNumber={pageNumber}
        onPageNumberChange={onPageNumberChange}
        sortedBy={sortedBy}
        onSortedByChange={onSortedByChange}
        columns={columns}
      />

      <div className="card-container" >
        
        {announcements.length === 0 ? (
          <div className="noData-container">
            <img src={noData} className="noData" />
          </div>
        ) : (
          announcements.map((announcement, index) => (
            <Card
              key={index}
              hoverable
            >
              <h3 className="title">{announcement.title}</h3>

              <p 
              className="card-description ellipsis-tooltip" 
              onClick={()=>showModal(announcement.content)}
              >
                <div>{announcement.content}</div>
              </p>             

              <p className="card-description no-wrap">
                <strong>Publié</strong>: {moment(announcement.createdAt).format('MMMM Do YYYY, h:mm a')}
              </p>
            </Card>
          ))
        )}
      </div>
      <Modal
        title="contenu d'annonce :"
        open={isReadingContent}
        onOk={()=>hideModal()}
        onCancel={()=>hideModal()}
      >
        <p className="modal-text-content">{selectedContent}</p>
      </Modal>
    </div>
  );

}

export default AnnouncementPage;
