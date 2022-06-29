import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/username/${user.user_id}`);
        setRes(response.data.response.username);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Projected Page</h1>
      <p>{res}</p>
    </div>
  );
}

export default ProtectedPage;
