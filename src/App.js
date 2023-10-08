const courseList = [
  {
    id: 1,
    name: "The complete JavaScript Course 2023: From Zero to Expert!",
    instructor: "Jonas Schmedtmann",
    hours: 69,
    mainFocus: "Javascript",
  },
  {
    id: 2,
    name: "JavaScript Alhorithms and Data Structures",
    instructor: "FreeCodeCamp",
    hours: 300,
    mainFocus: "Javascript",
  },
  {
    id: 3,
    name: "Build Responsive Real-World Websites with HTML and CSS",
    instructor: "Jonas Schmedtmann",
    hours: 37.5,
    mainFocus: "HTML + CSS",
  },
];

export default function App() {
  return (
    <>
      <h1>Courses tracker</h1>
      <div className="container">
        <AsideBar />
        <Courses />
        <AddForm />
      </div>
    </>
  );
}

function AsideBar() {
  return (
    <div className="aside">
      <button className="add-btn">Add +</button>
      <div>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
        </ul>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <div className="course-window">
      <ul>
        {courseList.map((course) => (
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

function AddForm() {
  return (
    <div className="add-form">
      <h3>Add a new course</h3>
      <form>
        <label>Name of the course</label>
        <input type="text"></input>

        <label>Instructor/Source of the course</label>
        <input type="text"></input>

        <label>Total hours</label>
        <input type="text"></input>

        <label>
          Main focus on: <br></br>
          <small>
            (Describe it with one or to words e.g "React", "HTML + CSS")
          </small>
        </label>
        <input type="text"></input>

        <div class="form-btn">
          <button>Close</button>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
}
