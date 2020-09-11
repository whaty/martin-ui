import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { MenuListItem } from './model';

// mock tableListDataSource
const tableListDataSource: MenuListItem[] = [];

function getMenus(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.menuname.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteMenus(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addMenu(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editMenu(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/menu/page': getMenus,
  'POST /api/menu/add': addMenu,
  'PUT /api/menu/edit': editMenu,
  'DELETE /api/menu/delete': deleteMenus,
};
