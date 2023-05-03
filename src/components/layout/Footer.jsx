import { Link } from "react-router-dom";

const SOCIALS = [
  {
    icon: "fa-facebook-f",
    type: "facebook",
    link: "#",
  },
  {
    icon: "fa-instagram",
    type: "instagram",
    link: "//instagram.com/butterbakesng",
  },
  {
    icon: "fa-twitter",
    type: "twitter",
    link: "#",
  },
  {
    icon: "fa-google-plus-g",
    type: "google-plus",
    link: "#",
  },
];

const Footer = ({ socials = SOCIALS, brand = "ButterBakes Cakes" }) => {
  return (
    <section id="footer" className="pd-t-b-30">
      <div className="container-fluid text-center">
        <ul className="footer-social no-back bordered-social mg-t15-b0 list-unstyled list-inline">
          {socials.map((social) => (
            <li key={social.type} className="list-inline-item">
              <a href={social.link} target="_blank" rel="noreferrer">
                <span>
                  <i className={`fab ${social.icon}`}></i>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="copyright">
          © 2018 <Link to="/">{brand}</Link>. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
