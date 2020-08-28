import { ProviderBase, Provider, ProviderType, RedisMessage, AfterStartInit } from "@netjam/server";

@Provider(ProviderType.REDIS, {
  namespace: "logger",
})
export class LoggerProvider extends ProviderBase {
  private buffer: string[] = [];

  @RedisMessage("push")
  push(data: { some: string }) {
    console.log("ASD", data);

    this.buffer.push(data.some);
  }

  @AfterStartInit
  afterStartInit() {
    setInterval(() => {
      console.log(this.buffer);
      this.buffer = [];
    }, 10000);
  }
}
