import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './v1/users/users.module';
import { ReportsModule } from './v1/reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './v1/users/entities/user.entity';
import { Report } from './v1/reports/entities/report.entity';
import { AuthModule } from './v1/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { V1Module } from './v1/v1.module';
@Module({
  imports: [V1Module, UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'asd3129760162',
    database: 'cars',
    entities: [User, Report],
    synchronize: true,
  }), RouterModule.register([
    {
      path: "/v1",
      module: V1Module,
      children: [
        {
          path: "auth",
          module: AuthModule
        },
        {
          path: "users",
          module: UsersModule
        },
        {
          path: "reports",
          module: ReportsModule
        }
      ]
    }
  ]), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
