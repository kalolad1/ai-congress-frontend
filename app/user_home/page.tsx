"use client"

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { getStateDetail } from "@/app/api";

import { Button, Stack, Title, Grid, Tooltip, SegmentedControl } from "@mantine/core";
import { IconBrain, IconCoin, IconHeart, IconMoneybag, IconSocial, IconUmbrella, IconUsers, IconWallet } from '@tabler/icons-react';
import Chat from '@/app/chat/chat'

import classes from "@/app/chat/segmented_control.module.css";
import "./page.css";



export default function UserHome () {
  const user = useQuery(api.users.get, { userId: localStorage.getItem("userId")! });
  const [stateDetail, setStateDetail] = useState(null);

  const getStateDetailLocal = () => {
    getStateDetail(user?.userId)
      .then(result => result.json())
      .then(data => setStateDetail(data))
      .catch(err => console.log(err))
  }

  // useEffect(() => {
  //   getStateDetailLocal()
  //   const interval = setInterval(() => getStateDetailLocal(), 10000)
  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, [])

  return (
    <Grid gutter={0}>
      <Grid.Col span={3}>
        <Stack p="xl" className="column state-column">
          <Sidebar name={user?.name} stateDetail={stateDetail} />
        </Stack>
      </Grid.Col>
      <Grid.Col span={9}>
        <Chat name={user?.name} userId={user?.userId} />
      </Grid.Col>
    </Grid>
  );
}

function Sidebar ({ name, stateDetail }: { name: string, stateDetail: any }) {
  return (
    <Stack gap={70} justify="space-between" align="center">
      <Title mt="md" order={1}>{name}</Title>
      <StateDetail stateDetail={stateDetail} />
      <Button mt={140} className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconUsers size={14} />} variant="default" component={Link} href="/map">
        Find more people
      </Button>
    </Stack>
  );
}

function StateDetail (props) {
  const [demoType, setDemoType] = useState("general");

  let stateDetails;

  if (demoType === "general") {
    stateDetails = <GeneralStateDetails {...props} />;
  } else {
    stateDetails = <InsuranceStateDetails {...props} />;
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

function GeneralStateDetails ({ netWorth = 100, healthScore = 51, wellnessScore = 42, socialScore = 31 }) {
  return (
    <Stack gap="xs" mt={60}>
      <Tooltip label="Net worth">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconMoneybag />} variant="default">
          ${netWorth.toLocaleString("en-US")}
        </Button>
      </Tooltip>
      <Tooltip label="Health score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconHeart />} variant="default">
          {healthScore} / 100
        </Button>
      </Tooltip>
      <Tooltip label="Wellness score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconBrain />} variant="default">
          {wellnessScore} / 100
        </Button>
      </Tooltip>
      <Tooltip label="Social score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconSocial />} variant="default">
          {socialScore} / 100
        </Button>
      </Tooltip>
    </Stack>
  )
}

function InsuranceStateDetails ({ netWorth, healthScore, insurancePremium, insuranceCoverage, insuranceDeductible }) {
  return (
    <Stack gap="xs" mt={60}>
      <Tooltip label="Net worth">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconMoneybag />} variant="default">
          ${netWorth.toLocaleString("en-US")}
        </Button>
      </Tooltip>
      <Tooltip label="Health score">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconHeart />} variant="default">
          {healthScore} / 100
        </Button>
      </Tooltip>
      <Tooltip label="Insurance premium">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconCoin />} variant="default">
          ${insurancePremium.toLocaleString("en-US")}
        </Button>
      </Tooltip>
      <Tooltip label="Insurance coverage">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconUmbrella />} variant="default">
          ${insuranceCoverage.toLocaleString("en-US")}
        </Button>
      </Tooltip>
      <Tooltip label="Insurance deductible">
        <Button className="box-shadow" justify="center" radius="lg" size="lg" leftSection={<IconWallet />} variant="default">
          ${insuranceDeductible.toLocaleString("en-US")}
        </Button>
      </Tooltip>
    </Stack>
  )
}


/*
// General Case
{
  netWorth: number, // $
  healthScore: number, // 0-100
  wellnessScore: number, // 0-100
  socialScore: number, // 0-100
}

// Insurance Case
{
  netWorth: number, // $
  healthScore: number, // 0-100
  insurancePremium: number, // $
  insuranceCoverage: number, // $
  insuranceDeductible: number, // $
}
*/