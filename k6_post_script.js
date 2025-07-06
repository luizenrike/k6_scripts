import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(99) < 3000"],
  },
  stages: [
    { duration: "10s", target: 30 },
    { duration: "10s", target: 20 },
    { duration: "10s", target: 5 },
  ],
};

export default function () {
  // INFORME A URL DA API:
  const url = "URL";

  const payload = JSON.stringify({
    titulo: "Livro de Teste",
    autor: "Usuário K6",
    editora: "Editora K6",
    ano_publicacao: 2025,
    genero: "Teste",
    disponivel: true,
    descricao: "Livro criado por teste automatizado do K6"
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status foi 200 ou 201": (r) => r.status === 200 || r.status === 201,
    "retornou corpo": (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}

