import {
  MdOutlineDoneAll,
  MdOutlineHourglassTop,
  MdRemoveDone,
  MdMail,
} from 'react-icons/md';
import { AiFillHome, AiFillFileUnknown, AiFillGift } from 'react-icons/ai';
import { BsFillFilePdfFill } from 'react-icons/bs';
import { RiFileEditFill, RiAdminFill } from 'react-icons/ri';

// eslint-disable-next-line import/prefer-default-export
export const navItems = [
  { id: 1, name: 'Home', icon: AiFillHome, link: '' },
  {
    id: 2,
    name: 'Pending Questions',
    icon: MdOutlineHourglassTop,
    link: '/pending',
  },
  {
    id: 3,
    name: 'Approved Questions',
    icon: MdOutlineDoneAll,
    link: '/approved',
  },
  { id: 4, name: 'Rejected Questions', icon: MdRemoveDone, link: '/rejected' },
  {
    id: 5,
    name: 'Generate Question Paper',
    icon: BsFillFilePdfFill,
    link: '/generate',
  },
  {
    id: 6,
    name: 'Contribute Question',
    icon: RiFileEditFill,
    link: '/contribute',
  },
  {
    id: 7,
    name: 'Question Papers',
    icon: AiFillFileUnknown,
    link: '/questionpapers',
  },
  {
    id: 8,
    name: 'Perks',
    icon: AiFillGift,
    link: '/perks',
  },
  {
    id: 9,
    name: 'Admin Panel',
    icon: RiAdminFill,
    link: '/adminpanel',
  },
];
