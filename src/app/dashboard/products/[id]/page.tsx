import { EditForm } from "@/components/dashboard/EditForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
async function getData(productId: string) {

  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}
const EditRoute = async ({ params }: { params: { id: string } }) => {
    noStore();
  const data = await getData(params.id);
  return (
    <div>
      <EditForm data={data}/>
    </div>
  );
};

export default EditRoute;
