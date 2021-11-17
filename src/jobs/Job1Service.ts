import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class Job1Service {
  private readonly logger = new Logger(Job1Service.name);

  @Cron("0 0 8 * * 1-5")
  handleCron() {
    this.logger.debug("Sample job executed");
  }
}
