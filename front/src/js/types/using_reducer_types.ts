
//===============userReducer types==================
export interface UserInUserReducerType {
    contact: string
    email: string
    firstName: string
    lastName: string
    introduction: string
    profileImageUrl: string
    username: string
}

export interface UserReducerType {
    login: boolean
    user: UserInUserReducerType
}
//=============================================


//=============performanceReducer types=============
export interface IdeaType {
    author: string
    contents: []
    title: string
}

export interface Budget {
    item: string
    price: number
}

export interface BudgetType {
    fullBudget: number
    budget: Budget[]
    balance: number
}


export interface PerformanceReducerType {
    performances: any
    schedule: any
    scripts: any
    idea: IdeaType[]
    budget: BudgetType
    users: UsersProps[]
}

export interface UsersProps {
    username: string
    firstName: string
    lastName: string
}

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
    scripts: ScriptType[][]
    title: string
    totalPageNum: number
}

export interface InitialPerformance {
    performances: PerformanceType[]
    schedule: ScheduleType
    scripts: ScriptsType
}

//==================================================


export interface InitialViewType{
    sideMenu: boolean
    test: []
}

export interface InitialStateType {
    userReducer: UserReducerType
    performanceReducer: PerformanceReducerType
    viewReducer: any
}