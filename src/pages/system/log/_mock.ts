import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { LogListItem } from './model';

// mock tableListDataSource
const tableListDataSource: LogListItem[] = [];

function getLogs(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.logname.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteLogs(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addLog(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editLog(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/log/page': getLogs,
  'POST /api/log/add': addLog,
  'PUT /api/log/edit': editLog,
  'DELETE /api/log/delete': deleteLogs,
};
