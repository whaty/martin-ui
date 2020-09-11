import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { ConfigListItem } from './model';

// mock tableListDataSource
const tableListDataSource: ConfigListItem[] = [];

function getConfigs(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.configname.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteConfigs(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addConfig(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editConfig(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/config/page': getConfigs,
  'POST /api/config/add': addConfig,
  'PUT /api/config/edit': editConfig,
  'DELETE /api/config/delete': deleteConfigs,
};
