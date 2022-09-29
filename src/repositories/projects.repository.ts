import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
// import { Projects, ProjectRelations } from '../models';
import { Projects } from '../models';

export class ProjectRepository extends DefaultCrudRepository<
	Projects,
	typeof Projects.prototype.id
	// ProjectRelations
> {
	constructor(@inject('datasources.db') dataSource: DbDataSource) {
		super(Projects, dataSource);
	}
}
