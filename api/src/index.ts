import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import schema from "./schemas";
const app = express();
const server = new ApolloServer({ schema, playground: true });

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) =>
  res.send({
    status: "OK"
  })
);

server.applyMiddleware({ app });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("Pas trouvé");
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
