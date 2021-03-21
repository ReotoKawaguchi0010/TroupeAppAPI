
export interface GetUsers {
    username: string
    first_name: string
    last_name: string
}


export interface GetIdeaContent{
    name: string
    value: string
}

export interface GetIdea {
    author: string
    contents: GetIdeaContent[]
    title: string
}




