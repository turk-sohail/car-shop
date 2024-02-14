import { Controller, Get } from "@nestjs/common";

@Controller()
export class V1Controller {
    @Get("")
    getHome() {
        return "Hello v1"
    }
}
