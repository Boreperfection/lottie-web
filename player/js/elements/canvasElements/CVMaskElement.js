function CVMaskElement(data,element,globalData){
    this.data = data;
    this.element = element;
    this.globalData = globalData;
    this.masksProperties = this.data.masksProperties;
    this.totalMasks = this.masksProperties.length;
    this.ctx = this.element.canvasContext;
    this.viewData = new Array(this.masksProperties.length);
    var i, len = this.masksProperties.length;
    for (i = 0; i < len; i++) {
        this.viewData[i] = PropertyFactory.getShapeProp(this.data,this.masksProperties[i],3,this.dynamicProperties)
    }
};

CVMaskElement.prototype.prepareFrame = function (num) {
    this.frameNum = num;
};

CVMaskElement.prototype.renderFrame = function (transform) {
    var ctx = this.ctx;
    ctx.beginPath();
    var i, len = this.data.masksProperties.length;
    var pt,pt2,pt3;
    for (i = 0; i < len; i++) {
        if (this.masksProperties[i].inv) {
            ctx.moveTo(0, 0);
            ctx.lineTo(this.globalData.compWidth, 0);
            ctx.lineTo(this.globalData.compWidth, this.globalData.compHeight);
            ctx.lineTo(0, this.globalData.compHeight);
            ctx.lineTo(0, 0);
        }
        pt = transform.applyToPointArray(data.v[0][0],data.v[0][1]);
        ctx.moveTo(pt[0], pt[1]);
        var j, jLen = data.v.length;
        for (j = 1; j < jLen; j++) {
            pt = transform.applyToPointArray(data.o[j - 1][0],data.o[j - 1][1]);
            pt2 = transform.applyToPointArray(data.i[j][0],data.i[j][1]);
            pt3 = transform.applyToPointArray(data.v[j][0],data.v[j][1]);
            ctx.bezierCurveTo(pt[0], pt[1], pt2[0], pt2[1], pt3[0], pt3[1]);
        }
        pt = transform.applyToPointArray(data.o[j - 1][0],data.o[j - 1][1]);
        pt2 = transform.applyToPointArray(data.i[0][0],data.i[0][1]);
        pt3 = transform.applyToPointArray(data.v[0][0],data.v[0][1]);
        ctx.bezierCurveTo(pt[0], pt[1], pt2[0], pt2[1], pt3[0], pt3[1]);
    }
    ctx.clip();
};

CVMaskElement.prototype.destroy = function(){
    this.ctx = null;
};