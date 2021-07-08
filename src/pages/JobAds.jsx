import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Table,
  Button,
  Icon,
  Pagination,
  Dropdown,
  Card
} from "semantic-ui-react";
import JobAdService from '../services/JobAdService';
import JobAdFilter from '../layouts/filters/JobAdFilter';
import { useSelector } from 'react-redux';
import FavoriteService from '../services/FavoriteService';
import { toast } from 'react-toastify';

export default function JobAds() {

  let [jobAds, setJobAds] = useState([]);
  let [favorites, setFavorites] = useState([]);

  const {authItem} = useSelector(state => state.auth)

  let [activePage, setActivePage] = useState(1);
  let [filterOption, setFilterOption] = useState({});
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);

  useEffect(() => {
    let jobAdService = new JobAdService();
    let favoriteService = new FavoriteService();
    jobAdService.getPageableAndFilterJobPostings(activePage, pageSize, filterOption)
    .then((result) => {
      setJobAds(result.data.data);
      setTotalPageSize(parseInt(result.data.message));
    });
    if(authItem[0].loggedIn===true && authItem[0].user.userType===1){
      favoriteService.getByCandidateId(authItem[0].user.id).then((result) => {
        setFavorites(result.data.data.map((favoriteAd) => (
          favoriteAd.jobAd.id
        )))
      })
    }
  }, [filterOption, activePage, pageSize,authItem]);

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
      favorites.push(jobAdId)
      setFavorites([...favorites])
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }

  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
    console.log(pageSize)
  }

  const paginationOptions = [
    { key:2, text: "2 İlan", value: 2 },
    { key:10, text: "10 İlan", value: 10 },
    { key:25, text: "25 İlan", value: 25 },
    { key:50, text: "50 İlan", value: 50 },
    { key:100, text: "100 İlan", value: 100 },
  ];

  return (
    <div>
      <JobAdFilter clickEvent={handleFilterClick}/>

      <Card fluid>
        <div style={{marginTop:"1em",marginLeft:"1em"}}>
        <Card.Header as="h2">
          <Icon name="bullhorn" />
          İş İlanları
        </Card.Header>
        </div>
      
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
                    circular
                    icon={favorites.includes(jobAd.id)?"heart":"heart outline"}
                    color={favorites.includes(jobAd.id)?"red":"green"}
                    onClick = {() => handleAddFavorite(jobAd.id)}
                  />
                </Table.Cell>
              }
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Card.Content>
      <div>
      <Pagination
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        onPageChange={handlePaginationChange}
        totalPages={Math.ceil(totalPageSize / pageSize)}
      />

      <Dropdown
          onChange={(e, data) => {
            setActivePage(1)
            setPageSize(data.value);
            handlePaginationSizeChange(data.value);
          }}
          selection
          defaultValue={pageSize}
          text={"Sayfalama - " + pageSize}
          style={{ float: "right" }}
          options={paginationOptions}
      />
      </div>
      </Card.Content>
      </Card>

    </div>
  )
}
