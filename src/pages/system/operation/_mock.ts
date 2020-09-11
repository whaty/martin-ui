import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { OperationListItem } from './model';

// mock tableListDataSource
const tableListDataSource: OperationListItem[] = [];

function getOperations(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.operationname.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteOperations(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addOperation(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editOperation(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/operation/page': getOperations,
  'POST /api/operation/add': addOperation,
  'PUT /api/operation/edit': editOperation,
  'DELETE /api/operation/delete': deleteOperations,
};
