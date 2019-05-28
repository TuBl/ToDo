/* global $ */
$(document).ready(function(){
    
    $.getJSON("/api/todos")
    .then(addToDos)
    .catch(function(err){
        if(err){
            console.log(err);
        }
    })
    
    $('#todoInput').keypress(function(event){
       if(event.which == 13){
           createToDo();
       } 
    });
    
    $('.list').on('click', 'li', function(){
       updateToDo($(this)); 
    });
    
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        deleteToDo($(this).parent());
    });
});

function addToDo(todo){
        var newToDo = $('<li class = "task">'  + todo.name  +'<span>x</span></li>');
        newToDo.data('id', todo._id);
        newToDo.data('completed', todo.completed);
         if(todo.completed){
             newToDo.addClass("done");
         }
         
        $('.list').append(newToDo);
}

function addToDos(todos){
    //add todos to page here
    todos.forEach(function(todo){
        addToDo(todo);
    });
}


function createToDo(todo){
    //send requst to create a new todo
    var Input = $('#todoInput').val();
    $.post('/api/todos', {
        name: Input
    })
    .then(function(newToDo){
        $('#todoInput').val('');
        addToDo(newToDo);
    })
    .catch(function(err){
        console.log(err);
    })
}

function deleteToDo(todo){
       var clickedId = todo.data('id');
       var deleteUrl = '/api/todos/' + clickedId;
        $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function(data){
            todo.remove();
        })
        .catch(function(err){
            if(err){
                console.log(err);
            }
        });
}

function updateToDo(todo){
    var updatedUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updatedData = {completed: isDone};
    
     $.ajax({
         method: 'PUT',
         url: updatedUrl,
         data: updatedData
     })
     .then(function(updatedToDo){
         todo.toggleClass('done');
         todo.data('completed', isDone);
     })
}