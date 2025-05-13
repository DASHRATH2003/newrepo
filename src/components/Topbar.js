import React from 'react';

function Topbar() {
  return (
    <div className="bg-danger text-white py-2  shadow-sm">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        {/* Left Side */}
        <div className="d-flex align-items-center gap-3 flex-wrap">
          
          <span>
            Job Enquiries: <i className="fas fa-phone-alt me-1"></i> +91-9632492563
          </span>
          <span>
            <i className="fas fa-envelope me-1"></i> jobs@championshrservices.com
          </span>
          <span>|</span>
          <a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="text-white text-decoration-none">Terms of Use</a>
        </div>

        {/* Right Side - Social Icons */}
        <div className="d-flex align-items-center gap-2">
          <a href="https://x.com/Basavaraj_189?t=qqaD-vES3Mmg7iR7MPl_Ug&s=09" target="_blank" rel="noreferrer" className="text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61575737247861" target="_blank" rel="noreferrer" className="text-white">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/championhrservices?igsh=dnZxZzJybjExMnRn" target="_blank" rel="noreferrer" className="text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="http://www.linkedin.com/in/champion-hr-services" target="_blank" rel="noreferrer" className="text-white">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://youtube.com/@basavaraj-09?si=o-AU0b1ELjRsRGHM" target="_blank" rel="noreferrer" className="text-white">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
