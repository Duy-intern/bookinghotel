"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Layout, Typography,  } from "antd";
import {  useParams } from "next/navigation";
import { useAuth } from "@/components/hooks/useContext";
import Link from "next/link";

interface Hotel {
  name: string;
  ratings: number;
  address: string;
  city: string;
  price: number;
  submitStatus: string;
}

const EditHotel: React.FC = () => {
const [hotel,setHotel] = useState<Hotel | null>(null)
  const { _id } = useParams();
  const {token} = useAuth();
     useEffect(() => {
     const fetchHotel = async () => {
      if (!_id ||!token) return;
      try {
        const response = await axios.get(`http://localhost:3001/hotel/admin/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHotel(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchHotel();
  }, [_id,token]);

  const handleSubmit = async () => {
    if (!hotel || !token) return;
    
    try {
      await axios.patch(`http://localhost:3001/hotel/admin/${_id}`, 
        { ...hotel, submitStatus: "approved" }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHotel({ ...hotel, submitStatus: "approved" });
    } catch (error) {
      console.log(error);
    }
  };

  if (!hotel) {
    return <div>Loading</div>
  }
  return (
    <Layout style={{background:'#ffff', margin:'5px', padding:'5px'}}>
      <Typography.Title>Chi Tiết Khách Sạn</Typography.Title>
      <Typography.Text>Tên Khách Sạn: {hotel.name}</Typography.Text>
      <Typography.Text>Đánh giá: {hotel.ratings}</Typography.Text>
      <Typography.Text>Địa chỉ: {hotel.address}</Typography.Text>
      <Typography.Text>Thành Phố: {hotel.city}</Typography.Text>
      <Typography.Text>Giá: {hotel.price}</Typography.Text>
      <div style={{display:'flex' ,justifyContent:'space-between'}}>
      {hotel.submitStatus !== "approved" && (
        <Button style={{width:'120px'}} type="primary" onClick={handleSubmit} >
          Approve Hotel
        </Button>
      )}
      <Link href="/admin">
      <Button style={{width:'120px'}} type="primary" danger  >
          Quay Lại
        </Button></Link>
      </div>
     
  </Layout>
);
};

export default EditHotel;
