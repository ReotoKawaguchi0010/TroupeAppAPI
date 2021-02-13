import * as React from "react";
import {useState, useRef, useEffect, useContext, ReactChild, ReactFragment, ReactPortal} from "react";
import {useParams} from "react-router";
import {makeStyles} from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Button, Modal, Paper, Box, TextField} from "@material-ui/core";
import _ from "lodash";

import {performance_action, getSchedule} from "js/webApp/actions/performance_action";
import {AppContext} from "js/webApp/contexts/AppContext";
import {create} from "js/utils/utils";
import {colorConfig} from "js/configs/config";

const selectColor = [
    {name: 'エメラルドグリーン', background: colorConfig.emeraldGreen, color: '#ffffff',},
    {name: 'モダンシアン', background: colorConfig.modernCian, color: '#ffffff',},
    {name: 'ディープスカイブルー', background: colorConfig.deepSkyBlue, color: '#ffffff',},
    {name: 'パステルブラウン', background: colorConfig.pastelBrown, color: '#ffffff',},
    {name: 'ミッドナイトブラック', background: colorConfig.midnightBlack, color: '#ffffff',},
    {name: 'アップルレッド', background: colorConfig.appleRed, color: '#ffffff',},
    {name: 'フレンチローズ', background: colorConfig.frenchRode, color: '#ffffff',},
    {name: 'コーラルピンク', background: colorConfig.coralPink, color: '#ffffff',},
    {name: 'ブライトオレンジ', background: colorConfig.brightOrange, color: '#ffffff',},
    {name: 'ソフトバイオレット', background: colorConfig.softViolet, color: '#ffffff',},
]

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


interface ParamTypes {
    performance_id: string;
}

interface CreateEventType {
    dateEvent: any
    open: any
    onClose: any
}

interface SendDataType {
    title: string
    startTime: any
    endTime: any
    description: string
    performanceId: any
}

const CreateEvent = (props: CreateEventType) => {
    const classes = useStyles()
    const { performance_id } = useParams<ParamTypes>()
    const [timeState, setTimeState] = useState({
        time: '',
        endTime: '',
    })
    const {state, dispatch} = useContext(AppContext);
    const [sendState, setSendState] = useState({
        title: '',
        startTime: '',
        endTime: '',
        description: '',
    })
    useEffect(() => {
        setTimeState({...timeState, time: `${String(props.dateEvent.dateStr)}T00:00`,
        endTime: `${String(props.dateEvent.dateStr)}T00:00`})
    }, [props.dateEvent])

    const startTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeState({...timeState, time: e.target.value, endTime: e.target.value})
        setSendState({...sendState, startTime: e.target.value})
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSendClick = () => {
        const sendData: SendDataType = {
            title: '',
            startTime: '',
            endTime: '',
            description: '',
            performanceId: '',
        }
        if(sendState.endTime === '') sendData.endTime = timeState.endTime
        else sendData.endTime = sendState.endTime
        sendData.startTime = timeState.time
        sendData.description = sendState.description
        sendData.title = sendState.title
        sendData.performanceId = performance_id;
        performance_action({type: 'create_schedule', sendData: sendData}, dispatch)
        props.onClose()
    }

    return (
        <Modal open={props.open} onClose={props.onClose} className={classes.createModal}>
            <Paper className={classes.createPaper} tabIndex={undefined}>
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
                <Box><TextField label="Select" select >
                    {_.map(selectColor, (v, i) => (
                        <Box key={i} style={{background: v.background}}>
                            <Button style={{color: v.color}}>{v.name}</Button>
                        </Box>
                    ))}
                </TextField></Box>
                <Box><Button onClick={handleSendClick}>決定</Button></Box>
            </Paper>
        </Modal>
    )
}

interface ReadEventArgType {
    readEvent: any
    open: any
    onClose: any
}

const ReadEvent = (props: ReadEventArgType) => {
    const [eventState, setEventState] = useState({
        readEvent: {},
        title: '',
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
        description: '',
    })
    const classes = useStyles()

    useEffect(() => {
        let date = new Date(props.readEvent.start)
        const start = {...eventState.start,
            date: Number(date.getDate()),
            hours: Number(('00' + date.getHours()).slice(-2)),
            minute: Number(('00' + date.getMinutes()).slice(-2)),
            month: Number(date.getMonth()+1),
            day: String(date.getDay()),
            year: String(date.getFullYear()),
        }
        let end = start
        if(Boolean(props.readEvent.end)){
            date = new Date(props.readEvent.end)
            end = {...eventState.start,
                date: Number(date.getDate()),
                hours: Number(('00' + date.getHours()).slice(-2)),
                minute: Number(('00' + date.getMinutes()).slice(-2)),
                month: Number(date.getMonth()+1),
                day: String(date.getDay()),
                year: String(date.getFullYear()),
            }
        }

        let description = props.readEvent.extendedProps
        if(Boolean(description))description = description.description

        setEventState({...eventState,
            readEvent: props.readEvent, start: start,
            end: end, description: description, title: props.readEvent.title})
    }, [props.readEvent])
    return (
        <Modal open={props.open} onClose={props.onClose}
               className={classes.createModal}
               BackdropProps={{timeout: 500,}}
        >
            <Paper className={classes.createPaper} tabIndex={undefined}>
                <Box component="h4">{eventState.title}</Box>

                <Box>
                    <Box>{eventState.start.year}/{eventState.start.month}/{eventState.start.date}</Box>
                    <Box>{eventState.start.hours}:{eventState.start.minute}</Box>
                    <Box>{'->'}</Box>
                    <Box>{eventState.end.year}/{eventState.end.month}/{eventState.end.date}</Box>
                    <Box>{eventState.end.hours}:{eventState.end.minute}</Box>
                </Box>

                <Box>内容</Box>
                <Box>{eventState.description}</Box>
            </Paper>
        </Modal>
    )
}

interface ParamType {
    performance_id: any
}

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

const Calendar = () => {
    const {state, dispatch} = useContext(AppContext);

    const {performance_id} = useParams<ParamType>();
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
        getSchedule({type: 'get_schedule', performanceId: performance_id}, dispatch)
        let calendarApi = calendarEl.current.getApi()
        let month = calendarApi.view.title
        setMonthState({...monthState, month: month})
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

    const handleDayClick = (e: any) => {
        setCreateEventState({...createEventState, open: true, dateEvent: e})
    }

    const handleEventsClick = (e: any) => {
        setReadState({...readState, event: e.event, open: true,})
    }

    const handleCloseEvent = () => {
        setCreateEventState({...createEventState, open: false})
    }

    const handleReadCloseEvent = () => {
        setReadState({...readState, open: false})
    }


    const calendarEl = useRef<any>(null);

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
    return (
        <>
            <div>スケジュール</div>
            <Calendar />
        </>
    )
}