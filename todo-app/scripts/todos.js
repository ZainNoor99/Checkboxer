'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function(e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#todo-form').addEventListener('submit', function(e){
    e.preventDefault()
    
    if(e.target.elements.newTodo.value.trim().length > 0) {
        todos.push({
            id: uuidv4(),
            text: e.target.elements.newTodo.value.trim(),
            completed: false
        })
        saveTodos(todos)
        e.target.elements.newTodo.value = ''
        renderTodos(todos, filters)
    }
    
    
})

document.querySelector('#hider').addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})