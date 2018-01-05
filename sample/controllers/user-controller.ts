import { Controller } from "../../src/decorator/controller";
import { Get } from "../../src/decorator/get";

@Controller("/user")
export class UserController {
  @Get("/")
  public async get() {
    console.log("get");
    return "get";
  }
}
