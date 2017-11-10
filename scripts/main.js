const table = host.querySelector('table');
const leftBtn = host.querySelector('.wrapper-left');
const topBtn = host.querySelector('.wrapper-top');
leftBtn.classList.add('disabled');
topBtn.classList.add('disabled');

class TableSet {
  static ifOneRow() {
    const trTd = host.querySelectorAll('table tr');
    const td = host.querySelectorAll('td');
    if (trTd.length < 2) {
      leftBtn.classList.add('disabled');
    }
    if (td.length < 2) {
      topBtn.classList.add('disabled');
    }
  }
  static addListener() {
    const trTd = host.querySelectorAll('tr td');
    const wrapperTbl = host.querySelector('.tbl').getBoundingClientRect();
    const row = host.querySelectorAll('tr');
    const cel = host.querySelectorAll('td');

    for (let i = 0; i < row.length; i += 1) {
      row[i].addEventListener('mouseover', () => {
        leftBtn.rowIndex = row[i].rowIndex;
      });
    }
    for (let i = 0; i < cel.length; i += 1) {
      cel[i].addEventListener('mouseover', () => {
        topBtn.cellIndex = cel[i].cellIndex;
      });
    }

    for (let i = 0; i < trTd.length; i += 1) {
      trTd[i].addEventListener('mouseover', () => {
        const crds = trTd[i].getBoundingClientRect();
        topBtn.style = `left: ${crds.left - wrapperTbl.left}px;`;
        leftBtn.style = `top: ${crds.top - wrapperTbl.top}px;`;
      });
    }
    TableSet.tableEvents();
  }
  static addRow() {
    const tbl = host.querySelector('table tbody');
    const tableTr = host.querySelector('tr');
    let tr = null;

    for (let row = 0; row < 1; row += 1) {
      tr = tableTr.cloneNode(true);
      tbl.appendChild(tr);
      TableSet.addListener();
    }
  }
  static addColumn() {
    const tableTr = host.querySelectorAll('table tr');
    let td;

    for (let i = 0; i < tableTr.length; i += 1) {
      td = document.createElement('td');
      tableTr[i].appendChild(td);
      TableSet.addListener();
    }
  }
  static deleteColumn() {
    const attribute = topBtn.cellIndex;
    let child = host.querySelectorAll('td');

    for (let i = 0; i < child.length; i +=1) {
      if ( child[i].cellIndex === attribute) {
        child[i].parentNode.removeChild(child[i]);
      }
      child = host.querySelectorAll('td');
    }
    TableSet.ifOneRow();
  }
  static deleteRow() {
    let tableTr = host.querySelectorAll('tr');

    for (let i = 0; i < tableTr.length; i += 1) {
      if (tableTr[i].rowIndex == leftBtn.rowIndex) {
        tableTr[i].parentNode.removeChild(tableTr[i]);
      }
      tableTr = host.querySelectorAll('tr');
    }
    TableSet.ifOneRow();
  }
  static tableEvents() {
    const botBtn = host.querySelector('.tbl-btns__btn_bot');
    const rightBtn = host.querySelector('.tbl-btns__btn_right');

    botBtn.addEventListener('click', this.addRow);
    rightBtn.addEventListener('click', this.addColumn);
    leftBtn.addEventListener('click', this.deleteRow); 
    topBtn.addEventListener('click', this.deleteColumn);

    table.addEventListener('mouseenter', () => {
      this.addListener();
      leftBtn.classList.remove('disabled');
      topBtn.classList.remove('disabled');
      TableSet.ifOneRow();
    });
    table.addEventListener('mouseleave', () => {
      leftBtn.classList.add('disabled');
      topBtn.classList.add('disabled');
      topBtn.addEventListener('mouseenter', () => {
        topBtn.classList.remove('disabled');
        TableSet.ifOneRow();
      });
      leftBtn.addEventListener('mouseenter', () => {
        leftBtn.classList.remove('disabled');
        TableSet.ifOneRow();
      });
    });
    leftBtn.addEventListener('mouseleave', () => {
      leftBtn.classList.add('disabled');
    });
    topBtn.addEventListener('mouseleave', () => {
      topBtn.classList.add('disabled');
    });
  }
}
TableSet.deleteColumn();
TableSet.deleteRow();
TableSet.addListener();
