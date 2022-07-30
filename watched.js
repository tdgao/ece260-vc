function add_watchedListener(){
  document.querySelectorAll('h1').forEach(h1 => {
    h1.addEventListener('click', () =>{
    
      if ( !isWatched(h1) ){
        h1.classList.add('watched');
        addWatchedText(h1);
      } else {
        h1.classList.remove('watched');
        removeWatchedText(h1);
      }
      
      setWatched();
    });
  });

}


function addWatchedText(h1){
  const span = document.createElement('span');
  // span.innerText = 'watched';
  h1.appendChild(span);
}
function removeWatchedText(h1){
  const span = h1.querySelector('span')
  if (span) span.remove();
}


function isWatched(h1){
  return h1.classList.contains('watched');
}

function setWatched(){
  let watched = {list:[]};

  document.querySelectorAll('h1').forEach((h1, i) => {
    watched.list[i] = isWatched(h1);
  });

  setWatchedInStorage(watched);
}

function setWatchedInStorage(obj){
  localStorage.setItem('watched', JSON.stringify(obj));
}

function getWatched(){
  let obj = localStorage.getItem('watched');
  obj = JSON.parse(obj);
  return obj;
}


function jumpToLastWatched(){
  const allh1 = document.querySelectorAll('h1');
  for (const h1 of allh1) {
    if (!isWatched(h1)){
      h1.scrollIntoView(true);
      return;
    }
  }
}




function init(){
  add_watchedListener();

  // init prev watched
  const watchedList = getWatched();
  if (watchedList === undefined) return;

  document.querySelectorAll('h1').forEach((h1, i) => {
    if ( watchedList.list[i] ){
      h1.classList.add('watched');
      addWatchedText(h1);
    } else {
      h1.classList.remove('watched');
      removeWatchedText(h1);
    }
  });

  // setting all links to open to new tab
  document.querySelectorAll('a').forEach(a => {
    a.setAttribute('target',"_blank");
  });


  window.onload = jumpToLastWatched;
}
init();