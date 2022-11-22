export interface IUser {
  fullname: string;
  email: string;
  password: string;
}
// User's Goals
export interface IGoal {
  _id: string;
  user_id: string; // from JWT, ObjectId()
  title: string;
  description: string;
  deadline: number; // timestamp
  steps: IStep[];
}

export interface IStep {
  title: string;
  description: string;
  status: string;
  deadline: number; // timestamp
}

export const INITIAL_STATE = [
  {
    _id: "122",
    user_id: "56",
    title: "Buy car",
    description: "its time to see mum",
    deadline: +"15 Nov 2022",
    steps: [
      {
        title: "save money",
        description: "am going to work",
        status: "uncomplete",
        deadline: +"15 Nov 2022",
      },
      {
        title: "save money",
        description: "am going to work",
        status: "uncomplete",
        deadline: +"15 Nov 2022",
      },
    ],
  },
  {
    _id: "12",
    user_id: "56",
    title: "Buy Twitter",
    description: "its time to see mum",
    deadline: +"15 Nov 2022",
    steps: [
      {
        title: "save money",
        description: "am going to work",
        status: "uncomplete",
        deadline: +"15 Nov 2022",
      },
      {
        title: "save money",
        description: "am going to work",
        status: "uncomplete",
        deadline: +"15 Nov 2022",
      },
    ],
  },
  {
    _id: "123",
    user_id: "56",
    title: "travel ug",
    description: "its time to see mum",
    deadline: +"15 Nov 2022",
    steps: [
      {
        title: "save money",
        description: "am going to work",
        status: "uncomplete",
        deadline: +"15 Nov 2022",
      },
      {
        title: "save money",
        description: "am going to work",
        status: "uncomplete",
        deadline: +"15 Nov 2022",
      },
    ],
  },
];
