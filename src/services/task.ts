import { db } from "./firebase";

export const check_if_taskState_exist = (uid: string) => {
  db.collection("users")
    .doc(uid)
    .collection("taskState")
    .get()
    .then(snap => console.log(snap.size))
    .catch(err => console.log("error"));
};

export const create_initial_state = (uid: string) => {
  const initialState = {
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
