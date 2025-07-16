// import necessary components and hooks
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../supabaseClient";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../redux/user/userSlice";

const DashProfile = () => {
  // get current user data from redux store
  const { currentUser, error } = useSelector((state) => state.user);

  // local state for file, preview url, upload status, and form data
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserSuccessfuly, setUpdateUserSuccessfuly] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    setUpdateUserError(null);

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


  // handle user delete account
  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data));
      }
      
    } catch (err) {
      dispatch(deleteUserFailure(err.message))
    }
  }

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
          <Button
            onClick={() => setShowModal(true)}
            color="red"
            className="flex items-center gap-2"
          >
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
          {error && <Alert color="failure">{error}</Alert>}
        </div>
      </div>

      {/* delet user warning modal box */}
      <div>
        <Modal
          show={showModal}
          size="md"
          onClose={() => setShowModal(false)}
          popup
          className="relative"
        >
          <div className=" fixed w-80 sm:w-96 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-md">
            <ModalHeader />
            <ModalBody>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete your account?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button  color="red" onClick={handleDeleteUser}>
                    Yes, I'm sure
                  </Button>
                  <Button
                    color="alternative"
                    onClick={() => setShowModal(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DashProfile;
