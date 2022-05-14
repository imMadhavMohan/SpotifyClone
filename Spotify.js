console.log("Welcome to Spotify");
// Initialize the var
let songId = 0;
let audioElement = new Audio('Spotify-list/s0.mp3');
let playClk = document.querySelector('.song-item .playClick');

let BgPic = document.querySelector('#currImg');
let masterPlay = document.querySelector('.masterPlayi');

// time update
let currTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let updateTime;

let volume_bar = document.querySelector('.volumeBar')
let myProgress = document.getElementById('progressBar');
let gif = document.getElementById('gif');

let masterSong = document.getElementById('masterSong');
let songItems = Array.from(document.getElementsByClassName('song-item'));

let isPlaying = false;
let prevSong = document.querySelector('.previ');
let nextSong = document.querySelector('.nexti');

let songs = [ {songName:"Khushi jab bi", filePath:"s0.mp3", coverPath:"song0.jpg"},
              {songName:"Dil tod ke", filePath:"s1.mp3", coverPath:"song1.jpg"},
              {songName:"Filhal", filePath:"s2.mp3", coverPath:"song2.jpg"},
              {songName:"Lut gye", filePath:"s3.mp3", coverPath:"song3.jpg"},
              {songName:"Nazm-nazm sa", filePath:"s4.mp3", coverPath:"song4.jpg"},
              {songName:"Teri mitti", filePath:"s5.mp3", coverPath:"song5.jpg"},
              {songName:"Zara si dil", filePath:"s6.mp3", coverPath:"song6.jpg"},
              {songName:"Tuje kitna chahne lage", filePath:"s7.mp3", coverPath:"song7.jpg"},
              {songName:"Pachtaoge", filePath:"s8.mp3", coverPath:"song8.jpg"},
              {songName:"Main Jis Din Bhula", filePath:"s9.mp3", coverPath:"song9.jpg"},
              {songName:"Janmo janam ka", filePath:"s10.mp3", coverPath:"song10.jpg"},
              {songName:"Khud ko tere pas", filePath:"s11.mp3", coverPath:"song11.jpg"},
              {songName:"Dil chahte ho kya jaan", filePath:"s12.mp3", coverPath:"song12.jpg"},
              {songName:"Jay jay kara", filePath:"s13.mp3", coverPath:"song13.jpg"},
              {songName:"Piya aye na", filePath:"s14.mp3", coverPath:"song14.jpg"},
              {songName:"Raaz aankhein teri", filePath:"s15.mp3", coverPath:"song15.jpg"} ];

// songItems.forEach((element, i)=>{ 
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
// })
          
// Random BackGround Color
function randomColor(){
    let r = Math.floor(Math.random()*256)+46;
    let g = Math.floor(Math.random()*256)+30;
    let b = Math.floor(Math.random()*256)+64;
    let rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

let bg = document.body;
setInterval(()=>{
  bg.style.backgroundColor=randomColor();
},3000);


const playIcon = document.querySelector('.song-item ');

console.log('hi');

playIcon.addEventListener('click',(e)=>{
  console.log(e.target);
});

// user timeSkip
myProgress.addEventListener('change', seekTo); // call by fun

// pause play
masterPlay.addEventListener('click', ()=>{
    playpauseTrack();
})

// vol
volume_bar.addEventListener('change', ()=>{
    setVolume();
})

nextSong.addEventListener('click', ()=>{    
    nextTrack();
})

prevSong.addEventListener('click', ()=>{    
    prevTrack();
})

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  audioElement.play();
  isPlaying = true;  
  masterSong.innerText = songs[songId].songName;  
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
}

function pauseTrack() {
  audioElement.pause();
  isPlaying = false;
  masterPlay.classList.add('fa-play-circle');
  masterPlay.classList.remove('fa-pause-circle');
  gif.style.opacity = 0;
}

function nextTrack() {
  if (songId < songs.length-1)
    songId += 1;
  else songId = 0;  
  loadTrack(songId);  
  playTrack();
}

function loadTrack(sId) {
    clearInterval(updateTime);
    resetValues(); // userDefine()    
    audioElement.src = `Spotify-List/${'s'+sId+'.mp3'}`;
    
    BgPic.src = `${songs[sId].coverPath}`; 
    masterSong.innerText = songs[sId].songName;  
    updateTime = setInterval(seekUpdate, 1000); // 1sec == 1000ms
    audioElement.addEventListener("ended", nextTrack);    
}

function prevTrack() {
  if (songId > 0)
    songId -= 1;
  else songId = songs.length-1;  
  loadTrack(songId);
  playTrack();
}

function seekTo() {
  let seekto = audioElement.duration * (myProgress.value / 100);
  audioElement.currentTime = seekto;
}

function resetValues() {
  currTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  myProgress.value = 0;
}

function setVolume() {
  audioElement.volume = volume_bar.value / 100;
}

loadTrack(songId); // load 1st index

function seekUpdate(){
    let seekPosition = 0;

  if (!isNaN(audioElement.duration)) { // duration always in number so !false = true
    seekPosition = audioElement.currentTime * (100 / audioElement.duration);

    myProgress.value = seekPosition;
    // currentTime gives or set time in sec
    let currentMin = Math.floor(audioElement.currentTime / 60);
    let currentSec = Math.floor(audioElement.currentTime - currentMin * 60);

    let durationMin = Math.floor(audioElement.duration / 60);
    let durationSec = Math.floor(audioElement.duration - durationMin * 60);

    if (currentSec < 10) { currentSec = "0" + currentSec; }
    if (durationSec < 10) { durationSec = "0" + durationSec; }

    if (currentMin < 10) { currentMin = "0" + currentMin; }
    if (durationMin < 10) { durationMin = "0" + durationMin; }

    currTime.textContent = currentMin + ":" + currentSec;
    totalDuration.textContent = durationMin + ":" + durationSec;
  }
}