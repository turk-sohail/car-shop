import { Controller, Get } from '@nestjs/common';

@Controller()
export class ReportsController {
    @Get("/")
    getAll() {
        return "All reports"
    }
}
