"use client"

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { Button, Stack, Title, Grid, Tooltip, SegmentedControl } from "@mantine/core";
import { IconBrain, IconCoin, IconHeart, IconMoneybag, IconSocial, IconUmbrella, IconUsers, IconWallet } from '@tabler/icons-react';
import Chat from '@/app/chat/chat'
import Link from "next/link";

import classes from "@/app/chat/segmented_control.module.css";
import "./page.css";


export default function UserHome () {
  const user = useQuery(api.users.get, { userId: localStorage.getItem("userId")! });

  return (
    <Grid gutter={0}>
      <Grid.Col span={3}>
        <Stack p="xl" className="column state-column">
          <Sidebar name={user?.name} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Chat name={user?.name} userId={user?.userId} />
      </Grid.Col>
    </Grid>
  );
}

function Sidebar ({ name }: { name: string }) {
  return (
    <Stack gap={70} justify="space-between" align="center">
      <Title mt="md" order={1}>{name}</Title>
      <StateDetail />
      <Button mt={140} className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconUsers size={14} />} variant="default" component={Link} href="/map">
        Find more people
      </Button>
    </Stack>
  );
}

function StateDetail () {
  const [demoType, setDemoType] = useState("general");

  let stateDetails;

  if (demoType === "general") {
    stateDetails = <GeneralStateDetails />;
  } else {
    stateDetails = <InsuranceStateDetails />;
  }

  return (
    <Stack>
      {stateDetails}
      <SegmentedControl
        radius="xl"
        size="sm"
        value={demoType}
        onChange={setDemoType}
        data={['general', 'insurance']}
        classNames={classes}
        w="100%"
      />
    </Stack>
  )
}

function GeneralStateDetails () {
  return (
    <Stack gap="xs" mt={60}>
      <Tooltip label="Net worth">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconMoneybag />} variant="default">
          $1,200,300
        </Button>
      </Tooltip>
      <Tooltip label="Health score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconHeart />} variant="default">
          44 / 100
        </Button>
      </Tooltip>
      <Tooltip label="Wellness score">
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

function InsuranceStateDetails () {
  return (
    <Stack gap="xs" mt={60}>
      <Tooltip label="Net worth">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconMoneybag />} variant="default">
          $1,200,300
        </Button>
      </Tooltip>
      <Tooltip label="Health score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconHeart />} variant="default">
          44 / 100
        </Button>
      </Tooltip>
      <Tooltip label="Insurance premium">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconCoin />} variant="default">
          $2,000
        </Button>
      </Tooltip>
      <Tooltip label="Insurance coverage">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconUmbrella />} variant="default">
          $100,000
        </Button>
      </Tooltip>
      <Tooltip label="Insurance deductible">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconWallet />} variant="default">
          $500
        </Button>
      </Tooltip>
    </Stack>
  )
}
