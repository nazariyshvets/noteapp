//the list of predefined notes
//isActive parameter specifies if a note is active or archived
let notes = [
  {
    id: 1,
    name: "Meeting Agenda",
    created: "2023-07-25T07:00:00.000Z",
    category: "Task",
    content: "Prepare presentation and finalize meeting agenda.",
    isActive: true,
  },
  {
    id: 2,
    name: "Vacation Plans",
    created: "2023-07-25T07:00:00.000Z",
    category: "Idea",
    content: "Explore travel destinations and book flights.",
    isActive: true,
  },
  {
    id: 3,
    name: "Grocery List",
    created: "2023-07-25T07:00:00.000Z",
    category: "Task",
    content: "Buy fruits, vegetables, milk, and eggs.",
    isActive: true,
  },
  {
    id: 4,
    name: "Project Brainstorming",
    created: "2023-07-25T07:00:00.000Z",
    category: "Idea",
    content: "Generate innovative ideas for the new project.",
    isActive: true,
  },
  {
    id: 5,
    name: "Book Recommendation",
    created: "2023-07-25T07:00:00.000Z",
    category: "Random Thought",
    content: "Suggest 'The Alchemist' for book club discussion.",
    isActive: false,
  },
  {
    id: 6,
    name: "Daily Exercise",
    created: "2023-07-25T07:00:00.000Z",
    category: "Task",
    content: "Go for a morning jog and do 20 minutes of yoga.",
    isActive: false,
  },
  {
    id: 7,
    name: "Dentist appointment",
    created: "2023-07-25T07:00:00.000Z",
    category: "Random Thought",
    content:
      "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    isActive: true,
  },
];

function updateNotes(newNotes) {
  notes = [...newNotes];
}

export { notes, updateNotes };
