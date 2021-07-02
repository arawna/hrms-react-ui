import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Header,
  Icon,
  Pagination
} from "semantic-ui-react";
import JobAdService from '../services/JobAdService';
import JobAdFilter from '../layouts/filters/JobAdFilter';
import { useSelector } from 'react-redux';
import FavoriteService from '../services/FavoriteService';
import { toast } from 'react-toastify';

export default function JobAds() {

  const [jobAds, setJobAds] = useState([]);

  const {authItem} = useSelector(state => state.auth)

  const [activePage, setActivePage] = useState(1);
  const [filterOption, setFilterOption] = useState({});
  const [pageSize] = useState(2);
  const [totalPageSize, setTotalPageSize] = useState(0);

  useEffect(() => {
    let jobAdService = new JobAdService();
    jobAdService.getPageableAndFilterJobPostings(activePage, pageSize, filterOption)
    .then((result) => {
      setJobAds(result.data.data);
      setTotalPageSize(parseInt(result.data.message));
    });
  }, [filterOption, activePage, pageSize]);

  const handleFilterClick = (filterOption) => {
    if(filterOption.cityId.length === 0){
      filterOption.cityId = null;
    }
    if(filterOption.jobPositionId.length === 0){
      filterOption.jobPositionId = null;
    }
    if(filterOption.workPlaceId.length === 0){
      filterOption.workPlaceId = null;
    }
    if(filterOption.workTimeId.length === 0){
      filterOption.workTimeId = null;
    }
    setFilterOption(filterOption);
    setActivePage(1);
  }

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  }

  let favoriteService = new FavoriteService();
  const handleAddFavorite = (jobAdId) => {
    favoriteService.addFavorite(authItem[0].user.id,jobAdId).then((result) => {
      toast.success(result.data.message)
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }



  return (
    <div>
      <JobAdFilter clickEvent={handleFilterClick}/>

      <Header  as="h2">
        <Icon name="bullhorn" />
        <Header.Content>İş İlanları</Header.Content>
      </Header>

      <Table  color="black" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
            <Table.HeaderCell>Şehir</Table.HeaderCell>
            <Table.HeaderCell>Maaş Aralığı</Table.HeaderCell>
            <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
            <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
            <Table.HeaderCell>Son Tarih</Table.HeaderCell>
            <Table.HeaderCell>Detaylar</Table.HeaderCell>
            {authItem[0].loggedIn && authItem[0].user.userType===1 &&
              <Table.HeaderCell>Favorilere Ekle</Table.HeaderCell>
            }
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAds?.map((jobAd) => (
            <Table.Row key={jobAd.id}>
              <Table.Cell>{jobAd.employer.companyName}</Table.Cell>
              <Table.Cell>{jobAd.jobPosition.name}</Table.Cell>
              <Table.Cell>{jobAd.city.name}</Table.Cell>
              <Table.Cell>{jobAd.minSalary}₺ - {jobAd.maxSalary}₺</Table.Cell>
              <Table.Cell>{jobAd.workTime.name}</Table.Cell>
              <Table.Cell>{jobAd.workPlace.name}</Table.Cell>
              <Table.Cell>
                {(
                  (new Date(jobAd.lastDate).getTime() -
                    new Date(Date.now()).getTime()) /
                  86400000
                )
                  .toString()
                  .split(".", 1)}{" "}
                gün
              </Table.Cell>
              <Table.Cell>
                <Button as={Link} to={`/jobads/${jobAd.id}`}
                    content="Detayları Gör"
                    icon="right arrow"
                    labelPosition="right"
                  />
              </Table.Cell>
              {authItem[0].loggedIn && authItem[0].user.userType===1 &&
                <Table.Cell>
                <Button
                    icon="heart"
                    color="red"
                    onClick = {() => handleAddFavorite(jobAd.id)}
                  />
                </Table.Cell>
              }
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      <Pagination
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        onPageChange={handlePaginationChange}
        totalPages={Math.ceil(totalPageSize / pageSize)}
      />

    </div>
  )
}
