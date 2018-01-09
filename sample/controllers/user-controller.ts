import { Controller } from "../../src/decorator/controller";
import { Get } from "../../src/decorator/get";
import { Query } from "../../src/decorator/query";
import { Body } from "../../src/decorator/body";
import { User } from "../User";
import { Post } from "../../src/decorator/post";
import { Params } from "../../src/decorator/params";
import { Req } from "../../src/decorator/req";
import { Request } from "_@types_koa@2.0.43@@types/koa";

@Controller("/user")
export class UserController {
  @Get("/")
  async get(@Query() user: User) {
    console.log(user.id, typeof user.id);
    return "";
  }

  @Post("/:id")
  async post(@Params("id") id: number, @Req() request: Request, @Body() user: User) {
    console.log(user.id, typeof user.id);
    console.log("param id", id, typeof id);
    console.log("url", request.url);
    return "";
  }
}
