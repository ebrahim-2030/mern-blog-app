// import footer components from flowbite-react
import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

// import react-router-dom link
import { Link } from "react-router-dom";

// import social media icons
import {
  BsDribbble,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

const FooterComponent = () => {
  return (
    // footer container with top border
    <Footer container className=" border-t-8 border-purple-500 ">
      <div className="w-full">
        {/* top section with logo and link groups */}
        <div className="max-w-screen-xl  mx-auto justify-between sm:flex sm:items-start sm:justify-between">
          <Link
            to={"/"}
            className=" text-2xl md:text-4xl font-bold   pl-4 py-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-l-full font-mono   "
          >
            <span className="mr-1">Tech</span>
            <span className="bg-white text-purple-500 rounded-l-full px-4">
              Blogs
            </span>
          </Link>
          <FooterLinkGroup className="mt-6 sm:mt-0 flex flex-wrap gap-10 lg:gap-24">
            <div>
              <span className="text-lg dark:text-gray-200  text-zinc-600  mb-6 inline-block">
                About
              </span>
              <div className="flex flex-col gap-3 ">
                <FooterLink href="#">About Me</FooterLink>
                <FooterLink href="#">Mission & Vision</FooterLink>
                <FooterLink href="#">Testimonials</FooterLink>
              </div>
            </div>
            <div>
              <span className="text-lg dark:text-gray-200 text-zinc-600  mb-6 inline-block">
                Blog
              </span>
              <div className="flex flex-col gap-3 ">
                <FooterLink href="#">Latest Posts</FooterLink>
                <FooterLink href="#">Trending</FooterLink>
                <FooterLink href="#">Categories</FooterLink>
              </div>
            </div>

            <div>
              <span className="text-lg dark:text-gray-200 text-zinc-600  mb-6 inline-block">
                Legal
              </span>
              <div className="flex flex-col gap-3 ">
                Privacy Policy{" "}
                <FooterLink href="#">Terms & Conditions</FooterLink>
              </div>
            </div>
            <div>
              <span className="text-lg dark:text-gray-200 text-zinc-600  mb-6 inline-block">
                Follow Me
              </span>
              <div className="flex flex-col gap-3 ">
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Linkedin</FooterLink>
              </div>
            </div>
          </FooterLinkGroup>
        </div>

        {/* horizontal divider */}
        <FooterDivider />

        {/* bottom section with copyright and social icons */}
        <div className="sm:flex items-center  justify-between max-w-screen-xl mx-auto">
          <FooterCopyright
            href="#"
            by="Ebrahim Asil"
            className="text-base text-zinc-500 dark:text-gray-200"
            year={new Date().getFullYear()}
          />
          <div className="dark:text-gray-200 text-zinc-500 flex items-center gap-5 text-xl mt-4">
            <BsInstagram className="cursor-pointer" />
            <BsTwitterX className="cursor-pointer" />
            <BsGithub className="cursor-pointer" />
            <BsLinkedin className="cursor-pointer" />
            <BsDribbble className="cursor-pointer" />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
