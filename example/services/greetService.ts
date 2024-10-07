import { Injectable } from "../../core/index.ts";

@Injectable<GreetService>()
class GreetService implements IGeerterService {
  hello() {
    return "Hello";
  }
}
interface IGeerterService {
  hello: () => string;
}

export { GreetService, type IGeerterService };
