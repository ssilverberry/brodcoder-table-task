class btn_fx {
    constructor() {
       btn_top = null;
       btn_right = null;
       btn_bot = null;
       btn_left = null;
     }
   };
   
   btn_fx.btn_top = document.querySelector('.buttons_top');
   btn_fx.btn_right = document.querySelector('.buttons_right');
   btn_fx.btn_bot = document.querySelector('.buttons_bot');
   btn_fx.btn_left = document.querySelector('.buttons_left');
   btn_fx.btn_left.classList.add('disabled');
   btn_fx.btn_top.classList.add('disabled');
   
   btn_fx.addRow_fx = function() {
     let table = document.querySelector('table');
     let table_tr = document.querySelector('table tr');
     let tr = null;
     let td = null;
     
     for (let row = 0; row < 1; row++) {
       tr = document.createElement('tr');
       for(let cell = 0; cell < table_tr.cells.length; cell++) {
           td = document.createElement('td');
           tr.appendChild(td);
       }
       table.appendChild(tr);
       addListener();
       if_one_row();
     }
   };
   
   btn_fx.addColumn_fx = function() {
     let table = document.querySelector('.table'), table_tr = document.querySelectorAll('table tr'),
         td;
     for(let i = 0; i < table_tr.length; i++) {
       td = document.createElement('td');
       table_tr[i].appendChild(td);
       addListener();
        if_one_row();
     }
   }
   
   btn_fx.deleteColumn_fx = function () {
     let table = document.querySelector('table'), table_tr = document.querySelectorAll('table tr'), j;
     for (j = 0; j < table_tr.length; j++) {
       if_one_row();
       table_tr[j].deleteCell(-1);
     } 
   }
   
   btn_fx.deleteRow_fx = function() {
     let table = document.querySelector('table'), row;
     for (row = 0; row < 1; row++) {
       if_one_row();
       table.deleteRow(-1);
     }
   }
   
   var table = document.querySelector('table');
   
   var move = function() {  
     table = document.querySelector('table');
     let crd = this.getBoundingClientRect();
     let tbl = document.querySelector('table').getBoundingClientRect();
     let tbl_wrapper = document.querySelector('.tb-wrapper').getBoundingClientRect();
    
     let coords = {
       top: (tbl.height+5),
       left: (crd.left - tbl_wrapper.left)
     } 
     tbl.height = tbl.height;
     btn_fx.btn_bot.style = `left: ${coords.left}px; top: ${tbl.height+5}px;`;
     btn_fx.btn_top.style = `left: ${coords.left}px;`;
     btn_fx.btn_right.style = `top: ${crd.top - tbl_wrapper.top}px; left: ${tbl.width + 5}px`;
     btn_fx.btn_left.style = `top: ${crd.top - tbl_wrapper.top}px;`;
   }
   var addListener = function() {
     let tr_td = document.querySelectorAll('tr td');
     for( let i = 0; i < tr_td.length; i++){
       tr_td[i].addEventListener('mouseover', move);
       tr_td = document.querySelectorAll('tr td');
       if_one_row();
     }
   }
   
   
   function if_one_row() {
     let tr_td = document.querySelectorAll('table tr');
    
     if(tr_td.length < 3) {
       btn_fx.btn_left.style = `display: none`;
     }
     if(tr_td[0].cells.length <= 1)
       btn_fx.btn_top.style = 'display: none';
   }
   
   btn_fx.btn_bot.addEventListener('click', btn_fx.addRow_fx);
   btn_fx.btn_right.addEventListener('click', btn_fx.addColumn_fx);
   btn_fx.btn_left.addEventListener('click', if_one_row);
   btn_fx.btn_left.addEventListener('click', btn_fx.deleteRow_fx);
   btn_fx.btn_top.addEventListener('click', if_one_row);
   btn_fx.btn_top.addEventListener('click', btn_fx.deleteColumn_fx);
   table.addEventListener('mousemove', addListener);
   addListener();
   table.addEventListener('mousemove', () => {
     btn_fx.btn_left.classList.remove('disabled');
     btn_fx.btn_top.classList.remove('disabled');
   
   });