



import { Chart } from "@/components/dashboard/Chart";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import RecentSales from "@/components/dashboard/RecentSales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";

import React from "react";

async function getData() {
  const now =new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);
  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: lastWeek
      }
      
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));
  return result;
}

const DashBoard = async() => {
  const data =await getData();
  return (
    <>
      <DashboardStats />

      <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <RecentSales />
      </div>
    </>
  );
};

export default DashBoard;
