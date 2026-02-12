import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  N
} from "./chunk-VH5GXH4Y.js";
import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  Host,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Optional,
  QueryList,
  SkipSelf,
  TemplateRef,
  forwardRef,
  require_operators,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-RJT5MPIH.js";
import {
  require_cjs
} from "./chunk-P4GNISSK.js";
import {
  __toESM
} from "./chunk-3EVLEYEM.js";

// node_modules/@progress/kendo-file-saver/dist/es/save-as.js
function saveAs(data, fileName, options) {
  if (options === void 0) options = {};
  var save = postToProxy;
  if (options.forceProxy && !options.proxyURL) {
    throw new Error("No proxyURL is set, but forceProxy is true");
  }
  if (!options.forceProxy) {
    if (canDownload()) {
      save = saveAsDataURI;
    }
    if (navigator.msSaveBlob) {
      save = saveAsBlob;
    }
  }
  save(data, fileName, options);
}
var anchor = function() {
  return document.createElement("a");
};
var canDownload = function() {
  return "download" in anchor();
};
function saveAsBlob(data, fileName) {
  var blob2 = data;
  if (typeof data === "string") {
    var parts = data.split(";base64,");
    var contentType = parts[0];
    var base642 = atob(parts[1]);
    var array = new Uint8Array(base642.length);
    for (var idx = 0; idx < base642.length; idx++) {
      array[idx] = base642.charCodeAt(idx);
    }
    blob2 = new Blob([array.buffer], { type: contentType });
  }
  navigator.msSaveBlob(blob2, fileName);
}
function saveAsDataURI(data, fileName) {
  var dataURI = data;
  if (window.Blob && data instanceof Blob) {
    dataURI = URL.createObjectURL(data);
  }
  var fileSaver = anchor();
  fileSaver.download = fileName;
  fileSaver.href = dataURI;
  var e = document.createEvent("MouseEvents");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  fileSaver.dispatchEvent(e);
  setTimeout(function() {
    return URL.revokeObjectURL(dataURI);
  });
}
function postToProxy(dataURI, fileName, options) {
  if (!options.proxyURL) {
    return;
  }
  var form = document.createElement("form");
  form.setAttribute("action", options.proxyURL);
  form.setAttribute("method", "POST");
  form.setAttribute("target", options.proxyTarget || "_self");
  var formData = options.proxyData || {};
  formData.fileName = fileName;
  var parts = dataURI.split(";base64,");
  formData.contentType = parts[0].replace("data:", "");
  formData.base64 = parts[1];
  for (var name in formData) {
    if (formData.hasOwnProperty(name)) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", name);
      input.setAttribute("value", formData[name]);
      form.appendChild(input);
    }
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

// node_modules/@progress/kendo-file-saver/dist/es/base64.js
var fromCharCode = String.fromCharCode;

// node_modules/@progress/kendo-ooxml/dist/es/services/template-service.js
var current = {
  compile: function(template) {
    return template;
  }
};
var TemplateService = class {
  static register(userImplementation) {
    current = userImplementation;
  }
  static compile(template) {
    return current.compile(template);
  }
};
var template_service_default = TemplateService;

// node_modules/@progress/kendo-ooxml/dist/es/utils/getter.js
var FIELD_REGEX = /\[(?:(\d+)|['"](.*?)['"])\]|((?:(?!\[.*?\]|\.).)+)/g;
var getterCache = {};
var UNDEFINED = "undefined";
getterCache[UNDEFINED] = function(obj) {
  return obj;
};
function getter(field) {
  if (getterCache[field]) {
    return getterCache[field];
  }
  const fields = [];
  field.replace(FIELD_REGEX, function(match, index, indexAccessor, field2) {
    fields.push(typeof index !== UNDEFINED ? index : indexAccessor || field2);
  });
  getterCache[field] = function(obj) {
    let result = obj;
    for (let idx = 0; idx < fields.length && result; idx++) {
      result = result[fields[idx]];
    }
    return result;
  };
  return getterCache[field];
}

// node_modules/@progress/kendo-ooxml/dist/es/utils/map.js
function map(array, func) {
  return array.reduce((result, el, i) => {
    const val = func(el, i);
    if (val != null) {
      result.push(val);
    }
    return result;
  }, []);
}

// node_modules/@progress/kendo-ooxml/dist/es/excel-exporter.js
function defaultGroupHeaderTemplate(data) {
  return `${data.title}: ${data.value}`;
}
function createArray(length, callback) {
  const result = [];
  for (let idx = 0; idx < length; idx++) {
    result.push(callback(idx));
  }
  return result;
}
function defaultItemId(item) {
  return item.id;
}
var ExcelExporter = class {
  constructor(options) {
    options.columns = this._trimColumns(options.columns || []);
    this.allColumns = map(this._leafColumns(options.columns || []), this._prepareColumn);
    this.columns = this._visibleColumns(this.allColumns);
    this.options = options;
    this.data = options.data || [];
    this.aggregates = options.aggregates || {};
    this.groups = [].concat(options.groups || []);
    this.hasGroups = this.groups.length > 0;
    this.hierarchy = options.hierarchy;
    this.hasGroupHeaderColumn = this.columns.some((column) => column.groupHeaderColumnTemplate);
    this.collapsible = this.options.collapsible;
  }
  workbook() {
    const workbook = {
      sheets: [{
        columns: this._columns(),
        rows: this.hierarchy ? this._hierarchyRows() : this._rows(),
        freezePane: this._freezePane(),
        filter: this._filter()
      }]
    };
    return workbook;
  }
  _trimColumns(columns) {
    return columns.filter((column) => {
      let result = Boolean(column.field);
      if (!result && column.columns) {
        result = this._trimColumns(column.columns).length > 0;
      }
      return result;
    });
  }
  _leafColumns(columns) {
    let result = [];
    for (let idx = 0; idx < columns.length; idx++) {
      if (!columns[idx].columns) {
        result.push(columns[idx]);
      } else {
        result = result.concat(this._leafColumns(columns[idx].columns));
      }
    }
    return result;
  }
  _prepareColumn(column) {
    if (!column.field) {
      return null;
    }
    let value = function(dataItem) {
      return getter(column.field, true)(dataItem);
    };
    let values = null;
    if (column.values) {
      values = {};
      column.values.forEach(function(item) {
        values[item.value] = item.text;
      });
      value = function(dataItem) {
        return values[getter(column.field, true)(dataItem)];
      };
    }
    return Object.assign({}, column, {
      value,
      values,
      groupHeaderTemplate: column.groupHeaderTemplate ? template_service_default.compile(column.groupHeaderTemplate) : defaultGroupHeaderTemplate,
      groupHeaderColumnTemplate: column.groupHeaderColumnTemplate ? template_service_default.compile(column.groupHeaderColumnTemplate) : null,
      groupFooterTemplate: column.groupFooterTemplate ? template_service_default.compile(column.groupFooterTemplate) : null,
      footerTemplate: column.footerTemplate ? template_service_default.compile(column.footerTemplate) : null
    });
  }
  _filter() {
    if (!this.options.filterable) {
      return null;
    }
    const depth = this._depth();
    return {
      from: depth,
      to: depth + this.columns.length - 1
    };
  }
  _createPaddingCells(length) {
    return createArray(length, () => Object.assign({
      background: "#dfdfdf",
      color: "#333"
    }, this.options.paddingCellOptions));
  }
  _dataRow(dataItem, level, depth) {
    let cells = this._createPaddingCells(level);
    if (this.hasGroups && depth && dataItem.items) {
      cells = cells.concat(this._groupHeaderCells(dataItem, level, depth));
      const rows = this._dataRows(dataItem.items, level + 1);
      rows.unshift({
        type: "group-header",
        cells,
        level: this.collapsible ? level : null
      });
      return rows.concat(this._footer(dataItem, level));
    }
    const dataCells = [];
    for (let cellIdx = 0; cellIdx < this.columns.length; cellIdx++) {
      dataCells[cellIdx] = this._cell(dataItem, this.columns[cellIdx]);
    }
    if (this.hierarchy) {
      dataCells[0].colSpan = depth - level + 1;
    }
    return [{
      type: "data",
      cells: cells.concat(dataCells),
      level: this.collapsible ? level : null
    }];
  }
  _groupHeaderCells(dataItem, level, depth) {
    const cells = [];
    const column = this.allColumns.filter(function(column2) {
      return column2.field === dataItem.field;
    })[0] || {};
    const title = column && column.title ? column.title : dataItem.field;
    const template = column ? column.groupHeaderTemplate || column.groupHeaderColumnTemplate : null;
    const group = Object.assign({
      title,
      field: dataItem.field,
      value: column && column.values ? column.values[dataItem.value] : dataItem.value,
      aggregates: dataItem.aggregates,
      items: dataItem.items
    }, dataItem.aggregates[dataItem.field]);
    const value = template ? template(group) : `${title}: ${dataItem.value}`;
    cells.push(Object.assign({
      value,
      background: "#dfdfdf",
      color: "#333",
      colSpan: (this.hasGroupHeaderColumn ? 1 : this.columns.length) + depth - level
    }, column.groupHeaderCellOptions));
    if (this.hasGroupHeaderColumn) {
      this.columns.forEach(function(column2, index) {
        if (index > 0) {
          cells.push(Object.assign({
            background: "#dfdfdf",
            color: "#333",
            value: column2.groupHeaderColumnTemplate ? column2.groupHeaderColumnTemplate(Object.assign({ group }, group, dataItem.aggregates[column2.field])) : void 0
          }, column2.groupHeaderCellOptions));
        }
      });
    }
    return cells;
  }
  _dataRows(dataItems, level) {
    const depth = this._depth();
    const rows = [];
    for (let idx = 0; idx < dataItems.length; idx++) {
      rows.push.apply(rows, this._dataRow(dataItems[idx], level, depth));
    }
    return rows;
  }
  _hierarchyRows() {
    const depth = this._depth();
    const data = this.data;
    const itemLevel = this.hierarchy.itemLevel;
    const itemId = this.hierarchy.itemId || defaultItemId;
    const hasFooter = this._hasFooterTemplate();
    const rows = [];
    const parents = [];
    let previousLevel = 0;
    let previousItemId;
    if (!hasFooter) {
      this.collapsible = false;
    }
    for (let idx = 0; idx < data.length; idx++) {
      const item = data[idx];
      const level = itemLevel(item, idx);
      if (hasFooter) {
        if (level > previousLevel) {
          parents.push({ id: previousItemId, level: previousLevel });
        } else if (level < previousLevel) {
          rows.push.apply(rows, this._hierarchyFooterRows(parents, level, depth));
        }
        previousLevel = level;
        previousItemId = itemId(item, idx);
      }
      rows.push.apply(rows, this._dataRow(item, level + 1, depth));
    }
    if (hasFooter) {
      rows.push.apply(rows, this._hierarchyFooterRows(parents, 0, depth));
      const rootAggregate = data.length ? this.aggregates[data[0].parentId] : {};
      rows.push(this._hierarchyFooter(rootAggregate, 0, depth));
    }
    this._prependHeaderRows(rows);
    return rows;
  }
  _hierarchyFooterRows(parents, currentLevel, depth) {
    const rows = [];
    while (parents.length && parents[parents.length - 1].level >= currentLevel) {
      const parent = parents.pop();
      rows.push(this._hierarchyFooter(this.aggregates[parent.id], parent.level + 1, depth));
    }
    return rows;
  }
  _hasFooterTemplate() {
    const columns = this.columns;
    for (let idx = 0; idx < columns.length; idx++) {
      if (columns[idx].footerTemplate) {
        return true;
      }
    }
  }
  _hierarchyFooter(aggregates, level, depth) {
    const cells = this.columns.map(function(column, index) {
      const colSpan = index ? 1 : depth - level + 1;
      if (column.footerTemplate) {
        const fieldAggregates = (aggregates || {})[column.field];
        return Object.assign({
          background: "#dfdfdf",
          color: "#333",
          colSpan,
          value: column.footerTemplate(Object.assign({ aggregates }, fieldAggregates))
        }, column.footerCellOptions);
      }
      return Object.assign({
        background: "#dfdfdf",
        color: "#333",
        colSpan
      }, column.footerCellOptions);
    });
    return {
      type: "footer",
      cells: this._createPaddingCells(level).concat(cells),
      level: this.collapsible ? level : null
    };
  }
  _footer(dataItem, level) {
    const rows = [];
    const footer = this.columns.some((column) => column.groupFooterTemplate);
    let templateData, group;
    if (footer) {
      group = {
        group: {
          items: dataItem.items,
          field: dataItem.field,
          value: dataItem.value
        }
      };
      templateData = {};
      Object.keys(dataItem.aggregates).forEach((key) => {
        templateData[key] = Object.assign({}, dataItem.aggregates[key], group);
      });
    }
    const cells = this.columns.map((column) => {
      if (column.groupFooterTemplate) {
        let data = Object.assign({}, templateData, dataItem.aggregates[column.field], group);
        return Object.assign({
          background: "#dfdfdf",
          color: "#333",
          value: column.groupFooterTemplate(data)
        }, column.groupFooterCellOptions);
      }
      return Object.assign({
        background: "#dfdfdf",
        color: "#333"
      }, column.groupFooterCellOptions);
    });
    if (footer) {
      rows.push({
        type: "group-footer",
        cells: this._createPaddingCells(this.groups.length).concat(cells),
        level: this.collapsible ? level : null
      });
    }
    return rows;
  }
  _isColumnVisible(column) {
    return this._visibleColumns([column]).length > 0 && (column.field || column.columns);
  }
  _visibleColumns(columns) {
    return columns.filter((column) => {
      let exportable = column.exportable;
      if (typeof exportable === "object") {
        exportable = column.exportable.excel;
      }
      const visibleInExport = !column.hidden && exportable !== false;
      const visibleInExportOnly = column.hidden && exportable === true;
      let visible = visibleInExport || visibleInExportOnly;
      if (visible && column.columns) {
        visible = this._visibleColumns(column.columns).length > 0;
      }
      return visible;
    });
  }
  _headerRow(row, groups) {
    const headers = row.cells.map(function(cell) {
      return Object.assign(cell, {
        colSpan: cell.colSpan > 1 ? cell.colSpan : 1,
        rowSpan: row.rowSpan > 1 && !cell.colSpan ? row.rowSpan : 1
      });
    });
    if (this.hierarchy && headers[0].firstCell) {
      headers[0].colSpan += this._depth();
    }
    return {
      type: "header",
      cells: createArray(groups.length, () => Object.assign({
        background: "#7a7a7a",
        color: "#fff"
      }, this.options.headerPaddingCellOptions)).concat(headers)
    };
  }
  _prependHeaderRows(rows) {
    const groups = this.groups;
    const headerRows = [{ rowSpan: 1, cells: [], index: 0 }];
    this._prepareHeaderRows(headerRows, this.options.columns);
    for (let idx = headerRows.length - 1; idx >= 0; idx--) {
      rows.unshift(this._headerRow(headerRows[idx], groups));
    }
  }
  _prepareHeaderRows(rows, columns, parentCell, parentRow) {
    const row = parentRow || rows[rows.length - 1];
    let childRow = rows[row.index + 1];
    let totalColSpan = 0;
    for (let idx = 0; idx < columns.length; idx++) {
      const column = columns[idx];
      if (this._isColumnVisible(column)) {
        const cell = Object.assign({
          background: "#7a7a7a",
          color: "#fff",
          value: column.title || column.field,
          colSpan: 0,
          firstCell: idx === 0 && (!parentCell || parentCell.firstCell)
        }, column.headerCellOptions);
        row.cells.push(cell);
        if (column.columns && column.columns.length) {
          if (!childRow) {
            childRow = { rowSpan: 0, cells: [], index: rows.length };
            rows.push(childRow);
          }
          cell.colSpan = this._trimColumns(this._visibleColumns(column.columns)).length;
          this._prepareHeaderRows(rows, column.columns, cell, childRow);
          totalColSpan += cell.colSpan - 1;
          row.rowSpan = rows.length - row.index;
        }
      }
    }
    if (parentCell) {
      parentCell.colSpan += totalColSpan;
    }
  }
  _rows() {
    const rows = this._dataRows(this.data, 0);
    if (this.columns.length) {
      this._prependHeaderRows(rows);
      let footer = false;
      const cells = this.columns.map((column) => {
        if (column.footerTemplate) {
          footer = true;
          return Object.assign({
            background: "#dfdfdf",
            color: "#333",
            value: column.footerTemplate(Object.assign({}, this.aggregates, this.aggregates[column.field]))
          }, column.footerCellOptions);
        }
        return Object.assign({
          background: "#dfdfdf",
          color: "#333"
        }, column.footerCellOptions);
      });
      if (footer) {
        rows.push({
          type: "footer",
          cells: this._createPaddingCells(this.groups.length).concat(cells)
        });
      }
    }
    return rows;
  }
  _headerDepth(columns) {
    const result = 1;
    let max = 0;
    for (let idx = 0; idx < columns.length; idx++) {
      if (columns[idx].columns) {
        const temp = this._headerDepth(columns[idx].columns);
        if (temp > max) {
          max = temp;
        }
      }
    }
    return result + max;
  }
  _freezePane() {
    const columns = this._visibleColumns(this.options.columns || []);
    const colSplit = this._visibleColumns(this._trimColumns(this._leafColumns(columns.filter(function(column) {
      return column.locked;
    })))).length;
    return {
      rowSplit: this._headerDepth(columns),
      colSplit: colSplit ? colSplit + this.groups.length : 0
    };
  }
  _cell(dataItem, column) {
    return Object.assign({
      value: column.value(dataItem)
    }, column.cellOptions);
  }
  _depth() {
    let depth = 0;
    if (this.hierarchy) {
      depth = this.hierarchy.depth;
    } else {
      depth = this.groups.length;
    }
    return depth;
  }
  _columns() {
    const depth = this._depth();
    const columns = createArray(depth, () => ({ width: 20 }));
    return columns.concat(this.columns.map(function(column) {
      return {
        width: parseInt(column.width, 10),
        autoWidth: column.width ? false : true
      };
    }));
  }
};
var excel_exporter_default = ExcelExporter;

// node_modules/@progress/kendo-ooxml/dist/es/services/intl-service.js
var current2 = {
  toString: (value) => value
};
var IntlService = class {
  static register(userImplementation) {
    current2 = userImplementation;
  }
  static toString(value, format2) {
    return current2.toString(value, format2);
  }
};
var intl_service_default = IntlService;

// node_modules/@progress/pako-esm/dist/pako-esm5.js
var Z_NO_FLUSH = 0;
var Z_PARTIAL_FLUSH = 1;
var Z_SYNC_FLUSH = 2;
var Z_FULL_FLUSH = 3;
var Z_FINISH = 4;
var Z_BLOCK = 5;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_BUF_ERROR = -5;
var Z_DEFAULT_COMPRESSION = -1;
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_RLE = 3;
var Z_FIXED = 4;
var Z_DEFAULT_STRATEGY = 0;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN = 2;
var Z_DEFLATED = 8;
function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function assign(obj) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
}
function shrinkBuf(buf, size) {
  if (buf.length === size) {
    return buf;
  }
  if (buf.subarray) {
    return buf.subarray(0, size);
  }
  buf.length = size;
  return buf;
}
var fnTyped = {
  arraySet: function(dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    var i, l, len, pos, chunk, result;
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }
    return result;
  },
  Buf8: function(size) {
    return new Uint8Array(size);
  },
  Buf16: function(size) {
    return new Uint16Array(size);
  },
  Buf32: function(size) {
    return new Int32Array(size);
  }
};
var fnUntyped = {
  arraySet: function(dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    return [].concat.apply([], chunks);
  },
  Buf8: function(size) {
    return new Array(size);
  },
  Buf16: function(size) {
    return new Array(size);
  },
  Buf32: function(size) {
    return new Array(size);
  }
};
var typedOK = function() {
  var supported = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
  typedOK = function() {
    return supported;
  };
  return supported;
};
var arraySet = function(dest, src, src_offs, len, dest_offs) {
  arraySet = typedOK() ? fnTyped.arraySet : fnUntyped.arraySet;
  return arraySet(dest, src, src_offs, len, dest_offs);
};
var flattenChunks = function(chunks) {
  flattenChunks = typedOK() ? fnTyped.flattenChunks : fnUntyped.flattenChunks;
  return flattenChunks(chunks);
};
var Buf8 = function(size) {
  Buf8 = typedOK() ? fnTyped.Buf8 : fnUntyped.Buf8;
  return Buf8(size);
};
var Buf16 = function(size) {
  Buf16 = typedOK() ? fnTyped.Buf16 : fnUntyped.Buf16;
  return Buf16(size);
};
var Buf32 = function(size) {
  Buf32 = typedOK() ? fnTyped.Buf32 : fnUntyped.Buf32;
  return Buf32(size);
};
var strApplyOK = function() {
  var result = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch (_) {
    result = false;
  }
  strApplyOK = function() {
    return result;
  };
  return result;
};
var strApplyUintOK = function() {
  var result = true;
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (_) {
    result = false;
  }
  strApplyUintOK = function() {
    return result;
  };
  return result;
};
var utf8len = function(c) {
  var table = Buf8(256);
  for (var q = 0; q < 256; q++) {
    table[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }
  table[254] = table[254] = 1;
  utf8len = function(arg) {
    return table[arg];
  };
  return table[c];
};
function string2buf(str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
}
function _buf2binstring(buf, len) {
  if (len < 65534) {
    if (buf.subarray && strApplyUintOK() || !buf.subarray && strApplyOK()) {
      return String.fromCharCode.apply(null, shrinkBuf(buf, len));
    }
  }
  var result = "";
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}
function buf2binstring(buf) {
  return _buf2binstring(buf, buf.length);
}
function binstring2buf(str) {
  var buf = new Uint8Array(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
}
function buf2string(buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;
  var utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    c_len = utf8len(c);
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return _buf2binstring(utf16buf, out);
}
function utf8border(buf, max) {
  var pos;
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + utf8len(buf[pos]) > max ? pos : max;
}
function adler32(adler, buf, len, pos) {
  var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
}
function makeTable() {
  var c, table = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
}
var crcTable = function() {
  var table = makeTable();
  crcTable = function() {
    return table;
  };
  return table;
};
function crc32(crc, buf, len, pos) {
  var t = crcTable(), end2 = pos + len;
  crc ^= -1;
  for (var i = pos; i < end2; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
}
var BAD = 30;
var TYPE = 12;
function inflate_fast(strm, start) {
  var state;
  var _in;
  var last;
  var _out;
  var beg;
  var end2;
  var dmax;
  var wsize;
  var whave;
  var wnext;
  var s_window;
  var hold;
  var bits;
  var lcode;
  var dcode;
  var lmask;
  var dmask;
  var here;
  var op;
  var len;
  var dist;
  var from;
  var from_source;
  var input, output;
  state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end2 = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end2);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end2 ? 257 + (end2 - _out) : 257 - (_out - end2);
  state.hold = hold;
  state.bits = bits;
  return;
}
var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var lbase = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
];
var lext = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
];
var dbase = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
];
var dext = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
];
function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
  var bits = opts.bits;
  var len = 0;
  var sym = 0;
  var min = 0, max = 0;
  var root = 0;
  var curr = 0;
  var drop = 0;
  var left = 0;
  var used = 0;
  var huff = 0;
  var incr;
  var fill;
  var low;
  var mask;
  var next;
  var base = null;
  var base_index = 0;
  var end2;
  var count = Buf16(MAXBITS + 1);
  var offs = Buf16(MAXBITS + 1);
  var extra = null;
  var extra_index = 0;
  var here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES) {
    base = extra = work;
    end2 = 19;
  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end2 = 256;
  } else {
    base = dbase;
    extra = dext;
    end2 = -1;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] < end2) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] > end2) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
}
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var Z_FINISH$1 = 4;
var Z_BLOCK$1 = 5;
var Z_TREES$1 = 6;
var Z_OK$1 = 0;
var Z_STREAM_END$1 = 1;
var Z_NEED_DICT$1 = 2;
var Z_STREAM_ERROR$1 = -2;
var Z_DATA_ERROR$1 = -3;
var Z_MEM_ERROR = -4;
var Z_BUF_ERROR$1 = -5;
var Z_DEFLATED$1 = 8;
var HEAD = 1;
var FLAGS = 2;
var TIME = 3;
var OS = 4;
var EXLEN = 5;
var EXTRA = 6;
var NAME = 7;
var COMMENT = 8;
var HCRC = 9;
var DICTID = 10;
var DICT = 11;
var TYPE$1 = 12;
var TYPEDO = 13;
var STORED = 14;
var COPY_ = 15;
var COPY = 16;
var TABLE = 17;
var LENLENS = 18;
var CODELENS = 19;
var LEN_ = 20;
var LEN = 21;
var LENEXT = 22;
var DIST = 23;
var DISTEXT = 24;
var MATCH = 25;
var LIT = 26;
var CHECK = 27;
var LENGTH = 28;
var DONE = 29;
var BAD$1 = 30;
var MEM = 31;
var SYNC = 32;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
function zswap32(q) {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
}
function InflateState() {
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = Buf16(320);
  this.work = Buf16(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
function inflateResetKeep(strm) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = Buf32(ENOUGH_LENS$1);
  state.distcode = state.distdyn = Buf32(ENOUGH_DISTS$1);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
}
function inflateReset(strm) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
}
function inflateReset2(strm, windowBits) {
  var wrap;
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}
function inflateInit2(strm, windowBits) {
  var ret;
  var state;
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  state = new InflateState();
  strm.state = state;
  state.window = null;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
}
var virgin = true;
var lenfix;
var distfix;
function fixedtables(state) {
  if (virgin) {
    var sym;
    lenfix = Buf32(512);
    distfix = Buf32(32);
    sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inflate_table(LENS$1, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inflate_table(DISTS$1, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}
function updatewindow(strm, src, end2, copy) {
  var dist;
  var state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = Buf8(state.wsize);
  }
  if (copy >= state.wsize) {
    arraySet(state.window, src, end2 - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    arraySet(state.window, src, end2 - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      arraySet(state.window, src, end2 - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
}
function inflate(strm, flush2) {
  var state;
  var input, output;
  var next;
  var put;
  var have, left;
  var hold;
  var bits;
  var _in, _out;
  var copy;
  var from;
  var from_source;
  var here = 0;
  var here_bits, here_op, here_val;
  var last_bits, last_op, last_val;
  var len;
  var ret;
  var hbuf = Buf8(4);
  var opts;
  var n;
  var order = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE$1) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          state.flags = 0;
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD$1;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED$1) {
            strm.msg = "unknown compression method";
            state.mode = BAD$1;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          } else if (len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD$1;
            break;
          }
          state.dmax = 1 << len;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE$1;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED$1) {
            strm.msg = "unknown compression method";
            state.mode = BAD$1;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD$1;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Array(state.head.extra_len);
                }
                arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512) {
                state.check = crc32(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD$1;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE$1;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE$1;
        /* falls through */
        case TYPE$1:
          if (flush2 === Z_BLOCK$1 || flush2 === Z_TREES$1) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush2 === Z_TREES$1) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD$1;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD$1;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush2 === Z_TREES$1) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            arraySet(output, input, next, copy, put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE$1;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD$1;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inflate_table(CODES$1, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD$1;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD$1;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD$1;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD$1) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD$1;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inflate_table(LENS$1, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD$1;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inflate_table(DISTS$1, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD$1;
            break;
          }
          state.mode = LEN_;
          if (flush2 === Z_TREES$1) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inflate_fast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE$1) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE$1;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD$1;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD$1;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD$1;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (_out) {
              strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
              state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
            }
            _out = left;
            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD$1;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD$1;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD$1:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD$1 && (state.mode < CHECK || flush2 !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE$1 ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush2 === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR$1;
  }
  return ret;
}
function inflateEnd(strm) {
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
}
function inflateGetHeader(strm, head) {
  var state;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
}
function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;
  var state;
  var dictid;
  var ret;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  return Z_OK$1;
}
var msg = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var toString = Object.prototype.toString;
var Inflate = function Inflate2(options) {
  if (!(this instanceof Inflate2)) {
    return new Inflate2(options);
  }
  this.options = assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, options || {});
  var opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new ZStream();
  this.strm.avail_out = 0;
  var status = inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }
  this.header = new GZheader();
  inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
};
Inflate.prototype.push = function push(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;
  var allowBufError = false;
  if (this.ended) {
    return false;
  }
  _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (typeof data === "string") {
    strm.input = binstring2buf(data);
  } else if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  do {
    if (strm.avail_out === 0) {
      strm.output = Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate(strm, Z_NO_FLUSH);
    if (status === Z_NEED_DICT && dictionary) {
      if (typeof dictionary === "string") {
        dict = string2buf(dictionary);
      } else if (toString.call(dictionary) === "[object ArrayBuffer]") {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }
      status = inflateSetDictionary(this.strm, dict);
    }
    if (status === Z_BUF_ERROR && allowBufError === true) {
      status = Z_OK;
      allowBufError = false;
    }
    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
        if (this.options.to === "string") {
          next_out_utf8 = utf8border(strm.output, strm.next_out);
          tail = strm.next_out - next_out_utf8;
          utf8str = buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) {
            arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
          }
          this.onData(utf8str);
        } else {
          this.onData(shrinkBuf(strm.output, strm.next_out));
        }
      }
    }
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
  if (status === Z_STREAM_END) {
    _mode = Z_FINISH;
  }
  if (_mode === Z_FINISH) {
    status = inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }
  return true;
};
Inflate.prototype.onData = function onData(chunk) {
  this.chunks.push(chunk);
};
Inflate.prototype.onEnd = function onEnd(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function zero(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
);
var extra_dbits = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
);
var extra_blbits = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
);
var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
var DIST_CODE_LEN = 512;
var static_ltree;
var static_dtree;
var _dist_code;
var _length_code;
var base_length;
var base_dist;
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}
function put_short(s, w) {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
}
function send_bits(s, value, length) {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
}
function send_code(s, c, tree) {
  send_bits(
    s,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
}
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}
function gen_bitlen(s, desc) {
  var tree = desc.dyn_tree;
  var max_code = desc.max_code;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var extra = desc.stat_desc.extra_bits;
  var base = desc.stat_desc.extra_base;
  var max_length = desc.stat_desc.max_length;
  var h;
  var n, m;
  var bits;
  var xbits;
  var f;
  var overflow = 0;
  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
}
function gen_codes(tree, max_code, bl_count) {
  var next_code = new Array(MAX_BITS + 1);
  var code = 0;
  var bits;
  var n;
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = code + bl_count[bits - 1] << 1;
  }
  for (n = 0; n <= max_code; n++) {
    var len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
}
function tr_static_init() {
  var n;
  var bits;
  var length;
  var code;
  var dist;
  var bl_count = new Array(MAX_BITS + 1);
  static_ltree = new Array((L_CODES + 2) * 2);
  zero(static_ltree);
  static_dtree = new Array(D_CODES * 2);
  zero(static_dtree);
  _dist_code = new Array(DIST_CODE_LEN);
  zero(_dist_code);
  _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
  zero(_length_code);
  base_length = new Array(LENGTH_CODES);
  zero(base_length);
  base_dist = new Array(D_CODES);
  zero(base_dist);
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES + 1, bl_count);
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
}
function init_block(s) {
  var n;
  for (n = 0; n < L_CODES; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}
function bi_windup(s) {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}
function copy_block(s, buf, len, header) {
  bi_windup(s);
  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
  arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
}
function pqdownheap(s, tree, k) {
  var v = s.heap[k];
  var j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
}
function compress_block(s, ltree, dtree) {
  var dist;
  var lc;
  var lx = 0;
  var code;
  var extra;
  if (s.last_lit !== 0) {
    do {
      dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
      lc = s.pending_buf[s.l_buf + lx];
      lx++;
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (lx < s.last_lit);
  }
  send_code(s, END_BLOCK, ltree);
}
function build_tree(s, desc) {
  var tree = desc.dyn_tree;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems = desc.stat_desc.elems;
  var n, m;
  var max_code = -1;
  var node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
}
function scan_tree(s, tree, max_code) {
  var n;
  var prevlen = -1;
  var curlen;
  var nextlen = tree[0 * 2 + 1];
  var count = 0;
  var max_count = 7;
  var min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
function send_tree(s, tree, max_code) {
  var n;
  var prevlen = -1;
  var curlen;
  var nextlen = tree[0 * 2 + 1];
  var count = 0;
  var max_count = 7;
  var min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}
function build_bl_tree(s) {
  var max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
}
function send_all_trees(s, lcodes, dcodes, blcodes) {
  var rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
}
function detect_data_type(s) {
  var black_mask = 4093624447;
  var n;
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
}
var static_init_done = false;
function _tr_init(s) {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
}
function _tr_stored_block(s, buf, stored_len, last) {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  copy_block(s, buf, stored_len, true);
}
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}
function _tr_flush_block(s, buf, stored_len, last) {
  var opt_lenb, static_lenb;
  var max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
}
function _tr_tally(s, dist, lc) {
  s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
  s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
  s.last_lit++;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.last_lit === s.lit_bufsize - 1;
}
var MAX_MEM_LEVEL = 9;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var MIN_LOOKAHEAD = MAX_MATCH$1 + MIN_MATCH$1 + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}
function rank(f) {
  return (f << 1) - (f > 4 ? 9 : 0);
}
function zero$1(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
function flush_pending(strm) {
  var s = strm.state;
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}
function flush_block_only(s, last) {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}
function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}
function putShortMSB(s, b) {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
}
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
}
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;
  var scan = s.strstart;
  var match;
  var len;
  var best_len = s.prev_length;
  var nice_match = s.nice_match;
  var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  var _win = s.window;
  var wmask = s.w_mask;
  var prev = s.prev;
  var strend = s.strstart + MAX_MATCH$1;
  var scan_end1 = _win[scan + best_len - 1];
  var scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH$1 - (strend - scan);
    scan = strend - MAX_MATCH$1;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);
      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = m >= _w_size ? m - _w_size : 0;
      } while (--n);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH$1) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
      while (s.insert) {
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH$1 - 1]) & s.hash_mask;
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH$1) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
}
function deflate_stored(s, flush2) {
  var max_block_size = 65535;
  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }
  for (; ; ) {
    if (s.lookahead <= 1) {
      fill_window(s);
      if (s.lookahead === 0 && flush2 === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.strstart += s.lookahead;
    s.lookahead = 0;
    var max_start = s.block_start + max_block_size;
    if (s.strstart === 0 || s.strstart >= max_start) {
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
    if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush2 === Z_FINISH) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.strstart > s.block_start) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_NEED_MORE;
}
function deflate_fast(s, flush2) {
  var hash_head;
  var bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush2 === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH$1) {
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH$1) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH$1);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH$1) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
  if (flush2 === Z_FINISH) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_slow(s, flush2) {
  var hash_head;
  var bflush;
  var max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush2 === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH$1) {
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH$1 - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH$1 && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH$1 - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH$1 && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH$1;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH$1);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH$1 - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH$1 - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH$1 - 1 ? s.strstart : MIN_MATCH$1 - 1;
  if (flush2 === Z_FINISH) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_rle(s, flush2) {
  var bflush;
  var prev;
  var scan, strend;
  var _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH$1) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH$1 && flush2 === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH$1 && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH$1;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH$1 - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH$1) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH$1);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush2 === Z_FINISH) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function deflate_huff(s, flush2) {
  var bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush2 === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush2 === Z_FINISH) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
}
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configurationTable = function() {
  var table = [
    /*      good lazy nice chain */
    new Config(0, 0, 0, 0, deflate_stored),
    /* 0 store only */
    new Config(4, 4, 8, 4, deflate_fast),
    /* 1 max speed, no lazy matches */
    new Config(4, 5, 16, 8, deflate_fast),
    /* 2 */
    new Config(4, 6, 32, 32, deflate_fast),
    /* 3 */
    new Config(4, 4, 16, 16, deflate_slow),
    /* 4 lazy matches */
    new Config(8, 16, 32, 32, deflate_slow),
    /* 5 */
    new Config(8, 16, 128, 128, deflate_slow),
    /* 6 */
    new Config(8, 32, 128, 256, deflate_slow),
    /* 7 */
    new Config(32, 128, 258, 1024, deflate_slow),
    /* 8 */
    new Config(32, 258, 258, 4096, deflate_slow)
    /* 9 max compression */
  ];
  configurationTable = function() {
    return table;
  };
  return table;
};
function lm_init(s) {
  s.window_size = 2 * s.w_size;
  zero$1(s.head);
  var table = configurationTable();
  s.max_lazy_match = table[s.level].max_lazy;
  s.good_match = table[s.level].good_length;
  s.nice_match = table[s.level].nice_length;
  s.max_chain_length = table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH$1 - 1;
  s.match_available = 0;
  s.ins_h = 0;
}
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = Buf16(HEAP_SIZE$1 * 2);
  this.dyn_dtree = Buf16((2 * D_CODES$1 + 1) * 2);
  this.bl_tree = Buf16((2 * BL_CODES$1 + 1) * 2);
  zero$1(this.dyn_ltree);
  zero$1(this.dyn_dtree);
  zero$1(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = Buf16(MAX_BITS$1 + 1);
  this.heap = Buf16(2 * L_CODES$1 + 1);
  zero$1(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = Buf16(2 * L_CODES$1 + 1);
  zero$1(this.depth);
  this.l_buf = 0;
  this.lit_bufsize = 0;
  this.last_lit = 0;
  this.d_buf = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
function deflateResetKeep(strm) {
  var s;
  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = Z_NO_FLUSH;
  _tr_init(s);
  return Z_OK;
}
function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}
function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  if (strm.state.wrap !== 2) {
    return Z_STREAM_ERROR;
  }
  strm.state.gzhead = head;
  return Z_OK;
}
function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) {
    return Z_STREAM_ERROR;
  }
  var wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  var s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH$1 - 1) / MIN_MATCH$1);
  s.window = Buf8(s.w_size * 2);
  s.head = Buf16(s.hash_size);
  s.prev = Buf16(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = Buf8(s.pending_buf_size);
  s.d_buf = 1 * s.lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
}
function deflate(strm, flush2) {
  var old_flush, s;
  var beg, val;
  if (!strm || !strm.state || flush2 > Z_BLOCK || flush2 < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }
  s = strm.state;
  if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush2 !== Z_FINISH) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }
  s.strm = strm;
  old_flush = s.last_flush;
  s.last_flush = flush2;
  if (s.status === INIT_STATE) {
    if (s.wrap === 2) {
      strm.adler = 0;
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) {
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      } else {
        put_byte(
          s,
          (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 255);
        put_byte(s, s.gzhead.time >> 8 & 255);
        put_byte(s, s.gzhead.time >> 16 & 255);
        put_byte(s, s.gzhead.time >> 24 & 255);
        put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
        put_byte(s, s.gzhead.os & 255);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 255);
          put_byte(s, s.gzhead.extra.length >> 8 & 255);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    } else {
      var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
      var level_flags = -1;
      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= level_flags << 6;
      if (s.strstart !== 0) {
        header |= PRESET_DICT;
      }
      header += 31 - header % 31;
      s.status = BUSY_STATE;
      putShortMSB(s, header);
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      strm.adler = 1;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      beg = s.pending;
      while (s.gzindex < (s.gzhead.extra.length & 65535)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 255);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    } else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      beg = s.pending;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    } else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      beg = s.pending;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    } else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        strm.adler = 0;
        s.status = BUSY_STATE;
      }
    } else {
      s.status = BUSY_STATE;
    }
  }
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK;
    }
  } else if (strm.avail_in === 0 && rank(flush2) <= rank(old_flush) && flush2 !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush2 !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
    var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush2) : s.strategy === Z_RLE ? deflate_rle(s, flush2) : configurationTable()[s.level].func(s, flush2);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush2 === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush2 !== Z_BLOCK) {
        _tr_stored_block(s, 0, 0, false);
        if (flush2 === Z_FULL_FLUSH) {
          zero$1(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK;
      }
    }
  }
  if (flush2 !== Z_FINISH) {
    return Z_OK;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}
function deflateEnd(strm) {
  var status;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  status = strm.state.status;
  if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
    return err(strm, Z_STREAM_ERROR);
  }
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;
  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR;
  }
  s = strm.state;
  wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR;
  }
  if (wrap === 1) {
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero$1(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    tmpDict = Buf8(s.w_size);
    arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH$1) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH$1 - 1);
    do {
      s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH$1 - 1]) & s.hash_mask;
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH$1 - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH$1 - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}
var toString$1 = Object.prototype.toString;
var Deflate = function Deflate2(options) {
  this.options = assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ""
  }, options || {});
  var opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new ZStream();
  this.strm.avail_out = 0;
  var status = deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }
  if (opt.header) {
    deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    var dict;
    if (typeof opt.dictionary === "string") {
      dict = string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }
    this._dict_set = true;
  }
};
Deflate.prototype.push = function push2(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;
  if (this.ended) {
    return false;
  }
  _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (typeof data === "string") {
    strm.input = string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  do {
    if (strm.avail_out === 0) {
      strm.output = Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = deflate(strm, _mode);
    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
      if (this.options.to === "string") {
        this.onData(buf2binstring(shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
  if (_mode === Z_FINISH) {
    status = deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }
  return true;
};
Deflate.prototype.onData = function onData2(chunk) {
  this.chunks.push(chunk);
};
Deflate.prototype.onEnd = function onEnd2(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  var deflator = new Deflate(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || msg[deflator.err];
  }
  return deflator.result;
}

// node_modules/@progress/jszip-esm/dist/jszip-esm5.js
var external = {
  Promise
};
var support = {
  base64: true,
  array: true,
  string: true,
  nodebuffer: false,
  nodestream: false,
  get arraybuffer() {
    return typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
  },
  // Returns true if JSZip can read/generate Uint8Array, false otherwise.
  get uint8array() {
    return typeof Uint8Array !== "undefined";
  },
  get blob() {
    return blob();
  }
};
var blob = function() {
  var supported;
  if (typeof ArrayBuffer === "undefined") {
    supported = false;
  } else {
    var buffer = new ArrayBuffer(0);
    try {
      supported = new Blob([buffer], {
        type: "application/zip"
      }).size === 0;
    } catch (e) {
      supported = false;
    }
  }
  blob = function() {
    return supported;
  };
  return supported;
};
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var encode = function(input) {
  var output = [];
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0, len = input.length, remainingBytes = len;
  var isArray = typeof input !== "string";
  while (i < input.length) {
    remainingBytes = len - i;
    if (!isArray) {
      chr1 = input.charCodeAt(i++);
      chr2 = i < len ? input.charCodeAt(i++) : 0;
      chr3 = i < len ? input.charCodeAt(i++) : 0;
    } else {
      chr1 = input[i++];
      chr2 = i < len ? input[i++] : 0;
      chr3 = i < len ? input[i++] : 0;
    }
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
    enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
    output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
  }
  return output.join("");
};
var decode = function(input) {
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0, resultIndex = 0;
  var dataUrlPrefix = "data:";
  if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
    throw new Error("Invalid base64 input, it looks like a data url.");
  }
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  var totalLength = input.length * 3 / 4;
  if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
    totalLength--;
  }
  if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
    totalLength--;
  }
  if (totalLength % 1 !== 0) {
    throw new Error("Invalid base64 input, bad content length.");
  }
  var output;
  if (support.uint8array) {
    output = new Uint8Array(totalLength | 0);
  } else {
    output = new Array(totalLength | 0);
  }
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output[resultIndex++] = chr1;
    if (enc3 !== 64) {
      output[resultIndex++] = chr2;
    }
    if (enc4 !== 64) {
      output[resultIndex++] = chr3;
    }
  }
  return output;
};
function string2binary(str) {
  var result = null;
  if (support.uint8array) {
    result = new Uint8Array(str.length);
  } else {
    result = new Array(str.length);
  }
  return stringToArrayLike(str, result);
}
var newBlob = function(part, type) {
  checkSupport("blob");
  return new Blob([part], {
    type
  });
};
function identity(input) {
  return input;
}
function stringToArrayLike(str, array) {
  for (var i = 0; i < str.length; ++i) {
    array[i] = str.charCodeAt(i) & 255;
  }
  return array;
}
function stringifyByChunk(array, type, chunk) {
  var result = [], k = 0, len = array.length;
  if (len <= chunk) {
    return String.fromCharCode.apply(null, array);
  }
  while (k < len) {
    if (type === "array") {
      result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
    } else {
      result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
    }
    k += chunk;
  }
  return result.join("");
}
function stringifyByChar(array) {
  var resultStr = "";
  for (var i = 0; i < array.length; i++) {
    resultStr += String.fromCharCode(array[i]);
  }
  return resultStr;
}
var fromCharCodeSupportsTypedArrays = function() {
  var supported;
  try {
    supported = support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
  } catch (e) {
    supported = false;
  }
  fromCharCodeSupportsTypedArrays = function() {
    return supported;
  };
  return supported;
};
function arrayLikeToString(array) {
  var chunk = 65536, type = getTypeOf(array), canUseApply = true;
  if (type === "uint8array") {
    canUseApply = fromCharCodeSupportsTypedArrays();
  }
  if (canUseApply) {
    while (chunk > 1) {
      try {
        return stringifyByChunk(array, type, chunk);
      } catch (e) {
        chunk = Math.floor(chunk / 2);
      }
    }
  }
  return stringifyByChar(array);
}
var applyFromCharCode = arrayLikeToString;
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
  for (var i = 0; i < arrayFrom.length; i++) {
    arrayTo[i] = arrayFrom[i];
  }
  return arrayTo;
}
var transform = {
  // string to ?
  "string": {
    "string": identity,
    "array": function(input) {
      return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
      return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
      return stringToArrayLike(input, new Uint8Array(input.length));
    }
  },
  // array to ?
  "array": {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
      return new Uint8Array(input).buffer;
    },
    "uint8array": function(input) {
      return new Uint8Array(input);
    }
  },
  // arraybuffer to ?
  "arraybuffer": {
    "string": function(input) {
      return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
      return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
      return new Uint8Array(input);
    }
  },
  // uint8array to ?
  "uint8array": {
    "string": arrayLikeToString,
    "array": function(input) {
      return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
      return input.buffer;
    },
    "uint8array": identity
  }
};
var transformTo = function(outputType, input) {
  if (!input) {
    input = "";
  }
  if (!outputType) {
    return input;
  }
  checkSupport(outputType);
  var inputType = getTypeOf(input);
  var result = transform[inputType][outputType](input);
  return result;
};
var resolve = function(path) {
  var parts = path.split("/");
  var result = [];
  for (var index = 0; index < parts.length; index++) {
    var part = parts[index];
    if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
      continue;
    } else if (part === "..") {
      result.pop();
    } else {
      result.push(part);
    }
  }
  return result.join("/");
};
var getTypeOf = function(input) {
  if (typeof input === "string") {
    return "string";
  }
  if (Object.prototype.toString.call(input) === "[object Array]") {
    return "array";
  }
  if (support.uint8array && input instanceof Uint8Array) {
    return "uint8array";
  }
  if (support.arraybuffer && input instanceof ArrayBuffer) {
    return "arraybuffer";
  }
};
var checkSupport = function(type) {
  var supported = support[type.toLowerCase()];
  if (!supported) {
    throw new Error(type + " is not supported by this platform");
  }
};
var MAX_VALUE_16BITS = 65535;
var MAX_VALUE_32BITS = -1;
var pretty = function(str) {
  var res = "", code, i;
  for (i = 0; i < (str || "").length; i++) {
    code = str.charCodeAt(i);
    res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
  }
  return res;
};
var delay = function(callback, args, self) {
  setTimeout(function() {
    callback.apply(self || null, args || []);
  }, 0);
};
var extend = function() {
  var arguments$1 = arguments;
  var result = {}, i, attr;
  for (i = 0; i < arguments.length; i++) {
    for (attr in arguments[i]) {
      if (Object.hasOwnProperty.call(arguments$1[i], attr) && typeof result[attr] === "undefined") {
        result[attr] = arguments$1[i][attr];
      }
    }
  }
  return result;
};
var prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
  var promise = external.Promise.resolve(inputData).then(function(data) {
    var isBlob = support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);
    if (isBlob && typeof FileReader !== "undefined") {
      return new external.Promise(function(resolve2, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
          resolve2(e.target.result);
        };
        reader.onerror = function(e) {
          reject(e.target.error);
        };
        reader.readAsArrayBuffer(data);
      });
    } else {
      return data;
    }
  });
  return promise.then(function(data) {
    var dataType = getTypeOf(data);
    if (!dataType) {
      return external.Promise.reject(
        new Error("Can't read the data of '" + name + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
      );
    }
    if (dataType === "arraybuffer") {
      data = transformTo("uint8array", data);
    } else if (dataType === "string") {
      if (isBase64) {
        data = decode(data);
      } else if (isBinary) {
        if (isOptimizedBinaryString !== true) {
          data = string2binary(data);
        }
      }
    }
    return data;
  });
};
var GenericWorker = function GenericWorker2(name) {
  this.name = name || "default";
  this.streamInfo = {};
  this.generatedError = null;
  this.extraStreamInfo = {};
  this.isPaused = true;
  this.isFinished = false;
  this.isLocked = false;
  this._listeners = {
    "data": [],
    "end": [],
    "error": []
  };
  this.previous = null;
};
GenericWorker.prototype.push = function push3(chunk) {
  this.emit("data", chunk);
};
GenericWorker.prototype.end = function end() {
  if (this.isFinished) {
    return false;
  }
  this.flush();
  try {
    this.emit("end");
    this.cleanUp();
    this.isFinished = true;
  } catch (e) {
    this.emit("error", e);
  }
  return true;
};
GenericWorker.prototype.error = function error(e) {
  if (this.isFinished) {
    return false;
  }
  if (this.isPaused) {
    this.generatedError = e;
  } else {
    this.isFinished = true;
    this.emit("error", e);
    if (this.previous) {
      this.previous.error(e);
    }
    this.cleanUp();
  }
  return true;
};
GenericWorker.prototype.on = function on(name, listener) {
  this._listeners[name].push(listener);
  return this;
};
GenericWorker.prototype.cleanUp = function cleanUp() {
  this.streamInfo = this.generatedError = this.extraStreamInfo = null;
  this._listeners = [];
};
GenericWorker.prototype.emit = function emit(name, arg) {
  if (this._listeners[name]) {
    for (var i = 0; i < this._listeners[name].length; i++) {
      this._listeners[name][i].call(this, arg);
    }
  }
};
GenericWorker.prototype.pipe = function pipe(next) {
  return next.registerPrevious(this);
};
GenericWorker.prototype.registerPrevious = function registerPrevious(previous) {
  if (this.isLocked) {
    throw new Error("The stream '" + this + "' has already been used.");
  }
  this.streamInfo = previous.streamInfo;
  this.mergeStreamInfo();
  this.previous = previous;
  var self = this;
  previous.on("data", function(chunk) {
    self.processChunk(chunk);
  });
  previous.on("end", function() {
    self.end();
  });
  previous.on("error", function(e) {
    self.error(e);
  });
  return this;
};
GenericWorker.prototype.pause = function pause() {
  if (this.isPaused || this.isFinished) {
    return false;
  }
  this.isPaused = true;
  if (this.previous) {
    this.previous.pause();
  }
  return true;
};
GenericWorker.prototype.resume = function resume() {
  if (!this.isPaused || this.isFinished) {
    return false;
  }
  this.isPaused = false;
  var withError = false;
  if (this.generatedError) {
    this.error(this.generatedError);
    withError = true;
  }
  if (this.previous) {
    this.previous.resume();
  }
  return !withError;
};
GenericWorker.prototype.flush = function flush() {
};
GenericWorker.prototype.processChunk = function processChunk(chunk) {
  this.push(chunk);
};
GenericWorker.prototype.withStreamInfo = function withStreamInfo(key, value) {
  this.extraStreamInfo[key] = value;
  this.mergeStreamInfo();
  return this;
};
GenericWorker.prototype.mergeStreamInfo = function mergeStreamInfo() {
  for (var key in this.extraStreamInfo) {
    if (!this.extraStreamInfo.hasOwnProperty(key)) {
      continue;
    }
    this.streamInfo[key] = this.extraStreamInfo[key];
  }
};
GenericWorker.prototype.lock = function lock() {
  if (this.isLocked) {
    throw new Error("The stream '" + this + "' has already been used.");
  }
  this.isLocked = true;
  if (this.previous) {
    this.previous.lock();
  }
};
GenericWorker.prototype.toString = function toString2() {
  var me = "Worker " + this.name;
  if (this.previous) {
    return this.previous + " -> " + me;
  } else {
    return me;
  }
};
var utf8len2 = function(c) {
  var _utf8len = new Array(256);
  for (var i = 0; i < 256; i++) {
    _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
  }
  _utf8len[254] = _utf8len[254] = 1;
  utf8len2 = function(c2) {
    return _utf8len[c2];
  };
  return _utf8len[c];
};
var string2buf2 = function(str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  if (support.uint8array) {
    buf = new Uint8Array(buf_len);
  } else {
    buf = new Array(buf_len);
  }
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var utf8border2 = function(buf, max) {
  var pos;
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + utf8len2(buf[pos]) > max ? pos : max;
};
var buf2string2 = function(buf) {
  var i, out, c, c_len;
  var len = buf.length;
  var utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    c_len = utf8len2(c);
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  if (utf16buf.length !== out) {
    if (utf16buf.subarray) {
      utf16buf = utf16buf.subarray(0, out);
    } else {
      utf16buf.length = out;
    }
  }
  return applyFromCharCode(utf16buf);
};
var utf8encode = function utf8encode2(str) {
  return string2buf2(str);
};
var utf8decode = function utf8decode2(buf) {
  buf = transformTo(support.uint8array ? "uint8array" : "array", buf);
  return buf2string2(buf);
};
var Utf8DecodeWorker = (function(GenericWorker3) {
  function Utf8DecodeWorker2() {
    GenericWorker3.call(this, "utf-8 decode");
    this.leftOver = null;
  }
  Utf8DecodeWorker2.__proto__ = GenericWorker3;
  Utf8DecodeWorker2.prototype = Object.create(GenericWorker3.prototype);
  Utf8DecodeWorker2.prototype.constructor = Utf8DecodeWorker2;
  Utf8DecodeWorker2.prototype.processChunk = function processChunk2(chunk) {
    var data = transformTo(support.uint8array ? "uint8array" : "array", chunk.data);
    if (this.leftOver && this.leftOver.length) {
      if (support.uint8array) {
        var previousData = data;
        data = new Uint8Array(previousData.length + this.leftOver.length);
        data.set(this.leftOver, 0);
        data.set(previousData, this.leftOver.length);
      } else {
        data = this.leftOver.concat(data);
      }
      this.leftOver = null;
    }
    var nextBoundary = utf8border2(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
      if (support.uint8array) {
        usableData = data.subarray(0, nextBoundary);
        this.leftOver = data.subarray(nextBoundary, data.length);
      } else {
        usableData = data.slice(0, nextBoundary);
        this.leftOver = data.slice(nextBoundary, data.length);
      }
    }
    this.push({
      data: utf8decode(usableData),
      meta: chunk.meta
    });
  };
  Utf8DecodeWorker2.prototype.flush = function flush2() {
    if (this.leftOver && this.leftOver.length) {
      this.push({
        data: utf8decode(this.leftOver),
        meta: {}
      });
      this.leftOver = null;
    }
  };
  return Utf8DecodeWorker2;
})(GenericWorker);
var Utf8EncodeWorker = (function(GenericWorker3) {
  function Utf8EncodeWorker2() {
    GenericWorker3.call(this, "utf-8 encode");
  }
  Utf8EncodeWorker2.__proto__ = GenericWorker3;
  Utf8EncodeWorker2.prototype = Object.create(GenericWorker3.prototype);
  Utf8EncodeWorker2.prototype.constructor = Utf8EncodeWorker2;
  Utf8EncodeWorker2.prototype.processChunk = function processChunk2(chunk) {
    this.push({
      data: utf8encode(chunk.data),
      meta: chunk.meta
    });
  };
  return Utf8EncodeWorker2;
})(GenericWorker);
var ConvertWorker = (function(GenericWorker3) {
  function ConvertWorker2(destType) {
    GenericWorker3.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
  }
  ConvertWorker2.__proto__ = GenericWorker3;
  ConvertWorker2.prototype = Object.create(GenericWorker3.prototype);
  ConvertWorker2.prototype.constructor = ConvertWorker2;
  ConvertWorker2.prototype.processChunk = function processChunk2(chunk) {
    this.push({
      data: transformTo(this.destType, chunk.data),
      meta: chunk.meta
    });
  };
  return ConvertWorker2;
})(GenericWorker);
function transformZipOutput(type, content, mimeType) {
  switch (type) {
    case "blob":
      return newBlob(transformTo("arraybuffer", content), mimeType);
    case "base64":
      return encode(content);
    default:
      return transformTo(type, content);
  }
}
function concat(type, dataArray) {
  var i, index = 0, res = null, totalLength = 0;
  for (i = 0; i < dataArray.length; i++) {
    totalLength += dataArray[i].length;
  }
  switch (type) {
    case "string":
      return dataArray.join("");
    case "array":
      return Array.prototype.concat.apply([], dataArray);
    case "uint8array":
      res = new Uint8Array(totalLength);
      for (i = 0; i < dataArray.length; i++) {
        res.set(dataArray[i], index);
        index += dataArray[i].length;
      }
      return res;
    default:
      throw new Error("concat : unsupported type '" + type + "'");
  }
}
function accumulate(helper, updateCallback) {
  return new external.Promise(function(resolve2, reject) {
    var dataArray = [];
    var chunkType = helper._internalType, resultType = helper._outputType, mimeType = helper._mimeType;
    helper.on("data", function(data, meta) {
      dataArray.push(data);
      if (updateCallback) {
        updateCallback(meta);
      }
    }).on("error", function(err2) {
      dataArray = [];
      reject(err2);
    }).on("end", function() {
      try {
        var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
        resolve2(result);
      } catch (e) {
        reject(e);
      }
      dataArray = [];
    }).resume();
  });
}
var StreamHelper = function StreamHelper2(worker, outputType, mimeType) {
  var internalType = outputType;
  switch (outputType) {
    case "blob":
    case "arraybuffer":
      internalType = "uint8array";
      break;
    case "base64":
      internalType = "string";
      break;
  }
  try {
    this._internalType = internalType;
    this._outputType = outputType;
    this._mimeType = mimeType;
    checkSupport(internalType);
    this._worker = worker.pipe(new ConvertWorker(internalType));
    worker.lock();
  } catch (e) {
    this._worker = new GenericWorker("error");
    this._worker.error(e);
  }
};
StreamHelper.prototype.accumulate = function accumulate$1(updateCb) {
  return accumulate(this, updateCb);
};
StreamHelper.prototype.on = function on2(evt, fn) {
  var self = this;
  if (evt === "data") {
    this._worker.on(evt, function(chunk) {
      fn.call(self, chunk.data, chunk.meta);
    });
  } else {
    this._worker.on(evt, function() {
      delay(fn, arguments, self);
    });
  }
  return this;
};
StreamHelper.prototype.resume = function resume2() {
  delay(this._worker.resume, [], this._worker);
  return this;
};
StreamHelper.prototype.pause = function pause2() {
  this._worker.pause();
  return this;
};
var base64 = false;
var binary = false;
var dir = false;
var createFolders = true;
var date = null;
var compression = null;
var compressionOptions = null;
var comment = null;
var unixPermissions = null;
var dosPermissions = null;
var defaults = Object.freeze({
  __proto__: null,
  base64,
  binary,
  comment,
  compression,
  compressionOptions,
  createFolders,
  date,
  dir,
  dosPermissions,
  unixPermissions
});
var DEFAULT_BLOCK_SIZE = 16 * 1024;
var DataWorker = (function(GenericWorker3) {
  function DataWorker2(dataP) {
    GenericWorker3.call(this, "DataWorker");
    var self = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";
    this._tickScheduled = false;
    dataP.then(function(data) {
      self.dataIsReady = true;
      self.data = data;
      self.max = data && data.length || 0;
      self.type = getTypeOf(data);
      if (!self.isPaused) {
        self._tickAndRepeat();
      }
    }, function(e) {
      self.error(e);
    });
  }
  DataWorker2.__proto__ = GenericWorker3;
  DataWorker2.prototype = Object.create(GenericWorker3.prototype);
  DataWorker2.prototype.constructor = DataWorker2;
  DataWorker2.prototype.cleanUp = function cleanUp2() {
    GenericWorker3.prototype.cleanUp.call(this);
    this.data = null;
  };
  DataWorker2.prototype.resume = function resume3() {
    if (!GenericWorker3.prototype.resume.call(this)) {
      return false;
    }
    if (!this._tickScheduled && this.dataIsReady) {
      this._tickScheduled = true;
      delay(this._tickAndRepeat, [], this);
    }
    return true;
  };
  DataWorker2.prototype._tickAndRepeat = function _tickAndRepeat() {
    this._tickScheduled = false;
    if (this.isPaused || this.isFinished) {
      return;
    }
    this._tick();
    if (!this.isFinished) {
      delay(this._tickAndRepeat, [], this);
      this._tickScheduled = true;
    }
  };
  DataWorker2.prototype._tick = function _tick() {
    if (this.isPaused || this.isFinished) {
      return false;
    }
    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
      return this.end();
    } else {
      switch (this.type) {
        case "string":
          data = this.data.substring(this.index, nextIndex);
          break;
        case "uint8array":
          data = this.data.subarray(this.index, nextIndex);
          break;
        case "array":
          data = this.data.slice(this.index, nextIndex);
          break;
      }
      this.index = nextIndex;
      return this.push({
        data,
        meta: {
          percent: this.max ? this.index / this.max * 100 : 0
        }
      });
    }
  };
  return DataWorker2;
})(GenericWorker);
var DataLengthProbe = (function(GenericWorker3) {
  function DataLengthProbe2(propName) {
    GenericWorker3.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
  }
  DataLengthProbe2.__proto__ = GenericWorker3;
  DataLengthProbe2.prototype = Object.create(GenericWorker3.prototype);
  DataLengthProbe2.prototype.constructor = DataLengthProbe2;
  DataLengthProbe2.prototype.processChunk = function processChunk2(chunk) {
    if (chunk) {
      var length = this.streamInfo[this.propName] || 0;
      this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker3.prototype.processChunk.call(this, chunk);
  };
  return DataLengthProbe2;
})(GenericWorker);
var makeTable2 = function() {
  var table = [];
  for (var n = 0; n < 256; n++) {
    var c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  makeTable2 = function() {
    return table;
  };
  return table;
};
function crc322(crc, buf, len, pos) {
  var t = makeTable2();
  var end2 = pos + len;
  crc = crc ^ -1;
  for (var i = pos; i < end2; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
}
function crc32str(crc, str, len, pos) {
  var t = makeTable2();
  var end2 = pos + len;
  crc = crc ^ -1;
  for (var i = pos; i < end2; i++) {
    crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
  }
  return crc ^ -1;
}
function crc32wrapper(input, crc) {
  if (typeof input === "undefined" || !input.length) {
    return 0;
  }
  var isArray = getTypeOf(input) !== "string";
  if (isArray) {
    return crc322(crc | 0, input, input.length, 0);
  } else {
    return crc32str(crc | 0, input, input.length, 0);
  }
}
var Crc32Probe = (function(GenericWorker3) {
  function Crc32Probe2() {
    GenericWorker3.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
  }
  Crc32Probe2.__proto__ = GenericWorker3;
  Crc32Probe2.prototype = Object.create(GenericWorker3.prototype);
  Crc32Probe2.prototype.constructor = Crc32Probe2;
  Crc32Probe2.prototype.processChunk = function processChunk2(chunk) {
    this.streamInfo.crc32 = crc32wrapper(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
  };
  return Crc32Probe2;
})(GenericWorker);
var CompressedObject = function CompressedObject2(compressedSize, uncompressedSize, crc323, compression2, data) {
  this.compressedSize = compressedSize;
  this.uncompressedSize = uncompressedSize;
  this.crc32 = crc323;
  this.compression = compression2;
  this.compressedContent = data;
};
CompressedObject.prototype.getContentWorker = function getContentWorker() {
  var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
  var that = this;
  worker.on("end", function() {
    if (this.streamInfo["data_length"] !== that.uncompressedSize) {
      throw new Error("Bug : uncompressed data size mismatch");
    }
  });
  return worker;
};
CompressedObject.prototype.getCompressedWorker = function getCompressedWorker() {
  return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
};
CompressedObject.createWorkerFrom = function createWorkerFrom(uncompressedWorker, compression2, compressionOptions2) {
  return uncompressedWorker.pipe(new Crc32Probe()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression2.compressWorker(compressionOptions2)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression2);
};
var ZipObject = function ZipObject2(name, data, options) {
  this.name = name;
  this.dir = options.dir;
  this.date = options.date;
  this.comment = options.comment;
  this.unixPermissions = options.unixPermissions;
  this.dosPermissions = options.dosPermissions;
  this._data = data;
  this._dataBinary = options.binary;
  this.options = {
    compression: options.compression,
    compressionOptions: options.compressionOptions
  };
};
ZipObject.prototype.internalStream = function internalStream(type) {
  var result = null, outputType = "string";
  try {
    if (!type) {
      throw new Error("No output type specified.");
    }
    outputType = type.toLowerCase();
    var askUnicodeString = outputType === "string" || outputType === "text";
    if (outputType === "binarystring" || outputType === "text") {
      outputType = "string";
    }
    result = this._decompressWorker();
    var isUnicodeString = !this._dataBinary;
    if (isUnicodeString && !askUnicodeString) {
      result = result.pipe(new Utf8EncodeWorker());
    }
    if (!isUnicodeString && askUnicodeString) {
      result = result.pipe(new Utf8DecodeWorker());
    }
  } catch (e) {
    result = new GenericWorker("error");
    result.error(e);
  }
  return new StreamHelper(result, outputType, "");
};
ZipObject.prototype.async = function async(type, onUpdate) {
  return this.internalStream(type).accumulate(onUpdate);
};
ZipObject.prototype._compressWorker = function _compressWorker(compression2, compressionOptions2) {
  if (this._data instanceof CompressedObject && this._data.compression.magic === compression2.magic) {
    return this._data.getCompressedWorker();
  } else {
    var result = this._decompressWorker();
    if (!this._dataBinary) {
      result = result.pipe(new Utf8EncodeWorker());
    }
    return CompressedObject.createWorkerFrom(result, compression2, compressionOptions2);
  }
};
ZipObject.prototype._decompressWorker = function _decompressWorker() {
  if (this._data instanceof CompressedObject) {
    return this._data.getContentWorker();
  } else if (this._data instanceof GenericWorker) {
    return this._data;
  } else {
    return new DataWorker(this._data);
  }
};
var arrayType = function() {
  var useTypedArray = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
  var resolved = useTypedArray ? "uint8array" : "array";
  arrayType = function() {
    return resolved;
  };
};
var FlateWorker = (function(GenericWorker3) {
  function FlateWorker2(action, options) {
    GenericWorker3.call(this, "FlateWorker/" + action);
    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    this.meta = {};
  }
  FlateWorker2.__proto__ = GenericWorker3;
  FlateWorker2.prototype = Object.create(GenericWorker3.prototype);
  FlateWorker2.prototype.constructor = FlateWorker2;
  FlateWorker2.prototype.processChunk = function processChunk2(chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
      this._createPako();
    }
    this._pako.push(transformTo(arrayType(), chunk.data), false);
  };
  FlateWorker2.prototype.flush = function flush2() {
    GenericWorker3.prototype.flush.call(this);
    if (this._pako === null) {
      this._createPako();
    }
    this._pako.push([], true);
  };
  FlateWorker2.prototype.cleanUp = function cleanUp2() {
    GenericWorker3.prototype.cleanUp.call(this);
    this._pako = null;
  };
  FlateWorker2.prototype._createPako = function _createPako() {
    var this$1$1 = this;
    var params = {
      raw: true,
      level: this._pakoOptions.level || -1
      // default compression
    };
    this._pako = this._pakoAction === "Deflate" ? new Deflate(params) : new Inflate(params);
    this._pako.onData = function(data) {
      this$1$1.push({
        data,
        meta: this$1$1.meta
      });
    };
  };
  return FlateWorker2;
})(GenericWorker);
var DEFLATE = {
  magic: "\b\0",
  compressWorker: function(compressionOptions2) {
    return new FlateWorker("Deflate", compressionOptions2);
  },
  uncompressWorker: function() {
    return new FlateWorker("Inflate", {});
  }
};
var STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new GenericWorker("STORE compression");
  },
  uncompressWorker: function() {
    return new GenericWorker("STORE decompression");
  }
};
var compressions = {
  STORE,
  DEFLATE
};
var LOCAL_FILE_HEADER = "PK";
var CENTRAL_FILE_HEADER = "PK";
var CENTRAL_DIRECTORY_END = "PK";
var ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
var ZIP64_CENTRAL_DIRECTORY_END = "PK";
var DATA_DESCRIPTOR = "PK\x07\b";
var decToHex = function(dec, bytes) {
  var hex = "", i;
  for (i = 0; i < bytes; i++) {
    hex += String.fromCharCode(dec & 255);
    dec = dec >>> 8;
  }
  return hex;
};
var generateUnixExternalFileAttr = function(unixPermissions2, isDir) {
  var result = unixPermissions2;
  if (!unixPermissions2) {
    result = isDir ? 16893 : 33204;
  }
  return (result & 65535) << 16;
};
var generateDosExternalFileAttr = function(dosPermissions2, isDir) {
  return (dosPermissions2 || 0) & 63;
};
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
  var file2 = streamInfo["file"], compression2 = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8encode, encodedFileName = transformTo("string", encodeFileName(file2.name)), utfEncodedFileName = transformTo("string", utf8encode(file2.name)), comment2 = file2.comment, encodedComment = transformTo("string", encodeFileName(comment2)), utfEncodedComment = transformTo("string", utf8encode(comment2)), useUTF8ForFileName = utfEncodedFileName.length !== file2.name.length, useUTF8ForComment = utfEncodedComment.length !== comment2.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir2 = file2.dir, date2 = file2.date;
  var dataInfo = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  if (!streamedContent || streamingEnded) {
    dataInfo.crc32 = streamInfo["crc32"];
    dataInfo.compressedSize = streamInfo["compressedSize"];
    dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
  }
  var bitflag = 0;
  if (streamedContent) {
    bitflag |= 8;
  }
  if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
    bitflag |= 2048;
  }
  var extFileAttr = 0;
  var versionMadeBy = 0;
  if (dir2) {
    extFileAttr |= 16;
  }
  if (platform === "UNIX") {
    versionMadeBy = 798;
    extFileAttr |= generateUnixExternalFileAttr(file2.unixPermissions, dir2);
  } else {
    versionMadeBy = 20;
    extFileAttr |= generateDosExternalFileAttr(file2.dosPermissions);
  }
  dosTime = date2.getUTCHours();
  dosTime = dosTime << 6;
  dosTime = dosTime | date2.getUTCMinutes();
  dosTime = dosTime << 5;
  dosTime = dosTime | date2.getUTCSeconds() / 2;
  dosDate = date2.getUTCFullYear() - 1980;
  dosDate = dosDate << 4;
  dosDate = dosDate | date2.getUTCMonth() + 1;
  dosDate = dosDate << 5;
  dosDate = dosDate | date2.getUTCDate();
  if (useUTF8ForFileName) {
    unicodePathExtraField = // Version
    decToHex(1, 1) + // NameCRC32
    decToHex(crc32wrapper(encodedFileName), 4) + // UnicodeName
    utfEncodedFileName;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "up" + // size
    decToHex(unicodePathExtraField.length, 2) + // content
    unicodePathExtraField;
  }
  if (useUTF8ForComment) {
    unicodeCommentExtraField = // Version
    decToHex(1, 1) + // CommentCRC32
    decToHex(crc32wrapper(encodedComment), 4) + // UnicodeName
    utfEncodedComment;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "uc" + // size
    decToHex(unicodeCommentExtraField.length, 2) + // content
    unicodeCommentExtraField;
  }
  var header = "";
  header += "\n\0";
  header += decToHex(bitflag, 2);
  header += compression2.magic;
  header += decToHex(dosTime, 2);
  header += decToHex(dosDate, 2);
  header += decToHex(dataInfo.crc32, 4);
  header += decToHex(dataInfo.compressedSize, 4);
  header += decToHex(dataInfo.uncompressedSize, 4);
  header += decToHex(encodedFileName.length, 2);
  header += decToHex(extraFields.length, 2);
  var fileRecord = LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
  var dirRecord = CENTRAL_FILE_HEADER + // version made by (00: DOS)
  decToHex(versionMadeBy, 2) + // file header (common to file and central directory)
  header + // file comment length
  decToHex(encodedComment.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  decToHex(extFileAttr, 4) + // relative offset of local header
  decToHex(offset, 4) + // file name
  encodedFileName + // extra field
  extraFields + // file comment
  encodedComment;
  return {
    fileRecord,
    dirRecord
  };
};
var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment2, encodeFileName) {
  var dirEnd = "";
  var encodedComment = transformTo("string", encodeFileName(comment2));
  dirEnd = CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  decToHex(entriesCount, 2) + // total number of entries in the central directory
  decToHex(entriesCount, 2) + // size of the central directory   4 bytes
  decToHex(centralDirLength, 4) + // offset of start of central directory with respect to the starting disk number
  decToHex(localDirLength, 4) + // .ZIP file comment length
  decToHex(encodedComment.length, 2) + // .ZIP file comment
  encodedComment;
  return dirEnd;
};
var generateDataDescriptors = function(streamInfo) {
  var descriptor = "";
  descriptor = DATA_DESCRIPTOR + // crc-32                          4 bytes
  decToHex(streamInfo["crc32"], 4) + // compressed size                 4 bytes
  decToHex(streamInfo["compressedSize"], 4) + // uncompressed size               4 bytes
  decToHex(streamInfo["uncompressedSize"], 4);
  return descriptor;
};
var ZipFileWorker = (function(GenericWorker3) {
  function ZipFileWorker2(streamFiles, comment2, platform, encodeFileName) {
    GenericWorker3.call(this, "ZipFileWorker");
    this.bytesWritten = 0;
    this.zipComment = comment2;
    this.zipPlatform = platform;
    this.encodeFileName = encodeFileName;
    this.streamFiles = streamFiles;
    this.accumulate = false;
    this.contentBuffer = [];
    this.dirRecords = [];
    this.currentSourceOffset = 0;
    this.entriesCount = 0;
    this.currentFile = null;
    this._sources = [];
  }
  ZipFileWorker2.__proto__ = GenericWorker3;
  ZipFileWorker2.prototype = Object.create(GenericWorker3.prototype);
  ZipFileWorker2.prototype.constructor = ZipFileWorker2;
  ZipFileWorker2.prototype.push = function push4(chunk) {
    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;
    if (this.accumulate) {
      this.contentBuffer.push(chunk);
    } else {
      this.bytesWritten += chunk.data.length;
      GenericWorker3.prototype.push.call(this, {
        data: chunk.data,
        meta: {
          currentFile: this.currentFile,
          percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
        }
      });
    }
  };
  ZipFileWorker2.prototype.openedSource = function openedSource(streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo["file"].name;
    var streamedContent = this.streamFiles && !streamInfo["file"].dir;
    if (streamedContent) {
      var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      this.push({
        data: record.fileRecord,
        meta: { percent: 0 }
      });
    } else {
      this.accumulate = true;
    }
  };
  ZipFileWorker2.prototype.closedSource = function closedSource(streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo["file"].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.dirRecords.push(record.dirRecord);
    if (streamedContent) {
      this.push({
        data: generateDataDescriptors(streamInfo),
        meta: { percent: 100 }
      });
    } else {
      this.push({
        data: record.fileRecord,
        meta: { percent: 0 }
      });
      while (this.contentBuffer.length) {
        this.push(this.contentBuffer.shift());
      }
    }
    this.currentFile = null;
  };
  ZipFileWorker2.prototype.flush = function flush2() {
    var localDirLength = this.bytesWritten;
    for (var i = 0; i < this.dirRecords.length; i++) {
      this.push({
        data: this.dirRecords[i],
        meta: { percent: 100 }
      });
    }
    var centralDirLength = this.bytesWritten - localDirLength;
    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
    this.push({
      data: dirEnd,
      meta: { percent: 100 }
    });
  };
  ZipFileWorker2.prototype.prepareNextSource = function prepareNextSource() {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
      this.previous.pause();
    } else {
      this.previous.resume();
    }
  };
  ZipFileWorker2.prototype.registerPrevious = function registerPrevious2(previous) {
    this._sources.push(previous);
    var self = this;
    previous.on("data", function(chunk) {
      self.processChunk(chunk);
    });
    previous.on("end", function() {
      self.closedSource(self.previous.streamInfo);
      if (self._sources.length) {
        self.prepareNextSource();
      } else {
        self.end();
      }
    });
    previous.on("error", function(e) {
      self.error(e);
    });
    return this;
  };
  ZipFileWorker2.prototype.resume = function resume3() {
    if (!GenericWorker3.prototype.resume.call(this)) {
      return false;
    }
    if (!this.previous && this._sources.length) {
      this.prepareNextSource();
      return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
      this.end();
      return true;
    }
  };
  ZipFileWorker2.prototype.error = function error2(e) {
    var sources = this._sources;
    if (!GenericWorker3.prototype.error.call(this, e)) {
      return false;
    }
    for (var i = 0; i < sources.length; i++) {
      try {
        sources[i].error(e);
      } catch (e$1) {
      }
    }
    return true;
  };
  ZipFileWorker2.prototype.lock = function lock2() {
    GenericWorker3.prototype.lock.call(this);
    var sources = this._sources;
    for (var i = 0; i < sources.length; i++) {
      sources[i].lock();
    }
  };
  return ZipFileWorker2;
})(GenericWorker);
var getCompression = function(fileCompression, zipCompression) {
  var compressionName = fileCompression || zipCompression;
  var compression2 = compressions[compressionName];
  if (!compression2) {
    throw new Error(compressionName + " is not a valid compression method !");
  }
  return compression2;
};
var generateWorker = function(zip, options, comment2) {
  var zipFileWorker = new ZipFileWorker(options.streamFiles, comment2, options.platform, options.encodeFileName);
  var entriesCount = 0;
  try {
    zip.forEach(function(relativePath, file2) {
      entriesCount++;
      var compression2 = getCompression(file2.options.compression, options.compression);
      var compressionOptions2 = file2.options.compressionOptions || options.compressionOptions || {};
      var dir2 = file2.dir, date2 = file2.date;
      file2._compressWorker(compression2, compressionOptions2).withStreamInfo("file", {
        name: relativePath,
        dir: dir2,
        date: date2,
        comment: file2.comment || "",
        unixPermissions: file2.unixPermissions,
        dosPermissions: file2.dosPermissions
      }).pipe(zipFileWorker);
    });
    zipFileWorker.entriesCount = entriesCount;
  } catch (e) {
    zipFileWorker.error(e);
  }
  return zipFileWorker;
};
var DataReader = function DataReader2(data) {
  this.data = data;
  this.length = data.length;
  this.index = 0;
  this.zero = 0;
};
DataReader.prototype.checkOffset = function checkOffset(offset) {
  this.checkIndex(this.index + offset);
};
DataReader.prototype.checkIndex = function checkIndex(newIndex) {
  if (this.length < this.zero + newIndex || newIndex < 0) {
    throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
  }
};
DataReader.prototype.setIndex = function setIndex(newIndex) {
  this.checkIndex(newIndex);
  this.index = newIndex;
};
DataReader.prototype.skip = function skip(n) {
  this.setIndex(this.index + n);
};
DataReader.prototype.byteAt = function byteAt(i) {
};
DataReader.prototype.readInt = function readInt(size) {
  var result = 0, i;
  this.checkOffset(size);
  for (i = this.index + size - 1; i >= this.index; i--) {
    result = (result << 8) + this.byteAt(i);
  }
  this.index += size;
  return result;
};
DataReader.prototype.readString = function readString(size) {
  return transformTo("string", this.readData(size));
};
DataReader.prototype.readData = function readData(size) {
};
DataReader.prototype.lastIndexOfSignature = function lastIndexOfSignature(sig) {
};
DataReader.prototype.readAndCheckSignature = function readAndCheckSignature(sig) {
};
DataReader.prototype.readDate = function readDate() {
  var dostime = this.readInt(4);
  return new Date(Date.UTC(
    (dostime >> 25 & 127) + 1980,
    // year
    (dostime >> 21 & 15) - 1,
    // month
    dostime >> 16 & 31,
    // day
    dostime >> 11 & 31,
    // hour
    dostime >> 5 & 63,
    // minute
    (dostime & 31) << 1
  ));
};
var ArrayReader = (function(DataReader3) {
  function ArrayReader2(data) {
    DataReader3.call(this, data);
    for (var i = 0; i < this.data.length; i++) {
      data[i] = data[i] & 255;
    }
  }
  ArrayReader2.__proto__ = DataReader3;
  ArrayReader2.prototype = Object.create(DataReader3.prototype);
  ArrayReader2.prototype.constructor = ArrayReader2;
  ArrayReader2.prototype.byteAt = function byteAt2(i) {
    return this.data[this.zero + i];
  };
  ArrayReader2.prototype.lastIndexOfSignature = function lastIndexOfSignature2(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
      if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
        return i - this.zero;
      }
    }
    return -1;
  };
  ArrayReader2.prototype.readAndCheckSignature = function readAndCheckSignature2(sig) {
    var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3), data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
  };
  ArrayReader2.prototype.readData = function readData2(size) {
    this.checkOffset(size);
    if (size === 0) {
      return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  return ArrayReader2;
})(DataReader);
var StringReader = (function(DataReader3) {
  function StringReader2(data) {
    DataReader3.call(this, data);
  }
  StringReader2.__proto__ = DataReader3;
  StringReader2.prototype = Object.create(DataReader3.prototype);
  StringReader2.prototype.constructor = StringReader2;
  StringReader2.prototype.byteAt = function byteAt2(i) {
    return this.data.charCodeAt(this.zero + i);
  };
  StringReader2.prototype.lastIndexOfSignature = function lastIndexOfSignature2(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
  };
  StringReader2.prototype.readAndCheckSignature = function readAndCheckSignature2(sig) {
    var data = this.readData(4);
    return sig === data;
  };
  StringReader2.prototype.readData = function readData2(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  return StringReader2;
})(DataReader);
var Uint8ArrayReader = (function(ArrayReader2) {
  function Uint8ArrayReader2(data) {
    ArrayReader2.call(this, data);
  }
  Uint8ArrayReader2.__proto__ = ArrayReader2;
  Uint8ArrayReader2.prototype = Object.create(ArrayReader2.prototype);
  Uint8ArrayReader2.prototype.constructor = Uint8ArrayReader2;
  Uint8ArrayReader2.prototype.readData = function readData2(size) {
    this.checkOffset(size);
    if (size === 0) {
      return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
  };
  return Uint8ArrayReader2;
})(ArrayReader);
function readerFor(data) {
  var type = getTypeOf(data);
  checkSupport(type);
  if (type === "string" && !support.uint8array) {
    return new StringReader(data);
  }
  if (support.uint8array) {
    return new Uint8ArrayReader(transformTo("uint8array", data));
  }
  return new ArrayReader(transformTo("array", data));
}
var MADE_BY_DOS = 0;
var MADE_BY_UNIX = 3;
var findCompression = function(compressionMethod) {
  for (var method in compressions) {
    if (!compressions.hasOwnProperty(method)) {
      continue;
    }
    if (compressions[method].magic === compressionMethod) {
      return compressions[method];
    }
  }
  return null;
};
var ZipEntry = function ZipEntry2(options, loadOptions) {
  this.options = options;
  this.loadOptions = loadOptions;
};
ZipEntry.prototype.isEncrypted = function isEncrypted() {
  return (this.bitFlag & 1) === 1;
};
ZipEntry.prototype.useUTF8 = function useUTF8() {
  return (this.bitFlag & 2048) === 2048;
};
ZipEntry.prototype.readLocalPart = function readLocalPart(reader) {
  var compression2, localExtraFieldsLength;
  reader.skip(22);
  this.fileNameLength = reader.readInt(2);
  localExtraFieldsLength = reader.readInt(2);
  this.fileName = reader.readData(this.fileNameLength);
  reader.skip(localExtraFieldsLength);
  if (this.compressedSize === -1 || this.uncompressedSize === -1) {
    throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
  }
  compression2 = findCompression(this.compressionMethod);
  if (compression2 === null) {
    throw new Error("Corrupted zip : compression " + pretty(this.compressionMethod) + " unknown (inner file : " + transformTo("string", this.fileName) + ")");
  }
  this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression2, reader.readData(this.compressedSize));
};
ZipEntry.prototype.readCentralPart = function readCentralPart(reader) {
  this.versionMadeBy = reader.readInt(2);
  reader.skip(2);
  this.bitFlag = reader.readInt(2);
  this.compressionMethod = reader.readString(2);
  this.date = reader.readDate();
  this.crc32 = reader.readInt(4);
  this.compressedSize = reader.readInt(4);
  this.uncompressedSize = reader.readInt(4);
  var fileNameLength = reader.readInt(2);
  this.extraFieldsLength = reader.readInt(2);
  this.fileCommentLength = reader.readInt(2);
  this.diskNumberStart = reader.readInt(2);
  this.internalFileAttributes = reader.readInt(2);
  this.externalFileAttributes = reader.readInt(4);
  this.localHeaderOffset = reader.readInt(4);
  if (this.isEncrypted()) {
    throw new Error("Encrypted zip are not supported");
  }
  reader.skip(fileNameLength);
  this.readExtraFields(reader);
  this.parseZIP64ExtraField(reader);
  this.fileComment = reader.readData(this.fileCommentLength);
};
ZipEntry.prototype.processAttributes = function processAttributes() {
  this.unixPermissions = null;
  this.dosPermissions = null;
  var madeBy = this.versionMadeBy >> 8;
  this.dir = this.externalFileAttributes & 16 ? true : false;
  if (madeBy === MADE_BY_DOS) {
    this.dosPermissions = this.externalFileAttributes & 63;
  }
  if (madeBy === MADE_BY_UNIX) {
    this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
  }
  if (!this.dir && this.fileNameStr.slice(-1) === "/") {
    this.dir = true;
  }
};
ZipEntry.prototype.parseZIP64ExtraField = function parseZIP64ExtraField(reader) {
  if (!this.extraFields[1]) {
    return;
  }
  var extraReader = readerFor(this.extraFields[1].value);
  if (this.uncompressedSize === MAX_VALUE_32BITS) {
    this.uncompressedSize = extraReader.readInt(8);
  }
  if (this.compressedSize === MAX_VALUE_32BITS) {
    this.compressedSize = extraReader.readInt(8);
  }
  if (this.localHeaderOffset === MAX_VALUE_32BITS) {
    this.localHeaderOffset = extraReader.readInt(8);
  }
  if (this.diskNumberStart === MAX_VALUE_32BITS) {
    this.diskNumberStart = extraReader.readInt(4);
  }
};
ZipEntry.prototype.readExtraFields = function readExtraFields(reader) {
  var end2 = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
  if (!this.extraFields) {
    this.extraFields = {};
  }
  while (reader.index < end2) {
    extraFieldId = reader.readInt(2);
    extraFieldLength = reader.readInt(2);
    extraFieldValue = reader.readData(extraFieldLength);
    this.extraFields[extraFieldId] = {
      id: extraFieldId,
      length: extraFieldLength,
      value: extraFieldValue
    };
  }
};
ZipEntry.prototype.handleUTF8 = function handleUTF8() {
  var decodeParamType = support.uint8array ? "uint8array" : "array";
  if (this.useUTF8()) {
    this.fileNameStr = utf8decode(this.fileName);
    this.fileCommentStr = utf8decode(this.fileComment);
  } else {
    var upath = this.findExtraFieldUnicodePath();
    if (upath !== null) {
      this.fileNameStr = upath;
    } else {
      var fileNameByteArray = transformTo(decodeParamType, this.fileName);
      this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
    }
    var ucomment = this.findExtraFieldUnicodeComment();
    if (ucomment !== null) {
      this.fileCommentStr = ucomment;
    } else {
      var commentByteArray = transformTo(decodeParamType, this.fileComment);
      this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
    }
  }
};
ZipEntry.prototype.findExtraFieldUnicodePath = function findExtraFieldUnicodePath() {
  var upathField = this.extraFields[28789];
  if (upathField) {
    var extraReader = readerFor(upathField.value);
    if (extraReader.readInt(1) !== 1) {
      return null;
    }
    if (crc32wrapper(this.fileName) !== extraReader.readInt(4)) {
      return null;
    }
    return utf8decode(extraReader.readData(upathField.length - 5));
  }
  return null;
};
ZipEntry.prototype.findExtraFieldUnicodeComment = function findExtraFieldUnicodeComment() {
  var ucommentField = this.extraFields[25461];
  if (ucommentField) {
    var extraReader = readerFor(ucommentField.value);
    if (extraReader.readInt(1) !== 1) {
      return null;
    }
    if (crc32wrapper(this.fileComment) !== extraReader.readInt(4)) {
      return null;
    }
    return utf8decode(extraReader.readData(ucommentField.length - 5));
  }
  return null;
};
var ZipEntries = function ZipEntries2(loadOptions) {
  this.files = [];
  this.loadOptions = loadOptions;
};
ZipEntries.prototype.checkSignature = function checkSignature(expectedSignature) {
  if (!this.reader.readAndCheckSignature(expectedSignature)) {
    this.reader.index -= 4;
    var signature = this.reader.readString(4);
    throw new Error("Corrupted zip or bug: unexpected signature (" + pretty(signature) + ", expected " + pretty(expectedSignature) + ")");
  }
};
ZipEntries.prototype.isSignature = function isSignature(askedIndex, expectedSignature) {
  var currentIndex = this.reader.index;
  this.reader.setIndex(askedIndex);
  var signature = this.reader.readString(4);
  var result = signature === expectedSignature;
  this.reader.setIndex(currentIndex);
  return result;
};
ZipEntries.prototype.readBlockEndOfCentral = function readBlockEndOfCentral() {
  this.diskNumber = this.reader.readInt(2);
  this.diskWithCentralDirStart = this.reader.readInt(2);
  this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
  this.centralDirRecords = this.reader.readInt(2);
  this.centralDirSize = this.reader.readInt(4);
  this.centralDirOffset = this.reader.readInt(4);
  this.zipCommentLength = this.reader.readInt(2);
  var zipComment = this.reader.readData(this.zipCommentLength);
  var decodeParamType = support.uint8array ? "uint8array" : "array";
  var decodeContent = transformTo(decodeParamType, zipComment);
  this.zipComment = this.loadOptions.decodeFileName(decodeContent);
};
ZipEntries.prototype.readBlockZip64EndOfCentral = function readBlockZip64EndOfCentral() {
  this.zip64EndOfCentralSize = this.reader.readInt(8);
  this.reader.skip(4);
  this.diskNumber = this.reader.readInt(4);
  this.diskWithCentralDirStart = this.reader.readInt(4);
  this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
  this.centralDirRecords = this.reader.readInt(8);
  this.centralDirSize = this.reader.readInt(8);
  this.centralDirOffset = this.reader.readInt(8);
  this.zip64ExtensibleData = {};
  var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
  while (index < extraDataSize) {
    extraFieldId = this.reader.readInt(2);
    extraFieldLength = this.reader.readInt(4);
    extraFieldValue = this.reader.readData(extraFieldLength);
    this.zip64ExtensibleData[extraFieldId] = {
      id: extraFieldId,
      length: extraFieldLength,
      value: extraFieldValue
    };
  }
};
ZipEntries.prototype.readBlockZip64EndOfCentralLocator = function readBlockZip64EndOfCentralLocator() {
  this.diskWithZip64CentralDirStart = this.reader.readInt(4);
  this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
  this.disksCount = this.reader.readInt(4);
  if (this.disksCount > 1) {
    throw new Error("Multi-volumes zip are not supported");
  }
};
ZipEntries.prototype.readLocalFiles = function readLocalFiles() {
  var i, file2;
  for (i = 0; i < this.files.length; i++) {
    file2 = this.files[i];
    this.reader.setIndex(file2.localHeaderOffset);
    this.checkSignature(LOCAL_FILE_HEADER);
    file2.readLocalPart(this.reader);
    file2.handleUTF8();
    file2.processAttributes();
  }
};
ZipEntries.prototype.readCentralDir = function readCentralDir() {
  var file2;
  this.reader.setIndex(this.centralDirOffset);
  while (this.reader.readAndCheckSignature(CENTRAL_FILE_HEADER)) {
    file2 = new ZipEntry({
      zip64: this.zip64
    }, this.loadOptions);
    file2.readCentralPart(this.reader);
    this.files.push(file2);
  }
  if (this.centralDirRecords !== this.files.length) {
    if (this.centralDirRecords !== 0 && this.files.length === 0) {
      throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
    }
  }
};
ZipEntries.prototype.readEndOfCentral = function readEndOfCentral() {
  var offset = this.reader.lastIndexOfSignature(CENTRAL_DIRECTORY_END);
  if (offset < 0) {
    var isGarbage = !this.isSignature(0, LOCAL_FILE_HEADER);
    if (isGarbage) {
      throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
    } else {
      throw new Error("Corrupted zip: can't find end of central directory");
    }
  }
  this.reader.setIndex(offset);
  var endOfCentralDirOffset = offset;
  this.checkSignature(CENTRAL_DIRECTORY_END);
  this.readBlockEndOfCentral();
  if (this.diskNumber === MAX_VALUE_16BITS || this.diskWithCentralDirStart === MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === MAX_VALUE_16BITS || this.centralDirRecords === MAX_VALUE_16BITS || this.centralDirSize === MAX_VALUE_32BITS || this.centralDirOffset === MAX_VALUE_32BITS) {
    this.zip64 = true;
    offset = this.reader.lastIndexOfSignature(ZIP64_CENTRAL_DIRECTORY_LOCATOR);
    if (offset < 0) {
      throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
    }
    this.reader.setIndex(offset);
    this.checkSignature(ZIP64_CENTRAL_DIRECTORY_LOCATOR);
    this.readBlockZip64EndOfCentralLocator();
    if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, ZIP64_CENTRAL_DIRECTORY_END)) {
      this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(ZIP64_CENTRAL_DIRECTORY_END);
      if (this.relativeOffsetEndOfZip64CentralDir < 0) {
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
      }
    }
    this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
    this.checkSignature(ZIP64_CENTRAL_DIRECTORY_END);
    this.readBlockZip64EndOfCentral();
  }
  var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
  if (this.zip64) {
    expectedEndOfCentralDirOffset += 20;
    expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
  }
  var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
  if (extraBytes > 0) {
    if (this.isSignature(endOfCentralDirOffset, CENTRAL_FILE_HEADER)) ;
    else {
      this.reader.zero = extraBytes;
    }
  } else if (extraBytes < 0) {
    throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
  }
};
ZipEntries.prototype.prepareReader = function prepareReader(data) {
  this.reader = readerFor(data);
};
ZipEntries.prototype.load = function load(data) {
  this.prepareReader(data);
  this.readEndOfCentral();
  this.readCentralDir();
  this.readLocalFiles();
};
function checkEntryCRC32(zipEntry) {
  return new external.Promise(function(resolve2, reject) {
    var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
    worker.on("error", function(e) {
      reject(e);
    }).on("end", function() {
      if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
        reject(new Error("Corrupted zip : CRC32 mismatch"));
      } else {
        resolve2();
      }
    }).resume();
  });
}
function load2(data, options) {
  var zip = this;
  options = extend(options || {}, {
    base64: false,
    checkCRC32: false,
    optimizedBinaryString: false,
    createFolders: false,
    decodeFileName: utf8decode
  });
  return prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data2) {
    var zipEntries = new ZipEntries(options);
    zipEntries.load(data2);
    return zipEntries;
  }).then(function checkCRC32(zipEntries) {
    var promises = [external.Promise.resolve(zipEntries)];
    var files = zipEntries.files;
    if (options.checkCRC32) {
      for (var i = 0; i < files.length; i++) {
        promises.push(checkEntryCRC32(files[i]));
      }
    }
    return external.Promise.all(promises);
  }).then(function addFiles(results) {
    var zipEntries = results.shift();
    var files = zipEntries.files;
    for (var i = 0; i < files.length; i++) {
      var input = files[i];
      var unsafeName = input.fileNameStr;
      var safeName = resolve(input.fileNameStr);
      zip.file(safeName, input.decompressed, {
        binary: true,
        optimizedBinaryString: true,
        date: input.date,
        dir: input.dir,
        comment: input.fileCommentStr.length ? input.fileCommentStr : null,
        unixPermissions: input.unixPermissions,
        dosPermissions: input.dosPermissions,
        createFolders: options.createFolders
      });
      if (!input.dir) {
        zip.file(safeName).unsafeOriginalName = unsafeName;
      }
    }
    if (zipEntries.zipComment.length) {
      zip.comment = zipEntries.zipComment;
    }
    return zip;
  });
}
var fileAdd = function(name, data, originalOptions) {
  var dataType = getTypeOf(data), parent;
  var o = extend(originalOptions || {}, defaults);
  o.date = o.date || /* @__PURE__ */ new Date();
  if (o.compression !== null) {
    o.compression = o.compression.toUpperCase();
  }
  if (typeof o.unixPermissions === "string") {
    o.unixPermissions = parseInt(o.unixPermissions, 8);
  }
  if (o.unixPermissions && o.unixPermissions & 16384) {
    o.dir = true;
  }
  if (o.dosPermissions && o.dosPermissions & 16) {
    o.dir = true;
  }
  if (o.dir) {
    name = forceTrailingSlash(name);
  }
  if (o.createFolders && (parent = parentFolder(name))) {
    folderAdd.call(this, parent, true);
  }
  var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
  if (!originalOptions || typeof originalOptions.binary === "undefined") {
    o.binary = !isUnicodeString;
  }
  var isCompressedEmpty = data instanceof CompressedObject && data.uncompressedSize === 0;
  if (isCompressedEmpty || o.dir || !data || data.length === 0) {
    o.base64 = false;
    o.binary = true;
    data = "";
    o.compression = "STORE";
    dataType = "string";
  }
  var zipObjectContent = null;
  if (data instanceof CompressedObject || data instanceof GenericWorker) {
    zipObjectContent = data;
  } else {
    zipObjectContent = prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
  }
  var object = new ZipObject(name, zipObjectContent, o);
  this.files[name] = object;
};
var parentFolder = function(path) {
  if (path.slice(-1) === "/") {
    path = path.substring(0, path.length - 1);
  }
  var lastSlash = path.lastIndexOf("/");
  return lastSlash > 0 ? path.substring(0, lastSlash) : "";
};
var forceTrailingSlash = function(path) {
  if (path.slice(-1) !== "/") {
    path += "/";
  }
  return path;
};
var folderAdd = function(name, createFolders$1) {
  createFolders$1 = typeof createFolders$1 !== "undefined" ? createFolders$1 : createFolders;
  name = forceTrailingSlash(name);
  if (!this.files[name]) {
    fileAdd.call(this, name, null, {
      dir: true,
      createFolders: createFolders$1
    });
  }
  return this.files[name];
};
function isRegExp(object) {
  return Object.prototype.toString.call(object) === "[object RegExp]";
}
var JSZip = function JSZip2() {
  if (arguments.length) {
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  }
  this.files = /* @__PURE__ */ Object.create(null);
  this.comment = null;
  this.root = "";
  this.clone = function() {
    var newObj = new JSZip2();
    for (var i in this) {
      if (typeof this[i] !== "function") {
        newObj[i] = this[i];
      }
    }
    return newObj;
  };
};
var staticAccessors = { support: { configurable: true }, defaults: { configurable: true }, version: { configurable: true }, external: { configurable: true } };
JSZip.prototype.load = function load3() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
JSZip.prototype.forEach = function forEach(cb) {
  var filename, relativePath, file2;
  for (filename in this.files) {
    file2 = this.files[filename];
    relativePath = filename.slice(this.root.length, filename.length);
    if (relativePath && filename.slice(0, this.root.length) === this.root) {
      cb(relativePath, file2);
    }
  }
};
JSZip.prototype.filter = function filter(search) {
  var result = [];
  this.forEach(function(relativePath, entry) {
    if (search(relativePath, entry)) {
      result.push(entry);
    }
  });
  return result;
};
JSZip.prototype.file = function file(name, data, o) {
  if (arguments.length === 1) {
    if (isRegExp(name)) {
      var regexp = name;
      return this.filter(function(relativePath, file2) {
        return !file2.dir && regexp.test(relativePath);
      });
    } else {
      var obj = this.files[this.root + name];
      if (obj && !obj.dir) {
        return obj;
      } else {
        return null;
      }
    }
  } else {
    name = this.root + name;
    fileAdd.call(this, name, data, o);
  }
  return this;
};
JSZip.prototype.folder = function folder(arg) {
  if (!arg) {
    return this;
  }
  if (isRegExp(arg)) {
    return this.filter(function(relativePath, file2) {
      return file2.dir && arg.test(relativePath);
    });
  }
  var name = this.root + arg;
  var newFolder = folderAdd.call(this, name);
  var ret = this.clone();
  ret.root = newFolder.name;
  return ret;
};
JSZip.prototype.remove = function remove(name) {
  name = this.root + name;
  var file2 = this.files[name];
  if (!file2) {
    if (name.slice(-1) !== "/") {
      name += "/";
    }
    file2 = this.files[name];
  }
  if (file2 && !file2.dir) {
    delete this.files[name];
  } else {
    var kids = this.filter(function(relativePath, file3) {
      return file3.name.slice(0, name.length) === name;
    });
    for (var i = 0; i < kids.length; i++) {
      delete this.files[kids[i].name];
    }
  }
  return this;
};
JSZip.prototype.generate = function generate(options) {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
JSZip.prototype.generateInternalStream = function generateInternalStream(options) {
  var worker, opts = {};
  try {
    opts = extend(options || {}, {
      streamFiles: false,
      compression: "STORE",
      compressionOptions: null,
      type: "",
      platform: "DOS",
      comment: null,
      mimeType: "application/zip",
      encodeFileName: utf8encode
    });
    opts.type = opts.type.toLowerCase();
    opts.compression = opts.compression.toUpperCase();
    if (opts.type === "binarystring") {
      opts.type = "string";
    }
    if (!opts.type) {
      throw new Error("No output type specified.");
    }
    checkSupport(opts.type);
    if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") {
      opts.platform = "UNIX";
    }
    if (opts.platform === "win32") {
      opts.platform = "DOS";
    }
    var comment2 = opts.comment || this.comment || "";
    worker = generateWorker(this, opts, comment2);
  } catch (e) {
    worker = new GenericWorker("error");
    worker.error(e);
  }
  return new StreamHelper(worker, opts.type || "string", opts.mimeType);
};
JSZip.prototype.generateAsync = function generateAsync(options, onUpdate) {
  return this.generateInternalStream(options).accumulate(onUpdate);
};
JSZip.prototype.loadAsync = function loadAsync(data, options) {
  return load2.apply(this, [data, options]);
};
JSZip.loadAsync = function loadAsync2(content, options) {
  return new JSZip().loadAsync(content, options);
};
staticAccessors.support.get = function() {
  return support;
};
staticAccessors.defaults.get = function() {
  return defaults;
};
staticAccessors.version.get = function() {
  return "3.2.2-esm";
};
staticAccessors.external.get = function() {
  return external;
};
Object.defineProperties(JSZip, staticAccessors);

// node_modules/@progress/kendo-ooxml/dist/es/utils/create-zip.js
function createZip() {
  return new JSZip();
}

// node_modules/@progress/kendo-ooxml/dist/es/utils/time.js
function dateToJulianDays(y, m, d) {
  return (1461 * (y + 4800 + ((m - 13) / 12 | 0)) / 4 | 0) + (367 * (m - 1 - 12 * ((m - 13) / 12 | 0)) / 12 | 0) - (3 * ((y + 4900 + ((m - 13) / 12 | 0)) / 100 | 0) / 4 | 0) + d - 32075;
}
var BASE_DATE = dateToJulianDays(1900, 0, -1);
function packDate(year, month, date2) {
  return dateToJulianDays(year, month, date2) - BASE_DATE;
}
function packTime(hh, mm, ss, ms) {
  return (hh + (mm + (ss + ms / 1e3) / 60) / 60) / 24;
}
function dateToSerial(date2) {
  const time = packTime(
    date2.getHours(),
    date2.getMinutes(),
    date2.getSeconds(),
    date2.getMilliseconds()
  );
  const serial = packDate(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );
  return serial < 0 ? serial - 1 + time : serial + time;
}

// node_modules/@progress/kendo-ooxml/dist/es/ooxml.js
var MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
var DATA_URL_PREFIX = `data:${MIME_TYPE};base64,`;
var DATA_URL_OPTIONS = { compression: "DEFLATE", type: "base64" };
var BLOB_OPTIONS = { compression: "DEFLATE", type: "blob" };
var ARRAYBUFFER_OPTIONS = { compression: "DEFLATE", type: "arraybuffer" };
function toDataURI(content) {
  return DATA_URL_PREFIX + content;
}
function indexOf(thing, array) {
  return array.indexOf(thing);
}
var parseJSON = JSON.parse.bind(JSON);
function ESC(val) {
  return String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;");
}
function repeat(count, func) {
  let str = "";
  for (let i = 0; i < count; ++i) {
    str += func(i);
  }
  return str;
}
function foreach(arr, func) {
  let str = "";
  if (arr != null) {
    if (Array.isArray(arr)) {
      for (let i = 0; i < arr.length; ++i) {
        str += func(arr[i], i);
      }
    } else if (typeof arr == "object") {
      Object.keys(arr).forEach((key, i) => {
        str += func(arr[key], key, i);
      });
    }
  }
  return str;
}
var XMLHEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r';
var RELS = `${XMLHEAD}
            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
               <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
               <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
               <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
            </Relationships>`;
var CORE = ({ creator, lastModifiedBy, created, modified }) => `${XMLHEAD}
 <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
   xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"
   xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <dc:creator>${ESC(creator)}</dc:creator>
   <cp:lastModifiedBy>${ESC(lastModifiedBy)}</cp:lastModifiedBy>
   <dcterms:created xsi:type="dcterms:W3CDTF">${ESC(created)}</dcterms:created>
   <dcterms:modified xsi:type="dcterms:W3CDTF">${ESC(modified)}</dcterms:modified>
</cp:coreProperties>`;
var APP = ({ sheets }) => `${XMLHEAD}
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Excel</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs>
    <vt:vector size="2" baseType="variant">
      <vt:variant>
        <vt:lpstr>Worksheets</vt:lpstr>
      </vt:variant>
      <vt:variant>
        <vt:i4>${sheets.length}</vt:i4>
      </vt:variant>
    </vt:vector>
  </HeadingPairs>
  <TitlesOfParts>
    <vt:vector size="${sheets.length}" baseType="lpstr">${foreach(
  sheets,
  (sheet, i) => sheet.options.title ? `<vt:lpstr>${ESC(sheet.options.title)}</vt:lpstr>` : `<vt:lpstr>Sheet${i + 1}</vt:lpstr>`
)}</vt:vector>
  </TitlesOfParts>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>14.0300</AppVersion>
</Properties>`;
var CONTENT_TYPES = ({ sheetCount, commentFiles, drawingFiles }) => `${XMLHEAD}
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="png" ContentType="image/png"/>
  <Default Extension="gif" ContentType="image/gif"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="xml" ContentType="application/xml" />
  <Default Extension="vml" ContentType="application/vnd.openxmlformats-officedocument.vmlDrawing"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
  ${repeat(sheetCount, (idx) => `<Override PartName="/xl/worksheets/sheet${idx + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />`)}
  ${foreach(commentFiles, (filename) => `<Override PartName="/xl/${filename}" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml"/>`)}
  ${foreach(drawingFiles, (filename) => `<Override PartName="/xl/drawings/${filename}" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>`)}
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml" />
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" />
</Types>`;
var WORKBOOK = ({ sheets, filterNames, userNames }) => `${XMLHEAD}
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="9303" />
  <workbookPr defaultThemeVersion="124226" />
  <bookViews>
    <workbookView xWindow="240" yWindow="45" windowWidth="18195" windowHeight="7995" />
  </bookViews>
  <sheets>
  ${foreach(sheets, ({ options }, i) => {
  const name = options.name || options.title || `Sheet${i + 1}`;
  const state = options.state || "visible";
  return `<sheet name="${ESC(name)}" state="${state}" sheetId="${i + 1}" r:id="rId${i + 1}" />`;
})}
  </sheets>
  ${filterNames.length || userNames.length ? `
    <definedNames>
      ${foreach(filterNames, (f) => `
         <definedName name="_xlnm._FilterDatabase" hidden="1" localSheetId="${f.localSheetId}">${ESC(quoteSheet(f.name))}!${ESC(f.from)}:${ESC(f.to)}</definedName>`)}
      ${foreach(userNames, (f) => `
         <definedName name="${f.name}" hidden="${f.hidden ? 1 : 0}" ${f.localSheetId != null ? `localSheetId="${f.localSheetId}"` : ""}>${ESC(f.value)}</definedName>`)}
    </definedNames>` : ""}
  <calcPr fullCalcOnLoad="1" calcId="145621" />
</workbook>`;
var WORKSHEET = ({
  frozenColumns,
  frozenRows,
  columns,
  defaults: defaults2,
  data,
  index,
  mergeCells,
  autoFilter,
  filter: filter2,
  showGridLines,
  hyperlinks,
  validations,
  defaultCellStyleId,
  rtl,
  legacyDrawing,
  drawing,
  lastRow,
  lastCol,
  hasDisabledCells
}) => `${XMLHEAD}
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">
   ${lastRow && lastCol ? `<dimension ref="A1:${ref(lastRow - 1, lastCol - 1)}" />` : ""}

   <sheetViews>
     <sheetView ${rtl ? 'rightToLeft="1"' : ""} ${index === 0 ? 'tabSelected="1"' : ""} workbookViewId="0" ${showGridLines === false ? 'showGridLines="0"' : ""}>
     ${frozenRows || frozenColumns ? `
       <pane state="frozen"
         ${frozenColumns ? `xSplit="${frozenColumns}"` : ""}
         ${frozenRows ? `ySplit="${frozenRows}"` : ""}
         topLeftCell="${String.fromCharCode(65 + (frozenColumns || 0)) + ((frozenRows || 0) + 1)}"
       />` : ""}
     </sheetView>
   </sheetViews>

   <sheetFormatPr x14ac:dyDescent="0.25" ${!defaults2.skipCustomHeight ? 'customHeight="1"' : ""} defaultRowHeight="${defaults2.rowHeight ? defaults2.rowHeight * 0.75 : 15}"
     ${defaults2.columnWidth ? `defaultColWidth="${toWidth(defaults2.columnWidth)}"` : ""} />

   ${defaultCellStyleId != null || columns && columns.length > 0 ? `
     <cols>
       ${!columns || !columns.length ? `
         <col min="1" max="16384" style="${defaultCellStyleId}"
              ${defaults2.columnWidth ? `width="${toWidth(defaults2.columnWidth)}"` : ""} /> ` : ""}
       ${foreach(columns, (column, ci) => {
  const columnIndex = typeof column.index === "number" ? column.index + 1 : ci + 1;
  if (column.width === 0) {
    return `<col ${defaultCellStyleId != null ? `style="${defaultCellStyleId}"` : ""}
                        min="${columnIndex}" max="${columnIndex}" hidden="1" customWidth="1" />`;
  }
  return `<col ${defaultCellStyleId != null ? `style="${defaultCellStyleId}"` : ""}
                      min="${columnIndex}" max="${columnIndex}" customWidth="1"
                      ${column.autoWidth ? `width="${(column.width * 7 + 5) / 7 * 256 / 256}" bestFit="1"` : `width="${toWidth(column.width)}"`} />`;
})}
     </cols>` : ""}

   <sheetData>
     ${foreach(data, (row, ri) => {
  const rowIndex = typeof row.index === "number" ? row.index + 1 : ri + 1;
  return `
         <row r="${rowIndex}" x14ac:dyDescent="0.25"
              ${row.level ? `outlineLevel="${row.level}"` : ""}
              ${row.height === 0 ? 'hidden="1"' : row.height ? `ht="${toHeight(row.height)}" customHeight="1"` : ""}>
           ${foreach(row.data, (cell) => `
             <c r="${cell.ref}" ${cell.style ? `s="${cell.style}"` : ""} ${cell.type ? `t="${cell.type}"` : ""}>
               ${cell.formula != null ? writeFormula(cell.formula) : ""}
               ${cell.value != null ? `<v>${ESC(cell.value)}</v>` : ""}
             </c>`)}
         </row>
       `;
})}
   </sheetData>

   ${hasDisabledCells ? `<sheetProtection sheet="1" objects="1" scenarios="1"/>` : ""}

   ${autoFilter ? `<autoFilter ref="${autoFilter.from}:${autoFilter.to}"/>` : filter2 ? spreadsheetFilters(filter2) : ""}

   ${mergeCells.length ? `
     <mergeCells count="${mergeCells.length}">
       ${foreach(mergeCells, (ref2) => `<mergeCell ref="${ref2}"/>`)}
     </mergeCells>` : ""}

   ${validations.length ? `
     <dataValidations>
       ${foreach(validations, (val) => `
         <dataValidation sqref="${val.sqref.join(" ")}"
                         showErrorMessage="${val.showErrorMessage}"
                         type="${ESC(val.type)}"
                         ${val.type !== "list" ? `operator="${ESC(val.operator)}"` : ""}
                         allowBlank="${val.allowBlank}"
                         showDropDown="${val.showDropDown}"
                         ${val.error ? `error="${ESC(val.error)}"` : ""}
                         ${val.errorTitle ? `errorTitle="${ESC(val.errorTitle)}"` : ""}>
           ${val.formula1 ? `<formula1>${ESC(val.formula1)}</formula1>` : ""}
           ${val.formula2 ? `<formula2>${ESC(val.formula2)}</formula2>` : ""}
         </dataValidation>`)}
     </dataValidations>` : ""}

   ${hyperlinks.length ? `
     <hyperlinks>
       ${foreach(hyperlinks, (link) => `
         <hyperlink ref="${link.ref}" r:id="${link.rId}"/>`)}
     </hyperlinks>` : ""}

   <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />
   ${drawing ? `<drawing r:id="${drawing}"/>` : ""}
   ${legacyDrawing ? `<legacyDrawing r:id="${legacyDrawing}"/>` : ""}
</worksheet>`;
var WORKBOOK_RELS = ({ count }) => `${XMLHEAD}
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${repeat(count, (idx) => `
    <Relationship Id="rId${idx + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${idx + 1}.xml" />`)}
  <Relationship Id="rId${count + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />
  <Relationship Id="rId${count + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml" />
</Relationships>`;
var WORKSHEET_RELS = ({ hyperlinks, comments, sheetIndex, drawings }) => `${XMLHEAD}
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${foreach(hyperlinks, (link) => `
    <Relationship Id="${link.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${ESC(link.target)}" TargetMode="External" />`)}
  ${!comments.length ? "" : `
    <Relationship Id="comment${sheetIndex}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" Target="../comments${sheetIndex}.xml"/>
    <Relationship Id="vml${sheetIndex}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing" Target="../drawings/vmlDrawing${sheetIndex}.vml"/>`}
  ${!drawings.length ? "" : `
    <Relationship Id="drw${sheetIndex}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing${sheetIndex}.xml"/>`}
</Relationships>`;
var COMMENTS_XML = ({ comments }) => `${XMLHEAD}
<comments xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <authors>
    <author></author>
  </authors>
  <commentList>
    ${foreach(comments, (comment2) => `
      <comment ref="${comment2.ref}" authorId="0">
        <text>
          <r>
            <rPr>
              <sz val="8"/>
              <color indexed="81"/>
              <rFont val="Tahoma"/>
              <charset val="1"/>
            </rPr>
            <t>${ESC(comment2.text)}</t>
          </r>
        </text>
      </comment>`)}
  </commentList>
</comments>`;
var LEGACY_DRAWING = ({ comments }) => `<xml xmlns:v="urn:schemas-microsoft-com:vml"
     xmlns:o="urn:schemas-microsoft-com:office:office"
     xmlns:x="urn:schemas-microsoft-com:office:excel">
  <v:shapetype coordsize="21600,21600" id="_x0000_t202" path="m,l,21600r21600,l21600,xe">
    <v:stroke joinstyle="miter"/>
    <v:path gradientshapeok="t" o:connecttype="rect"/>
  </v:shapetype>
  ${foreach(comments, (comment2) => `
    <v:shape type="#_x0000_t202" style="visibility: hidden" fillcolor="#ffffe1" o:insetmode="auto">
      <v:shadow on="t" color="black" obscured="t"/>
      <x:ClientData ObjectType="Note">
        <x:MoveWithCells/>
        <x:SizeWithCells/>
        <x:Anchor>${comment2.anchor}</x:Anchor>
        <x:AutoFill>False</x:AutoFill>
        <x:Row>${comment2.row}</x:Row>
        <x:Column>${comment2.col}</x:Column>
      </x:ClientData>
    </v:shape>`)}
</xml>`;
var DRAWINGS_XML = (drawings) => `${XMLHEAD}
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing"
          xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  ${foreach(drawings, (drawing, index) => `
    <xdr:oneCellAnchor editAs="oneCell">
      <xdr:from>
        <xdr:col>${drawing.col}</xdr:col>
        <xdr:colOff>${drawing.colOffset}</xdr:colOff>
        <xdr:row>${drawing.row}</xdr:row>
        <xdr:rowOff>${drawing.rowOffset}</xdr:rowOff>
      </xdr:from>
      <xdr:ext cx="${drawing.width}" cy="${drawing.height}" />
      <xdr:pic>
        <xdr:nvPicPr>
          <xdr:cNvPr id="${index + 1}" name="Picture ${index + 1}"/>
          <xdr:cNvPicPr/>
        </xdr:nvPicPr>
        <xdr:blipFill>
          <a:blip r:embed="${drawing.imageId}"/>
          <a:stretch>
            <a:fillRect/>
          </a:stretch>
        </xdr:blipFill>
        <xdr:spPr>
          <a:prstGeom prst="rect">
            <a:avLst/>
          </a:prstGeom>
        </xdr:spPr>
      </xdr:pic>
      <xdr:clientData/>
    </xdr:oneCellAnchor>`)}
</xdr:wsDr>`;
var DRAWINGS_RELS_XML = (rels) => `${XMLHEAD}
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${foreach(rels, (rel) => `
    <Relationship Id="${rel.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${rel.target}"/>`)}
</Relationships>`;
var SHARED_STRINGS = ({ count, uniqueCount, indexes }) => `${XMLHEAD}
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${uniqueCount}">
  ${foreach(Object.keys(indexes), (index) => `
    <si><t xml:space="preserve">${ESC(index.substring(1))}</t></si>`)}
</sst>`;
var STYLES = ({
  formats,
  fonts,
  fills,
  borders,
  styles
}) => `${XMLHEAD}
<styleSheet
    xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="x14ac"
    xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">
  <numFmts count="${formats.length}">
  ${foreach(formats, (format2, fi) => `
    <numFmt formatCode="${ESC(format2.format)}" numFmtId="${165 + fi}" />`)}
  </numFmts>
  <fonts count="${fonts.length + 1}" x14ac:knownFonts="1">
    <font>
       <sz val="11" />
       <color theme="1" />
       <name val="Calibri" />
       <family val="2" />
       <scheme val="minor" />
    </font>
    ${foreach(fonts, (font) => `
    <font>
      ${font.bold ? "<b/>" : ""}
      ${font.italic ? "<i/>" : ""}
      ${font.underline ? "<u/>" : ""}
      <sz val="${font.fontSize || 11}" />
      ${font.color ? `<color rgb="${ESC(font.color)}" />` : '<color theme="1" />'}
      ${font.fontFamily ? `
        <name val="${ESC(font.fontFamily)}" />
        <family val="2" />
      ` : `
        <name val="Calibri" />
        <family val="2" />
        <scheme val="minor" />
      `}
    </font>`)}
  </fonts>
  <fills count="${fills.length + 2}">
      <fill><patternFill patternType="none"/></fill>
      <fill><patternFill patternType="gray125"/></fill>
    ${foreach(fills, (fill) => `
      ${fill.background ? `
        <fill>
          <patternFill patternType="solid">
              <fgColor rgb="${ESC(fill.background)}"/>
          </patternFill>
        </fill>
      ` : ""}`)}
  </fills>
  <borders count="${borders.length + 1}">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    ${foreach(borders, borderTemplate)}
  </borders>
  <cellStyleXfs count="1">
    <xf borderId="0" fillId="0" fontId="0" />
  </cellStyleXfs>
  <cellXfs count="${styles.length + 1}">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />
    ${foreach(styles, (style) => `
      <xf xfId="0"
          ${style.fontId ? `fontId="${style.fontId}" applyFont="1"` : ""}
          ${style.fillId ? `fillId="${style.fillId}" applyFill="1"` : ""}
          ${style.numFmtId ? `numFmtId="${style.numFmtId}" applyNumberFormat="1"` : ""}
          ${style.textAlign || style.verticalAlign || style.wrap ? 'applyAlignment="1"' : ""}
          ${style.borderId ? `borderId="${style.borderId}" applyBorder="1"` : ""}
          ${style.disabled != null ? `applyProtection="1"` : ""}>
        ${style.textAlign || style.verticalAlign || style.wrap ? `
        <alignment
          ${style.textAlign ? `horizontal="${ESC(style.textAlign)}"` : ""}
          ${style.verticalAlign ? `vertical="${ESC(style.verticalAlign)}"` : ""}
          ${style.indent ? `indent="${ESC(style.indent)}"` : ""}
          ${style.wrap ? 'wrapText="1"' : ""} />
        ` : ""}
        ${style.disabled != null ? `
        <protection locked="${style.disabled ? 1 : 0}" />
        ` : ""}
      </xf>
    `)}
  </cellXfs>
  <cellStyles count="1">
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
  </cellStyles>
  <dxfs count="0" />
  <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleMedium9" />
</styleSheet>`;
function writeFormula(formula) {
  if (typeof formula == "string") {
    return `<f>${ESC(formula)}</f>`;
  }
  return `<f t="array" ref="${formula.ref}">${ESC(formula.src)}</f>`;
}
function numChar(colIndex) {
  const letter = Math.floor(colIndex / 26) - 1;
  return (letter >= 0 ? numChar(letter) : "") + String.fromCharCode(65 + colIndex % 26);
}
function ref(rowIndex, colIndex) {
  return numChar(colIndex) + (rowIndex + 1);
}
function $ref(rowIndex, colIndex) {
  return "$" + numChar(colIndex) + "$" + (rowIndex + 1);
}
function filterRowIndex(options) {
  const frozenRows = options.frozenRows || (options.freezePane || {}).rowSplit || 1;
  return frozenRows - 1;
}
function toWidth(px) {
  const maximumDigitWidth = 7;
  return px / maximumDigitWidth - Math.floor(128 / maximumDigitWidth) / 256;
}
function toHeight(px) {
  return px * 0.75;
}
function stripFunnyChars(value) {
  return String(value).replace(/[\x00-\x09\x0B\x0C\x0E-\x1F]/g, "").replace(/\r?\n/g, "\r\n");
}
var Worksheet = class {
  constructor(options, sharedStrings, styles, borders) {
    this.options = options;
    this._strings = sharedStrings;
    this._styles = styles;
    this._borders = borders;
    this._validations = {};
    this._comments = [];
    this._drawings = options.drawings || [];
    this._hyperlinks = (this.options.hyperlinks || []).map(
      (link, i) => Object.assign({}, link, { rId: `link${i}` })
    );
  }
  relsToXML() {
    const hyperlinks = this._hyperlinks;
    const comments = this._comments;
    const drawings = this._drawings;
    if (hyperlinks.length || comments.length || drawings.length) {
      return WORKSHEET_RELS({
        hyperlinks,
        comments,
        sheetIndex: this.options.sheetIndex,
        drawings
      });
    }
  }
  toXML(index) {
    const mergeCells = this.options.mergedCells || [];
    const rows = this.options.rows || [];
    const data = inflate2(rows, mergeCells);
    this._readCells(data);
    let autoFilter = this.options.filter;
    let filter2;
    if (autoFilter && typeof autoFilter.from === "number" && typeof autoFilter.to === "number") {
      autoFilter = {
        from: ref(filterRowIndex(this.options), autoFilter.from),
        to: ref(filterRowIndex(this.options), autoFilter.to)
      };
    } else if (autoFilter && autoFilter.ref && autoFilter.columns) {
      filter2 = autoFilter;
      autoFilter = null;
    }
    const validations = [];
    for (let i in this._validations) {
      if (Object.prototype.hasOwnProperty.call(this._validations, i)) {
        validations.push(this._validations[i]);
      }
    }
    let defaultCellStyleId = null;
    let defaultCellStyle = this.options.defaultCellStyle;
    if (this._hasDisabledCells) {
      if (!defaultCellStyle) {
        defaultCellStyle = { disabled: false };
      } else {
        defaultCellStyle = Object.assign({ disabled: false }, defaultCellStyle);
      }
    }
    if (defaultCellStyle) {
      defaultCellStyleId = this._lookupStyle(defaultCellStyle);
    }
    const freezePane = this.options.freezePane || {};
    const defaults2 = this.options.defaults || {};
    const lastRow = this.options.rows ? this._getLastRow() : 1;
    const lastCol = this.options.rows ? this._getLastCol() : 1;
    return WORKSHEET({
      frozenColumns: this.options.frozenColumns || freezePane.colSplit,
      frozenRows: this.options.frozenRows || freezePane.rowSplit,
      columns: this.options.columns,
      defaults: defaults2,
      data,
      index,
      mergeCells,
      autoFilter,
      filter: filter2,
      showGridLines: this.options.showGridLines,
      hyperlinks: this._hyperlinks,
      validations,
      defaultCellStyleId,
      rtl: this.options.rtl !== void 0 ? this.options.rtl : defaults2.rtl,
      legacyDrawing: this._comments.length ? `vml${this.options.sheetIndex}` : null,
      drawing: this._drawings.length ? `drw${this.options.sheetIndex}` : null,
      lastRow,
      lastCol,
      hasDisabledCells: this._hasDisabledCells
    });
  }
  commentsXML() {
    if (this._comments.length) {
      return COMMENTS_XML({ comments: this._comments });
    }
  }
  drawingsXML(images) {
    if (this._drawings.length) {
      let rels = {};
      let main = this._drawings.map((drw) => {
        let ref2 = parseRef(drw.topLeftCell);
        let img = rels[drw.image];
        if (!img) {
          img = rels[drw.image] = {
            rId: `img${drw.image}`,
            target: images[drw.image].target
          };
        }
        return {
          col: ref2.col,
          colOffset: pixelsToExcel(drw.offsetX),
          row: ref2.row,
          rowOffset: pixelsToExcel(drw.offsetY),
          width: pixelsToExcel(drw.width),
          height: pixelsToExcel(drw.height),
          imageId: img.rId
        };
      });
      return {
        main: DRAWINGS_XML(main),
        rels: DRAWINGS_RELS_XML(rels)
      };
    }
  }
  legacyDrawing() {
    if (this._comments.length) {
      return LEGACY_DRAWING({ comments: this._comments });
    }
  }
  _lookupString(value) {
    const key = "$" + value;
    const index = this._strings.indexes[key];
    let result;
    if (index !== void 0) {
      result = index;
    } else {
      result = this._strings.indexes[key] = this._strings.uniqueCount;
      this._strings.uniqueCount++;
    }
    this._strings.count++;
    return result;
  }
  _lookupStyle(style) {
    const json = JSON.stringify(style);
    if (json === "{}") {
      return 0;
    }
    let index = indexOf(json, this._styles);
    if (index < 0) {
      index = this._styles.push(json) - 1;
    }
    return index + 1;
  }
  _lookupBorder(border) {
    const json = JSON.stringify(border);
    if (json === "{}") {
      return;
    }
    let index = indexOf(json, this._borders);
    if (index < 0) {
      index = this._borders.push(json) - 1;
    }
    return index + 1;
  }
  _readCells(rowData) {
    for (let i = 0; i < rowData.length; i++) {
      const row = rowData[i];
      const cells = row.cells;
      row.data = [];
      for (let j = 0; j < cells.length; j++) {
        const cellData = this._cell(cells[j], row.index, j);
        if (cellData) {
          row.data.push(cellData);
        }
      }
    }
  }
  _cell(data, rowIndex, cellIndex) {
    if (!data || data === EMPTY_CELL) {
      return null;
    }
    let value = data.value;
    let border = {};
    if (data.borderLeft) {
      border.left = data.borderLeft;
    }
    if (data.borderRight) {
      border.right = data.borderRight;
    }
    if (data.borderTop) {
      border.top = data.borderTop;
    }
    if (data.borderBottom) {
      border.bottom = data.borderBottom;
    }
    if (data.dBorders) {
      border.diagonal = data.dBorders;
    }
    border = this._lookupBorder(border);
    const defStyle = this.options.defaultCellStyle || {};
    let style = { borderId: border };
    ((add) => {
      add("color");
      add("background");
      add("bold");
      add("italic");
      add("underline");
      if (!add("fontFamily")) {
        add("fontName", "fontFamily");
      }
      add("fontSize");
      add("format");
      if (!add("textAlign")) {
        add("hAlign", "textAlign");
      }
      if (!add("verticalAlign")) {
        add("vAlign", "verticalAlign");
      }
      add("wrap");
      add("indent");
      if (!add("disabled")) {
        if (add("enable")) {
          style.disabled = !style.enable;
          delete style.enable;
        }
      }
      if (style.disabled) {
        this._hasDisabledCells = true;
      }
    })((prop, target) => {
      let val = data[prop];
      if (val === void 0) {
        val = defStyle[prop];
      }
      if (val !== void 0) {
        style[target || prop] = val;
        return true;
      }
    });
    const columns = this.options.columns || [];
    const column = columns[cellIndex];
    let type = typeof value;
    if (column && column.autoWidth && (!data.colSpan || data.colSpan === 1)) {
      let displayValue = value;
      if (type === "number") {
        displayValue = intl_service_default.toString(value, data.format);
      }
      column.width = Math.max(column.width || 0, String(displayValue).length);
    }
    if (type === "string") {
      value = stripFunnyChars(value);
      value = this._lookupString(value);
      type = "s";
    } else if (type === "number") {
      type = "n";
    } else if (type === "boolean") {
      type = "b";
      value = Number(value);
    } else if (value && value.getTime) {
      type = null;
      value = dateToSerial(value);
      if (!style.format) {
        style.format = "mm-dd-yy";
      }
    } else {
      type = null;
      value = null;
    }
    style = this._lookupStyle(style);
    const cellName = ref(rowIndex, cellIndex);
    if (data.validation) {
      this._addValidation(data.validation, cellName);
    }
    if (data.comment) {
      let anchor2 = [
        cellIndex + 1,
        // start column
        15,
        // start column offset
        rowIndex,
        // start row
        10,
        // start row offset
        cellIndex + 3,
        // end column
        15,
        // end column offset
        rowIndex + 3,
        // end row
        4
        // end row offset
      ];
      this._comments.push({
        ref: cellName,
        text: data.comment,
        row: rowIndex,
        col: cellIndex,
        anchor: anchor2.join(", ")
      });
    }
    return {
      value,
      formula: data.formula,
      type,
      style,
      ref: cellName
    };
  }
  _addValidation(v, ref2) {
    const tmp = {
      showErrorMessage: v.type === "reject" ? 1 : 0,
      formula1: v.from,
      formula2: v.to,
      type: MAP_EXCEL_TYPE[v.dataType] || v.dataType,
      operator: MAP_EXCEL_OPERATOR[v.comparerType] || v.comparerType,
      allowBlank: v.allowNulls ? 1 : 0,
      showDropDown: v.showButton ? 0 : 1,
      // LOL, Excel!
      error: v.messageTemplate,
      errorTitle: v.titleTemplate
    };
    const json = JSON.stringify(tmp);
    if (!this._validations[json]) {
      this._validations[json] = tmp;
      tmp.sqref = [];
    }
    this._validations[json].sqref.push(ref2);
  }
  _getLastRow() {
    return countData(this.options.rows);
  }
  _getLastCol() {
    let last = 0;
    this.options.rows.forEach(function(row) {
      if (row.cells) {
        last = Math.max(last, countData(row.cells));
      }
    });
    return last;
  }
};
function countData(data) {
  let last = data.length;
  data.forEach(function(el) {
    if (el.index && el.index >= last) {
      last = el.index + 1;
    }
  });
  return last;
}
var MAP_EXCEL_OPERATOR = {
  // includes only what differs; key is our operator, value is Excel
  // operator.
  greaterThanOrEqualTo: "greaterThanOrEqual",
  lessThanOrEqualTo: "lessThanOrEqual"
};
var MAP_EXCEL_TYPE = {
  // eslint-disable-next-line id-denylist
  number: "decimal"
};
var defaultFormats = {
  "General": 0,
  "0": 1,
  "0.00": 2,
  "#,##0": 3,
  "#,##0.00": 4,
  "0%": 9,
  "0.00%": 10,
  "0.00E+00": 11,
  "# ?/?": 12,
  "# ??/??": 13,
  "mm-dd-yy": 14,
  "d-mmm-yy": 15,
  "d-mmm": 16,
  "mmm-yy": 17,
  "h:mm AM/PM": 18,
  "h:mm:ss AM/PM": 19,
  "h:mm": 20,
  "h:mm:ss": 21,
  "m/d/yy h:mm": 22,
  "#,##0 ;(#,##0)": 37,
  "#,##0 ;[Red](#,##0)": 38,
  "#,##0.00;(#,##0.00)": 39,
  "#,##0.00;[Red](#,##0.00)": 40,
  "mm:ss": 45,
  "[h]:mm:ss": 46,
  "mmss.0": 47,
  "##0.0E+0": 48,
  "@": 49,
  "[$-404]e/m/d": 27,
  "m/d/yy": 30,
  "t0": 59,
  "t0.00": 60,
  "t#,##0": 61,
  "t#,##0.00": 62,
  "t0%": 67,
  "t0.00%": 68,
  "t# ?/?": 69,
  "t# ??/??": 70
};
function maybeRGB(value) {
  function hex(val) {
    let x = parseInt(val, 10).toString(16);
    return x.length < 2 ? "0" + x : x;
  }
  let m = /^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+)\s*)?\)/i.exec(value.trim());
  if (m) {
    let opacity = (m[4] ? parseFloat(m[4]) : 1) * 255 | 0;
    return "#" + hex(opacity) + hex(m[1]) + hex(m[2]) + hex(m[3]);
  }
  return value;
}
function convertColor(value) {
  let color = maybeRGB(value);
  if (color.length < 6) {
    color = color.replace(/(\w)/g, function($0, $1) {
      return $1 + $1;
    });
  }
  color = color.substring(1).toUpperCase();
  if (color.length < 8) {
    color = "FF" + color;
  }
  return color;
}
var Workbook = class {
  constructor(options) {
    this.options = options || {};
    this._strings = {
      indexes: {},
      count: 0,
      uniqueCount: 0
    };
    this._styles = [];
    this._borders = [];
    this._images = this.options.images;
    this._imgId = 0;
    this._sheets = map(this.options.sheets || [], (options2, i) => {
      options2.defaults = this.options;
      options2.sheetIndex = i + 1;
      return new Worksheet(options2, this._strings, this._styles, this._borders);
    });
  }
  imageFilename(mimeType) {
    const id = ++this._imgId;
    switch (mimeType) {
      case "image/jpg":
      case "image/jpeg":
        return `image${id}.jpg`;
      case "image/png":
        return `image${id}.png`;
      case "image/gif":
        return `image${id}.gif`;
      default:
        return `image${id}.bin`;
    }
  }
  toZIP() {
    const zip = createZip();
    const docProps = zip.folder("docProps");
    docProps.file("core.xml", CORE({
      creator: this.options.creator || "Kendo UI",
      lastModifiedBy: this.options.creator || "Kendo UI",
      created: this.options.date || (/* @__PURE__ */ new Date()).toJSON(),
      modified: this.options.date || (/* @__PURE__ */ new Date()).toJSON()
    }));
    const sheetCount = this._sheets.length;
    docProps.file("app.xml", APP({ sheets: this._sheets }));
    const rels = zip.folder("_rels");
    rels.file(".rels", RELS);
    const xl = zip.folder("xl");
    const xlRels = xl.folder("_rels");
    xlRels.file("workbook.xml.rels", WORKBOOK_RELS({ count: sheetCount }));
    if (this._images) {
      const media = xl.folder("media");
      Object.keys(this._images).forEach((id) => {
        const img = this._images[id];
        const filename = this.imageFilename(img.type);
        media.file(filename, img.data);
        img.target = `../media/${filename}`;
      });
    }
    const sheetIds = {};
    xl.file("workbook.xml", WORKBOOK({
      sheets: this._sheets,
      filterNames: map(this._sheets, function(sheet, index) {
        const options = sheet.options;
        const sheetName = options.name || options.title || "Sheet" + (index + 1);
        sheetIds[sheetName.toLowerCase()] = index;
        const filter2 = options.filter;
        if (filter2) {
          if (filter2.ref) {
            let a = filter2.ref.split(":");
            let from = parseRef(a[0]);
            let to = parseRef(a[1]);
            return {
              localSheetId: index,
              name: sheetName,
              from: $ref(from.row, from.col),
              to: $ref(to.row, to.col)
            };
          } else if (typeof filter2.from !== "undefined" && typeof filter2.to !== "undefined") {
            return {
              localSheetId: index,
              name: sheetName,
              from: $ref(filterRowIndex(options), filter2.from),
              to: $ref(filterRowIndex(options), filter2.to)
            };
          }
        }
      }),
      userNames: map(this.options.names || [], function(def) {
        return {
          name: def.localName,
          localSheetId: def.sheet ? sheetIds[def.sheet.toLowerCase()] : null,
          value: def.value,
          hidden: def.hidden
        };
      })
    }));
    const worksheets = xl.folder("worksheets");
    const drawings = xl.folder("drawings");
    const drawingsRels = drawings.folder("_rels");
    const sheetRels = worksheets.folder("_rels");
    const commentFiles = [];
    const drawingFiles = [];
    let hasDisabledCells = false;
    for (let idx = 0; idx < sheetCount; idx++) {
      const sheet = this._sheets[idx];
      const sheetName = `sheet${idx + 1}.xml`;
      const sheetXML = sheet.toXML(idx);
      const relsXML = sheet.relsToXML();
      const commentsXML = sheet.commentsXML();
      const legacyDrawing = sheet.legacyDrawing();
      const drawingsXML = sheet.drawingsXML(this._images);
      if (sheet._hasDisabledCells) {
        hasDisabledCells = true;
      }
      if (relsXML) {
        sheetRels.file(sheetName + ".rels", relsXML);
      }
      if (commentsXML) {
        let name = `comments${sheet.options.sheetIndex}.xml`;
        xl.file(name, commentsXML);
        commentFiles.push(name);
      }
      if (legacyDrawing) {
        drawings.file(`vmlDrawing${sheet.options.sheetIndex}.vml`, legacyDrawing);
      }
      if (drawingsXML) {
        let name = `drawing${sheet.options.sheetIndex}.xml`;
        drawings.file(name, drawingsXML.main);
        drawingsRels.file(`${name}.rels`, drawingsXML.rels);
        drawingFiles.push(name);
      }
      worksheets.file(sheetName, sheetXML);
    }
    const borders = map(this._borders, parseJSON);
    const styles = map(this._styles, parseJSON);
    const hasFont = function(style) {
      return style.underline || style.bold || style.italic || style.color || style.fontFamily || style.fontSize;
    };
    const convertFontSize = function(value) {
      let fontInPx = Number(value);
      let fontInPt;
      if (fontInPx) {
        fontInPt = fontInPx * 3 / 4;
      }
      return fontInPt;
    };
    const fonts = map(styles, function(style) {
      if (style.fontSize) {
        style.fontSize = convertFontSize(style.fontSize);
      }
      if (style.color) {
        style.color = convertColor(style.color);
      }
      if (hasFont(style)) {
        return style;
      }
    });
    const formats = map(styles, function(style) {
      if (style.format && defaultFormats[style.format] === void 0) {
        return style;
      }
    });
    const fills = map(styles, function(style) {
      if (style.background) {
        style.background = convertColor(style.background);
        return style;
      }
    });
    xl.file("styles.xml", STYLES({
      fonts,
      fills,
      formats,
      borders,
      styles: map(styles, function(style) {
        const result = {};
        if (hasFont(style)) {
          result.fontId = indexOf(style, fonts) + 1;
        }
        if (style.background) {
          result.fillId = indexOf(style, fills) + 2;
        }
        result.textAlign = style.textAlign;
        result.indent = style.indent;
        result.verticalAlign = style.verticalAlign;
        result.wrap = style.wrap;
        result.borderId = style.borderId;
        if (style.format) {
          if (defaultFormats[style.format] !== void 0) {
            result.numFmtId = defaultFormats[style.format];
          } else {
            result.numFmtId = 165 + indexOf(style, formats);
          }
        }
        if (hasDisabledCells) {
          result.disabled = !!style.disabled;
        }
        return result;
      })
    }));
    xl.file("sharedStrings.xml", SHARED_STRINGS(this._strings));
    zip.file("[Content_Types].xml", CONTENT_TYPES({
      sheetCount,
      commentFiles,
      drawingFiles
    }));
    return zip;
  }
  toDataURL() {
    const zip = this.toZIP();
    return zip.generateAsync ? zip.generateAsync(DATA_URL_OPTIONS).then(toDataURI) : toDataURI(zip.generate(DATA_URL_OPTIONS));
  }
  toBlob() {
    const zip = this.toZIP();
    if (zip.generateAsync) {
      return zip.generateAsync(BLOB_OPTIONS);
    }
    return new Blob([zip.generate(ARRAYBUFFER_OPTIONS)], { type: MIME_TYPE });
  }
};
function borderStyle(width) {
  let alias = "thin";
  if (width === 2) {
    alias = "medium";
  } else if (width === 3) {
    alias = "thick";
  }
  return alias;
}
function borderSideTemplate(name, style) {
  let result = "";
  if (style) {
    result += "<" + name + ' style="' + borderStyle(style.size) + '">';
    if (style.color) {
      result += '<color rgb="' + convertColor(style.color) + '"/>';
    }
    result += "</" + name + ">";
  }
  return result;
}
function borderTemplate(border) {
  let diag = border.diagonal ? border.diagonal.type : 0;
  return `<border ${diag & 2 ? 'diagonalUp="true"' : ""} ${diag & 1 ? 'diagonalDown="true"' : ""}>
      ${borderSideTemplate("left", border.left)}
      ${borderSideTemplate("right", border.right)}
      ${borderSideTemplate("top", border.top)}
      ${borderSideTemplate("bottom", border.bottom)}
      ${borderSideTemplate("diagonal", border.diagonal)}
    </border>`;
}
var EMPTY_CELL = {};
function inflate2(rows, mergedCells) {
  const rowData = [];
  const rowsByIndex = [];
  indexRows(rows, function(row, index) {
    const data = {
      _source: row,
      index,
      height: row.height,
      level: row.level,
      cells: []
    };
    rowData.push(data);
    rowsByIndex[index] = data;
  });
  const sorted = sortByIndex(rowData).slice(0);
  const ctx = {
    rowData,
    rowsByIndex,
    mergedCells
  };
  for (let i = 0; i < sorted.length; i++) {
    fillCells(sorted[i], ctx);
    delete sorted[i]._source;
  }
  return sortByIndex(rowData);
}
function indexRows(rows, callback) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) {
      continue;
    }
    let index = row.index;
    if (typeof index !== "number") {
      index = i;
    }
    callback(row, index);
  }
}
function sortByIndex(items) {
  return items.sort(function(a, b) {
    return a.index - b.index;
  });
}
function pushUnique(array, el) {
  if (array.indexOf(el) < 0) {
    array.push(el);
  }
}
function getSpan(mergedCells, ref2) {
  for (let i = 0; i < mergedCells.length; ++i) {
    const range = mergedCells[i];
    const a = range.split(":");
    let topLeft = a[0];
    if (topLeft === ref2) {
      let bottomRight = a[1];
      topLeft = parseRef(topLeft);
      bottomRight = parseRef(bottomRight);
      return {
        rowSpan: bottomRight.row - topLeft.row + 1,
        colSpan: bottomRight.col - topLeft.col + 1
      };
    }
  }
}
function parseRef(ref2) {
  function getcol(str) {
    let upperStr = str.toUpperCase();
    let col = 0;
    for (let i = 0; i < upperStr.length; ++i) {
      col = col * 26 + upperStr.charCodeAt(i) - 64;
    }
    return col - 1;
  }
  function getrow(str) {
    return parseInt(str, 10) - 1;
  }
  const m = /^([a-z]+)(\d+)$/i.exec(ref2);
  return {
    row: getrow(m[2]),
    col: getcol(m[1])
  };
}
function pixelsToExcel(px) {
  return Math.round(px * 9525);
}
function fillCells(data, ctx) {
  const row = data._source;
  const rowIndex = data.index;
  const cells = row.cells;
  const cellData = data.cells;
  if (!cells) {
    return;
  }
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i] || EMPTY_CELL;
    let rowSpan = cell.rowSpan || 1;
    let colSpan = cell.colSpan || 1;
    const cellIndex = insertCell(cellData, cell);
    const topLeftRef = ref(rowIndex, cellIndex);
    if (rowSpan === 1 && colSpan === 1) {
      const tmp = getSpan(ctx.mergedCells, topLeftRef);
      if (tmp) {
        colSpan = tmp.colSpan;
        rowSpan = tmp.rowSpan;
      }
    }
    spanCell(cell, cellData, cellIndex, colSpan);
    if (rowSpan > 1 || colSpan > 1) {
      pushUnique(
        ctx.mergedCells,
        topLeftRef + ":" + ref(
          rowIndex + rowSpan - 1,
          cellIndex + colSpan - 1
        )
      );
    }
    if (rowSpan > 1) {
      for (let ri = rowIndex + 1; ri < rowIndex + rowSpan; ri++) {
        let nextRow = ctx.rowsByIndex[ri];
        if (!nextRow) {
          nextRow = ctx.rowsByIndex[ri] = { index: ri, cells: [] };
          ctx.rowData.push(nextRow);
        }
        spanCell(cell, nextRow.cells, cellIndex - 1, colSpan + 1);
      }
    }
  }
}
function insertCell(data, cell) {
  let index;
  if (typeof cell.index === "number") {
    index = cell.index;
    insertCellAt(data, cell, cell.index);
  } else {
    index = appendCell(data, cell);
  }
  return index;
}
function insertCellAt(data, cell, index) {
  data[index] = cell;
}
function appendCell(data, cell) {
  let index = data.length;
  for (let i = 0; i < data.length + 1; i++) {
    if (!data[i]) {
      data[i] = cell;
      index = i;
      break;
    }
  }
  return index;
}
function spanCell(cell, row, startIndex, colSpan) {
  for (let i = 1; i < colSpan; i++) {
    const tmp = {
      borderTop: cell.borderTop,
      borderRight: cell.borderRight,
      borderBottom: cell.borderBottom,
      borderLeft: cell.borderLeft
    };
    insertCellAt(row, tmp, startIndex + i);
  }
}
var SPREADSHEET_FILTERS = ({ ref: ref2, columns, generators }) => `
<autoFilter ref="${ref2}">
  ${foreach(columns, (col) => `
    <filterColumn colId="${col.index}">
      ${generators[col.filter](col)}
    </filterColumn>
  `)}
</autoFilter>`;
var SPREADSHEET_CUSTOM_FILTER = ({ logic, criteria }) => `
<customFilters ${logic === "and" ? 'and="1"' : ""}>
${foreach(criteria, (f) => {
  let op = spreadsheetFilters.customOperator(f);
  let val = spreadsheetFilters.customValue(f);
  return `<customFilter ${op ? `operator="${op}"` : ""} val="${val}"/>`;
})}
</customFilters>`;
var SPREADSHEET_DYNAMIC_FILTER = ({ type }) => `<dynamicFilter type="${spreadsheetFilters.dynamicFilterType(type)}" />`;
var SPREADSHEET_TOP_FILTER = ({ type, value }) => `<top10 percent="${/percent$/i.test(type) ? 1 : 0}"
       top="${/^top/i.test(type) ? 1 : 0}"
       val="${value}" />`;
var SPREADSHEET_VALUE_FILTER = ({ blanks, values }) => `<filters ${blanks ? 'blank="1"' : ""}>
    ${foreach(values, (value) => `
      <filter val="${value}" />`)}
  </filters>`;
function spreadsheetFilters(filter2) {
  return SPREADSHEET_FILTERS({
    ref: filter2.ref,
    columns: filter2.columns,
    generators: {
      custom: SPREADSHEET_CUSTOM_FILTER,
      dynamic: SPREADSHEET_DYNAMIC_FILTER,
      top: SPREADSHEET_TOP_FILTER,
      value: SPREADSHEET_VALUE_FILTER
    }
  });
}
spreadsheetFilters.customOperator = function(f) {
  return {
    eq: "equal",
    gt: "greaterThan",
    gte: "greaterThanOrEqual",
    lt: "lessThan",
    lte: "lessThanOrEqual",
    ne: "notEqual",
    // These are not in the spec, but seems to be how Excel does
    // it (see customValue below).  For the non-negated versions,
    // the operator attribute is missing completely.
    doesnotstartwith: "notEqual",
    doesnotendwith: "notEqual",
    doesnotcontain: "notEqual",
    doesnotmatch: "notEqual"
  }[f.operator.toLowerCase()];
};
function quoteSheet(name) {
  if (/^\'/.test(name)) {
    return name;
  }
  if (/^[a-z_][a-z0-9_]*$/i.test(name)) {
    return name;
  }
  return "'" + name.replace(/\x27/g, "\\'") + "'";
}
spreadsheetFilters.customValue = function(f) {
  function esc(str) {
    return str.replace(/([*?])/g, "~$1");
  }
  switch (f.operator.toLowerCase()) {
    case "startswith":
    case "doesnotstartwith":
      return esc(f.value) + "*";
    case "endswith":
    case "doesnotendwith":
      return "*" + esc(f.value);
    case "contains":
    case "doesnotcontain":
      return "*" + esc(f.value) + "*";
    default:
      return f.value;
  }
};
spreadsheetFilters.dynamicFilterType = function(type) {
  return {
    quarter1: "Q1",
    quarter2: "Q2",
    quarter3: "Q3",
    quarter4: "Q4",
    january: "M1",
    february: "M2",
    march: "M3",
    april: "M4",
    may: "M5",
    june: "M6",
    july: "M7",
    august: "M8",
    september: "M9",
    october: "M10",
    november: "M11",
    december: "M12"
  }[type.toLowerCase()] || type;
};

// node_modules/@progress/kendo-intl/dist/es/cldr/default-data.js
var defaultData = {
  en: {
    name: "en",
    identity: {
      version: {
        _unicodeVersion: "14.0.0",
        _cldrVersion: "41"
      },
      language: "en"
    },
    territory: "US",
    numbers: {
      symbols: {
        decimal: ".",
        group: ",",
        list: ";",
        percentSign: "%",
        plusSign: "+",
        minusSign: "-",
        exponential: "E",
        superscriptingExponent: "×",
        perMille: "‰",
        infinity: "∞",
        nan: "NaN",
        timeSeparator: ":",
        approximatelySign: "~"
      },
      decimal: {
        patterns: [
          "n"
        ],
        groupSize: [
          3
        ]
      },
      scientific: {
        patterns: [
          "nEn"
        ],
        groupSize: []
      },
      percent: {
        patterns: [
          "n%"
        ],
        groupSize: [
          3
        ]
      },
      currency: {
        patterns: [
          "$n"
        ],
        groupSize: [
          3
        ],
        "unitPattern-count-one": "n $",
        "unitPattern-count-other": "n $"
      },
      currencies: {
        BGN: {
          displayName: "Bulgarian Lev",
          "displayName-count-one": "Bulgarian lev",
          "displayName-count-other": "Bulgarian leva",
          symbol: "BGN"
        },
        EUR: {
          displayName: "Euro",
          "displayName-count-one": "euro",
          "displayName-count-other": "euros",
          symbol: "€",
          "symbol-alt-narrow": "€"
        },
        USD: {
          displayName: "US Dollar",
          "displayName-count-one": "US dollar",
          "displayName-count-other": "US dollars",
          symbol: "$",
          "symbol-alt-narrow": "$"
        }
      },
      localeCurrency: "USD",
      accounting: {
        patterns: [
          "$n",
          "($n)"
        ],
        groupSize: [
          3
        ]
      }
    },
    calendar: {
      gmtFormat: "GMT{0}",
      gmtZeroFormat: "GMT",
      patterns: {
        d: "M/d/y",
        D: "EEEE, MMMM d, y",
        m: "MMM d",
        M: "MMMM d",
        y: "MMM y",
        Y: "MMMM y",
        F: "EEEE, MMMM d, y h:mm:ss a",
        g: "M/d/y h:mm a",
        G: "M/d/y h:mm:ss a",
        t: "h:mm a",
        T: "h:mm:ss a",
        s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
        u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'"
      },
      dateTimeFormats: {
        full: "{1}, {0}",
        long: "{1}, {0}",
        medium: "{1}, {0}",
        short: "{1}, {0}",
        availableFormats: {
          Bh: "h B",
          Bhm: "h:mm B",
          Bhms: "h:mm:ss B",
          d: "d",
          E: "ccc",
          EBh: "E h B",
          EBhm: "E h:mm B",
          EBhms: "E h:mm:ss B",
          Ed: "d E",
          Eh: "E h a",
          Ehm: "E h:mm a",
          EHm: "E HH:mm",
          Ehms: "E h:mm:ss a",
          EHms: "E HH:mm:ss",
          Gy: "y G",
          GyM: "M/y G",
          GyMd: "M/d/y G",
          GyMEd: "E, M/d/y G",
          GyMMM: "MMM y G",
          GyMMMd: "MMM d, y G",
          GyMMMEd: "E, MMM d, y G",
          h: "h a",
          H: "HH",
          hm: "h:mm a",
          Hm: "HH:mm",
          hms: "h:mm:ss a",
          Hms: "HH:mm:ss",
          hmsv: "h:mm:ss a v",
          Hmsv: "HH:mm:ss v",
          hmv: "h:mm a v",
          Hmv: "HH:mm v",
          hv: "h a v",
          Hv: "HH'h' v",
          M: "L",
          Md: "M/d",
          MEd: "E, M/d",
          MMM: "LLL",
          MMMd: "MMM d",
          MMMEd: "E, MMM d",
          MMMMd: "MMMM d",
          "MMMMW-count-one": "'week' W 'of' MMMM",
          "MMMMW-count-other": "'week' W 'of' MMMM",
          ms: "mm:ss",
          y: "y",
          yM: "M/y",
          yMd: "M/d/y",
          yMEd: "E, M/d/y",
          yMMM: "MMM y",
          yMMMd: "MMM d, y",
          yMMMEd: "E, MMM d, y",
          yMMMM: "MMMM y",
          yQQQ: "QQQ y",
          yQQQQ: "QQQQ y",
          "yw-count-one": "'week' w 'of' Y",
          "yw-count-other": "'week' w 'of' Y"
        }
      },
      timeFormats: {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
      },
      dateFormats: {
        full: "EEEE, MMMM d, y",
        long: "MMMM d, y",
        medium: "MMM d, y",
        short: "M/d/yy"
      },
      days: {
        format: {
          abbreviated: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ],
          narrow: [
            "S",
            "M",
            "T",
            "W",
            "T",
            "F",
            "S"
          ],
          short: [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
          ],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ]
        },
        "stand-alone": {
          abbreviated: [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
          ],
          narrow: [
            "S",
            "M",
            "T",
            "W",
            "T",
            "F",
            "S"
          ],
          short: [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
          ],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ]
        }
      },
      months: {
        format: {
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          narrow: [
            "J",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D"
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ]
        },
        "stand-alone": {
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          narrow: [
            "J",
            "F",
            "M",
            "A",
            "M",
            "J",
            "J",
            "A",
            "S",
            "O",
            "N",
            "D"
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ]
        }
      },
      quarters: {
        format: {
          abbreviated: [
            "Q1",
            "Q2",
            "Q3",
            "Q4"
          ],
          narrow: [
            "1",
            "2",
            "3",
            "4"
          ],
          wide: [
            "1st quarter",
            "2nd quarter",
            "3rd quarter",
            "4th quarter"
          ]
        },
        "stand-alone": {
          abbreviated: [
            "Q1",
            "Q2",
            "Q3",
            "Q4"
          ],
          narrow: [
            "1",
            "2",
            "3",
            "4"
          ],
          wide: [
            "1st quarter",
            "2nd quarter",
            "3rd quarter",
            "4th quarter"
          ]
        }
      },
      dayPeriods: {
        format: {
          abbreviated: {
            midnight: "midnight",
            am: "AM",
            "am-alt-variant": "am",
            noon: "noon",
            pm: "PM",
            "pm-alt-variant": "pm",
            morning1: "in the morning",
            afternoon1: "in the afternoon",
            evening1: "in the evening",
            night1: "at night"
          },
          narrow: {
            midnight: "mi",
            am: "a",
            "am-alt-variant": "am",
            noon: "n",
            pm: "p",
            "pm-alt-variant": "pm",
            morning1: "in the morning",
            afternoon1: "in the afternoon",
            evening1: "in the evening",
            night1: "at night"
          },
          wide: {
            midnight: "midnight",
            am: "AM",
            "am-alt-variant": "am",
            noon: "noon",
            pm: "PM",
            "pm-alt-variant": "pm",
            morning1: "in the morning",
            afternoon1: "in the afternoon",
            evening1: "in the evening",
            night1: "at night"
          }
        },
        "stand-alone": {
          abbreviated: {
            midnight: "midnight",
            am: "AM",
            "am-alt-variant": "am",
            noon: "noon",
            pm: "PM",
            "pm-alt-variant": "pm",
            morning1: "morning",
            afternoon1: "afternoon",
            evening1: "evening",
            night1: "night"
          },
          narrow: {
            midnight: "midnight",
            am: "AM",
            "am-alt-variant": "am",
            noon: "noon",
            pm: "PM",
            "pm-alt-variant": "pm",
            morning1: "morning",
            afternoon1: "afternoon",
            evening1: "evening",
            night1: "night"
          },
          wide: {
            midnight: "midnight",
            am: "AM",
            "am-alt-variant": "am",
            noon: "noon",
            pm: "PM",
            "pm-alt-variant": "pm",
            morning1: "morning",
            afternoon1: "afternoon",
            evening1: "evening",
            night1: "night"
          }
        }
      },
      eras: {
        format: {
          wide: {
            "0": "Before Christ",
            "1": "Anno Domini",
            "0-alt-variant": "Before Common Era",
            "1-alt-variant": "Common Era"
          },
          abbreviated: {
            "0": "BC",
            "1": "AD",
            "0-alt-variant": "BCE",
            "1-alt-variant": "CE"
          },
          narrow: {
            "0": "B",
            "1": "A",
            "0-alt-variant": "BCE",
            "1-alt-variant": "CE"
          }
        }
      },
      dateFields: {
        era: {
          wide: "era",
          short: "era",
          narrow: "era"
        },
        year: {
          wide: "year",
          short: "yr.",
          narrow: "yr."
        },
        quarter: {
          wide: "quarter",
          short: "qtr.",
          narrow: "qtr."
        },
        month: {
          wide: "month",
          short: "mo.",
          narrow: "mo."
        },
        week: {
          wide: "week",
          short: "wk.",
          narrow: "wk."
        },
        weekOfMonth: {
          wide: "week of month",
          short: "wk. of mo.",
          narrow: "wk. of mo."
        },
        day: {
          wide: "day",
          short: "day",
          narrow: "day"
        },
        dayOfYear: {
          wide: "day of year",
          short: "day of yr.",
          narrow: "day of yr."
        },
        weekday: {
          wide: "day of the week",
          short: "day of wk.",
          narrow: "day of wk."
        },
        weekdayOfMonth: {
          wide: "weekday of the month",
          short: "wkday. of mo.",
          narrow: "wkday. of mo."
        },
        dayperiod: {
          short: "AM/PM",
          wide: "AM/PM",
          narrow: "AM/PM"
        },
        hour: {
          wide: "hour",
          short: "hr.",
          narrow: "hr."
        },
        minute: {
          wide: "minute",
          short: "min.",
          narrow: "min."
        },
        second: {
          wide: "second",
          short: "sec.",
          narrow: "sec."
        },
        zone: {
          wide: "time zone",
          short: "zone",
          narrow: "zone"
        },
        millisecond: {
          narrow: "ms",
          short: "ms",
          wide: "millisecond"
        }
      }
    }
  },
  supplemental: {
    likelySubtags: {
      en: "en-Latn-US"
    },
    currencyData: {
      region: {
        US: [
          {
            USD: {
              _from: "1792-01-01"
            }
          }
        ]
      }
    },
    weekData: {
      firstDay: {
        US: "sun"
      },
      weekendStart: {
        "001": "sat"
      },
      weekendEnd: {
        "001": "sun"
      }
    }
  }
};
var default_data_default = defaultData;

// node_modules/@progress/kendo-intl/dist/es/common/is-string.js
function isString(value) {
  return typeof value === "string";
}

// node_modules/@progress/kendo-intl/dist/es/error-details.js
var error_details_default = {
  "NoLocale": "Missing locale info for '{0}'",
  "NoCurrency": "Cannot determine currency information. Please load the locale currencies data.",
  "NoSupplementalCurrency": "Cannot determine currency. Please load the supplemental currencyData.",
  "NoCurrencyRegion": "No currency data for region '{0}'",
  "NoCurrencyDisplay": "Cannot determine currency display information. Please load the locale currencies data. The default culture does not include the all currencies data.",
  "NoGMTInfo": "Cannot determine locale GMT format. Please load the locale timeZoneNames data.",
  "NoWeekData": "Cannot determine locale first day of week. Please load the supplemental weekData.",
  "NoFirstDay": "Cannot determine locale first day of week. Please load the supplemental weekData. The default culture includes only the 'en-US' first day info.",
  "NoValidCurrency": "Cannot determine a default currency for the {0} locale. Please specify explicitly the currency with the format options.",
  "NoDateFieldNames": "Cannot determine the locale date field names. Please load the locale dateFields data."
};

// node_modules/@progress/kendo-intl/dist/es/errors.js
var formatRegExp = /\{(\d+)}?\}/g;
var IntlError = class {
  constructor({ name, message }) {
    if (!name || !message) {
      throw new Error("{ name: string, message: string } object is required!");
    }
    this.name = name;
    this.message = message;
  }
  formatMessage(...values) {
    const flattenValues = flatten(values);
    const formattedMessage = this.message.replace(formatRegExp, function(match, index) {
      return flattenValues[parseInt(index, 10)];
    });
    return `${this.name}: ${formattedMessage}`;
  }
  error(...values) {
    return new Error(this.formatMessage(values));
  }
};
var flatten = function(arr) {
  return arr.reduce((a, b) => a.concat(b), []);
};
var toIntlErrors = function(errors2) {
  const predicate = function(prev, name) {
    prev[name] = new IntlError({ name, message: errors2[name] });
    return prev;
  };
  return Object.keys(errors2).reduce(predicate, {});
};
var errors = toIntlErrors(error_details_default);

// node_modules/@progress/kendo-intl/dist/es/cldr/info.js
function availableLocaleInfo(fullName, suffixes) {
  const parts = fullName.split("-");
  const language = parts[0];
  const script = parts[1];
  const territory = parts[2];
  return cldr[fullName] || suffixes.indexOf(territory) !== -1 && cldr[language + "-" + territory] || suffixes.indexOf(script) !== -1 && cldr[language + "-" + script] || cldr[language];
}
function localeFullName(language, suffixes) {
  const likelySubtags = cldr.supplemental.likelySubtags;
  for (let idx = 0; idx < suffixes.length; idx++) {
    let name = likelySubtags[language + "-" + suffixes[idx]];
    if (name) {
      return name;
    }
  }
  if (likelySubtags[language]) {
    return likelySubtags[language];
  }
}
var cldr = default_data_default;
function getLocaleInfo(locale) {
  let info;
  if (isString(locale)) {
    info = localeInfo(locale);
  } else {
    info = locale;
  }
  return info;
}
function localeInfo(locale) {
  if (cldr[locale]) {
    return cldr[locale];
  }
  const likelySubtags = cldr.supplemental.likelySubtags;
  if (likelySubtags) {
    const parts = locale.split("-");
    const language = parts[0];
    const suffixes = parts.slice(1);
    const fullName = localeFullName(language, suffixes);
    const info = fullName ? availableLocaleInfo(fullName, suffixes) : null;
    if (info) {
      return info;
    }
  }
  throw errors.NoLocale.error(locale);
}

// node_modules/@progress/kendo-intl/dist/es/common/constants.js
var DECIMAL = "decimal";
var CURRENCY = "currency";
var ACCOUNTING = "accounting";
var PERCENT = "percent";
var SCIENTIFIC = "scientific";
var CURRENCY_PLACEHOLDER = "$";
var PERCENT_PLACEHOLDER = "%";
var NUMBER_PLACEHOLDER = "n";
var LIST_SEPARATOR = ";";
var GROUP_SEPARATOR = ",";
var POINT = ".";
var EMPTY = "";
var DEFAULT_LOCALE = "en";

// node_modules/@progress/kendo-intl/dist/es/cldr/load-numbers.js
var LATIN_NUMBER_FORMATS = "Formats-numberSystem-latn";
var LATIN_NUMBER_SYMBOLS = "symbols-numberSystem-latn";
var patternRegExp = /([#,0.]+)/g;
var cldrCurrencyRegExp = /¤/g;
function getPatterns(pattern) {
  patternRegExp.lastIndex = 0;
  return pattern.replace(cldrCurrencyRegExp, CURRENCY_PLACEHOLDER).replace(patternRegExp, NUMBER_PLACEHOLDER).split(LIST_SEPARATOR);
}
function getGroupSize(pattern) {
  patternRegExp.lastIndex = 0;
  const numberPatterns = patternRegExp.exec(pattern.split(LIST_SEPARATOR)[0])[0].split(POINT);
  const integer = numberPatterns[0];
  const groupSize = integer.split(GROUP_SEPARATOR).slice(1).map(function(group) {
    return group.length;
  }).reverse();
  return groupSize;
}
function loadCurrencyUnitPatterns(currencyInfo, currencyFormats) {
  for (let field in currencyFormats) {
    if (field.startsWith("unitPattern")) {
      currencyInfo[field] = currencyFormats[field].replace("{0}", NUMBER_PLACEHOLDER).replace("{1}", CURRENCY_PLACEHOLDER);
    }
  }
}
function loadNumbersInfo(locale, info) {
  const localeInfo2 = cldr[locale];
  const numbers = localeInfo2.numbers = localeInfo2.numbers || {};
  numbers.symbols = numbers.symbols || {};
  for (let field in info) {
    if (field === LATIN_NUMBER_SYMBOLS) {
      Object.assign(numbers.symbols, info[field]);
    } else if (field.includes(LATIN_NUMBER_FORMATS)) {
      const style = field.substring(0, field.indexOf(LATIN_NUMBER_FORMATS));
      const pattern = info[field].standard;
      if (pattern) {
        numbers[style] = {
          patterns: getPatterns(pattern)
        };
      }
      if (style === CURRENCY) {
        numbers[style] = numbers[style] || {};
        numbers[style].groupSize = getGroupSize((info[DECIMAL + LATIN_NUMBER_FORMATS] || info[field]).standard);
        loadCurrencyUnitPatterns(numbers[style], info[field]);
        numbers[ACCOUNTING] = {
          patterns: getPatterns(info[field][ACCOUNTING]),
          groupSize: numbers[style].groupSize
        };
      } else if (pattern) {
        numbers[style].groupSize = getGroupSize(pattern);
      }
    } else if (field === "currencies") {
      numbers.currencies = info[field];
    }
  }
}

// node_modules/@progress/kendo-intl/dist/es/cldr/load-dates.js
var predefinedDatePatterns = {
  s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
  u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'"
};
var YEAR_REGEX = /y+/g;
var SHORT_DATE = [["dateFormats", "short"]];
var ALT_ASCII_REGEX = /-alt-ascii$/;
var datePatterns = {
  D: [["dateFormats", "full"]],
  m: [["dateTimeFormats", "availableFormats", "MMMd"]],
  M: [["dateTimeFormats", "availableFormats", "MMMMd"]],
  y: [["dateTimeFormats", "availableFormats", "yMMM"]],
  Y: [["dateTimeFormats", "availableFormats", "yMMMM"]],
  F: [["dateFormats", "full"], ["timeFormats", "medium"]],
  g: [["dateTimeFormats", "availableFormats", "yMd"], ["timeFormats", "short"]],
  G: [["dateTimeFormats", "availableFormats", "yMd"], ["timeFormats", "medium"]],
  t: [["timeFormats", "short"]],
  T: [["timeFormats", "medium"]]
};
function toArray(obj) {
  let result = [];
  let names = Object.getOwnPropertyNames(obj);
  for (let idx = 0; idx < names.length; idx++) {
    let value = obj[names[idx]];
    result.push(value);
  }
  return result;
}
function getCalendarNames(info, isObj) {
  const result = {};
  for (let formatType in info) {
    let names = result[formatType] = {};
    for (let format2 in info[formatType]) {
      let formats = info[formatType][format2];
      names[format2] = isObj ? formats : toArray(formats);
    }
  }
  return result;
}
function getEraNames(eras) {
  const result = {};
  const format2 = result.format = {};
  const eraNameMap = {
    eraAbbr: "abbreviated",
    eraNames: "wide",
    eraNarrow: "narrow"
  };
  for (let eraFormatName in eras) {
    let formatName = eraNameMap[eraFormatName];
    format2[formatName] = eras[eraFormatName];
  }
  return result;
}
function loadCalendarNames(locale, calendar) {
  const localeCalendar = cldr[locale].calendar;
  localeCalendar.days = getCalendarNames(calendar.days);
  localeCalendar.months = getCalendarNames(calendar.months);
  localeCalendar.quarters = getCalendarNames(calendar.quarters);
  localeCalendar.dayPeriods = getCalendarNames(calendar.dayPeriods, true);
  localeCalendar.eras = getEraNames(calendar.eras);
}
function loadCalendarDateFields(locale, fields) {
  const localeCalendar = cldr[locale].calendar;
  const dateFields = {};
  for (let field in fields) {
    const [fieldName, formatType = "wide"] = field.split("-");
    const fieldInfo = dateFields[fieldName] || {};
    const displayName = fields[field].displayName;
    if (!displayName) {
      continue;
    }
    fieldInfo[formatType] = displayName;
    dateFields[fieldName] = fieldInfo;
  }
  localeCalendar.dateFields = dateFields;
}
function getPredefinedFormat(paths, calendar) {
  const result = [];
  for (let pathIdx = 0; pathIdx < paths.length; pathIdx++) {
    let fields = paths[pathIdx];
    let pattern = calendar;
    for (let idx = 0; idx < fields.length; idx++) {
      pattern = pattern[fields[idx]];
    }
    result.push(pattern);
  }
  return result.join(" ");
}
function filterFormats(formats) {
  const result = {};
  for (let format2 in formats) {
    if (!ALT_ASCII_REGEX.test(format2)) {
      result[format2] = formats[format2];
    }
  }
  return result;
}
function loadCalendarPatterns(locale, calendar) {
  const cldrCalendar = cldr[locale].calendar;
  const patterns = cldrCalendar.patterns = {};
  patterns.d = getPredefinedFormat(SHORT_DATE, calendar).replace(YEAR_REGEX, "y");
  for (let pattern in datePatterns) {
    patterns[pattern] = getPredefinedFormat(datePatterns[pattern], calendar);
  }
  for (let pattern in predefinedDatePatterns) {
    patterns[pattern] = predefinedDatePatterns[pattern];
  }
  const dateTimeFormats = calendar.dateTimeFormats;
  cldrCalendar.dateTimeFormats = {
    full: dateTimeFormats.full,
    long: dateTimeFormats.long,
    medium: dateTimeFormats.medium,
    short: dateTimeFormats.short,
    availableFormats: filterFormats(dateTimeFormats.availableFormats)
  };
  cldrCalendar.timeFormats = filterFormats(calendar.timeFormats);
  cldrCalendar.dateFormats = filterFormats(calendar.dateFormats);
}
function loadCalendarInfo(locale, info) {
  const calendar = cldr[locale].calendar = cldr[locale].calendar || {};
  for (let field in info) {
    if (field === "timeZoneNames") {
      calendar.gmtFormat = info[field].gmtFormat;
      calendar.gmtZeroFormat = info[field].gmtZeroFormat;
    } else if (field === "calendars" && info[field].gregorian) {
      loadCalendarPatterns(locale, info[field].gregorian);
      loadCalendarNames(locale, info[field].gregorian);
    } else if (field === "fields") {
      loadCalendarDateFields(locale, info.fields);
    }
  }
}

// node_modules/@progress/kendo-intl/dist/es/cldr/territory.js
function territoryFromName(name, identity2) {
  const likelySubtags = cldr.supplemental.likelySubtags;
  let parts = name.split("-");
  if (likelySubtags) {
    const likelyName = likelySubtags[name] || likelySubtags[parts[0]];
    if (likelyName) {
      parts = likelyName.split("-");
    }
  }
  if (identity2) {
    for (let idx = parts.length - 1; idx >= 1; idx--) {
      const part = parts[idx];
      if (part === identity2.variant || part === identity2.script) {
        parts.splice(idx, 1);
      }
    }
  }
  const length = parts.length;
  if (length > 1) {
    const territory = parts[length - 1];
    return territory.toUpperCase();
  }
}
function localeTerritory(info) {
  if (info.territory) {
    return info.territory;
  }
  const name = info.name;
  const identity2 = info.identity;
  let territory;
  if (identity2 && identity2.territory) {
    territory = identity2.territory;
  } else {
    territory = territoryFromName(name, identity2);
  }
  info.territory = territory;
  return territory;
}

// node_modules/@progress/kendo-intl/dist/es/cldr/load-units.js
var MILLISECOND = "duration-millisecond";
var UNIT_PATTERN_ONE = "unitPattern-count-one";
var UNIT_PATTERN_OTHER = "unitPattern-count-other";
var placeholderPattern = /\{0\}\s?/;
function extractUnit(unit) {
  const value = unit[UNIT_PATTERN_ONE] || unit[UNIT_PATTERN_OTHER];
  return value.replace(placeholderPattern, "");
}
function loadUnits(localeInfo2, units) {
  localeInfo2.calendar.dateFields.millisecond = {
    narrow: extractUnit(units.narrow[MILLISECOND]),
    short: extractUnit(units.short[MILLISECOND]),
    wide: extractUnit(units.long[MILLISECOND])
  };
}

// node_modules/@progress/kendo-intl/dist/es/cldr/load.js
function loadLocale(locale, info) {
  for (let field in info) {
    if (field === "numbers") {
      loadNumbersInfo(locale, info[field]);
    } else if (field === "dates") {
      loadCalendarInfo(locale, info[field]);
    }
  }
}
function load4() {
  const length = arguments.length;
  for (let idx = 0; idx < length; idx++) {
    let entry = arguments[idx];
    if (entry.main) {
      let locale = Object.keys(entry.main)[0];
      let info = entry.main[locale];
      let localeInfo2 = cldr[locale] = cldr[locale] || {};
      if (info.units) {
        loadUnits(localeInfo2, info.units);
      } else {
        localeInfo2.name = localeInfo2.name || locale;
        localeInfo2.identity = localeInfo2.identity || info.identity;
        localeTerritory(localeInfo2);
        loadLocale(locale, info);
      }
    } else if (entry.supplemental) {
      if (entry.supplemental.weekData) {
        cldr.supplemental.weekData = {
          firstDay: entry.supplemental.weekData.firstDay,
          weekendStart: entry.supplemental.weekData.weekendStart,
          weekendEnd: entry.supplemental.weekData.weekendEnd
        };
      } else if (entry.supplemental.likelySubtags) {
        cldr.supplemental.likelySubtags = Object.assign(cldr.supplemental.likelySubtags, entry.supplemental.likelySubtags);
      } else if (entry.supplemental.currencyData) {
        const currencyData = cldr.supplemental.currencyData;
        currencyData.region = Object.assign(currencyData.region || {}, entry.supplemental.currencyData.region);
        currencyData.fractions = Object.assign(currencyData.fractions || {}, entry.supplemental.currencyData.fractions);
      }
    }
  }
}

// node_modules/@progress/kendo-intl/dist/es/cldr/date-field-name.js
function dateFieldName(options, locale = DEFAULT_LOCALE) {
  const info = localeInfo(locale);
  const dateFields = info.calendar.dateFields;
  if (!dateFields) {
    throw errors.NoDateFieldNames.error();
  }
  const fieldNameInfo = dateFields[options.type] || {};
  return fieldNameInfo[options.nameType] || fieldNameInfo["wide"];
}

// node_modules/@progress/kendo-intl/dist/es/cldr/date-format-names.js
function lowerArray(arr) {
  const result = [];
  for (let idx = 0; idx < arr.length; idx++) {
    result.push(arr[idx].toLowerCase());
  }
  return result;
}
function lowerObject(obj) {
  const result = {};
  for (let field in obj) {
    result[field] = obj[field].toLowerCase();
  }
  return result;
}
function cloneLower(obj) {
  let result = Array.isArray(obj) ? lowerArray(obj) : lowerObject(obj);
  return result;
}
function dateFormatNames(locale, options) {
  const { type, nameType, standAlone, lower } = options;
  const info = getLocaleInfo(locale);
  const formatType = standAlone ? "stand-alone" : "format";
  const lowerNameType = (lower ? "lower-" : EMPTY) + nameType;
  const formatNames2 = info.calendar[type][formatType];
  let result = formatNames2[lowerNameType];
  if (!result && lower) {
    result = formatNames2[lowerNameType] = cloneLower(formatNames2[nameType]);
  }
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/cldr/parse-range-date.js
function parseRangeDate(value) {
  const parts = value.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

// node_modules/@progress/kendo-intl/dist/es/cldr/currency.js
var {
  NoCurrency,
  NoCurrencyDisplay,
  NoSupplementalCurrency,
  NoCurrencyRegion,
  NoValidCurrency
} = errors;
var DEFAULT_CURRENCY_FRACTIONS = 2;
var SYMBOL = "symbol";
var INVALID_CURRENCY_CODE = "XXX";
var GLOBAL_CURRENCIES = {
  "001": "USD",
  // 001 refers to world. not sure if it is correct to assume USD but seems better than throw an error
  "150": "EUR"
  // 150 territory for Europe
};
function getCurrencyInfo(locale, currency, throwIfNoValid) {
  const info = getLocaleInfo(locale);
  const currencies = info.numbers.currencies;
  if (!currencies) {
    if (throwIfNoValid) {
      throw NoCurrency.error();
    }
    return;
  }
  const currencyDisplayInfo = currencies[currency];
  if (!currencyDisplayInfo) {
    if (throwIfNoValid) {
      throw NoCurrencyDisplay.error();
    }
    return;
  }
  return currencyDisplayInfo;
}
function lengthComparer(a, b) {
  return b.length - a.length;
}
function regionCurrency(regionCurrencies) {
  let latestValidUntil, latestValidUntilRange;
  let latestStillValid, latestStillValidDate;
  for (let idx = 0; idx < regionCurrencies.length; idx++) {
    const currency = regionCurrencies[idx];
    const code = Object.keys(currency)[0];
    const info = currency[code];
    if (code !== INVALID_CURRENCY_CODE && info._tender !== "false" && info._from) {
      if (!info._to) {
        const stillValidDate = parseRangeDate(info._from);
        if (!latestStillValidDate || latestStillValidDate < stillValidDate) {
          latestStillValid = code;
          latestStillValidDate = stillValidDate;
        }
      } else if (!latestStillValid) {
        const validFrom = parseRangeDate(info._from);
        const validTo = parseRangeDate(info._to);
        if (!latestValidUntilRange || latestValidUntilRange.to < validTo || latestValidUntilRange.from < validFrom) {
          latestValidUntil = code;
          latestValidUntilRange = {
            from: validFrom,
            to: validTo
          };
        }
      }
    }
  }
  return latestStillValid || latestValidUntil;
}
function currencyDisplays(locale, currency, throwIfNoValid = true) {
  const currencyInfo = getCurrencyInfo(locale, currency, throwIfNoValid);
  if (!currencyInfo) {
    return;
  }
  if (!currencyInfo.displays) {
    const displays = [currency];
    for (let field in currencyInfo) {
      displays.push(currencyInfo[field]);
    }
    displays.sort(lengthComparer);
    currencyInfo.displays = displays;
  }
  return currencyInfo.displays;
}
function currencyDisplay(locale, options) {
  const { value, currency, currencyDisplay: currencyDisplay2 = SYMBOL } = options;
  if (currencyDisplay2 === "code") {
    return currency;
  }
  const currencyInfo = getCurrencyInfo(locale, currency, true);
  let result;
  if (currencyDisplay2 === SYMBOL) {
    result = currencyInfo["symbol-alt-narrow"] || currencyInfo[SYMBOL] || currency;
  } else {
    if (typeof value === "undefined" || value !== 1) {
      result = currencyInfo["displayName-count-other"];
    } else {
      result = currencyInfo["displayName-count-one"];
    }
  }
  return result;
}
function currencyFractionOptions(code) {
  let minimumFractionDigits = DEFAULT_CURRENCY_FRACTIONS;
  let maximumFractionDigits = DEFAULT_CURRENCY_FRACTIONS;
  const fractions = ((cldr.supplemental.currencyData || {}).fractions || {})[code];
  if (fractions && fractions._digits) {
    maximumFractionDigits = minimumFractionDigits = parseInt(fractions._digits, 10);
  }
  return {
    minimumFractionDigits,
    maximumFractionDigits
  };
}
function territoryCurrencyCode(territory, throwIfNoValid = true) {
  if (GLOBAL_CURRENCIES[territory]) {
    return GLOBAL_CURRENCIES[territory];
  }
  const currencyData = cldr.supplemental.currencyData;
  if (!currencyData) {
    if (throwIfNoValid) {
      throw NoSupplementalCurrency.error();
    }
    return;
  }
  const regionCurrencies = currencyData.region[territory];
  if (!regionCurrencies) {
    if (throwIfNoValid) {
      throw NoCurrencyRegion.error(territory);
    }
    return;
  }
  const currencyCode = regionCurrency(regionCurrencies);
  return currencyCode;
}
function localeCurrency(locale, throwIfNoValid) {
  const info = getLocaleInfo(locale);
  const numbers = info.numbers;
  if (!numbers.localeCurrency) {
    const currency = territoryCurrencyCode(localeTerritory(info), throwIfNoValid);
    if (!currency && throwIfNoValid) {
      throw NoValidCurrency.error(info.name);
    }
    numbers.localeCurrency = currency;
  }
  return numbers.localeCurrency;
}

// node_modules/@progress/kendo-intl/dist/es/cldr/constants.js
var DAYS_OF_WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var DEFAULT_TERRITORY = "001";

// node_modules/@progress/kendo-intl/dist/es/cldr/first-day.js
var { NoWeekData, NoFirstDay } = errors;
function firstDay(locale) {
  const info = getLocaleInfo(locale);
  if (!isNaN(info.firstDay)) {
    return info.firstDay;
  }
  const weekData = cldr.supplemental.weekData;
  if (!weekData) {
    throw NoWeekData.error();
  }
  const firstDay2 = weekData.firstDay[localeTerritory(info)] || weekData.firstDay[DEFAULT_TERRITORY];
  if (!firstDay2) {
    throw NoFirstDay.error();
  }
  info.firstDay = DAYS_OF_WEEK.indexOf(firstDay2);
  return info.firstDay;
}

// node_modules/@progress/kendo-intl/dist/es/cldr/weekend-range.js
var { NoWeekData: NoWeekData2 } = errors;
function weekendRange(locale) {
  const info = getLocaleInfo(locale);
  if (info.weekendRange) {
    return info.weekendRange;
  }
  const weekData = cldr.supplemental.weekData;
  if (!weekData) {
    throw NoWeekData2.error();
  }
  const territory = localeTerritory(info);
  const start = weekData.weekendStart[territory] || weekData.weekendStart[DEFAULT_TERRITORY];
  const end2 = weekData.weekendEnd[territory] || weekData.weekendEnd[DEFAULT_TERRITORY];
  info.weekendRange = {
    start: DAYS_OF_WEEK.indexOf(start),
    end: DAYS_OF_WEEK.indexOf(end2)
  };
  return info.weekendRange;
}

// node_modules/@progress/kendo-intl/dist/es/cldr/number-symbols.js
function numberSymbols(locale) {
  const info = getLocaleInfo(locale);
  return info.numbers.symbols;
}

// node_modules/@progress/kendo-intl/dist/es/common/is-negative-zero.js
function isNegativeZero(value) {
  return 1 / value === -Infinity;
}

// node_modules/@progress/kendo-intl/dist/es/numbers/format-currency-symbol.js
function formatCurrencySymbol(info, options = {}) {
  if (!options.currency) {
    options.currency = localeCurrency(info, true);
  }
  const display = currencyDisplay(info, options);
  return display;
}

// node_modules/@progress/kendo-intl/dist/es/numbers/group-integer.js
function groupInteger(number, start, end2, options, info) {
  const symbols = info.numbers.symbols;
  const decimalIndex = number.indexOf(symbols.decimal);
  const groupSizes = options.groupSize.slice();
  let groupSize = groupSizes.shift();
  let integerEnd = decimalIndex !== -1 ? decimalIndex : end2 + 1;
  let integer = number.substring(start, integerEnd);
  let result = number;
  const integerLength = integer.length;
  if (integerLength >= groupSize) {
    let idx = integerLength;
    let parts = [];
    while (idx > -1) {
      let value = integer.substring(idx - groupSize, idx);
      if (value) {
        parts.push(value);
      }
      idx -= groupSize;
      let newGroupSize = groupSizes.shift();
      groupSize = newGroupSize !== void 0 ? newGroupSize : groupSize;
      if (groupSize === 0) {
        value = integer.substring(0, idx);
        if (value) {
          parts.push(value);
        }
        break;
      }
    }
    integer = parts.reverse().join(symbols.group);
    result = number.substring(0, start) + integer + number.substring(integerEnd);
  }
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/numbers/is-currency-style.js
function isCurrencyStyle(style) {
  return style === CURRENCY || style === ACCOUNTING;
}

// node_modules/@progress/kendo-intl/dist/es/common/pad.js
function pad(number, digits = 2, right = false) {
  const count = digits - String(number).length;
  let result = number;
  if (count > 0) {
    const padString = new Array(count + 1).join("0");
    result = right ? number + padString : padString + number;
  }
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/common/round.js
var MAX_PRECISION = 20;
function round(value, precision) {
  let result = value;
  let decimals = precision || 0;
  result = result.toString().split("e");
  result = Math.round(Number(result[0] + "e" + (result[1] ? Number(result[1]) + decimals : decimals)));
  result = result.toString().split("e");
  result = Number(result[0] + "e" + (result[1] ? Number(result[1]) - decimals : -decimals));
  return result.toFixed(Math.min(decimals, MAX_PRECISION));
}

// node_modules/@progress/kendo-intl/dist/es/numbers/standard-number-format.js
var DEFAULT_DECIMAL_ROUNDING = 3;
var DEFAULT_PERCENT_ROUNDING = 0;
var trailingZeroRegex = /0+$/;
function fractionOptions(options) {
  let { minimumFractionDigits, maximumFractionDigits, style } = options;
  const isCurrency = isCurrencyStyle(style);
  let currencyFractions;
  if (isCurrency) {
    currencyFractions = currencyFractionOptions(options.currency);
  }
  if (minimumFractionDigits === void 0) {
    minimumFractionDigits = isCurrency ? currencyFractions.minimumFractionDigits : 0;
  }
  if (maximumFractionDigits === void 0) {
    if (style === PERCENT) {
      maximumFractionDigits = Math.max(minimumFractionDigits, DEFAULT_PERCENT_ROUNDING);
    } else if (isCurrency) {
      maximumFractionDigits = Math.max(minimumFractionDigits, currencyFractions.maximumFractionDigits);
    } else {
      maximumFractionDigits = Math.max(minimumFractionDigits, DEFAULT_DECIMAL_ROUNDING);
    }
  }
  return {
    minimumFractionDigits,
    maximumFractionDigits
  };
}
function applyPattern(value, pattern, symbol) {
  let result = EMPTY;
  for (let idx = 0, length = pattern.length; idx < length; idx++) {
    let ch = pattern.charAt(idx);
    if (ch === NUMBER_PLACEHOLDER) {
      result += value;
    } else if (ch === CURRENCY_PLACEHOLDER || ch === PERCENT_PLACEHOLDER) {
      result += symbol;
    } else {
      result += ch;
    }
  }
  return result;
}
function currencyUnitPattern(info, value) {
  const currencyInfo = info.numbers.currency;
  let pattern = value !== 1 ? currencyInfo["unitPattern-count-other"] : currencyInfo["unitPattern-count-one"];
  if (value < 0) {
    pattern = pattern.replace(NUMBER_PLACEHOLDER, `-${NUMBER_PLACEHOLDER}`);
  }
  return pattern;
}
function standardNumberFormat(number, options, info) {
  const symbols = info.numbers.symbols;
  const { style } = options;
  const isCurrency = isCurrencyStyle(style);
  if (style === SCIENTIFIC) {
    let exponential = options.minimumFractionDigits !== void 0 ? number.toExponential(options.minimumFractionDigits) : number.toExponential();
    return exponential.replace(POINT, symbols.decimal);
  }
  let value = number;
  let symbol;
  if (isCurrency) {
    options.value = value;
    symbol = formatCurrencySymbol(info, options);
  }
  if (style === PERCENT) {
    value *= 100;
    symbol = symbols.percentSign;
  }
  const { minimumFractionDigits, maximumFractionDigits } = fractionOptions(options);
  value = round(value, maximumFractionDigits);
  const negative = value < 0;
  const negativeZero = isNegativeZero(number);
  const parts = value.split(POINT);
  let integer = parts[0];
  let fraction = pad(parts[1] ? parts[1].replace(trailingZeroRegex, EMPTY) : EMPTY, minimumFractionDigits, true);
  if (negative) {
    integer = integer.substring(1);
  }
  if (options.minimumIntegerDigits) {
    integer = pad(integer, options.minimumIntegerDigits);
  }
  let formattedValue = options.useGrouping !== false ? groupInteger(integer, 0, integer.length, options, info) : integer;
  if (fraction) {
    formattedValue += symbols.decimal + fraction;
  }
  let pattern;
  if (isCurrency && options.currencyDisplay === "name") {
    pattern = currencyUnitPattern(info, number);
  } else {
    const patterns = options.patterns;
    pattern = negative || negativeZero ? patterns[1] || "-" + patterns[0] : patterns[0];
  }
  if (pattern === NUMBER_PLACEHOLDER && !negative) {
    return formattedValue;
  }
  const result = applyPattern(formattedValue, pattern, symbol);
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/numbers/utils.js
var literalRegExp = /(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g;
var PLACEHOLDER = "__??__";
function setStyleOptions(formatOptions2, info) {
  const format2 = formatOptions2.format;
  if (format2.indexOf(PERCENT_PLACEHOLDER) !== -1) {
    formatOptions2.style = PERCENT;
    formatOptions2.symbol = info.numbers.symbols.percentSign;
    formatOptions2.number *= 100;
  }
  if (format2.indexOf(CURRENCY_PLACEHOLDER) !== -1) {
    formatOptions2.style = CURRENCY;
    formatOptions2.symbol = formatCurrencySymbol(info);
  }
}
function setFormatLiterals(formatOptions2) {
  let format2 = formatOptions2.format;
  if (format2.indexOf("'") > -1 || format2.indexOf('"') > -1 || format2.indexOf("\\") > -1) {
    const literals = formatOptions2.literals = [];
    formatOptions2.format = format2.replace(literalRegExp, function(match) {
      const quoteChar = match.charAt(0).replace("\\", EMPTY);
      const literal = match.slice(1).replace(quoteChar, EMPTY);
      literals.push(literal);
      return PLACEHOLDER;
    });
  }
}
function replaceLiterals(number, literals) {
  let result = number;
  if (literals) {
    const length = literals.length;
    for (let idx = 0; idx < length; idx++) {
      result = result.replace(PLACEHOLDER, literals[idx]);
    }
  }
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/numbers/custom-number-format.js
var SHARP = "#";
var ZERO = "0";
var trailingZerosRegExp = /(\.(?:[0-9]*[1-9])?)0+$/g;
var trailingPointRegExp = /\.$/;
var commaRegExp = /,/g;
function trimTrailingZeros(value, lastZero) {
  let trimRegex;
  if (lastZero === 0) {
    trimRegex = trailingZerosRegExp;
  } else {
    trimRegex = new RegExp(`(\\.[0-9]{${lastZero}}[1-9]*)0+$`, "g");
  }
  return value.replace(trimRegex, "$1").replace(trailingPointRegExp, EMPTY);
}
function roundNumber(formatOptions2) {
  let { number, format: format2 } = formatOptions2;
  let decimalIndex = format2.indexOf(POINT);
  if (decimalIndex !== -1) {
    const zeroIndex = format2.lastIndexOf(ZERO) - decimalIndex;
    const sharpIndex = format2.lastIndexOf(SHARP) - decimalIndex;
    const hasZero = zeroIndex > -1;
    const hasSharp = sharpIndex > -1;
    let fraction = number.toString().split("e");
    if (fraction[1]) {
      fraction = round(number, Math.abs(fraction[1]));
    } else {
      fraction = fraction[0];
    }
    fraction = fraction.split(POINT)[1] || EMPTY;
    let precision = fraction.length;
    let trailingZeros = -1;
    if (!hasZero && !hasSharp) {
      formatOptions2.format = format2.substring(0, decimalIndex) + format2.substring(decimalIndex + 1);
      decimalIndex = -1;
      precision = 0;
    } else if (hasZero && zeroIndex > sharpIndex) {
      precision = zeroIndex;
    } else if (sharpIndex > zeroIndex) {
      if (hasSharp && precision > sharpIndex) {
        precision = sharpIndex;
      } else if (hasZero && precision < zeroIndex) {
        precision = zeroIndex;
      }
      trailingZeros = hasZero ? zeroIndex : 0;
    }
    if (precision > -1) {
      number = round(number, precision);
      if (trailingZeros > -1) {
        number = trimTrailingZeros(number, trailingZeros);
      }
    }
  } else {
    number = round(number);
  }
  if (formatOptions2.negative && number * -1 >= 0 && !formatOptions2.negativeZero) {
    formatOptions2.negative = false;
  }
  formatOptions2.number = number;
  formatOptions2.decimalIndex = decimalIndex;
}
function isConstantFormat(format2) {
  return format2.indexOf(SHARP) === -1 && format2.indexOf(ZERO) === -1;
}
function setValueSpecificFormat(formatOptions2) {
  let { number, format: format2 } = formatOptions2;
  format2 = format2.split(LIST_SEPARATOR);
  if ((formatOptions2.negative || formatOptions2.negativeZero) && format2[1]) {
    format2 = format2[1];
    formatOptions2.hasNegativeFormat = true;
  } else if (number === 0) {
    const zeroFormat = format2[2];
    format2 = zeroFormat || format2[0];
    if (zeroFormat && isConstantFormat(zeroFormat)) {
      formatOptions2.constant = zeroFormat;
    }
  } else {
    format2 = format2[0];
  }
  formatOptions2.format = format2;
}
function setGroupOptions(formatOptions2) {
  formatOptions2.hasGroup = formatOptions2.format.indexOf(GROUP_SEPARATOR) > -1;
  if (formatOptions2.hasGroup) {
    formatOptions2.format = formatOptions2.format.replace(commaRegExp, EMPTY);
  }
}
function placeholderIndex(index1, index2, start) {
  let index;
  if (index1 === -1 && index2 !== -1) {
    index = index2;
  } else if (index1 !== -1 && index2 === -1) {
    index = index1;
  } else {
    index = start ? Math.min(index1, index2) : Math.max(index1, index2);
  }
  return index;
}
function setPlaceholderIndices(formatOptions2) {
  const format2 = formatOptions2.format;
  let sharpIndex = format2.indexOf(SHARP);
  let zeroIndex = format2.indexOf(ZERO);
  let start = placeholderIndex(sharpIndex, zeroIndex, true);
  sharpIndex = format2.lastIndexOf(SHARP);
  zeroIndex = format2.lastIndexOf(ZERO);
  let end2 = placeholderIndex(sharpIndex, zeroIndex);
  if (start === format2.length) {
    end2 = start;
  }
  formatOptions2.start = start;
  formatOptions2.end = end2;
  formatOptions2.lastZeroIndex = zeroIndex;
}
function replaceStyleSymbols(number, style, symbol) {
  let result = number;
  if (style === CURRENCY || style === PERCENT) {
    result = EMPTY;
    for (let idx = 0, length = number.length; idx < length; idx++) {
      let ch = number.charAt(idx);
      result += ch === CURRENCY_PLACEHOLDER || ch === PERCENT_PLACEHOLDER ? symbol : ch;
    }
  }
  return result;
}
function replacePlaceHolders(formatOptions2, info) {
  const { start, end: end2, negative, negativeZero, format: format2, decimalIndex, lastZeroIndex, hasNegativeFormat, hasGroup } = formatOptions2;
  let number = formatOptions2.number;
  const value = number.toString().split(POINT);
  const length = format2.length;
  const integer = value[0];
  const fraction = value[1] || EMPTY;
  const integerLength = integer.length;
  let replacement = EMPTY;
  number = format2.substring(0, start);
  if ((negative || negativeZero) && !hasNegativeFormat) {
    number += "-";
  }
  for (let idx = start; idx < length; idx++) {
    let ch = format2.charAt(idx);
    if (decimalIndex === -1) {
      if (end2 - idx < integerLength) {
        number += integer;
        break;
      }
    } else {
      if (lastZeroIndex !== -1 && lastZeroIndex < idx) {
        replacement = EMPTY;
      }
      if (decimalIndex - idx <= integerLength && decimalIndex - idx > -1) {
        number += integer;
        idx = decimalIndex;
      }
      if (decimalIndex === idx) {
        number += (fraction ? info.numbers.symbols.decimal : EMPTY) + fraction;
        idx += end2 - decimalIndex + 1;
        continue;
      }
    }
    if (ch === ZERO) {
      number += ch;
      replacement = ch;
    } else if (ch === SHARP) {
      number += replacement;
    }
  }
  if (hasGroup) {
    number = groupInteger(number, start + (negative && !hasNegativeFormat ? 1 : 0), Math.max(end2, integerLength + start), info.numbers.decimal, info);
  }
  if (end2 >= start) {
    number += format2.substring(end2 + 1);
  }
  return number;
}
function applyCustomFormat(formatOptions2, info) {
  let number = formatOptions2.number;
  if (formatOptions2.start !== -1) {
    number = replacePlaceHolders(formatOptions2, info);
    number = replaceStyleSymbols(number, formatOptions2.style, formatOptions2.symbol);
    number = replaceLiterals(number, formatOptions2.literals);
  }
  return number;
}
function customNumberFormat(number, format2, info) {
  const formatOptions2 = {
    negative: number < 0,
    number: Math.abs(number),
    negativeZero: isNegativeZero(number),
    format: format2
  };
  setValueSpecificFormat(formatOptions2);
  if (formatOptions2.constant) {
    return formatOptions2.constant;
  }
  setFormatLiterals(formatOptions2);
  setStyleOptions(formatOptions2, info);
  setGroupOptions(formatOptions2);
  roundNumber(formatOptions2);
  setPlaceholderIndices(formatOptions2);
  return applyCustomFormat(formatOptions2, info);
}

// node_modules/@progress/kendo-intl/dist/es/numbers/format-options.js
var standardFormatRegExp = /^(n|c|p|e|a)(\d*)$/i;
function standardFormatOptions(format2) {
  const formatAndPrecision = standardFormatRegExp.exec(format2);
  if (formatAndPrecision) {
    const options = {
      style: DECIMAL
    };
    let style = formatAndPrecision[1].toLowerCase();
    if (style === "c") {
      options.style = CURRENCY;
    } else if (style === "a") {
      options.style = ACCOUNTING;
    } else if (style === "p") {
      options.style = PERCENT;
    } else if (style === "e") {
      options.style = SCIENTIFIC;
    }
    if (formatAndPrecision[2]) {
      options.minimumFractionDigits = options.maximumFractionDigits = parseInt(formatAndPrecision[2], 10);
    }
    return options;
  }
}
function formatOptions(format2) {
  let options;
  if (isString(format2)) {
    options = standardFormatOptions(format2);
  } else {
    options = format2;
  }
  return options;
}

// node_modules/@progress/kendo-intl/dist/es/numbers/format-number.js
function formatNumber(number, format2 = NUMBER_PLACEHOLDER, locale = DEFAULT_LOCALE) {
  if (number === void 0 || number === null) {
    return EMPTY;
  }
  if (!isFinite(number)) {
    return String(number);
  }
  const info = localeInfo(locale);
  const options = formatOptions(format2);
  let result;
  if (options) {
    const style = options.style || DECIMAL;
    result = standardNumberFormat(number, Object.assign({}, info.numbers[style], options), info);
  } else {
    result = customNumberFormat(number, format2, info);
  }
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/common/is-number.js
function isNumber(value) {
  return typeof value === "number";
}

// node_modules/@progress/kendo-intl/dist/es/numbers/parse-number.js
var exponentRegExp = /[eE][-+]?[0-9]+/;
var nonBreakingSpaceRegExp = /\u00A0/g;
function cleanNegativePattern(number, patterns) {
  if (patterns.length > 1) {
    const parts = (patterns[1] || EMPTY).replace(CURRENCY_PLACEHOLDER, EMPTY).split(NUMBER_PLACEHOLDER);
    if (number.indexOf(parts[0]) > -1 && number.indexOf(parts[1]) > -1) {
      return number.replace(parts[0], EMPTY).replace(parts[1], EMPTY);
    }
  }
}
function cleanCurrencyNumber(value, info, format2) {
  const options = formatOptions(format2) || {};
  let isCurrency = isCurrencyStyle(options.style);
  let number = value;
  let negative;
  const currency = options.currency || localeCurrency(info, isCurrency);
  if (currency) {
    const displays = currencyDisplays(info, currency, isCurrency);
    if (displays) {
      for (let idx = 0; idx < displays.length; idx++) {
        let display = displays[idx];
        if (number.includes(display)) {
          number = number.replace(display, EMPTY);
          isCurrency = true;
          break;
        }
      }
    }
    if (isCurrency) {
      const cleanNumber = cleanNegativePattern(number, info.numbers.currency.patterns) || cleanNegativePattern(number, info.numbers.accounting.patterns);
      if (cleanNumber) {
        negative = true;
        number = cleanNumber;
      }
    }
  }
  return {
    number,
    negative
  };
}
function cleanLiterals(number, formatOptions2) {
  const literals = formatOptions2.literals;
  let result = number;
  if (literals) {
    for (let idx = 0; idx < literals.length; idx++) {
      result = result.replace(literals[idx], EMPTY);
    }
  }
  return result;
}
function divideBy100(number) {
  const strNumber = String(number);
  const pointIndex = strNumber.indexOf(POINT);
  const zeroesCount = 2;
  let result = number / Math.pow(10, zeroesCount);
  if (pointIndex === -1 || String(result).length <= strNumber.length + zeroesCount) {
    return result;
  }
  const fractionDigits = strNumber.length - pointIndex + 1 + zeroesCount;
  return parseFloat(result.toFixed(fractionDigits));
}
function parseNumber(value, locale = DEFAULT_LOCALE, format2 = {}) {
  if (!value && value !== 0) {
    return null;
  }
  if (isNumber(value)) {
    return value;
  }
  const info = localeInfo(locale);
  const symbols = info.numbers.symbols;
  let number = value.toString();
  let formatOptions2 = format2 || {};
  let isPercent;
  if (isString(format2)) {
    formatOptions2 = { format: format2 };
    setFormatLiterals(formatOptions2);
    number = cleanLiterals(number, formatOptions2);
    setStyleOptions(formatOptions2, info);
  }
  if (formatOptions2.style === PERCENT || number.indexOf(symbols.percentSign) > -1) {
    number = number.replace(symbols.percentSign, EMPTY);
    isPercent = true;
  }
  if (exponentRegExp.test(number)) {
    number = parseFloat(number.replace(symbols.decimal, POINT));
    return isNaN(number) ? null : number;
  }
  const { negative: negativeCurrency, number: currencyNumber } = cleanCurrencyNumber(number, info, formatOptions2);
  number = String(currencyNumber).trim();
  const negativeSignIndex = number.indexOf("-");
  if (negativeSignIndex > 0) {
    return null;
  }
  let isNegative = negativeSignIndex > -1;
  isNegative = negativeCurrency !== void 0 ? negativeCurrency : isNegative;
  number = number.replace("-", EMPTY).replace(nonBreakingSpaceRegExp, " ").split(symbols.group.replace(nonBreakingSpaceRegExp, " ")).join(EMPTY).replace(symbols.decimal, POINT);
  number = parseFloat(number);
  if (isNaN(number)) {
    number = null;
  } else if (isNegative) {
    number *= -1;
  }
  if (number && isPercent) {
    number = divideBy100(number);
  }
  return number;
}

// node_modules/@progress/kendo-intl/dist/es/common/format-string.js
var formatRegExp2 = /\{(\d+)}/g;
function formatString(format2) {
  const values = arguments;
  return format2.replace(formatRegExp2, (match, index) => {
    const value = values[parseInt(index, 10) + 1];
    return value;
  });
}

// node_modules/@progress/kendo-intl/dist/es/dates/date-pattern.js
var REMOVAL_PENALTY = 120;
var ADDITION_PENALTY = 20;
var LENGHT_DELTA = [2, 1, 5, 3, 4];
var LONG_LESS_PENALTY_DELTA = -2;
var SHORT_LESS_PENALTY_DELTA = -1;
var SHORT_MORE_PENALTY_DELTA = 1;
var LONG_MORE_PENALTY_DELTA = 2;
var PENALTIES = {
  [LONG_LESS_PENALTY_DELTA.toString()]: 8,
  [SHORT_LESS_PENALTY_DELTA.toString()]: 6,
  [LONG_MORE_PENALTY_DELTA.toString()]: 6,
  [SHORT_MORE_PENALTY_DELTA.toString()]: 3
};
var VALUE_FORMAT_LENGTH = {
  numeric: 1,
  "2-digit": 2,
  short: 3,
  long: 4,
  narrow: 5
};
var TIME_SPECIFIERS_REGEX = /[hHmsSzZoOvVxX]/;
function getHourSpecifier(options) {
  return options.hour12 ? "h" : "H";
}
var DATE_OPTIONS_MAP = [{
  key: "era",
  specifier: "G"
}, {
  key: "year",
  specifier: "y"
}, {
  key: "month",
  specifier: "M"
}, {
  key: "day",
  specifier: "d"
}, {
  key: "weekday",
  specifier: "E"
}, {
  key: "hour",
  getSpecifier: getHourSpecifier
}, {
  key: "minute",
  specifier: "m"
}, {
  key: "second",
  specifier: "s"
}, {
  key: "timeZoneName",
  specifier: "z"
}];
var STAND_ALONE_SPECIFIERS = {
  e: "c",
  E: "c",
  M: "L",
  Q: "q"
};
var specifiersRegex = {};
var resolvedFormats = {};
function getSpecifierRegex(specifier) {
  if (!specifiersRegex[specifier]) {
    specifiersRegex[specifier] = new RegExp(specifier + "+");
  }
  return specifiersRegex[specifier];
}
function skeletonSpecifiers(skeleton) {
  const result = [];
  let current3 = skeleton.charAt(0);
  let specifier = current3;
  for (let idx = 1; idx < skeleton.length; idx++) {
    let character = skeleton.charAt(idx);
    if (character === specifier) {
      current3 += character;
    } else {
      result.push(current3);
      current3 = specifier = character;
    }
  }
  result.push(current3);
  return result;
}
function findBestMatch(specifiers, availableFormats) {
  const specifiersLength = specifiers.length;
  let maxScore = -Number.MAX_VALUE;
  let bestMatches, result;
  for (let format2 in availableFormats) {
    const matches = [];
    let currentFormat = format2.replace("v", "z");
    let score = 0;
    for (let idx = 0; idx < specifiersLength; idx++) {
      const specifier = specifiers[idx];
      let specifierRegex = getSpecifierRegex(specifier[0]);
      let match = (specifierRegex.exec(currentFormat) || [])[0];
      if (!match) {
        score -= REMOVAL_PENALTY;
      } else {
        currentFormat = currentFormat.replace(match, EMPTY);
        if (match.length !== specifier.length) {
          let delta = Math.max(Math.min(LENGHT_DELTA[match.length] - LENGHT_DELTA[specifier.length], 2), -2);
          score -= PENALTIES[delta];
        }
      }
      matches.push(match);
      if (score < maxScore) {
        break;
      }
    }
    if (currentFormat.length) {
      score -= skeletonSpecifiers(currentFormat).length * ADDITION_PENALTY;
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatches = matches;
      result = availableFormats[format2];
    }
  }
  result = result.replace("v", "z");
  for (let idx = 0; idx < specifiersLength; idx++) {
    const bestMatch = bestMatches[idx];
    if (bestMatch && bestMatch !== specifiers[idx]) {
      const matchSpecifier = bestMatches[idx][0];
      result = result.replace(getSpecifierRegex(matchSpecifier), specifiers[idx]);
      if (STAND_ALONE_SPECIFIERS[matchSpecifier]) {
        result = result.replace(getSpecifierRegex(STAND_ALONE_SPECIFIERS[matchSpecifier]), specifiers[idx]);
      }
    }
  }
  return result;
}
function cacheFormat(skeleton, format2, locale) {
  if (!resolvedFormats[locale]) {
    resolvedFormats[locale] = {};
  }
  resolvedFormats[locale][skeleton] = format2;
}
function skeletonFormat(skeleton, info) {
  const availableFormats = info.calendar.dateTimeFormats.availableFormats;
  if (availableFormats[skeleton]) {
    return availableFormats[skeleton];
  }
  if (resolvedFormats[info.name] && resolvedFormats[info.name][skeleton]) {
    return resolvedFormats[info.name][skeleton];
  }
  const timeStartIndex = skeleton.search(TIME_SPECIFIERS_REGEX);
  let result;
  if (timeStartIndex > 0) {
    const dateSkeleton = skeleton.substr(0, timeStartIndex);
    const timeSkeleton = skeleton.substr(timeStartIndex);
    result = formatString(
      info.calendar.dateTimeFormats.short,
      //should be deterimed based on specifiers
      availableFormats[timeSkeleton] || findBestMatch(skeletonSpecifiers(timeSkeleton), availableFormats),
      availableFormats[dateSkeleton] || findBestMatch(skeletonSpecifiers(dateSkeleton), availableFormats)
    );
  } else {
    result = findBestMatch(skeletonSpecifiers(skeleton), availableFormats);
  }
  cacheFormat(skeleton, result, info.name);
  return result;
}
function skeletonFromOptions(options) {
  let result = [];
  for (let idx = 0; idx < DATE_OPTIONS_MAP.length; idx++) {
    let option = DATE_OPTIONS_MAP[idx];
    let field = option.key;
    let value = options[field];
    if (value) {
      let spcifier = option.specifier || option.getSpecifier(options);
      result.push(spcifier.repeat(VALUE_FORMAT_LENGTH[value]));
    }
  }
  return result.join(EMPTY);
}
function datePattern(format2, info) {
  const calendar = info.calendar;
  let result;
  if (isString(format2)) {
    if (calendar.patterns[format2]) {
      result = calendar.patterns[format2];
    } else {
      result = format2;
    }
  } else if (format2) {
    if (format2.pattern) {
      return format2.pattern;
    }
    let skeleton = format2.skeleton;
    if (!skeleton) {
      if (format2.datetime) {
        result = formatString(calendar.dateTimeFormats[format2.datetime], calendar.timeFormats[format2.datetime], calendar.dateFormats[format2.datetime]);
      } else if (format2.date) {
        result = calendar.dateFormats[format2.date];
      } else if (format2.time) {
        result = calendar.timeFormats[format2.time];
      } else {
        skeleton = skeletonFromOptions(format2);
      }
    }
    if (skeleton) {
      result = skeletonFormat(skeleton, info);
    }
  }
  if (!result) {
    result = calendar.patterns.d;
  }
  return result;
}

// node_modules/@progress/kendo-intl/dist/es/dates/date-name-type.js
function dateNameType(formatLength) {
  let nameType;
  if (formatLength <= 3) {
    nameType = "abbreviated";
  } else if (formatLength === 4) {
    nameType = "wide";
  } else if (formatLength === 5) {
    nameType = "narrow";
  } else if (formatLength === 6) {
    nameType = "short";
  }
  return nameType;
}

// node_modules/@progress/kendo-intl/dist/es/dates/format-names.js
function formatNames(locale, type, formatLength, standAlone, lower) {
  return dateFormatNames(locale, {
    type,
    nameType: dateNameType(formatLength),
    standAlone,
    lower
  });
}

// node_modules/@progress/kendo-intl/dist/es/common/is-date.js
function isFunction(fun) {
  return typeof fun === "function";
}
function isDate(value) {
  return Boolean(value) && isFunction(value.getTime) && isFunction(value.getMonth);
}

// node_modules/@progress/kendo-intl/dist/es/dates/constants.js
var MONTH = "month";
var HOUR = "hour";
var ZONE = "zone";
var WEEKDAY = "weekday";
var QUARTER = "quarter";
var DATE_FIELD_MAP = {
  "G": "era",
  "y": "year",
  "q": QUARTER,
  "Q": QUARTER,
  "M": MONTH,
  "L": MONTH,
  "d": "day",
  "E": WEEKDAY,
  "c": WEEKDAY,
  "e": WEEKDAY,
  "h": HOUR,
  "H": HOUR,
  "k": HOUR,
  "K": HOUR,
  "m": "minute",
  "s": "second",
  "S": "millisecond",
  "a": "dayperiod",
  "x": ZONE,
  "X": ZONE,
  "z": ZONE,
  "Z": ZONE
};
var dateFormatRegExp = /d{1,2}|E{1,6}|e{1,6}|c{3,6}|c{1}|M{1,5}|L{1,5}|y{1,4}|H{1,2}|h{1,2}|k{1,2}|K{1,2}|m{1,2}|a{1,5}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|x{1,5}|X{1,5}|G{1,5}|q{1,5}|Q{1,5}|"[^"]*"|'[^']*'/g;

// node_modules/@progress/kendo-intl/dist/es/dates/format-date.js
function formatDayOfWeekIndex(day, formatLength, localeInfo2) {
  const firstDayIndex = firstDay(localeInfo2);
  let dayIndex;
  if (day < firstDayIndex) {
    dayIndex = 7 - firstDayIndex + day;
  } else {
    dayIndex = day - firstDayIndex;
  }
  return dayIndex + 1;
}
function formatMonth(month, formatLength, info, standAlone) {
  if (formatLength <= 2) {
    return pad(month + 1, formatLength);
  }
  return formatNames(info, "months", formatLength, standAlone)[month];
}
function formatQuarter(date2, formatLength, info, standAlone) {
  const quarter = Math.floor(date2.getMonth() / 3);
  if (formatLength < 3) {
    return quarter + 1;
  }
  return formatNames(info, "quarters", formatLength, standAlone)[quarter];
}
function formatTimeZone(date2, info, options) {
  const { shortHours, optionalMinutes, separator, localizedName, zZeroOffset } = options;
  const offset = date2.getTimezoneOffset() / 60;
  if (offset === 0 && zZeroOffset) {
    return "Z";
  }
  const sign = offset <= 0 ? "+" : "-";
  const hoursMinutes = Math.abs(offset).toString().split(".");
  const minutes = hoursMinutes[1] || 0;
  let result = sign + (shortHours ? hoursMinutes[0] : pad(hoursMinutes[0], 2));
  if (minutes || !optionalMinutes) {
    result += (separator ? ":" : EMPTY) + pad(minutes, 2);
  }
  if (localizedName) {
    const localizedFormat = offset === 0 ? info.calendar.gmtZeroFormat : info.calendar.gmtFormat;
    result = formatString(localizedFormat, result);
  }
  return result;
}
function formatDayOfWeek(date2, formatLength, info, standAlone) {
  let result;
  if (formatLength < 3) {
    result = formatDayOfWeekIndex(date2.getDay(), formatLength, info);
  } else {
    result = formatNames(info, "days", formatLength, standAlone)[date2.getDay()];
  }
  return result;
}
var formatters = {};
formatters.d = function(date2, formatLength) {
  return pad(date2.getDate(), formatLength);
};
formatters.E = function(date2, formatLength, info) {
  return formatNames(info, "days", formatLength)[date2.getDay()];
};
formatters.M = function(date2, formatLength, info) {
  return formatMonth(date2.getMonth(), formatLength, info, false);
};
formatters.L = function(date2, formatLength, info) {
  return formatMonth(date2.getMonth(), formatLength, info, true);
};
formatters.y = function(date2, formatLength) {
  let year = date2.getFullYear();
  if (formatLength === 2) {
    year = year % 100;
  }
  return pad(year, formatLength);
};
formatters.h = function(date2, formatLength) {
  const hours = date2.getHours() % 12 || 12;
  return pad(hours, formatLength);
};
formatters.H = function(date2, formatLength) {
  return pad(date2.getHours(), formatLength);
};
formatters.k = function(date2, formatLength) {
  return pad(date2.getHours() || 24, formatLength);
};
formatters.K = function(date2, formatLength) {
  return pad(date2.getHours() % 12, formatLength);
};
formatters.m = function(date2, formatLength) {
  return pad(date2.getMinutes(), formatLength);
};
formatters.s = function(date2, formatLength) {
  return pad(date2.getSeconds(), formatLength);
};
formatters.S = function(date2, formatLength) {
  const milliseconds = date2.getMilliseconds();
  let result;
  if (milliseconds !== 0) {
    result = pad(String(milliseconds / 1e3).split(".")[1].substr(0, formatLength), formatLength, true);
  } else {
    result = pad(EMPTY, formatLength);
  }
  return result;
};
formatters.a = function(date2, formatLength, info) {
  return formatNames(info, "dayPeriods", formatLength)[date2.getHours() < 12 ? "am" : "pm"];
};
formatters.z = function(date2, formatLength, info) {
  return formatTimeZone(date2, info, {
    shortHours: formatLength < 4,
    optionalMinutes: formatLength < 4,
    separator: true,
    localizedName: true
  });
};
formatters.Z = function(date2, formatLength, info) {
  return formatTimeZone(date2, info, {
    separator: formatLength > 3,
    localizedName: formatLength === 4,
    zZeroOffset: formatLength === 5
  });
};
formatters.x = function(date2, formatLength, info) {
  return formatTimeZone(date2, info, {
    optionalMinutes: formatLength === 1,
    separator: formatLength === 3 || formatLength === 5
  });
};
formatters.X = function(date2, formatLength, info) {
  return formatTimeZone(date2, info, {
    optionalMinutes: formatLength === 1,
    separator: formatLength === 3 || formatLength === 5,
    zZeroOffset: true
  });
};
formatters.G = function(date2, formatLength, info) {
  let era = date2.getFullYear() >= 0 ? 1 : 0;
  return formatNames(info, "eras", formatLength)[era];
};
formatters.e = formatDayOfWeek;
formatters.c = function(date2, formatLength, info) {
  return formatDayOfWeek(date2, formatLength, info, true);
};
formatters.q = function(date2, formatLength, info) {
  return formatQuarter(date2, formatLength, info, true);
};
formatters.Q = formatQuarter;
function formatDate(date2, format2, locale = DEFAULT_LOCALE) {
  if (!isDate(date2)) {
    if (date2 === void 0 || date2 === null) {
      return EMPTY;
    }
    return date2;
  }
  const info = localeInfo(locale);
  const pattern = datePattern(format2, info);
  return pattern.replace(dateFormatRegExp, function(match) {
    let formatLength = match.length;
    let result;
    if (match.includes("'") || match.includes('"')) {
      result = match.slice(1, formatLength - 1);
    } else {
      result = formatters[match[0]](date2, formatLength, info);
    }
    return result;
  });
}

// node_modules/@progress/kendo-intl/dist/es/dates/time-utils.js
function convertTimeZone(date2, fromOffset, toOffset) {
  const fromLocalOffset = date2.getTimezoneOffset();
  const offsetDate = new Date(date2.getTime() + (fromOffset - toOffset) * 6e4);
  const toLocalOffset = offsetDate.getTimezoneOffset();
  return new Date(offsetDate.getTime() + (toLocalOffset - fromLocalOffset) * 6e4);
}
function adjustDST(date2, hours) {
  if (!hours && date2.getHours() === 23) {
    date2.setHours(date2.getHours() + 2);
  }
}

// node_modules/@progress/kendo-intl/dist/es/dates/parse-date.js
var timeZoneOffsetRegExp = /([+|-]\d{1,2})(:?)(\d{2})?/;
var dateRegExp = /^\/Date\((.*?)\)\/$/;
var offsetRegExp = /[+-]\d*/;
var numberRegExp = {
  2: /^\d{1,2}/,
  3: /^\d{1,3}/,
  4: /^\d{4}/
};
var numberRegex = /\d+/;
var PLACEHOLDER2 = "{0}";
var leadingSpacesRegex = /^ */;
var trailingSpacesRegex = / *$/;
var standardDateFormats = [
  "yyyy/MM/dd HH:mm:ss",
  "yyyy/MM/dd HH:mm",
  "yyyy/MM/dd",
  "E MMM dd yyyy HH:mm:ss",
  "yyyy-MM-ddTHH:mm:ss.SSSSSSSXXX",
  "yyyy-MM-ddTHH:mm:ss.SSSXXX",
  "yyyy-MM-ddTHH:mm:ss.SSXXX",
  "yyyy-MM-ddTHH:mm:ssXXX",
  "yyyy-MM-ddTHH:mm:ss.SSSSSSS",
  "yyyy-MM-ddTHH:mm:ss.SSS",
  "yyyy-MM-ddTHH:mmXXX",
  "yyyy-MM-ddTHH:mmX",
  "yyyy-MM-ddTHH:mm:ss",
  "yyyy-MM-ddTHH:mm",
  "yyyy-MM-dd HH:mm:ss",
  "yyyy-MM-dd HH:mm",
  "yyyy-MM-dd",
  "HH:mm:ss",
  "HH:mm"
];
var FORMATS_SEQUENCE = ["G", "g", "F", "Y", "y", "M", "m", "D", "d", "y", "T", "t"];
var TWO_DIGIT_YEAR_MAX = 2029;
function outOfRange(value, start, end2) {
  return !(value >= start && value <= end2);
}
function lookAhead(match, state) {
  let { format: format2, idx } = state;
  let i = 0;
  while (format2[idx] === match) {
    i++;
    idx++;
  }
  if (i > 0) {
    idx -= 1;
  }
  state.idx = idx;
  return i;
}
function getNumber(size, state) {
  let regex = size ? numberRegExp[size] || new RegExp("^\\d{1," + size + "}") : numberRegex, match = state.value.substr(state.valueIdx, size).match(regex);
  if (match) {
    match = match[0];
    state.valueIdx += match.length;
    return parseInt(match, 10);
  }
  return null;
}
function getIndexByName(names, state, lower) {
  let i = 0, length = names.length, name, nameLength, matchLength = 0, matchIdx = 0, subValue;
  for (; i < length; i++) {
    name = names[i];
    nameLength = name.length;
    subValue = state.value.substr(state.valueIdx, nameLength);
    if (lower) {
      subValue = subValue.toLowerCase();
    }
    if (subValue === name && nameLength > matchLength) {
      matchLength = nameLength;
      matchIdx = i;
    }
  }
  if (matchLength) {
    state.valueIdx += matchLength;
    return matchIdx + 1;
  }
  return null;
}
function checkLiteral(state) {
  let result = false;
  const valueChar = state.value.charAt(state.valueIdx);
  const formatChar = state.format[state.idx];
  const exactMatch = valueChar === formatChar;
  const whitespaceMatch = /\s/.test(formatChar) && /\s/.test(valueChar);
  if (exactMatch || whitespaceMatch) {
    state.valueIdx++;
    result = true;
  }
  return result;
}
function calendarGmtFormats(calendar) {
  const { gmtFormat, gmtZeroFormat } = calendar;
  if (!gmtFormat) {
    throw errors.NoGMTInfo.error();
  }
  return [gmtFormat.replace(PLACEHOLDER2, EMPTY).toLowerCase(), gmtZeroFormat.replace(PLACEHOLDER2, EMPTY).toLowerCase()];
}
function parseTimeZoneOffset(state, info, options) {
  const { shortHours, noSeparator, optionalMinutes, localizedName, zLiteral } = options;
  state.UTC = true;
  if (zLiteral && state.value.charAt(state.valueIdx) === "Z") {
    state.valueIdx++;
    return false;
  }
  if (localizedName && !getIndexByName(calendarGmtFormats(info.calendar), state, true)) {
    return true;
  }
  const matches = timeZoneOffsetRegExp.exec(state.value.substr(state.valueIdx, 6));
  if (!matches) {
    return !localizedName;
  }
  const hoursMatch = matches[1];
  const minutesMatch = matches[3];
  const hoursOffset = parseInt(hoursMatch, 10);
  const separator = matches[2];
  let minutesOffset = parseInt(minutesMatch, 10);
  if (isNaN(hoursOffset) || !shortHours && hoursMatch.length !== 3 || !optionalMinutes && isNaN(minutesOffset) || noSeparator && separator) {
    return true;
  }
  if (isNaN(minutesOffset)) {
    minutesOffset = null;
  }
  if (outOfRange(hoursOffset, -12, 13) || minutesOffset && outOfRange(minutesOffset, 0, 59)) {
    return true;
  }
  state.valueIdx += matches[0].length;
  state.hoursOffset = hoursOffset;
  state.minutesOffset = minutesOffset;
}
function parseMonth(ch, state, info) {
  const count = lookAhead(ch, state);
  const names = formatNames(info, "months", count, ch === "L", true);
  const month = count < 3 ? getNumber(2, state) : getIndexByName(names, state, true);
  if (month === null || outOfRange(month, 1, 12)) {
    return true;
  }
  state.month = month - 1;
}
function parseDayOfWeek(ch, state, info) {
  const count = lookAhead(ch, state);
  const names = formatNames(info, "days", count, ch === "c", true);
  let dayOfWeek = count < 3 ? getNumber(1, state) : getIndexByName(names, state, true);
  if (!dayOfWeek && dayOfWeek !== 0 || outOfRange(dayOfWeek, 1, 7)) {
    return true;
  }
}
var parsers = {};
parsers.d = function(state) {
  lookAhead("d", state);
  const day = getNumber(2, state);
  if (day === null || outOfRange(day, 1, 31)) {
    return true;
  }
  if (state.day === null) {
    state.day = day;
  }
};
parsers.E = function(state, info) {
  const count = lookAhead("E", state);
  let dayOfWeek = getIndexByName(formatNames(info, "days", count, false, true), state, true);
  if (dayOfWeek === null) {
    return true;
  }
};
parsers.M = function(state, info) {
  return parseMonth("M", state, info);
};
parsers.L = function(state, info) {
  return parseMonth("L", state, info);
};
parsers.y = function(state) {
  const count = lookAhead("y", state);
  let year = getNumber(count === 1 ? void 0 : count, state);
  if (year === null) {
    return true;
  }
  if (count === 2) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    year = currentYear - currentYear % 100 + year;
    if (year > TWO_DIGIT_YEAR_MAX) {
      year -= 100;
    }
  }
  state.year = year;
};
parsers.h = function(state) {
  lookAhead("h", state);
  let hours = getNumber(2, state);
  if (hours === 12) {
    hours = 0;
  }
  if (hours === null || outOfRange(hours, 0, 11)) {
    return true;
  }
  state.hours = hours;
};
parsers.K = function(state) {
  lookAhead("K", state);
  let hours = getNumber(2, state);
  if (hours === null || outOfRange(hours, 0, 11)) {
    return true;
  }
  state.hours = hours;
};
parsers.a = function(state, info) {
  const count = lookAhead("a", state);
  let periodFormats = formatNames(info, "dayPeriods", count, false, true);
  const pmHour = getIndexByName([periodFormats.pm], state, true);
  if (!pmHour && !getIndexByName([periodFormats.am], state, true)) {
    return true;
  }
  state.pmHour = pmHour;
};
parsers.H = function(state) {
  lookAhead("H", state);
  const hours = getNumber(2, state);
  if (hours === null || outOfRange(hours, 0, 23)) {
    return true;
  }
  state.hours = hours;
};
parsers.k = function(state) {
  lookAhead("k", state);
  let hours = getNumber(2, state);
  if (hours === null || outOfRange(hours, 1, 24)) {
    return true;
  }
  state.hours = hours === 24 ? 0 : hours;
};
parsers.m = function(state) {
  lookAhead("m", state);
  const minutes = getNumber(2, state);
  if (minutes === null || outOfRange(minutes, 0, 59)) {
    return true;
  }
  state.minutes = minutes;
};
parsers.s = function(state) {
  lookAhead("s", state);
  const seconds = getNumber(2, state);
  if (seconds === null || outOfRange(seconds, 0, 59)) {
    return true;
  }
  state.seconds = seconds;
};
parsers.S = function(state) {
  const count = lookAhead("S", state);
  const match = state.value.substr(state.valueIdx, count);
  let milliseconds = null;
  if (!isNaN(parseInt(match, 10))) {
    milliseconds = parseFloat("0." + match, 10);
    milliseconds = round(milliseconds, 3);
    milliseconds *= 1e3;
    state.valueIdx += count;
  }
  if (milliseconds === null || outOfRange(milliseconds, 0, 999)) {
    return true;
  }
  state.milliseconds = milliseconds;
};
parsers.z = function(state, info) {
  const count = lookAhead("z", state);
  const shortFormat = count < 4;
  const invalid = parseTimeZoneOffset(state, info, {
    shortHours: shortFormat,
    optionalMinutes: shortFormat,
    localizedName: true
  });
  if (invalid) {
    return invalid;
  }
};
parsers.Z = function(state, info) {
  const count = lookAhead("Z", state);
  const invalid = parseTimeZoneOffset(state, info, {
    noSeparator: count < 4,
    zLiteral: count === 5,
    localizedName: count === 4
  });
  if (invalid) {
    return invalid;
  }
};
parsers.x = function(state, info) {
  const count = lookAhead("x", state);
  const invalid = parseTimeZoneOffset(state, info, {
    noSeparator: count !== 3 && count !== 5,
    optionalMinutes: count === 1
  });
  if (invalid) {
    return invalid;
  }
};
parsers.X = function(state, info) {
  const count = lookAhead("X", state);
  const invalid = parseTimeZoneOffset(state, info, {
    noSeparator: count !== 3 && count !== 5,
    optionalMinutes: count === 1,
    zLiteral: true
  });
  if (invalid) {
    return invalid;
  }
};
parsers.G = function(state, info) {
  const count = lookAhead("G", state);
  const eras = formatNames(info, "eras", count, false, true);
  const era = getIndexByName([eras[0], eras[1]], state, true);
  if (era === null) {
    return true;
  }
};
parsers.e = function(state, info) {
  return parseDayOfWeek("e", state, info);
};
parsers.c = function(state, info) {
  return parseDayOfWeek("c", state, info);
};
function createDate(state) {
  let { year, month, day, hours, minutes, seconds, milliseconds, pmHour, UTC, hoursOffset, minutesOffset } = state;
  const hasTime = hours !== null || minutes !== null || seconds || null;
  const date2 = /* @__PURE__ */ new Date();
  let result;
  if (year === null && month === null && day === null && hasTime) {
    year = date2.getFullYear();
    month = date2.getMonth();
    day = date2.getDate();
  } else {
    if (year === null) {
      year = date2.getFullYear();
    }
    if (day === null) {
      day = 1;
    }
  }
  if (pmHour && hours < 12) {
    hours += 12;
  }
  if (UTC) {
    if (hoursOffset) {
      hours += -hoursOffset;
    }
    if (minutesOffset) {
      minutes += -minutesOffset * (hoursOffset < 0 ? -1 : 1);
    }
    result = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
  } else {
    result = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    adjustDST(result, hours);
  }
  if (year < 100) {
    result.setFullYear(year);
  }
  if (result.getDate() !== day && UTC === void 0) {
    return null;
  }
  return result;
}
function addFormatSpaces(value, format2) {
  const leadingSpaces = leadingSpacesRegex.exec(format2)[0];
  const trailingSpaces = trailingSpacesRegex.exec(format2)[0];
  return `${leadingSpaces}${value}${trailingSpaces}`;
}
function parseExact(value, format2, info) {
  const pattern = datePattern(format2, info).split(EMPTY);
  const state = {
    format: pattern,
    idx: 0,
    value: addFormatSpaces(value, format2),
    valueIdx: 0,
    year: null,
    month: null,
    day: null,
    hours: null,
    minutes: null,
    seconds: null,
    milliseconds: null
  };
  const length = pattern.length;
  let literal = false;
  for (; state.idx < length; state.idx++) {
    let ch = pattern[state.idx];
    if (literal) {
      if (ch === "'") {
        literal = false;
      }
      checkLiteral(state);
    } else {
      if (parsers[ch]) {
        let invalid = parsers[ch](state, info);
        if (invalid) {
          return null;
        }
      } else if (ch === "'") {
        literal = true;
        checkLiteral(state);
      } else if (!checkLiteral(state)) {
        return null;
      }
    }
  }
  if (state.valueIdx < value.length) {
    return null;
  }
  return createDate(state) || null;
}
function parseMicrosoftDateOffset(offset) {
  const sign = offset.substr(0, 1) === "-" ? -1 : 1;
  let result = offset.substring(1);
  result = parseInt(result.substr(0, 2), 10) * 60 + parseInt(result.substring(2), 10);
  return sign * result;
}
function parseMicrosoftDateFormat(value) {
  if (value && value.indexOf("/D") === 0) {
    let date2 = dateRegExp.exec(value);
    if (date2) {
      date2 = date2[1];
      let tzoffset = offsetRegExp.exec(date2.substring(1));
      date2 = new Date(parseInt(date2, 10));
      if (tzoffset) {
        tzoffset = parseMicrosoftDateOffset(tzoffset[0]);
        date2 = convertTimeZone(date2, date2.getTimezoneOffset(), 0);
        date2 = convertTimeZone(date2, 0, -1 * tzoffset);
      }
      return date2;
    }
  }
}
function defaultFormats2(calendar) {
  const formats = [];
  const patterns = calendar.patterns;
  const length = FORMATS_SEQUENCE.length;
  for (let idx = 0; idx < length; idx++) {
    formats.push(patterns[FORMATS_SEQUENCE[idx]]);
  }
  return formats.concat(standardDateFormats);
}
function parseDate(value, formats, locale = DEFAULT_LOCALE) {
  if (!value) {
    return null;
  }
  if (isDate(value)) {
    return value;
  }
  let parseValue = String(value).trim();
  let date2 = parseMicrosoftDateFormat(parseValue);
  if (date2) {
    return date2;
  }
  const info = localeInfo(locale);
  let parseFormats = formats || defaultFormats2(info.calendar);
  parseFormats = Array.isArray(parseFormats) ? parseFormats : [parseFormats];
  const length = parseFormats.length;
  for (let idx = 0; idx < length; idx++) {
    date2 = parseExact(parseValue, parseFormats[idx], info);
    if (date2) {
      return date2;
    }
  }
  return date2;
}

// node_modules/@progress/kendo-intl/dist/es/dates/split-date-format.js
var NAME_TYPES = {
  month: {
    type: "months",
    minLength: 3,
    standAlone: "L"
  },
  quarter: {
    type: "quarters",
    minLength: 3,
    standAlone: "q"
  },
  weekday: {
    type: "days",
    minLength: {
      E: 0,
      c: 3,
      e: 3
    },
    standAlone: "c"
  },
  dayperiod: {
    type: "dayPeriods",
    minLength: 0
  },
  era: {
    type: "eras",
    minLength: 0
  }
};
var LITERAL = "literal";
function addLiteral(parts, value) {
  const lastPart = parts[parts.length - 1];
  if (lastPart && lastPart.type === LITERAL) {
    lastPart.pattern += value;
  } else {
    parts.push({
      type: LITERAL,
      pattern: value
    });
  }
}
function isHour12(pattern) {
  return pattern === "h" || pattern === "K";
}
function splitDateFormat(format2, locale = DEFAULT_LOCALE) {
  const info = localeInfo(locale);
  const pattern = datePattern(format2, info);
  const parts = [];
  let lastIndex = dateFormatRegExp.lastIndex = 0;
  let match = dateFormatRegExp.exec(pattern);
  while (match) {
    let value = match[0];
    if (lastIndex < match.index) {
      addLiteral(parts, pattern.substring(lastIndex, match.index));
    }
    if (value.startsWith('"') || value.startsWith("'")) {
      addLiteral(parts, value);
    } else {
      const specifier = value[0];
      const type = DATE_FIELD_MAP[specifier];
      const part = {
        type,
        pattern: value
      };
      if (type === "hour") {
        part.hour12 = isHour12(value);
      }
      const names = NAME_TYPES[type];
      if (names) {
        const minLength = isNumber(names.minLength) ? names.minLength : names.minLength[specifier];
        const patternLength = value.length;
        if (patternLength >= minLength) {
          part.names = {
            type: names.type,
            nameType: dateNameType(patternLength),
            standAlone: names.standAlone === specifier
          };
        }
      }
      parts.push(part);
    }
    lastIndex = dateFormatRegExp.lastIndex;
    match = dateFormatRegExp.exec(pattern);
  }
  if (lastIndex < pattern.length) {
    addLiteral(parts, pattern.substring(lastIndex));
  }
  return parts;
}

// node_modules/@progress/kendo-intl/dist/es/format.js
var formatRegExp3 = /\{(\d+)(:[^}]+)?\}/g;
function toString3(value, format2, locale) {
  if (format2) {
    if (isDate(value)) {
      return formatDate(value, format2, locale);
    } else if (isNumber(value)) {
      return formatNumber(value, format2, locale);
    }
  }
  return value !== void 0 && value !== null ? value : EMPTY;
}
function format(format2, values, locale) {
  return format2.replace(formatRegExp3, function(match, index, placeholderFormat) {
    let value = values[parseInt(index, 10)];
    return toString3(value, placeholderFormat ? placeholderFormat.substring(1) : EMPTY, locale);
  });
}

// node_modules/@progress/kendo-angular-l10n/fesm2022/progress-kendo-angular-l10n.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var MessageService = class _MessageService {
  /**
   * @hidden
   */
  constructor() {
  }
  /**
   * @hidden
   */
  changes = new import_rxjs.BehaviorSubject({
    rtl: void 0
  });
  /**
   * Notifies the components that the messages changed.
   *
   * @param rtl - (Optional) The new value for the [text direction token]({% slug api_l10n_rtl %}).
   */
  notify(rtl) {
    this.changes.next({
      rtl
    });
  }
  /**
   * Returns a localized message for the supplied key.
   *
   * @param _key - The message key. For example, `"kendo.grid.noRecords"`.
   * @return - The localized message for this key or `undefined` if not found.
   */
  get(_key) {
    return void 0;
  }
  static ɵfac = function MessageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MessageService,
    factory: _MessageService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageService, [{
    type: Injectable
  }], () => [], null);
})();
var ComponentMessages = class _ComponentMessages {
  service;
  subscription;
  get override() {
    return false;
  }
  ngOnChanges(changes) {
    this.register(changes);
    if (Object.keys(changes).some((field) => !changes[field].isFirstChange())) {
      this.service.notifyChanges();
    }
  }
  ngOnInit() {
    this.subscription = this.service.changes.pipe((0, import_operators.skip)(1)).subscribe(() => this.register(this));
  }
  register(changes) {
    const keys = Object.keys(changes);
    keys.forEach((key) => this.service.register(key, this[key], this.override));
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  static ɵfac = function ComponentMessages_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ComponentMessages)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ComponentMessages,
    features: [ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComponentMessages, [{
    type: Directive,
    args: [{}]
  }], null, null);
})();
var RTL = new InjectionToken("Kendo UI Right-to-Left token");
var L10N_PREFIX = new InjectionToken("Localization key prefix");
var LocalizationService = class _LocalizationService {
  prefix;
  messageService;
  _rtl;
  changes;
  subscription;
  dictionary = {};
  constructor(prefix, messageService, _rtl) {
    this.prefix = prefix;
    this.messageService = messageService;
    this._rtl = _rtl;
    this.changes = new import_rxjs.BehaviorSubject({
      rtl: this._rtl
    });
    if (messageService) {
      this.subscription = messageService.changes.pipe((0, import_operators.map)(({
        rtl
      }) => rtl !== void 0 ? rtl : this._rtl), (0, import_operators.tap)((rtl) => this._rtl = rtl)).subscribe((rtl) => {
        this.dictionary = {};
        this.changes.next({
          rtl
        });
      });
    }
  }
  get rtl() {
    return this._rtl;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  get(shortKey) {
    const key = this.key(shortKey);
    return this.dictionary[key];
  }
  register(shortKey, value, override = false) {
    const key = this.key(shortKey);
    let message = value;
    if (!override) {
      if (Object.hasOwnProperty.call(this.dictionary, key)) {
        return;
      }
      message = this.defaultValue(key, value);
    }
    this.dictionary[key] = message;
  }
  notifyChanges() {
    this.changes.next({
      rtl: this.rtl
    });
  }
  key(shortKey) {
    return this.prefix + "." + shortKey;
  }
  defaultValue(key, value) {
    if (!this.messageService) {
      return value;
    }
    const alt = this.messageService.get(key);
    return alt === void 0 ? value : alt;
  }
  static ɵfac = function LocalizationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalizationService)(ɵɵinject(L10N_PREFIX), ɵɵinject(MessageService, 8), ɵɵinject(RTL, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _LocalizationService,
    factory: _LocalizationService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalizationService, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [L10N_PREFIX]
    }]
  }, {
    type: MessageService,
    decorators: [{
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [RTL]
    }]
  }], null);
})();

// node_modules/@progress/kendo-angular-excel-export/fesm2022/progress-kendo-angular-excel-export.mjs
var compileTemplate = (templateRef, context, updateContext) => {
  let embeddedView = templateRef.createEmbeddedView(context);
  const result = (data) => {
    updateContext(context, data);
    embeddedView.detectChanges();
    return embeddedView.rootNodes.reduce((content, rootNode) => {
      return content + rootNode.textContent;
    }, "").trim();
  };
  result.destroy = () => {
    embeddedView.destroy();
    embeddedView = null;
  };
  return result;
};
var updateGroupHeaderContext = (context, data) => {
  context.$implicit = context.group = data;
  context.field = data.field;
  context.value = data.value;
  context.aggregates = data.aggregates;
};
var updateGroupFooterContext = (context, data) => {
  context.group = data.group;
  context.$implicit = context.aggregates = data;
};
var updateFooterContext = (context, data) => {
  context.aggregates = data.aggregates;
};
var toExporterColumns = (sourceColumns) => {
  const exporterColumns = [];
  let columnIndex = 0;
  const addColumns = (columns, result, level) => {
    columns.forEach((column) => {
      if (column.level === level) {
        const exporterColumn = new ExporterColumn(column, columnIndex);
        result.push(exporterColumn);
        if (column.children && column.children.some((c) => c !== column)) {
          const children = exporterColumn.columns = [];
          addColumns(column.children, children, level + 1);
        } else {
          columnIndex++;
        }
      }
    });
  };
  addColumns(sourceColumns, exporterColumns, 0);
  return exporterColumns;
};
var destroyColumns = (columns) => {
  if (columns) {
    columns.forEach((column) => {
      column.destroy();
    });
  }
};
var ExporterColumn = class {
  title;
  field;
  hidden;
  locked;
  width;
  columns;
  groupHeaderTemplate;
  groupHeaderColumnTemplate;
  groupFooterTemplate;
  footerTemplate;
  headerCellOptions;
  cellOptions;
  groupHeaderCellOptions;
  groupFooterCellOptions;
  footerCellOptions;
  constructor(column, columnIndex) {
    this.title = column.title;
    this.field = column.field;
    this.hidden = column.hidden;
    this.locked = column.locked;
    this.width = column.width;
    this.headerCellOptions = column.headerCellOptions;
    this.cellOptions = column.cellOptions;
    this.groupHeaderCellOptions = column.groupHeaderCellOptions;
    this.groupFooterCellOptions = column.groupFooterCellOptions;
    this.footerCellOptions = column.footerCellOptions;
    if (column.footerTemplate) {
      this.footerTemplate = compileTemplate(column.footerTemplate.templateRef, {
        $implicit: column,
        column,
        columnIndex
      }, updateFooterContext);
    }
    if (column.groupFooterTemplate) {
      this.groupFooterTemplate = compileTemplate(column.groupFooterTemplate.templateRef, {
        column,
        field: column.field
      }, updateGroupFooterContext);
    }
    if (column.groupHeaderTemplate) {
      this.groupHeaderTemplate = compileTemplate(column.groupHeaderTemplate.templateRef, {}, updateGroupHeaderContext);
    }
    if (column.groupHeaderColumnTemplate) {
      this.groupHeaderColumnTemplate = compileTemplate(column.groupHeaderColumnTemplate.templateRef, {}, updateGroupHeaderContext);
    }
  }
  destroy() {
    if (this.footerTemplate) {
      this.footerTemplate.destroy();
    }
    if (this.groupFooterTemplate) {
      this.groupFooterTemplate.destroy();
    }
    if (this.groupHeaderTemplate) {
      this.groupHeaderTemplate.destroy();
    }
    if (this.groupHeaderColumnTemplate) {
      this.groupHeaderColumnTemplate.destroy();
    }
    destroyColumns(this.columns);
  }
};
intl_service_default.register({
  toString: toString3
});
var workbookOptions = (options) => {
  const columns = toExporterColumns(options.columns);
  const exporter = new excel_exporter_default({
    columns,
    data: options.data,
    filterable: options.filterable,
    groups: options.group,
    paddingCellOptions: options.paddingCellOptions,
    headerPaddingCellOptions: options.headerPaddingCellOptions,
    collapsible: options.collapsible,
    hierarchy: options.hierarchy,
    aggregates: options.aggregates
  });
  const result = exporter.workbook();
  result.creator = options.creator;
  result.date = options.date;
  result.rtl = options.rtl;
  destroyColumns(columns);
  return result;
};
var toDataURL = (options) => {
  const workbook = new Workbook(options);
  return workbook.toDataURL();
};
var isWorkbookOptions = (value) => {
  return value && value.sheets;
};
var ColumnBase = class _ColumnBase {
  parent;
  /**
   * The title of the column.
   */
  title;
  /**
   * The width of the column in pixels.
   */
  width;
  /**
   * Toggles the locked (frozen) state of the column ([see example]({% slug columns_excel-export %}#toc-locked-state)).
   *
   * @default false
   */
  locked;
  /**
   * Sets the visibility of the column ([see example]({% slug columns_excel-export %}#toc-hidden-state)).
   *
   * @default false
   */
  hidden;
  /**
   * The options of the column header cell.
   */
  headerCellOptions;
  /**
   * @hidden
   */
  children;
  /**
   * @hidden
   */
  get level() {
    return this.parent ? this.parent.level + 1 : 0;
  }
  constructor(parent) {
    this.parent = parent;
  }
  static ɵfac = function ColumnBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColumnBase)(ɵɵdirectiveInject(_ColumnBase));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ColumnBase,
    selectors: [["ng-component"]],
    contentQueries: function ColumnBase_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, _ColumnBase, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
      }
    },
    inputs: {
      title: "title",
      width: "width",
      locked: "locked",
      hidden: "hidden",
      headerCellOptions: "headerCellOptions"
    },
    decls: 0,
    vars: 0,
    template: function ColumnBase_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnBase, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], () => [{
    type: ColumnBase
  }], {
    title: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    locked: [{
      type: Input
    }],
    hidden: [{
      type: Input
    }],
    headerCellOptions: [{
      type: Input
    }],
    children: [{
      type: ContentChildren,
      args: [ColumnBase]
    }]
  });
})();
var packageMetadata = {
  name: "@progress/kendo-angular-excel-export",
  productName: "Kendo UI for Angular",
  productCode: "KENDOUIANGULAR",
  productCodes: ["KENDOUIANGULAR"],
  publishDate: 0,
  version: "22.0.1",
  licensingDocsUrl: "https://www.telerik.com/kendo-angular-ui/my-license/"
};
var ExcelExportComponent = class _ExcelExportComponent {
  localization;
  zone;
  /**
   * Specifies the name of the exported Excel file.
   *
   * @default "Export.xlsx"
   */
  fileName = "Export.xlsx";
  /**
   * Determines whether to enable column filtering in the exported Excel file
   * ([see example]({% slug filtering_excelexport %})).
   */
  filterable;
  /**
   * Determines whether groups in the Excel file are collapsible.
   */
  collapsible;
  /**
   * Specifies the author of the workbook.
   */
  creator;
  /**
   * Specifies the creation date of the workbook.
   * The default value is `new Date()`.
   *
   * @default `new Date()`
   */
  date;
  /**
   * Determines whether to force the use of a proxy server for file downloads.
   * When set to `true`, the component sends content to `proxyURL` even if the browser supports local file saving.
   */
  forceProxy;
  /**
   * Specifies the URL of the server-side proxy that streams the file to the user.
   * When the browser cannot save files locally (for example, Internet Explorer 9 and earlier, and Safari), the component uses a proxy.
   * You must implement the server-side proxy.
   *
   * The proxy receives a `POST` request with these parameters in the request body:
   * - `contentType`&mdash;The `MIME` type of the file.
   * - `base64`&mdash;The `base-64` encoded file content.
   * - `fileName`&mdash;The requested file name.
   * The proxy must return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.xslx>"`.
   */
  proxyURL;
  /**
   * Specifies the data to export.
   * When the data is grouped, structure it as described by the
   * [`GroupResult`]({% slug api_kendo-data-query_groupresult %}) option of the Kendo UI Data Query component.
   */
  data;
  /**
   * Specifies the exported data groups.
   * The groups must match the
   * [`GroupDescriptor`]({% slug api_kendo-data-query_groupdescriptor %}) option of the Kendo UI Data Query component.
   */
  group;
  /**
   * Specifies the options for cells inserted before data, group, and footer cells
   * to show group hierarchy when the data is grouped
   * ([see example]({% slug cells_excelexport %}#toc-padding-cells)).
   */
  paddingCellOptions;
  /**
   * Specifies the options for cells inserted before header cells
   * to align headers and column values when the data is grouped
   * ([see example]({% slug cells_excelexport %}#toc-header-padding-cells)).
   */
  headerPaddingCellOptions;
  /**
   * @hidden
   */
  columns = new QueryList();
  constructor(localization, zone) {
    this.localization = localization;
    this.zone = zone;
    N(packageMetadata);
    this.saveFile = this.saveFile.bind(this);
  }
  /**
   * Exports the data to Excel.
   *
   * @param exportData - Optional. The data to export or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}).
   */
  save(exportData) {
    this.toDataURL(exportData).then(this.saveFile);
  }
  /**
   * Returns [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}) based on the specified columns and data.
   * Use this method to customize the workbook options.
   *
   * @param exportData - Optional. The data to export.
   * @returns {WorkbookOptions} The workbook options.
   */
  workbookOptions(exportData) {
    const currentData = this.getExportData(exportData);
    const options = workbookOptions({
      columns: this.columns,
      data: currentData.data,
      group: currentData.group,
      filterable: this.filterable,
      creator: this.creator,
      date: this.date,
      rtl: this.localization.rtl,
      paddingCellOptions: this.paddingCellOptions,
      headerPaddingCellOptions: this.headerPaddingCellOptions,
      collapsible: this.collapsible
    });
    return options;
  }
  /**
   * Returns a promise that resolves with the file data URI.
   * Use this method to get the Excel file as a data URI.
   *
   * @param exportData - Optional. The data or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}) to use for generating the data URI.
   * @returns {Promise<string>} A promise that resolves with the file data URI.
   */
  toDataURL(exportData) {
    const options = isWorkbookOptions(exportData) ? exportData : this.workbookOptions(exportData);
    return this.zone.runOutsideAngular(() => toDataURL(options));
  }
  getExportData(exportData) {
    let result;
    if (exportData) {
      if (Array.isArray(exportData)) {
        result = {
          data: exportData
        };
      } else {
        result = exportData;
      }
    } else {
      result = {
        data: this.data,
        group: this.group
      };
    }
    return result;
  }
  saveFile(dataURL) {
    saveAs(dataURL, this.fileName, {
      forceProxy: this.forceProxy,
      proxyURL: this.proxyURL
    });
  }
  static ɵfac = function ExcelExportComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExcelExportComponent)(ɵɵdirectiveInject(LocalizationService), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ExcelExportComponent,
    selectors: [["kendo-excelexport"]],
    contentQueries: function ExcelExportComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, ColumnBase, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.columns = _t);
      }
    },
    inputs: {
      fileName: "fileName",
      filterable: "filterable",
      collapsible: "collapsible",
      creator: "creator",
      date: "date",
      forceProxy: "forceProxy",
      proxyURL: "proxyURL",
      data: "data",
      group: "group",
      paddingCellOptions: "paddingCellOptions",
      headerPaddingCellOptions: "headerPaddingCellOptions"
    },
    exportAs: ["kendoExcelExport"],
    features: [ɵɵProvidersFeature([LocalizationService, {
      provide: L10N_PREFIX,
      useValue: "kendo.excelexport"
    }])],
    decls: 0,
    vars: 0,
    template: function ExcelExportComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcelExportComponent, [{
    type: Component,
    args: [{
      exportAs: "kendoExcelExport",
      selector: "kendo-excelexport",
      providers: [LocalizationService, {
        provide: L10N_PREFIX,
        useValue: "kendo.excelexport"
      }],
      template: ``,
      standalone: true
    }]
  }], () => [{
    type: LocalizationService
  }, {
    type: NgZone
  }], {
    fileName: [{
      type: Input
    }],
    filterable: [{
      type: Input
    }],
    collapsible: [{
      type: Input
    }],
    creator: [{
      type: Input
    }],
    date: [{
      type: Input
    }],
    forceProxy: [{
      type: Input
    }],
    proxyURL: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    paddingCellOptions: [{
      type: Input
    }],
    headerPaddingCellOptions: [{
      type: Input
    }],
    columns: [{
      type: ContentChildren,
      args: [ColumnBase, {
        descendants: true
      }]
    }]
  });
})();
var FooterTemplateDirective = class _FooterTemplateDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static ɵfac = function FooterTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterTemplateDirective)(ɵɵdirectiveInject(TemplateRef, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FooterTemplateDirective,
    selectors: [["", "kendoExcelExportFooterTemplate", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[kendoExcelExportFooterTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var GroupHeaderTemplateDirective = class _GroupHeaderTemplateDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static ɵfac = function GroupHeaderTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupHeaderTemplateDirective)(ɵɵdirectiveInject(TemplateRef, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GroupHeaderTemplateDirective,
    selectors: [["", "kendoExcelExportGroupHeaderTemplate", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupHeaderTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[kendoExcelExportGroupHeaderTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var GroupHeaderColumnTemplateDirective = class _GroupHeaderColumnTemplateDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static ɵfac = function GroupHeaderColumnTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupHeaderColumnTemplateDirective)(ɵɵdirectiveInject(TemplateRef, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GroupHeaderColumnTemplateDirective,
    selectors: [["", "kendoExcelExportGroupHeaderColumnTemplate", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupHeaderColumnTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[kendoExcelExportGroupHeaderColumnTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var GroupFooterTemplateDirective = class _GroupFooterTemplateDirective {
  templateRef;
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static ɵfac = function GroupFooterTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupFooterTemplateDirective)(ɵɵdirectiveInject(TemplateRef, 8));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GroupFooterTemplateDirective,
    selectors: [["", "kendoExcelExportGroupFooterTemplate", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupFooterTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[kendoExcelExportGroupFooterTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var ColumnComponent = class _ColumnComponent extends ColumnBase {
  /**
   * Specifies the field that the column displays.
   */
  field;
  /**
   * Specifies options for the column's data cells
   * ([see example]({% slug cells_excelexport %}#toc-data-cells)).
   */
  cellOptions;
  /**
   * Specifies options for the group header cells of the column
   * ([see example]({% slug cells_excelexport %}#toc-header-cells)).
   */
  groupHeaderCellOptions;
  /**
   * Specifies options for the group footer cells of the column
   * ([see example]({% slug cells_excelexport %}#toc-group-footer-cells)).
   */
  groupFooterCellOptions;
  /**
   * Specifies options for the footer cell of the column
   * ([see example]({% slug cells_excelexport %}#toc-footer-cells)).
   */
  footerCellOptions;
  /**
   * @hidden
   */
  groupHeaderTemplate;
  /**
   * @hidden
   */
  groupHeaderColumnTemplate;
  /**
   * @hidden
   */
  groupFooterTemplate;
  /**
   * @hidden
   */
  footerTemplate;
  constructor(parent) {
    super(parent);
  }
  static ɵfac = function ColumnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColumnComponent)(ɵɵdirectiveInject(ColumnBase, 13));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ColumnComponent,
    selectors: [["kendo-excelexport-column"]],
    contentQueries: function ColumnComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, GroupHeaderTemplateDirective, 5)(dirIndex, GroupHeaderColumnTemplateDirective, 5)(dirIndex, GroupFooterTemplateDirective, 5)(dirIndex, FooterTemplateDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupHeaderTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupHeaderColumnTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupFooterTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerTemplate = _t.first);
      }
    },
    inputs: {
      field: "field",
      cellOptions: "cellOptions",
      groupHeaderCellOptions: "groupHeaderCellOptions",
      groupFooterCellOptions: "groupFooterCellOptions",
      footerCellOptions: "footerCellOptions"
    },
    features: [ɵɵProvidersFeature([{
      provide: ColumnBase,
      useExisting: forwardRef(() => _ColumnComponent)
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function ColumnComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnComponent, [{
    type: Component,
    args: [{
      providers: [{
        provide: ColumnBase,
        useExisting: forwardRef(() => ColumnComponent)
      }],
      selector: "kendo-excelexport-column",
      template: ``,
      standalone: true
    }]
  }], () => [{
    type: ColumnBase,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }, {
      type: Optional
    }]
  }], {
    field: [{
      type: Input
    }],
    cellOptions: [{
      type: Input
    }],
    groupHeaderCellOptions: [{
      type: Input
    }],
    groupFooterCellOptions: [{
      type: Input
    }],
    footerCellOptions: [{
      type: Input
    }],
    groupHeaderTemplate: [{
      type: ContentChild,
      args: [GroupHeaderTemplateDirective, {
        static: false
      }]
    }],
    groupHeaderColumnTemplate: [{
      type: ContentChild,
      args: [GroupHeaderColumnTemplateDirective, {
        static: false
      }]
    }],
    groupFooterTemplate: [{
      type: ContentChild,
      args: [GroupFooterTemplateDirective, {
        static: false
      }]
    }],
    footerTemplate: [{
      type: ContentChild,
      args: [FooterTemplateDirective, {
        static: false
      }]
    }]
  });
})();
var ColumnGroupComponent = class _ColumnGroupComponent extends ColumnBase {
  parent;
  constructor(parent) {
    super(parent);
    this.parent = parent;
  }
  static ɵfac = function ColumnGroupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ColumnGroupComponent)(ɵɵdirectiveInject(ColumnBase, 13));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ColumnGroupComponent,
    selectors: [["kendo-excelexport-column-group"]],
    features: [ɵɵProvidersFeature([{
      provide: ColumnBase,
      useExisting: forwardRef(() => _ColumnGroupComponent)
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function ColumnGroupComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnGroupComponent, [{
    type: Component,
    args: [{
      providers: [{
        provide: ColumnBase,
        useExisting: forwardRef(() => ColumnGroupComponent)
      }],
      selector: "kendo-excelexport-column-group",
      template: ``,
      standalone: true
    }]
  }], () => [{
    type: ColumnBase,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }, {
      type: Optional
    }]
  }], null);
})();
var KENDO_EXCELEXPORT = [ExcelExportComponent, ColumnComponent, ColumnGroupComponent, FooterTemplateDirective, GroupFooterTemplateDirective, GroupHeaderColumnTemplateDirective, GroupHeaderTemplateDirective];
var ExcelExportModule = class _ExcelExportModule {
  static ɵfac = function ExcelExportModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExcelExportModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ExcelExportModule,
    imports: [ExcelExportComponent, ColumnComponent, ColumnGroupComponent, FooterTemplateDirective, GroupFooterTemplateDirective, GroupHeaderColumnTemplateDirective, GroupHeaderTemplateDirective],
    exports: [ExcelExportComponent, ColumnComponent, ColumnGroupComponent, FooterTemplateDirective, GroupFooterTemplateDirective, GroupHeaderColumnTemplateDirective, GroupHeaderTemplateDirective]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExcelExportModule, [{
    type: NgModule,
    args: [{
      imports: [...KENDO_EXCELEXPORT],
      exports: [...KENDO_EXCELEXPORT]
    }]
  }], null, null);
})();

export {
  saveAs,
  template_service_default,
  excel_exporter_default,
  intl_service_default,
  deflate$1,
  Worksheet,
  Workbook,
  localeInfo,
  load4 as load,
  dateFieldName,
  dateFormatNames,
  firstDay,
  weekendRange,
  numberSymbols,
  formatNumber,
  parseNumber,
  formatDate,
  parseDate,
  splitDateFormat,
  toString3 as toString,
  format,
  MessageService,
  ComponentMessages,
  RTL,
  L10N_PREFIX,
  LocalizationService,
  workbookOptions,
  toDataURL,
  isWorkbookOptions,
  ColumnBase,
  ExcelExportComponent,
  FooterTemplateDirective,
  GroupHeaderTemplateDirective,
  GroupHeaderColumnTemplateDirective,
  GroupFooterTemplateDirective,
  ColumnComponent,
  ColumnGroupComponent,
  KENDO_EXCELEXPORT,
  ExcelExportModule
};
//# sourceMappingURL=chunk-IAZCCNCN.js.map
