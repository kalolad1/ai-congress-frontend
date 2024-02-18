"use client";

import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { createUser } from "./api";

import "./page.css";
import { Stack, TextInput, Text, Button, Group, Title } from "@mantine/core";

export default function Home () {
  const [name, setName] = useState("");
  const createUserConvex = useMutation(api.users.create);
  const router = useRouter()

  const handleButtonClick = async () => {
    // Create user on backend
    // Call the api createUser and read the response
    createUser(name)
      .then(response => response.json())
      .then(data => {
        // Store user id in local storage
        localStorage.setItem('userId', data.user_id)

        // Store user in convex database
        createUserConvex({ name: name, userId: data.user_id.toString() })
          .then(response => console.log(response))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))    
    
    // Move to the next page
    router.push('/user_home')
  }

  return (
    <main>
      <div className="screen">
        <Stack gap={75}>
          <Stack align="center">
            <Title>What is your name?</Title>
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              size="xl"
              radius="xl"
              w="95%"
            />
          </Stack>
          <Stack align="center">
            <Button onClick={handleButtonClick} className="box-shadow" w="50%" justify="center" radius="lg" size="lg" variant="default">
              Begin
            </Button>
          </Stack>
        </Stack>
      </div>
    </main >
  );
}
