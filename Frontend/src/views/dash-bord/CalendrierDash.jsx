import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './Dash-style/calendrierDash.css';
import Dash from './Dash';

function CalendrierDash() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/event/listeEvent1")
      .then(res => {
        const formattedEvents = res.data.map(event => ({
          id: event._id,
          title: event.titre,
          start: event.date_debut,
          end: event.date_fin
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function eventClassNames(arg) {
    const eventStartDate = new Date(arg.event.start);
    const eventEndDate = new Date(arg.event.end);
    const currentDate = new Date(arg.date);

    if (currentDate >= eventStartDate && currentDate <= eventEndDate) {
      return ['event-highlight'];
    }
    return [];
  }

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      axios.delete(`http://localhost:5000/api/event/deleteEvent/${clickInfo.event.id}`)
        .then(() => {
          console.log('Event deleted successfully');
          const updatedEvents = events.filter(event => event.id !== clickInfo.event.id);
          setEvents(updatedEvents);
        })
        .catch(error => {
          console.error("Error deleting event:", error);
        });
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <Dash>
      <Stack direction={"row"}>
        <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                type='checkbox'
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              />
              event selected
            </label>
          </div>
        </div>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            events={events}
            eventClassNames={eventClassNames} // Ajout de la fonction eventClassNames
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        </div>
      </Stack>
    </Dash>
  );
}

export default CalendrierDash;
