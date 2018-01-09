import { Controller } from "../../src/decorator/controller";
import { Get } from "../../src/decorator/get";
import { Query } from "../../src/decorator/query";
import { Body } from "../../src/decorator/body";
import { User } from "../User";
import { Post } from "../../src/decorator/post";
import { Params } from "../../src/decorator/params";

@Controller("/user")
export class UserController {
  @Get("/")
  async get(@Query() user: User) {
    console.log(user.id, typeof user.id);
    return "";
  }

  @Post("/:id")
  async post(@Params("id") id: number, @Body() user: User) {
    console.log(user.id, typeof user.id);
    console.log("param id", id, typeof id);
    return "";
  }
}
