import * as mongoose from 'mongoose';
import { Request } from 'express';
import { SchemaBase } from '@schemas/00.schema-base';
import { set } from 'lodash';

export abstract class ServiceBase<T extends mongoose.Document<any, any, any>> {
  protected abstract model: mongoose.PaginateModel<T>;

  constructor(protected request: Request) {}

  paginate(
    query?: mongoose.FilterQuery<T>,
    options?: mongoose.PaginateOptions,
  ) {
    return this.model.paginate(query, options);
  }

  create(doc: T | mongoose.DocumentDefinition<T>) {
    const currentUser = this.request.user;

    console.log('currentUser', currentUser);
    return this.model.create({
      ...doc,
      // createdBy: currentUser,
      // modifiedBy: currentUser,
    });
  }

  createMany(docs: (T | mongoose.DocumentDefinition<T>)[]) {
    const currentUser = this.request.user;
    docs = docs.map((doc) => {
      set(doc, 'createdBy', currentUser);
      set(doc, 'modifiedBy', currentUser);
      return doc;
    });
    return this.model.create(docs);
  }

  findByIdAndUpdate(id: string, doc: mongoose.UpdateQuery<T>) {
    const currentUser = this.request.user;
    return this.model
      .findByIdAndUpdate(id, {
        ...doc,
        modifiedBy: currentUser,
      })
      .exec();
  }

  findAll(query?: mongoose.FilterQuery<T>, options?: mongoose.QueryOptions) {
    return query
      ? this.model.find(query, undefined, options)
      : this.model.find();
  }

  findOne(filter = {}) {
    return this.model.findOne(filter).exec();
  }

  aggregate(pipe?: any[]) {
    return this.model.aggregate(pipe);
  }

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  findByIdAndDelete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  createIndexs(options?: any) {
    return this.model.createIndexes(options);
  }
}
