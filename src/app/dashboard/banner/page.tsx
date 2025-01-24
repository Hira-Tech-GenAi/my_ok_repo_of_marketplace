import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { prisma } from "@/lib/db";
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async  function BannerRoute() {

  const data = await getData();
  
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex  gap-x-2">
          <Link href={"/dashboard/banner/create"}>
            <PlusCircle className="w-4 h-4" />
            <span>Add Banner</span>
          </Link>
        </Button>
      </div>

      {/* Card */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage Your Banners</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {/* Table Cell */}
                  <TableCell>
                    <Image
                      alt="Product Image"
                      src={item.imageString}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover h-16 w-16"
                    />
                  </TableCell>

                  <TableCell className="font-medium">{item.title}</TableCell>

                  <TableCell className="text-end">
                    {/* Dropdown Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        {/* Dropdown Menu separator */}
                        <DropdownMenuSeparator />

                        {/* Dropdown Menu Item */}
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${item.id}/delete`}>Delete</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
