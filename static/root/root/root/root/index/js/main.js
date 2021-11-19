$(function(){
    //������ť
    $("#search").click(function(){
        $(".h_search_style").toggle();
       // $(".nav").toggle();
        $(".full").toggle();
    });
    $(".full").click(function(){
        $(".h_search_style").hide();
       // $(".nav").show();
        $(".full").hide();
    });
    //���ݵ�Ӱ������ǰ̨��ʾ����ͼ
    var score = Math.ceil($("#score").html());
    var star = $("#star");
    switch (score) {
        case (0):
            star.addClass("s0");
            break;
        case (1):
            star.addClass("s0-1");
            break;
        case (2):
            star.addClass("s1-2");
            break;
        case (3):
            star.addClass("s2-3");
            break;
        case (4):
            star.addClass("s3-4");
            break;
        case (5):
            star.addClass("s4-5");
            break;
        case (6):
            star.addClass("s5-6");
            break;
        case (7):
            star.addClass("s6-7");
            break;
        case (8):
            star.addClass("s7-8");
            break;
        case (9):
            star.addClass("s8-9");
            break;
        case (10):
            star.addClass("s9-10");
            break;

  }
 
//�ж�li����
//$('ul.result_album >li').length(function(home){
//	if(this>17){
//		
//		}
//	 else{
//		 
//		 
//		 }
//	
//	
//	})
    //����������л�
    $(".change").click(function(){
        if($(this).hasClass("down")){
            $(this).removeClass("down").addClass("up");
            $(".all").show();
            $(".part").hide();
        }else{
            $(this).removeClass("up").addClass("down");
            $(".part").show();
            $(".all").hide();
        }
    });
	 //ѡ���л�
    $(".Anthology_list .more_link ").click(function(){
            $(".All_Anthology_list").show();
            $(".Anthology_list ").hide();
        
    });
	 $(".hide_link ").click(function(){  
           
            $(".Anthology_list ").show();
            $(".All_Anthology_list").hide();       
    });
	
$(".right_content .content").each(function()
{ var maxwidth=30;
if($(this).text().length>maxwidth){
$(this).text($(this).text().substring(0,maxwidth)); 
$(this).html($(this).html()+'...'); 
} 
});


    //��Ӱͼ���л�
    var i = 0 ;
    //����ͼƬ����
    $(".pics img").each(function () {
        i++;
    });
    var width1 = i * 100 + "%";
    var width2 = 100/i + "%";
    //����ͼƬ������ؿ������
    $(".pics").css("width",width1);
    $(".pics img").css("width",width2);
    var n = 0;
    //�����л�js
    $(".left").click(function(){
        n+=100;
        if(n>0){
            n=-(i-1)*100;
        }
        $(".pics").animate({left:"n+'%'"}).css("left",n+"%");
    });
    $(".right").click(function(){
        n-=100;
        if(n<-(i-1)*100){
            n=0;
        }
        $(".pics").animate({left:"n+'%'"}).css("left",n+"%");
    });
    //��Ӱ��ǩλ������
    var l = parseInt($(".recommend dl").css("width"))/2-20;
    $(".score").css("left",l);
    $(".soon").css("right",l);
    //��Ӱɸѡѡ��״̬
    $(".select .swiper-slide").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
    });
    //ɸѡ��ϸ
})