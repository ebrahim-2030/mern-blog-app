import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen max-w-screen-md mx-auto pt-20 px-4  ">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:pt-0">
        {/* left */}
        <div className="flex-1">
          <Link
            to={"/"}
            className=" text-3xl md:text-4xl font-bold   pl-4 py-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-l-full font-mono   "
          >
            <span className="mr-1">Tech</span>
            <span className="bg-white text-purple-500 rounded-l-full px-4">
              Blogs
            </span>
          </Link>
          <p className="mt-4 text-zinc-700">
            Welcome! Please sign up using your email and password, or continue
            with your Google account.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username">Your username</Label>
              </div>
              <TextInput
                id="username"
                name="username"
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Your password</Label>
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="password"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:bg-gradient-to-l focus:ring-blue-300 focus:ring-1 dark:focus:ring-blue-800"
            >
              Sign Up
            </Button>
            {/* <Button type="submit" className="from-pink-600 to-orange-400 hover:bg-gradient-to-b  focus:ring-blue-300 focus:ring-1 dark:focus:ring-blue-800 border-2 border-t-[3px] border-orange-400 hover:border-none text-zinc-700 " outline>Continue with Goolge</Button> */}
          </form>
          <div className="flex items-center gap-2 mt-4 text-sm text-zinc-500">
            <span>Have an account?</span>
            <Link to={"/signin"} className="text-blue-500 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
