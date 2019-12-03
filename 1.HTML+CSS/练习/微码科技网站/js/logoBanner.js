//     var oDiv=document.getElementById("list");
// 	var oUl=oDiv.getElementsByTagName("ul")[0];
// 	var oLi=document.getElementsByTagName("li");
// 	//产生2倍的轮播图片
// 	oUl.innerHTML=oUl.innerHTML+oUl.innerHTML;
// 	//计算ul的宽度
// 	oUl.style.width=oLi[0].offsetWidth*oLi.length+60+"px";
//     var timer="";
//     var speed=-2;
// 	   function autoPlay(){
// 		   	//向左走
// 			if(oUl.offsetLeft<-oUl.offsetWidth/2){
// 				oUl.style.left=0;
// 			}
// 		     //向右走
// 		    if(oUl.offsetLeft>0){
// 		    	oUl.style.left=-oUl.offsetWidth/2+"px";
// 		    }
		
// 			oUl.style.left=oUl.offsetLeft+speed+"px";
// 	   }
// 	  timer=setInterval(autoPlay,25);
// 	   oDiv.onmouseover=function(){
// 	   	 clearInterval(timer);
// 	   }
// 	   oDiv.onmouseout=function(){
// 	   	 timer=setInterval(autoPlay,25);
// 	   }
// document.getElementsByTagName("img")[0].onclick=function(){
// 	speed=-2;
// };
// document.getElementsByTagName("img")[1].onclick=function(){
// 	speed=2;
// };


window.onload = function () {
	var box = document.getElementById("list");
	var ul = box.getElementsByTagName("ul")[0];
	var li = ul.getElementsByTagName("li");
	var div = document.getElementsByClassName("box")[0];
	var span = div.getElementsByTagName("span");
	var timer = null;
	var speed = -2;
	// 让ul的长度变成原来的二倍
	ul.innerHTML = ul.innerHTML + ul.innerHTML;
	ul.style.width = li[0].offsetWidth * li.length + "px";


	// 自动轮播
	clearInterval(timer);
	timer = setInterval(autoPlay, 20);


   // 鼠标进入停止
	box.onmouseover = function () {
		clearInterval(timer);
	}
	// 鼠标离开开始
	box.onmouseout = function () {
		clearInterval(timer);
		timer = setInterval(autoPlay, 20);
	}

 

	// 点击向左
	span[0].onclick = function () {
		clearInterval(timer);
		speed = -2;
		timer = setInterval(autoPlay, 20);
	}
	// 点击向右
	span[1].onclick = function () {
		clearInterval(timer);
		speed = 2;
		timer = setInterval(autoPlay, 20);
	}

	function autoPlay() {
		// 向左走的边界条件
		if (ul.offsetLeft < -li[0].offsetWidth * li.length / 2) {
			ul.style.left = 0 ;
		}
		// 向右走的边界条件
		if (ul.offsetLeft > 0) {
			ul.style.left = -li[0].offsetWidth * li.length / 2 + "px";
		}
		ul.style.left = ul.offsetLeft + speed + "px";
	}
}

	



