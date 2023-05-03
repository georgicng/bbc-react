const CONTACTS = [
  {
    icon: "fa-phone",
    type: "phone",
    link: "tel:+2348149750282",
    value: "+2348149750282",
  },
  {
    icon: "fa-envelope",
    type: "email",
    link: "mailto:butterbakescakes@gmail.com",
    value: "butterbakescakes@gmail.com",
  },
];

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

const TopBar = ({ contacts = CONTACTS, socials = SOCIALS }) => {
  return (
    <div className="header-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-2">
            <nav className="header-login d-flex">
              {contacts.map((contact) => (
                <a key={contact.type} href={contact.link}>
                  <i className={`fa ${contact.icon}`}></i> {contact.value}
                </a>
              ))}
            </nav>
          </div>
          <div className="col-lg-4">
            <nav className="header-social text-right">
              {socials.map((social) => (
                <a key={social.type} href={social.link}>
                  <span>
                    <i className={`fab ${social.icon}`}></i>
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
