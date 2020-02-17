"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JaredHao =
/*#__PURE__*/
function () {
  function JaredHao() {
    _classCallCheck(this, JaredHao);

    window.cjs = createjs;
    console.log('jaredhao 工作汇集于此');
    this.imagePool = {};
  } //绘制全国/湖北/武行曲线


  _createClass(JaredHao, [{
    key: "getData",
    value: function getData(url, cb) {
      $.ajax({
        url: url,
        dataType: 'json',
        scriptCharset: 'UTF-8',
        jsonp: 'jsoncallback',
        success: function success(res) {
          if (res.ret == 0) {
            cb(res.data);
          }
        },
        error: function error(res) {}
      });
    } //

  }, {
    key: "drawBars",
    value: function drawBars(div, data) {
      console.log("drawBars", data); //

      $(div).empty();
      var $chart = $('<div class="chart"></div>').appendTo($(div));
      var barChart = echarts.init($chart[0]);
      var xAxisData = [];
      var data1 = [];
      var len = data.length;
      var maxRate = data[0].addRate;
      var minRate = data[len - 1].addRate;
      ;

      for (var i = 0; i < len; i++) {
        // || data[i].addRate == 0 || data[i].addRate == "0"
        if (data[i].addRate == "") continue;
        xAxisData.push(data[i].name);
        var obj = {
          value: 10
        };
        obj.name = data[i].name;
        obj.value = data[i].addRate;
        obj.position = ['30%', '-50%'];
        obj.color = "#444444";
        data1.push(obj);
      }

      console.log(maxRate, minRate);
      var option = {
        backgroundColor: '#fff',
        tooltip: {
          formatter: function formatter(res) {
            var html; // html = '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:15px;height:15px;background-color:' + res.color + ';"></span>';

            html = res.name + "：" + res.value + "%<br>";
            return html;
          },
          textStyle: {
            fontWeight: "normal",
            fontSize: 20,
            lineHeight: 30,
            fontFamily: 'Arial'
          },
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.75)",
          backgroundRadio: 20,
          padding: [6, 12, 6, 12],
          triggerOn: 'click'
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '2%',
          top: '2%',
          containLabel: true
        },
        xAxis: {
          data: xAxisData,
          label: {
            show: false
          },
          axisLabel: {
            interval: 0,
            show: false,
            showMaxLabel: false,
            fontSize: 1,
            // margin:-100, 
            rotate: 90,
            color: '#999999',
            x: 10,
            coord: [10, 20]
          },
          position: "bottom",
          axisLine: {
            onZero: true
          },
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          boundaryGap: ['15%', '2%'],
          axisLabel: {
            formatter: function formatter(value) {
              // console.log("value",value);
              return value + '%';
            },
            fontSize: 16,
            color: '#595757'
          },
          inverse: false,
          splitArea: {
            show: false
          }
        },
        visualMap: {
          show: false,
          type: 'continuous',
          dimension: 1,
          inverse: true,
          calculable: true,
          min: minRate,
          max: maxRate,
          top: 60,
          left: 10,
          inRange: {
            color: ["#5591FA", '#A66CDB', "#F06061"]
          },
          outOfRange: {
            color: '#5591FA'
          }
        },
        series: [{
          type: 'bar',
          data: data1,
          barWidth: '70%',
          label: {
            formatter: function formatter(res) {
              // console.log(res);
              var str = res.name; // console.log(str.length);

              var html = '';

              for (var _i = 0; _i < str.length; _i++) {
                html += str.charAt(_i) + '\n';
              }

              return html;
            },
            show: true,
            // rotate: 90,
            fontSize: 14,
            color: "#737373",
            position: "bottom"
          }
        }]
      };
      barChart.setOption(option);
    } //

  }, {
    key: "drawLines",
    value: function drawLines(div, chinaData) {
      var _this = this;

      chinaData = chinaData.slice().sort(function (a, b) {
        return a.date > b.date ? 1 : -1;
      });
      chinaData.map(function (v) {
        for (var key in v) {
          if (!v[key]) v[key] = null;
        }
      });
      var hubeiData;
      var wuhanData;
      var len = 0;
      var ary = [];

      var parseData = function parseData() {
        // console.log(33333, chinaData, hubeiData, wuhanData);
        // chinaData.push({
        //     confirm: 44730,
        //     suspect: 16067,
        //     dead: 1114,
        //     heal: 4742,
        //     deadRate: "2.5",
        //     healRate: "10.6",
        //     date: "2-12",
        //     show: true
        // });
        // chinaData.push({
        //     confirm: 44730,
        //     suspect: 16067,
        //     dead: 1114,
        //     heal: 4742,
        //     deadRate: "2.5",
        //     healRate: "10.6",
        //     date: "2-13",
        //     show: true
        // });
        // hubeiData.push({
        //     date: "02.12",
        //     country: "中国",
        //     province: "湖北",
        //     confirm: 48206,
        //     dead: 1310,
        //     heal: 3441,
        //     confirm_add: "14840",
        // });
        //
        var transDate = function transDate(data) {
          for (var key in data) {
            var obj = data[key];
            var str = obj['date'];
            str = str.slice(1);
            str = str.replace('.', '-');
            data[key]['date'] = str;
          }
        };

        transDate(hubeiData);
        transDate(wuhanData); //
        // console.log(hubeiData);

        len = Math.min(chinaData.length, hubeiData.length, wuhanData.length);
        var chaVal = 0;

        for (var i = 0; i < chinaData.length; i++) {
          if (chinaData[i].date == '1-20') {
            chaVal = i;
          }
        }

        var getValueByKey = function getValueByKey(data, ns) {
          for (var _i2 = 0; _i2 < data.length; _i2++) {
            if (data[_i2].date == ns) {
              return data[_i2].confirm;
            }
          }

          return 0;
        }; // chinaData = chinaData.slice(chaVal);
        //1-20


        for (var _i3 = chaVal; _i3 < chinaData.length; _i3++) {
          var obj = {};
          var dateStr = chinaData[_i3].date;
          obj.date = chinaData[_i3].date;
          obj.qg = chinaData[_i3].confirm;
          obj.hb = getValueByKey(hubeiData, dateStr);
          obj.wh = getValueByKey(wuhanData, dateStr);
          console.log(chinaData[_i3].date, obj);
          if (obj.wh == 0 || obj.hb == 0) break;
          ary.push(obj);
        } // console.log(1111,ary);


        var lineData = {
          items: ['qg', 'hb', 'wh'],
          colorHash: {
            "qg": '#FFDC78',
            "hb": '#FFA655',
            "wh": '#E65561'
          }
        };

        _this.drawChart(div, ary, lineData, false, true);
      };

      var hubeiDataURL = "https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=%E6%B9%96%E5%8C%97";
      var wuhanDataURL = "https://api.inews.qq.com/newsqa/v1/query/pubished/daily/list?province=%E6%B9%96%E5%8C%97&city=%E6%AD%A6%E6%B1%89";
      this.getData(hubeiDataURL, function (data) {
        hubeiData = data;

        _this.getData(wuhanDataURL, function (data) {
          wuhanData = data;
          parseData();
        });
      });
    } //传入省份名称 绘制省份地图

  }, {
    key: "drawSingleProv",
    value: function drawSingleProv(ns) {
      console.log('drawSingleProv', ns);
      $.ajax({
        url: "http://localhost:8081/map/18/es/data/china-all.geo.json",
        type: "POST",
        dataType: 'jsonp',
        success: function success(res) {
          console.log(1111, res);
        }
      });
    } //

  }, {
    key: "drawShare",
    value: function drawShare(data, call) {
      var _this2 = this;

      var ary = [{
        src: "sharebg.jpg",
        id: "sharebg"
      }, {
        src: "shareleft.png",
        id: "shareleft"
      }, {
        src: "shareright.png",
        id: "shareright"
      }, {
        src: "dataimg.png",
        id: "dataimg"
      }];
      var path = "https://mat1.gtimg.com/yslp/yyh5/mapview/images/";

      if (!window.location.href.match('qq.com/')) {
        path = '../images/';
      }

      this.loadImg(ary, path, function () {
        var fa = _this2;
        var mc = new cjs.MovieClip();

        mc.init = function () {
          var s = fa.drawImage(fa.imagePool.sharebg);
          this.addChild(s);
          this.width = s.width;
          this.height = s.height; // let txt = new cjs.Text(data.date, '18px Arial', '#999999');
          // this.addChild(txt);
          // txt.x = 80;
          // txt.y = 300
          //
          //560 80;

          var top = fa.drawImage(data.top);
          this.addChild(top); // console.log('top1:',top.width);

          top.regX = top.width / 2;
          top.x = this.width / 2;
          top.y = 300;
          top.scaleX = top.scaleY = 654 / top.width; //560 80;

          var map = fa.drawImage(data.map);
          this.addChild(map);
          map.regX = map.width / 2;
          map.regY = map.height / 2;
          map.x = this.width / 2 + 30;
          map.y = 760;
          map.scaleX = map.scaleY = 0.4; //

          var left = fa.drawImage(fa.imagePool.shareleft);
          this.addChild(left);
          left.x = 80;
          left.y = 960;
          var right = fa.drawImage(fa.imagePool.shareright);
          this.addChild(right);
          right.regX = right.width;
          right.y = 1000;
          right.x = this.width - 76;
          this.cache(0, 0, this.width, this.height);
          var str = this.getCacheDataURL();
          var img = new Image();
          img.src = str;

          img.onload = function () {
            var ba64 = fa.compress(img, "image/jpg", 0.8);
            call(ba64);
          };
        };

        mc.init();
      });
    }
  }, {
    key: "compress",
    value: function compress(img, type, ratio) {
      var c, ctx;
      c = document.createElement('canvas');
      var scale = 1;
      c.width = img.width * scale;
      c.height = img.height * scale;
      ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale); //

      var img64;
      img64 = c.toDataURL("image/jpg", ratio); // if (type == 'image/jpg') {
      // }
      // if (type == 'image/png') {
      //     img64 = c.toDataURL("image/png", ratio);
      // }

      c = null;
      ctx = null;
      return img64;
    }
  }, {
    key: "drawImage",
    value: function drawImage(img) {
      var g = new createjs.Graphics();
      var s = new createjs.Shape(g);
      g.c().bf(img, "no-repeat").dr(0, 0, img.width, img.height);
      s.width = img.width;
      s.height = img.height;
      return s;
    }
    /**
     * loadimg
     */

  }, {
    key: "loadImg",
    value: function loadImg(ary, path, call) {
      var _this3 = this;

      var loader = this.loader = new cjs.LoadQueue(false, path, 'Anonymous');
      loader.setMaxConnections(3); // Allow 10 concurrent loads

      loader.loadManifest(ary);
      loader.addEventListener('progress', function (evt) {// let num = Math.floor(evt.loaded * 100);
      });
      loader.addEventListener('fileload', function (e) {
        if (e && e.item.type == "image") {
          _this3.imagePool[e.item.id] = e.result;
        }
      });
      loader.addEventListener("complete", function (evt) {
        call();
      });
    }
    /**
     * 绘制折线
     */

  }, {
    key: "drawChart",
    value: function drawChart(container, data, lineViewData, BF, areaShow, offStr) {
      var _xAxis;

      var items = lineViewData.items; // var items = ['confirm', 'suspect', 'dead'];

      var colorHash = lineViewData.colorHash;
      var grid = {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '2%',
        containLabel: true
      }; //

      $(container).empty();
      var $chart = $('<div class="chart"></div>').appendTo($(container));
      data = data.slice().sort(function (a, b) {
        return a.date > b.date ? 1 : -1;
      });
      data.map(function (v) {
        for (var key in v) {
          if (!v[key]) v[key] = null;
        }
      }); //

      var areaColorStyle = {
        opacity: 0.4
      };
      if (!areaShow) areaColorStyle = null; //

      var total = data.length;
      var dis = Math.round(total / 13);
      var count = 0;

      for (var i = total; i--; i >= 0) {
        data[i].show = count % dis == 0 ? true : false;
        count++;
      }

      var mathInterval = function mathInterval(index, value) {
        return data[index].show || false;
      }; // console.log('-2345678', total, dis);
      //过滤点击节点显示


      var filterPointInfo = function filterPointInfo(res) {
        console.log(res);
        var str = '';
        var html;
        html = res[0].name + "<br>";
        if (!offStr) offStr = '';

        for (var _i4 = 0; _i4 < res.length; _i4++) {
          if (res[_i4].value == undefined || res[_i4].value == "undefined") continue;
          str = '';
          if (res[_i4].value == undefined || res[_i4].value == "undefined") continue;

          switch (res[_i4].seriesName) {
            case "confirm":
              str = "确诊:";
              break;

            case "suspect":
              str = "疑似:";
              break;

            case "heal":
              str = "治愈:";
              break;

            case "dead":
              str = "病死:";
              break;

            case "deadRate":
              str = "病死率:";
              break;

            case "healRate":
              str = "治愈率:";
              break;

            case "qg":
              str = "全国:";
              break;

            case "country":
              str = "全国:";
              break;

            case "wh":
              str = "武汉:";
              break;

            case "hb":
              str = "湖北:";
              break;

            case "hubei":
              str = "湖北:";
              break;

            case "notHubei":
              str = "非湖北:";
              break;

            case "countryRate":
              str = "全国:";
              break;

            case "hubeiRate":
              str = "湖北:";
              break;

            case "notHubeiRate":
              str = "非湖北:";
              break;

            case "totalConfirm":
              str = "累计确诊:";
              break;

            case "curSuspect":
              str = "现有疑似:";
              break;
          } // console.log(res[i].seriesName,str);


          html += '<span style="display:inline-block;margin-right:5px;border-radius:2px;width:15px;height:15px;background-color:' + res[_i4].color + ';"></span>';

          if (BF) {
            html += offStr + str + res[_i4].value + "%<br>";
          } else {
            html += offStr + str + res[_i4].value + "<br>";
          }
        }

        return html;
      }; //


      var myChart = echarts.init($chart[0]);
      var option = {
        grid: grid,
        tooltip: {
          axisPointer: {
            type: "cross",
            snap: true,
            axis: "auto"
          },
          textStyle: {
            fontWeight: "normal",
            fontSize: 20,
            lineHeight: 30,
            fontFamily: 'Arial'
          },
          position: function position(res) {// return [res[0],55];
          },
          borderRadius: 10,
          backgroundColor: "rgba(0,0,0,0.75)",
          backgroundRadio: 20,
          padding: [6, 12, 6, 12],
          trigger: "axis",
          formatter: filterPointInfo,
          triggerOn: 'click'
        },
        xAxis: (_xAxis = {
          axisPointer: {
            type: "line",
            label: {
              show: false
            },
            z: -1
          },
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: mathInterval,
            showMaxLabel: true,
            fontSize: 16,
            margin: 20,
            rotate: 45,
            color: '#999999'
          }
        }, _defineProperty(_xAxis, "boundaryGap", ['30%', '30%']), _defineProperty(_xAxis, "axisTick", {
          show: false
        }), _defineProperty(_xAxis, "data", data.map(function (d) {
          return d.date;
        })), _xAxis),
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function formatter(value) {
              if (BF) {
                return value + '%';
              } else {
                return value;
              }
            },
            fontSize: 16,
            color: '#595757'
          },
          axisPointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          minInterval: 1,
          //会出现负数刻度
          min: 0
        },
        series: items.map(function (d) {
          return {
            name: d,
            type: 'line',
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 4
            },
            itemStyle: {
              color: colorHash[d]
            },
            areaStyle: areaColorStyle,
            // stack: '总量',
            data: data.map(function (da) {
              return da[d];
            })
          };
        })
      };
      myChart.setOption(option);
      myChart.on('click', function (e) {// console.log(e);
      });
    }
  }, {
    key: "drawNewChart",
    value: function drawNewChart(container, data, lineViewData) {
      var _xAxis2;

      var items = lineViewData.items;
      var colorHash = lineViewData.colorHash;
      var grid = {
        left: '2%',
        right: '2%',
        bottom: '2%',
        top: '2%',
        containLabel: true
      };
      $(container).empty();
      var $chart = $('<div class="chart"></div>').appendTo($(container));
      data = data.slice().sort(function (a, b) {
        return a.date > b.date ? 1 : -1;
      });
      var total = data.length;
      var dis = Math.round(total / 13);
      var count = 0;

      for (var i = total; i--; i >= 0) {
        data[i].show = count % dis == 0 ? true : false;
        count++;
      }

      var mathInterval = function mathInterval(index, value) {
        return data[index].show || false;
      };

      var myChart = echarts.init($chart[0]);
      var option = {
        grid: grid,
        xAxis: (_xAxis2 = {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: mathInterval,
            showMaxLabel: true,
            fontSize: 16,
            margin: 20,
            rotate: 45,
            color: '#999999'
          }
        }, _defineProperty(_xAxis2, "boundaryGap", ['30%', '30%']), _defineProperty(_xAxis2, "axisTick", {
          show: false
        }), _defineProperty(_xAxis2, "data", data.map(function (d) {
          return d.date;
        })), _xAxis2),
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 16,
            color: '#595757'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          minInterval: 1,
          //会出现负数刻度
          min: 0
        },
        series: items.map(function (d) {
          var curLineStyle = {
            width: 4,
            type: 'solid' //'dotted'虚线 'solid'实线

          };
          return {
            name: d,
            type: 'line',
            smooth: true,
            symbolSize: 4,
            lineStyle: curLineStyle,
            itemStyle: {
              color: colorHash[d]
            },
            // stack: '总量',
            data: data.map(function (da) {
              // console.log("dd",da);
              return da[d];
            })
          };
        })
      };
      myChart.setOption(option);
    }
  }, {
    key: "setDefault",

    /**
     * 绘制地图
     * 参数
     * provs 省份数据
     * clickCall 点击返回
     * divId 页面容器
     */
    value: function setDefault(ns) {
      this.dufauleArea = ns;
    }
  }, {
    key: "drawMap",
    value: function drawMap(obj) {
      var _this4 = this;

      // 这里调用绘制地图方法
      var data = {};
      data.path = 'https://mat1.gtimg.com/yslp/yyh5/mapview/';

      if (!window.location.href.match('qq.com')) {
        data.path = '../';
      } //地图上显示的数据


      data.mapList = obj.provs;
      data.div = {
        id: obj.divId,
        width: 1500,
        height: 1200
      };

      var darwOver = function darwOver() {
        if (_this4.dufauleArea) {
          _this4.map.clean();

          _this4.map.selectProv(_this4.dufauleArea);
        }
      };

      var defaultArea = "湖北";

      if (this.dufauleArea) {
        defaultArea = this.dufauleArea;
      } //对应的颜色10000 1000 500ren 100ren 10+ 0


      data.colors = ['#9C0A0D', '#C91014', '#E64B47', '#FE8664', '#FFD2A0', '#FFEFD7'];
      var initData = {
        data: data,
        shareCall: obj.clickCall,
        drawOver: darwOver,
        defaultArea: defaultArea,
        gotoProvPage: obj.gotoProvPage
      };
      this.map = new Main(initData);
    }
  }, {
    key: "cleanMap",
    value: function cleanMap() {
      this.map.clean();
    }
  }, {
    key: "selectProv",
    value: function selectProv(ns) {
      this.cleanMap();
      this.map.selectProv(ns);
    } //clone obj

  }, {
    key: "cloneObj",
    value: function (_cloneObj) {
      function cloneObj(_x) {
        return _cloneObj.apply(this, arguments);
      }

      cloneObj.toString = function () {
        return _cloneObj.toString();
      };

      return cloneObj;
    }(function (obj) {
      var newObj = {};

      if (_instanceof(obj, Array)) {
        newObj = [];
      }

      for (var key in obj) {
        var val = obj[key]; //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。

        newObj[key] = _typeof(val) === 'object' ? cloneObj(val) : val;
      }

      return newObj;
    })
  }]);

  return JaredHao;
}();

window.jared = new JaredHao();