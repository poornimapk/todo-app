# Simple ToDo app with CRUD using Node.js, Express and storing data in a JSON file.

1. Create a todo task with title and description.
2. Read all todo tasks and display details(title, description and status)
3. Select one todo task and update title, description or the status of task(finished/unfinished).
4. Delete a selected task.

## JSON file structure sample:
```
    [
        {
            id: 1,
            title: "Meal Prep",
            Description: "Finish cutting vegetables and plan out meals for all weekdays",
            completed: false,
        },
        {
            id: 2,
            title: "Laundry",
            Description: "Finish laundry and fold clothes",
            completed: false,
        },
        {
            id: 3,
            title: "Run Roomba",
            Description: "Schedule roomba",
            completed: false,
        },
        {
            id: 4,
            title: "Kids' summer camp",
            Description: "Enroll kids in summer camp",
            completed: false,
        },
    ]
```