import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize';
import { ReportDto } from './dto/report.dto';


@Controller()
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get()
    getAll() {
        return "All reports";
    }

    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    @Post()
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        console.log(user, "haij");

        return this.reportsService.createReport(body, user)
    }

}