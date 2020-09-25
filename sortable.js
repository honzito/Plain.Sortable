/*===========================================================================
  SORTABLE TABLES in plain JS

  Sort a table by clicking on a column heading.
  To make a table sortable, call SortableTable.find('table.sortable');

  <table class="sortable">
    <tr>
      <th data-sort="integer">ID</th>
      <th>Summary</th>
      <th data-sort="date">Occurred on</th>
    </tr>
    <tr> (some cells...) </tr>
  </table>

  The 'data-sort' attribute of the table cell headers determines the way that
  the column is sorted. The default is case-insensitive alphabetical comparison.
  Posible values: date | float | integer | caseSensitive | STRING (default)

  Based on SORTABLE TABLES (for prototype.js) by Inventive Labs
  which is based on tableSort.js by Inigo Surguy (http://surguy.net).
  This file is made available under the same Creative Commons Attribution-ShareAlike
  2.5 license: http://creativecommons.org/licenses/by-sa/2.5/
*/

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

SortableTable = function (table) {
  var me = this;
  var defaultsort = null;

  this.table = table;
  this.rows  = [].slice.call(table.tBodies[0].rows);
  this.headerRow = table.tHead ? table.tHead.rows[0] : this.rows.shift();
  this.headers = this.headerRow.querySelectorAll('th');

  this.headers.forEach(function(th) {
    var div = document.createElement('div');
    div.innerHTML = th.innerHTML;
    div.onclick = function () {
      me.sortOnColumn(th, div)
    }
    th.innerHTML = '';
    th.appendChild(div);
    if (th.hasAttribute('data-sortdefault')) {
      defaultsort = div;
    }
  });
  if (defaultsort) {
      defaultsort.click();
  }
}

SortableTable.find = function (sel) {
  document.querySelectorAll(sel || 'table.sortable').forEach(function(table) { new SortableTable(table) })
}

SortableTable.prototype.simpleCompare = function(a,b) {
  return a < b ? -1 : a == b ? 0 : 1;
};
SortableTable.prototype.localtextCompare = function(a,b) {
  return a.localeCompare(b);
};

SortableTable.prototype.compareComposer = function(normalizeFn) {
  var me = this;
  return function(a,b) {return me.simpleCompare(normalizeFn(a), normalizeFn(b))}
}

// Add any new comparison functions you need to this switch statement.
SortableTable.prototype.compareFunction = function (sType) {
  switch (sType) {
    case "caseSensitive":
      return this.localtextCompare;
    case "integer":
      // Extracts the first numeric part of a string
      return this.compareComposer(function(a) {
        return parseInt(a.replace(/\s/g,'').replace(/^.*?(\d+).*$/,"$1"))
      });
    case "float":
      // Similar, but permits floating points (.)
      return this.compareComposer(function(a) {
        return parseFloat(a.replace(/\s/g,'').replace(/^.*?([\d.]+).*$/,"$1"))
      });
    case "date":
      // Expects an ISO date format "13 MAR 2006 10:17:02 GMT"
      return this.compareComposer(Date.parse)
    default:
      return this.localtextCompare; // this.compareComposer(function(a) { return a.toLowerCase(); });
  }
}

SortableTable.prototype.getText = function(e) {
  return e.text = e.getAttribute('data-sortval')||e.text||e.textContent||e.innerText||e.innerHTML||''
}

SortableTable.prototype.getCellText = function(row, pos) {
  row.cellTexts = row.cellTexts || [];
  if (!row.cellTexts[pos]) {
    try {
      row.cellTexts[pos] = this.getText(row.querySelectorAll("td,th")[pos]);
    } catch(err) {
      row.cellTexts[pos] = '~~~~~~'; // last ASCII char
    }
  }
  return row.cellTexts[pos];
}

SortableTable.prototype.sortOnColumn = function (th, span) {
  // figure out which column this is
  var pos = [].slice.call(this.headerRow.cells).indexOf(th);

  this.headers.forEach( function(cell) { cell.classList.remove('sortup');   });
  this.headers.forEach( function(cell) { cell.classList.remove('sortdown'); });

  // do the sort
  var sortFn = this.compareFunction(th.getAttribute('data-sort'));
  span.order = span.order || 1
  var me = this;
  this.rows.sort(
      function (rowA, rowB) {
        return span.order * sortFn(me.getCellText(rowA,pos), me.getCellText(rowB,pos));
      }
  );
  span.order *= -1;
  th.classList.add((span.order === 1) ? 'sortup' : 'sortdown');

  // rearrange the rows based on sort results
  var tbody = this.table.tBodies[0];
  this.rows.forEach(function(row) {
    tbody.appendChild(row);
  });
}

// we initialize it directly in the document - see example.html
// you can initialize it from here as well, however

// document.addEventListener("DOMContentLoaded", function() { SortableTable.find('table.sortable'); });
