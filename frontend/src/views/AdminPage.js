import { useContext, useEffect } from "react";
import ProfileContext from "../context/ProfileContext";
import { Redirect } from "react-router-dom";
import useAxios from "../utils/useAxios";

export default function AdminPage() {
    // const { userProfile } = useContext(ProfileContext);
    // const axios = useAxios();

    // if (!userProfile?.eh_diretor) {
    //     console.log("oi");
    //     return <Redirect to="/" />;
    // } else {
    //     axios
    //         .get("http://127.0.0.1:8000/api/users/")
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    return <h1>Admin Page</h1>;
}
