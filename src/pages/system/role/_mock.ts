import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { RoleListItem } from './model';

// mock tableListDataSource
const tableListDataSource: RoleListItem[] = [];

function getRoles(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.rolename.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteRoles(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addRole(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editRole(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/role/page': getRoles,
  'POST /api/role/add': addRole,
  'PUT /api/role/edit': editRole,
  'DELETE /api/role/delete': deleteRoles,
};
