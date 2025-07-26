import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    // footer
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 ">
        {/* footer content */}
      <div className="flex max-w-[1560px] mx-auto  flex-col md:flex-row flex-wrap  justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
      {/* footer left */}
        <div>
          <img className="w-32 sm:w-44" src={assets.logo} alt="logo" />
          <p className="max-w-[410px] mt-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        {/* footer right */}
        <div className="flex flex-wrap justify-between w-full lg:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index} className="">
              <h4 className="font-semibold text-base text-gray-500 mb-2 md:mb-5">
                {section.title}
              </h4>
              <ul className="text-sm space-y-1">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href={link} className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* footer copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © QuickBlog - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
