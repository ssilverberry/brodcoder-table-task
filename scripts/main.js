const table = host.querySelector('table');
const leftBtn = host.querySelector('.wrapper-left');
const topBtn = host.querySelector('.wrapper-top');
const botBtn = host.querySelector('.tbl-btns__btn_bot');
const rightBtn = host.querySelector('.tbl-btns__btn_right');
leftBtn.classList.add('disabled');
topBtn.classList.add('disabled');

class TableSet {
  ifOneRow() {
    const trTd = host.querySelectorAll('table tr');
    const td = host.querySelectorAll('td');
    if (trTd.length < 2) {
      leftBtn.classList.add('disabled');
    }
    if (td.length < 2) {
      topBtn.classList.add('disabled');
    }
  } 
  addListener() {
    const trTd = host.querySelectorAll('tr td');
    const wrapperTbl = host.querySelector('.tbl').getBoundingClientRect();
    const row = host.querySelectorAll('tr');
    const cel = host.querySelectorAll('td');

    for (let i = 0; i < row.length; i += 1) {
      row[i].addEventListener('mouseenter', () => {
      leftBtn.rowIndex = row[i].rowIndex;
      });
    } 
    for(let j = 0; j < cel.length; j += 1) {
        cel[j].addEventListener('mouseenter', () => {
          topBtn.cellIndex = cel[j].cellIndex;
        });
    }
    for (let i = 0; i < trTd.length; i += 1) {
      const crds = trTd[i].getBoundingClientRect();
      trTd[i].addEventListener('mouseover', () => {
        //const left = crds.left - wrapperTbl.left;
        topBtn.style = `left: ${crds.left - wrapperTbl.left}px`;
        leftBtn.style = `top: ${crds.top - wrapperTbl.top}px;`;
      });
    }
    //TableSet.tableEvents();
  }
  addRow() {
    const tbl = host.querySelector('table tbody');
    const tableTr = host.querySelector('tr');
    let tr = null;

    for (let row = 0; row < 1; row += 1) {
      tr = tableTr.cloneNode(true);
      tbl.appendChild(tr);
      // this.addListener();
    }
  }


  addColumn() {
    const tableTr = host.querySelectorAll('table tr');
    let td;

    for (let i = 0; i < tableTr.length; i += 1) {
      td = document.createElement('td');
      tableTr[i].appendChild(td);
      // this.addListener();
    }
  }
  deleteColumn() {
    const attribute = topBtn.cellIndex;
    let child = host.querySelectorAll('td');

    for (let i = 0; i < child.length; i +=1) {
      if ( child[i].cellIndex === attribute) {
        child[i].parentNode.removeChild(child[i]);
        
      }
      child = host.querySelectorAll('td');
      
    }
    
  }
  deleteRow() {
    let tableTr = host.querySelectorAll('tr');

    for (let i = 0; i < tableTr.length; i += 1) {
      if (tableTr[i].rowIndex == leftBtn.rowIndex) {
        tableTr[i].parentNode.removeChild(tableTr[i]);
        
      }
      tableTr = host.querySelectorAll('tr');
      
    }
    
  }
  myClassRemove() {
    leftBtn.classList.remove('disabled');
    topBtn.classList.remove('disabled');
  }
  tableEvents() {
    let tableTr = host.querySelectorAll('tr');
    let child = host.querySelectorAll('td');
    botBtn.addEventListener('click', this.addRow);
    rightBtn.addEventListener('click', this.addColumn);
    leftBtn.addEventListener('click', this.deleteRow); 
    topBtn.addEventListener('click', this.deleteColumn);
  
    table.addEventListener('mousemove', this.addListener);
    table.addEventListener('mouseenter', this.myClassRemove);
    table.addEventListener('mouseleave', () => {
      leftBtn.classList.add('disabled');
      topBtn.classList.add('disabled');
      this.ifOneRow();
      topBtn.addEventListener('mouseenter', () => {
        topBtn.classList.remove('disabled');
        
      });
      leftBtn.addEventListener('mouseenter', () => {
        leftBtn.classList.remove('disabled');
      });
    });
    leftBtn.addEventListener('mouseleave', () => {
      leftBtn.classList.add('disabled');
      this.ifOneRow();
    });
    topBtn.addEventListener('mouseleave', () => {
      topBtn.classList.add('disabled');
      this.ifOneRow();
    });
  }
}
const a = new TableSet();
//a.addColumn();
//a.addRow();
a.deleteColumn();
a.deleteRow();
a.tableEvents();
a.addListener();