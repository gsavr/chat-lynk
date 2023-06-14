interface HamburgerButtonProps {
  open: string;
  setOpen: any;
  opening: any;
  setOpening: any;
  menuOpen: any;
  setMenuOpen: any;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = (props) => {
  const { open, setOpen, setOpening, menuOpen, setMenuOpen } = props;

  const openMobileMenu = () => {
    if (open === "hidden") {
      setOpen("flex");
      setMenuOpen("open");
      setTimeout(() => {
        setOpening("opening");
      }, 100);
    } else if (open === "flex") {
      setOpening("closing");
      setMenuOpen("closed");
      setTimeout(() => {
        setOpen("hidden");
      }, 500);
    }
  };

  return (
    <div className=" flex items-center pr-4  md:hidden">
      <div className="pb-2"></div>
      <button
        id="menu-btn"
        onClick={openMobileMenu}
        type="button"
        className={`${menuOpen} hamburger z-40 block rounded-md focus:outline-none md:hidden`}
      >
        <span className="hamburger-top border border-black "></span>
        <span className="hamburger-middle border border-black "></span>
        <span className="hamburger-bottom border border-black "></span>
      </button>
    </div>
  );
};
