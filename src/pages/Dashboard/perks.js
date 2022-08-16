import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';
import { TiTickOutline } from 'react-icons/ti';
import { IoIosArrowDropup, IoIosArrowDropdown } from 'react-icons/io';
import PerkCard from '../../components/Perks/PerkCard';
import ActivityCard from '../../components/Perks/ActivityCard';
import Shirt from '../../components/Perks/tshirt.svg';
import Voucher from '../../components/Perks/voucher.svg';
import EnormoKit from '../../components/Perks/enormokit.svg';
import LaptopSleeve from '../../components/Perks/laptopSleeve.svg';

const Perks = () => {
  return (
    <Box>
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px 2px 12px',
            marginRight: '3px',
          }}
        >
          Perk
        </mark>
        Profile
      </Heading>
      <Flex>
        <Flex w='65%' flexWrap='wrap'>
          <PerkCard
            imgSrc={Shirt}
            imgTitle='Redeem Your Free T-Shirts'
            perkHeading='EnormoQB T-Shirt'
            perkSubHeading='Redeem our high quality t-shirts'
            coins='500'
          />
          <PerkCard
            imgSrc={EnormoKit}
            imgTitle='Exclusive EnormoQB Kit'
            perkHeading='EnormoQB Kit'
            perkSubHeading='Includes official t-shirt, keychain and sticker'
            coins='1000'
          />
          <PerkCard
            imgSrc={LaptopSleeve}
            imgTitle='EnormoQB Laptop Sleeve'
            perkHeading='EnormoQB Laptop Sleeve'
            perkSubHeading="EnormoQB's exclusive laptop sleeve"
            coins='1500'
          />
          <PerkCard
            imgSrc={Voucher}
            imgTitle='Redeem Your Vouchers'
            perkHeading='EnormoQB Vouchers'
            perkSubHeading='Redeem vouchers worth Rs.5000'
            coins='3000'
          />
        </Flex>
        <Flex w='35%' mb='4' flexDirection='column'>
          <Flex
            boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
            borderRadius='10'
            bgColor='brand.600'
            color='brand.100'
            p='2'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex alignItems='center'>
              <FaCoins style={{ marginRight: '8px' }} />
              Your Coins{' '}
            </Flex>
            <Box>500</Box>
          </Flex>
          <ActivityCard
            activityIcon={<TiTickOutline />}
            heading='Your question got approved.'
            activityDate='14 Aug 2022'
          />
          <ActivityCard
            activityIcon={<IoIosArrowDropup />}
            heading='Your earned 1 point.'
            activityDate='14 Aug 2022'
          />
          <ActivityCard
            activityIcon={<TiTickOutline />}
            heading='Your question got approved.'
            activityDate='16 Aug 2022'
          />
          <ActivityCard
            activityIcon={<IoIosArrowDropup />}
            heading='Your earned 1 point.'
            activityDate='16 Aug 2022'
          />
          <ActivityCard
            activityIcon={<IoIosArrowDropdown />}
            heading='Your used 500 points.'
            activityDate='16 Aug 2022'
          />
          <ActivityCard
            activityIcon={<TiTickOutline />}
            heading='Your question got approved.'
            activityDate='20 Aug 2022'
          />
          <ActivityCard
            activityIcon={<IoIosArrowDropup />}
            heading='Your earned 1 point.'
            activityDate='20 Aug 2022'
          />
          <ActivityCard
            activityIcon={<IoIosArrowDropdown />}
            heading='Your used 500 points.'
            activityDate='22 Aug 2022'
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Perks;
