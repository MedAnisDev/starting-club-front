import { useEffect, useState } from "react";
import {
  Button,
  Form,
  DatePicker,
  Input,
  Table,
  Modal,
  Popconfirm,
  Select,
  Typography,
  notification,
} from "antd";
import { EditOutlined, DeleteOutlined , EyeOutlined } from "@ant-design/icons";
import {
  fetchAllEvents,
  deleteEventById,
  createEvent ,
  updateEvent,
} from "../../../service/event/event";
import moment from "moment";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router";

import "./eventManagement.css";

const EventManagement = () => {
  const navigate = useNavigate(); 
  
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: null,
    location: null,
    description: null,
    createdAt: null,
    updatedAt: null,
    date: null,
    type: null,
    createdBy: null,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [sortedBy, setSortedBy] = useState("createdAt");
  const [selectedType, setSelectedType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const eventTypes = [
    { label: "100M", value: "_100M" },
    { label: "400M", value: "_400M" },
    { label: "800M", value: "_800M" },
    { label: "Long Jump", value: "LONGUEUR" },
  ];

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Event Date",
      dataIndex: "date",
      key: "date",
      render: (text) => formatDate(text),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (text ? formatDate(text) : "Not updated"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (_, record) => {
        const { createdBy } = record;
        return createdBy
          ? `${createdBy.firstname || "Unknown"} ${createdBy.lastname || ""}`
          : "Unknown";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div  className="icon-container">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          />

          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleEditEvent(record)}
          />

          <Popconfirm
            title="Are you sure to delete this event?"
            onConfirm={() => handleDeleteEvent(record.id)}
            placement="left"
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger 
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleViewDetails = (event) => {
    navigate(`/dashboard/event-details/${event.id}`);
  };


  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Delete Evnet process
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await deleteEventById(eventId);
      notification.success({
        message: "Success",
        description: response,
        placement: "topRight",
      });
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      console.log("error handle Delete Event   : ", err);
    }
  };

  // EDITING PROCESS
  const handleEditEvent = (record) => {
    setCurrentEvent({
      id: record.id,
      title: record.title,
      location: record.location,
      description: record.description,
      date: record.date,
      type: record.type,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      createdBy: record.createdBy,
    });
    setIsEditing(true);
  };

  const onOkEditModal = () => {
    const jsonEvent = {
      id: currentEvent.id,
      title: currentEvent.title,
      location: currentEvent.location,
      description: currentEvent.description,
      date: currentEvent.date,
      type: currentEvent.type,
    };
    UpdateEventData(currentEvent.id, jsonEvent);
  };

  const UpdateEventData = async (eventId, jsonEvent) => {
    try {
      const response = await updateEvent(eventId, jsonEvent);
      console.log("response of handle Update Event Data :", response);

      setEvents(
        events.map((item) =>
          item.id === eventId
            ? {
                ...item,
                title: jsonEvent.title,
                location: jsonEvent.location,
                description: jsonEvent.description,
                date: jsonEvent.date,
                type: jsonEvent.type,
              }
            : item
        )
      );
      notification.success({
        message: "Success",
        description: "event updated successfully",
        placement: "topRight",
      });      
      setIsEditing(false);
    } catch (err) {
      console.log("error Update Event Data   : ", err);
    }
  };

  // Adding Events PROCESS
  const onOKAddModal = () => {
    const jsonEvent = {
      id: currentEvent.id,
      title: currentEvent.title,
      location: currentEvent.location,
      description: currentEvent.description,
      date: currentEvent.date,
      type: currentEvent.type,
    };
    createEventData(jsonEvent); 
  };

  const createEventData = async(jsonEvent)=> {
    try {
      const response = await createEvent(jsonEvent);
      console.log("response of create Event Data :", response);
      setEvents([
        ...events ,
        {
          id: response.id,
          title: response.title,
          location: response.location,
          description: response.description,
          date: response.date,
          type: response.type,
        }
      ]);
      setIsAdding(false);
    } catch (err) {
      console.log("error of create Event Data   : ", err);
    }
  }

  // FETCHING EVENTS PROCESS
  const fetchAllEventsData = async (pageNumber, sortedBy, selectedType) => {
    try {
      const response = await fetchAllEvents(pageNumber, sortedBy, selectedType);
      console.log("response of fetch All Events Data :", response);

      setEvents(response);
    } catch (err) {
      console.log("error fetch All Events Data   : ", err);
    }
  };

  const onCancelModal = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentEvent({
      id: null,
      title: "",
      location: "",
      description: "",
      date: null,
      type: "_100M",
    });
  
  };

  // Use Effect
  useEffect(() => {
    fetchAllEventsData(pageNumber, sortedBy, selectedType);
  }, [pageNumber, sortedBy ,selectedType , events.length]);

  return (
    <div className="event-container">
    <Title level={2}>Event Management</Title>

    <Button
      type="primary"
      style={{ marginBottom: 16, maxWidth: 200}}
      onClick={() => setIsAdding(true)}
      >
      New Event
    </Button>
      <Table
        columns={tableColumns}
        dataSource={events}
        pagination={{ pageSize: 5 }}
        rowKey={(row) => row.id}
      />

      <Modal
        open={isEditing || isAdding}
        okText="Save"
        cancelText="Cancel"
        onOk={() => {
          isAdding ? onOKAddModal() : onOkEditModal();
        }}
        onCancel={() => onCancelModal()}
      >
        <Form
          initialValues={
            currentEvent
              ? {
                  title: currentEvent?.title || "",
                  location: currentEvent?.location || "",
                  description: currentEvent?.description || "",
                  date: currentEvent?.date ? moment(currentEvent.date) : null,
                  type: currentEvent?.type || "_100M",
                }
              : {}
          }        
          onValuesChange={(_, allValues) => {
            setCurrentEvent((prevState) => ({ ...prevState, ...allValues }));
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input placeholder="Enter the event title" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the location!" }]}
          >
            <Input placeholder="Enter the event location" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea placeholder="Enter the event description" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker
              showTime
              placeholder="Select event date and time"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              { required: true, message: "Please select the event type!" },
            ]}
          >
            <Select placeholder="Select event type">
              {eventTypes.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventManagement;
