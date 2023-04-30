import React, { useEffect, useState } from "react";
import "./Search.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUSer } from "../../Actions/User";
import User from "../User/User";
const Search = () => {
  const [name, setname] = useState("");
  const { allUser, loading } = useSelector((state) => state.allUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUSer());
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUSer(name));
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h4">Search user</Typography>

        <input
          type="text"
          placeholder="Enter Search Name"
          required
          onChange={(e) => setname(e.target.value)}
        />
        <Button disabled={loading} variant="contained" type="submit">
          Search
        </Button>
        <div className="searchResults">
          {allUser &&
            allUser.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
