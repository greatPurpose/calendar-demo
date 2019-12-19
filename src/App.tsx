import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./App.scss";

const gapZero = (i: number) => {
  let rtVal = i.toString();
  return rtVal.length === 2 ? rtVal : "0" + rtVal;
};
let i: number;
let _hours: string[] = [];
let _minutes: string[] = [];
let _weeks: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
for (i = 0; i < 24; i++) {
  _hours.push(gapZero(i).toString());
}
for (i = 0; i < 60; i++) {
  _minutes.push(gapZero(i));
}
const App: React.FC = () => {
  const [everyDay, setEveryDay] = useState(false);
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [weekHour, setWeekHour] = useState("00");
  const [weekMinute, setWeekMinute] = useState("00");
  const [everyWeek, setEveryWeek] = useState(false);
  const [days, setDays] = useState<string[]>([]);
  const toggleWeek = (weekName: string) => {
    let _days: string[] = JSON.parse(JSON.stringify(days));
    let i = _days.findIndex(it => it === weekName);
    if (i >= 0) {
      _days.splice(i, 1);
    } else {
      _days.push(weekName);
    }
    setDays(_days);
  };
  return (
    <div className="container p-5">
      <h2 className="mr-3">Live Demo</h2>
      <Tabs defaultActiveKey="daily" id="uncontrolled-tab-example">
        <Tab eventKey="minutes" title="Minutes">
          Minutes
        </Tab>
        <Tab eventKey="hourly" title="Hourly">
          Hourly
        </Tab>
        <Tab eventKey="daily" title="Daily">
          <div className="content-pannel">
            <div className="form-check mr-3">
              <input
                className="form-check-input"
                type="radio"
                name="every"
                id="every"
                checked={everyDay}
                onClick={() => setEveryDay(true)}
              />
              <label
                className="form-check-label"
                onClick={() => setEveryDay(true)}
              >
                Every
              </label>
            </div>
            <div className="form-group d-flex align-items-center mb-0">
              <input
                type="number"
                className="form-control mr-3"
                value={day}
                onChange={e => {
                  setDay(e.target.value);
                }}
              />
              <span>day(s)</span>
            </div>
          </div>

          <div className="content-pannel">
            <div className="form-check mr-3">
              <input
                className="form-check-input"
                type="radio"
                name="everyWeek"
                id="everyWeek"
                checked={everyWeek}
                onClick={() => setEveryWeek(true)}
              />
              <label
                className="form-check-label"
                onClick={() => setEveryWeek(true)}
              >
                Every week day
              </label>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <span className="mr-3">Start time</span>
            <div className="form-group mr-3 mb-0">
              <select
                className="form-control"
                id="hour"
                onChange={e => setHour(e.target.value)}
                value={hour}
              >
                {_hours.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                id="hour"
                onChange={e => setMinute(e.target.value)}
                value={minute}
              >
                {_minutes.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </Tab>
        <Tab eventKey="weekly" title="Weekly">
          <div className="content-pannel">
            <div className="row w-100">
              {_weeks.map((item, idx) => (
                <div className="col-6" key={idx}>
                  <div className="form-check mr-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="every"
                      id="every"
                      value={item}
                      onChange={() => toggleWeek(item)}
                    />
                    <label className="form-check-label">{item}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <span className="mr-3">Start time</span>
            <div className="form-group mr-3 mb-0">
              <select
                className="form-control"
                id="hour"
                onChange={e => setWeekHour(e.target.value)}
                value={weekHour}
              >
                {_hours.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                id="hour"
                onChange={e => setWeekMinute(e.target.value)}
                value={weekMinute}
              >
                {_minutes.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </Tab>
        <Tab eventKey="monthly" title="Monthly">
          Monthly
        </Tab>
      </Tabs>
      <div className="d-flex align-items-center justify-content-center result">
        At {hour}:{minute} {day && <span>, every {day} days</span>}
      </div>
      <div className="d-flex align-items-center justify-content-center result">
        At {weekHour}:{weekMinute}{" "}
        {days.length > 0 && (
          <span>
            ? *{" "}
            {days.map((it, idx) => (
              <span key={idx}>{it} </span>
            ))}{" "}
            *{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default App;
