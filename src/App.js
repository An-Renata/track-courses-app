import { useState } from "react";

const courseList = [
  {
    id: 1,
    name: "The complete JavaScript Course 2023: From Zero to Expert!",
    instructor: "Jonas Schmedtmann",
    hours: 69,
    mainFocus: "javascript",
  },
  {
    id: 2,
    name: "JavaScript Alhorithms and Data Structures",
    instructor: "FreeCodeCamp",
    hours: 300,
    mainFocus: "javascript",
  },
  {
    id: 3,
    name: "Build Responsive Real-World Websites with HTML and CSS",
    instructor: "Jonas Schmedtmann",
    hours: 37.5,
    mainFocus: "html + css",
  },
];

// Creating a reausable Button component, because I need to use is in this particular case for 3 times it would be better to take a children prop and adjust it to my need to avoid repetittion
function Button({ children, onClick, classBtn = "" }) {
  return (
    <button className={classBtn} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  // State to handle Form display
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [courses, setCourses] = useState(courseList);

  // Add a new course to the front of the list
  function handleCourseList(newCourse) {
    setCourses((course) => [newCourse, ...course]);
  }

  function countHours() {
    // Create a new empty object to store a focus values and count how many hours user spent on this topic
    const focusOn = {};
    // Loop through each of the courses and calculate the total hours.
    // condition focusOn?.[mainFocus] checks if there are already this kind of topic if yes, it adds an additional hours to the current value. If the topic doesn't exist it creates a new one with the currently added hours
    courses.forEach((course) => {
      const { mainFocus, hours } = course;

      focusOn?.[mainFocus]
        ? (focusOn[mainFocus] += hours)
        : (focusOn[mainFocus] = hours);
    });

    return focusOn;
  }

  // Function to set form to the opposite of the current state
  function handleAddForm() {
    setFormIsOpen((form) => !form);
  }

  return (
    <>
      <h1>Courses tracker</h1>
      <div className="container">
        {/* Button component is inside Aside bar component, so I need to pass it down the component tree to get access to this function */}
        <AsideBar onClick={handleAddForm} onCountHours={countHours} />

        <Courses courses={courses} />

        {/* Condition to open form if the formIsOpen state === true */}
        {formIsOpen && (
          <AddForm
            onHandleCourseList={handleCourseList}
            onFormIsOpen={setFormIsOpen}
          />
        )}
      </div>
    </>
  );
}

function AsideBar({ onClick, onCountHours, onFormIsOpen }) {
  const coursesHoursCount = onCountHours();

  return (
    <div className="aside">
      {/* Passing the onHandleAddForm prop to set form state */}
      <Button onClick={onClick} onFormIsOpen={onFormIsOpen} classBtn="add-btn">
        Add+
      </Button>
      <div>
        <ul>
          {Object.keys(coursesHoursCount).map((course) => (
            <li key={course}>
              <strong>{course}</strong>
              <br></br> <span>Hours total: {coursesHoursCount[course]}h</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Courses({ courses }) {
  return (
    <div className="course-window">
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <div>
              <h3 className="course-name">{course.name}</h3>
              <p>
                <strong>Instructor/Source:</strong> {course.instructor}
              </p>
            </div>
            <span className="hours">Hours: {course.hours}h</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddForm({ onHandleCourseList, onFormIsOpen }) {
  // Get states values from the form
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [courseHours, setCourseHours] = useState("");
  const [mainTopic, setMainTopic] = useState("");

  let id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !instructor || !courseHours || !mainTopic) return;
    // Get info from the form submit
    const addNewCourse = {
      id,
      name,
      instructor,
      hours: courseHours,
      mainFocus: mainTopic.toLowerCase(),
    };
    // handle course list, add a course to the beginning of the array of objects
    onHandleCourseList(addNewCourse);

    // Remove the form from the window after the submit
    onFormIsOpen(false);
  }

  function handleCloseForm() {
    onFormIsOpen(() => false);
  }
  return (
    <div className="add-form">
      <h3>Add a new course</h3>
      <form onSubmit={handleSubmit}>
        <label>Name of the course</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label>Instructor/Source of the course</label>
        <input
          type="text"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        ></input>

        <label>Total hours</label>
        <input
          type="text"
          value={courseHours}
          onChange={(e) => setCourseHours(Number(e.target.value))}
        ></input>

        <label>
          Main focus on: <br></br>
          <small>
            (Describe it with one or to words e.g "React", "HTML + CSS")
          </small>
        </label>
        <input
          type="text"
          value={mainTopic}
          onChange={(e) => setMainTopic(e.target.value)}
        ></input>

        <div className="form-btn">
          <button type="submit">Add</button>
        </div>
      </form>
      <Button classBtn="btn-close" onClick={handleCloseForm}>
        Close
      </Button>
    </div>
  );
}
