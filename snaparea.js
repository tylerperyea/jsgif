    function getScreenshot(callback) {
        getScreenshotArea(function (area) {
            html2canvas(document.body, {
                onrendered: function (canvas) {
                    var econt = document.createElement("CANVAS");
                    econt.width = area.width;
                    econt.height = area.height;
                    //document.body.appendChild(econt);
                    var canv = econt.getContext('2d');
                    canv.drawImage(canvas, -area.x, -area.y);
                    callback(econt.toDataURL("image/png"));
                }
            });
        }, "Screenshot");
    }
    function getAreaCanvas(area, cback){
         html2canvas(document.body, {
                onrendered: function (canvas) {
                    var econt = document.createElement("CANVAS");
                    econt.width = area.width;
                    econt.height = area.height;
                    var canv = econt.getContext('2d');
                    canv.drawImage(canvas, -area.x, -area.y);
                    cback(econt);
                }
            });
    }

    function getScreenshotArea(callback, titlet) {
        var title = titlet;
        if (title == undefined) {
            title = "Area Select";
        }
        var initc = undefined;
        var startc = undefined;
        var endc = undefined;
        var tc = undefined;
        var snapListen = false;
        var resizing = false;
        var fullDone = false;
        var dragSelection = true;
        var selType = "moving";

        var unloadfunc = function (torem) {
            fullDone = true;
            startc = undefined;
            snapListen = false;
            var elm1 = document.getElementById("myrect");
            var elm2 = document.getElementById("mycoord");
            var elm3 = document.getElementById("overlay-1");
            var elm4 = document.getElementById("overlay-2");
            var elm5 = document.getElementById("overlay-3");
            var elm6 = document.getElementById("overlay-4");

            elm1.parentNode.removeChild(elm1);
            elm2.parentNode.removeChild(elm2);
            elm3.parentNode.removeChild(elm3);
            elm4.parentNode.removeChild(elm4);
            elm5.parentNode.removeChild(elm5);
            elm6.parentNode.removeChild(elm6);



            document.body.removeEventListener('click', torem);
            document.body.removeEventListener('keyup', torem);
        };
        //Drag area should probably be default
        dragSelection = true;
        document.body.addEventListener("keyup", function myFunction2(e) {
            if (e.keyCode == 27) {
                e.preventDefault();
                unloadfunc(arguments.callee);
            }
        });
        var getPoint = function (e) {
            x = e.clientX;
            y = e.clientY;
            tc = {
                x: x,
                y: y
            };
            return tc;
        }
        var setArea = function (oc) {
            var w = oc.x2 - oc.x;
            var h = oc.y2 - oc.y;
            //part 1
            document.getElementById("overlay-1").style.width = oc.x + "px";
            document.getElementById("overlay-1").style.height = (oc.y + h) + "px";

            document.getElementById("overlay-2").style.width = "125%";
            document.getElementById("overlay-2").style.height = oc.y + "px";
            document.getElementById("overlay-2").style.top = "0px";
            document.getElementById("overlay-2").style.left = oc.x + "px";

            document.getElementById("overlay-3").style.width = "125%";
            document.getElementById("overlay-3").style.height = "125%";
            document.getElementById("overlay-3").style.top = oc.y + "px";
            document.getElementById("overlay-3").style.left = (oc.x + w) + "px";

            document.getElementById("overlay-4").style.width = (oc.x + w) + "px";
            document.getElementById("overlay-4").style.height = "125%";
            document.getElementById("overlay-4").style.top = (oc.y + h) + "px";
            style = 'cursor:se-resize;position:absolute;bottom:-17px;right:-17px;border:2px solid rgb(0, 160, 0);background-color:#00FF00;border-radius:10px;width:15px;height:15px'
            document.getElementById("overlay-4").style.left = "0px";

            document.getElementById("myrect").style.top = oc.y + "px";
            document.getElementById("myrect").style.left = oc.x + "px";

            document.getElementById("myrect").style.width = w + "px";
            document.getElementById("myrect").style.height = h + "px";
            startc={};
            endc={};
             startc.x = oc.x;
                            startc.y = oc.y;
                            endc.x = oc.x2;
                            endc.y = oc.y2;
        };
        document.body.addEventListener("mousemove", function myFunction(e) {
            if (snapListen) {
                console.log("resizing");
                tc = getPoint(e);
                var oc = JSON.parse(JSON.stringify(startc));


                if (selType == "moving") {
                    var mx = tc.x - initc.x;
                    var my = tc.y - initc.y;
                    oc.x = startc.x + (mx);
                    oc.y = startc.y + (my);
                    tc.x = endc.x + (mx);
                    tc.y = endc.y + (my);
                }
                document.getElementById("mycoord").style.top = (tc.y + window.pageYOffset - 13) + "px";
                document.getElementById("mycoord").style.left = (tc.x + window.pageXOffset - 13) + "px";
                if (startc != undefined) {

                    var w = tc.x - oc.x;
                    var h = tc.y - oc.y;
                    //part 1
                    document.getElementById("overlay-1").style.width = oc.x + "px";
                    document.getElementById("overlay-1").style.height = (oc.y + h) + "px";

                    document.getElementById("overlay-2").style.width = "125%";
                    document.getElementById("overlay-2").style.height = oc.y + "px";
                    document.getElementById("overlay-2").style.top = "0px";
                    document.getElementById("overlay-2").style.left = oc.x + "px";

                    document.getElementById("overlay-3").style.width = "125%";
                    document.getElementById("overlay-3").style.height = "125%";
                    document.getElementById("overlay-3").style.top = oc.y + "px";
                    document.getElementById("overlay-3").style.left = (oc.x + w) + "px";

                    document.getElementById("overlay-4").style.width = (oc.x + w) + "px";
                    document.getElementById("overlay-4").style.height = "125%";
                    document.getElementById("overlay-4").style.top = (oc.y + h) + "px";
                    style = 'cursor:se-resize;position:absolute;bottom:-17px;right:-17px;border:2px solid rgb(0, 160, 0);background-color:#00FF00;border-radius:10px;width:15px;height:15px'
                    document.getElementById("overlay-4").style.left = "0px";

                    document.getElementById("myrect").style.top = oc.y + "px";
                    document.getElementById("myrect").style.left = oc.x + "px";

                    document.getElementById("myrect").style.width = w + "px";
                    document.getElementById("myrect").style.height = h + "px";
                    coor = startc.x + "," + startc.y + "-" + tc.x + "," + tc.y;
                } else {

                    coor = tc.x + "," + tc.y;

                }

                document.getElementById("coordText").innerHTML = coor
            } else {
                console.log("no listen");
                if (fullDone) {
                    document.body.removeEventListener('mousemove', arguments.callee);
                }
            }
            ////console.log(coor);
        }, false);

        var selectionEvent = function (e) {
            if (snapListen) {
                tc = getPoint(e);
                if (startc == undefined) {
                    startc = tc;
                    document.getElementById("myrect").style.top = (tc.y + window.pageYOffset) + "px";
                    document.getElementById("myrect").style.left = (tc.x + window.pageXOffset) + "px";
                } else {
                    if (resizing) {
                        resizing = false;
                    } else {
                        if (selType == "moving") {
                            var mx = tc.x - initc.x;
                            var my = tc.y - initc.y;
                            startc.x = startc.x + (mx);
                            startc.y = startc.y + (my);
                            endc.x = endc.x + (mx);
                            endc.y = endc.y + (my);
                        } else if (selType != "confirm") {
                            endc = tc;
                        }
                        var rect = {
                            x: startc.x,
                            y: startc.y,
                            height: (endc.y - startc.y),
                            width: (endc.x - startc.x)
                        };
                        snapListen = false;
                        selType = "done";

                        if (fullDone) {
                            unloadfunc(arguments.callee);
                            callback(rect);
                        }
                    }

                }
            } else {

            }
        };
        if (!dragSelection) {
            document.body.addEventListener("click", selectionEvent, false);
        } else {
            document.body.addEventListener("mouseup", selectionEvent, false);
            document.body.addEventListener("mousedown", selectionEvent, false);
        }
        var tut = {};
        var okbutton = "<button style='position:absolute;bottom:-50px;left:0px;' id='confirmSelect'>Confirm</button>";
        var resizeDiv1 = "<div style='cursor:nw-resize;position:absolute;top:0px;left:0px;border:2px solid blue;background-color:#000088;width:25px;height:25px'></div>";
        var resizeDiv2 = "<div style='cursor:ne-resize;position:absolute;top:0px;right:0px;border:2px solid blue;background-color:#000088;width:25px;height:25px'></div>";
        var resizeDiv3 = "<div style='cursor:sw-resize;position:absolute;bottom:0px;left:0px;border:2px solid blue;background-color:#000088;width:25px;height:25px'></div>";
        var resizeDiv4 = "<div id='botrightresize' style='cursor:se-resize;position:absolute;bottom:-17px;right:-17px;border:2px solid rgb(0, 160, 0);background-color:#00FF00;border-radius:10px;width:15px;height:15px'></div>";

        var styleov = 'cursor:crosshair;width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;background: rgba(0, 0, 0, 0.25);    font-size: 20pt;    color: white;    /* display: none; */    z-index: 999999 !important;    text-align: center;    position: fixed;';
        var styleov2 = 'cursor:crosshair;width: 0;height: 0;position: absolute;top: 0px;left: 0px;background: rgba(0, 0, 0, 0.25);    font-size: 20pt;    color: white;    /* display: none; */    z-index: 999999 !important;    text-align: center;    position: fixed;';
        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov);
        tut.id = "overlay-1";
        //tut.innerHTML=resizeDiv;
        document.body.appendChild(tut);

        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov2);
        tut.id = "overlay-2";
        //tut.innerHTML=resizeDiv;
        document.body.appendChild(tut);

        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov2);
        tut.id = "overlay-3";
        //tut.innerHTML=resizeDiv;
        document.body.appendChild(tut);

        tut = document.createElement("DIV");
        tut.setAttribute("style", styleov2);
        tut.id = "overlay-4";
        //tut.innerHTML=resizeDiv;
        document.body.appendChild(tut);

        var econt = document.createElement("DIV");
        econt.innerHTML += "<div id='myrect' style='cursor:move;position:absolute;border:1px dashed black;top:0px;left:0px;width:0px;height:0px'>" +
            "<div style='padding:5px;border-radius:0px;position:absolute;background:rgb(76, 126, 231);color:white;top:-29px;left:0px;'>" + title + "</div>" +
        //resizeDiv1+
        //resizeDiv2+
        //resizeDiv3+
        resizeDiv4 + okbutton + "</div>";
        econt.innerHTML += "<div id='mycoord' style='overflow:hidden;padding:0px;margin:0px;position:absolute;opacity:0.0;top:0px;left:0px;width:1px;height:1px'><div id='coordText'></div></div>"


        document.body.appendChild(econt);

        document.getElementById("myrect").style.zIndex = 999999;
        document.getElementById("mycoord").style.zIndex = 1999999;
        document.getElementById("myrect").addEventListener("mousedown", function (e) {
            if (selType != "resizing") {
                console.log("moving");
                snapListen = true;
                resizing = true;
                initc = getPoint(e);
                selType = "moving";
                e.preventDefault();
                return false;
            }
        }, false);
        document.getElementById("confirmSelect").style.zIndex = 2999999;
        document.getElementById("confirmSelect").addEventListener("click", function (e) {
            snapListen = true;
            fullDone = true;
            resizing = false;
            selType = "confirm";
            selectionEvent(e);
        }, false);
        document.getElementById("botrightresize").addEventListener("mousedown", function (e) {
            endc = undefined;
            e.preventDefault();
            snapListen = true;
            resizing = true;
            selType = "resizing";
            console.log("down");
            return false;
        }, false);
        setArea({x:50,y:50,x2:250,y2:250});
    }
