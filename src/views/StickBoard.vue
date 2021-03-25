<script>
export default {
  name: "MyStick",
  components: {},
  data: function () {
    return {
      maxzindex: 1,
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
    console.log(this.$refs.board);

    this.boarddiv.addEventListener("dblclick", this.addNote);
  },
  created: function () {
    // this.carica();
    console.log(33333);
  },

  methods: {
    salva() {
      let Notes_ = document.getElementsByClassName("nota");
      let offsets = this.boarddiv.getBoundingClientRect();
      let top = offsets.top;
      let left = offsets.left;

      this.Notes = [];
      Notes_.forEach((nn) => {
        console.log(nn.style.left, nn.style.top);
        let aaa = this.estrai_offset(nn.style.left, left);
        let newNota = new this.Nota(
          nn.id,
          nn.innerHTML,
          this.estrai_offset(nn.style.left, left),
          this.estrai_offset(nn.style.top, top),
          nn.colore,
          nn.style.zIndex
        );
        this.Notes.push(newNota);
      });
      console.log(Notes_);
      localStorage.Notes = JSON.stringify(this.Notes);
    },

    estrai_offset(px, start) {
      console.log(px, start);
      return parseInt(px.slice(0, -2) - start);
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
        console.log(params);
        this.addStick(params);
      });
    },

    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");

      let offsets = this.boarddiv.getBoundingClientRect();
      let top = offsets.top;
      let left = offsets.left;
      let note = document.getElementById(itemID);

      note.style.left = evt.offsetX + left + "px";
      note.style.top = evt.offsetY + top + "px";
    },

    addStick(params) {
      let offsets = this.boarddiv.getBoundingClientRect();
      let top = offsets.top;
      let left = offsets.left;

      console.log(params);

      var note = document.createElement("div");
      note.id = params.id;
      note.classList.add("nota");
      note.style.left = params.left + left + "px";
      note.style.top = params.top + top + "px";
      note.style.width = 40 + "px";
      note.style.height = 60 + "px";
      note.style.color = "black";
      note.style.backgroundColor = "yellow";
      note.style.fontSize = "12px";
      note.style.fontFamily = "Verdana";
      note.style.position = "absolute";
      note.innerHTML = params.testo;
      note.setAttribute("contenteditable", true);
      note.setAttribute("draggable", true);
      note.style.zIndex = params.zIndex;
      note.colore = params.colore;

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

      this.boarddiv.append(note);

      return note;
    },

    addNote(evt) {
      let maxId = 0;
      let maxzindex = 0;
      let Notes_ = document.getElementsByClassName("nota");
      Notes_.forEach((nn) => {
        if (nn.style.zIndex * 1 > maxzindex * 1) maxzindex = 1 * nn.style.zIndex;
        if (nn.id * 1 > maxId * 1) maxId = 1 * nn.id;
      });

      let params = {
        id: maxId + 1,
        left: evt.offsetX,
        top: evt.offsetY,
        zIndex: maxzindex * 1 + 1,
        //   testo:maxId*1+1,
        testo: "",
        colore: 0,
        //  tipo:params.tipo
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
        <button id="carica" @click="carica">Carica</button>
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
  background-color: #c0c0c0;
}

.nota {
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
