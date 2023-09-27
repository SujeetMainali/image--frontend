import { useForm } from "react-hook-form";
import "./App.css";
import { useState } from "react";
import useAPI from "./hooks/useApi";

function App() {
  const { post, postSingleMedia } = useAPI();
  const [image, setImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [data, setData] = useState<any>();
  console.log(data, 'dataa');
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      width: "",
      height: "",
      image: [],
    },
  });
  const convertForPreview = (data: Blob[]) => {
    setPreviewImage(URL.createObjectURL(data[0]));
  };

  const submit = async (data: any) => {
    const imageResponse = await postSingleMedia(
      "/mediaUpload/IMAGE/single",
      image
    );
    const response = await imageResponse.data;

    const submitData = {
      title: data.title,
      uploadedImage: response?.data,
      width: data.width,
      height: data.height,
    };
    const postResponse = await post("/image", submitData);
    const resp = await postResponse.data;
    setData(resp);
  };

  return (
    <div>
      <div className="form_div">
        <form action="" className="form" onSubmit={handleSubmit(submit)}>
          <label htmlFor="">Title</label>
          <input type="text" placeholder="Title" {...register("title")} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <label htmlFor="">Width</label>
            <input type="number" {...register("width")} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <label htmlFor="">Height</label>
            <input type="number" {...register("height")} />
          </div>
          <label>Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="custom-file-input"
            onChange={(e: any) => {
              // setValue("image", Array.from(e.target?.files));
              setImage(Array.from(e.target?.files));
              convertForPreview(e?.target?.files);
            }}
          />
          <div>{image && <img src={previewImage} height={"100px;"} />}</div>
          <input type="submit" />
        </form>
      </div>
      <div>
        <div>{image && <img src={previewImage} alt="" />}</div>
        {data && (
          <div
            style={{
              border: "2px solid black",
              display: "flex",
              // flexDirection: "column",
            }}
          >
            <span>{data?.data?.title}</span>
            <img src={data?.data?.uploadedImage?.path} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
