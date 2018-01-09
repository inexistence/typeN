import {Type} from "class-transformer";

export class User {
  @Type(() => Number)
  public id: number;

  public nickname: string;
  public openid: string;
  constructor() {
  }

  public getName(): string {
    return this.nickname;
  }
}