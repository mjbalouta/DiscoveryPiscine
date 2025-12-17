/*creates a cookie in the browser (name - the name of the cookie;
value - the content to store in the cookie; days - how many days
until it expires*/
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + encodeURIComponent(value) +
        ";expires=" + date.toUTCString() + ";path=/";
}

/*searches for the cookie we want in the cookie's array:
loops through each cookie, separates the key and value and then
checks if the key matches the name (cookie we want) - if the key
matches the name passed to the function, we found the cookie we
want, if the cookie doesn't exist it returns null*/
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

/*gets all to dos in the current list and loops over then, pushing
them into the todos list created and then setCookie saves this string
created for 7 days */
function saveTodos() {
    const items = document.querySelectorAll('#ft_list div');
    const todos = [];

    items.forEach(item => {
        todos.push(item.textContent);
    });

    setCookie('todos', todos.join('||'), 7);
}

/*button click logic*/
const button = document.getElementById('button');
button.addEventListener('click', function () {
    const input = prompt("Enter new to do:");
    if (!input) return;

    createTodo(input);
    saveTodos();
});

/*creates the new div for the new to do that was added
when the button was clicked*/
const list = document.getElementById('ft_list');
function createTodo(text) {
    const newToDo = document.createElement('div');
    newToDo.textContent = text;

    newToDo.addEventListener('click', function () {
        if (confirm("Do you want to remove this TO DO?")) {
            newToDo.remove();
            saveTodos();
        }
    });

    list.prepend(newToDo);
}

/*when the page loads, this function loads the cookies
saved previously*/
function loadTodos() {
    const saved = getCookie('todos');
    if (!saved) return;

    saved.split('||').forEach(todo => createTodo(todo));
}

loadTodos();

