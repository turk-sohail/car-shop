import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) { }

    async createReport(body: CreateReportDto, user: User) {
        const report = this.reportRepository.create(body);

        report.user = user;
        await this.reportRepository.save(report);
        return report;
    }

}
