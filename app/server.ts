import * as express from "express";
import * as path from "path";

const PORT = 3000;
const app = express();

const projectPath = __dirname;

// Static path
// app.use("/assets", express.static(path.join(projectPath, "src/public")));
app.use("/dist", express.static(path.join(projectPath, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(projectPath, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
