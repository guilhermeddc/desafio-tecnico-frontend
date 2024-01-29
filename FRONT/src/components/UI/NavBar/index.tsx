"use client";

import React, { useState } from "react";
import { Button } from "../Button";
import { ModalAddCard } from "../ModalAddCard";
import { sessionService } from "../../../services/api";

export const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((state) => !state);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((state) => !state);
  };

  return (
    <>
      <nav className="bg-ada">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://ada.tech/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg"
              alt="Ada Logo"
              height={86}
              width={86}
            />
            <span className="self-center text-2xl whitespace-nowrap pl-1 text-lime-500">
              Ada, a Nova Educação
            </span>
          </a>

          <div
            className="hidden w-60 md:w-auto space-x-6 md:flex"
            id="navbar-default"
          >
            <Button text="Novo" onClick={handleToggleModal} />

            <Button
              variant="outlined"
              text="Sair"
              onClick={sessionService.signOut}
            />
          </div>

          <button
            onClick={handleToggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="w-full md:hidden">
              <ul className="font-medium flex flex-col space-y-2 p-4 md:p-0 mt-4 rounded-lg bg-ada-light md:flex-row">
                <li
                  className="block py-2 px-3 text-white bg-lime-500 rounded md:bg-transparent cursor-pointer"
                  onClick={handleToggleModal}
                >
                  Novo
                </li>
                <li
                  className="block py-2 px-3 text-white rounded hover:bg-lime-500 md:hover:bg-transparent md:border-0 cursor-pointer"
                  onClick={sessionService.signOut}
                >
                  Sair
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <ModalAddCard openModal={isModalOpen} onClose={handleToggleModal} />
    </>
  );
};
