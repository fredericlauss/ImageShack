"use client";
import React, { useRef, useState } from "react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import DeletePost from "./deletePost";

export default async function ImageGalerie(user: any) {
  const supabase = createClient();

  let { data, error } = await supabase
    .from("posts")
    .select("id,created_at,post_by,object_id,name")
    .eq("post_by", user.user.id);

  const imgeUrlHost =
    "https://ihljnmkgeriqnjhrzcys.supabase.co/storage/v1/object/public/images/";

  const posts = data?.map((post) => {
    return {
      image: `${post.name}`,
      ...post,
    };
  });
  console.log("posts", posts);

  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        {posts?.map((post) => {
          return (
            <div
              key={post.id}
              className=" rounded-md w-full space-y-5 relative"
            >
              <div className="w-full h-96 relative rounded-md border">
                <img
                  src={imgeUrlHost + post.name}
                  alt={post?.name || ""}
                  className=" rounded-md object-cover object-center"
                />
              </div>
              <h2>{imgeUrlHost + post.name}</h2>
              <h1>@{post.post_by}</h1>
              <DeletePost
                post_by={post.post_by}
                image={post.object_id}
                user={user}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
