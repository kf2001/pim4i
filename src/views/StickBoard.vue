<script>
export default {
  name: "MyStick",
  components: {},
  data: function () {
    return {
      maxzindex:1,
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
    };
  },
  mounted: function () {
    this.boarddiv = this.$refs.board;
    console.log(this.$refs.board);

    this.boarddiv.addEventListener("dblclick", this.addNote);
    this.boarddiv.addEventListener("dragover", this.onDragOver);
    this.boarddiv.addEventListener("drop", this.onDrop);
    this.boarddiv.addEventListener("dragover", (event) => {
      event.preventDefault();
      this.boarddiv.addEventListener("dragenter", (event) => {
        event.dataTrasfer.dropEffect = "move";
      });
    });
  },
  created: function () {
    // this.carica();

    console.log(33333);
  },

  methods: {
    salva() {
      localStorage.Notes = JSON.stringify(this.Notes);
    },
    carica() {
      if (localStorage.Notes) this.Notes = JSON.parse(localStorage.Notes);
    },
    onDragOver(evt) {
      evt.preventDefault();
      // Set the dropEffect to move
      evt.dataTransfer.dropEffect = "move";
    },
    onDrop(evt) {
      evt.preventDefault();

      console.log("drop");
    },
    addNote(evt) {
      let offsets = this.boarddiv.getBoundingClientRect();
      let top = offsets.top;
      let left = offsets.left;

      var note = document.createElement("div");
      note.id = 4321;
      note.classList.add("note");
      note.style.left = evt.offsetX + left + "px";
      note.style.top = evt.offsetY + top + "px";
      note.style.width = 40 + "px";
      note.style.height = 60 + "px";
      note.style.color = "black";
      note.style.backgroundColor = "yellow";
      note.style.fontSize = "12px";
      note.style.fontFamily = "Verdana";
      note.style.position = "absolute";
      note.innerHTML = "ciao";
      note.setAttribute("contenteditable", true);
      note.setAttribute("draggable", true);
      note.style.zIndex= ++this.maxzindex;

      note.addEventListener("dragstart", function (event) {
        console.log(88);
        event.target.classList.add("raised");
        event.dataTransfer.effectAllowed = "move";
      });

      note.addEventListener("dragend", function (event) {
        console.log(99);
        event.target.classList.remove("raised");
      });

         note.addEventListener("mousedown", function (event) {
      
            console.log(event.target.style.zIndex)
                event.target.style.zIndex=12+Math.floor(Math.random()*10);
   console.log(event.target.style.zIndex)
                event.stopPropagation();

      
      });

      /* 

                    css("left", options.posx + "px").
                    css("top", options.posy + "px").
                    css("width", options.width + "px").
                    css("height", options.height + "px").
                    css("color", options.forecolor).
                    css("backgroundColor", options.backcolor).
                    css("fontSize", options.fontsize + "px").
                    css("fontFamily", options.fontfamily).
                    attr("contentEditable", "true").
                    text(options.testo);
 */

      /*   note.keypress(function (e) {
        if (e.keyCode == 10 || e.keyCode == 13) {
          e.preventDefault();
        }
      }); */

      this.boarddiv.append(note);
      //   note.draggable();
      //     note.focus();

      return note;
    },
  },
};
</script>

<template>
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

    <div id="board" ref="board"></div>
  </div>
</template>

<style lang='css'>
#board {
  height: 400px;
  width: 600px;
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
  position: relative;
  background-color: #f5ffa5;
  padding: 0.3em;
  box-shadow: 0.05em 0.05em 0.1em black;
}

.note.raised {
  box-shadow: 0.2em 0.2em 0.5em black;
}
</style>



