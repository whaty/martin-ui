import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { DictListItem } from './model';

// mock tableListDataSource
const tableListDataSource: DictListItem[] = [];

function getDicts(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.dictname.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteDicts(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addDict(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editDict(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/dict/page': getDicts,
  'POST /api/dict/add': addDict,
  'PUT /api/dict/edit': editDict,
  'DELETE /api/dict/delete': deleteDicts,
};
