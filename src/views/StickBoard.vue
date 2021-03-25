<script>
export default {
  name: "MyStick",
  components: {},
  data: function () {
    return {
      maxzindex: 1,
      Nota: function (id_, testo_, posx_, posy_, colore_) {
        this.id = id_;
        this.testo = testo_;
        this.posx = posx_;
        this.posy = posy_;
        this.colore = colore_;

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

      this.Notes = [];
      Notes_.forEach((nn) => {
        let newNota = new this.Nota(
          nn.id,
          nn.innerHTML,
          nn.style.offsetX,
          nn.style.offsetY,
          nn.colore
        );
        this.Notes.push(newNota);
      });

      localStorage.Notes = JSON.stringify(this.Notes);
    },
    carica() {
      if (localStorage.Notes) this.Notes = JSON.parse(localStorage.Notes);

      Notes.forEach((nn) => {
        let params = {
          id: nn.id,
          offsetX: nn.offsetX,
          offsetY: nn.offsetY,
          zIndex: nn.zIndex,
          //   testo:maxId*1+1,
          testo: nn.testo,
          colore: nn.colore,
          //  tipo:params.tipo
        };

        this.addStick(params);

        /*   let newNota = new this.Nota(
          nn.id,
          nn.innerHTML,
          nn.offsetX,
          nn.offsetY,
          40,
          60,
          "black",
          "yellow"
        );
        this.Notes.push(newNota); */
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

      var note = document.createElement("div");
      note.id = params.id;
      note.classList.add("nota");
      note.style.left = params.offsetX + left + "px";
      note.style.top = params.offsetY + top + "px";
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
        offsetX: evt.offsetX,
        offsetY: evt.offsetY,
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
