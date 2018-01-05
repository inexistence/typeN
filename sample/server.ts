import { ApplicationFactory } from "../src/application-factory";
import * as path from "path";

const app = ApplicationFactory.createKoaServer({
  controllers: [path.join(__dirname, "./controllers/*")],
});
app.listen(3001);
console.log("listen on 3001");
