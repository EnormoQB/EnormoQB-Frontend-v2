import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';
import { TiTickOutline } from 'react-icons/ti';
import { IoIosArrowDropup, IoIosArrowDropdown } from 'react-icons/io';
import PerkCard from '../../components/Perks/PerkCard';
import ActivityCard from '../../components/Perks/ActivityCard';
import Shirt from '../../assets/tshirt.svg';
import Voucher from '../../assets/voucher.svg';
import EnormoKit from '../../assets/enormokit.svg';
import LaptopSleeve from '../../assets/laptopSleeve.svg';
import { useGetUserDataQuery } from '../../redux/services/userApi';

const Perks = () => {
  const { data, isLoading, isFetching } = useGetUserDataQuery();
  const [history, setHistory] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (data) {
      // setHistory(data.history);
      if (data.history.length < 8) {
        setHistory(data.history);
      } else {
        setHistory(data.history.slice(-8).reverse());
      }
      setPoints(data.points);
    }
  }, [data]);

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
            points={points}
            coins='500'
          />
          <PerkCard
            imgSrc={EnormoKit}
            imgTitle='Exclusive EnormoQB Kit'
            perkHeading='EnormoQB Kit'
            perkSubHeading='Includes official t-shirt, keychain and sticker'
            points={points}
            coins='1000'
          />
          <PerkCard
            imgSrc={LaptopSleeve}
            imgTitle='EnormoQB Laptop Sleeve'
            perkHeading='EnormoQB Laptop Sleeve'
            perkSubHeading="EnormoQB's exclusive laptop sleeve"
            points={points}
            coins='1500'
          />
          <PerkCard
            imgSrc={Voucher}
            imgTitle='Redeem Your Vouchers'
            perkHeading='EnormoQB Vouchers'
            perkSubHeading='Redeem vouchers worth Rs.5000'
            points={points}
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
            <Box>{points}</Box>
          </Flex>
          {!isLoading &&
            !isFetching &&
            history.map((onedata, index) => (
              <ActivityCard
                key={index}
                activityIcon={
                  // eslint-disable-next-line no-nested-ternary
                  onedata.icon === 'check' ? (
                    <TiTickOutline />
                  ) : onedata.icon === 'up' ? (
                    <IoIosArrowDropup />
                  ) : (
                    <IoIosArrowDropdown />
                  )
                }
                heading={onedata.text}
                activityDate={onedata.date}
              />
            ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Perks;
