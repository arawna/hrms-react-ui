import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Table, Button } from 'semantic-ui-react'
import FavoriteService from '../services/FavoriteService';

export default function JobAdFavorites() {

    const {authItem} = useSelector(state => state.auth)

    let [favoriteAds, setFavoriteAds] = useState([]);

    let favoriteService = new FavoriteService();
    useEffect(() => {
        let favoriteService = new FavoriteService();
        favoriteService.getByCandidateId(authItem[0].user.id).then((result) => {
            setFavoriteAds(result.data.data);
        })
    },[authItem])

    const handleRemoveFavorite = (favoriteId) => {
        favoriteService.removeFavorite(favoriteId).then((result) => {
            setFavoriteAds(favoriteAds.filter((favoriAd) => favoriAd.id !== favoriteId))
            toast.success(result.data.message)
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"black"}>
                <Card.Content header="Favori İş İlanların"/>
                    <Table celled color={"black"}>
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
                                <Table.HeaderCell>Sil</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {favoriteAds?.map((favoriteAd) => (
                                <Table.Row key={favoriteAd.id}>
                                    <Table.Cell>{favoriteAd.jobAd.employer.companyName}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobAd.jobPosition.name}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobAd.city.name}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobAd.minSalary}₺ - {favoriteAd.jobAd.maxSalary}₺</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobAd.workTime.name}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobAd.workPlace.name}</Table.Cell>
                                    <Table.Cell>
                                        {(
                                        (new Date(favoriteAd.jobAd.lastDate).getTime() -
                                            new Date(Date.now()).getTime()) /
                                        86400000
                                        )
                                        .toString()
                                        .split(".", 1)}{" "}
                                        gün
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button as={Link} to={`/jobads/${favoriteAd.jobAd.id}`}
                                            content="Detayları Gör"
                                            icon="right arrow"
                                            labelPosition="right"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            icon="x"
                                            color={"red"}
                                            circular
                                            onClick={() => handleRemoveFavorite(favoriteAd.id)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
            </Card>
        </div>
    )
}
