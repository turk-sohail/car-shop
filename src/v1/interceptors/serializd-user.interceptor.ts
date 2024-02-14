import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { UserDto } from "src/v1/users/dto/user.dto";


export class SerializeUser implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        throw new Error("Method not implemented.");

        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true
                })

            })
        )
    }

}