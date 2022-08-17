import {
  MdOutlineDoneAll,
  MdOutlineHourglassTop,
  MdRemoveDone,
} from 'react-icons/md';
import { AiFillHome, AiFillFileUnknown, AiFillGift } from 'react-icons/ai';
import { BsFillFilePdfFill } from 'react-icons/bs';
import { RiFileEditFill, RiAdminFill } from 'react-icons/ri';

// eslint-disable-next-line import/prefer-default-export
export const navItems = [
  {
    id: 1,
    name: 'Home',
    icon: AiFillHome,
    link: '',
    roles: ['developer', 'member', 'admin'],
  },
  {
    id: 2,
    name: 'Pending Questions',
    icon: MdOutlineHourglassTop,
    link: '/pending',
    roles: ['developer', 'member', 'admin'],
  },
  {
    id: 3,
    name: 'Approved Questions',
    icon: MdOutlineDoneAll,
    link: '/approved',
    roles: ['developer', 'member'],
  },
  {
    id: 4,
    name: 'Rejected Questions',
    icon: MdRemoveDone,
    link: '/rejected',
    roles: ['developer', 'member'],
  },
  {
    id: 5,
    name: 'Contribute Question',
    icon: RiFileEditFill,
    link: '/contribute',
    roles: ['developer', 'member', 'admin'],
  },
  {
    id: 6,
    name: 'Generate Question Paper',
    icon: BsFillFilePdfFill,
    link: '/generate',
    roles: ['developer', 'admin'],
  },
  {
    id: 7,
    name: 'Question Papers',
    icon: AiFillFileUnknown,
    link: '/questionpapers',
    roles: ['developer', 'member', 'admin'],
  },
  {
    id: 8,
    name: 'Perks',
    icon: AiFillGift,
    link: '/perks',
    roles: ['developer', 'member'],
  },
  {
    id: 9,
    name: 'Request Contributions',
    icon: RiAdminFill,
    link: '/requestContributions',
    roles: ['developer', 'admin'],
  },
];
