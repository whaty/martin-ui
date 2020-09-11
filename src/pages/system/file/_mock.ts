import { Request, Response } from 'express';
import { addTableList, editTableList, getTableList, deleteTableList } from '../../../../mock/utils';
import { FileListItem } from './model';

// mock tableListDataSource
const tableListDataSource: FileListItem[] = [];

function getFiles(req: Request, res: Response) {
  const params = req.query;

  let dataSource = [...tableListDataSource];
  if (params.name) {
    dataSource = dataSource.filter(x => x.filename.indexOf(params.name) !== -1);
  }

  return getTableList(req, res, dataSource);
}

function deleteFiles(req: Request, res: Response) {
  return deleteTableList(req, res, tableListDataSource);
}

function addFile(req: Request, res: Response) {
  return addTableList(req, res, tableListDataSource);
}

function editFile(req: Request, res: Response) {
  return editTableList(req, res, tableListDataSource);
}

export default {
  'POST /api/file/page': getFiles,
  'POST /api/file/add': addFile,
  'PUT /api/file/edit': editFile,
  'DELETE /api/file/delete': deleteFiles,
};
