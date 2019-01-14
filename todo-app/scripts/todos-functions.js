'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove a todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toogle Todo
const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
    }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        if (filters.hideCompleted) {
            return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase())) && !(todo.completed)
        } else {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
        }
        
    })

    document.querySelector('#todos').innerHTML = ''

    const todosLeft = filteredTodos.filter((todo) => !todo.completed)
    
    document.querySelector('#todos').appendChild(generateSummaryDOM(todosLeft))
    
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessageElement = document.createElement('p')
        emptyMessageElement.classList.add('empty-message')
        emptyMessageElement.textContent = 'You have no to-dos'
        document.querySelector('#todos').appendChild(emptyMessageElement)
    }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const delButton = document.createElement('button')
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    const p = document.createElement('span')

    // Setup checkbox
    containerElement.appendChild(checkBox)
    checkBox.checked = todo.completed
    checkBox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup todo text
    p.textContent = todo.text
    containerElement.appendChild(p)

    // Setup container
    todoElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    todoElement.appendChild(containerElement)

    // Setup del button
    delButton.textContent = 'remove'
    delButton.classList.add('button', 'button--text')
    todoElement.appendChild(delButton)
    delButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    
    
    return todoElement
}

// Get the DOM elements for list summary
const generateSummaryDOM = (todosLeft) => {
    const todosLeftMessage = document.createElement('h2')
    todosLeftMessage.classList.add('list-title')

    todosLeftMessage.textContent = todosLeft.length === 1 ? `You have ${todosLeft.length} todo left` : `You have ${todosLeft.length} todos left`

    return todosLeftMessage
}