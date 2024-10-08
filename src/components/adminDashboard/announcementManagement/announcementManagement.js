import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Modal, Popconfirm, Typography , notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {fetchAllAnnouncements , deleteAnnouncementById, updateAnnouncement, createAnnouncement} from "../../../service/announcement/announcement";

import "./AnnouncementManagement.css"; 

const { Title } = Typography;

const AnnouncementManagement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
    const [pagination , setPagination] = useState({ current: 1, pageSize: 5, total: 0 }) ;
    const [sortedBy , setSortedBy] = useState('createdAt');
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    
    const formatDate = (date) => {
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => formatDate(text),
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text) => formatDate(text),
        },
        {
            title: 'Created By',
            dataIndex: 'createdBY',
            key: 'createdBY',
            render: (_, record) =>{
                const {createdBy} = record ;
                return createdBy ? `${createdBy.firstname} ${createdBy.lastname}` : "unknown"
            }, // Adjust based on user data structure
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEditAnnouncement(record)}
                        style={{ marginRight: 8 }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this announcement?"
                        placement="left"
                        onConfirm={() => handleDeleteAnnouncement(record.id)}
                        >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </div>
            ),
        }
    ];
    const handleTableChange = (newPagination)=>{
        setPagination(newPagination);
    }


    //Adding Announcement
    const onOkAddModal = ()=> {
        const jsonAnnouncement= {
            title : currentAnnouncement.title,
            content : currentAnnouncement.content
        }
        handleAddAnnouncement(jsonAnnouncement) ;
    }

    const handleAddAnnouncement = async (jsonAnnouncement) => {
        try{
            const response = await createAnnouncement(jsonAnnouncement)
            console.log("response of handle Add Announcement :",response);
            setAnnouncements([
                ...announcements , 
                {
                    title : response.title,
                    content : response.content
                }
            ]);
            notification.success({
                message: "Success",
                description: "new announcement Added successfully",
                placement: "topRight",
              });
            setIsAdding(false);

        }catch(err){
            console.log("error handle Add Announcement   : ", err);
        }
    };

    //Editing Announcement
    const handleEditAnnouncement = (record) => {
       setCurrentAnnouncement({
        id : record.id ,
        title : record.title,
        content : record.content,
        createdAt : record.createdAt,
        updatedAt : record.updatedAt,
        createdBy : record.createdBy,
    });
    setIsEditing(true) ;
    };

    const onOkEditModal = ()=> {
        const jsonAnnouncement= {
            title : currentAnnouncement.title,
            content : currentAnnouncement.content
        }; 
        handleUpdateAnnouncementData(currentAnnouncement.id , jsonAnnouncement) ;   
    }

    const handleUpdateAnnouncementData = async(announcementId , jsonAnnouncement)=> {
        try{
            const response = await updateAnnouncement(announcementId , jsonAnnouncement);
            console.log("response of handleUpdateAnnouncementData :",response);
            
            setAnnouncements(announcements.map((item)=>
                 item.id ===announcementId ?{
                    ...item ,
                    title : jsonAnnouncement.title,
                    content :jsonAnnouncement.content 
                 }: item
            ));

            notification.success({
                message: "Success",
                description: "announcement updated successfully",
                placement: "topRight",
              });
              setIsEditing(false);

        }catch(err){
            console.log("error handleUpdateAnnouncementData   : ", err);
        }
    }

    const handleDeleteAnnouncement = async (announcementId) => {
    try{
        const response = await deleteAnnouncementById(announcementId);
        notification.success({
          message: "Success",
          description: response,
          placement: "topRight", // or 'bottomRight'
        });
        setAnnouncements(announcements.filter((ann) => ann.id !== announcementId));
    } catch (err) {
        console.log("error delete announcement By Id  : ", err);
    }
    };


    const handleFetchAllAnnouncementData = async(pageNumber ,sortedBy) => {
      try  {
        const response = await fetchAllAnnouncements(pageNumber , sortedBy); 
        console.log("response of handleFetchAllAnnouncementData :",response);
        
        setAnnouncements(response) //setting datasource
        console.log("total:response.length : ",response.length);
        setPagination({... pagination , total:response.length})
    }catch(err){
        console.log("erro handle Fetch Al lAnnouncement Data :", err)
      }
    }

    const onCancelModal = () => {
        setIsAdding(false);
        setIsEditing(false);
        setCurrentAnnouncement(null);
    }

    useEffect(()=> {
        console.log("pagination. current: ",pagination.current); 
        handleFetchAllAnnouncementData(pagination.current , sortedBy); 
    },[pagination.current , sortedBy]);

    return (
        <div className="crud-wrapper">
            <Title level={2}>Announcement Management</Title>
            <Button
                type="primary"
                onClick={() => setIsAdding(true)}
                style={{ marginBottom: 16, maxWidth: 200}}
            >
                Add Announcement
            </Button>

            <Table
                dataSource={announcements}
                columns={columns}
                rowKey={(row) => row.id}
                pagination={{ pageSize: 5 }}
                onChange={(pagination)=> handleTableChange(pagination)}
            />

            <Modal
                title={isEditing ? "Edit announcement" : "Add announcement"}
                open={isAdding || isEditing}
                okText="Save"
                cancelText="Cancel"
                onOk={()=> {
                    isAdding ?  onOkAddModal(): onOkEditModal(); 
                }}
                onCancel={() => onCancelModal()}
            >
                <Form
                    initialValues={currentAnnouncement ? {
                        title: currentAnnouncement.title|| '',
                        content: currentAnnouncement.content|| ''
                    } : {}}
                    onValuesChange={(_, allValues) => {
                        setCurrentAnnouncement((previousState) => ({
                          ...previousState,
                          ...allValues,
                        }));
                      }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the announcement title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: 'Please input the announcement content!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AnnouncementManagement;
