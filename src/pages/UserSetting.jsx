import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trimString } from "../utils/helper";
import { makePostRequest } from "../api/makePostRequest";
import { setUser } from "../store/appSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const UserSetting = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);
  const [formData, setFormData] = useState({
    fullname: user.fullname,
    username: user.username,
    avatar: user.avatar,
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(0);

  function changeFormData(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function newUserDataReciver(data) {
    // console.log(data);
    setSaveLoading(false);
    if (!data) {
      return;
    } else if (data.sucess == false) {
      setSaveError(data.message);
    } else if (data.sucess == true) {
      console.log(data.data);
      dispatch(setUser(data.data));
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
        // setImageLoading(progress);
        setAvatarLoading(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            changeFormData("avatar", downloadURL);
          }
          //   changeFormData("image", downloadURL)
        );
      }
    );
  }

  const isdisable = () => {
    if (!Object.values(formData).every((v) => v !== null)) {
      return true;
    } else if (
      formData.username == user.username &&
      formData.fullname == user.fullname &&
      formData.avatar == user.avatar
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pt-12 w-1/2 max-sm:w-full p-2 flex flex-col gap-2 ">
        <div className="flex flex-row items-center gap-2 border-2 border-base-content p-3 bg-base-300 border-opacity-10 rounded-xl">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={formData.avatar} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-xl">{formData.fullname}</p>{" "}
            <p className="text-xs font-semibold opacity-60">
              {"@" + formData.username}
            </p>
          </div>
        </div>
        <div className="bg-base-300 p-3 space-y-2 border-2 border-base-content border-opacity-10 rounded-xl flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={formData.avatar} />
            </div>
          </div>
          {avatarLoading > 0 && avatarLoading < 100 && (
            <progress
              className="progress"
              value={avatarLoading}
              max="100"
            ></progress>
          )}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => fileUpload(e.target.files[0])}
            accept="image/*"
          />
          <input
            type="text"
            placeholder="username"
            className="input input-bordered w-full"
            value={formData.username}
            onChange={(e) => {
              changeFormData("username", trimString(e.target.value));
            }}
          />
          <input
            type="text"
            placeholder="fullname"
            className="input input-bordered w-full"
            value={formData.fullname}
            onChange={(e) =>
              changeFormData("fullname", trimString(e.target.value))
            }
          />
          {saveError && (
            <p className="text-xs px-1 text-red-500">{saveError}</p>
          )}
          {saveLoading ? (
            <div className="border-2 border-base-content border-opacity-20 rounded-full flex justify-center items-center p-2">
              <span className="loading loading-dots loading-md"></span>
            </div>
          ) : (
            <button
              disabled={isdisable()}
              className="btn w-full bg-base-100 border-1 border-base-content border-opacity-20"
              onClick={() => {
                setSaveLoading(true);
                makePostRequest(
                  "https://gitsta.onrender.com/api/v1/user/update/" + user._id,
                  formData,
                  newUserDataReciver
                );
              }}
            >
              save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
