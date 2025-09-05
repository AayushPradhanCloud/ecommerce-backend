// import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
// import { ZodTypeAny, ZodError } from 'zod';

// @Injectable()
// export class ZodValidationPipe implements PipeTransform {
//   constructor(private schema: ZodTypeAny) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     try {
//       return this.schema.parse(value);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         throw new BadRequestException((error as any).errors);
//       }
//       throw error;
//     }
//   }
// }
