import React, { useState, useEffect } from "react";
import { css } from "styled-components/macro";
import tw from "twin.macro";
import color from "color";

const Announcement = (props) => (
  <div title={props.guid["#text"]} css={tw`mr-8 my-8 flex-1`} className="card">
    <h4>
      <a href={props.link}>{props.title}</a>
    </h4>
    <p>{props.description}</p>
  </div>
);

const Product = (props) => (
  <div key={props.PubId} css={tw`mr-8 my-8 flex-1`} className="card">
    <h4>
      <a href={`https://www.dvrpc.org/Products/${props.PubId}`}>
        {props.Title}
      </a>
    </h4>
    <p>{props.Abstract}</p>
  </div>
);

const Event = (props) => {
  const [, mon, day] = props.StartDate.split("-");
  const month = [
    ,
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][+mon];
  const hour = +props.StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + props.StartTime.substring(2);
  return (
    <div
      key={props.StartDate + props.StartTime}
      css={tw`mr-8 my-8 w-1/4`}
      className="card"
    >
      <h3>
        {props.StartTime !== "00:00" && (
          <span css={tw`float-right`}>{start}</span>
        )}
        {month} {day}
      </h3>
      <p>{props.Info ? <a href={props.Info}>{props.Title}</a> : props.Title}</p>
    </div>
  );
};

const Tweet = (props) => <div className="card">Twitter</div>;

const Infobar = () => {
  const tabs = [
    { title: "Announcements", key: "anns", render: Announcement },
    { title: "Products", key: "pubs", render: Product },
    { title: "Events", key: "events", render: Event },
    { title: "Twitter", key: "twitter", render: Tweet },
  ];
  const [active, setActive] = useState(null);
  const [state, setState] = useState({});
  useEffect(() => {
    fetch("https://www.dvrpc.org/asp/homepage/")
      .then((response) => response.json())
      .then((data) => setState(data));
  }, []);

  return (
    <aside>
      <div
        css={css`
        ${tw`flex justify-center text-gray-900-75`}
        background-color: ${(props) => props.theme.bgPrimary};
      `}
      >
        <div
          css={css`
            ${tw`flex justify-center justify-between mx-4`}
            width: 120ch;
          `}
        >
          {tabs.map(({ title }) => (
            <h2
              css={`${tw`cursor-pointer no-underline flex-auto font-bold text-xl leading-none rounded-lg rounded-b-none pt-4 pl-4 pb-2 mt-2 mr-8 mb-0`} background-color: ${(
                props
              ) => color(props.theme.bgPrimary).lighten(0.15).string()}`}
              key={title}
              onClick={(ev) => {
                const selected = ev.target.innerText;
                setActive(active === selected ? null : selected);
              }}
            >
              {title}
            </h2>
          ))}
        </div>
      </div>
      <div
        css={css`${tw`flex justify-center text-gray-900-75`} background-color: ${(
          props
        ) => color(props.theme.bgPrimary).lighten(0.15).string()}`}
      >
        <div
          css={css`
            ${tw`flex flex-wrap justify-center justify-between mx-4`}
            width: 120ch;
          `}
        >
          {tabs.map(
            ({ title, key, render }) =>
              active === title && state[key]?.map(render)
          )}
        </div>
      </div>
    </aside>
  );
};

export default Infobar;
