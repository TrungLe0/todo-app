var lstToDo = ['AngularJS', 'NodeJS', 'JavaScript']

// Create block result
var ul = document.createElement('ul')
var result = document.querySelector('.result')
result.appendChild(ul)
var list = document.querySelector('ul')

for (var i = 0; i < lstToDo.length; i++) {
  createListResult(lstToDo[i])
  removeItem()
}

// Create item
function createListResult (item) {
  if (item) {
    var btnRemove = '<span class="fa fa-trash-o btn-remove" aria-hidden="true"></span>'
    var lstItem = document.createElement('li')
    lstItem.innerHTML = item + btnRemove
    list.appendChild(lstItem)
  }
}

var myText = document.getElementById('myText')
function addItem () {
  // lstToDo.push(myText.value);
  createListResult(myText.value.trim())
  myText.value = ''
  removeItem()
}

// remove item access to lstToDo

// function removeByValue(val){
//   for (var i = 0; i < lstToDo.length; i++) {
//     if(lstToDo[i] === val) {
//       lstToDo.splice(i,1);
//       i--;
//     }
//   }
//   return lstToDo;
// }
//
// function deleteItem(item){
//   removeByValue(item.textContent);
// }

// Remove Item
function removeItem () {
  var del = document.getElementsByClassName('btn-remove')
  for (var i = 0; i < del.length; i++) {
    del[i].onclick = function () {
      var itemDel = this.parentElement
      itemDel.style.display = 'none'
    }
  }
}

// Check item is DONE
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked')
  }
})

myText.addEventListener('keypress', function (ev) {
  if (ev.keyCode === 13) { // is enter
    addItem()
  }
})
