
export const messageEnum = {
     start: "start"
}

type ValueOf<T> = T[keyof T];
export type messageEnumType =  ValueOf<typeof messageEnum>