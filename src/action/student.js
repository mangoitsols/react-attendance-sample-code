import { API } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authHeader } from "../comman/authToken";
import { handleLogout } from "../component/header";
toast.configure();

export function addStudent(data, callback) {
  const request = axios({
    method: "post",
    url: `${API.addStudent}`,
    data: data,
    headers: authHeader(),
  });
    return (dispatch) => {
      request
        .then((res) => {
          callback(res);
        })
        .catch(function (error) {
        if(error.response.status === 400){
          toast.error(error.response.data.message);
        }
        else if (error.response.status === 401) {
          handleLogout()
        }
          callback(error);
        });
    };
  }

  export function getStudent(callback) {
    const request = axios.get(`${API.getStudent}`);
    return (dispatch) => {
      request
        .then((res) => {
          callback(res);
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            handleLogout()
          }
          callback(error);
        });
    };
  } 