import { Typography } from "@material-tailwind/react";
 
export function Footer() {
  return (
    <footer className="bg-gray-900 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="white" className="font-normal">
        &copy; 2024 Ozone Motors
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">

        <li>
          <Typography
            as="a"
            href="#"
            color="white"
            className="font-normal"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
export default Footer;