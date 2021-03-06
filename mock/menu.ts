// import {Request, Response} from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {

  // GET POST 可省略
  'GET /api/menus11': [{
    "path": "/dashboard",
    "name": "Dashboard",
    "icon": "dashboard",
    "routes": null,
    "locale": "menu.dashboard",
    "key": "/dashboard",
    "parentKeys": ["/"],
    "children": [{
      "name": "分析页",
      "icon": "smile",
      "path": "/dashboard/analysis",
      "exact": true,
      "locale": "menu.dashboard.analysis",
      "key": "/dashboard/analysis",
      "routes": null,
      "parentKeys": ["/", "/dashboard"]
    }, {
      "name": "监控页",
      "icon": "smile",
      "path": "/dashboard/monitor",
      "exact": true,
      "locale": "menu.dashboard.monitor",
      "key": "/dashboard/monitor",
      "routes": null,
      "parentKeys": ["/", "/dashboard"]
    }, {
      "name": "工作台",
      "icon": "smile",
      "path": "/dashboard/workplace",
      "exact": true,
      "locale": "menu.dashboard.workplace",
      "key": "/dashboard/workplace",
      "routes": null,
      "parentKeys": ["/", "/dashboard"]
    }]
  }, {
    "path": "/form",
    "icon": "form",
    "name": "表单页",
    "routes": null,
    "locale": "menu.form",
    "key": "/form",
    "parentKeys": ["/"],
    "children": [{
      "name": "基础表单",
      "icon": "smile",
      "path": "/form/basic-form",
      "exact": true,
      "locale": "menu.form.basic-form",
      "key": "/form/basic-form",
      "routes": null,
      "parentKeys": ["/", "/form"]
    }, {
      "name": "分步表单",
      "icon": "smile",
      "path": "/form/step-form",
      "exact": true,
      "locale": "menu.form.step-form",
      "key": "/form/step-form",
      "routes": null,
      "parentKeys": ["/", "/form"]
    }, {
      "name": "高级表单",
      "icon": "smile",
      "path": "/form/advanced-form",
      "exact": true,
      "locale": "menu.form.advanced-form",
      "key": "/form/advanced-form",
      "routes": null,
      "parentKeys": ["/", "/form"]
    }]
  }, {
    "path": "/list",
    "icon": "table",
    "name": "列表页",
    "routes": null,
    "locale": "menu.list",
    "key": "/list",
    "parentKeys": ["/"],
    "children": [{
      "path": "/list/search",
      "name": "搜索列表",
      "routes": null,
      "locale": "menu.list.search-list",
      "key": "/list/search",
      "parentKeys": ["/", "/list"],
      "children": [{
        "name": "搜索列表（文章）",
        "icon": "smile",
        "path": "/list/search/articles",
        "exact": true,
        "locale": "menu.list.search-list.articles",
        "key": "/list/search/articles",
        "routes": null,
        "parentKeys": ["/", "/list", "/list/search"]
      }, {
        "name": "搜索列表（项目）",
        "icon": "smile",
        "path": "/list/search/projects",
        "exact": true,
        "locale": "menu.list.search-list.projects",
        "key": "/list/search/projects",
        "routes": null,
        "parentKeys": ["/", "/list", "/list/search"]
      }, {
        "name": "搜索列表（应用）",
        "icon": "smile",
        "path": "/list/search/applications",
        "exact": true,
        "locale": "menu.list.search-list.applications",
        "key": "/list/search/applications",
        "routes": null,
        "parentKeys": ["/", "/list", "/list/search"]
      }]
    }, {
      "name": "查询表格",
      "icon": "smile",
      "path": "/list/table-list",
      "exact": true,
      "locale": "menu.list.table-list",
      "key": "/list/table-list",
      "routes": null,
      "parentKeys": ["/", "/list"]
    }, {
      "name": "标准列表",
      "icon": "smile",
      "path": "/list/basic-list",
      "exact": true,
      "locale": "menu.list.basic-list",
      "key": "/list/basic-list",
      "routes": null,
      "parentKeys": ["/", "/list"]
    }, {
      "name": "卡片列表",
      "icon": "smile",
      "path": "/list/card-list",
      "exact": true,
      "locale": "menu.list.card-list",
      "key": "/list/card-list",
      "routes": null,
      "parentKeys": ["/", "/list"]
    }]
  }, {
    "path": "/profile",
    "name": "详情页",
    "icon": "profile",
    "routes": null,
    "locale": "menu.profile",
    "key": "/profile",
    "parentKeys": ["/"],
    "children": [{
      "name": "基础详情页",
      "icon": "smile",
      "path": "/profile/basic",
      "exact": true,
      "locale": "menu.profile.basic",
      "key": "/profile/basic",
      "routes": null,
      "parentKeys": ["/", "/profile"]
    }, {
      "name": "高级详情页",
      "icon": "smile",
      "path": "/profile/advanced",
      "exact": true,
      "locale": "menu.profile.advanced",
      "key": "/profile/advanced",
      "routes": null,
      "parentKeys": ["/", "/profile"]
    }]
  }, {
    "name": "结果页",
    "icon": "check-circle-o",
    "path": "/result",
    "routes": null,
    "locale": "menu.result",
    "key": "/result",
    "parentKeys": ["/"],
    "children": [{
      "name": "成功页",
      "icon": "smile",
      "path": "/result/success",
      "exact": true,
      "locale": "menu.result.success",
      "key": "/result/success",
      "routes": null,
      "parentKeys": ["/", "/result"]
    }, {
      "name": "失败页",
      "icon": "smile",
      "path": "/result/fail",
      "exact": true,
      "locale": "menu.result.fail",
      "key": "/result/fail",
      "routes": null,
      "parentKeys": ["/", "/result"]
    }]
  }, {
    "name": "异常页",
    "icon": "warning",
    "path": "/exception",
    "routes": null,
    "locale": "menu.exception",
    "key": "/exception",
    "parentKeys": ["/"],
    "children": [{
      "name": "403",
      "icon": "smile",
      "path": "/exception/403",
      "exact": true,
      "locale": "menu.exception.403",
      "key": "/exception/403",
      "routes": null,
      "parentKeys": ["/", "/exception"]
    }, {
      "name": "404",
      "icon": "smile",
      "path": "/exception/404",
      "exact": true,
      "locale": "menu.exception.404",
      "key": "/exception/404",
      "routes": null,
      "parentKeys": ["/", "/exception"]
    }, {
      "name": "500",
      "icon": "smile",
      "path": "/exception/500",
      "exact": true,
      "locale": "menu.exception.500",
      "key": "/exception/500",
      "routes": null,
      "parentKeys": ["/", "/exception"]
    }]
  }, {
    "name": "站点",
    "icon": "user",
    "path": "/site",
    "routes": null,
    "locale": "menu.site",
    "key": "/site",
    "parentKeys": ["/"],
    "children": [{
      "name": "站点配置",
      "icon": "smile",
      "path": "/site/site-config",
      "exact": true,
      "locale": "menu.site.site-config",
      "key": "/site/site-config",
      "routes": null,
      "parentKeys": ["/", "/site"]
    }]
  }, {
    "name": "个人页",
    "icon": "user",
    "path": "/account",
    "routes": null,
    "locale": "menu.account",
    "key": "/account",
    "parentKeys": ["/"],
    "children": [{
      "name": "个人中心",
      "icon": "smile",
      "path": "/account/center",
      "exact": true,
      "locale": "menu.account.center",
      "key": "/account/center",
      "routes": null,
      "parentKeys": ["/", "/account"]
    }, {
      "name": "个人设置",
      "icon": "smile",
      "path": "/account/settings",
      "exact": true,
      "locale": "menu.account.settings",
      "key": "/account/settings",
      "routes": null,
      "parentKeys": ["/", "/account"]
    }]
  }, {
    "name": "图形编辑器",
    "icon": "highlight",
    "path": "/editor",
    "routes": null,
    "locale": "menu.editor",
    "key": "/editor",
    "parentKeys": ["/"],
    "children": [{
      "name": "流程编辑器",
      "icon": "smile",
      "path": "/editor/flow",
      "exact": true,
      "locale": "menu.editor.flow",
      "key": "/editor/flow",
      "routes": null,
      "parentKeys": ["/", "/editor"]
    }, {
      "name": "脑图编辑器",
      "icon": "smile",
      "path": "/editor/mind",
      "exact": true,
      "locale": "menu.editor.mind",
      "key": "/editor/mind",
      "routes": null,
      "parentKeys": ["/", "/editor"]
    }, {
      "name": "拓扑编辑器",
      "icon": "smile",
      "path": "/editor/koni",
      "exact": true,
      "locale": "menu.editor.koni",
      "key": "/editor/koni",
      "routes": null,
      "parentKeys": ["/", "/editor"]
    }]
  }],
};
