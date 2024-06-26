"use client";
import React, { useRef, useState } from "react";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { useRouter } from "next/navigation";
import Tus from "@uppy/tus";
import { createClient } from "@/utils/supabase/client";

export default async function Uploader(user: any) {
  const router = useRouter();
  const supabase = createClient();
  const onBeforeRequest = async (req: any) => {
    const { data } = await supabase.auth.getSession();
    console.log(data.session?.access_token);
    req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
  };

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1000 * 1000,
      },
    }).use(Tus, {
      endpoint:
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable",
      onBeforeRequest,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );
  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: "images",
      contentType: file.type,
    };
  });

  uppy.on("upload-success", () => {
    uppy.cancelAll();
    document.getElementById("trigger-close")?.click();
    router.refresh();
  });

  const handleUpload = () => {
    if (uppy.getFiles().length !== 0) {
      //   const randomUUID = crypto.randomUUID();

      //   uppy.setFileMeta(uppy.getFiles()[0].id, {
      //     objectName: user?.id + "/" + randomUUID + "/" + uppy.getFiles()[0].name,
      //   });

      uppy.upload();
    } else {
      console.error("Please adding an image");
    }
  };

  return (
    <>
      <Dashboard uppy={uppy} className="w-auto" hideUploadButton />
      <button className="w-full" onClick={handleUpload}>
        Upload
      </button>
    </>
  );
}
