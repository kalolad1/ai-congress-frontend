"use client";

import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { createUser } from "./api";

import { Stack, TextInput, Text, Button, Group, Title } from "@mantine/core";

import "./page.css";
import "./orbparticles.css";


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

  const numParticles = Array.from(Array(100).keys());

  const crazyOrbParticles = numParticles.map((number) => {
    return <div className='c' key={number}></div>;
  });

  return (
    <main>
      <div className="dialogue-container">
        <Stack gap={75}>
          <Stack mt={175} align="center">
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
      {/* Crazy orb in background */}
      <div className='wrap'>
        {crazyOrbParticles}
      </div>
    </main >
  );
}
