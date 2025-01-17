import { createClient } from "@libsql/client";

export const client = createClient({
  url: "libsql://tibo-search-carllippert.aws-us-east-1.turso.io",
  syncUrl: "https://tibo-search-carllippert.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzcwOTI2NjIsImlhdCI6MTczNzA4OTA2MiwiaWQiOiIzYmFkMjZkMy02Y2VjLTRjNTYtODcxZS1jYWQ5NjcyMzllMzciLCJyaWQiOiI3YzA0ZjA5Zi1iN2JhLTQ3OWMtYWFjYy03MmNkNTYyMDQzZWEifQ.SA2rfoSFmUC_YQfNwtKjtFEMAMNZh_tuhvlGdaC-Atq_ufhXg35U9Aiw5kWGM0t_lEZoJLUgBot4MaVGymsDDw",
});
