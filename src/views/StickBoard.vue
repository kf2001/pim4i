<script>
export default {
  name: "MyStick",
  components: {},
  data: function () {
    return {
      maxzindex: 1,
      Nota: function (
        id_,
        testo_,
        posx_,
        posy_,
        width_,
        height_,
        forecolor_,
        backcolor_
      ) {
        this.id = id_;
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
    /*
    this.boarddiv.addEventListener("drop", this.onDrop);
    this.boarddiv.addEventListener("dragover", (event) => {
      event.preventDefault();
      });
     }); this.boarddiv.addEventListener("dragenter", (event) => {
        event.dataTrasfer.dropEffect = "move";
      */
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
  /*   onDragOver(evt) {
      evt.preventDefault();
      // Set the dropEffect to move
      evt.dataTransfer.dropEffect = "move";
    },
 */
    onDrop(evt, list) {
    
      const itemID = evt.dataTransfer.getData("itemID");
     
      let offsets = this.boarddiv.getBoundingClientRect();
      let top = offsets.top;
      let left = offsets.left;
      let note = document.getElementById(itemID);

      note.style.left = evt.offsetX + left + "px";
      note.style.top = evt.offsetY + top + "px";
    },
    addNote(evt) {
      let idmax = 0;
      if (this.Notes.length)
        idmax = this.Notes.map((cc) => cc.id).reduce((max, d) =>
          1*d > 1*max ? 1*d : 1*max
        );
      let offsets = this.boarddiv.getBoundingClientRect();
      let top = offsets.top;
      let left = offsets.left;

      var note = document.createElement("div");
      note.id = 1*idmax + 1;
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
      note.innerHTML = note.id;
      note.setAttribute("contenteditable", true);
      note.setAttribute("draggable", true);
      note.style.zIndex = ++this.maxzindex;

      note.addEventListener("dragstart", function (event) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
      
        event.dataTransfer.setData("itemID", this.id);
     
      });

      note.addEventListener("dragend", function (event) {
       
        event.target.classList.remove("raised");
      });

      note.addEventListener("mousedown", function (event) {
       
        event.target.style.zIndex = 12 + Math.floor(Math.random() * 10);
      
        event.stopPropagation();
      });

      let newNota = new this.Nota(
        note.id,
        note.innerHTML,
        evt.offsetX,
        evt.offsetY,
        40,
        60,
        "black",
        "yellow"
      );
      this.Notes.push(newNota);

      this.boarddiv.append(note);
  

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

    <div
      id="board"
      ref="board"
      class="drop-zone"
      @drop="onDrop($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    ></div>
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
  background-color: #474a51; 
  background-image: url("cork.jpg");
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


