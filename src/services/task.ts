import { db } from "./firebase";
import moment from "moment";

export const check_if_taskState_exist = (uid: string) => {
  db.collection("users")
    .doc(uid)
    .collection("taskState")
    .get()
    .then(snap => console.log(snap.size))
    .catch(err => console.log("error"));
};

let getCurrentWeek = (birthdate: string): number => {
  let birth = moment(birthdate, "DD/MM/YYYY");
  let now = moment();
  let diff = now.diff(birth, "weeks");
  console.log("Diff", diff);
  return diff;
};

let current_week_score = (state: any) => {
  let day = moment().isoWeekday();
  console.log(state);
  let i = 0;

  let total_task = 0;
  let task_done = 0;
  while (i < state.days.length) {
    let j = 0;
    while (j < state.days[i].tasks.length) {
      if (state.days[i].tasks[j].checked === true) task_done++;
      total_task++;
      j++;
    }
    i++;
  }
  return Math.round((task_done / total_task) * 100) - 1;
};

let resetWeek = (state: any) => {
  let i = 0;

  while (i < state.days.length) {
    let j = 0;
    while (j < state.days[i].tasks.length) {
      if (state.days[i].tasks[j].checked === true)
        state.days[i].tasks[j].checked = false;
      j++;
    }
    i++;
  }
};

export const newWeek = async (
  birthdate: string,
  uid: string,
  currentTask: any
) => {
  let currentWeek = getCurrentWeek(birthdate);
  let userRef = await db
    .collection("users")
    .doc(uid)
    .collection("taskState")
    .doc("data")
    .get();

  let oldWeeksRef = await db
    .collection("users")
    .doc(uid)
    .collection("oldWeeks");
  let oldWeeksScoreRef = await db
    .collection("users")
    .doc(uid)
    .collection("oldWeeksScore");

  let userData = userRef.data();
  if (currentTask.currentWeek !== currentWeek) {
    oldWeeksRef.doc(currentTask.currentWeek.toString()).set(currentTask);
    oldWeeksScoreRef.doc(currentTask.currentWeek.toString()).set({
      currentWeek: currentTask.currentWeek,
      weekScore: current_week_score(currentTask)
    });
    resetWeek(currentTask);
    currentTask.currentWeek = currentWeek;
    console.log(" Diff = ", currentTask, currentWeek);
    return true;
  } else return false;
};
export const getOldWeeksScore = async (uid: string) => {
  let snapshot = await db
    .collection("users")
    .doc(uid)
    .collection("oldWeeksScore")
    .get();
  return snapshot.docs.map(doc => doc.data());
};

export const create_initial_state = (uid: string, birthdate: string) => {
  const initialState = {
    currentWeek: getCurrentWeek(birthdate),
    task: [{ id: "task-1", content: "Read" }],
    days: [
      { title: "Monday", tasks: [] },
      { title: "Tuesday", tasks: [] },
      { title: "Wednesday", tasks: [] },
      { title: "Thursday", tasks: [] },
      { title: "Friday", tasks: [] },
      { title: "Saturday", tasks: [] },
      { title: "Sunday", tasks: [] }
    ]
  };
  db.collection("users")
    .doc(uid)
    .collection("taskState")
    .doc("data")
    .set(initialState)
    .then(r => console.log("success", r))
    .catch(err => console.log("Err", err));
};

export const update_task_state = (uid: string, state: any) => {
  db.collection("users")
    .doc(uid)
    .collection("taskState")
    .doc("data")
    .set(state)
    .then(r => console.log("success", r))
    .catch(err => console.log("Err", err));
};

export const get_task_state = (uid: string) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("taskState")
    .doc("data")
    .get()
    .then(r => r.data())
    .catch(err => console.log(err));
};
