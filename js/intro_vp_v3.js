/* eslint-disable */
$(document).ready(function() {
  if (!isMobile.any) {
    $('body').addClass('pc');
  } else {
    $('body').addClass('mobile');
  }
  // 缩放
  (function() {
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    let scaleX = ww / 750;
    if (scaleX < 1) {
      $('#scaleContainer, .flex-box')
        .css('transform', 'scale(' + scaleX + ')')
        .show();
      $('.pop_qs').css('transform', 'scale(' + scaleX + ') translate(-50%, -50%)');
      $('.button, .placeNavMove').css({
        transform: 'scale(' + scaleX + ')'
      });
    } else {
      $('#scaleContainer, .flex-box').show();
      $('.button, .placeNavMove').css({
        'margin-left': (ww - 750) / 2
      });
    }
    let scalexPop = (wh * (ww / 472)) / 600;
    if (Math.floor(scalexPop) <= 0) {
      $('.previw-area').css('transform', `scale(${scalexPop})`);
    }
  })();
  // resize
  (function() {
    window.addEventListener('resize', resizeThrottler, false);
    let resizeTimeout;
    function resizeThrottler() {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
          // The actualResizeHandler will execute at a rate of 15fps
        }, 66);
      }
    }
    function actualResizeHandler() {
      // handle the resize event
      var ww = window.innerWidth;
      var wh = window.innerHeight;
      var scaleX = ww / 750;
      if (scaleX < 1) {
        $('#scaleContainer')
          .css('transform', 'scale(' + scaleX + ')')
          .show();
        $('.button, .placeNavMove, .flex-box').css({
          transform: 'scale(' + scaleX + ')'
        });
      } else {
        $('#scaleContainer').show();
        $('.button, .placeNavMove, .flex-box').css({
          'margin-left': (ww - 750) / 2
        });
      }
      let scalexPop = (wh * (ww / 472)) / 600;
      if (Math.floor(scalexPop) <= 0) {
        $('.previw-area').css('transform', `scale(${scalexPop})`);
      }
    }
  })();
  //分享绘制 jaredhao

  function getNowTime() {
    var myDate = new Date();
    var d = {
      hour: myDate.getHours(),
      minutes: myDate.getMinutes()
    };
    return d;
  }

  //看这里
  /* ua 4 */
  var UA = function() {
    var userAgent = navigator.userAgent.toLowerCase();
    return {
      ipad: /ipad/.test(userAgent),
      iphone: /iphone/.test(userAgent),
      android: /android/.test(userAgent),
      qqnews: /qqnews/.test(userAgent),
      weixin: /micromessenger/.test(userAgent),
      qqnews_version: userAgent.match(/qqnews/i) == 'qqnews' ? userAgent.split('qqnews/')[1] : ''
    };
  };
  function provClick(data) {
    $areaShareLoading.show();
    setTimeout(() => {
      var __area = data.area;
      var $areaShare = $('.areaShare');
      // $areaShare.find('.bg').attr('crossorigin', 'anonymous');
      var areaBg = document.querySelector('.areaShare .bg');
      areaBg.crossOrigin = 'Anonymous';
      areaBg.crossOrigin = 'anonymous';
      $areaShare.find('.h1 .area, .h2 .area').text(__area);
      var $area = $(`.placeItemWrap[area="${__area}"]`);
      var __add = $area.find('.placeArea .add').text();
      var __confirm = $area.find('.placeArea .confirm').text();
      var __heal = $area.find('.placeArea .heal').text();
      var __dead = $area.find('.placeArea .dead').text();
      var $areaShare_data = $areaShare.find('.data');
      $('.areaShare .time').html($('.timeNum .d').html());
      $areaShare_data.find('.add').text(__add);
      $areaShare_data.find('.confirm').text(__confirm);
      $areaShare_data.find('.heal').text(__heal);
      $areaShare_data.find('.dead').text(__dead);
      var mapCanvas = document.querySelector('.chmap canvas');
      var $areaShareImg = $('.areaShare .dataMap img');
      if ($areaShareImg.length > 0) {
        $areaShareImg.attr('src', mapCanvas.toDataURL());
      } else {
        $('.areaShare .dataMap').prepend(`<img src="${mapCanvas.toDataURL()}" />`);
      }
      var tocanvasHtml = document.querySelector('.areaShare');
      var __canvas = document.createElement('canvas');
      var __width = tocanvasHtml.offsetWidth;
      var __height = tocanvasHtml.offsetHeight;
      var __scale = 2;
      __canvas.width = __width * __scale;
      __canvas.height = __height * __scale;
      __canvas.getContext('2d').scale(__scale, __scale);
      var opts = {
        tainttest: true, //检测每张图片都已经加载完成
        scale: __scale, // 添加的scale 参数
        useCORS: true,
        canvas: __canvas, //自定义 canvas
        logging: true, //日志开关
        width: __width, //dom 原始宽度
        height: __height //dom 原始高度
      };
      html2canvas(document.querySelector('.areaShare'), opts).then(function(canvas) {
        // console.log(canvas.toDataURL('image/jpeg'));
        var areaStirng = canvas.toDataURL('image/jpeg');
        if (bbo.isNewsApp()) {
          uoload64image(areaStirng);
        }
        showShareCard(areaStirng);
        // eslint-disable-next-line no-invalid-this
        AppPlatform.Survey.Digg.digg(this, 23311878, 13575399, 27661344);
      });
    }, 100);
  }

  // 分享卡片显示方法
  var $previwImgArea = $('.previw-img-area');
  var $bjFixedArea = $('.bj-fixed-area');
  var $areaShareLoading = $('.areaShareLoading');
  function showShareCard(src) {
    $previwImgArea.attr('src', src);
    $bjFixedArea.fadeIn();
    $areaShareLoading.hide();
  }

  // 顶部全国数据绘制图片
  var $topdataWrap_top = $('.topdataWrap');
  var $topdataWrap_inner = $('#topdataWrap .inner');
  function topDatatoCard() {
    $areaShareLoading.show();
    setTimeout(() => {
      var tocanvasHtml = document.querySelector('#topdataWrap .inner');
      var __canvas = document.createElement('canvas');
      var __width = tocanvasHtml.offsetWidth;
      var __height = tocanvasHtml.offsetHeight;
      var __scale = 2;
      __canvas.width = __width * __scale;
      __canvas.height = __height * __scale;
      __canvas.getContext('2d').scale(__scale, __scale);
      var opts = {
        tainttest: true, //检测每张图片都已经加载完成
        scale: __scale, // 添加的scale 参数
        useCORS: true,
        canvas: __canvas, //自定义 canvas
        logging: true, //日志开关
        width: __width, //dom 原始宽度
        height: __height //dom 原始高度
      };
      html2canvas(document.querySelector('#topdataWrap .inner'), opts).then(function(canvas) {
        // console.log(canvas.toDataURL('image/jpeg'));
        var areaStirng = canvas.toDataURL('image/jpeg');
        // console.log(areaStirng);
        wholeShare(areaStirng);
        if (bbo.isNewsApp()) {
          uoload64image(areaStirng);
        }
        // eslint-disable-next-line no-invalid-this
        AppPlatform.Survey.Digg.digg(this, 23311878, 13575399, 27661344);
      });
    }, 100);
  }

  //数据加载完成后进行地图绘制
  function drawMap(provs) {
    // $el.empty();
    // 这里调用绘制地图方法
    let ary = [];
    let data = {};
    //素材数据上线改成https://mat1.gtimg.com/yslp/yyh5/mapview/
    // data.path = '../';
    //本地运行 // ../
    data.path = 'https://mat1.gtimg.com/yslp/yyh5/mapview/';
    //地图上显示的数据
    console.log(provs);
    data.mapList = provs;
    data.div = {
      //页面传递一个容器
      id: 'chmap',
      //宽度
      width: 1500,
      //高度
      height: 1200
    };
    //对应的颜色 1000 100ren 10ren 1+ 0
    data.colors = ['#ED514e', '#FF8f66', '#FFB769', '#FFE6BE'];
    // new Main(data);
    new Main(data, provClick);
    // main.selectProv((res)=>{
    //   console.log(res);
    //   //在这里写执行命令
    //   console.log(11222)
    // });
  }
  //分享绘制
  function wholeShare(topbase64) {
    var mapCanvas = document.querySelector('.chmap canvas');
    let mapImg = new Image();
    mapImg.src = mapCanvas.toDataURL();
    mapImg.onload = () => {
      let topimg = new Image();
      topimg.src = topbase64;
      topimg.onload = () => {
        let shareData = {
          date: '数据截至2020-01-28 18:00',
          map: mapImg,
          top: topimg
        };
        jared.drawShare(shareData, (base64) => {
          console.log('全国数据分享生成的base64 在这里拿');
          showShareCard(base64);
        });
      };
    };
  }
  //较真 jaredhao rebuild 131
  function drawJiaoZhen() {
    function createItem(info) {
      let str = `
      <div class="rumor_card">
        <div class="rumor_icon"></div>
        <div class="rumor_title">
          ${info.title}
        </div>
        <div class="rumor_content">
          ${info.desc}
        </div>
        <div class="rumor_fake_img"></div>
      </div>
      <a class="rumor_link" href="https://vp.fact.qq.com/home"></a>`;
      let div = document.getElementById('piyaocon');
      let item = document.createElement('div');
      item.className = 'swiper-slide';
      item.style.width = '622px';
      item.innerHTML = str;
      div.appendChild(item);
    }
    $.ajax({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_lie_infos',
      dataType: 'jsonp',
      scriptCharset: 'UTF-8',
      jsonp: 'callback',
      success: (res) => {
        let data = JSON.parse(res.data);
        // console.log(data);
        data.map((d) => {
          createItem(d);
        });
      }
    });
  }
  drawJiaoZhen();
  //较真end
  //
  function cloneObj(obj) {
    let newObj = {};
    if (obj instanceof Array) {
      newObj = [];
    }
    for (let key in obj) {
      let val = obj[key];
      //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
      newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
    }
    return newObj;
  }
  function parseChinaMapData(data) {
    let ary = [];
	let totalData = {};
	let provName;
	data.map(function(d) {
	  provName = d.area;
	  if (totalData[provName]) {
		totalData[provName].confirm += d.confirm;
	  } else {
		totalData[provName] = cloneObj(d);
		ary.push(totalData[provName]);
	  }
	});
	let drawover = () => {
	      //地图绘制完成
	    };
	    let gotoProvPage = (res) => {
	      //跳转到二级页 res.area
	      console.log(res.area);
	      area_pool.map((d) => {
	        if (d.area == res.area) {
	          //window.location.href = `https://news.qq.com/hdh5/feiyanarea.htm#/area/?pool=${d.name}`;
	        }
	      });
	      //
	    };
	    let initData = {
	      provs: ary,
	      clickCall: provClick,
	      drawover: drawover,
	      gotoProvPage: gotoProvPage,
	      divId: 'chmap'
	    };
	    jared.drawMap(initData);
//jared.drawMap({ provs: ary, clickCall: provClick, divId: 'chmap' });
		
	//绘制中国地图
	/* var dataList=[];
	$.each(ary,function(i,v){
		var data = {name:v.area,value:v.confirm}
		dataList.push(data)
	})
	//初始化echarts实例
	var myChart = echarts.init(document.getElementById('chinaMap'));
	 // 需要在页面上直接标记出来的城市
	 var option = {
	     tooltip: {
			 trigger: 'item',
			 triggerOn:"click",    
	     	formatter: function (params) {
	             var info = '地区：' + params.name + '<br>确诊：'+params.data.value+'';
	             return info;
	         },
	     },
		//左侧小导航图标
		 dataRange: {  
			 show : true,  
			 x: 'left',  
			hoverLink:true,
			 splitList: [   
				 {start: 10000},{start: 1000, end: 9999},  
				 {start: 500, end: 999},{start: 100, end: 499},  
				 {start: 10, end: 99},{start: 1, end: 9},  
			 ],  
			 color: ['#9c0a0d', '#c91014', '#e64b47','#fe8664', '#ffd2a0', '#ffefd7']  
		 }, 
	     series: [
	         {
	             name: '中国',
	             type: 'map',
	             mapType: 'china',
	              itemStyle:{
					 normal:{label:{show:true}},
					 emphasis:{label:{show:true}}
				 },
				 layoutCenter: ["200%", "200%"],
	             data: dataList
	         }
	     ]
	 };
	 //使用制定的配置项和数据显示图表
	 myChart.setOption(option); */
  }

  //绘制注意这个方法已经只绘制曲线图
  function map(dt, dt2) {
    let _data = dt;
    let _dt2 = dt2;
    // console.log('dt', dt);
    let data = _data.sort((a, b) => {
      const strA = a.date;
      const strB = b.date;
      return strA < strB ? 1 : -1;
    });
    let addData = _dt2.sort((a, b) => {
      const strA = a.date;
      const strB = b.date;
      return strA < strB ? 1 : -1;
    });
    //
    for (let key in data) {
      let obj = data[key];
      let str = obj['date'];
      str = str.slice(1);
      str = str.replace('.', '-');
      // str=str.split(0);
      data[key]['date'] = str;
    }
    let data2 = cloneObj(data);

    for (let key in addData) {
      let obj = addData[key];
      let str = obj['date'];
      str = str.slice(1);
      str = str.replace('.', '-');
      // str=str.split(0);
      addData[key]['date'] = str;
    }
    // 画折线图
    // 累计曲线
    let line1Data = {
      items: ['confirm', 'suspect'],
      colorHash: {
        confirm: '#BC423C',
        dead: '#66666C',
        suspect: '#F8D4A7',
        //治愈 曲线数据 在这里修改
        heal: '#178B50'
      }
    };
	
    jared.drawChart($('.china'), data.slice(0,20), line1Data);
    //新增曲线
    let line2Data = {
      items: ['confirm', 'suspect'],
      colorHash: {
        confirm: '#005DFF',
        suspect: '#F8D4A7',
        dead: '#178B50',
        heal: '#66666C'
      }
    };
    jared.drawNewChart($('.china2'), addData.slice(0,20), line2Data);
    //累计治愈/死亡趋势
    let line3Data = {
      items: ['heal', 'dead'],
      colorHash: {
        confirm: '#005DFF',
        suspect: '#F8D4A7',
        dead: '#87878b',
        heal: '#65b379'
      }
    };
    jared.drawChart($('.china3'), data.slice(0,20), line3Data);
    //end
    // nav
    $('#moveNav').html($('#staticNav').html());
    $('.placeNavMove').html($('#placeNav').clone());
    $('body').on('click', '.navTab', function() {
      var type = $(this).data('id');
      highlightNav(type);
    });
    var $navTabs = $('.navTabs');
    var highlightNav = function(type) {
      $navTabs.find('.navTab').removeClass('active');
      $navTabs.find('.navTab.' + type + 'Tab').addClass('active');
    };
    // IntersectionObserver
    var io = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(i) {
          if (i.target.id === 'staticNav') {
            if (i.intersectionRatio >= 0.99) {
              $('#moveNav').hide();
            } else {
              $('#moveNav').show();
            }
          }
        });
      },
      {
        threshold: [0, 0.5, 1]
      }
    );
    io.observe(document.querySelector('#staticNav'));

    var io2 = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(i) {
          if (i.target.id === 'charts') {
            if (i.intersectionRatio > 0) {
              highlightNav('charts');
            }
          }
        });
      },
      {
        threshold: [0, 0.1],
        rootMargin: -window.innerHeight / 2.2 + 'px 0px'
      }
    );
    io2.observe(document.querySelector('#charts'));

    var io3 = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(i) {
          if (i.target.id === 'prevent') {
            if (i.intersectionRatio > 0) {
              highlightNav('prevent');
            }
          }
        });
      },
      {
        threshold: [0],
        rootMargin: -window.innerHeight / 2.2 + 'px 0px'
      }
    );
    io3.observe(document.querySelector('#prevent'));

    var io4 = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(i) {
          if (i.target.id === 'news') {
            if (i.intersectionRatio > 0) {
              highlightNav('news');
            }
          }
        });
      },
      {
        threshold: [0],
        rootMargin: -window.innerHeight / 2.2 + 'px 0px'
      }
    );
    io4.observe(document.querySelector('#news'));

    var io5 = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(i) {
          if (i.target.id === 'rumor') {
            if (i.intersectionRatio > 0) {
              highlightNav('rumor');
            }
          }
        });
      },
      {
        threshold: [0],
        rootMargin: -window.innerHeight / 2.2 + 'px 0px'
      }
    );
    io5.observe(document.querySelector('#rumor'));
  }

  // 新的绘制省份列表数据的方法
  function drawArea(obj) {
    var __dt = JSON.parse(JSON.stringify(obj.data.total));
    __data = __dt.sort(function(a, b) {
      if (a.confirm !== b.confirm) {
        return parseInt(b.confirm) - parseInt(a.confirm);
      } else {
        return parseInt(b.suspect) - parseInt(a.suspect);
      }
    });
    function __draw() {
		//getAreaList(__data);
      __data.map(function(d) {
        var _html = $(`
          <div class="placeItemWrap ${d.area == '湖北' ? 'current' : ''}" area="${d.area}">
            <div class="clearfix placeItem placeArea">
              <h2 class="blue">${d.area}</h2>
              <div class="add ac_add ${d.today.confirm == 0 ? 'small' : ''}">${
          d.today.confirm == 0 ? '待更新' : d.today.confirm
        }</div>
              <div class="confirm">${d.confirm}</div>
              <div class="heal">${d.heal}</div>
              <div class="dead">${d.dead}</div>
            </div>
          </div>
        `);
        obj.el.append(_html);
        _html.find('.placeArea').click(function() {
          $(this)
            .closest('.placeItemWrap')
            .toggleClass('current');
        });
        // console.log('dddddd',d)
        drawCitys(_html, d.children);
      });
    }
    setTimeout(function() {
      __draw();
      obj.cb();
    }, 100);
  }

  // 新的绘制二级地区列表数据的方法
  function drawCitys($el, data) {
    var __data = JSON.parse(JSON.stringify(data));
    // console.log('drawCitys',__data)
    __data = __data.sort(function(a, b) {
      if (
        b.city == '待确定' ||
        b.city == '待确认' ||
        b.city == '待明确' ||
        b.city == '所属地待确认'
      ) {
        return -1;
      } else if (a.confirm !== b.confirm) {
        return b.confirm - a.confirm;
      } else {
        return b.suspect - a.suspect;
      }
    });
    __data.map(function(dd) {
      var _innerhtml = `
        <div class="clearfix placeItem placeCity" city="${dd.city}">
          <h2 ${dd.city.length > 5 ? 'class="small"' : ''}>${dd.city}</h2>
          <div class="ac_add ${dd.today.confirm == 0 ? 'small' : ''}">${
        dd.today.confirm == 0 ? '待更新' : dd.today.confirm
      }</div>
          <div>${dd.confirm}</div>
          <div>${dd.heal}</div>
          <div>${dd.dead}</div>
        </div>
      `;
      $el.append(_innerhtml);
    });
  }

  // 绘制海外表格
  function mapOthData($el, data) {
    var __data = data.sort(function(a, b) {
      if (a.confirm !== b.confirm) {
        return b.confirm - a.confirm;
      } else {
        return b.suspect - a.suspect;
      }
    });
    var __hw_confirm = 0;
    var __hw_dead = 0;
    var $hw_confirm = $('.hw_confirm');
    var $hw_dead = $('.hw_dead');
    __data.map(function(d) {
      var _html = '';
      __hw_confirm += parseInt(d.confirm);
      __hw_dead += parseInt(d.dead);
      var _html = `
        <div class="clearfix placeItem placeArea no-sharp abroad" country="${d.country}">
          <h2 class="blue ${d.country.length > 3 ? 'small' : ''}">${d.country}</h2>
          <div>${d.confirm}</div>
          <div>${d.heal}</div>
          <div>${d.dead}</div>
        </div>
      `;
      $el.append(_html);
    });
    $hw_confirm.text(__hw_confirm);
    $hw_dead.text(__hw_dead);
  }

  var $head_confirm = $('.recentNumber .confirm .number'),
      $head_nowconfirm = $('.recentNumber .nowConfirm .number'),
      $head_suspect = $('.recentNumber .suspect .number'),
      $head_severe = $('.recentNumber .nowSevere .number'),
      $head_cure = $('.recentNumber .cure .number'),
      $head_dead = $('.recentNumber .dead .number'),
      $head_time_d = $('.timeNum .d'),
      $head_confirm_add = $('.recentNumber .confirm .add span'),
      $head_nowconfirm_add = $('.recentNumber .nowConfirm .add span'),
      $head_cuspect_add = $('.recentNumber .suspect .add span'),
      $head_severe_add = $('.recentNumber .nowSevere .add span'),
      $head_cure_add = $('.recentNumber .cure .add span'),
      $head_dead_add = $('.recentNumber .dead .add span');
  $head_suspect_add_d = $('.recentNumber .suspect .qs_bottom span');
  // 绘制顶部信息（确诊新增...，截至...，）
  function updateHead(headData, headAddData) {
    // 强制一层开关
    var addShow = false;
    if (headData.isShowAdd || headData.show.all) {
      bbo.forEach(headData.show, function(value, key) {
        if (value) {
          addShow = true;
        } else {
          $('.recentNumber')
              .find(`.${key}`)
              .addClass('dis');
        }
      });
    }
    if (addShow) {
      $('.recentNumber').addClass('showAdd');
    }
    // 现有确诊
    $head_nowconfirm.html(headData.nowConfirm);
    // 确诊
    $head_confirm.html(headData.confirm);
    // 疑似
    $head_suspect.html(headData.suspect);
    // 治愈
    $head_cure.html(headData.heal);
    // 重症
    // console.log(headData, headAddData);
    $head_severe.html(headData.nowSevere);
    // 死亡
    $head_dead.html(headData.dead);
    // let duTime = headData.lastUpdateTime.substr(5);
    if (headData.lastNow == '') {
      $head_time_d.html(`统计截至<span>${headData.lastUpdateTime}</span>`);
    } else {
      $head_time_d.html(
          `统计截至<span>${headData.lastUpdateTime}</span><em> 更新于${headData.lastNow}前</span></em>`
      );
    }
    $head_confirm_add.html('+' + headAddData.confirm);
    $head_nowconfirm_add.html((headAddData.nowConfirm > -1 ? '+' : '') + headAddData.nowConfirm);
    $head_cuspect_add.html('+' + headAddData.suspect_b);
    $head_suspect_add_d.html(
        parseInt(headAddData.suspect) > 0 ? `+${headAddData.suspect}` : headAddData.suspect
    );
    $head_severe_add.html((headAddData.nowSevere > -1 ? '+' : '') + headAddData.nowSevere);
    $head_cure_add.html('+' + headAddData.heal);
    $head_dead_add.html('+' + headAddData.dead);
    $topdataWrap_inner.html($topdataWrap_top.html());
    $topdataWrap_inner.find('.btn, .qs, .title').remove();
  }

  // 绑定事件
  function addFunction() {
    var $pop_qs = $('.pop_qs');
    var $qs_mask = $('.qs_mask');
    $('.ac-dataqs').click(function() {
      $pop_qs.show();
      $qs_mask.show();
    });
    $('.ac_qs_close, .ac_qs_mask').click(function() {
      $pop_qs.hide();
      $qs_mask.hide();
    });
    var $placeNav = $('#placeNav');
    var $placeNavMove = $('.placeNavMove');
    var placeNavTop = $placeNav.offset().top;
    var $window = $(window);
    $window.scroll(function() {
      if ($window.scrollTop() > placeNavTop) {
        if ($('.dataTips').length > 0 && $window.scrollTop() < $('.dataTips').offset().top) {
          $placeNavMove.show();
        }
      } else {
        $placeNavMove.hide();
      }
      if ($('.dataTips').length > 0 && $window.scrollTop() > $('.dataTips').offset().top - 120) {
        $placeNavMove.hide();
      }
    });
    $('.dataMap')
      .append($('.chinamapLegend1').clone())
      .append($('.chinamapLegend2').clone());
    $('.tabclose-area').click(function() {
      $('.bj-fixed-area').fadeOut();
    });
    var ua = UA();
    if (ua.android) {
      $('.areaShare').addClass('android');
    }
    $('.ac_topDataShare').click(function() {
      topDatatoCard();
    });
  }

  //去左右空格;
  function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '');
  }

  function formDate(dateForm) {
    if (dateForm === '') {
      //解决deteForm为空传1970-01-01 00:00:00
      return '';
    } else {
      var dateee = new Date(dateForm).toJSON();
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '');
      return date;
    }
  }

  // 将分钟转换为年月日-时分
  function transDate(minute, show_date) {
    // console.log(minute)
    if (minute < 0) {
      return '';
    }
    if (minute == 0 || isNaN(minute) || minute == null) {
      return 0;
    }

    if (minute / 60 / 24 / 30 >= 12) {
      show_date += parseInt(minute / 60 / 24 / 30 / 12) + '年';
    }
    if (minute % (60 * 24 * 30 * 12) != 0 && minute / 60 / 24 >= 30) {
      return '';
    }
    if (minute % (60 * 24 * 30) != 0 && minute / 60 >= 24) {
      return '';
    }
    if (minute % (60 * 24) != 0 && minute >= 60) {
      var t = minute / 60;
      if (t > 5) {
        return '';
      }
      if (show_date != '较远') {
        t = t - parseInt(minute / 60 / 24) * 24;
      }
      show_date += '<span>' + parseInt(t) + '小时</span>';
    }
    if (minute % 60 != 0) {
      if (show_date != '较远') {
        minute = minute - parseInt(minute / 60) * 60;
      }
      if (parseInt(Math.floor(minute)) == 0) {
        return '';
      }
      show_date +=
        '<span>' + (parseInt(Math.ceil(minute)) == 0 ? 1 : Math.floor(minute)) + '分钟</span>';
    }

    return show_date;
  }

  // 计算上次更新距离现在时间
  function lastTimeNow(lasttime) {
    var currentDate = new Date();
    currentDate = formDate(currentDate);
    // console.log(currentDate)
    currentDate = currentDate.replace(/-/g, '/');
    var __lasttime = lasttime.replace(/-/g, '/');
    console.log('时间戳对比------', currentDate, __lasttime);
    var result = parseInt(Date.parse(currentDate) - Date.parse(__lasttime));
    var minuts = result / 1000 / 60;
    return transDate(minuts, '');
  }

  // 获取新接口数据
  function getList() {
    $.ajax({
      // url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5_test',
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
      dataType: 'jsonp',
      scriptCharset: 'UTF-8',
      jsonp: 'callback',
      success: (res) => {
        var data = JSON.parse(res.data);
        var headData = {};
        var headAddData = {};
        // 所有数据都通过深度拷贝后传递
        console.log('全部数据', data);
        // return;
        // 顶部全局数据

        headData = JSON.parse(JSON.stringify(data.chinaTotal));
        headData.lastUpdateTime = data.lastUpdateTime;
        headData.isShowAdd = data.isShowAdd;
        headData.show = data.showAddSwitch || {};
        var _headAddData = JSON.parse(JSON.stringify(data.chinaAdd));
        _headAddData.suspect_b = data.chinaDayAddList[data.chinaDayAddList.length - 1].suspect;
        // 曲线数据
        var lineData = [];
        console.log('曲线数据：', data.chinaDayList);
        for (var i in data.chinaDayList) {
          lineData.push(data.chinaDayList[i]);
        }
        var addLineData = [];
        for (var key in data.chinaDayAddList) {
          addLineData.push(data.chinaDayAddList[key]);
        }
        console.log('曲线数据：', lineData);
        console.log('add曲线数据：', addLineData);
        map(JSON.parse(JSON.stringify(lineData)), JSON.parse(JSON.stringify(addLineData)));
        // 国内数据 国外数据
        // var dataCn = [];
        var areaData = {
          total: [],
          today: []
        };
        var cityData = {
          total: [],
          today: [],
          mapTotal: []
        };
        var foreignArray = [];
        for (var i in data.areaTree) {
          var item = data.areaTree[i];
          if (item.name && trim(item.name) == '中国') {
            // console.log('中国')
            headAddData = JSON.parse(JSON.stringify(item.today));
            for (var n in item.children) {
              // console.log('totle_nnnnnn', item.children[n])
              // var __this
              var __total = {};
              var __today = {};
              __total = Object.assign({}, item.children[n].total);
              __total.children = [];
              __today = Object.assign({}, item.children[n].today);
              __total.area = item.children[n].name;
              if (bbo.find(area_pool, { area: item.children[n].name })) {
                __total.pool = bbo.find(area_pool, { area: item.children[n].name }).name;
                __total.url = bbo.find(area_pool, { area: item.children[n].name }).channel_name;
              }
              var __areaMapTotal = Object.assign({}, item.children[n].total);
              __areaMapTotal.area = item.children[n].name;
              __areaMapTotal.country = item.name;
              __areaMapTotal.city = '';
              // console.log('__areaMapTotal',__areaMapTotal, item.children[n])
              cityData.mapTotal.push(__areaMapTotal);
              if (item.children[n].children && item.children[n].children.length > 0) {
                for (var totle_i in item.children[n].children) {
                  // if (item.children[n].name === '四川') {
                  //   console.log(totle_i,item.children[n].children)
                  // };
                  var __citytotal = {};
                  var __cityMapTotal = {};
                  var __citytoday = {};
                  __citytotal = Object.assign({}, item.children[n].children[totle_i].total);
                  __citytoday = Object.assign({}, item.children[n].children[totle_i].today);
                  __citytotal.area = item.children[n].name;
                  __citytotal.country = item.name;
                  __citytotal.city = item.children[n].children[totle_i].name;
                  __cityMapTotal = Object.assign({}, __citytotal);
                  // console.log('__cityMapTotal',__cityMapTotal)
                  // cityData.mapTotal.push(__cityMapTotal);
                  __citytotal.today = __citytoday;
                  // console.log('totle_i', item.children[n].children[totle_i])
                  cityData.total.push(__citytotal);
                  __total.children.push(JSON.parse(JSON.stringify(__citytotal)));
                  // console.log('__citytoday', __citytotal)
                }
              }
              // console.log('__d',__d)
              __total.today = __today;
              areaData.total.push(__total);
            }
          } else {
            var __country = {};
            for (var n in item.total) {
              __country[n] = item.total[n];
              __country[n].doday = item.today;
            }
            // console.log(typeof __country)
            __country.country = item.name;
            __country.city = '';
            __country.area = '';
            foreignArray.push(__country);
            // console.log('forignArry', foreignArray)
          }
        }
        // console.log('areaData', cityData)

        var __lastTimeNow = lastTimeNow(data.lastUpdateTime);
        headData.lastNow = __lastTimeNow;

        // 顶部总数据绘制
        // 今日疑似新增计算
        // var __todaySuspect = parseInt(
        //   data.chinaDayList[data.chinaDayList.length - 1].suspect -
        //     data.chinaDayList[data.chinaDayList.length - 2].suspect
        // );
        updateHead(headData, _headAddData);

        // areaMap();
        addFunction();
        //
        // console.log("cityData.mapTotal",cityData.mapTotal);
        parseChinaMapData(cityData.mapTotal);
        drawArea({
          el: $('.chianList'),
          data: areaData,
          cb: function() {
            // drawCitys(cityData)
          }
        });
        // drawCitys(cityData);
        if (foreignArray.length > 0) {
          mapOthData($('.abroadList'), foreignArray);
        }
        // 处理地方卡片
        placeCard(areaData, cityData);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getList();
});

//医疗门诊省份接口请求
$.ajax({
  url: 'https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalProvince',
  type: 'POST',
  contentType: 'application/json;charset=utf-8',
  data: JSON.stringify({
    service: 'THPneumoniaOuterService',
    args: { req: {} },
    func: 'getHospitalProvince',
    context: { channel: 'AAEEviDRbllNrToqonqBmrER' }
  }),
  success: function(res) {
    if (res.args.rsp.result.code == 0) {
      let provincesList = res.args.rsp.provinces;
      mapHealthProvinceData($('.div-hospital'), provincesList);
    }
  }
});
//医疗门诊城市接口请求
function cityRequest($cur, province) {
  $.ajax({
    url: 'https://wechat.wecity.qq.com/api/THPneumoniaService/getHospitalCityByProvince',
    type: 'POST',
    contentType: 'application/json;charset=utf-8',
    data: JSON.stringify({
      service: 'THPneumoniaOuterService',
      args: {
        req: {
          province: province
        }
      },
      func: 'getHospitalCityByProvince',
      context: { channel: 'AAEEviDRbllNrToqonqBmrER' }
    }),
    success: function(res) {
      if (res.args.rsp.result.code == 0) {
        mapHealthCity($cur, res.args.rsp.info.citys);
      }
    }
  });
}
//拼接医疗门诊省份
function mapHealthProvinceData($el, list) {
  $el.empty();
  list.map(function(d) {
    var _html = '';
    var _html = $(`
      <div class="hotelItemWrap" province="${d.provinceName}">
        <div class="hotelProvince" data-province="${d.provinceName}" data-count="${d.cityCnt}">
          <div class="name">${d.provinceName}</div>
          <div class="count"></div>
        </div>
      </div>
    `);
    $el.append(_html);
    _html.find('.hotelProvince').click(function(e) {
      let province = e.currentTarget.dataset.province;
      let count = e.currentTarget.dataset.count;
      let cCount = $(this)
        .parent()
        .children('.hotelCity').length;
      if (cCount == 0 && count != 0) {
        cityRequest($(this), province);
      }
      $(this)
        .closest('.hotelItemWrap')
        .toggleClass('current');
    });
  });
  $el
    .children('.hotelItemWrap')
    .first()
    .children()
    .trigger('click');
}
//拼接医疗门诊城市
function mapHealthCity($el, list) {
  var _html = '';
  list.map(function(d) {
    _html = $(`
        <div class="hotelCity">
          <div class="name">${d.cityName}</div>
          <div class="count">${d.count}家<span>进入查询</span></div>
          <a class="healthlink" href="${d.link.url}"/>
        </div>
    `);
    // console.log(_html)
    $el.parent().append(_html);
    // $el.parent().find('.hotelCity').click(function(){
    //   console.log('----跳转地址',d.link.url);
    //   window.location.href=d.link.url;
    // });
  });
}

// 地方卡片处理

let areaDataCard = [];
let cityDataCard = [];
let channel_name = '';

function placeCard(area, city) {
  areaDataCard = area.total;
  cityDataCard = city;
  $('#select-area').prepend("<option value='neimenggu'>切换城市</option>");
  bbo.forEach(area.total, function(value, key) {
    $('#select-area').append("<option value='" + value.pool + "'>" + value.area + '</option>');
  });
  let urlarea = bbo.getUrlParam('pool') || 'neimenggu';

  // window.TencentNews.getCurrentLocationInfo({
  //   onCallback: function(res) {
  //     console.log(JSON.stringify(res));
  //   }
  // });

  changePlaceCard(urlarea);
}

function changePlaceCard(area) {
  // 页卡显示区域
  let $tabox = $('.tab-box');
  let select = bbo.find(areaDataCard, { pool: area });
  $tabox.find('.add').text(select.today.confirm || '-');
  $tabox.find('.confirm').text(select.confirm || 0);
  $tabox.find('.heal').text(select.heal || 0);
  $tabox.find('.dead').text(select.dead || 0);
  $('.tab-name ,.share-tab-name ,.btn-tab-name').text(select.area);
  console.log(select.url, select.url == 'news_news_antip');
  if (select.url == 'news_news_antip') {
    $('.btn-tab-name').text('全国');
  }
  channel_name = select.url || 'news_news_antip';

  // 页卡数据绘制
  let $taplist = $('.taplist-area');
  let $head_time_d = $('.timeNum .d');
  $taplist.find('.area').text(select.area);
  $taplist.find('.time').text('统计截止 ' + $head_time_d.find('span').html());
  $taplist.find('.add').text(select.today.confirm || '-');
  $taplist.find('.confirm').text(select.confirm || 0);
  $taplist.find('.heal').text(select.heal || 0);
  $taplist.find('.dead').text(select.dead || 0);
  showPlaceCardNews(area);
  changeCityCard(area);
}

function changeCityCard(city) {
  let cityName = bbo.find(areaDataCard, { pool: city }).area;
  let cityArray = cityDataCard.total.filter(function(x) {
    return x.area == cityName;
  });
  let html = cityArray
    .map(function(d, i) {
      return (
        `<div class="pt-item">` +
        `<div class="t1">` +
        d.city +
        `</div>` +
        `<div class="t2">` +
        (d.today.confirm > 0 ? d.today.confirm : '-') +
        `</div>` +
        `<div class="t2">` +
        d.confirm +
        `</div>` +
        `<div class="t2">` +
        d.heal +
        `</div>` +
        `<div class="t2">` +
        d.dead +
        `</div>` +
        `</div>`
      );
    })
    .join('');
  $('.taplist-area')
    .find('.bt-box')
    .html('');
  $('.bt-box').append($(html));
}

function showPlaceCardNews(area) {
  $.ajax({
    url: 'https://api.dreamreader.qq.com/news/v1/province/news/list?province_code=' + area || 'hb',
    type: 'get',
    scriptCharset: 'UTF-8',
    success: function(res) {
      if (res.data.items) {
        let html = res.data.items
          .map(function(d, i) {
            if (d.news_url.indexOf('https') < 0) {
              d.news_url = d.news_url.replace('http:', 'https:');
            }
            return (
              `<div class="text-item"><i></i><a href="` + d.news_url + `">` + d.title + `</a></div>`
            );
          })
          .join('');
        $('.city-tab')
          .find('.tab-text')
          .html('');
        $('.tab-text').append($(html));
      } else {
        $('.city-tab')
          .find('.tab-text')
          .html('');
        $('.city-tab')
          .find('.tab-box')
          .css({ 'margin-bottom': '40px' });
      }
    }
  });
}

$('#select-area').on('change', function(e) {
  var area = $(this).val();
  changePlaceCard(area);
});

//区域页卡跳转拉动
$('body').on('touchend click', '.tab-look-btn', function() {
  var url =
    'qqnews://article_9500?tab=news_news&channel=' +
    channel_name +
    '&from=weixin&pagetype=h5epidemic&force=1';
  downappCard.run(url);
});

// 分享某省数据

$('body').on('touchend click', '.tab-share-btn', function() {
  $('.areaShareLoading').show();
  var tipsText = $('.tab-text')
    .children()
    .eq(0)
    .text();
  $('.taplist-area')
    .find('.mk-tips i')
    .text(bbo.truncate(tipsText, 33));

  var tocanvasHtml = document.querySelector('.taplist-area');
  var __canvas = document.createElement('canvas');
  var __width = tocanvasHtml.offsetWidth;
  var __height = tocanvasHtml.offsetHeight;
  var __scale = 2;
  __canvas.width = __width * __scale;
  __canvas.height = __height * __scale;
  __canvas.getContext('2d').scale(__scale, __scale);

  var opts = {
    tainttest: true, //检测每张图片都已经加载完成
    scale: __scale, // 添加的scale 参数
    useCORS: true,
    canvas: __canvas, //自定义 canvas
    logging: true, //日志开关
    width: __width, //dom 原始宽度
    height: __height //dom 原始高度
  };
  html2canvas(document.querySelector('.taplist-area'), opts).then(function(canvas) {
    // console.log(canvas.toDataURL('image/jpeg'));
    var areaStirng = canvas.toDataURL('image/jpeg');
    if (bbo.isNewsApp()) {
      uoload64image(areaStirng);
    }
    $('.previw-img-area').attr('src', areaStirng);
    $('.bj-fixed-area').fadeIn();
    $('.areaShareLoading').hide();
    // eslint-disable-next-line no-invalid-this
    // AppPlatform.Survey.Digg.digg(this, 23311878, 13575399, 27661344);
  });
});
