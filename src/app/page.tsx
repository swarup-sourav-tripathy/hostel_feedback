"use client"

import Form from "@/components/Form";
import Form2 from "@/components/Form2";
// import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [value, setValue] = useState("mess");

  const handleChange = (event: any , newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <NextUIProvider>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Mess Feedback" value="mess" />
          <Tab label="Cleanliness Feedback" value="cleanliness" />
        </Tabs>
        {value === "mess" ? <Form /> : <Form2 />}
      </NextUIProvider>
    </>
  );
}
