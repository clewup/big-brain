import React, { SetStateAction, useState } from "react";
import { Button } from "@mui/material";
import { Endpoints } from "@/enums/endpoints";
import { HttpMethods } from "@/enums/httpMethods";

interface IProps {
  setImageUrl: React.Dispatch<SetStateAction<string>>;
  setError: React.Dispatch<SetStateAction<any>>;
}

const UploadInput: React.FC<IProps> = ({ setImageUrl, setError }) => {
  const [image, _setImage] = useState<string>("");

  const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "";
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    fetch(Endpoints.CLOUDINARY_UPLOAD, {
      method: HttpMethods.POST,
      body: data,
    })
      .then(async (res) => {
        const data = await res.json();
        setImageUrl(data.url);
      })
      .catch((err) => setError(err));
  };

  const setImage = (file: File | undefined) => {
    if (!file) return;

    let reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => {
      _setImage(reader.result as string);
    };
  };

  return (
    <div>
      <input
        accept={"image/*"}
        type={"file"}
        onChange={(e) => setImage(e.target.files?.[0])}
      />
      <Button onClick={uploadImage}>Upload</Button>
    </div>
  );
};
export default UploadInput;
