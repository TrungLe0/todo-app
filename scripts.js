var data = [
  { 'id': 1, 'name': 'AngularJS', 'checked': false},
  { 'id': 2, 'name': 'NodeJs', 'checked': true},
  { 'id': 3, 'name': 'Javascript', 'checked': false}]


var localStorage = window.localStorage
// store for genera id
if (!localStorage.getItem('storeId')) localStorage.setItem('storeId', 4)
// store lstToDoArr into lstToDoStore
var lstToDo = JSON.parse(localStorage.getItem('lstToDoStore'))
if (lstToDo === null || lstToDo.length === 0) {
  localStorage.setItem('lstToDoStore', JSON.stringify(data))
  lstToDo = JSON.parse(localStorage.getItem('lstToDoStore'))
}

// Create block result
var ul = document.createElement('ul')
var result = document.querySelector('.result')
result.appendChild(ul)
var list = document.querySelector('ul')

if (lstToDo) {
  for (var i = 0; i < lstToDo.length; i++) {
    createListResult(lstToDo[i])
    // removeItem()
  }
}

// Create item
function createListResult (item) {
  if (item) {
    var chClass = ['fa fa-check'].join(' ')
    if (item['checked']) chClass += ' checked'
    var btnCheck = '<span class="' + chClass + '" aria-hidden="true"></span>'
    var btnRemove = '<span class="fa fa-trash-o btn-remove" onclick="deleteItemById(' + item.id + ')" aria-hidden="true"></span>'
    var lstItem = document.createElement('li')
    lstItem.innerHTML = btnCheck + item['name'] + btnRemove
    lstItem.onclick = () => {
      updateItemById(item.id)
    }
    list.appendChild(lstItem)
  }
}

var myText = document.getElementById('myText')
function addItem () {
  var id = Number(localStorage.getItem('storeId')) + 1
  localStorage.setItem('storeId', id)
  var newToDo = {'id': id, 'name': myText.value.trim(), 'checked': false}
  lstToDo.push(newToDo)
  createListResult(newToDo)
  localStorage.setItem('lstToDoStore', JSON.stringify(lstToDo))
  myText.value = ''
  removeList = document.getElementsByClassName('btn-remove')
  // removeItem()
}

//
function deleteItemById (idTodo) {
  lstToDo.forEach((item, index) => {
    if (item['id'] === idTodo) lstToDo.splice(index, 1)
  })
  localStorage.setItem('lstToDoStore', JSON.stringify(lstToDo))
}

function updateItemById (id) {
  lstToDo.forEach((item) => {
    if (item['id'] === id) item['checked'] = !item['checked']
  })
  localStorage.setItem('lstToDoStore', JSON.stringify(lstToDo))
}

// Remove Item
// function removeItem () {
//   var del = document.getElementsByClassName('btn-remove')
//   for (var i = 0; i < del.length; i++) {
//     del[i].onclick = function () {
//       var itemDel = this.parentElement
//       itemDel.style.display = 'none'
//     }
//   }
// }

// Check item is DONE
list.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') ev.target.children[0].classList.toggle('checked')
})

myText.addEventListener('keypress', (ev) => {
  // is enter
  if (ev.keyCode === 13) addItem()
})

var removeList = document.getElementsByClassName('btn-remove')
for (let i = 0; i < removeList.length; i++) {
  removeList[i].addEventListener('click', () => {
    removeList[i].parentElement.style.display = 'none'
  })
}
