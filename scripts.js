function Todo (id, name, check) {
  this.id = id
  this.name = name
  this.check = check
}

var todos = []

window.onload = init
var localStorage = window.localStorage

var ul = document.createElement('ul')
var result = document.querySelector('.result')
result.appendChild(ul)
var list = document.querySelector('ul')

// store for genera id
if (!localStorage.getItem('storeId')) localStorage.setItem('storeId', 1)
var idTodo = localStorage.getItem('storeId')

function init () {
  getTodoItems()
}

function firstLoadTodo () {
  var angular = new Todo(idTodo, 'AngularJS', false)
  todos.push(angular)
  var key = 'todo' + idTodo
  localStorage.setItem(key, JSON.stringify(angular))
}

function getTodoItems () {
  if (localStorage) {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)
      if (key.substring(0, 4) === 'todo') {
        var item = JSON.parse(localStorage.getItem(key))
        todos.push(item)
      }
    }
    if (todos.length === 0) firstLoadTodo()
  }
  addTodosToPage()
}

function addTodosToPage () {
  if (todos) {
    for (var i = 0; i < todos.length; i++) {
      addTodoToPage(todos[i])
    }
  }
}

// Create item
function addTodoToPage (item) {
  if (item) {
    var chClass = ['fa fa-check'].join(' ')
    if (item['check']) chClass += ' checked'
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
    var newToDo = new Todo(id, myText.value.trim(), false)
    todos.push(newToDo)
    addTodoToPage(newToDo)
    var key = 'todo' + id
    localStorage.setItem(key, JSON.stringify(newToDo))
    myText.value = ''
  }
}

function deleteItemById (id) {
  localStorage.removeItem('todo' + id)
  document.getElementById(id).style.display = 'none'
}

function updateItemById (id) {
  var key = 'todo' + id
  var todoUpdate = JSON.parse(localStorage.getItem(key))
  if (todoUpdate) {
    todoUpdate['check'] = !todoUpdate['check']
    localStorage.setItem('todo' + id, JSON.stringify(todoUpdate))
  }
}

// Check item is DONE
list.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') ev.target.children[0].classList.toggle('checked')
})

myText.addEventListener('keypress', (ev) => {
  // is enter
  if (ev.keyCode === 13) addItem()
})
