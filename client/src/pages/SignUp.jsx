// import ui components from flowbite-react
import { Button, Label, TextInput } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { Alert } from "flowbite-react";
// import react hooks
import { useState } from "react";
// import routing tools
import { Link, useNavigate } from "react-router-dom";
// import alert feadback icon
import { HiInformationCircle } from "react-icons/hi";
import OAuth from "../components/OAuth";

const SignUp = () => {
  // form data state
  const [formData, setFormDate] = useState({});
  // error message state
  const [errorMessage, setErrorMessage] = useState("");
  // loading state
  const [loading, setLoading] = useState(false);
  // navigate hook to redirect the user
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // handle form submision
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate input fileds
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill all fileds.");
    }

    try {
      // start loading and clear error
      setLoading(true);
      setErrorMessage(null);

      // send login request to the backend
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // parse the response
      const data = await res.json();

      // handle error message from the server
      if (data.success === false) {
        setLoading(null);
        return setErrorMessage(data.message);
      }

      // stop loading after successfull response
      setLoading(false);

      // redirect user to the signin page
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      // handle network or server error
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen max-w-screen-md mx-auto pt-20 px-4  ">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:pt-0">
        {/* left section: logo and welcome message */}

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
          <p className="mt-4 dark:text-gray-200 text-zinc-700">
            Welcome! Please sign up using your email and password, or continue
            with your Google account.
          </p>
        </div>
        {/* right section: signin form */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username">Your username</Label>
              </div>
              <TextInput
                id="username"
                name="username"
                type="text"
                placeholder="username"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:bg-gradient-to-l focus:ring-blue-300 focus:ring-1 dark:focus:ring-blue-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    color="purple"
                    className=""
                    aria-label="Extra small spinner example"
                    size="sm"
                  />
                  <span className="pl-2">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex items-center gap-2 mt-4 text-sm text-zinc-500 dark:text-gray-200">
            <span>Have an account?</span>
            <Link to={"/signin"} className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Alert!</span> {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
