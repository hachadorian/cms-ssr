import React, { useContext } from "react";
import Async from "react-async";
import tw, { css } from "twin.macro";
import { ThemeContext } from "styled-components";
import SocialMedia from "./SocialMedia";

const Header = ({ children }) => {
  const theme = useContext(ThemeContext);

  return (
    <header tw="bg-white">
      <div tw="container md:h-32 md:px-8 xl:p-0 mx-auto flex flex-wrap sm:flex-no-wrap items-start justify-center sm:justify-between">
        <a href="/" tw="block self-center">
          <img
            src="https://www2.dvrpc.org/img/gatsby/5546_DVRPC_Primary.png"
            alt="DVRPC"
            tw="m-4 md:ml-0"
            css={css`
              height: 70.5px;
            `}
          />
        </a>
        <div tw="flex flex-col items-end">
          <SocialMedia />
          <form
            tw="sm:w-auto w-full relative bg-white rounded"
            action="https://www2.dvrpc.org/Search/"
          >
            <div tw="w-16 h-full flex absolute items-center justify-center pointer-events-none">
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
                tw="w-8 h-8 inline-block fill-current text-gray-600 flex-shrink-0 select-none"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </div>
            <div tw="w-full">
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                tw="sm:w-64 w-full border-0 border-none rounded-full m-0 p-2 pl-16 block bg-gray-100 border-2 border-solid border-gray-100 focus:border-gray-300 focus:outline-none min-w-0"
              />
            </div>
          </form>
        </div>
      </div>
      <div
        tw="w-full bg-bottom flex flex-col items-center justify-center p-8"
        css={(props) =>
          css`
            background-image: url(${props.theme.bgImage[1]}),
              url(${props.theme.bgImage[0]});
            background-size: 1600px 400px, cover;
            min-height: 24rem;
          `
        }
      >
        {children}
        <div
          tw="self-end absolute right-0 text-black font-bold italic pr-2"
          css={css`
            text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
              1px 1px 0 #fff;
          `}
        >
          {theme.bgCredits}
        </div>
      </div>
    </header>
  );
};

export default Header;
