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

const CreatePost = () => {
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
          <img
            src={formData.image}
            className="rounded-xl border-2 border-base-content border-opacity-10 "
            alt=""
          />
        ) : (
          <div className=" border-2 h-96 border-base-content border-opacity-10 space-y-3 p-3 flex flex-col justify-center items-center rounded-xl bg-base-300">
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
          onChange={(e) => changeFormData("text", trimString(e.target.value))}
        ></textarea>
        {createLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <button
            className="btn bg-base-300 rounded-xl border-2 border-base-content border-opacity-10"
            onClick={() => {
              setCreateLoading(true);
              if (!Object.values(formData).includes(null)) {
                makePostRequest("https://gitsta.onrender.com/api/v1/post/create", formData, callBack);
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
