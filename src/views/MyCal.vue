<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import itLocale from "@fullcalendar/core/locales/it";

export default {
  name: "MyCal",
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data: function () {
    return {
     
      tipi: ["lavoro", "impegno","scadenza" ,"extra/svago", "nota"],
      colori:["royalblue","green", "darkmagenta","orange", "yellow"],
      tipoevento: 0,
      calendarOptions: {
        events: [],
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin, // needed for dateClick
        ],
        locale: itLocale,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        initialView: "dayGridMonth",

        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        slotMinTime: "08:00:00",
        slotMaxTime: "22:30:00",
        slotDuration: "00:30:00",
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        drop: function () {
 
        },
        eventsSet: this.handleEvents,
        dragRevertDuration: 0,
        droppable: true,
        dropAccept: true,
        eventDragStop: function (event, jsEvent, ui, view) {
       
        },
        // this allows things to be dropped onto the calendar
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  created: function () {
    this.carica();
  },

  methods: {
    salva() {
      localStorage.eventi = JSON.stringify(this.currentEvents);
    },
    carica() {
      if (localStorage.eventi)
        this.calendarOptions.events = JSON.parse(localStorage.eventi);
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: this.calendarOptions.events.length,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          backgroundColor: this.colori[this.tipoevento],
          tipo: this.tipoevento
        });

        this.salva();
      }
    },
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
          this.salva();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<template>
  <div class="demo-app">
   <div>
<sui-form-fields grouped>

      <label>Tipo evento</label>
      <sui-form-field > <div class="fc-event lavoro" >  <sui-checkbox label="lavoro" radio value=0 v-model="tipoevento" /></div>  </sui-form-field>
      <sui-form-field >   <div class="fc-event impegno" >      <sui-checkbox label="impegno" radio value=1 v-model="tipoevento" /></div>      </sui-form-field>
      <sui-form-field >  <div class="fc-event scadenza" >       <sui-checkbox label="scadenza" radio value=2 v-model="tipoevento" />  </div>    </sui-form-field>
      <sui-form-field >   <div class="fc-event extra" >      <sui-checkbox label="extra" radio value=3 v-model="tipoevento" />   </div>   </sui-form-field>
      <sui-form-field >   <div class="fc-event nota" >      <sui-checkbox label="nota" radio value=4 v-model="tipoevento" />   </div>   </sui-form-field>
     
    

    Value: {{ tipoevento }}
 </sui-form-fields>

<!-- 
      <div id='draggable-el' draggable="true" data-event='{ "title": "my event", "duration": "02:00" }'>drag me</div>
      <div class="fc-event scadenza" id="scadenza">Scadenza</div>
      <div class="fc-event impegno" id="impegno">Impegno</div>
      <div class="fc-event extra" id="extra">Extra</div>
      <div class="fc-event nota" id="nota">Nota</div> -->
    </div>
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b {
  /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}
.demo-app-sidebar-section {
  padding: 2em;
}
.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
<style scoped src="@/css/core.css"></style>
<style scoped src="@/css/colori.css"></style>
<style scoped src="@/css/daygrid.css"></style>

