export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string | Date;
};

export type UserState = {
    user: User | null;
};

export type RootState = {
    user: UserState;
};
