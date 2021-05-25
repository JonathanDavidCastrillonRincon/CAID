//Librería de react
import React from "react";

//Libreria moment
import moment from "moment";

//Librería componente de timeLine
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaWeight, FaStarHalfAlt } from "react-icons/fa";

function TimeLine(props) {
  const { data } = props;
  return (
    <VerticalTimeline>
      {/* ============================================================== */}
      {/*--- Inicio componente de timLine ---*/}
      {/* ============================================================== */}
      {data?.map((el, i) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "rgb(255, 255, 255)",
              color: "#162447",
            }}
            key={i}
            contentArrowStyle={{ borderRight: "7px solid  rgb(255, 255, 255)" }}
            date={`${moment(el.initialDate).format("DD/MM/YYYY")} - ${moment(
              el.finalDate
            ).format("DD/MM/YYYY")}`}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<FaWeight />}
          >
            <h5 className="vertical-timeline-element-title">
              {el.activityType === "1"
                ? "Plan operativo"
                : el.activityType === "2"
                ? "Actividad académica"
                : "Actividad personal"}
            </h5>
            <i>
              <u>{el.title}</u>
            </i>
            <br />
            {el.description}
          </VerticalTimelineElement>
        );
      })}

      <VerticalTimelineElement
        iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
        icon={<FaStarHalfAlt />}
      />
      {/* ============================================================== */}
      {/*--- Fin componente de timeLine ---*/}
      {/* ============================================================== */}
    </VerticalTimeline>
  );
}

export default TimeLine;
