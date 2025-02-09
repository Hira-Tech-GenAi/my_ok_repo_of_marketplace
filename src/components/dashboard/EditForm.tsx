"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

import { categories } from "@/lib/categories";
import { useState } from "react";
import { useFormState } from "react-dom";
import { editProduct } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { type $Enums } from "@prisma/client";
import { SubmitButton } from "../SubmitButton";

interface iAppProps {
  data: {
    id: string;
    images: string[];
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

export function EditForm({ data }: iAppProps) {
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useFormState(editProduct, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <input type="hidden" name="productId" value={data.id} />
        <div className="flex items-center gap-4">
          <Button variant={"outline"} size={"icon"} asChild>
           
            <Link href={"/dashboard/products"}>
              <ChevronLeft className=" h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
        </div>

        
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>

            <CardDescription>
              In this form you can update yor existing product
            </CardDescription>

            <CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Label>Product Name</Label>
                    <Input
                      type="text"
                      key={fields.name.key}
                      name={fields.name.name}
                      defaultValue={data.name}
                      placeholder="Product Name"
                      className="w-full"
                    />

                    <p className="text-red-500">{fields.name.errors}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Product Description</Label>
                    <Textarea
                      key={fields.description.key}
                      name={fields.description.name}
                      defaultValue={data.description}
                      placeholder="Product Description"
                    />
                    <p className="text-red-500">{fields.description.errors}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label>Price</Label>
                    <Input
                      key={fields.price.key}
                      name={fields.price.name}
                      defaultValue={data.price}
                      type="number"
                      placeholder="$99"
                    />

                    <p className="text-red-500">{fields.price.errors}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Featured Product</Label>
                    <Switch
                      key={fields.isFeatured.key}
                      name={fields.isFeatured.name}
                      defaultChecked={data.isFeatured}
                    />
                    <p className="text-red-500">{fields.isFeatured.errors}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Status</Label>
                    <Select
                      key={fields.status.key}
                      name={fields.status.name}
                      defaultValue={data.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-red-500">{fields.status.errors}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>Category</Label>
                    <Select
                      key={fields.category.key}
                      name={fields.category.name}
                      defaultValue={data.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-red-500">{fields.category.errors}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label> Images</Label>
                    <input
                      type="hidden"
                      value={images}
                      key={fields.images.key}
                      name={fields.images.name}
                      defaultValue={images.length > 0 ? images[0] : ""}
                    />
                  
                    {images.length > 0 ? (
                      <div className="flex  gap-5">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px]"
                          >
                            <Image
                              src={image}
                              alt="image"
                              width={100}
                              height={100}
                              className="object-cover w-full h-full rounded border"
                            />
                            <button
                              onClick={() => handleDelete(index)}
                              type="button"
                              className="absolute -top-3 -right-3  bg-red-500 p-2 rounded-lg text-white"
                            >
                              <XIcon className="w-3 h3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setImages(res.map((arr) => arr.url));
                        }}
                        onUploadError={() => {
                          alert("something went wrong");
                        }}
                      />
                    )}
                    <p className="text-red-500">{fields.images.errors}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <SubmitButton text="Edit Product" />
              </CardFooter>
            </CardHeader>
          </CardHeader>
        </Card>
      </form>
    </>
  );
}
