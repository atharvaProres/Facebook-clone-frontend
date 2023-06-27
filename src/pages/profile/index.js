import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import {useEffect, useReducer, useState} from "react";
import {useSelector} from "react-redux"
import { profileReducer } from "../../functions/reducer";
import Header from "../../components/header";
import "./style.css";
import Cover from "../../components/profile/Cover";
import ProfilePictureInfos from "../../components/profile/ProfilePictureInfos";
import ProfileMenu from "../../components/profile/ProfileMenu";
import PeopleYouMayKnow from "./PeopleYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";

export default function Profile({setVisible}) {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  var userName = username === undefined ? user.username : username;
  
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);
  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  console.log(profile);
  return <div className="profile">
    <Header page="profile"/>
    <div className="profile_top"> 
      <div className="profile_container"> 
        <Cover cover={profile.cover}/>
        <ProfilePictureInfos profile={profile}/>
        <ProfileMenu/>
      </div>
    </div>
    <div className="profile_bottom">
      <div className="profile_container"> 
        <div className="bottom_container"> 
          <PeopleYouMayKnow/>
        </div>
        <div className="profile_left"></div>
        <div className="profile_right">
          <CreatePost user={user} profile setVisible={setVisible}/>
          <GridPosts/>
        </div>
      </div>
    </div>
  </div>
}
