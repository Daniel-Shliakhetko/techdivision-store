import React from "react";
import logo from "./images/techdivision-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLabel } from "./components/IconLabel";

const mainPath = "";
const userId = 5483920358952;

const header = {
  language: "de",
  info: {
    company: "unternhemen",
    phone: "+49 8031 221 055 0",
    welcome: "Willkomen bei Techdivision",
  },
  navigation: {
    search: "Suche",
    shoppingCart: "Warenkorb",
    account: "Mein Konto",
    items: [
      { name: "fashion", slug: "/" },
      { name: "elektronik", slug: "/" },
      { name: "lebensmittel", slug: "/" },
      { name: "mashinenbau", slug: "/" },
      { name: "landingpage", slug: "/" },
      { name: "sale", slug: "/", color: "red-800" },
    ],
  },
  title: "Kostenloser Versand - Kostenlose Ruckgabe",
};

export const Header = (props) => {
  return (
    <div className="header w-full bg-grey-100">
      <HeaderInfo language={header.language} info={header.info} />
      <nav className="w-full">
        <NavigationFunctions navigation={header.navigation} />
        <NavigationMenu navItems={header.navigation.items} />
      </nav>
      <HeaderTitle title={header.title} />
    </div>
  );
};

const HeaderInfo = (props) => {
  const { language, info } = props;
  return (
    (info && language) && (
      <div className="hidden md:flex w-full h-8 px-2 md:px-16 lg:px-32 bg-grey-100 uppercase justify-between items-center text-grey-400">
        <IconLabel>{language} {info.company}</IconLabel>
        <IconLabel>{info.phone}</IconLabel>
        <span>{info.welcome}</span>
      </div>
    )
  );
};

const NavigationFunctions = (props) => {
  const navigate = useNavigate();
  return (
    props.navigation && (
      <div className="w-full px-2 md:px-[7.5%] lg:px-[15%] bg-grey-0 border-y border-grey-300 divide-grey-300 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x">
        <NavigationFunctionWrapper>
            <div className="w-full h-full flex md:block justify-center">
          <img className="max-h-full p-1" src={logo} alt="Website Logo" />
          </div>
        </NavigationFunctionWrapper>
        <NavigationFunctionWrapper>
          <form className="w-full h-full relative">
            <input
              className="pl-2 w-full h-full"
              type="search"
              placeholder={props.navigation.search}
            />
            <input
              className="absolute right-0 top-[50%] -translate-y-1/2"
              type="submit"
              value=""
            />
          </form>
        </NavigationFunctionWrapper>
        <NavigationFunctionWrapper>
          <div className="w-full h-full flex justify-center space-x-6">
            <button
              onClick={() => {
                navigate(`${mainPath}/users/${userId}`);
              }}
            >
              <IconLabel>{props.navigation.account}</IconLabel>
            </button>
            <button
              onClick={() => {
                navigate(`${mainPath}/users/${userId}/cart`);
              }}
            >
              <IconLabel>{props.navigation.shoppingCart}</IconLabel>
            </button>
          </div>
        </NavigationFunctionWrapper>
      </div>
    )
  );
};
const NavigationFunctionWrapper = ({ children }) => {
  return children && <div className="w-full h-10">{children}</div>;
};

const NavigationMenu = (props) => {
  return (
    props.navItems && (
      <div className="w-full min-h-fit py-2 px-2 md:px-[7.5%] lg:px-[15%] bg-grey-0">
        <ul className="flex justify-between flex-col md:flex-row">
          {props.navItems.map((navItem, i) => (
            <NavItem key={i} navItem={navItem} />
          ))}
        </ul>
      </div>
    )
  );
};

const HeaderTitle = (props) => {
  return (
    props.title && (
      <div className="w-full h-16 px-2 md:px-16 lg:px-32 bg-grey-100 flex justify-center items-center">
        <h1 className="text-sm text-grey-black">{header.title}</h1>
      </div>
    )
  );
};

const NavItem = (props) => {
  const { navItem } = props;
  const { slug, name } = navItem;
  const color = navItem.color ? "text-" + navItem.color : "";
  const className = "uppercase font-black " + color;
  return (
    <li>
      <Link className={className} to={mainPath + slug}>
        {name}
      </Link>
    </li>
  );
};
