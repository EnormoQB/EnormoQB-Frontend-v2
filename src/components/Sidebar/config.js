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
    roles: ['developer', 'contributor', 'reviewer', 'exam-setter'],
  },
  {
    id: 2,
    name: 'Pending Questions',
    icon: MdOutlineHourglassTop,
    link: '/pending',
    roles: ['developer', 'contributor', 'reviewer', 'exam-setter'],
  },
  {
    id: 3,
    name: 'Approved Questions',
    icon: MdOutlineDoneAll,
    link: '/approved',
    roles: ['developer', 'contributor', 'reviewer', 'exam-setter'],
  },
  {
    id: 4,
    name: 'Rejected Questions',
    icon: MdRemoveDone,
    link: '/rejected',
    roles: ['developer', 'contributor', 'reviewer', 'exam-setter'],
  },
  {
    id: 5,
    name: 'Contribute Question',
    icon: RiFileEditFill,
    link: '/contribute',
    roles: ['developer', 'contributor', 'reviewer', 'exam-setter'],
  },
  {
    id: 6,
    name: 'Generate Question Paper',
    icon: BsFillFilePdfFill,
    link: '/generate',
    roles: ['developer', 'exam-setter'],
  },
  {
    id: 7,
    name: 'Question Papers',
    icon: AiFillFileUnknown,
    link: '/questionpapers',
    roles: ['developer', 'contributor', 'reviewer', 'exam-setter'],
  },
  {
    id: 8,
    name: 'Perks',
    icon: AiFillGift,
    link: '/perks',
    roles: ['developer', 'contributor'],
  },
  {
    id: 9,
    name: 'Request Contributions',
    icon: RiAdminFill,
    link: '/requestContributions',
    roles: ['developer', 'reviewer', 'exam-setter'],
  },
];
