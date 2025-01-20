export enum RoomGender {
    MALE = "male",
    FEMALE = "female",
    MIXED = "mixed"
}

export type RoomType = {
    uuid: string,
    gender: RoomGender,
    name: string,
    submittedAt: Date
    beds: string[]
}