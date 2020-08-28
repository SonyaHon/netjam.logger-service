import { NetjamServer } from "@netjam/server";
import { LoggerProvider } from "./providers/logger.provider";

const njApp = new NetjamServer({
  server: {
    host: process.env.NJ_HOST || "0.0.0.0",
    port: parseInt(process.env.NJ_PORT, 10) || 9092,
  },
  ...(process.env.NJ_SERVICE_NAME
    ? {
        microservice: {
          serviceName: process.env.NJ_SERVICE_NAME,
          redisConnection: {
            port: parseInt(process.env.NJ_REDIS_PORT, 10),
            host: process.env.NJ_REDIS_HOST,
          },
        },
      }
    : {}),
});

async function bootstrap() {
  await njApp.bootstrap([new LoggerProvider()]);
  await njApp.start();
  console.log("Started");
}

bootstrap().catch((e) => {
  console.error(e);
});
