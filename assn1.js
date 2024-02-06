function toggleMode() 
{
    let body = document.body;
    let nav = document.querySelector('nav');

    if (body.classList.contains('dark-mode')) 
    {
        body.classList.remove('dark-mode');
        nav.setAttribute('data-mode', 'light');
    } 
    else 
    {
        body.classList.add('dark-mode');
        nav.setAttribute('data-mode', 'dark');
    }
}

function updateDynamicRole() 
{
    const roles = ['an Enthusiast', 'a Coder', 'a Problem Solver', 'a Learner'];
    const dynamicRoleElement = document.getElementById('dynamic-role');

    let currentIndex = 0;
    setInterval(() => {
        dynamicRoleElement.textContent = roles[currentIndex];
        currentIndex = (currentIndex + 1) % roles.length;
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function () 
{
    loadLikesAndComments('blog1');
    loadLikesAndComments('blog2');
    updateDynamicRole(); 
});



// function likePost(blogId) 
// {
//     let likes = getLikes(blogId) + 1;
//     setLikes(blogId, likes);
//     updateLikesDisplay(blogId);
// }
function likePost(blogId) 
{
    let likes = parseInt(localStorage.getItem(`${blogId}_likes`), 10) || 0;
    likes++;
    localStorage.setItem(`${blogId}_likes`, likes.toString());
    updateLikesDisplay(blogId);
}

// function addComment(blogId) 
// {
//     let commentInput = document.getElementById(`commentInput-${blogId}`);
//     let comment = commentInput.value.trim();

//     if (comment !== '') 
//     {
//         let comments = getComments(blogId);
//         comments.push(comment);
//         setComments(blogId, comments);
//         updateCommentsDisplay(blogId);
//         commentInput.value = ''; 
//     }
// }

function addComment(blogId) 
{
    let commentInput = document.getElementById(`commentInput-${blogId}`);
    let comment = commentInput.value.trim();
  
    if (comment !== '') 
    {
      let comments = localStorage.getItem(`${blogId}_comments`) || '';
      comments += comment + '\n';
      localStorage.setItem(`${blogId}_comments`, comments);
      updateCommentsDisplay(blogId);
      commentInput.value = '';
    }
  }

function loadLikesAndComments(blogId) 
{
    if (!localStorage.getItem(`${blogId}_likes`)) 
    {
        localStorage.setItem(`${blogId}_likes`, '0');
    }

    if (!localStorage.getItem(`${blogId}_comments`)) 
    {
        localStorage.setItem(`${blogId}_comments`, JSON.stringify([]));
    }

    updateLikesDisplay(blogId);
    updateCommentsDisplay(blogId);
}

function getLikes(blogId) 
{
    return parseInt(localStorage.getItem(`${blogId}_likes`), 10) || 0;
}

function setLikes(blogId, likes) 
{
    localStorage.setItem(`${blogId}_likes`, likes.toString());
}

function updateLikesDisplay(blogId) 
{
    let likes = getLikes(blogId);
    let likesDisplay = document.getElementById(`likes-${blogId}`);
    likesDisplay.textContent = `${likes} Likes`;
}

// function getComments(blogId) 
// {
//     let comments = localStorage.getItem(`${blogId}_comments`);
//     return JSON.parse(comments) || [];
// }

// function setComments(blogId, comments) 
// {
//     localStorage.setItem(`${blogId}_comments`, JSON.stringify(comments));
// }


function getComments(blogId) 
{
    let comments = localStorage.getItem(`${blogId}_comments`);
    return comments ? comments.split(',') : [];
}
  
  function setComments(blogId, comments) 
  {
    localStorage.setItem(`${blogId}_comments`, comments.join(','));
  }


function updateCommentsDisplay(blogId) 
{
    let comments = localStorage.getItem(`${blogId}_comments`) || '';
    let commentList = document.getElementById(`commentList-${blogId}`);
    commentList.innerHTML = '';
  
    comments.split('\n').forEach(comment => {
      let commentElement = document.createElement('div');
      commentElement.textContent = comment;
      commentList.appendChild(commentElement);
    });
  }

document.addEventListener('DOMContentLoaded', function () 
{
    updateDynamicRole();
});

