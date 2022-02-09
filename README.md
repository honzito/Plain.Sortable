Plain.Sortable
==================

  SORTABLE TABLES in plain JS

  Sort a table by clicking on a column heading.
  
  To make a table sortable, call 
  
    SortableTable.find('table.sortable');

  HTML:

    <table class="sortable">
      <tr>
        <th data-sort="integer">ID</th>
        <th>Summary</th>
        <th data-sort="date" data-sortdefault>Occurred on</th>
      </tr>
      <tr> (some cells...) </tr>
     </table>
     
  The `data-sort` attribute of the table cell headers determines the way that
  the column is sorted. The default is case-insensitive alphabetical comparison.
  
  Possible values: `date` | `float` | `integer` | `caseSensitive` | `STRING` (default)

  The `data-sortdefault` attribute of the table cell headers matches the (optional) default sort column.
  `data-sortdefault="d"` switch DESCENDING order of default column

  Alternative HTML with THEAD and TFOOT:
  
    <table class="sortable">
      <thead>
        <tr>
          <th data-sort="integer">ID</th>
          <th>Summary</th>
          <th data-sort="date">Occurred on</th>
        </tr>
      </thead>
      <tbody>
        <tr> (some cells...) </tr>
      </tbody>
      <tfoot>
        <tr> (some summary cells which will not be sorted...) </tr>
      </tfoot>
    </table>



  ---
  * Based on SORTABLE TABLES (for prototype.js) by Inventive Labs
  * Based on tableSort.js by Inigo Surguy (http://surguy.net). 
  
  *This file is made
  available under the same Creative Commons Attribution-ShareAlike 2.5 license:
  http://creativecommons.org/licenses/by-sa/2.5/*
