import { Injectable } from "../../core/index.ts";

interface IOtherService {
  do: () => string;
}

@Injectable<OtherService>()
class OtherService implements IOtherService {
  do() {
    return "Hello2";
  }
}

export { OtherService, type IOtherService };
