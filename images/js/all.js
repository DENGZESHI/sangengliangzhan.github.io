
        /* 
            歌曲搜索接口
            请求地址：https://autumnfish.cn/search
            请求方法：get
            请求参数：keywords(查询关键字)
            响应内容：歌曲搜索结果 
        */
        var app = new Vue({
            el: "#app",
            data: {
                query: "",
                musicList: [],
                musicUrl: "",
                // 音乐作者头像
                picUrl:"images/1.jpg",
                // 歌曲评论
                hotCommentsArr:[],
                imgUrl:[
                    "images/morning.jpg",
                    "images/noon.jpg",
                    "images/afternoon.jpg",
                    "images/night.jpg",
                ],
                color:[
                    'color: rgb(200, 156, 207)',
                    'color:  rgb(156, 100, 94)',
                    'color:  rgb(156, 100, 94)',
                    'color:  rgb(59, 156, 207)'
                ],
                navBackgroundColor:[
                    ' background: linear-gradient(to Right, rgba(194, 220, 217,.5), rgba(18, 143, 197,.5))',
                    
                    '  background: linear-gradient(to Right, rgb(170,202,236), rgb(2,77,144))',
                    '  background: linear-gradient(to Right, rgb(240, 192, 175), rgb(236, 169, 123))',
                    '  background: linear-gradient(to Right, rgb(3,26,70), rgb(27,56,117))',
                ],
                footerBackgroundColor:[
                    '  background: linear-gradient(to Right, rgba(18, 143, 197,.5), rgb(154, 220, 217,.5))',
                    
                    '  background: linear-gradient(to Right, rgb(199,165,80), rgb(240,247,253))',
                    '  background: linear-gradient(to Right, rgba(236, 169, 123,.5), rgba(240, 192, 175,.5))',
                    '  background: linear-gradient(to Right, rgb(3,26,70), rgb(27,56,117))',
                ],
                border:[
                    'color: rgb(200, 156, 207)',
                    'color: rgb(156, 100, 94)',
                    'color:  rgb(156, 100, 94)',
                    'color:  rgb(59, 156, 207)',
                ],
                shareMusic: ["燕无歇", "Dear John", "用力活着", "幸福恋人", "美人鱼", "七里香", "Love Story", "Salt", "海底", "Monsters", "你应该很快乐", "多年以后", "盛夏的果实", "高山低谷", "你瞒我瞒", "爱你", "春娇与志明", "理想三旬", "爱的故事(上集)", "你走", "需要人陪", "对望", "Lonely Day", "开始懂了", "我走后", "黎明前的黑暗", "美丽女人", "逆流成河", "孟婆的碗", "红色高跟鞋", "夜空中最亮的星", "天后", "好心分手", "完美生活", "The Sounds Of Silence", "口是心非", "无期", "月牙湾", "无期", "云烟成雨", "倒数", "去年夏天"],
                playStyleNullImg: [
                    "images/loop.png",
                    "images/oneLoop.png",
                    "images/alert.png"
                ],
                randomX:"",
                x:0,
                liaocao:"潦草",
                isTrue:true,
                liaocaoTrue:false,
                footerTrue:true,
                num:0,
                historyArrs:[],
                userName:[],
                playPause:true,
                musicSumTime:"00:00:00",
                musicCurrentTime:'00:00:00', 
                fileName:"",
                likeMusic:[],
                operationTrue:true,
                loveArrs: [],
                playStyleNull:0,
            },
            mounted:function(){
                this.changeImg();
                this.getData();
                this.random();
                this.getLike(); 
                this.playStyleStart();
                
            },
            methods: {
                changeImg:function(){
                    var time = new Date();
                    var hours = time.getHours();
                    if(hours<=8){
                        this.x=0;
                    }else if(hours<=12){
                        this.x=1;
                    }else if(hours<=17){
                        this.x=2;
                    }else{
                        this.x=3;
                    };
                },

                searchMusic: function () {
                    var that = this;
                    axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function (response) {
                         console.log(response);
                        that.musicList = response.data.result.songs;

                    },
                        function (err) {

                        });
                },
                playMusic: function (musicId,name,loves) {
                    console.log(musicId);
                    // 获取歌曲地址
                    var that = this;
                    axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function (response) {
                        console.log(response);
                        console.log(response.data.data[0]);
                        that.musicUrl = response.data.data[0].url;
                        that.fileName = name;
                        that.loveArrs = loves;
                        
                    },
                        function (err) {

                        });
                    // 歌曲详情获取
                    axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function(response){
                        //console.log(response);
                        //console.log(response.data.songs[0].al.picUrl);
                        that.picUrl = response.data.songs[0].al.picUrl;
                    },
                    function(err){

                    });
                    // 歌曲评论获取
                    axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(function(response){
                         //console.log(response);
                        // console.log(response.data.hotComments);
                        
                        for(var i = 0; i < response.data.hotComments.length;i++){
                           
                            that.userName[i] = response.data.hotComments[i].user.nickname;
                        }
                       

                        that.hotCommentsArr = response.data.hotComments;
                     
                    }),function(err){

                    }
                },
                changeSong:function(song){
                    this.query = song;
                    this.searchMusic();
                },
                blur:function(){ // 按下回车失去焦点
                    document.querySelector(".search").blur();
                },
                getData:function (){
                    var data = JSON.parse(localStorage.getItem("history"));
                    if(data != null){
                        this.historyArrs = data;
                        
                    }else{
                        this.historyArrs=[];
                    }
                },
                getLike:function(){
                    var dataLike = JSON.parse(localStorage.getItem("likes"));
                    if(dataLike != null){
                        this.likeMusic = dataLike;
                    }else{
                        this.likeMusic = [];
                    }
                },
              
                savaData:function(){
                    localStorage.setItem("history",JSON.stringify(this.historyArrs));
                },
                savaLike:function(){
                    localStorage.setItem("likes",JSON.stringify(this.likeMusic));
                },
              
                recordIt:function(){ // 记录数据
                    if(this.query){
                        for(var i = 0;i < this.historyArrs.length; i++){
                          if(this.query == this.historyArrs[i].title){
                            this.historyArrs.splice(i,1);
                          };
                          
                        };
                        this.historyArrs.unshift({title:this.query});
                        if(this.historyArrs.length>20){
                         this.historyArrs.splice(20,1);
                        };
                       
                        this.savaData();
                        this.query = "";
                    }   
                
                },
                recordLike:function(){ // 保存喜欢
                    this.likeMusic.unshift({like:this.loveArrs});
                    this.savaLike();
                },
               
                removeAllHistory:function(){
                    // window.localStorage.clear();
                    this.historyArrs.splice(0,this.historyArrs.length);
                    this.savaData();
                    this.getData();
                },
                removeHistory:function(num){
                    this.historyArrs.splice(num,1);
                    this.savaData();
                    
                },
                removeLikeMusic:function (num) {
                    this.likeMusic.splice(num,1);
                    this.savaLike();
                },
                
                play_pause:function(){
                    var audio_play = document.querySelector(".a_autoplay");
                    var animation_play = document.querySelector(".circle");
                    var li_span3 = document.querySelector(".li_span3");
                    var jindutiao = document.querySelector(".p_div2");
                    
                    animation_play.style.webkitAnimationPlayState = "running";
                    li_span3.style.backgroundImage = "url(images/play.png)";
                    audio_play.oncanplay = function(){// 可以播放的时候再显示时间，oncanplay是加载完时触发
                        app.musicSumTime =app.formatTime(audio_play.duration);
                        audio_play.play();
                        
                    };
                    audio_play.ontimeupdate = function(){ // 歌曲实时时间
                        app.musicCurrentTime =app.formatTime( audio_play.currentTime);
                        // 设置进度条
                        var w = audio_play.currentTime / audio_play.duration * 100 + "%";
                        jindutiao.style.width = w;
                    };
                    audio_play.onended = function(){ // 播放时间结束
                        app.musicCurrentTime = "00:00:00";
                        animation_play.style.webkitAnimationPlayState = "paused";
                        li_span3.style.backgroundImage = "url(images/pause.png)";
                        jindutiao.style.width = "0px";
                        audio_play.pause();
                        app.playPause = !app.playPause;
                    };
               
                },
                 formatTime:function(time) {
                    // 计算小时
                    var h = Math.floor(time / 3600); // Math.floor取整
                    var m = Math.floor(time % 3600 / 60);
                    var s = Math.floor(time % 60);
                    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" +  (s < 10 ? "0" + s : s);
                },
                touchstart(e){ // 跃进
                    var p_div1 = document.querySelector(".p_div1");
                    var audio_play = document.querySelector(".a_autoplay");
                    var p_width = p_div1.clientWidth; // 进度条的总长
                    var p_w = p_div1.offsetLeft;// 进度条距离左边屏幕的距离
                    var x = e.targetTouches[0].clientX; // 点击时的位置
                    /* console.log(p_width);
                    console.log(p_w);
                    console.log(e.targetTouches[0].clientX); */
                    var moveTime = (x-p_w)/p_width*audio_play.duration;
                    audio_play.currentTime = moveTime; 
                    
                },
                
           /*      downloadFile(fileName, data) {
                    if (!data) {
                    return;
                    }
                    let url = window.URL.createObjectURL(new Blob([data]));
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                } */
                downloadFile() {
                   
                    // 使用获取到的blob对象创建的url
                    const filePath = this.musicUrl // mp3的地址
                    fetch(filePath).then(res => res.blob()).then(blob => {
                      const a = document.createElement('a')
                      document.body.appendChild(a)
                      a.style.display = 'none'
                      // 使用获取到的blob对象创建的url
                      const url = window.URL.createObjectURL(blob)
                      a.href = url
                      // 指定下载的文件名
                      a.download = this.fileName;
                      a.click()
                      document.body.removeChild(a)
                      // 移除blob对象的url
                      window.URL.revokeObjectURL(url)
                    })
                   
                },
                pp:function(){
                    var audio_play = document.querySelector(".a_autoplay");
                    var animation_play = document.querySelector(".circle");
                    var li_span3 = document.querySelector(".li_span3");
                    var jindutiao = document.querySelector(".p_div2");
                    this.playPause = !this.playPause;
                    if(!this.playPause){
                        audio_play.pause();
                        animation_play.style.webkitAnimationPlayState = "paused";
                        li_span3.style.backgroundImage = "url(images/pause.png)";
                    }
                    else{
                        audio_play.play();
                        animation_play.style.webkitAnimationPlayState = "running";
                        li_span3.style.backgroundImage = "url(images/play.png)";
                    } 
                },
                random:function(){
                    this.randomX = Math.floor(Math.random() * this.shareMusic.length);
                },
                playStyle: function () {  // 随机播放控制

                    this.playStyleNull += 1;
                    
                    if (this.playStyleNull >= 3) {
                        this.playStyleNull = 0;
                    }
                    
                    // console.log(this.playStyleNull);

                    // 删除本地存储的随机值，留给下面重新赋值
                    localStorage.removeItem('randomNull');

                    localStorage.setItem("randomNull", JSON.parse(this.playStyleNull));
                    console.log(this.playStyleNull);
                },
                playStyleStart: function () { // 启动vue运行得到本地存储的随机数，实现记忆
                    var randomNull = JSON.parse(localStorage.getItem("randomNull"));
                    this.playStyleNull = randomNull; // 得到本地存储的随机值
                },
                playStyleFunction: function () { // 播放样式功能实现
                    switch (this.playStyleNull) {
                        case 0:
                            {
                                alert();
                            }
                            break;
                        case 1:
                            break;
                        default:

                    }
                }
            }   
        })
