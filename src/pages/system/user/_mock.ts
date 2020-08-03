import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { UserListItem } from './model';

// mock tableListDataSource
const tableListDataSource: UserListItem[] = [];

function getUsers(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.username.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteUsers(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addUser(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editUser(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/user/page': getUsers,
  'POST /api/user/add': addUser,
  'PUT /api/user/edit': editUser,
  'DELETE /api/user/delete': deleteUsers,
};
