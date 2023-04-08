/**
 * Render Songs
 * 2. Scroll Top
 * 3.Play/Pause/Seek
 * 4CD rotate
 * 5Next/ Prev
 * 6Random
 * 7Next/ Repeat when ended
 * 8Active song
 * 9Scroll active song into view
 * 10Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STROAGE_KEY = 'F8_PLAYER'

const heading = $('header h2');
const cdthumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const btnPlay = $('.btn-toggle-play');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const progress = $('.progress');
const player = $('.player');
const btnRandom = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');
const app = {
    
    isPlaying: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STROAGE_KEY)) || {},
    songs: [
        {
            name: 'Mùi hương',
            singer: 'Anh Khang',
            path: 'songs/mui-huong.mp3',
            image: 'images/mui-huong.png'
        },
        {
            name: 'Time machine',
            singer: '',
            path: 'songs/time-machine.mp3',
            image: 'images/time-machine.png'
        },
        {
            name: 'Can we love',
            singer: 'Obito',
            path: 'songs/can-we-love.mp3',
            image: 'images/can-we-love.png'
        },
        {
            name: 'Chỉ một đêm nữa thôi',
            singer: 'MCK',
            path: 'songs/chi-mot-dem-nua-thoi.mp3',
            image: 'images/chi-mot-dem-nua-thoi.png'
        },
        {
            name: 'Cỏ may',
            singer: 'Hào',
            path: 'songs/co-may.mp3',
            image: 'images/co-may.png'
        },
        {
            name: 'Đôi lời',
            singer: 'Hoàng Dũng',
            path: 'songs/doi-loi.mp3',
            image: 'images/doi-loi.png'
        },
        {
            name: 'Em đợi ai',
            singer: 'Phúc',
            path: 'songs/em-doi-ai.mp3',
            image: 'images/em-doi-ai.png'
        },
        {
            name: 'Liệu',
            singer: 'Quýt Nho',
            path: 'songs/lieu.mp3',
            image: 'images/lieu.png'
        },
        {
            name: 'MASCARA',
            singer: 'Chillies',
            path: 'songs/mascara.mp3',
            image: 'images/mascara.png'
        },
        {
            name: 'Một nhà',
            singer: 'Da LAB',
            path: 'songs/mot-nha.mp3',
            image: 'images/mot-nha.png'
        },
        {
            name: 'Mùa xuân của anh',
            singer: '',
            path: 'songs/mua-xuan-cua-anh.mp3',
            image: 'images/mua-xuan-cua-anh.png'
        },
        {
            name: 'Hồi kết',
            singer: 'Hà Nhi',
            path: 'songs/hoi-ket.mp3',
            image: 'images/hoi-ket.png'
        },
        {
            name: 'Your Smile',
            singer: 'Your Smile',
            path: 'songs/your-smile.mp3',
            image: 'images/your-smile.png'
        },
        {
            name: 'Cuộc gọi về nhà',
            singer: 'Orange',
            path: 'songs/cuoc-goi-ve-nha.mp3',
            image: 'images/cuoc-goi-ve-nha.png'
        },
        {
            name: 'Mùa mưa ngâu nằm cạnh',
            singer: 'Vũ',
            path: 'songs/mua-mua-ngau-nam-canh.mp3',
            image: 'images/mua-mua-ngau-nam-canh.png'
        },
        {
            name: 'Anh thương em nhất mà',
            singer: 'Lã. x Log x TiB',
            path: 'songs/anh-thuong-em-nhat-ma.mp3',
            image: 'images/anh-thuong-em-nhat-ma.png'
        },
        {
            name: 'Em không sai chúng ta sai',
            singer: 'Erik',
            path: 'songs/em-khong-sai-chung-ta-sai.mp3',
            image: 'images/em-khong-sai-chung-ta-sai.png'
        },
        {
            name: 'Em bỏ thuốc lá chưa',
            singer: 'Bích Phương',
            path: 'songs/em-bo-thuoc-la-chua.mp3',
            image: 'images/em-bo-thuoc-la-chua.png'
        },
        {
            name: 'Chuyện tình trẻ con',
            singer: 'Thành Zuy',
            path: 'songs/chuyen-tinh-tre-con.mp3',
            image: 'images/chuyen-tinh-tre-con.png'
        },
        {
            name: 'Ex\'s Hate Me',
            singer: 'Bray',
            path: 'songs/ex-hate-me.mp3',
            image: 'images/ex-hate-me.png'
        },
        {
            name: 'Baby',
            singer: 'Hoãng',
            path: 'songs/baby.mp3',
            image: 'images/baby.png'
        },
        
    ],
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STROAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        // const _this = this;
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active':''}" data-index = ${index}>
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    handleEvents: function() {
        const cdWidth = cd.offsetWidth;
        const _this = this;
        
        // DdThumb Animate
        const cdThumbAnimate = cdthumb.animate([
            {transform: 'rotate(360deg)'}
        ],
        {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        
        // Handle Scroll Display
        document.onscroll = function() {
            const onscroll = window.onscrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - onscroll;

            cd.style.width = newCdWidth> 0 ? newCdWidth + "px" : 0;
            cd.style.opacity = newCdWidth > 0 ? newCdWidth/ cdWidth : 0;
        }

        //Handle Play Button
        btnPlay.onclick = function() {
            if(_this.isPlaying) {                
            // _this.isPlaying = false;
            // player.classList.remove('playing');
                audio.pause();               
            }else {
                // _this.isPlaying = true;
                // player.classList.add('playing');
                audio.play();              
            }
        }

        //Handle Next/Prev Button
        btnNext.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else{
                _this.nextSong();
            }            
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        btnPrev.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else{
                _this.prevSong();
            }            
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        // Handle Random Button
        btnRandom.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            btnRandom.classList.toggle('active', _this.isRandom);            
        }
        //Handle Repeat Button
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Audio Play/ Pause Status
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Show song progress
        audio.ontimeupdate = function() {
            progress.value =  ((audio.currentTime / audio.duration) * 3000);
        }
        // Handle when rewinding song
        progress.onchange = function(e) {
            const seekTime = e.target.value/ 3000 * audio.duration;
            audio.currentTime = seekTime;
        }
        //Handle next song when ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else{
                btnNext.click();
            }            
        }

        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode && !e.target.closest('.option')){
                _this.currentIndex = Number(songNode.getAttribute('data-index'));
                _this.loadCurrentSong();
                audio.play();   
                _this.render();                                    
            }
        }


    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong',{
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        },200)
        console.log($('.song.active'))
    },
    loadCurrentSong: function() {
        
        heading.textContent = this.currentSong.name;
        cdthumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = `${this.currentSong.path}`;
        
    },
    


    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        
        if(this.currentIndex > 0) {
            this.currentIndex--;
        }else {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random()*this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        this.loadConfig();
        
        //Define properties for Object
        this.defineProperties();
        //Listen/ Handle DOM Events
        this.handleEvents();
        //Load the song info into the User Interface
        this.loadCurrentSong();
        //Render Playlist
        this.render();
        this.nextSong();
        repeatBtn.classList.toggle('active', this.isRepeat);
        btnRandom.classList.toggle('active', this.isRandom); 
    }
}

app.start();