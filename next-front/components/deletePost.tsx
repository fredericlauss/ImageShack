"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DeletePost({
  post_by,
  image,
  user,
}: {
  post_by: string;
  image: string;
  user: any;
}) {
  const router = useRouter();
  console.log("image", image);

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("object_id", image);

    if (error) {
      console.error(error.message);
    } else {
      console.log("Succcesfully remove image");
      router.refresh();
    }
  };
  return (
    <div className=" absolute top-0 right-5">
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
