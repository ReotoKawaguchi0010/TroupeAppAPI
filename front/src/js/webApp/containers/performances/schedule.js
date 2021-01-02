import React, {useState} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#fab5a7'
    },
    link: {
       color: '#f6f6a5'
    },
}));

const Calendar = () => {

    const classes = useStyles()

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
        initialView: 'timeGridWeek',
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
            start: 'title',
            center: 'prev, next, today',
            end: 'dayGridMonth,timeGridWeek'
        },
    }

    const handleDayClick = e => {
        console.log(e)
    }

    const handleEventsClick = e => {
        console.log(e.event.end)
    }

    return (
        <>
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
                customButtons={{myCustomButton: {themeIcon: 'fa-chevron-right',}}}
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