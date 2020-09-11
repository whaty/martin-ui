import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { ElementListItem } from './model';

// mock tableListDataSource
const tableListDataSource: ElementListItem[] = [];

function getElements(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.elementname.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteElements(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addElement(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editElement(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/element/page': getElements,
  'POST /api/element/add': addElement,
  'PUT /api/element/edit': editElement,
  'DELETE /api/element/delete': deleteElements,
};
