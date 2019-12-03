
var Util = {
	repositionWindowCenter: function (objPw, wRate, hRate,wMin,hMin) {
		if (objPw) {
			var t = objPw.targetControl;
			var bw = $(t).width();
			var bh = $(t).height();
			var w = objPw.width;
			var h = objPw.height;

			if (wRate != undefined) {
				w = bw * wRate;
			}
			if (hRate != undefined) {
				h = bh * hRate;
			}

			if (wMin != undefined) {
				if (w < wMin) {
					w = wMin;
				}
			}

			if (hMin != undefined) {
				if (h < hMin) {
					h = hMin;
				}
			}

			objPw.ReSize(w, h);
			var x = (bw - w) / 2;
			var y = (bh - h) / 2;
			objPw.RePosition(x, y);
		}
	},
	repositionWindow: function (objPw) {
		if (objPw) {
			//var t = objPw.targetControl;
			//var bw = $(t).width();
			//var bh = $(t).height();
			//var w = objPw.width;
			//var h = objPw.height;

			//if (xRate != undefined) {
			//	w = bw * xRate;
			//}
			//if (yRate != undefined) {
			//	h = bh * yRate;
			//}
			//objPw.ReSize(w, h);
			//var x = (bw - w) / 2;
			//var y = (bh - h) / 2;
			//objPw.RePosition(x, y);
		}
	}

}