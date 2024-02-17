"use client"


import { Container, Flex, Button, Stack, Title, Grid } from "@mantine/core";
import { IconUsers } from '@tabler/icons-react';

import Link from "next/link";
import "./page.css";



export default function UserHome () {
  return (
    <Grid gutter={0}>
      <Grid.Col span={2}>
        <Stack p="xl" className="column state-column">
          <StateDisplay />
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack p="xl" className="column">
          <Chatbot />
        </Stack>
      </Grid.Col>
      <Grid.Col span={2}>
        <Stack p="xl" className="column">
          <Button justify="center" fullWidth leftSection={<IconUsers size={14} />} variant="default" component={Link} href="/map">
            Find more people
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

function Chatbot () {
  return (
    <div>
      <Title>Chatbot</Title>
    </div>
  );
}

function StateDisplay () {
  return (
    <div>
      <Title>Darshan Kalola</Title>
      <br />
      <p>Net worth: 1,200,300</p>
      <p>Health score: 45/100</p>
      <p>Mental wellbeing score: 79/100</p>
      <p>Social wellbeing score: 81/100</p>
    </div>
  );
}
