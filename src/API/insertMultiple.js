import axios from "axios";

export default function insertMultiple(data) {
  return axios.post("http://5.189.180.8:8010/header/multiple", data);
}
