import React, { useContext } from "react";
import tw, { css } from "twin.macro";
import { useTheme } from "@emotion/react";
import LogoBar from "./LogoBar";
import I from "./Icon";

const Header = ({ children }) => {
  const theme = useTheme();

  return (
    <header tw="bg-white">
      <LogoBar />
      <div
        tw="relative"
        css={css`
          height: 25vw;
        `}
      >
        {theme.bgImage.map((bg, i) => (
          <img
            srcSet={theme.bgImage2x[i] && `${theme.bgImage2x[i]} 2x`}
            src={bg}
            alt=""
            tw="absolute w-full h-full object-cover"
          />
        ))}
        <div tw="container mx-auto py-8">
          <form
            tw="mb-4 relative md:w-min md:pr-32"
            css={css`
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.8) 18rem,
                transparent 100%
              );
            `}
            action="https://www.dvrpc.org/Search/"
          >
            <div tw="w-16 h-full flex absolute items-center justify-center pointer-events-none">
              <I
                use="search"
                fillColor="#6d6d6d"
                tw="h-6 inline-block flex-shrink-0 select-none"
              />
            </div>
            <div>
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                tw="w-72 border-0 border-none m-0 p-2 pl-16 block bg-transparent focus:outline-none min-w-0 placeholder-gray-600"
              />
            </div>
          </form>
        </div>
        {children}
      </div>
      {theme.bgCredits && (
        <div
          tw="absolute right-0 p-1 px-2 leading-none text-gray-900 text-sm"
          css={css`
            padding-left: 8rem;
            background: linear-gradient(
              to right,
              transparent,
              rgba(255, 255, 255, 0.8) 8rem,
              rgba(255, 255, 255, 0.8) 100%
            );
            margin-top: -2.5rem;
          `}
        >
          {theme.bgCredits}
        </div>
      )}
    </header>
  );
};

export default Header;
