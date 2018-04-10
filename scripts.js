var data = [
  {'id': 1, 'name': 'AngularJS', 'checked': false},
  {'id': 2, 'name': 'NodeJs', 'checked': true},
  {'id': 3, 'name': 'Javascript', 'checked': false}]

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
    lstItem.setAttribute('id', item.id)
    lstItem.innerHTML = btnCheck + item['name'] + btnRemove
    lstItem.onclick = () => {
      updateItemById(item.id)
    }
    list.appendChild(lstItem)
  }
}

var myText = document.getElementById('myText')
function addItem () {
  if (myText.value.trim()) {
    var id = Number(localStorage.getItem('storeId')) + 1
    localStorage.setItem('storeId', id)
    var newToDo = {'id': id, 'name': myText.value.trim(), 'checked': false}
    lstToDo.push(newToDo)
    createListResult(newToDo)
    localStorage.setItem('lstToDoStore', JSON.stringify(lstToDo))
    myText.value = ''
  }
}

function deleteItemById (idTodo) {
  Array.from(lstToDo).forEach((item, index) => {
    if (item['id'] === idTodo) {
      lstToDo.splice(index, 1)
      document.getElementById(item.id).style.display = 'none'
    }
  })
  localStorage.setItem('lstToDoStore', JSON.stringify(lstToDo))
}

function updateItemById (id) {
  Array.from(lstToDo).forEach((item) => {
    if (item['id'] === id) item['checked'] = !item['checked']
  })
  localStorage.setItem('lstToDoStore', JSON.stringify(lstToDo))
}

// Check item is DONE
list.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') ev.target.children[0].classList.toggle('checked')
})

myText.addEventListener('keypress', (ev) => {
  // is enter
  if (ev.keyCode === 13) addItem()
})
