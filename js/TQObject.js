var $ = function(s) {
  var data = document;
  this.stop = false;
  this.isarr = false;
  this.error = "";
  var selecter = [];

  //获取数据
  this.GetData = function (s) {
    if (s.substring(0,1) == "#") {
      this.isarr = false;
      var data = this.d.getElementById(s.substring(1));
      if (data == null || data == undefined) {
        this.stop = true;
        this.error = s;
      }
    } else if (s.substring(0,1) == ".") {
      this.isarr = true;
      var data = [];
      var gets = this.d.getElementsByTagName("*");
      var reg  = new RegExp("(^|\\s)" + s.substring(1) + "($|\\s)");
      for (var i=0; i<gets.length; i++) {
        if (reg.test(gets[i].className)) {
          data.push(gets[i]);
        }
      }
      if (data.length == 0) {
        this.stop = true;
        this.error = s;
      }
    } else {
      this.isarr = true;
      var data = this.d.getElementsByTagName(s);
      if (data.length == 0 || data == undefined) {
        this.stop = true;
        this.error = s;
      }
    }
    return data;
  }

  //分割关键字
  selecter.push.apply(selecter, s.split(' '));
  for (var i = 0; i < selecter.length; i++) {
    if (this.stop) {
      console.log("error: "+this.error );
      break;
    }
    if(this.isarr && data.length > 0) {
      for (var k = 0; k < data.length; k++) {
        data[k];
      }
    } else {
      this.d = data;
    }
    var data = this.GetData(selecter[i]);

    console.log(selecter[i], data, Array.isArray(data));
  }

  return this;
}