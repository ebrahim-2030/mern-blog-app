// import necessary components and hooks
import { Alert, Button, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../supabaseClient";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";

const DashProfile = () => {
  // get current user data from redux store
  const { currentUser } = useSelector((state) => state.user);

  // local state for file, preview url, upload status, and form data
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccessfuly, setUpdateUserSuccessfuly] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  // reference to hidden file input
  const filePickerRef = useRef(null);

  // dispatch function from redux
  const dispatch = useDispatch();

  // handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // show image preview
    }
  };

  // update formData state when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle profile form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccessfuly(null);
    setUpdateUserError(null)

    // skip if no new input
    if (Object.keys(formData).length === 0 && !imageFile) {
      setUpdateUserError("No Changes is Made");
      return;
    }

    try {
      dispatch(updateStart());
      setUploading(true);

      let profilePictureUrl = currentUser.profilePicture;

      // if new image file is selected, upload it to supabase
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${currentUser._id}_${Date.now()}.${fileExt}`;
        const filePath = `profile/${fileName}`;

        // upload file to supabase storage
        const { error: uploadError } = await supabase.storage
          .from("mern-blog")
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("upload error:", uploadError.message);
          setUploading(false);
          dispatch(updateFailure(uploadError.message));
          return;
        }

        // generate a signed URL for accessing the uploaded image
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("mern-blog")
            .createSignedUrl(filePath, 60 * 60 * 24 * 7);

        if (signedUrlError) {
          console.error("signed url error:", signedUrlError.message);
          setUploading(false);
          dispatch(updateFailure(signedUrlError.message));
          return;
        }

        profilePictureUrl = signedUrlData.signedUrl;
        // update preview with uploaded image URL
        setImageFileUrl(profilePictureUrl);
      }

      // combine form data and image URL
      const payload = { ...formData, profilePicture: profilePictureUrl };

      // send update request to backend
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // handle API response
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccessfuly("User Profile Update Sucessfully");
      }

      setUploading(false);
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(data.message);

      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-96 md:w-[500px] mt-4 sm:mt-16">
        <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>

        {/* profile update form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-stretch"
        >
          {/* hidden file input for profile picture */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />

          {/* clickable avatar image preview */}
          <div
            onClick={() => filePickerRef.current.click()}
            className="h-28 w-28 cursor-pointer rounded-full overflow-hidden p-0.5 border-4"
          >
            <img
              className="h-full w-full rounded-full"
              src={imageFileUrl || currentUser.profilePicture}
              alt="profile"
            />
          </div>

          {/* form fields */}
          <div className="w-full flex flex-col gap-5 mt-6">
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <TextInput
              id="password"
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
            />

            {/* submit button */}
            <Button
              type="submit"
              outline
              color="purple"
              className="from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              disabled={uploading}
            >
              {uploading ? "updating..." : "update"}
            </Button>
          </div>
        </form>

        {/* actions: delete and sign out */}
        <div className="flex justify-between mt-4">
          <Button color="red" className="flex items-center gap-2">
            <MdDelete className="h-4 w-4" />
            <span>delete</span>
          </Button>
          <Button color="blue" className="flex items-center gap-2">
            <span>sign out</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-2">
          {updateUserSuccessfuly && (
            <Alert color="success">{updateUserSuccessfuly}</Alert>
          )}

          {updateUserError && <Alert color="failure">{updateUserError}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
