const table = document.querySelector('table');
const leftBtn = document.querySelector('.wrapper-left');
const topBtn = document.querySelector('.wrapper-top');
leftBtn.classList.add('disabled');
topBtn.classList.add('disabled');
class TableSet {
  static ifOneRow() {
    const trTd = document.querySelectorAll('table tr');

    if (trTd.length < 2) {
      leftBtn.classList.add('disabled');
    }
    if (trTd[0].cells.length < 2) {
      topBtn.classList.add('disabled');
    }
  }
  static addListener() {
    const tableTr = document.querySelectorAll('table tr');
    const trTd = document.querySelectorAll('tr td');
    const wrapperTbl = document.querySelector('.tbl').getBoundingClientRect();

    for (let i = 0; i < tableTr.length; i += 1) {
      tableTr[i].addEventListener('mouseover', () => {
        const rIndex = tableTr[i].getAttribute('data-row-index');
        leftBtn.setAttribute('data-row-index', `${rIndex}`);
      });
    }
    for (let i = 0; i < trTd.length; i += 1) {
      trTd[i].addEventListener('mouseover', () => {
        const rIndex = trTd[i].getAttribute('data-cell-index');
        const crds = trTd[i].getBoundingClientRect();
        topBtn.setAttribute('data-cell-index', `${rIndex}`);
        topBtn.style = `left: ${crds.left - wrapperTbl.left}px;`;
        leftBtn.style = `top: ${crds.top - wrapperTbl.top}px;`;
      });
    }
    TableSet.tableEvents();
  }
  static addRow() {
    const tbl = document.querySelector('table tbody');
    const tableTr = document.querySelector('tr');
    const inc = Math.random();
    let tr = null;

    for (let row = 0; row < 1; row += 1) {
      tr = tableTr.cloneNode(true);
      tbl.appendChild(tr).setAttribute('data-row-index', `${inc}`);
      leftBtn.setAttribute('data-row-index', `${inc}`);
      TableSet.addListener();
    }
  }
  static addColumn() {
    const tableTr = document.querySelectorAll('table tr');
    const inc = Math.random();
    let td;

    for (let i = 0; i < tableTr.length; i += 1) {
      td = document.createElement('td');
      tableTr[i].appendChild(td).setAttribute('data-cell-index', `${inc}`);
      topBtn.setAttribute('data-cell-index', `${inc}`);
      TableSet.addListener();
    }
  }
  static deleteColumn() {
    const tableTr = document.querySelectorAll('tr td');

    for (let j = 0; j < tableTr.length; j += 1) {
      TableSet.ifOneRow();
      if (tableTr[j].getAttribute('data-cell-index') === topBtn.getAttribute('data-cell-index')) {
        tableTr[j].remove();
      }
    }
    TableSet.ifOneRow();
  }
  static deleteRow() {
    const tableTr = document.querySelectorAll('table tr');

    for (let row = 0; row < tableTr.length; row += 1) {
      TableSet.ifOneRow();
      if (tableTr[row].getAttribute('data-row-index') === leftBtn.getAttribute('data-row-index')) {
        tableTr[row].remove();
      }
    }
    TableSet.ifOneRow();
  }
  static tableEvents() {
    const botBtn = document.querySelector('.tbl-btns__btn_bot');
    const rightBtn = document.querySelector('.tbl-btns__btn_right');

    botBtn.addEventListener('click', this.addRow);
    rightBtn.addEventListener('click', this.addColumn);
    // leftBtn.addEventListener('click', this.ifOneRow);
    leftBtn.addEventListener('click', this.deleteRow);
    // topBtn.addEventListener('click', this.ifOneRow);
    topBtn.addEventListener('click', this.deleteColumn);
    table.addEventListener('mousemove', this.addListener);

    table.addEventListener('mouseenter', () => {
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
      topBtn.addEventListener('mouseleave', () => {
        topBtn.classList.add('disabled');
      });
      leftBtn.addEventListener('mouseenter', () => {
        leftBtn.classList.remove('disabled');
        TableSet.ifOneRow();
      });
      leftBtn.addEventListener('mouseleave', () => {
        leftBtn.classList.add('disabled');
      });
    });
    topBtn.addEventListener('mouseleave', () => {
      table.addEventListener('mouseenter', () => {
        topBtn.classList.remove('disabled');
        TableSet.ifOneRow();
      });
      table.addEventListener('mouseleave', () => {
        topBtn.classList.add('disabled');
      });
    });
    leftBtn.addEventListener('mouseleave', () => {
      table.addEventListener('mouseenter', () => {
        leftBtn.classList.remove('disabled');
        TableSet.ifOneRow();
      });
      table.addEventListener('mouseleave', () => {
        leftBtn.classList.add('disabled');
      });
    });
  }
}

TableSet.addColumn();
TableSet.addRow();
TableSet.deleteColumn();
TableSet.deleteRow();
TableSet.addListener(); 
