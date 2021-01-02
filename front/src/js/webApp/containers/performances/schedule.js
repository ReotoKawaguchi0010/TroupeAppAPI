import React, {useState, useRef} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#fab5a7'
    },
    link: {
       color: '#f6f6a5'
    },
}));

const Calendar = () => {

    const events = [
        {
            id: 1, title: '準備', start: '2021-01-02T10:30:00', end: '2021-01-02T14:30:00',
            backgroundColor: '#f6f6a5', borderColor: '#f6f6a5', textColor: '#000000',
        },
        {
            id: 2, title: '公演', start: '2021-01-03T10:30:00', end: '2021-01-02T14:30:00',
            backgroundColor: '#f6f6a5', borderColor: '#f6f6a5', textColor: '#000000',
        },
        {
            id: 3, title: '撤収', start: '2021-01-04T10:30:00', end: '2021-01-02T14:30:00',
            backgroundColor: '#f6f6a5', borderColor: '#f6f6a5', textColor: '#000000',
        },
    ]


    const config = {
        locale: 'ja',
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        slotDuration: '00:30:00',
        selectable: true,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '00:00',
            endTIme: '24:00',
        },
        weekends: true,
        titleFormat: {
            year: 'numeric',
            month: 'short'
        },
        headerToolbar: {
            start: '',
            end: '',
        },
    }

    const handleDayClick = e => {
        console.log(e)
    }

    const handleEventsClick = e => {
        console.log(e.event.end)
    }

    const calendarEl = useRef(null);

    const handleNextClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.next()
    }

    const handleBackClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.prev()
    }

    const handleMonthClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.changeView('dayGridMonth')
    }

    const handleWeekClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.changeView('timeGridWeek')
    }

    return (
        <>
            <Button onClick={handleBackClick}>back</Button>
            <Button onClick={handleNextClick}>next</Button>
            <Button onClick={handleMonthClick}>month</Button>
            <Button onClick={handleWeekClick}>week</Button>
            <div>{Boolean(calendarEl.current) ? calendarEl.current.getApi().view.title : ''}</div>
            <FullCalendar
                locale={config.locale}
                plugins={config.plugins}
                initialView={config.initialView}
                slotDuration={config.slotDuration}
                selectable={config.selectable}
                businessHours={config.businessHours}
                weekends={config.weekends}
                titleFormat={config.titleFormat}
                headerToolbar={config.headerToolbar}
                dateClick={handleDayClick}
                events={events}
                eventClick={handleEventsClick}
                ref={calendarEl}
            />
        </>
    )
}

export const Schedule = () => {
    const classes = useStyles()
    const { performance_id } = useParams()

    return (
        <>
            <div>スケジュール</div>
            <Calendar />
        </>
    )
}