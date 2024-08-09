"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DeletePost({
  post_by,
  imageId,
  imageName,
  user,
}: {
  post_by: string;
  imageId: string;
  imageName: string;
  user: any;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("object_id", imageId);
    const { error: bucketError } = await supabase.storage
      .from("images")
      .remove([imageName]);
    console.log("ca doit tout supprimer");
    if (error || bucketError) {
      console.error(
        error ? error.message : bucketError ? bucketError.message : "errror"
      );
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
