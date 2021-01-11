import React, {useState, useRef, useEffect, useContext} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {Button, Modal, Paper, Box, TextField} from "@material-ui/core";

import {performance_action} from "../../actions/performance_action";
import {AppContext} from "../../contexts/AppContext";
import {create} from "../../../utils/utils";


const useStyles = makeStyles((theme) => ({
    title: {
        color: '#fab5a7'
    },
    link: {
       color: '#f6f6a5'
    },
    createModal: {
        textAlign: 'center',
    },
    createPaper: {
        width: '50%',
        display: 'inline-block',
        marginTop: 20,
        padding: 20,
    },
    calendar: {
      width: '100%',
    },
}));

const CreateEvent = ({dateEvent, open, onClose}) => {
    const classes = useStyles()
    const { performance_id } = useParams()
    const [timeState, setTimeState] = useState({
        time: '',
        endTime: '',
    })
    const {state, dispatch} = useContext(AppContext)
    const [sendState, setSendState] = useState({
        title: '',
        startTime: '',
        endTime: '',
        description: '',
    })
    useEffect(() => {
        setTimeState({...timeState, time: `${String(dateEvent.dateStr)}T00:00`,
        endTime: `${String(dateEvent.dateStr)}T00:00`})
    }, [dateEvent])

    const startTimeChange = e => {
        setTimeState({...timeState, time: e.target.value, endTime: e.target.value})
        setSendState({...sendState, startTime: e.target.value})
    }

    const inputChange = e => {
        switch (e.target.name){
            case 'title':
                setSendState({...sendState, title: e.target.value})
                break;
            case 'endTime':
                setSendState({...sendState, endTime: e.target.value})
                setTimeState({...timeState, endTime: e.target.value})
                break;
            case 'description':
                setSendState({...sendState, description: e.target.value})
                break;
        }
    }

    const handleSendClick = e => {
        const sendData = {}
        if(sendState.endTime === '') sendData.endTime = timeState.endTime
        else sendData.endTime = sendState.endTime
        sendData.startTime = timeState.time
        sendData.description = sendState.description
        sendData.title = sendState.title
        sendData.performanceId = performance_id;
        performance_action({type: 'create_schedule', sendData: sendData}, dispatch)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose} className={classes.createModal}>
            <Paper className={classes.createPaper} tabIndex={'none'}>
                <Box>title</Box>
                <Box><TextField variant="outlined" name="title" onChange={inputChange} /></Box>
                <Box>start</Box>
                <Box><TextField type="datetime-local"
                                defaultValue={String(timeState.time)}
                                onChange={startTimeChange} name="startTime" /></Box>
                <Box>end</Box>
                <Box><TextField type="datetime-local"
                                name="endTime"
                                value={String(timeState.endTime)}
                                onChange={inputChange}/></Box>
                <Box>description</Box>
                <Box><TextField variant="outlined" multiline name="description" onChange={inputChange} /></Box>
                <Box><Button onClick={handleSendClick}>決定</Button></Box>
            </Paper>
        </Modal>
    )
}

const ReadEvent = ({readEvent, open, onClose}) => {
    const [eventState, setEventState] = useState({
        readEvent: {},
        start: {
            month: 0,
            date: 0,
            hours: 0,
            minute: 0,
            day: '',
            year: '',
        },
        end: {
            month: 0,
            date: 0,
            hours: 0,
            minute: 0,
            day: '',
            year: '',
        },
    })
    const classes = useStyles()
    console.log(eventState)
    useEffect(() => {
        let date = new Date(readEvent.start)
        const start = {...eventState.start, date: date.getDate(), hours: ('00' + date.getHours()).slice(-2),
            minute: ('00' + date.getMinutes()).slice(-2), month: date.getMonth()+1, day: date.getDay(), year: date.getFullYear()
        }
        let end = start
        if(Boolean(readEvent.end)){
            date = new Date(readEvent.end)
            end = {...eventState.start, date: date.getDate(), hours: ('00' + date.getHours()).slice(-2),
                minute: ('00' + date.getMinutes()).slice(-2), month: date.getMonth()+1, day: date.getDay(), year: date.getFullYear()
            }
        }

        setEventState({...eventState, readEvent: readEvent, start: start, end: end})
    }, [readEvent])
    return (
        <Modal open={open} onClose={onClose}
               className={classes.createModal}
               BackdropProps={{timeout: 500,}}
        >
            <Paper className={classes.createPaper} tabIndex={'none'}>
                <Box>start</Box>
                <Box>{eventState.start.year}/{eventState.start.month}/{eventState.start.date}</Box>
                <Box>{eventState.start.hours}:{eventState.start.minute}</Box>
                <Box>end</Box>
                <Box>{eventState.end.year}/{eventState.end.month}/{eventState.end.date}</Box>
                <Box>{eventState.end.hours}:{eventState.end.minute}</Box>
            </Paper>
        </Modal>
    )
}


const Calendar = () => {
    const {performance_id} = useParams();
    const classes = useStyles()
    const [createEventState, setCreateEventState] = useState({
        open: false,
        dateEvent: '',
    })
    const [monthState, setMonthState] = useState({
        month: ''
    })
    const [eventsState, setEventsState] = useState({
        events: []
    })
    const [readState, setReadState] = useState({
        event: {},
        open: false,
    })

    useEffect(() => {
        create.get('/app/', {
            params: {
                type: 'get_schedule',
                performanceId: performance_id,
            }
        }).then(res => {
            let events = res.data
            setEventsState({...eventsState, events: events})
        }).catch(e => {
            console.error(e)
        })
    }, [])

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
        setCreateEventState({...createEventState, open: true, dateEvent: e})
    }

    const handleEventsClick = e => {
        setReadState({...readState, event: e.event, open: true,})
    }

    const handleCloseEvent = () => {
        setCreateEventState({...createEventState, open: false})
    }

    const handleReadCloseEvent = () => {
        setReadState({...readState, open: false})
    }

    const calendarEl = useRef(null);

    const handleNextClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.next()
        let month = calendarApi.view.title
        setMonthState({...monthState, month: month})
    }

    const handleBackClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.prev()
        let month = calendarApi.view.title
        setMonthState({...monthState, month: month})
    }

    const handleMonthClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.changeView('dayGridMonth')
    }

    const handleWeekClick = () => {
        let calendarApi = calendarEl.current.getApi()
        calendarApi.changeView('timeGridWeek')
    }

    useEffect(() => {
        let calendarApi = calendarEl.current.getApi()
        let month = calendarApi.view.title
        setMonthState({...monthState, month: month})
    }, [])

    return (
        <>
            <ReadEvent open={readState.open} onClose={handleReadCloseEvent} readEvent={readState.event} />
            <CreateEvent open={createEventState.open} dateEvent={createEventState.dateEvent} onClose={handleCloseEvent} />
            <Button onClick={handleBackClick}>back</Button>
            <Button onClick={handleNextClick}>next</Button>
            <Button onClick={handleMonthClick}>month</Button>
            <Button onClick={handleWeekClick}>week</Button>
            <div>{monthState.month}</div>
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
                events={eventsState.events}
                eventClick={handleEventsClick}
                ref={calendarEl}
                viewClassNames={[classes.calendar]}
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