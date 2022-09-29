import { server } from "./server/Server";

server.listen(process.env.PORT || 333, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT || 3333}`);
});
