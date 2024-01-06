let tracks = [  
    {url:'./audio/Ghostrifter Official - Hot Coffee.mp3' , cover: './immagini/cover-1.jpg' , artist:'Ghostrifter', title: 'Hot Coffee'}, 
    
    {url:'./audio/Ghostrifter Official - Merry Bay.mp3' , cover: './immagini/cover-2.jpg' , artist:'Ghostrifter', title: 'Merry Bay'},
    
    {url:'./audio/Ghostrifter Official - Midnight Stroll.mp3' , cover: './immagini/cover-3.jpg' , artist:'Ghostrifter', title: 'Midnight Stroll'},
    
    {url:'./audio/Ghostrifter Official - Still Awake.mp3' , cover: './immagini/cover-4.jpg' , artist:'Ghostrifter', title: 'Still Awake'},
    
    {url:'./audio/Ghostrifter Official - Afternoon Nap.mp3' , cover: './immagini/cover-5.jpeg' , artist:'Ghostrifter', title: 'Afternoon Nap'},
    
    {url:'./audio/Ghostrifter Official - Demised To Shield.mp3' , cover: './immagini/cover-6.jpg' , artist:'Ghostrifter', title: 'Demised'},
    
    {url:'./audio/Ghostrifter Official - Departure.mp3' , cover: './immagini/cover-7.jpg' , artist:'Ghostrifter', title: 'Departure'},
    
    {url:'./audio/Ghostrifter Official - Mellow Out.mp3' , cover: './immagini/cover-8.jpg' , artist:'Ghostrifter', title: 'Mellow Out'},
    
    {url:'./audio/Ghostrifter Official - On My Way.mp3' , cover: './immagini/cover-9.jpg' , artist:'Ghostrifter', title: 'On My Way'},
    
    {url:'./audio/Ghostrifter Official - Soaring.mp3' , cover: './immagini/cover-10.jpg' , artist:'Ghostrifter', title: 'Soaring'},
    
    {url:'./audio/Ghostrifter Official - Subtle Break.mp3' , cover: './immagini/cover-11.jpeg' , artist:'Ghostrifter', title: 'Subtle Break'},
    
    {url:'./audio/Ghostrifter Official - Transient.mp3' , cover: './immagini/cover-12.jpeg' , artist:'Ghostrifter', title: 'Transient'},
    
    {url:'./audio/Ghostrifter Official - Simplicit Nights.wav' , cover: './immagini/cover-13.jpeg' , artist:'Ghostrifter', title: 'Simplicit Nights'},
    
    {url:'./audio/Ghostrifter Official - Morning Routine.mp3' , cover: './immagini/cover-14.jpg' , artist:'Ghostrifter', title: 'Morning Routine'}
    
    ]


    let track = document.querySelector('#track')
    // azioni bottoni
    let playBtn = document.querySelector('#play-btn')
    let pauseBtn = document.querySelector('#pause-btn')
    let prevBtn = document.querySelector('#prev-btn')
    let nextBtn = document.querySelector('#next-btn')
    let sidebarToggler = document.querySelector('#sidebar-toggler')
   
    // dettagli canzone
    let trackArtist = document.querySelector('#track-artist')
    let trackTitle = document.querySelector('#track-title')
    let trackCover = document.querySelector('#track-cover')

    let currentTime = document.querySelector('#current-time')
    let totalTime = document.querySelector('#total-time')

  


    // volume
    let volumeBtn = document.querySelector('#volume-btn') ///////////////////// Pannello volume
    let volumeBar = document.querySelector('.volume-bar') ///////////////////// Wrapper per lo slider del volume
    let volumeIcon = document.querySelector('#volume-icon') /////////////////// Icona volume (pulsante "mute")
    let volumeSlider = document.querySelector('#volume-slider') /////////////// Slider volume (totale, height 100%)
    let volumeCursor = document.querySelector('#volume-cursor') /////////////// Slider volume (attuale, 0% < height < 100%)
    let volumeCursorHandle = document.querySelector('#volume-cursor-handle') // Dot su slider volume (per Volume on Drag)


    
    
    
    let playing = false
    let currentTrack = 0
    let volume = track.volume
    
    
    
    function updateVolumeCursor(){
        volumeCursor.style.height = (100 - track.volume * 100) + '%'   
        if(track.volume >= 0.50) {volumeIcon.className = "fas fa-volume-up"} else
        if(track.volume > 0.00) {volumeIcon.className = "fas fa-volume-down"} else
        if(track.volume == 0.00) {volumeIcon.className = "fas fa-volume-mute"}
    
    }
    
    // attiva il play tramite keydown spazio
    document.body.addEventListener('keydown', function(event){
        if (event.keyCode == 32){
            play()
        }
    })





//Chiudi la playlist al click sul body
document.addEventListener('click', function(evt){
    let targetElement=evt.target
    if((targetElement == sidebar.parentElement) && (targetElement!=sidebarToggler) && sidebar.classList.contains('open')){
        sidebar.classList.remove('open')
    }
})



//Apri la playlist all'avvicinarsi del mouse
function dock(e){
    if (e.pageX < 50){
        sidebar.classList.add('open')
    }
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



    
    // ~~~~ PANNELLO VOLUME ~~~~~~~~~~~~~~~~~~ //
    //Aggiorna volume al caricamento della pagina
    updateVolumeCursor()
    //Pulsante VOLUME (MUTE)
    volumeIcon.addEventListener('click', function(){
        if(track.volume){
            track.volume = 0;
        // volumeIcon.classList.remove('fa-volume-up')
        // volumeIcon.classList.add('fa-volume-mute')
        updateVolumeCursor()  
    } else{
        track.volume =  volume
        // volumeIcon.classList.add('fa-volume-up')
        // volumeIcon.classList.remove('fa-volume-mute')
        updateVolumeCursor()
    }
})
//Slider VOLUME (on Wheel)
volumeBtn.addEventListener('wheel', function(event){
    //console.log (event.wheelDeltaY*0.0001) //Deubg purposes only
    if (((track.volume + event.wheelDeltaY*0.0001)<=1)&&((track.volume + event.wheelDeltaY*0.0001)>=0)){
        track.volume += event.wheelDeltaY*0.0001
        if (track.volume<0.05){
            track.volume = 0
        }
        volume = track.volume
        updateVolumeCursor()
    }
})
//Slider VOLUME (on Drag/Drop)
let grabbedVol = false
function grabVolHandle(e){
    grabbedVol = true
    let x = e.offsetY;
    if (x > 90) track.volume = 0
    if (x-6 <= 85 && x-6 >= 0){
        if (x-6>=84){
            track.volume = 0
        }
        if (x-6 <= 1){
            track.volume = 1
        }
        let position = ((-1 * (x-6)) / volumeSlider.offsetHeight) + 1
        console.log(position)
        track.volume = position
        updateVolumeCursor()
    }
}
function releaseVolHandle(e){
    grabbedVol = false
}
function dragVolHandle(e){
    if(grabbedVol){

        let x = e.offsetY
        let position = ((-1 * (x)) / volumeBar.offsetHeight) + 1
        console.log('position: ' + position)
        if (position<0.05){
            track.volume = 0
        } else if (position >0.95){
            track.volume = 1
        } else{
            track.volume = position;
        }
        updateVolumeCursor()
        console.log(track.volume)
    }
    }






    function play(){
        if(!playing){
            playBtn.classList.add('d-none')
            pauseBtn.classList.remove('d-none')
            trackCover.classList.add('active')
            track.play()
            playing = true
        } else {
            playBtn.classList.remove('d-none')
            pauseBtn.classList.add('d-none')
            trackCover.classList.remove('active')

            track.pause()
            playing = false

        }
        

    }


    function next(){
        currentTrack++
       
        if(currentTrack > tracks.length -1){
            currentTrack=0;
        }

        changeTrackDetails()
        changePlaylistActive()

        

        if(playing){
            playing = false
            play()
        }
 
    }

    function prev(){
        currentTrack--
       
        if(currentTrack < 0){
            currentTrack= tracks.length-1;
        }

        changeTrackDetails()
        changePlaylistActive()

        


        if(playing){
            playing = false
            play()
        }
 
    }

    function openSidebar (){
        let sidebar = document.querySelector('#sidebar')
        sidebar.classList.toggle('open')
    }


    function changeTrackDetails(){
        track.src = tracks[currentTrack].url
        trackArtist.innerHTML = tracks[currentTrack].artist
        trackTitle.innerHTML = tracks[currentTrack].title
        trackCover.src = tracks[currentTrack].cover
    }

    function changePlaylistActive(){
        let tracklistCards = document.querySelectorAll('.track-card')
        tracklistCards.forEach((card, index) => {
            if(index == currentTrack){
                card.classList.add('active')
            } else {
            card.classList.remove('active')
            }
        })
    }



    function populateTracklist(){
        let wrapper = document.querySelector('#tracklist-wrapper')

        tracks.forEach((track, index) => {
            let card = document.createElement('div')
            card.classList.add('col-12')

            card.innerHTML =
            `
            
                <div class="d-flex align-items-center justify-content-between px-4 py-2 border-b-main track-card"" >
                      <img class="thumbnail" src="${track.cover}" alt="" srcset="">
                       <div>
                          <h5 class="mb-0">${track.artist}</h5>
                          <p class="mb-0">${track.title}</p>
                       </div>
                       <i data-track="${index}"class="fas fa-record-vinyl fs-1 pointer playlist-play"></i>
                     
                </div>
            
            
            
            `
            wrapper.appendChild(card)
        })
        let playBtns = document.querySelectorAll('.playlist-play')

        playBtns.forEach(btn =>{
            btn.addEventListener('click', function(){
                let selectedTrack = btn.getAttribute('data-track')
                currentTrack = selectedTrack;

                changeTrackDetails()
                changePlaylistActive()

                if(playing){
                    playing=false;
                    play()
                }


                let tracklistCards = document.querySelectorAll('.track-card')
                tracklistCards.forEach(card => {
                    card.classList.remove('active')
                })
                btn.parentNode.classList.add('active')
            })
        })


    }






    playBtn.addEventListener('click', play)
    pauseBtn.addEventListener('click', play)
    nextBtn.addEventListener('click',next)
    prevBtn.addEventListener('click',prev)
    track.addEventListener('ended', next)
    sidebarToggler.addEventListener('click', openSidebar)

    setInterval(function(){

        currentTime.innerHTML = formatTime(track.currentTime)
        totalTime.innerHTML = formatTime(track.duration)
    },999)



    function formatTime(sec){
        let minutes = Math.floor(sec/60)
        let seconds = Math.floor(sec - minutes*60)
        if(seconds<10){
            seconds=`0${seconds}`
        }
        return `${minutes}.${seconds}`
    }

    populateTracklist()
    changeTrackDetails()
    changePlaylistActive()


