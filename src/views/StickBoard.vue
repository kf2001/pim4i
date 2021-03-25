<script>
export default {
  name: "MyStick",
  components: {},
  data: function () {
    return {
      backGrounds: ["#F5FFA5", "#88FB87", "#FFA3FF", "#83FBE0"],
      stickWidth: 60,
      stickHeight: 90,
      boardtop: 0,
      boardLeft: 0,

      Nota: function (id_, testo_, posx_, posy_, colore_, zIndex_) {
        this.id = id_;
        this.testo = testo_;
        this.posx = posx_;
        this.posy = posy_;
        this.colore = colore_;
        this.zIndex = zIndex_;

        return this;
      },
      Notes: [],
    };
  },
  mounted: function () {
    this.boarddiv = this.$refs.board;

    this.boarddiv.addEventListener("dblclick", this.addNote);

    let offsets = this.boarddiv.getBoundingClientRect();
    this.boardTop = offsets.top;
    this.boardLeft = offsets.left;

    this.carica();
  },
  created: function () {},

  methods: {
    salva() {
      let Notes_ = document.getElementsByClassName("stick");

      this.Notes = [];
      Notes_.forEach((nn) => {
        let newNota = new this.Nota(
          nn.id,
          nn.innerHTML,
          this.estrai_offset(nn.style.left, this.boardLeft),
          this.estrai_offset(nn.style.top, this.boardTop),
          nn.colore,
          nn.style.zIndex
        );
        this.Notes.push(newNota);
      });

      localStorage.Notes = JSON.stringify(this.Notes);
    },

    estrai_offset(px, start) {
      return parseInt(px.slice(0, -2) - start);
    },
    getMaxZIndex: function (sticks_) {
      let maxzindex = 0;
      sticks_.forEach((nn) => {
        if (nn.style.zIndex * 1 > maxzindex * 1) maxzindex = 1 * nn.style.zIndex;
      });
      return maxzindex;
    },
    getMaxId: function (sticks_) {
      let maxId = 0;
      sticks_.forEach((nn) => {
        if (nn.id * 1 > maxId * 1) maxId = 1 * nn.id;
      });

      return maxId;
    },

    carica() {
      if (localStorage.Notes) this.Notes = JSON.parse(localStorage.Notes);

      this.Notes.forEach((nn) => {
        let params = {
          id: nn.id,
          left: nn.posx,
          top: nn.posy,
          zIndex: nn.zIndex,
          testo: nn.testo,
          colore: nn.colore,
        };

        this.addStick(params);
      });
    },

    onDrop(evt) {
      const itemID = evt.dataTransfer.getData("itemID");
      const px = evt.dataTransfer.getData("px");
      const py = evt.dataTransfer.getData("py");

      let note = document.getElementById(itemID);

      note.style.left = evt.offsetX + this.boardLeft - px * 1 + "px";
      note.style.top = evt.offsetY + this.boardTop - py * 1 + "px";
    },
    onDropTrash(evt) {
      const itemID = evt.dataTransfer.getData("itemID");

      let note = document.getElementById(itemID);
      note.remove();
    },

    addStick(params) {
      var note = document.createElement("div");
      note.id = params.id;
      note.classList.add("stick");
      note.style.left = params.left + this.boardLeft + "px";
      note.style.top = params.top + this.boardTop + "px";
      note.style.width = this.stickWidth + "px";
      note.style.height = this.stickHeight + "px";
      note.style.color = "black";
      note.style.backgroundColor = this.backGrounds[params.colore];
      note.style.fontSize = "12px";
      note.style.fontFamily = "Verdana";
      note.style.position = "absolute";
      note.innerHTML = params.testo;
      note.setAttribute("contenteditable", true);
      note.setAttribute("draggable", true);
      note.style.overflow = "hidden";
      note.style.zIndex = params.zIndex;
      note.colore = params.colore;
      const ofx = this.boardLeft;
      const ofy = this.boardTop;
      note.addEventListener("dragstart", function (event) {
        event.dataTransfer.dropEffect = "move";

        event.dataTransfer.effectAllowed = "move";
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left; //x position within the element.
        var y = event.clientY - rect.top; //y position within the element.

        event.dataTransfer.setData("itemID", this.id);
        event.dataTransfer.setData("px", x);
        event.dataTransfer.setData("py", y);
      });

      note.addEventListener("dragend", function (event) {
        event.target.classList.remove("raised");
      });
      const mzi = this.getMaxZIndex;
      note.addEventListener("mousedown", function (event) {
        event.target.style.zIndex = mzi(document.getElementsByClassName("stick")) + 1;
        event.stopPropagation();
      });
      note.addEventListener("keypress", function (event) {
        var keycode = event.charCode || event.keyCode;

        if (keycode == 13) {
          event.preventDefault();

          return false;
        }
      });

      this.boarddiv.append(note);

      return note;
    },

    addNote(evt) {
      let Notes_ = document.getElementsByClassName("stick");
      let maxzindex = this.getMaxZIndex(Notes_);
      let maxId = this.getMaxId(Notes_);

      /*      Notes_.forEach((nn) => {
        if (nn.style.zIndex * 1 > maxzindex * 1) maxzindex = 1 * nn.style.zIndex;
        if (nn.id * 1 > maxId * 1) maxId = 1 * nn.id;
      });
 */
      let params = {
        id: maxId + 1,
        left: evt.offsetX,
        top: evt.offsetY,
        zIndex: maxzindex * 1 + 1,

        testo: "",
        colore: Math.floor(Math.random() * this.backGrounds.length),
      };

      this.addStick(params);
    },
  },
};
</script>

<template>
  <div>
    <div>
      <div style="width: 500px">
        <button id="save" @click="salva">Salva</button>
        <!-- <button id="carica" @click="carica">Carica</button> -->
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

    <div
      id="trash"
      ref="trash"
      class="drop-zone"
      @drop="onDropTrash($event, 1)"
      @dragover.prevent
      @dragenter.prevent
    ></div>
  </div>
</template>

<style lang="css">
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
  background-image: url("trash.png");
  background-size: cover;
  background-color: #c0c0c0;
}

.stick {
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
