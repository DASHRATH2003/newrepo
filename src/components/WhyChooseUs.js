import React from "react";
import "../components/WhyChooseUs.css"; // Optional for custom styling
import highJoin from "../assets/icons/high-join.png";
import growth from "../assets/icons/growth.png";
import opportunity from "../assets/icons/opportunity.png";
import success from "../assets/icons/success.png";
import responsibilities from "../assets/icons/responsibilities.png";
import onboarding from "../assets/icons/onboarding.png";

const features = [
  {
    icon: highJoin,
    title: "High Joining Ratio",
    description: "We consistently maintain an impressive 85% joining ratio across our diverse client portfolio.",
  },
  {
    icon: growth,
    title: "Exceptional Growth",
    description: "Our sustained growth reflects our ability to scale efficiently while consistently delivering exceptional value.",
  },
  {
    icon: opportunity,
    title: " Commitment to Equality",
    description: "70% of our workforce is made up of women, empowered through structured Diversity & Inclusion programs and mentorship initiatives.",
  },
  {
    icon: success,
    title: "Proven Success",
    description: "We’ve successfully placed over 1,000 professionals in roles that align with their skills and career aspirations.",
  },
  {
    icon: responsibilities,
    title: "Reliable Compliance Services",
    description: "We provide accurate and up-to-date compliance services, tailored to the latest regulatory changes and client needs.",
  },
  {
    icon: onboarding,
    title: "Specialized Onboarding",
    description: "Our dedicated recruitment experts ensure a seamless, personalized onboarding experience for every hire.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-5 text-center bg-white">
      <div className="container">
        <h2 className="fw-bold text-danger">Why Choose Champions HR Services</h2>
        <div className="divider mx-auto mb-4"></div>

        <div className="row g-4">
          {features.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="feature-box px-3">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="mb-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <h3 className="fw-bold text-danger">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
