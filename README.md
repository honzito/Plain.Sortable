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
        <th data-sort="date">Occurred on</th>
      </tr>
      <tr> (some cells...) </tr>
     </table>

  The 'data-sort' attribute of the table cell headers determines the way that
  the column is sorted. The default is case-insensitive alphabetical comparison.
  
  Posible values: date | float | integer | caseSensitive | STRING (default)


  ---
  * Based on SORTABLE TABLES (for prototype.js) by Inventive Labs
  * Based on tableSort.js by Inigo Surguy (http://surguy.net). 
  
  *This file is made
  available under the same Creative Commons Attribution-ShareAlike 2.5 license:
  http://creativecommons.org/licenses/by-sa/2.5/*
