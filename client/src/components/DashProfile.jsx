import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const DashProfile = () => {
  // get current user data from redux store
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-96 md:w-[500px] mt-4 sm:mt-16 ">
        <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>
        <form className="w-full flex flex-col items-center justify-stretch">
          <div className="h-28 w-28 rounded-full overflow-hidden p-0.5 border-4 ">
            <img
              className="h-full w-full rounded-full"
              src={currentUser.profilePicture}
              alt=""
            />
          </div>
          <div className="w-full flex flex-col gap-5 mt-6">
            <div>
              <TextInput
                id="username"
                name="username"
                type="text"
                placeholder="username"
                defaultValue={currentUser.username}
              />
            </div>
            <div>
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                defaultValue={currentUser.email}
              />
            </div>
            <div>
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <Button
              type="submit"
              outline
              color="purple"
              className=" from-purple-600  to-blue-500  hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Update
            </Button>
          </div>
        </form>
        <div className="flex justify-between mt-4">
          <Button color={"red"} className=" flex items-center gap-2">
            <MdDelete className="h-4 w-4" />
            <span>Delete</span>
          </Button>
          <Button color="blue" className="flex items-center gap-2">
            <span>Sign Out</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
