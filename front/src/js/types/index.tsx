export interface PerformanceType {
    id: number
    performanceData: string
    title: string
}

export interface ScheduleTime{
    date: number
    day: string
    hours: number
    minute: number
    month: number
    year: string
}

export interface ScheduleType {
    description: string
    end: ScheduleTime
    readEvent: object
    start: ScheduleTime
    title: string
}

export interface ScriptType {
    text: string
    fontSize: number
}

export interface ScriptsType {
    pageNum: number
    scripts: ScriptType[]
    title: string
    totalPageNum: number
}

export interface InitialPerformance {
    performances: PerformanceType[]
    schedule: ScheduleType
    scripts: ScriptsType
}