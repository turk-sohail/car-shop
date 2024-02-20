import { Injectable, NotFoundException } from '@nestjs/common';
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

    async changeReport(id: number, body: boolean,) {
        const report = await this.reportRepository.findOneBy({ id });
        if (!report) {
            throw new NotFoundException("Report not found");
        }
        report.approved = body;
        return this.reportRepository.save(report);
    }

}
