import React from "react";
import { Fot1, Fot2 } from "../Components/index";
 // Adjust the path if needed

const Footer = () => {
  const footerNavs = [
    { href: "javascript:void()", name: "Terms" },
    { href: "javascript:void()", name: "License" },
    { href: "javascript:void()", name: "Privacy" },
    { href: "javascript:void()", name: "About us" },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <div>
            <img src="/logo.png" alt="Logo" className="w-32 h-100 object-contain"/>
          </div>
          
            <p className="max-w-md">
              Empowering fast, secure, and transparent supply chain management for a connected world.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li key={idx} className="text-gray-800 hover:text-gray-500 duration-150">
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="javascript:void()">
                <Fot1 />
              </a>
              <a href="javascript:void()" className="mt-0 block sm:mt-3">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p>© 2025 Divyansh Patel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
