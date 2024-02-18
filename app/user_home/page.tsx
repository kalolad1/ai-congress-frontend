"use client"


import { Container, Flex, Button, Stack, Title, Grid, Tooltip } from "@mantine/core";
import { IconBrain, IconHeart, IconMoneybag, IconSocial, IconUsers } from '@tabler/icons-react';
import Chat from '@/app/chat/chat'

import Link from "next/link";
import "./page.css";



export default function UserHome () {
  return (
    <Grid gutter={0}>
      <Grid.Col span={3}>
        <Stack p="xl" className="column state-column">
          <Sidebar />
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
          <Chat />
      </Grid.Col>
    </Grid>
  );
}

function Sidebar () {
  return (
    <Stack gap={70} justify="space-between" align="center">
      <Title mt="md" order={2}>Darshan Kalola</Title>
      <StateDetail />
      <Button mt={140} className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconUsers size={14} />} variant="default" component={Link} href="/map">
        Find more people
      </Button>
    </Stack>
  );
}

function StateDetail () {
  return (
    <Stack gap="xs" mt={60}>
      <Tooltip label="Net worth">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconMoneybag />} variant="default">
          $1,200,300
        </Button>
      </Tooltip>
      <Tooltip label="Physical health score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconHeart />} variant="default">
          44 / 100
        </Button>
      </Tooltip>
      <Tooltip label="Wellbeing score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconBrain />} variant="default">
          79 / 100
        </Button>
      </Tooltip>
      <Tooltip label="Social score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconSocial />} variant="default">
          81 / 100
        </Button>
      </Tooltip>
    </Stack>
  )
}
