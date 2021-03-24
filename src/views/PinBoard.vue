<template>
  <div>
    <div class="container" id="container">
      <div class="box" id="movable">
        <div class="face" id="face"></div>
        <p id="message">plz move me</p>
      </div>
    </div>
    <div>
      <div>
        <div style="width: 500px">
          <button id="save">Salva</button>
          <button id="colore">Colore</button>
          <button id="fontp">Font +</button>
          <button id="fontm">Font -</button>
          <button id="chfont">Cambia Font</button>
        </div>
      </div>
      <div class="panel-body" style="height: 700px">
        <div id="board"></div>
        <!-- <div id="board" background="cork.jpg"></div> -->
        <!-- <div id="trash"><img height="180px" src="trash.svg" /></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPin",
  components: {},
  data: function () {
    return {
      Notes: [],
      maxzindex: 11,
      boarddiv,

      Nota: function (
        testo_,
        posx_,
        posy_,
        width_,
        height_,
        forecolor_,
        backcolor_
      ) {
        this.testo = testo_;
        this.posx = posx_;
        this.posy = posy_;
        this.width = width_;
        this.height = height_;
        this.forecolor = forecolor_;
        this.backcolor = backcolor_;
        this.fontsize = 16;
        this.fontfamily = "Verdana";
        return this;
      },

      Notes: [],

      colori_sfondo: new Array("#F5FFA5", "#88FB87", "#FFA3FF", "#83FBE0"),

      font_family: new Array(
        "Gabriola",
        "Verdana",
        "Arial",
        "Helvetica",
        "Lucida",
        "Consolas",
        "Times new roman"
      ),
    };
  },

  created000: function () {
    console.log(33333);
    this.boarddiv = this.$refs.boarddiv;
    console.log(this.$refs.boarddiv);
    this.boarddiv.innerHTML = "ciao";
    return;
    const moveMe = document.getElementById("movable"),
      face = document.getElementById("face"),
      message = document.getElementById("message");

    let diffY,
      diffX,
      elmHeight,
      elmWidth,
      containerHeight,
      containerWidth,
      outOfBoundsCounter,
      isMouseDown = false;

    function setOutOfBoundsFace() {
      if (
        !moveMe.classList.contains("pained") &&
        !moveMe.classList.contains("fainted")
      ) {
        outOfBoundsCounter++;
        if (outOfBoundsCounter < 5) {
          moveMe.classList.add("pained");
          message.innerHTML = "ouch!";
        } else {
          moveMe.classList.add("fainted");
          message.innerHTML = "zzz";
          setTimeout(() => {
            outOfBoundsCounter = 0;
          }, 3000);
        }
      }
    }

    function resetFace() {
      if (outOfBoundsCounter < 5) {
        moveMe.classList.remove("pained", "fainted");
        message.innerHTML = "yay!";
      }
    }

    function mouseDown(e) {
      isMouseDown = true;
      outOfBoundsCounter = 0;
      // get initial mousedown coordinated
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      // get element top and left positions
      const elm = moveMe;
      const elmY = elm.offsetTop;
      const elmX = elm.offsetLeft;

      // get elm dimensions
      elmWidth = elm.offsetWidth;
      elmHeight = elm.offsetHeight;

      // get container dimensions
      const container = elm.offsetParent;
      containerWidth = container.offsetWidth;
      containerHeight = container.offsetHeight;

      // get diff from (0,0) to mousedown point
      diffY = mouseY - elmY;
      diffX = mouseX - elmX;
    }

    function mouseMove(e) {
      if (!isMouseDown) return;
      const elm = moveMe;
      // get new mouse coordinates
      const newMouseY = e.clientY;
      const newMouseX = e.clientX;

      // calc new top, left pos of elm
      let newElmTop = newMouseY - diffY,
        newElmLeft = newMouseX - diffX;

      // calc new bottom, right pos of elm
      let newElmBottom = newElmTop + elmHeight,
        newElmRight = newElmLeft + elmWidth;

      if (
        newElmTop < 0 ||
        newElmLeft < 0 ||
        newElmTop + elmHeight > containerHeight ||
        newElmLeft + elmWidth > containerWidth
      ) {
        // if elm is being dragged off top of the container...
        if (newElmTop < 0) {
          newElmTop = 0;
        }

        // if elm is being dragged off left of the container...
        if (newElmLeft < 0) {
          newElmLeft = 0;
        }

        // if elm is being dragged off bottom of the container...
        if (newElmBottom > containerHeight) {
          newElmTop = containerHeight - elmHeight;
        }

        // if elm is being dragged off right of the container...
        if (newElmRight > containerWidth) {
          newElmLeft = containerWidth - elmWidth;
        }
        setOutOfBoundsFace();
      } else {
        resetFace();
      }

      moveElm(elm, newElmTop, newElmLeft);
    }

    // move elm
    function moveElm(elm, yPos, xPos) {
      elm.style.top = yPos + "px";
      elm.style.left = xPos + "px";
    }

    function mouseUp() {
      isMouseDown = false;
      message.innerHTML = "plz move me";
    }

    moveMe.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    this.carica();
    console.log(8888);
    var nn;
    var lastcolore = 0;
    var lastfont = 0;

    /* 
 $("#trash").droppable();

    $(document).on("dragstart", ".note", function (event) {
      $(event.target).addClass("raised");
    });

    $(document).on("mousedown", ".note", function (event) {
      nn = $(event.target);

      $(nn).css("z-index", ++maxzindex);

      event.stopPropagation();
    });

    $(document).on("dblclick", "#board", function (event) {
      var nuovan = Notes.add({
        posx: event.clientX,
        posy: event.clientY,
        backcolor: colori_sfondo[lastcolore],
        fontfamily: font_family[lastfont],
      });
      event.stopPropagation();

      $(nuovan).css("z-index", ++maxzindex);
    });

    $("#save").on("click", function (event) {
      Notes.save();
    });

    $("#colore").on("click", function (event) {
      lastcolore = (lastcolore + 1) % colori_sfondo.length;
    });

    $("#chfont").on("click", function (event) {
      lastfont = (lastfont + 1) % font_family.length;
      nn.css("fontFamily", font_family[lastfont]);
    });

    $("#fontp").on("click", function (event) {
      var oldfont = parseInt(nn.css("fontSize"));
      var newfont = (oldfont += 2);
      nn.css("fontSize", newfont);
    });
    $("#fontm").on("click", function (event) {
      var oldfont = parseInt(nn.css("fontSize"));
      var newfont = (oldfont -= 2);
      nn.css("fontSize", newfont);
    });

    $(document).on("dragstop", ".note", function (event) {
      $(event.target).removeClass("raised");
    });

    $("#trash").on("drop", function (event, ui) {
      ui.draggable.toggle("drop");

      setTimeout(function () {
        ui.draggable.remove();
      }, 1000);
    }); */
  },

  methods: {
    salva() {
      localStorage.Notes = JSON.stringify(this.Notes);
    },
    carica() {
      if (localStorage.Notes) this.Notes = JSON.parse(localStorage.Notes);
    },
  
  },    mounted: function () {
    console.log("cazzo");
  },
};
</script>




<style>
#board {
  height: 90%;
  width: 80%;
  border: solid black 2px;
  border-radius: 5px;
  float: left;
  z-index: 10;
  /*    background-color: #474a51; 
  background-image: url("cork.jpg");*/
  background-repeat: repeat;
}

#trash {
  height: 190px;
  width: 150px;
  border: solid black 2px;
  border-radius: 2px;
  float: right;
  background-color: #c0c0c0;
}

.note {
  font-family: "Gabriola";
  font-size: 1.65em;
  font-weight: bolder;
  border: solid #93a500 1px;
  color: black;
  border-radius: 0.35em;
  height: 180px;
  width: 140px;
  position: absolute;
  background-color: #f5ffa5;
  padding: 0.3em;
  box-shadow: 0.05em 0.05em 0.1em black;
}

.note.raised {
  box-shadow: 0.2em 0.2em 0.5em black;
}
</style>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=PT+Mono");

body,
html,
.container {
  margin: 0;
  padding: 0;
  border: 0;
  position: relative;
  background-color: #767df9;
  width: 100%;
  height: 100%;
}

.face {
  width: 125px;
  height: 70px;
  font-size: 35px;
  line-height: 70px;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 70px;
  left: 100px;
  box-sizing: border-box;
  border: 2px solid currentColor;
  color: #000;
  background: #474ec8;
  width: 150px;
  height: 150px;
  font-family: "PT Mono", monospace;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  text-align: center;
}
</style>


<script>
</script>





