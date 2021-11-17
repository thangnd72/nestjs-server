import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { ObjectSchema } from "joi";
import _, { omit } from "lodash";
import { ParseObjectIdPipe } from "./parse-object-id-pipe";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    let errors: any[] = [];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v.id) {
          try {
            new ParseObjectIdPipe().transform(v.id);
          } catch (err) {
            errors.push(err);
          }
        }
        const { error } = this.schema.validate(omit(v, "id"));
        errors.push(error);
      });
    } else {
      const { error } = this.schema.validate(value);
      errors.push(error);
    }
    errors = errors.filter((e) => e);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((err) => err.message).join(" ;")
      );
    }
    return value;
  }
}
