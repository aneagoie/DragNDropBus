var dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';

  return false;
}

function handleDragEnter(e) {
  // this is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  // this is the previous target element.
  this.classList.remove('over');
}

function handleDrop(e) {
  // this is current target element.
  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same item we're dragging.
  if (dragSrcEl != this) {
    // HTML to the HTML of the item we dropped on.
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    this.classList.add('dragged');
    dragSrcEl.classList.remove('dragged');

    if(dragSrcEl.textContent) {
    // If content-full bus windo is changed with a div with content
      dragSrcEl.classList.add('over');
      dragSrcEl.classList.add('dragged');
    }

    if(!!this.textContent) {
    // This element will become draggable
      this.setAttribute("draggable", "true");
      this.style.cursor = 'pointer';
      this.style.background = 'url("images/icon_bg.svg") no-repeat center #C6C6C6';
      this.style.backgroundSize = "cover";
    }
    if(!dragSrcEl.textContent) {
    // This element will not be draggable
      dragSrcEl.removeAttribute("draggable");
      dragSrcEl.style.cursor = 'default';
      dragSrcEl.style.background = "white";
    }

  }

  // Handle Logic to see if Creativity, Enthusiasm and Generous are selected. Used jQuery for this section just to change it up
  var firstDrop =  $('#drop-1').find('.text').text();
  var secondDrop =  $('#drop-2').find('.text').text();
  var thirdDrop =  $('#drop-3').find('.text').text();
  if (firstDrop && secondDrop && thirdDrop) {
    var firstAnswer = firstDrop === "Be Generous" || firstDrop === "Honor Creativity" || firstDrop === "Be Enthusiastic";
    var secondAnswer = secondDrop === "Be Generous" || secondDrop === "Honor Creativity" || secondDrop === "Be Enthusiastic";
    var thirdAnswer = thirdDrop === "Be Generous" || thirdDrop === "Honor Creativity" || thirdDrop === "Be Enthusiastic";
    if (firstAnswer && secondAnswer && thirdAnswer) {
      console.log("You're Awesome!");
    }
  }

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

  [].forEach.call(items, function (item) {
    item.classList.remove('over');
  });
}

// handle events on the draggable item section.
var items = document.querySelectorAll('.draggable-item');
[].forEach.call(items, function(item) {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragend', handleDragEnd, false);
  item.addEventListener('dragenter', handleDragEnter, false);
  item.addEventListener('dragover', handleDragOver, false);
  item.addEventListener('dragleave', handleDragLeave, false);
  item.addEventListener('drop', handleDrop, false);
});

// handle events on the droppable container section.
var items2 = document.querySelectorAll('.droppable-container');
[].forEach.call(items2, function(item) {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragend', handleDragEnd, false);
  item.addEventListener('dragenter', handleDragEnter, false);
  item.addEventListener('dragover', handleDragOver, false);
  item.addEventListener('dragleave', handleDragLeave, false);
  item.addEventListener('drop', handleDrop, false);
});




