import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../components/TestimonialsSection.css"; // We'll create this for custom styles

const testimonials = [
  {
    quote:
      "We have worked with Champions HR Services for more than 3 years and we have been very satisfied with the level of service and turnaround time given. We have engaged Champions HR Services to source for hr staff , and Champions HR Services has been able to source for capable staff with the right aptitude.",
    name: "Jeffrey Lau",
    position: "CEO, Singapore ",
  },
  {
    quote:
      "Champions HR Services has consistently delivered high-quality candidates in a short span of time. Their ability to understand our needs and provide matching talent is remarkable.",
    name: "Priya Sharma",
    position: "HR Manager, TechCorp Pvt Ltd",
  },
  {
    quote:
      "Their team is professional, quick to respond, and very reliable. Champions HR Services has helped us scale our development teams effortlessly.",
    name: "Rahul Verma",
    position: "CTO, FinStack India",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="testimonial-section">
      <div className="container text-center text-white">
        <h2 className="fw-bold mb-3">What our Clients say</h2>
        <div className="divider"></div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-text">
                <p className="mb-4 fst-italic">"{item.quote}"</p>
                <h5 className="fw-bold">{item.name}</h5>
                <p className="mb-0">{item.position}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
