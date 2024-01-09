import React, { useState } from "react";
import { makePostRequest } from "../api/makePostRequest";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { trimString } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const store = useSelector((store) => store.app);
  const [formData, setFormData] = useState({
    text: null,
    image: null,
    uid: store.user._id,
  });
  const [imageLoading, setImageLoading] = useState(0);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  console.log(formData, imageLoading);

  function changeFormData(key, value) {
    setFormData({
      ...formData,
      [key]: value,
    });
  }

  function callBack(data) {
    setCreateLoading(false);
    console.log(data);
    if (!data) {
      return;
    } else if (data.sucess == false) {
      return;
    } else if (data.sucess == true) {
      navigate("/post/" + data.data?._id);
    }
  }

  function fileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(Math.round(progress));
        setImageLoading(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          changeFormData("image", downloadURL)
        );
      }
    );
  }

  return (
    <div className="pt-14 flex flex-col p-2 items-center">
      <div className="w-1/2 max-sm:w-full flex flex-col space-y-2">
        {formData.image ? (
          <div className="avatar border-2 border-base-content rounded-xl border-opacity-10">
            <div className="w-full aspect-square rounded-xl">
              <img src={formData.image} />
            </div>
          </div>
        ) : (
          <div className=" border-2 aspect-square border-base-content border-opacity-10 space-y-3 p-3 flex flex-col justify-center items-center rounded-xl bg-base-300">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Pick a image</span>
                <span className="label-text-alt text-red-600">
                  only less than 2MB
                </span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) => fileUpload(e.target.files[0])}
                accept="image/*"
              />
            </label>
            {imageLoading > 0 && imageLoading < 100 && (
              <progress
                className="progress"
                value={imageLoading}
                max="100"
              ></progress>
            )}
          </div>
        )}

        <textarea
          className="textarea textarea-bordered rounded-xl bg-base-300 font-semibold"
          placeholder="Caption here"
          disabled={formData.image ? false : true}
          onChange={(e) => changeFormData("text", trimString(e.target.value))}
        ></textarea>
        {createLoading ? (
          <div className="w-full bg-base-300 rounded-xl p-3 flex justify-center items-center">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <button
            className="btn bg-base-300 rounded-xl border-2 border-base-content border-opacity-10"
            disabled={formData.image && formData.text ? false : true}
            onClick={() => {
              setCreateLoading(true);
              if (!Object.values(formData).includes(null)) {
                makePostRequest(
                  "https://gitsta.onrender.com/api/v1/post/create",
                  formData,
                  callBack
                );
              }
            }}
          >
            create
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
