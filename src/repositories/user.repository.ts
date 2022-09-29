import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { DbDataSource } from "../datasources";
import { Users, UserRelations } from "../models";

export class UserRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UserRelations
> {
  constructor(@inject("datasources.db") dataSource: DbDataSource) {
    super(Users, dataSource);
  }
}
