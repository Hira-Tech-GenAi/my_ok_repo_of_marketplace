import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { prisma } from "@/lib/db";
import { AvatarImage } from "../ui/avatar";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,

      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}

const RecentSales = async() => {
  const data = await getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardContent className="flex flex-col gap-8">
          {data.map((item) => (
            <div className="flex items-center gap-4" key={item.id}>
              <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarImage src={item.User?.profileImage} alt ="avatar image" />
                <AvatarFallback>
                  {item.User?.firstName.slice(0, 3)}
                </AvatarFallback>
              </Avatar>

              <div className="grid gap-1">
                <p className="font-medium text-sm">{item.User?.firstName}</p>
                <p className="text-muted-foreground text-sm">
                  {item.User?.email}
                </p>
              </div>
              <p>+${new Intl.NumberFormat("en-US").format(item.amount/100)}</p>
            </div>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RecentSales;
