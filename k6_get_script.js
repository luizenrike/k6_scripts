import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 100, 
  iterations: 1000,
  thresholds: {
    http_req_duration: ["p(99) < 3000"],
  },
};

export default function () {
  let res = http.get("URL");

  check(res, {
    "status foi 200": (r) => r.status === 200,
  });
}
