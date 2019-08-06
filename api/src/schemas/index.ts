import { mergeSchemas } from "graphql-tools";

import todos from "./todos";
export default mergeSchemas({
  schemas: [todos]
});
