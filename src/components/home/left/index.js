import LeftLink from "./left_link";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";
export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} className="" alt="" />
        <span>
          {user?.first_name} {user?.last_name}{" "}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown />
          </div>
          <span> See More </span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown />
            </div>
            <span> Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://www.youtube.com/@MohamedHaJJi1"
          img="../../images/ytb.png"
          name="My Youtube channel"
        />
        <Shortcut
          link="https://www.instagram.com/atharva__deshpande/"
          img="../../images/insta.png"
          name="Instagram"
        />
      </div>
      <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
            <Link to="/"> Privacy <span>. </span> </Link>
            <Link to="/"> Terms <span>. </span> </Link>
            <Link to="/"> Advertising <span>. </span> </Link>
            <Link to="/"> Ad Choices <i className="ad_choices_icon"/><span>. </span> </Link>
            <Link to="/"> Cookies <span>. </span> </Link>
            <Link to="/"> More <span>. </span> <br/></Link> 
      </div>
    </div>
  );
}
