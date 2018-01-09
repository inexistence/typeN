import { Controller } from "../../src/decorator/controller";
import { Get } from "../../src/decorator/get";
import { Query } from "../../src/decorator/query";
import { User } from "../User";

@Controller("/user")
export class UserController {
  @Get("/")
  public async get(@Query() user: User) {
    console.log(user.id, typeof user.id);
    return "";
  }
}
